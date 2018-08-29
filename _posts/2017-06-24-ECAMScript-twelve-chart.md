---
layout: post
title:  "ES6第十二章 二进制数组"
date:   2017-06-24 23:14:54
categories: ES6
tags:	ES6
excerpt:	二进制数组（ArrayBuffer对象、TypedArray视图和DataView视图）是JavaScript操作二进制数据的一个接口。这些对象早就存在，属于独立的规格（2011年2月发布），ES6将它们纳入了ECMAScript规格，并且增加了新的方法。
mathjax: true
author:	闵超
---
* content
{:toc}

#		二进制数组
二进制数组（ArrayBuffer对象、TypedArray视图和DataView视图）是JavaScript操作二进制数据的一个接口。这些对象早就存在，属于独立的规格（2011年2月发布），ES6将它们纳入了ECMAScript规格，并且增加了新的方法。

这个接口的原始设计目的，与WebGL项目有关。所谓WebGL，就是指浏览器与显卡之间的通信接口，为了满足JavaScript与显卡之间大量的、实时的数据交换，它们之间的数据通信必须是二进制的，而不能是传统的文本格式。文本格式传递一个32位整数，两端的JavaScript脚本与显卡都要进行格式转化，将非常耗时。这时要是存在一种机制，可以像C语言那样，直接操作字节，将4个字节的32位整数，以二进制形式原封不动地送入显卡，脚本的性能就会大幅提升。

二进制数组就是在这种背景下诞生的。它很像C语言的数组，允许开发者以数组下标的形式，直接操作内存，大大增强了JavaScript处理二进制数据的能力，使得开发者有可能通过JavaScript与操作系统的原生接口进行二进制通信。

###		二进制数组由三类对象组成。
1.	ArrayBuffer对象：代表内存之中的一段二进制数据，可以通过“视图”进行操作。“视图”部署了数组接口，这意味着，可以用数组的方法操作内
存。

2.	TypedArray视图：共包括9种类型的视图，比如Uint8Array（无符号8位整数）数组视图, Int16Array（16位整数）数组视图,Float32Array（32位浮点数）数组视图等等。

3.	DataView视图：可以自定义复合格式的视图，比如第一个字节是Uint8（无符号8位整数）、第二、三个字节是Int16（16位整数）、第四个字节开始是Float32（32位浮点数）等等，此外还可以自定义字节序。

#####	`注意，二进制数组并不是真正的数组，而是类似数组的对象。`

TypedArray视图支持的数据类型一共有9种（DataView视图支持除Uint8C以外的其他8种）。

	数据类型		字节长度		含义								对应的C语言类型	
	Int8		 1 			8位带符号整数 					signed char
	Uint8		 1 			8位不带符号整数 					unsigned char
	Uint8C		 1 			8位不带符号整数（自动过滤溢出） 	unsigned char
	Int16 		 2 			16位带符号整数 					short
	Uint16		 2 			16位不带符号整数 					unsigned short
	Int32 		 4 			32位带符号整数 					int
	Uint32		 4			32位不带符号的整数 				unsigned int
	Float32 	 4 			32位浮点数 						float
	Float64 	 8 			64位浮点数 						double

##		ArrayBuffer对象

###		概述
ArrayBuffer对象代表储存二进制数据的一段内存，它不能直接读写，只能通过视图（TypedArray视图和DataView视图)来读写，视图的作用是以指定格式解读二进制数据。

ArrayBuffer也是一个构造函数，可以分配一段可以存放数据的连续内存区域。

	var buf = new ArrayBuffer(32);
上面代码生成了一段32字节的内存区域，每个字节的值默认都是0。可以看到，ArrayBuffer构造函数的参数是所需要的内存大小（单位字节）。为了读写这段内容，需要为它指定视图。DataView视图的创建，需要提供ArrayBuffer对象实例作为参数。

	var buf = new ArrayBuffer(32);
	var dataView = new DataView(buf);
	dataView.getUint8(0) // 0

上面代码对一段32字节的内存，建立DataView视图，然后以不带符号的8位整数格式，读取第一个元素，结果得到0，因为原始内存的ArrayBuffer对象，默认所有位都是0。

####		ArrayBufer.prototype.byteLength

ArrayBuffer实例的byteLength属性，返回所分配的内存区域的字节长度。

	var buffer = new ArrayBuffer(32);
	buffer.byteLength
	//32
如果要分配的内存区域很大，有可能分配失败(所以有必要检查是否分配成功)
	
	if(buffer.byteLength === n){
		//成功
	}else {
		//失败
	}
