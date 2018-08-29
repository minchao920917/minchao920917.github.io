---
layout: post
title:  "ES6第九章 对象的扩展"
date:   2017-06-14 23:35:54
categories: ES6
tags: ES6
excerpt:	ES6允许直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。
mathjax: true
author:	闵超
---

* content
{:toc}
#  对象的扩展

###		属性的简洁表示法
ES6允许直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。

	var foo = 'bar';
	var baz = {foo};
	baz //{foo:'bar'}

	//等同于
	var baz = {foo:foo};
说明，ES6允许在对象之中，只写属性名，不写属性值。这时，属性值等于属性名所代表的变量，下面是另一个例子。
	
	function f(x,y){
		return {x,y}
	}
	//等同于
	
	function f(x,y){
		return {x:x,y:y};
	}
	
	f(1,2) //Object{x:1,y:2}
除了属性简写，方法也可以简写
	
	var 0 ={
		method(){
			return "Hello!";	
		}
	};
	
	//等同于
	
	var 0 = {
		method: function(){
			return "Hello!";
		}
	};
下面是一个实例的例子。

	var birth = '2000/01/01';
	
	var Person ={
		name:'张三',
		birth,
		//等同于调用birth:birth,
		
		//等同于hello:function()...
		hello(){ console.log('我的名字是',this.name);}
	}
这种写法用于函数的返回值，将会非常方便。
	
	function getPoint(){
		var x =1;
		var y =10;
		return {x,y};
	}
	
	getPoint();
	//{x:1,y:10}
CommonJS模块输出变量，就非常合适使用简洁写法。

	var ms = {};
	
	function getItem (key){
		return key in ms ? ms[key] :null;
	}
	
	function setItem (key,value){
		ms[key] = value;
	}

	function clear(){
		ms = {};
	}
	
	module.exports ={
		getItem:getItem,
		setItem:setItem,
		clear:clear
	};
属性的赋值器(setter)和取值器(getter)，都是采用这种写法

	var cart ={
		_wheels :4,
		
		get wheels(){
			return this._wheels;
		},
	
		set wheels(value){
			if(value <this._wheels){
				throw new Error('数值太小了！');
			}
			this._wheels = value;
		}
	}

##		属性名表达式
JavaScript语言定义对象的属性，有两种方法。
	
	//方法一
	obj.foo = true;
	
	//方法二
	obj['a' + 'bc'] = 123;
上面代码的方法一是直接用标识符作为属性名，方法二是用表达式作为属性名，这时要表达式放在方括号之内。
但是，如果使用字面量方式定义对象(使用大括号)，在ES6中只能使用方法一(标示符)定义属性
	
	var obj = {
		foo:true,
		abc:123
	};
ES6允许字面量定义对象时，用方法二(表达式)作为对象的属性名，即把对象表达式放在方括号内。
	
	let propKey = 'foo';
	
	let obj = {
		[propKey]:true,
		['a' +  'bc'] :123
	};

下面是另一个例子。
	
	var lastWord = 'last word';

	var a = {
		'first word' : 'hello',
		[lastWord] :'world'
	};
	a['first word'] //"hello"
	a[lastWord] //"world"
	a['last word'] //"world"

表达式还可以用于定义方法名。
	
	let  obj  = {
		['h' + 'ello'](){
			return 'hi';
		}
	};
	object.hello() //hi

注意：属性名表达式与简洁表示法，不能同时使用，会报错
	
	//报错
	var foo = 'bar';
	var bar = 'abc';
	var baz = {[foo]};
	
	//正确
	var foo = 'bar';
	var baz = {[foo]:'abc'}

##		方法的anem属性
函数的name属性，返回函数名，对象方法也是函数，因此也有name属性
	
	var person = {
		sayName(){
			console.log(this.name);
		},
		get firstName(){
			return "Nicholas";
		}
	};
	person.sayName.name // "sayName"
	pserson.firstName.name // "get firstName"
