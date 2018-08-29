---
layout: post
title:  "ES6第二章 let和const"
date:   2017-06-07 23:40:54
categories: ES6
tags:	ES6
excerpt:	es6新增let命令，用来声明变量。它的用法类似于var，但是所声明的变量,只有在let命令所在的代码块内有效,同时也新增了Const，用于声明常量
mathjax: true
author:	闵超
---

* content
{:toc}


##	let命令

###	基本用法
	
es6新增let命令，用来声明变量。它的用法类似于var，但是所声明的变量,只有在let命令所在的代码块内有效

	{
		let a = 10;
		var b = 1;
	}

	a	//ReferenceError:a is not defined
	b	//1

解释:分别用let和var声明了两个变量。然后在代码块外面调用这个两个变量，结果let声明的变量报错，var 申明的变量返回了正确的值。这表明，let声明的变量只在它所在的代码块中有效

**for循环的计数器，就很适合使用let命令**

	for(let i =0;i<arr.length;i++){
		console.log(i);
	}
	console.log(i);

上面代码的计数器i，只在for循环中有效
下面的代码如果使用var，最后输出的是10

	var a =[];
	for (var i =0;i<10;i++){
		a[i] =function(){
			console.log(i);
		};
	}
	a[6]();//10

分析:变量i是var声明的，在全局范围内有效，所有每一次循环，新的i值都会覆盖旧值，导致最后输出的是最后一轮的i值

如果用let，声明，声明的变量仅在块级作用域中有效，最后输出的是6.如下：

	var a =[];
	for (let i =0;i<10;i++){
		a[i] =function(){
			console.log(i);
		};
	}
	a[6]();//6

###		不存在变量提升

let不像var那样会发生"变量提升"现象，所以变量一定要在声明后使用，否则报错

	console.log(foo);//undefined
	console.log(bar);//ReferenceError
	
	var foo = 2;
	let bar = 2;

解释：变量foo用var命令声明，会发生变量提升，即脚本开始运行时，变量foo已经存在了，但是
没有值，所以会输出undefined。变量bar用let命令声明，不会发生变量提升。这表示在声明它之前
变量bar是不存在的，这时如果用到它就会抛出一个错误。

###		暂时性死区

只要块级作用域内存在命令，它所声明的变量就"绑定"(binding)这个区域，不再受外部的影响。

	var temp = 123;
	
	if(true){
		temp ="abc";//ReferenceError
		let temp;
	}

上面代码中，存在全局变量temp,但是块级作用域内let又声明了一个局部变量temp，导致后者绑定这个
块级作用域，所以在let声明变量前，对temp赋值会报错。

ES6 明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了
封闭作用域。凡是在声明之前使用这些变量，就会报错

**定义：**在代码块内，使用let命令声明变量之前，该变量是不可用的，这在语法上，称为"**暂时性死区**"

	if(true){
	
		tmp = "abc";
		console.log(tmp);
	
		let tmp;
		console.log(tmp);
	
		tmp = "123";
		console.log(tmp);
	}

上面代码中let命令声明变量tmp之前，都属于tmp的“死区”
“暂时性死区”也意味着typeof不再是一个百分百安全的操作。

	typeof x;
	let x;

上面代码中，变量x使用let命令声明，所有在声明之前都属于x的“死区”
只要用到该变量就会报错，因此，typeof运行时就会抛出一个ReferemceError

作为比较，如果一个变量根本没有白声明，使用typeof反而不会报错

	typeof undecleared_variable //"undefined"

上面代码中，undeclared_variable是一个不存在的变量名，结果返回"undefined"。所以，在
没有let之前，typeof运算符是百分之百安全的，永远不会报错。现在这点不成立了。这样设计是
为了让大家养成良好的编程习惯，变量一定要在声明之后使用，否则报错。

有些“死区”比较隐藏，不太容易发现。

	function bar(x=y,y=2){
		return [x,y];
	}
	bar();//报错

解释：调用bar函数之所以报错(某些实现可能不报错)，是因为参数x默认值等一另一个参数
y，而此时y还没有声明，属于“死区”。如果y的默认值是x，就不会报错，因为此时x已经声明了。

	function bar(x=2,y=x){
		return [x,y];
	}
	bar();//[2,2]

ES6规定暂时性死区和let、const语句不出现变量提升，主要是为了减少运行时错误，防止变量在声明
之前就使用这个变量，从而导致意料之外的行为。这样的错误在ES5是很常见的，现在有了这样的规定
避免此错误就容易很多。

暂时性死区的本质就是，只要已进入当前作用域，所要使用的变量就已经存在了，但是不可获取，
只有等到声明变量的哪一行代码出现，才可以获取和使用该变量。