####		ArrayBuffer.prototype.slice()
`ArrayBuffer`实例有一个slice方法，允许将内存区域的一部分，拷贝成一个新的ArrayBuffer对象。

	var buffer = new ArrayBuffer(8);
	var newBuffer = buffer.slice(0, 3);

上面代码拷贝buffer对象的前3个字节（从0开始，到第3个字节前面结束），生成一个新的ArrayBuffer对象。slice方法其实包含两步，第一步是先分配一段新内存，第二步是将原来那个ArrayBuffer对象拷贝过去。slice方法接受两个参数，第一个参数表示拷贝开始的字节序号（含该字节），第二个参数表示拷贝截止的字节序号（不含该字节）。如果省略第二个参数，则默认到原ArrayBuffer对象的结尾。

除了slice方法，ArrayBuffer对象不提供任何直接读写内存的方法，只允许在其上方建立视图，然后通过视图读写。

####		ArrayBuffer.isView()
ArrayBuffer有一个静态方法isView，返回一个布尔值，表示参数是否为ArrayBuffer的视图实例。这个方法大致相当于判断参数，是否为TypedArray实例或DataView实例。

	var buffer = new ArrayBuffer(8);
	ArrayBuffer.isView(buffer) // false
	var v = new Int32Array(buffer);
	ArrayBuffer.isView(v) // true

##		TypedArray视图

###		概述
ArrayBuffer对象作为内存区域，可以存放多种类型的数据。同一段内存，不同数据有不同的解读方式，这就叫做“视图”（view）。ArrayBuffer有两种视图，一种是TypedArray视图，另一种是DataView视图。

前者的数组成员都是同一个数据类型，后者的数组成员可以是不同的数据类型。目前，TypedArray视图一共包括9种类型，每一种视图都是一种构造函数。Int8Array：8位有符号整数，长度1个字节。

-	Uint8Array：8位无符号整数，长度1个字节。
-	Uint8ClampedArray：8位无符号整数，长度1个字节，溢出处理不同。
-	Int16Array：16位有符号整数，长度2个字节。
-	Uint16Array：16位无符号整数，长度2个字节。
-	Int32Array：32位有符号整数，长度4个字节。
-	Uint32Array：32位无符号整数，长度4个字节。
-	Float32Array：32位浮点数，长度4个字节。
-	Float64Array：64位浮点数，长度8个字节。

这9个构造函数生成的数组，统称为TypedArray视图。它们很像普通数组，都有length属性，都能用方括号运算符（[]）获取单个元素，所有数组的
方法，在它们上面都能使用。普通数组与TypedArray数组的差异主要在以下方面。

-	TypedArray数组的所有成员，都是同一种类型。
-	TypedArray数组的成员是连续的，不会有空位。
-	TypedArray数组成员的默认值为0。比如，new Array(10)返回一个普通数组，里面没有任何成员，只是10个空位；new Uint8Array(10)返回一个
-	TypedArray数组，里面10个成员都是0。
-	TypedArray数组只是一层视图，本身不储存数据，它的数据都储存在底层的ArrayBuffer对象之中，要获取底层对象必须使用buffer属性。

###		构造函数
TypedArray数组提供9种构造函数，用来生成相应类型的数组实例。
构造函数有多种用法。

1.	TypedArray(buffer, byteOffset=0, length?)

	同一个ArrayBuffer对象之上，可以根据不同的数据类型，建立多个视图。
	
		// 创建一个8字节的ArrayBuffer
		var b = new ArrayBuffer(8);
		// 创建一个指向b的Int32视图，开始于字节0，直到缓冲区的末尾
		var v1 = new Int32Array(b);
		// 创建一个指向b的Uint8视图，开始于字节2，直到缓冲区的末尾
		var v2 = new Uint8Array(b, 2);
		// 创建一个指向b的Int16视图，开始于字节2，长度为2
		var v3 = new Int16Array(b, 2, 2);
		上面代码在一段长度为8个字节的内存（b）之上，生成了三个视图：v1、v2和v3。
	
	视图的构造函数可以接受三个参数：
	
	第一个参数（必需）：视图对应的底层ArrayBuffer对象。
	
	第二个参数（可选）：视图开始的字节序号，默认从0开始。
	
	第三个参数（可选）：视图包含的数据个数，默认直到本段内存区域结束。

2.	TypedArray(length)

	视图还可以不通过ArrayBuffer对象，直接分配内存而生成。

		var f64a = new Float64Array(8);
		f64a[0] = 10;
		f64a[1] = 20;
		f64a[2] = f64a[0] + f64a[1];

	上面代码生成一个8个成员的Float64Array数组（共64字节），然后依次对每个成员赋值。这时，视图构造函数的参数就是成员的个数。可以看到，视图数组的赋值操作与普通数组的操作毫无两样。