方法的name属性返回函数名(即方法名)，如果使用了取值函数，则会在方法名前加上get。如果是存执函数，方法名前会加上set。

有两种特殊情况:bind方法创造的函数，name属性返回的"bound"加上原函数的名字：Function构造函数创造的函数，name属性返回"anonymous"。
	
	(new Function()).name //"anonymous"
	
	var doSomething = function(){
		//...
	};
	doSometthing.bind().name //"bound doSomething"

如果对象的方法是一个Symbol值，那么name属性返回的是这个Symbol值的描述
	
	const key1 = Symbol('description');
	const key2 = Symbol();
	let obj = {
		[key1](){},
		[key2](){},
	};
	obj[key1].name //"[description]"
	obj[key2].name //""
上面代码中，key1对应的Symbol值有描述，key2没有

##		Object.is()
ES5比较两个值是否相等，只有两个运算符：相等运算符(==)和严格相等运算符(===)。它们都有缺点，前者会自动转换数据类型，后者的NaN不等于自身，以及+0等于-0.JavaScript缺乏一种运算，在所有环境中，只有两个值是一样的，它们就应该相等。

ES6提出"Same-value equality"(同值相等)算法，用来解决这个问题。Object.is就是部署这个算法的新方法。它用来比较两个值是否严格相等，与严格比较运算符(===)的行为基本一致。
	
	Object.is('foo','foo')
	//true
	Object.is({},{})
	//false
不同之处只有两个：一是+0不等于-0，而是NaN等于自身。
	
	+0 === -0 //true
	NaN === NaN//false
	Object.is(+0,-0) //false
	Object.is(NaN,NaN) //true

ES5可以通过下面的代码，部署Object.is。
	
	Object.defineProperty(Object,'is',{
		value:function(x,y){
			if(x === y){
				//针对+0不等于-0的情况
				return x !== 0 || 1/x === 1/y;
			}
			//针对NaN的情况
			return x !== x && y !==y;
		},
		configurable :true,
		enumerable: false,
		writable.true
	});

##		Object.assign()
###		基本用法
Object.assign方法用于对象的合并，将源对象(source)的所有可枚举属性，赋值到目标对象(target)。
	
	var target = {a:1};
	
	var source1 = {b:2};
	
	var source2 = {c:3};
	
	Object.assign(target,source1,source2);
	target //{a:1,b:2,c:3}
Object.assign方法的第一个参数是目标对象，后面的参数都是源对象。

注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。
	
	var target = {a:1,b:1};
	
	var source1 = {b:2,c:2};
	var source2 = {c;3};
	
	Object.assign(target,source,sources2);
	target //{a:1,b:2,c:3}
如果只有一个参数，Object.assign会直接返回该参数。

	var obj ={a;1};
	Object.assign(obj) === obj //true
	
如果该参数不是对象，则会先转成对象，然后返回
	
	typeof Object.assign(2) //"object"
由于undefined和null无法转成对象，所以如果它们作为参数，就会报错
	
	Object.assign(undefined)//报错
	Object.assign(null)//报错
如果非对象参数出现在源对象的位置(即非首参数),那么处理规则有所不同，首先这些参数都会转成对象，如果无法转成对象，就会跳过，这意味着，如果undefined和null不在首参数，就不会报错。

	let obj = {a;1};
	Object.assign(obj,undefined) ===obj //true
	Object.assign(obj,null) === obj //true
其他类型的值(即数值、字符串和布尔值)不在首参数，也不会报错。但是，除了字符串会以数组形式，拷贝入目标对象，其他值都不会产生效果。
	
	var v1 = 'abc';
	var v2 = true;
	var v3 = 10;
	
	var obj = Object.assign({},v1,v2,v3);
	console.log(obj);  //{'0':'a','1':'b','2':'c'}
