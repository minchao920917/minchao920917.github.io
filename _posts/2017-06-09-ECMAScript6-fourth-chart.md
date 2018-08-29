---
layout: post
title:  "ES6第四章 字符串的扩展"
date:   2017-06-09 23:35:54
categories: ES6
tags: ES6
excerpt:	ES6加强了对Unicode的支持，并且扩展了字符串对象。
mathjax: true
author:	闵超
---

* content
{:toc}

#	第四章 字符串的扩展
ES6加强了对Unicode的支持，并且扩展了字符串对象。

### 	字符的Unicode表示法
JavaScript允许采用\uxxxx形式表示一个字符串，其中“xxxx”表示字符的码点

	"\u0062"
	//"a"
但是，这种表示法只限于\u0000——\uFFFF之间的字符，超出这个范围必须用两个双字节的形式表达。

	"\uD842\uDFB7"
	//"吉"

ES6对这点进行了改进，只要将码点放入大括号，就能正确解读该字符。

	"\u{20BB7}"
	//"吉"

	“\u{41}\u{42}\u{43}”
	//"ABC"

	let hello = 123;
	hell\u{6F} //123
	
	'\u{1F680}'  === '\uD830\uDE80'
	//true
综上所述：JavaScript共有6中方法可以表示一个字符。

	'\z' === 'z'  //true
	'\172' === 'z' //true
	'\x7A' === 'z' //true
	'\uoo7A' === 'z' //true
	'\u{7A}' === 'z' //true

##	codePointAt()方法
JavaScript内部，字符一UTF-16的格式存储，每个字节固定为2个字节。对于那些需要4个字节存储的字符(Unicode码点大于0xFFFF的字符)，JavaScript会认为它们是两个字符。
	
	var s="吉";
	
	s.length //2
	s.charAt(0) //''
	s.charAt(1) //''
	s.charCodeAt(0) //55362
	s.charCodeAt(1) //57271
汉字“吉”的码点是0x20BB7	,utf-16编码为0xD842 0xDFB7(十进制是55362 57271),需要四个字节存储，对于这种四个字节的字符，JavaScript不能正确处理，字符长度会误判为2，且charAt方法无法读取整个字符，charCodeAt方法只能返回前两个字节和后两个字节的值

ES6提供了codePointAt方法，能够正确处理4个字节的字符，返回一个字符的码点。
	
	var s = "吉a";

	s.codePointAt(0); //134071
	s.codePointAt(1); //57271
	
	s.chartCodeAt(2)//97
codePointAt方法的参数，是字符在字符串的位置(从0开始)。上面代码中，JavaScript将"吉a"视为三个字符。codePointAt方法在第一个字符上，正确的识别了"吉"，返回了它的十进制码点134071(即16进制的20BB7)。在第一个字符(即吉的后面两个字节)和第三个字符"a"上，codePointAt方法的结构与charCodeAt方法。总之codePointAt方法会争取返回32位的UTF-16字符码点。对于那些两个字节存储的常规字符，它的返回结果和charCodeAt方法相同。codePointAt方法返回的是码点的十进制值，如果想要十六进制的值，需要使用toString方法转换一下。
	
	var s = "吉a";

	s.codePointAt(0).toString(16)  //"20bb7"
	s.charCodeAt(2).toString(16)  //"61"

	等价于
	var s = "吉a";
	for(let ch of s){
		console.log(ch.codePointAt(0).toString(16));
	}
	//20bb7
	//61
	
codePointAt方法最常见的用法就是用来判断一个字符是两个字节还是三个字节组成。

	function is32Bit(c){
		ruturn c.codePoint(0) > 0xFFFF;
	}
	is32Bit("吉"); //true
	is32Bit("a"); //false

## String.fromCodePoint();
ES5提供 String.fromCharCode方法，用于从码点返回对应字符，但是这个方法不能识别32位的UTF-16字符（Unicode编号大于0xFFFF）。
	
	String.fromCharCode(0x20BB7);
	//乱码