3.	TypedArray(typedArray)

	TypedArray数组的构造函数，可以接受另一个TypedArray实例作为参数。

		var typedArray = new Int8Array(new Uint8Array(4));

	上面代码中，Int8Array构造函数接受一个Uint8Array实例作为参数。
	
	注意，此时生成的新数组，只是复制了参数数组的值，对应的底层内存是不一样的。新数组会开辟一段新的内存储存数据，不会在原数组的内存之上建立视图。
		
		var x = new Int8Array([1, 1]);
		var y = new Int8Array(x);
		x[0] // 1
		y[0] // 1
		x[0] = 2;
		y[0] // 1
	上面代码中，数组y是以数组x为模板而生成的，当x变动的时候，y并没有变动。
	如果想基于同一段内存，构造不同的视图，可以采用下面的写法。

		var x = new Int8Array([1, 1]);
		var y = new Int8Array(x.buffer);
		x[0] // 1
		y[0] // 1
		x[0] = 2;
		y[0] // 2

4.	TypedArray(arrayLikeObject)

	构造函数的参数也可以是一个普通数组，然后直接生成TypedArray实例。

		var typedArray = new Uint8Array([1, 2, 3, 4]);
	注意，这时TypedArray视图会重新开辟内存，不会在原数组的内存上建立视图。

	上面代码从一个普通的数组，生成一个8位无符号整数的TypedArray实例。
	TypedArray数组也可以转换回普通数组。

		var normalArray = Array.prototype.slice.call(typedArray);


##		12.2.3 数组方法

普通数组的操作方法和属性，对TypedArray数组完全适用。

-	TypedArray.prototype.copyWithin(target, start[, end = this.length])
-	TypedArray.prototype.entries()
-	TypedArray.prototype.every(callbackfn, thisArg?)
-	TypedArray.prototype.fill(value, start=0, end=this.length)
-	TypedArray.prototype.filter(callbackfn, thisArg?)
-	TypedArray.prototype.find(predicate, thisArg?)
-	TypedArray.prototype.findIndex(predicate, thisArg?)
-	TypedArray.prototype.forEach(callbackfn, thisArg?)
-	TypedArray.prototype.indexOf(searchElement, fromIndex=0)
-	TypedArray.prototype.join(separator)
-	TypedArray.prototype.keys()
-	TypedArray.prototype.lastIndexOf(searchElement, fromIndex?)
-	TypedArray.prototype.map(callbackfn, thisArg?)
-	TypedArray.prototype.reduce(callbackfn, initialValue?)
-	TypedArray.prototype.reduceRight(callbackfn, initialValue?)
-	TypedArray.prototype.reverse()
-	TypedArray.prototype.slice(start=0, end=this.length)
-	TypedArray.prototype.some(callbackfn, thisArg?)
-	TypedArray.prototype.sort(comparefn)
-	TypedArray.prototype.toLocaleString(reserved1?, reserved2?)
-	TypedArray.prototype.toString()
-	TypedArray.prototype.values()
-	
上面所有方法的用法，请参阅数组方法的介绍，这里不再重复了。

注意，TypedArray数组没有concat方法。如果想要合并多个TypedArray数组，可以用下面这个函数。

	function concatenate(resultConstructor, ...arrays) {
		let totalLength = 0;
		for (let arr of arrays) {
			totalLength += arr.length;
		}
		let result = new resultConstructor(totalLength);
		let offset = 0;
		for (let arr of arrays) {
			result.set(arr, offset);
			offset += arr.length;
		}
		return result;
	}
	concatenate(Uint8Array, Uint8Array.of(1, 2), Uint8Array.of(3, 4))
	// Uint8Array [1, 2, 3, 4]

另外，TypedArray数组与普通数组一样，部署了Iterator接口，所以可以被遍历。
	
let ui8 = Uint8Array.of(0, 1, 2);
	for (let byte of ui8) {
		console.log(byte);
	}
	// 0
	// 1
	// 2
###		字节序

字节序指的是数值在内存中的表示方式。

	var buffer = new ArrayBuffer(16);
	var int32View = new Int32Array(buffer);
	for (var i = 0; i < int32View.length; i++) {
		int32View[i] = i * 2;
	}

上面代码生成一个16字节的ArrayBuffer对象，然后在它的基础上，建立了一个32位整数的视图。由于每个32位整数占据4个字节，所以一共可以写入4个整数，依次为0，2，4，6。