上面代码中，v1、v2、v3分别是字符串、布尔值和数值，结果字符串合入目标对象(以字符数组的形式)，数值和布尔值都会被忽略。这是因为只有字符串的包装对象，会产生可枚举属性。
	
	Object(true) //{[[PrimitiveValue]]:true}
	Object(10)   //{[[PrimitiveValue]]:10}
	Object('abc') //{0:'a','1':"b",2:"c",length:3,[[PrimitiveValue]]:"abc"}
布尔值、数值、字符串分别转成对应的包装对象，可以看到它们的原始值都在包装对象的内部属性[[PrimitiveValue]]上面，这个属性是不会被Object.assign拷贝的，只有字符串的包装对象，会产生可枚举的实义属性，那些属性则会被拷贝。

Object.assign拷贝的属性是有限制的，只拷贝源对象的自身属性(不拷贝继承属性)，也不拷贝不可枚举的属性(enumerable:fasle)。
	
	Object.assign({b:'c'},
		Object.defineProperty({},'invisible',{
			enumerable:false,
			value:'hello'
		})
	)
	//{b:'c'}
上面代码中，Object.assign要拷贝的对象只有一个不可枚举属性invisible，这个属性并没有被拷贝进去。

属性名为Symbol值的属性，也会被object.assign拷贝。
	
	Object.assign({a:'b'},{ [Symbol('c')]: 'd' })
	//{a:'b',Symbol(c):'d'}

###		注意点
Object.assign方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。

	var obj1  = {a:{b:1}};
	var obj2 = Object.assign({},obj1);
	
	obj1.a.b = 2;
	obj2.a.b //2
上面代码中，源对象obj1的a属性的值是一个对象，Object.assign拷贝得到的是这个对象的引用。

一旦遇到同名属性，Object.assign的处理方法是替换，而不是添加。
	
	var target = {a:{b:'c',d:'e'}}
	var source = {a:{b:'hello'}}
	Object.assign(target,source)
	//{a:{b:'hello'}}
上面代码中，target对象的a属性被source对象的a属性整个替换掉了，而不会得到{a:{b:'hello',d:'e'}}的结果。这通常不是开发者想要的，需要特别小心

有一些函数提供object.assign的定制版本，可以解决浅拷贝的问题，得到身拷贝的合并。

注意，Object.assign同样可以用来处理数组，但是是把数组看做对象来合并
	
	Object.assign([1,2,3],[4,5])
	//[4,5,3]

###		Object.assign的用途
1.	为对对象添加属性
	
	class Point {
		constructor(x,y){
			Object.assign(this,{x,y});	
		}
	}
通过Object.assign方法，将x属性和y属性添加到Point类对象实例。

2.	为对象添加方法
	
	Object.assign(SomeClass.propertype,{
		someMethod(arg1,arg2){
			...
		},
		anotherMethod(){
			...
		}
	});
	//等同于下面的写法
	SomeClass.prototype.someMethod = function (arg1,arg2){
		...
	};
	SomeClass.propertype.anotherMethod = function (){
		...
	};
对象属性的简洁表示法，直接将两个函数放在大括号中，再使用assign方法添加到SomeClass.prototype之中。

3.	克隆对象
	
	function clone(origin){
		return Object.assign({},origin);
	}
采用这种方法克隆，只能克隆原始对象自身的值，不能克隆它继承的值。如果想要保持继承链，可以采用下面的代码。
	
	function clone(origin){
		let originProto = Object.getPrototypeOf(origin);
		return Object.assign(Object.create(originProto),origin);
	}

4.	合并多个对象
将多个对象合并到某个对象。
	
	const merge = (target,...sources) => Object.assign(target,...sources);
如果希望合并后返回一个新对象，可以改写上面函数，对一个空对象合并。

	const merger = (...sources) => Object.assign({},...sources);

5.	为属性指定默认值
	
	const DEFAULTS ={
		logLevel:0,
		outputFormat:'html'
	};

	function processContent(options){
		let options = Object.assign({},DEFAULTS,options);		
	}