String.fromCharCode不能识别大于0xFFFF的码点，所有0x20BB7发生了溢出，最高位2被舍弃了，最后返回码点u+0BB7对应的字符，而不是码点u+20BB7对应的字符。

ES6提供了String.fromCodePoint()方法，可以识别大于0xFFFF的字符，弥补了String.fromCharCode的方法的不足，作用上与codePointAt方法相反。
	
	String.fromCodePoint(0x20BB7);
	//“吉”
	String.fromCode.Point(0x78,ox1f680,0x79) === 'x\uD830\uDE89y';
	//true

**注意：fromCodePoint方法定义在String对象上，codePointAt()方法定义在字符串实例对象上。**

##		字符串的遍历器接口
ES6为字符串添加了遍历器接口，使得字符串可以被for...of循环遍历

	for(let codePoint of 'foo'){
		console.log(codePoint);
	}
	//"f"
	//"o"
	//"o"
除了遍历字符串，这个遍历器最大的优点是可以识别大于0xFFFF的码点，传统的for循环无法识别这样的码点。

	var text = String.fromCodePoint(0x20BB7);
	
	for(let i = 0; i < text.length;i++){
		consol.log(text[i]);
	}
	//""
	//""
	
	for(let i of text){
		console.log(i);
	}
	//"吉"
for循环会为人text包含两个字符，而for...of循环会正确识别成一个字符

##		at()
ES5对字符串对象提供chartAt方法，返回字符串给定位置的字符。该方法不能识别码点大于0xFFFF的字符。
	
	'abc'.charAt(0) //"a"
	'吉'.charAt(0)  //"\uD842"
charAt方法，返回的是UTF-16编码的第一个字节，实际上是无法显示的，目前，提出字符串实例的at方法，可以识别Unicode编号大于0xFFFF的字符串，返回正确的字符
	
	'abc'.at(0) //"a"
	"吉".at(0)  //"吉"

##		normalize()
许多欧洲语言有语调号和重音符。为了表示他们Unicode提供两种解决办法，第一种是直接提供重音符号的字符。另一种是提供合成符号，即原字符与重音符号的合成，这两个字符合成一个字符。

ES6提供字符串实例的normalize()方法，用来将字符的不同表示方法统一为同样的形式，这称为Unicode正则化。normalize方法可接受一个参数来指定normalize的方式，参数的四个可选值如下。

1.	NFC,默认参数，表示“标准等价合成”，返回多个简单字符和合成字符。所谓“标准等价合成”指的是视觉和语义上的等价
2.	NFD，表示"标准等价分解"，即在标准等价的前提下，返回合成字符分解的多个简单字符。
3.	NFKC，表示"兼容等价合成"，返回合成字符，
4.	NFKD，表示"兼容等价分解"

##	includes()，startWith(),endsWith()

传统上，JavaScript只有indexOf方法，用来确定一个字符串是否包含另一个字符串。ES6又提供了三个新方法。

-	includes():返回布尔值，表示是否找到参数字符串。
-	startsWith():返回布尔值，表示参数字符串是否在源字符串的头部
-	endesWith():返回布尔值，表示参数字符串是否在源字符串的尾部

这三个方法，都支持第二个参数，表示开始搜索的位置

	var s = 'Hello world!';
	s.startsWith("world",6);//true
	s.endsWith('hello',5);//true
	s.includes('hello',6);//false

##		repeat()
repeat方法返回一个新字符串，表示将元字符串重复n次
	
	'x'.repeat(3);//"xxx"
	'na'.repaet(0);//""

参数如果是小数，会被向下取整，参数如果是负数或者Infinity会报错，参数如果是NaN，则等同于0


##		padStart(),padEnd()
ES7推出了字符串补全长度的功能，如果某个字符串不够指定长度，会在头部或者尾部补全。padStart用于头部补全，padEnd用于尾部补全。
	
	'x'.padStart(5,'ab') //'ababx'
	'x'.padEnd(5,'ab')  //'xabab'