如果在这段数据上接着建立一个16位整数的视图，则可以读出完全不一样的结果。
	
	var int16View = new Int16Array(buffer);
	for (var i = 0; i < int16View.length; i++) {
	console.log("Entry " + i + ": " + int16View[i]);
	}
	// Entry 0: 0
	// Entry 1: 0
	// Entry 2: 2
	// Entry 3: 0
	// Entry 4: 4
	// Entry 5: 0
	// Entry 6: 6
	// Entry 7: 0

由于每个16位整数占据2个字节，所以整个ArrayBuffer对象现在分成8段。然后，由于x86体系的计算机都采用小端字节序（little endian），相对重要的字节排在后面的内存地址，相对不重要字节排在前面的内存地址，所以就得到了上面的结果。

比如，一个占据四个字节的16进制数0x12345678，决定其大小的最重要的字节是“12”，最不重要的是“78”。小端字节序将最不重要的字节排在前面，储存顺序就是78563412；大端字节序则完全相反，将最重要的字节排在前面，储存顺序就是12345678。目前，所有个人电脑几乎都是小端字节序，所以TypedArray数组内部也采用小端字节序读写数据，或者更准确的说，按照本机操作系统设定的字节序读写数据。

这并不意味大端字节序不重要，事实上，很多网络设备和特定的操作系统采用的是大端字节序。这就带来一个严重的问题：如果一段数据是大端字节序，TypedArray数组将无法正确解析，因为它只能处理小端字节序！为了解决这个问题，JavaScript引入DataView对象，可以设定字节序。

	// 假定某段buffer包含如下字节 [0x02, 0x01, 0x03, 0x07]
	var buffer = new ArrayBuffer(4);
	var v1 = new Uint8Array(buffer);
	v1[0] = 2;
	v1[1] = 1;
	v1[2] = 3;
	v1[3] = 7;
	var uInt16View = new Uint16Array(buffer);
	// 计算机采用小端字节序
	// 所以头两个字节等于258
	if (uInt16View[0] === 258) {
		console.log('OK'); // "OK"
	}
	// 赋值运算
	uInt16View[0] = 255; // 字节变为[0xFF, 0x00, 0x03, 0x07]
	uInt16View[0] = 0xff05; // 字节变为[0x05, 0xFF, 0x03, 0x07]
	uInt16View[1] = 0x0210; // 字节变为[0x05, 0xFF, 0x10, 0x02]

下面的函数可以用来判断，当前视图是小端字节序，还是大端字节序。

	const BIG_ENDIAN = Symbol('BIG_ENDIAN');
	const LITTLE_ENDIAN = Symbol('LITTLE_ENDIAN');
	function getPlatformEndianness() {
		let arr32 = Uint32Array.of(0x12345678);
		let arr8 = new Uint8Array(arr32.buffer);
		switch ((arr8[0]*0x1000000) + (arr8[1]*0x10000) + (arr8[2]*0x100) + (arr8[3])) {
			case 0x12345678:
			return BIG_ENDIAN;
			case 0x78563412:
			return LITTLE_ENDIAN;
			default:
			throw new Error('Unknown endianness');
		}
	}
总之，与普通数组相比，TypedArray数组的最大优点就是可以直接操作内存，不需要数据类型转换，所以速度快得多。

### 	BYTES_PER_ELEMENT属性
每一种视图的构造函数，都有一个BYTES_PER_ELEMENT属性，表示这种数据类型占据的字节数。

	Int8Array.BYTES_PER_ELEMENT // 1
	Uint8Array.BYTES_PER_ELEMENT // 1
	Int16Array.BYTES_PER_ELEMENT // 2
	Uint16Array.BYTES_PER_ELEMENT // 2
	Int32Array.BYTES_PER_ELEMENT // 4
	Uint32Array.BYTES_PER_ELEMENT // 4
	Float32Array.BYTES_PER_ELEMENT // 4
	Float64Array.BYTES_PER_ELEMENT // 8

这个属性在TypedArray实例上也能获取，即有TypedArray.prototype.BYTES_PER_ELEMENT。

###		ArrayBuffer与字符串的互相转换