上面代码中，DEFAULTS对象是默认值，options对象是用户提供的参数。Object.assign方法将DEFAULT和options合并成一个对象。否则，将导致DEFAULTS对象的该属性不起作用

##		属性的可枚举性
对象的每个属性都有一个描述对象(Descriptor)，用来控制该属性的行为。Object.getOwnPropertyDescriptor方法可以获取该属性的描述对象。

		let obj = {foo:123};
		Object.getOwnPropertyDescriptor(obj,'foo')
		//{
		//	value:123,
		//	writable:true,
		//  enumerable:true,
		//  configurable:true
		//}
描述对象的enumerable属性，称为"可枚举性"，如果该属性为 false，就表示某些操作会忽略当前属性。

ES5有三个操作会忽略enumerable为false的属性。
	
-	for ... in循环：只遍历对象自身和继承的可枚举属性
-	Object.kleys():返回对象自身的所有可枚举的属性的键名
-	JSON.stringify();只串行化对象自身的可枚举属性

-	ES6新增了一个操作Object.assign()，会忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性。
这四个操作中，只有for ...in 会返回继承的属性，实际上，引入enumerable的最初目的，就是让某些属性可以规避掉for... in操作，比如对象原型的toString方法，以及数组的length属性，就通过这种手段，不会被for...in遍历到。

	Object.getOwnPropertyDescriptor(Object.prototype,'toString').enumerable
	/false
	
	Object.getOwnPropertyDescriptor([],'length').enumerable
	//false
上面代码中，toString和length属性的enumerable都是false，因此for...in不会遍历到这两个继承自原型的属性。

另外，ES6规定，所有Class的原型的方法都是不可枚举的。
	
	Object.getOwnPropertyDescriptor(class{foo(){}}.prototype,'foo').enumerable
	//false
总的来说，操作中引入继承的属性会让问题复杂化，多数时候，我们只关心对象自身的属性。所以，尽量不要用for ...in 循环，而是用Object.keys()代替。

##		属性的遍历
ES6一共提供了五种遍历对象属性的方法

1.	for...in 
	
	for...in循环遍历对象自身的和继承的可枚举属性(不含Symbol属性)
2.	Object.keys(obj)
	
	Object.keys返回一个数组，包括对象自身的(不含继承的)所有可枚举属性(不含Symbol属性)

3.	Object.getOwnPropertyNames(obj)
	
	Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性(不含Symbol属性，但是包括不可枚举属性)。

4.	Object.getOwnPropertySymbols(obj)
	
	Object.getOwnPropertySymbols返回一个数组，包含自身的所有Symbol属性

5.	Reflect.ownKeys(obj)
	
	Reflect.ownKeys返回一个数组，包含对象自身的所有属性，不管是属性名是Symbol或字符串，也不管是否可枚举。
	
以上5种方法便来对象的属性，都遵守同样的属性遍历的次序规则。
	
-	首先遍历所有属性名为数值的属性，按照数字排序。
-	其次遍历所有属性名为字符串的属性，按照生成时间排序。
-	最后遍历所有属性名为Symbol值的属性，按照生成时间排序

##		_proto_属性，Object.setPrototypeOf(),Object.getPrototypeOf()

1.	__proto__属性

	__proto__属性(前后各两个下划线),用来读取或设置当前对象的prototype对象。目前，所有浏览器(包括IE11)都部署了这个属性。
		
		//es6的写法
		var obj = {
			method:function(){...}
		};
		obj.__proto__ = someOtherObje;
		
		//es5的写法
		var obj = Object.create(someOtherObj);
		obj.method = function(){...};
	该属性没有写入ES6的正文，而是写入附录，原因是__proto__前后的双下划线，说明它本质上是一个内部属性，而不是一个正式的对外的API，只是由于浏览器广泛支持，才被加入ES6。只有浏览器必须部署这个属性，其他运行环境不一定需要部署，而且新的代码最后认为这个属性是不存在的。所以，无论是从语义的角度，还是兼容性都不要使用这个属性。而是使用Object.setPropertypeOf()(写操作)、Obejct.getPrototypeOf()(读操作)、Object.create(生成操作)代替。