如果原字符串的长度，等于或大于指定的最小长度，则返回原字符串
	
	'xxx'.padStart(2,'ab'); //'xxx'
	'xxx'.padEnd(2,'ab'); //'xxx'
如果用来补全的字符串与原字符串，两者的长度之和超过了指定的最小长度，则会截取超出位数的补全字符串。

	'abc'.padStart(10,'0123456789'); //'0123145abc'
如果省略第二个参数，则会空出空格补全长度
	
	'x'.padStart(4) //'   x'
	'x'.padEnd(4)  //'x   '
padStart的常见的用途是为数值补全指定位数，下面代码生成10位的数值字符串
	
	'1'.padStart(10,'0') //'0000000001'

另一个用途是提示字符串格式
	
	'12'.padStart(10,'YYYY-MM-DD')//'YYYY-MM-12'
	'09-12'.padStart(10,'YYYY-MM-DD') //'YYYY-09-12'

##		模板字符串

传统的JavaScript语言，输出模板通常是这样写的

	$('#result).append(
		'There are <b>' + basket.count +'</b>'+
		'items in your basket, ' +
		'<em>' + basket.onSale +
		'</em> are on sale!'
	);
这样写法相当繁琐不方便，ES6引入了模板字符串解决了和这个问题

	$('#result').append(`
		There are <b>${basket.count}</b> items
		in your basket, <em>${basket.onSale}</em>
		are on sale!
	`);