ArrayBuffer转为字符串，或者字符串转为ArrayBuffer，有一个前提，即字符串的编码方法是确定的。假定字符串采用UTF-16编码（JavaScript的内部编码方式），可以自己编写转换函数。
	
	// ArrayBuffer转为字符串，参数为ArrayBuffer对象
	function ab2str(buf) {
		return String.fromCharCode.apply(null, new Uint16Array(buf));
	}
	// 字符串转为ArrayBuffer对象，参数为字符串
	function str2ab(str) {
		var buf = new ArrayBuffer(str.length * 2); // 每个字符占用2个字节
		var bufView = new Uint16Array(buf);
		for (var i = 0, strLen = str.length; i < strLen; i++) {
			bufView[i] = str.charCodeAt(i);
		}
		return buf;
	}

###		溢出
不同的视图类型，所能容纳的数值范围是确定的。超出这个范围，就会出现溢出。比如，8位视图只能容纳一个8位的二进制值，如果放入一个9位的值，就会溢出。

TypedArray数组的溢出处理规则，简单来说，就是抛弃溢出的位，然后按照视图类型进行解释。

	var uint8 = new Uint8Array(1);
	uint8[0] = 256;
	uint8[0] // 0
	uint8[0] = -1;
	uint8[0] // 255
上面代码中，uint8是一个8位视图，而256的二进制形式是一个9位的值100000000，这时就会发生溢出。根据规则，只会保留后8位，即00000000。uint8视图的解释规则是无符号的8位整数，所以00000000就是0。
负数在计算机内部采用“2的补码”表示，也就是说，将对应的正数值进行否运算，然后加1。比如，-1对应的正值是1，进行否运算以后，得到11111110，再加上1就是补码形式11111111。uint8按照无符号的8位整数解释11111111，返回结果就是255。

一个简单转换规则，可以这样表示。

正向溢出（overflow）：当输入值大于当前数据类型的最大值，结果等于当前数据类型的最小值加上余值，再减去1。

负向溢出（underflow）：当输入值小于当前数据类型的最小值，结果等于当前数据类型的最大值减去余值，再加上1。

请看下面的例子。

	var int8 = new Int8Array(1);
	int8[0] = 128;
	int8[0] // -128
	int8[0] = -129;
	int8[0] // 127

上面例子中，int8是一个带符号的8位整数视图，它的最大值是127，最小值是-128。输入值为128时，相当于正向溢出1，根据“最小值加上余值，再减去1”的规则，就会返回-128；输入值为-129时，相当于负向溢出1，根据“最大值减去余值，再加上1”的规则，就会返回127。

Uint8ClampedArray视图的溢出规则，与上面的规则不同。它规定，凡是发生正向溢出，该值一律等于当前数据类型的最大值，即255；如果发生负向溢出，该值一律等于当前数据类型的最小值，即0。

	var uint8c = new Uint8ClampedArray(1);
	uint8c[0] = 256;
	uint8c[0] // 255
	uint8c[0] = -1;
	uint8c[0] // 0

上面例子中，uint8C是一个Uint8ClampedArray视图，正向溢出时都返回255，负向溢出都返回0。

###		TypedArray.prototype.buffer

TypedArray实例的buffer属性，返回整段内存区域对应的ArrayBuffer对象。该属性为只读属性。
	
	var a = new Float32Array(64);
	var b = new Uint8Array(a.buffer);
上面代码的a视图对象和b视图对象，对应同一个ArrayBuffer对象，即同一段内存。

###		TypedArray.prototype.byteLength，TypedArray.prototype.byteOffset

byteLength属性返回TypedArray数组占据的内存长度，单位为字节。byteOffset属性返回TypedArray数组从底层ArrayBuffer对象的哪个字节开始。这两个属性都是只读属性。

	var b = new ArrayBuffer(8);
	var v1 = new Int32Array(b);
	var v2 = new Uint8Array(b, 2);
	var v3 = new Int16Array(b, 2, 2);
	v1.byteLength // 8
	v2.byteLength // 6
	v3.byteLength // 4
	v1.byteOffset // 0
	v2.byteOffset // 2
	v3.byteOffset // 2

###		TypedArray.prototype.length

length属性表示TypedArray数组含有多少个成员。注意将byteLength属性和length属性区分，前者是字节长度，后者是成员长度。

	var a = new Int16Array(8);
	a.length // 8
	a.byteLength // 16
####	TypedArray.prototype.set()

TypedArray数组的set方法用于复制数组（普通数组或TypedArray数组），也就是将一段内容完全复制到另一段内存。

	var a = new Uint8Array(8);
	var b = new Uint8Array(8);
	b.set(a);

上面代码复制a数组的内容到b数组，它是整段内存的复制，比一个个拷贝成员的那种复制快得多。

set方法还可以接受第二个参数，表示从b对象的哪一个成员开始复制a对象。
	
	var a = new Uint16Array(8);
	var b = new Uint16Array(10);
	b.set(a, 2)