2.	Object.setPrototypeOf()

	Object.setPrototypeOf方法的作用与__proto__相同，用来设置一个对象的prototype对象。它是ES6正式推荐的设置原型对象的方法。
		
		//格式
		Object.setPrototypeOf(object,prototype)
	
		//用法
		var o = Object.setPrototypeOf({},null);
	该方法等同于这样的一个函数
		
		function (obj,proto){
			obj.__proto__ = proto;
			return obj;
		}
	下面是一个例子
	
		let proto = {};
		let obj = {x:10};
		Object.setPrototypeOf(obj,proto);
		
		proto.y =20;
		proto.z =40;
	
		obj.x //10
		obj.y //20
		obj.z //40
	上面代码将proto对象设为obj对象的原型，所以从obj对象可以读取proto对象的属性。

3.	Object.getPrototypeOf()
	
	该方法与setPrototypeOf()方法配套，用于读取一个对象的prototype对象。
	
		Object.getPrototypeOf(obj);
	例子
	
		function Rectangle(){
		}
		var rec = new Rectangle();
	
		object.getPrototypeOf(rec) === Rectangle.prototype
		//true
		
		Object.setPrototypeOf(rec,Object.prototype);
		Object.getPrototypeOf(rec) === Rectangle.prototype
		//false

##		Object.values(),Object.entries()
###		Object.keys()
ES5引入了Object.keys方法，返回一个数组，成员是参数对象自身的(不含继承的)所有可能遍历(enumerable)属性的键名。
	
	var obj = { foo:"bar",baz:42};
	Object.keys(obj)
	//["foo","baz"]
目前ES7又有提案，就是引入Object.values()和Object.entries()和Object.keys配套
	
	let {keys,value,entries} = object;
	let obj = {a:1,b:2,c:3};
	
	for (let key of keys(obj)){
		console.log(key) //'a','b','c'
	}
	
	for (let value of values(obj)){
		console.log(value);//1,2,3
	}
	
	for (let [key,value] of entries(obj)){
		console.log([key,value]);//['a',1],['b',2],['c',3]
	}

###		Object.values()
Object.values返回一个数组，成员是参数对象自身的(不含继承的)所有可遍历 (enumerable)属性的键值。

	var obj = {foo:"bar",baz:42 };
	Object.values(obj)
	//["bar",42]

返回数组的成员顺序，与本章的《属性的遍历》部分介绍排列规则一致。
	
	var obj = {100:'a',2:'b',7:'c'};
	Object.values(obj) //['b','c','a']
Object.avlue只返回对象自身可遍历的属性
	
	var obj = object.create({},{p:{value:42}});
	Object.values(obj) //[]
上面，Object.create方法的第二个参数添加的对象属性(属性p),如果不显式声明，默认不可遍历的。Object.values不会返回这个属性。Object.values会过滤属性名为Symbol值的属性。
	
Object.values会过滤属性名为Symbol值的属性。
	
	Object.values({[Symbol()]:123,foo:'abc'});
	//['abc']	
如果Object.values方法的参数是一个字符串，会返回各个字符组成的一个数组。
	
	Object.values('foo')
	//['f','o','o']
上面代码中，字符串会先转成一个类似数组的对象，字符串的每个字符，就是该对象的一个属性。因此，Object.values返回每个属性的键值，就是各个字符组成的一个数组。

如果参数不是对象，object.value会先将其转为对象。由于数值和布尔值的包装对象，都不会为实例添加非继承的属性。所以，object.values会返回空数组。
	
	Object.values(42) //[]
	Object.values(true) //[]