模板字符串(template String)是增强的字符串，用反(`)标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。
	
	//普通字符串
	`In JavaScript '\n' in a line-feed.`
	
	//多行字符串
	` In JavaScript this is 
	not legal.`
	
	console.log(`string text line 1 
	string text line 2`);

	//字符串中嵌入变量
	var name = "Bob",time = "today";
	`Hello ${name},how are you ${today}?`

如果模板字符串用反引号标识，却需要在模板字符串中引用反引号，则在前面加上反斜杠转义

如果使用模板字符串表示多行字符串，所有空格和缩进都会保留在输出之中。

	$('#list').html(`
		<ul>
			<li>first</li>
			<li>second</li>
		</ul>
	`);

如果你不想所有模板字符串的空格和换行，可以易用trim方法消除
	
	$('#list').html(`
		<ul>
			<li>first</li>
			<li>second</li>
		</ul>
	`.trim());

模板字符串中嵌入变量，需要将变量名写在${}之中。
大括号内部可以放入任意的JavaScript表达式，可以进行运算，以及引用对象属性。同样，模板字符串中还能调用函数

	var x =1;
	var y =2;
	function fn(){
		return "Hello World!";
	} 
	`${x} + ${y} = ${x+y}, ${fn()}`
	//1+2=3,Hello World

如果大括号中的值不是一个字符串，将会按照一般规则转化为字符串，比如，大括号中是一个对象，将默认调用对象的toString方法。

模板字符串甚至还能嵌套

	const templ = addrs =>'
		<table>
			${addrs.map( addr =>'
				<tr><td>${addr.first}</td></tr>
				<tr><td>${addr.last}</dt></tr>
			').join('')}
		</table>
	';
模板字符串的变量之中，又嵌入了另一个模板字符串。

	const data = [
		{first:'<Jane>',last:'Bond'},
		{first:'Lars',last:'<Croft>'}
	];
	console.log(templ(data));

	结果如下:
	//<table>
	
		<tr><td><Jane></td></tr>
		<tr><td>Bond</td></tr>

		<tr><td>Lars</td></tr>
		<tr><td><Croft></td></tr>
	//</table>


如果需要引用模板字符串本身，在需要时，执行，可以像下面这样写。

	//写法一
	let str = 'return' + '`Hello ${name}!`';
	let func = new Function('name',str);
	func('Jack') //"Hello Jack!"
	
	//写法二
	let str = '(name) =>`Hello ${name}!`';
	let func = eval.call(null,str);
	func('Jack') //'Hellp Jack!'

##	 模板编译实例

我们来看一个通过模板字符串，生成模板的实例

	var template = `
	<ul>
		<% for(var i =0;i<data.supplies.length;i++){ %>
			<li> <%= data.supplies[i]  %></li>	
		<% } %>
	</ul>
	`;
该模板中放置了一个常规模板，该模板使用<%...%>放置JavaScript代码，使用<%= ...%>输出JavaScript表达式。

怎样编译这个模板字符串

	一种思路是将其转换为JavaScript字符串。
	echo('<ul>');
	for(var i =0;i<data.supplies.length;i++){
		echo('<li>');
		echo(data.supplies[i]);
		echo(</li>);
	}
	echo('</ul>');
这个转换使用正则表达式就可以了
	
	var evalExpr = /<%=(.+?)%>/g;
	var expr = /<%([\s\S]+?)%>/g;

	template = template
	.replace(evalExpr,`'); \n echo( $1 ); \n echo(`')
	.replace(expr,`'); \n $1 \n echo(`');

	template = 'echo(`' + template + `');';
然后，将**templat**e封装在一个函数里面返回，就可以了。

	var script = 
	`(function parse(data){
		var output = "";
		
		function echo(html){
			output += html;
		}
		
		${template}
		
		return output;
	
	})`;
	
	return script;
将上面的内容拼装成一个模板编译函数compile。
	
	function compile(template){
var evalExpr = /<%=(.+?)%>/g;
	var expr = /<%([\s\S]+?)%>/g;

	template = template
	.replace(evalExpr,`'); \n echo( $1 ); \n echo(`')
	.replace(expr,`'); \n $1 \n echo(`');

	template = 'echo(`' + template + `');';


	var script = 
	`(function parse(data){
		var output = "";
		
		function echo(html){
			output += html;
		}
		
		${template}
		
		return output;
	
	})`;
	
	return script;

	}
compile函数的用法

	var parse = eval(compile(template));
	div.innerHTML = parse({supplies:["broom","mop","cleaner"]});
	
运行结果:
	
	//<ul>
	//	<li>broom</li>
	//	<li>mop</li>
	//	<li>cleaner</li>
	//</ul>

##		标签模板

模板字符串的功能，不仅仅是上面这些，它可以紧跟在一个函数名后面，该函数被调用来处理这个模板字符串，这被称为"标签模板"功能
	
	alert`123`
等同于
	
	//alert(123);

标签模板其实不是模板，是函数调用的一种特殊形式。"标签"指的是函数，紧跟在函数后面的模板字符串是函数的参数。

但是，如果模板字符串里面有变量，就不是那么简单的调用了，而是会将模板字符串先处理成多个参数，再调用函数。
	
	var a = 5;
	var b = 10;
	
	tag`Hello ${a + b} world ${a*b}`;
	//等同于
	tag(['Hello','world',''],15,50);
tag函数会依次接收多个参数。

	function tag(stringArr,value1,value2){
		//...
	}
	//等同于
	function tag(stringArr,...values){
		//...
	}
"标签模板"的一个重要应用，就是过滤HTML字符串，防止用户输入恶意内容。

##	String.raw()
ES6还为原生的String对象，提供了一个raw方法。
String.raw方法，往往用来充当模板字符串的处理函数，返回一个斜杠都被转义(即斜杠前面再加一个斜杠)的字符串，对应于替换变量后的模板字符串。

String.raw方法可以作为处理模板字符串的基本方法，它会将所有变量替换，而且对斜杠进行转义，方便下一步作为字符串来使用。

String.raw方法也可以作为正常的函数使用。这时他的第一个参数应该是一个具有raw属性的对象，且raw属性值应该是一个数组。

	String.raw({raw:'test'},0,1,2);
	//'t0e1s2t'
	//等同于
	String.raw({raw:['t','e','s','t']},0,1,2);