上面代码的b数组比a数组多两个成员，所以从b[2]开始复制。

###		TypedArray.prototype.subarray()

subarray方法是对于TypedArray数组的一部分，再建立一个新的视图。

	var a = new Uint16Array(8);
	var b = a.subarray(2,3);
	a.byteLength // 16
	b.byteLength // 2

subarray方法的第一个参数是起始的成员序号，第二个参数是结束的成员序号（不含该成员），如果省略则包含剩余的全部成员。所以，上面代码的a.subarray(2,3)，意味着b只包含a[2]一个成员，字节长度为2。

####		TypedArray.prototype.slice()

TypeArray实例的slice方法，可以返回一个指定位置的新的TypedArray实例。

	let ui8 = Uint8Array.of(0, 1, 2);
	ui8.slice(-1)
	// Uint8Array [ 2 ]

上面代码中，ui8是8位无符号整数数组视图的一个实例。它的slice方法可以从当前视图之中，返回一个新的视图实例。

slice方法的参数，表示原数组的具体位置，开始生成新数组。负值表示逆向的位置，即-1为倒数第一个位置，-2表示倒数第二个位置，以此类推。

###		TypedArray.of()

TypedArray数组的所有构造函数，都有一个静态方法of，用于将参数转为一个TypedArray实例。

	Float32Array.of(0.151, -8, 3.7)
	// Float32Array [ 0.151, -8, 3.7 ]
	下面三种方法都会生成同样一个TypedArray数组。
	// 方法一
	let tarr = new Uint8Array([1,2,3]);
	// 方法二
	let tarr = Uint8Array.of(1,2,3);
	// 方法三
	let tarr = new Uint8Array(3);
	tarr[0] = 1;
	tarr[1] = 2;
	tarr[2] = 3;

###		TypedArray.from()

静态方法from接受一个可遍历的数据结构（比如数组）作为参数，返回一个基于这个结构的TypedArray实例。

	Uint16Array.from([0, 1, 2])
	// Uint16Array [ 0, 1, 2 ]
	这个方法还可以将一种TypedArray实例，转为另一种。
	var ui16 = Uint16Array.from(Uint8Array.of(0, 1, 2));
	ui16 instanceof Uint16Array // true
	from方法还可以接受一个函数，作为第二个参数，用来对每个元素进行遍历，功能类似map方法。
	Int8Array.of(127, 126, 125).map(x => 2 * x)
	// Int8Array [ -2, -4, -6 ]
	Int16Array.from(Int8Array.of(127, 126, 125), x => 2 * x)
	// Int16Array [ 254, 252, 250 ]

上面的例子中，from方法没有发生溢出，这说明遍历不是针对原来的8位整数数组。也就是说，from会将第一个参数指定的TypedArray数组，拷贝到另一段内存之中，处理之后再将结果转成指定的数组格式。

##		复合视图
由于视图的构造函数可以指定起始位置和长度，所以在同一段内存之中，可以依次存放不同类型的数据，这叫做“复合视图”。

	var buffer = new ArrayBuffer(24);
	var idView = new Uint32Array(buffer, 0, 1);
	var usernameView = new Uint8Array(buffer, 4, 16);
	var amountDueView = new Float32Array(buffer, 20, 1);

上面代码将一个24字节长度的ArrayBuffer对象，分成三个部分：

字节0到字节3：1个32位无符号整数

字节4到字节19：16个8位整数

字节20到字节23：1个32位浮点数

这种数据结构可以用如下的C语言描述：

	struct someStruct {
		unsigned long id;
		char username[16];
		float amountDue;
	};

##		DataView视图

如果一段数据包括多种类型（比如服务器传来的HTTP数据），这时除了建立ArrayBuffer对象的复合视图以外，还可以通过DataView视图进行操作。DataView视图提供更多操作选项，而且支持设定字节序。本来，在设计目的上，ArrayBuffer对象的各种TypedArray视图，是用来向网卡、声卡之类的本机设备传送数据，所以使用本机的字节序就可以了；而DataView视图的设计目的，是用来处理网络设备传来的数据，所以大端字节序或小端字节序是可以自行设定的。

DataView视图本身也是构造函数，接受一个ArrayBuffer对象作为参数，生成视图。

DataView(ArrayBuffer buffer [, 字节起始位置 [, 长度]]);