###		不允许重复声明

let不允许在相同的作用域内，重复声明一个变量

	//报错
	function(){
		let a = 10;
		var a =1;
	}
	//报错
	function(){
		let a = 10;
		let a =1;
	}

因此，不能在函数内部重新声明参数

	function func(arg){
		let arg;//报错
	}
	function func(arg){
		{
			let arg;
		}
	}


##	 块级作用域

###		为什么需要块级作用域？
ES5只有全局作用域和函数作用域，没有块级作用域，这带来很多不合理的长江。

第一种场景，内层变量可能会覆盖外层变量。

	var tmp = new Date();
	
	function f(){
		console.log(tmp);
		if(false){
			var tmp = "hello world";
		}
	}
	
	f();//undefined

上面代码中，函数f执行后，输出结果为undefined,原因在于变量提升，导致内层的tmp变量
覆盖了外层的tmp变量。

第二种场景，用来计数的循环变量泄露为全局变量

	var s = 'hello';
	
	for(var i = 0;i <s.legnth;i++){
		console.log(s[i]);
	}
	console.log(i);//5

上面代码中，变量i只用来控制循环，但循环结束之后，它并没有消失，泄露成了全局变量


###		 ES6的块级作用域

let实际上为JavaScript新增了块级作用域

	function f1(){
		let n = 5;
		if (true){
			let n = 10;
		}
		console.log(n);//5
	
	}

上面的函数中有两个代码块，都声明了变量n，运行后输出5，则表示，外层代码块不受内层代码块的
影响。如果使用var定义变量n，最后输出的值就是10；

ES6允许块级作用域的任意嵌套

块级作用域的出现，实际上使得获得广泛应用的立即执行匿名函数(IIFE)不在必要了。

	//IIFE写法
	(function(){
		var tmp = ...;
		...
	}());

	//块级作用域的写法
	{
		let temp = ...;
		...
	}

###		 块级作用域与函数声明

函数能不能在块级作用域之中声明，是一个相当令人混淆的问题。
ES5规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。

	//情况一
	if(true){
		function f(){}
	}
	
	//情况二
	try{
		function f(){}
	}catch(e){
		}

这两种函数声明，根据ES5的规定都是非法的。
但是，浏览器没有遵守这个规定，还是支持在块级作用域之中声明函数，因此，上面两种情况实际
都能运用，不会报错，不过，“严格模式下”还是会报错

	//ES5严格模式
	'use strict';
	if(true){
		function f(){}
	}
	//报错
	ES6引入了块级作用域，明确允许在块级作用与之中声明函数。
	//ES6严格模式
	if(true){
		function f(){}
	}
	//不报错

并且ES6规定，块级作用域之中，函数声明语句的行为类似于let，在块级作用域之外不可引用。

	function f(){ console.log('I am outside!');}
	
	(function(){
		if(false){
			//重复声明一次函数f
			function f(){console.log('I am inside!');}
		
		}
		f();
	}())

上面代码在ES5中运行，会得到"I am inside!",因为在if内声明的函数f会被提升到函数头部，实际运行的
代码如下。

	//ES5版本
	function f(){console.log('I am outside!');}
	(function (){
		function f(){console.log('I am inside!');}
			if(false){
			}
		f();
	}());

ES6运行结果就完全不一样了，会得到"I am outside!"因为块级作用域内声明的函数类似以let
，对作用域之外没有影响，实际运行的代码如下。

	//ES6版本
	function f(){console.log('I am outside!')}
	(function (){
		f();
	}())

很显然，这种行为差异会对老代码产生很大影响。为了减轻因此产生的不兼容问题，ES6在附录B
中规定，浏览器实现可以不遵守上面的规定，有自己的行为方式。

-	允许在块级作用域内声明函数
-	函数声明类似于var，即会提升到全局作用域或函数作用域的头部
-	同时，函数声明还会提升到所在块级作用域的头部

注意，上面三条规则只对ES6的浏览器实现有效，其他环境啊的实现不用遵守，还是将块级作用的函数声明当let处理，
前面那段代码，在Chrome环境下运行会报错。

	//ES6的浏览器环境
	function f(){console.log('I am outside!');}
	(function(){
		if(false){
		//重复声明一次函数f
		function f(){console.log('I am inside!');}
		}
		f();
	}())
	//Uncaught TypeError: f is not a function

上面的代码报错，是因为实际运行的是下面的代码

	//ES6的浏览器环境
	function f(){console.log('I am outside!');}
	(function (){
		var f = undefined;
		if(false){
			function f(){console.log('I am inside!');}
		}
		f();
	}());
	//Uncaught TypeError: f is not a function