###		Object.entries
Object.entries方法返回一个数组，成员是参数对象自身的(不含继承的)所有可遍历(enumerable)属性的键值对数组。
	
	var obj = {foo:'bar',baz:42};
	Object.entries(obj)
	//[["foo","bar"],["baz",42]]
返回值不一样，该方法的行为与Object.values基本一致。
如果原对象的属性名是一个Symbol值，该属性会被省略。
	
	Object.entries({[Symbol()]:123,foo:'abc'});
	//[['foo','abc']]
上面代码中，原对象有两个属性，Object.entries只输出属性名非Symbol值的属性。将来可能会有Reflect.ownEntries()方法，返回对象自身的所有属性。

Object.entries的基本用途是遍历对象的属性。

	let obj = {one:1,two:2};
	for (let [k,v] of Obejct.entries(obj)){
		console.log(`${JSON.stringify(k)}:${JSON.stringify(v)}`);
	}
	//"one":1
	//"two":2
Object.entries方法的一个用处是，将对象转为真正的Map结构。
	
	var obj = {foo:'bar',baz:42 };
	var map = new Map(Object.entries(obj));
	map //Map{foo:"bar",baz:42}
自己实现Object.entries方法，非常简单
	
	//Generator函数的版本
	function* entries(obj){
		for (let key of Object.keys(obj)){
			yield [key,obj[key]];
		}
	}
	//非Generator函数的版本
	function entries(obj){
		let arr =[];
		for (let key of Object.keys(obj)){
			arr.push([key,obj[key]]);
		}
		return arr;
	}

##		对象的扩展运算符
目前，ES7有一个提案，将Rest解构赋值/扩展运算符(...)引入对象。Babel转码器已经支持这个项功能。

1.	Rest解构赋值
	
	对象的Rest解构赋值用于从一个对象取值，相当于将所有可遍历的、但尚未被读取的属性，分配到指定的对象上面。所有的键和它们的值，都会拷贝到新对象上。
	
		let {x,y,...z} = {x:1,y:2,a:3,b:4};
		x//1
		y//2
		z//{a:3,b:4}
	上面代码中，变量z是Rest解构赋值所在的对象。它获取符号右边的所有尚未读取的键(a和b),将它们和它们的值拷贝过来。

	由于Rest解构赋值要求等号右边是一个对象，所以如果等号右边是undefined或null，就会报错，因为它们无法转为对象。
		
		let {x,y,...z} = null;//运行时报错
		let {x,y,...z} = undefined;//运行时报错
	Rest解构赋值必须是最后一个参数，否则会报错。
	
		let {...x,y,z} = obj;//句法错误
		let {x,...y,...z} = obj; //句法错误
	上面代码中，Rest解构赋值不是最后一个参数，所以会报错。
	
	注意，Rest解构赋值的拷贝是浅拷贝，即如果一个键的值是复合类型的值(数组、对象、函数)、那么Rest解构赋值拷贝的是这个值的引用，而不是这个值的副本。
	
		let obj = {a:{b:1}};
		let {...x} = obj;
		obj.a.b = 2;
		x.a.b //2
	上面 代码中，x是Rest解构赋值所在的对象，拷贝了对象obj的a属性。a属性引用了一个对象，修改这个对象的值，会影响到Rest解构赋值对它的引用。
	另外，Rest解构赋值不会拷贝继承自原型对象的属性。

		let o1 = {a:1};
		let 02 = {b:2};
		o2.__proto__ =o1;
		let o3 = {...o2};
		o3 //{b:2}
	对象o3是o2的拷贝，但是只复制了o2自身的属性，没有赋值它的原型对象o1的属性。
	
	Rest解构赋值的一个用处，是扩展某个函数的参数，引入其他操作。
	
		function baseFunction({a,b}){
			//...
		}
		function wrapperFunction({x,y,...restConfig}){
			//使用x和y参数进行操作
			//其余参数传给原始函数
			return baseFunction(restConfig);
		}
	原始函数baseFunction结构a和b作为参数，函数wrapperFunction在baseFunction的基础上进行了扩展，能够接受多余的参数，并且保留原始函数的行为。