下面是一个例子。

	var buffer = new ArrayBuffer(24);
	var dv = new DataView(buffer);
	DataView实例有以下属性，含义与TypedArray实例的同名方法相同。
	DataView.prototype.buffer：返回对应的ArrayBuffer对象
	DataView.prototype.byteLength：返回占据的内存字节长度
	DataView.prototype.byteOffset：返回当前视图从对应的ArrayBuffer对象的哪个字节开始
	DataView实例提供8个方法读取内存。
	getInt8：读取1个字节，返回一个8位整数。
	getUint8：读取1个字节，返回一个无符号的8位整数。
	getInt16：读取2个字节，返回一个16位整数。
	getUint16：读取2个字节，返回一个无符号的16位整数。
	getInt32：读取4个字节，返回一个32位整数。
	getUint32：读取4个字节，返回一个无符号的32位整数。
	getFloat32：读取4个字节，返回一个32位浮点数。
	getFloat64：读取8个字节，返回一个64位浮点数。

这一系列get方法的参数都是一个字节序号（不能是负数，否则会报错），表示从哪个字节开始读取。

	var buffer = new ArrayBuffer(24);
	var dv = new DataView(buffer);
	// 从第1个字节读取一个8位无符号整数
	var v1 = dv.getUint8(0);
	// 从第2个字节读取一个16位无符号整数
	var v2 = dv.getUint16(1);
	// 从第4个字节读取一个16位无符号整数
	var v3 = dv.getUint16(3);

上面代码读取了ArrayBuffer对象的前5个字节，其中有一个8位整数和两个十六位整数。

如果一次读取两个或两个以上字节，就必须明确数据的存储方式，到底是小端字节序还是大端字节序。默认情况下，DataView的get方法使用大端字节序解读数据，如果需要使用小端字节序解读，必须在get方法的第二个参数指定true。

	// 小端字节序
	var v1 = dv.getUint16(1, true);
	// 大端字节序
	var v2 = dv.getUint16(3, false);
	// 大端字节序
	var v3 = dv.getUint16(3);
	DataView视图提供8个方法写入内存。
	setInt8：写入1个字节的8位整数。
	setUint8：写入1个字节的8位无符号整数。
	setInt16：写入2个字节的16位整数。
	setUint16：写入2个字节的16位无符号整数。
	setInt32：写入4个字节的32位整数。
	setUint32：写入4个字节的32位无符号整数。
	setFloat32：写入4个字节的32位浮点数。
	setFloat64：写入8个字节的64位浮点数。

这一系列set方法，接受两个参数，第一个参数是字节序号，表示从哪个字节开始写入，第二个参数为写入的数据。对于那些写入两个或两个以上字节的方法，需要指定第三个参数，false或者undefined表示使用大端字节序写入，true表示使用小端字节序写入。

	// 在第1个字节，以大端字节序写入值为25的32位整数
	dv.setInt32(0, 25, false);
	// 在第5个字节，以大端字节序写入值为25的32位整数
	dv.setInt32(4, 25);
	// 在第9个字节，以小端字节序写入值为2.5的32位浮点数
	dv.setFloat32(8, 2.5, true);
	如果不确定正在使用的计算机的字节序，可以采用下面的判断方式。
	var littleEndian = (function() {
	var buffer = new ArrayBuffer(2);
	new DataView(buffer).setInt16(0, 256, true);
	return new Int16Array(buffer)[0] === 256;
	})();

如果返回true，就是小端字节序；如果返回false，就是大端字节序。

##		12.5 二进制数组的应用

大量的Web API用到了ArrayBuffer对象和它的视图对象。

###		AJAX

传统上，服务器通过AJAX操作只能返回文本数据，即responseType属性默认为text。XMLHttpRequest第二版XHR2允许服务器返回二进制数据，这时分成两种情况。如果明确知道返回的二进制数据类型，可以把返回类型（responseType）设为arraybuffer；如果不知道，就设为blob。

	var xhr = new XMLHttpRequest();
	xhr.open('GET', someUrl);
	xhr.responseType = 'arraybuffer';
	xhr.onload = function () {
		let arrayBuffer = xhr.response;
		// ···
	};
	xhr.send();

如果知道传回来的是32位整数，可以像下面这样处理。

	xhr.onreadystatechange = function () {
		if (req.readyState === 4 ) {
			var arrayResponse = xhr.response;
			var dataView = new DataView(arrayResponse);
			var ints = new Uint32Array(dataView.byteLength / 4);
			xhrDiv.style.backgroundColor = "#00FF00";
			xhrDiv.innerText = "Array is " + ints.length + "uints long";
		}
	}

###		Canvas

网页Canvas元素输出的二进制像素数据，就是TypedArray数组。

	var canvas = document.getElementById('myCanvas');
	var ctx = canvas.getContext('2d');
	var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	var uint8ClampedArray = imageData.data;