考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是
函数声明语句

	//函数声明语句
	{
		let a = 'secret';
		function f(){
			return a;
		}
	
	}
	
	//函数表达式
	{
		let a = 'secret';
		let f = function(){
			return a;
		}
	}

另外，还有一个需要注意的地方。ES6的块级作用域允许声明函数的规则，只在使用大括号的情况下成立
如果没有使用大括号，就会报错

	//不报错
	'use strict';
	if(true){
		function f(){}
	}
	
	//报错
	'use strict';
	if(true)
		function f(){}

##		const命令

const 声明一个只读的常量。一旦声明，常量的值就不能改变

	const PI = 3.1415;
	
	PI = 3 ;
	//TypeError：Assignment to constant varoiable.

**改变常量的值会报错。**

const声明的变量不得改变值，这意味着，const一旦声明变量，就必须立即初始化，不能留到最后赋值

	const foo;
	//SyntaxtError: Missing initializer in const declaration

上面代码表示，对于const来说，只声明不赋值，就会报错

const作用域与let命令相同：只在声明所在的块级作用域内有效。

	if(true){
		const MAX = 5;
	}
	MAX//Unctught ReferenceError:MAX is no defined

const 命令声明的常量也是不提升的，同样存在暂时性死区，只能在声明的位置后面使用。

	if(true){
		console.log(MAX);//ReferenceError
		const MAX = 5;
	}

上面代码在常量MAX声明之前就调用，结果报错。
const声明的常量，也与let一样不可重复声明。

	var message = 'hello!';
	let age = 25;
	
	//一下两行都会报错
	const message = "Goodbye!";
	const age = 30;

对于复合类型的变量，变量名不指向数据，而是指向数据所在的地址。const命令只是保证变量
名指向的地址不变，并不保证改地址的数据不变，所以讲一个对象声明为常量必须非常小心

	consy foo = {};
	foo.prop = 123;
	
	foo.prop
	//123
	foo = {}//TypeError:"foo" is read-only

上面的代码中，常量foo存储的是一个地址，这个地址指向一个对象，不可变的只是这个地址，即
不能把foo指向另一个地址，但对象本身是可变的，所以一依然可以为其添加新的属性

下面是另一个例子。

	const a = [];
	a.push('hello');//可执行
	a.length = 0;//可执行
	a = ["Dave"];

常量a是一个数组，这个数组本身手机可写的，但是如果将另一个数组赋值给a，就会报错。
如果真的想将对象冻结，应该使用object.freeze方法。

	const foo = object.freeze({});
	//常规模式下，下面一行不起作用
	//严格模式时，该运行会报错
	foo.prop = 123;
常量foo指向一个冻结的对象，所以添加的属性不起作用，严格模式时还会报错。
除了将对象本身冻结，对象的属性也应该冻结。下面是一个将对象彻底冻结的函数

	var constize = (obj) =>{
		object.freeze(obj);
		object.keys(obj).forEach((key,value)=>{
			if(typeof obj[key] === 'object'){
				constantize(obj[key]);
			}
		});
	};

ES5只有两种声明变量的方法：var命令和function命令。ES6除了添加let和const命令，后面章节
还会提到另外两种声明变量的方法：import命令和class命令。所以，ES6一共6种声明变量的方法。

###		全局对象的属性
全局对象是最顶层的对象，在浏览器环境指的是window对象，在Node.js指的是global对象。ES5之中，
全局对象的属性与全局变量是等价的

	window.a = 1;
	a//1
	a = 2;
	window.a//2

全局对象的属性赋值与全局变量的赋值，是同一件事。（对NODE来说，这一条只对REPL环境适用，
模块环境之中，全局变量必须显示声明成global对象的属性。）

未声明的全局变量，自动成为全局对象window的属性，这被认为是JavaScript语言最大的设计败笔之一。这样的设计带来了
很大的问题，首先是没法在编译时就报出变量未声明的错误，只有运行时才知道，其次程序员很容易不知不觉就创建
了全局变量（比如打错字）。另一方面，从语义上讲，语言的顶层对象是一个实体含义的对象，也是不合适的。
ES6为了改变这一点，一方面规定，为了保持兼容性，var命令和function命令声明的全局变量，依旧是全局对象属性；另一方面
另一方面规定，let命令、const命令、class命令声明的全局便令，不属于全局对象的属性。也就是说，从ES6开始，全局
变量将逐步与全局对象属性脱钩。

	var a = 1;
	//如果在Node的REPL环境，可以写成global.a
	//或者采用通用方法，写成this.a
	window.a//1
	let b = 1;
	window.b //undefined

全局变量a由bar命令声明，所以它是全局对象的属性；全局变量a由let命令声明，所以它不是全局对象的属性
返回undefined。