2.	扩展运算符

	扩展运算符(...)用于去除参数对象的所有可遍历属性。拷贝到当前对象之中。
		
		let z = {a:3,b:4};	
		let n = {...z};
		n //{a:3,b:4}
	这等同于使用Object.assign方法。
		
		let aClone ={...a};
		//等同于
		let aClone = Object.assign ({},a);
	扩展运算符可以用于合并两个对象。
	
		let ab = {...a,...b};
		//等同于 
		let ab = Object.assign({},a,b);
	如果用户自定义的属性，放在扩展运算符后面，则扩展运算符内部的同名属性会被覆盖掉。
	
		let aWithOverRides = {...a,x:1,y:2};
		//等同于
		let aWithOverrides = {...a,...{x:1,y:2}};
		//等同于 
		let x =1,y =  2, aWithOverrides = {...a,x,y};
		//等同于
		let aWithOverrides = Object.assign({},a,{x:1,y:2});
	a对象的x属性和y属性，拷贝到新对象后会被覆盖掉。者用来修改现有对象部分的部分属性就很方便了
	
		let newVersion = {
			...previousVersion,
			name:"New Name" //Override the name property
		}
	newVersion对象定义了name属性，其他属性全部复制自previousVersion对象。
	如果把自定义属性放在扩展运算符前面，就变成了设置新对象的默认属性值。
	
		let aWithDefaults = {x:1,y:2,...a};
		//等同于
		let aWithDefaults = object.assign({},{x:1,y:2},a);
		//等同于
		let aWithDefaults = Object.assign({x:1,y:2},a);
	扩展运算符的参数对象之中，如果有取值函数get，这个函数是会执行的。
		
		//并不会抛出错误，因为x属性只是被定义，但没有执行
		let aWithXGetter = {
			...a,
			get x(){
				throws new Error('not thrown yet');
			}
		};
		
		//会抛出错误，因为x属性被执行了
		let runtimeError = {
			...a,
			...{
				get x(){
					throws new Error('thrown now');
				}
			}
		};
	如果扩展运算符参数是null或者undefined，这两个值会被忽略，不会报错
		
		let emptyObject = {...null,...undefined};//不报错

##		Object.getOwnPropertyDescriptors()
ES5有一个Object.getOwnPropertyDescriptor方法，返回某个对象属性的描述对象(descriptor)。
	
	var obj = {p:'a'};
	
	Object.getOwnPropertyDescriptor(obj,'p')
	//Object{ value :"a",
	//	writable:true,
	//	enumerable:true,
	//	configurable:true
	//}
ES7有一个提案，提出了Object.getOwnPropertyDescriptor方法，返回指定对象所有自身属性(非继承属性)的描述对象。
	
	const obj = {
		foo:123,
		get bar() { return 'abc'}
	};
	
	Object.getOwnPropertyDescriptors(obj)
	//{ foo:
	//		{ value:123,
	//		  writable:true,
	//		  enumerable:true,
	//		  configurable:true},
	//				
	//	bar:
	//		{   get :[Function:bar],
	//			set : undefined,
	//			enumerable:true,
	//			configurable:true
	//		}
	//}
Object.getOwnPropertyDescriptors方法返回一个对象，所有原对象的属性名都是该对象的属性名，对应的属性值是该属性的描述对象。该方法的实现非常日容易。
	
	function getOwnPropertyDescriptors(obj){
		const result = {};
		for (let key of Reflect.ownKeys(obj)){
			result[key] = Object.getOwnPropertyDescriptor(obj,key);
		}
		return result;
	}