需要注意的是，上面代码的uint8ClampedArray虽然是一个TypedArray数组，但是它的视图类型是一种针对Canvas元素的专有类型Uint8ClampedArray。
这个视图类型的特点，就是专门针对颜色，把每个字节解读为无符号的8位整数，即只能取值0～255，而且发生运算的时候自动过滤高位溢出。这为图像处理带来了巨大的方便。

举例来说，如果把像素的颜色值设为Uint8Array类型，那么乘以一个gamma值的时候，就必须这样计算：

	u8[i] = Math.min(255, Math.max(0, u8[i] * gamma));

因为Uint8Array类型对于大于255的运算结果（比如0xFF+1），会自动变为0x00，所以图像处理必须要像上面这样算。这样做很麻烦，而且影响性能。
如果将颜色值设为Uint8ClampedArray类型，计算就简化许多。

	pixels[i] *= gamma;

Uint8ClampedArray类型确保将小于0的值设为0，将大于255的值设为255。注意，IE 10不支持该类型。

###		 WebSocket

WebSocket可以通过ArrayBuffer，发送或接收二进制数据。

	var socket = new WebSocket('ws://127.0.0.1:8081');
	socket.binaryType = 'arraybuffer';
		// Wait until socket is open
	socket.addEventListener('open', function (event) {
		// Send binary data
		var typedArray = new Uint8Array(4);
		socket.send(typedArray.buffer);
	});
	// Receive binary data
	socket.addEventListener('message', function (event) {
		var arrayBuffer = event.data;
		// ···
	});

###		Fetch API

Fetch API取回的数据，就是ArrayBuffer对象。

	fetch(url)
		.then(function(request){
		return request.arrayBuffer()
	})
		.then(function(arrayBuffer){
		// ...
	});


###		File API

如果知道一个文件的二进制数据类型，也可以将这个文件读取为ArrayBuffer对象。

	var fileInput = document.getElementById('fileInput');
	var file = fileInput.files[0];
	var reader = new FileReader();
	reader.readAsArrayBuffer(file);
	reader.onload = function () {
		var arrayBuffer = reader.result;
		// ···
	};
下面以处理bmp文件为例。假定file变量是一个指向bmp文件的文件对象，首先读取文件。

	var reader = new FileReader();
	reader.addEventListener("load", processimage, false);
	reader.readAsArrayBuffer(file);

然后，定义处理图像的回调函数：先在二进制数据之上建立一个DataView视图，再建立一个bitmap对象，用于存放处理后的数据，最后将图像展示在Canvas元素之中。

	function processimage(e) {
	var buffer = e.target.result;
	var datav = new DataView(buffer);
	var bitmap = {};
		// 具体的处理步骤
	}
具体处理图像数据时，先处理bmp的文件头。具体每个文件头的格式和定义，请参阅有关资料。

	bitmap.fileheader = {};
	bitmap.fileheader.bfType = datav.getUint16(0, true);
	bitmap.fileheader.bfSize = datav.getUint32(2, true);
	bitmap.fileheader.bfReserved1 = datav.getUint16(6, true);
	bitmap.fileheader.bfReserved2 = datav.getUint16(8, true);
	bitmap.fileheader.bfOffBits = datav.getUint32(10, true);

接着处理图像元信息部分。

	bitmap.infoheader = {};
	bitmap.infoheader.biSize = datav.getUint32(14, true);
	bitmap.infoheader.biWidth = datav.getUint32(18, true);
	bitmap.infoheader.biHeight = datav.getUint32(22, true);
	bitmap.infoheader.biPlanes = datav.getUint16(26, true);
	bitmap.infoheader.biBitCount = datav.getUint16(28, true);
	bitmap.infoheader.biCompression = datav.getUint32(30, true);
	bitmap.infoheader.biSizeImage = datav.getUint32(34, true);
	bitmap.infoheader.biXPelsPerMeter = datav.getUint32(38, true);
	bitmap.infoheader.biYPelsPerMeter = datav.getUint32(42, true);
	bitmap.infoheader.biClrUsed = datav.getUint32(46, true);
	bitmap.infoheader.biClrImportant = datav.getUint32(50, true);

最后处理图像本身的像素信息。

	var start = bitmap.fileheader.bfOffBits;
	bitmap.pixels = new Uint8Array(buffer, start);

至此，图像文件的数据全部处理完成。下一步，可以根据需要，进行图像变形，或者转换格式，或者展示在Canvas网页元素之中。