该方法主要是为了解决Object.assign()无法正确拷贝get属性和set属性的问题。

	const source = {
		set foo(value){
			console.log(value);
		}
	};
	
	const target1 = {};
	Object.assign(target1,source);
	
	Object.getOwnPropertyDescriptor(target1,'foo')
	
	//{ valuse : undefined,
	//	writable:true,
	//	enumerable:true,
	//	configurable:true }
Object.getOwnPropertyDescriptors方法返回一个对象，所有原对象的属性名都是该对象的属性名，对应的属性值就是该属性的描述对象。
	
	function getOwnPropertyDescriptors(obj){
		const result ={};
		for (let key of Reflect.ownKeys(obj)){
			result[key] = Object.getOwnPropertyDescriptor(obj,key);
		}
		return result;
	}
该方法的提出是为了解决Object.assign()无法正确拷贝get属性和set属性的问题。

	const source ={
		set foo(value){
			console.log(value);
		}
	};
	const target1 = {};
	Object.assign(target1,source);
	
	Object.getOwnPropertyDescriptor(target1,'foo')
	//{	value:undefined,
	//	writable:true,
	//	enumerable:true,
	// configurable:true
	//	}
上面的代码中，source对象的foo属性的值是一个赋值函数，Object.assign方法将这个属性拷贝给target1对象，结果该属性的值变成了undefined。这是因为Obejct.assign方法总是拷贝一个属性的值，而不会拷贝它背后的赋值方法或取值方法。

这时，Object.getOwnPropertyDescriptors方法配合Object.defineProperties方法，就可以实现正常拷贝。
	
	const source = {
		set foo(value){
			console.log(value);
		}	
	};
	
	const target2 = {};
	Object.defineProperties(target2,Object.getOwnPropertyDescriptors(source));
	Object.getOwnPropertyDescriptor(target2,'foo')
	//{	get: undefined,
	//	set:[Function:foo],
	//	enumerable:true,
	//	configurable:true
	//}
上面代码中，将两个对象合并的逻辑提炼出来，就是下面这样。
	
	const shallowMerge = (target,source) => Object.defineProperties(
		target,
		Object.getOwnPropertyDescriptors(source)
	);
Object.getOwnPropertyDescriptors方法的另一个用处，是配合Object.create方法，将对象属性克隆岛一个新对象。着属于浅拷贝。
	
	const clone = Object.create(Object.getPrototupeOf(obj),
		Object.getOwnPropertyDescriptors(obj));
		//或者
		const shallowClone = (obj) => Object.create(
			Object.getPrototypeOf(obj),
			Object.getOwnPropertyDescriptors(obj)
		);
上面代码会克隆对象obj。

另外，Object.getOwnPropertyDescriptors方法可以实现，一个对象继承另一个对象。以前，继承另一个对象。以前，继承另一个对象，常常写成下面这样。
	
	const obj = {
		__proto__ : prot,
		foo:123,
	};
ES6规定__proto__只有浏览器部署，其他环境不用部署，如果去除__proto__，上面代码就要改成下面这样。
	
	const obj = Object.create(prot);
	obj.foo = 123 ;
	//或者
	const obj = Object.assign(
		Object.create(prot),
		{
			foo:123,
		}
	);
有了Object.getOwnPropertyDescriptors，我们就有了另一种写法。

	const obj = Object.create(
		prot,
		Object.getOwnPropertyDescriptors({
			foo:123,
		})
	);
Object.getOwnPropertyDescriptors也可以用来实现Mixin(混入)模式。
	
	let min = (object) => ({
		with : (...mixins) => mixins.reduce(
			(c,mixin) => Object.create(
				c,Object.getOwnPropertyDescriptors(mixin)
			),object)
	});
	
	//multiple mixins example
	let a = {a:'a'};
	let b = {b:'b'};
	let c = {c:'c'};
	let d = min(c).with(a,b);
对象a和b被混入了c对象

处于完成性的考虑，Obejct.getOwnPropertyDescriptors进入标准以后，还会有Reflect.getOwnPropertyDescriptors方法。

	
	
 
