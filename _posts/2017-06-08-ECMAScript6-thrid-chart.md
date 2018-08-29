---
layout: post
title:  "ES6第三章 变量的解构赋值 "
date:   2017-06-08 23:40:54
categories: ES6
tags:	ES6
excerpt:	S6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构赋值(Destructuring)。
mathjax: true
author:	闵超
---

* content
{:toc}

#

## 	3.1 数组的结构赋值
ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构赋值(Destructuring)。

以前，为变量赋值，只能直接指定值

	var a = 1;
	var b ="hello";
	var c = 3;

ES6允许这样写

	var [a,b,c] = [1,'hello',3];

本质上，ES6的这种写法，属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值，下面是一些使用嵌套数组进行解构的例子。
	
	let [foo,[[bar],baz]] = [1,[[2],3]]
	foo //1
	bar //2
	baz //3
	
	let [,,third] = ["foo","bar","baz"]
	third //baz
	
	let [head,...tail] = [1,2,3,4];
	head //1
	tail //[2,3,4]

	let[x,y,...z] = ['a'];
	x//"a"
	y // undefined
	z //[]

如果解构不成功，变量的值就等于undefined。

	var [foo] = [];
	var [bar,foo] = [1];
这两种情况是等号右边不等于左边

	let [x,y] = [1,2,3];
	x //1
	y //2

	let [a,[b],c] = [1,[2,3],4];
	a //1
	b //2
	c //4
这两种情况是等号左边的模式，只匹配等号右边的部分数组。

上面的两个例子，都属于不完全解构，但是可以成功。

**注意：**

**1.如果等号的右边不是数组，那么就会报错。**

**2.解构赋值不仅适用于var命令，也适用于let和const**

**3.解构赋值允许指定默认值var [foo = 1]=[];**

**4.ES6内部使用严格相等运算符(===)来判断一个位置是否有值**

	let x ;
	if([1][0] === undefined){
		x=f();
	}else{
		x=[1][0]
	}

**5.默认值可以引用解构赋值的其他变量，但该变量必须已经声明**


##		对象的结构赋值
解构赋值不仅可以用于数组，还可以用于对象。

	var {foo,bar} ={foo:"aaa",bar:"bbb"};
	foo //"aaa"
	bar //"bbb"

对象的解构与数组有一个重要的不同。数组的元素是按次序排序的，变量的取值由它的位置决定；

对象的属性没有次序，变量必须与属性同名，才能取到正确的值。
	
	var {baz} = {foo:"aaa",bar:"bbb"};
	baz //undefined

如果变量名与属性名不一致，必须要写成下面这样

	var {foo:baz} = {foo:'aaa',bar:'bbb'};
	baz  //aaa;
	
	let obj = {first:'hello',last:'world'};
	let {first:f,last:l} = obj;
	f//'hello'
	l//'world'
这本质上说明，对象的结构赋值是下面的简写形式
	
	var {foo:foo,baz:baz} = {foo:'aaa',baz:'bbb'};

从另一方面说，对象的结构赋值，内部机制，是先找到同名属性，然后再赋值给对应的变量，真正被赋值的是后者——同名属性对应的变量，而不是同名属性。
	
	var {foo:baz} = {foo:"baz",bar:"bbb"};
	baz //"aaa"
	foo //foo is not defined

理解：真正被赋值的是变量而不是属性。原因是，对象是引用类型的

对于ES6来说，let和const是不能重新声明的，所以一旦赋值的变量以前声明过，就会报错。

	let foo;
	let {foo} = {foo:1};//Duplicate declaration "fpp"
解构赋值的变量都会重新声明，所以报错了，不过，因为var命令允许重新声明，所以这个错误只会在使用let和const命令时出现。

和数组一样，解构也可以用于嵌套的对象。
	
	var {p:[x,{y}]} = {
				p:[
					'hello',
					{y:'world'}
				]
			};
	x //"hello"
	y //"world"
同理，对象的解构赋值也可以指定默认值

	var {x=3} ={};
	x//3

默认值生成的条件是，对象的属性值严格等于undefined

	var {x=3} = {x:undefined};
	x//3

	var {x = 3} ={x:null}
	x//null
如果解构失败，变量的值等于undefined

	var {foo} = {bar:"baz"};
	foo //undefined
如果解构模式是嵌套的对象，而子对象所在的父属性不存在，那么将会报错
	
	//报错
	var {foo:{bar}} =  {baz:'baz'};
如果要将一个已经声明的变量用于解构赋值，必须非常小心

	//错误的写法
	var x;
	{x} = {x:1};
	//SyntaxError:syntax error
上面代码的写法会报错，因为JavaScript引擎会将{x}理解成一个代码块，从而发生语法错误。只有不将大括号写在行首，避免JavaScript将其解释成代码块，就能解决这个问题。

	//正确的写法
	({x}={x:1})
上面代码将整个解构赋值语句，放在一个圆括号里面，就可以正确执行。

解构赋值允许，等号左边的模式之中，不放置任何变量名。因此，可以写出非常古怪的赋值表达式
	
	({} = [true.false]);
	({} = 'abc');
	({} = []);

因为数组的本质是特殊的对象，因此可以对数组进行对象属性的解构。

	var arr = [1,2,3];
	var {0:first,[arr.length-1]:last} = arr;
	first //1
	last //3

数组arr的o键对应的值是1，[arr.length - 1]就是2键，对应的值是3.方括号这种写法，属于"属性名表达式"。

##	字符串的解构赋值

字符串也可以解构赋值，这是因为，字符串被转换成了一个类似数组对象。

	const [a,b,c,d,e] = 'hello';
	a 	//'h'
	b	//'e'
	c	//'l'
	d	//'l'
	e	//'o'
类似数组的对象都有一个length属性，因此，还可以对这个属性解构赋值
	let {length : len} = "hello";
	len // 5

##	数值和布尔值的解构赋值

解构赋值，如果等号右边是数值和布尔值，则会先转化为对象
	
	let {toString:s} = 123;
	s === Number.prototype.toString //true

	let {toString: s} = true;
	s === Boolean.prototype.toString //true

上述代码中，数值和布尔值的包装对象都有toString属性，因此，变量s都能取到值

解构赋值的规则是：只要等号右边的值不是对象，就先将其转为对象。由于undefined和null无法转为对象，所以，对它们进行解构赋值，都会报错。

	let {prop:x} = undefined;//TypeError
	let {prop:y} = null;//TypeError

##		函数参数的解构赋值

函数的参数也可以使用解构赋值
	
	function add([x,y]){
		return x + y;
	}
	add([1,2]); //3

函数add的参数表面上是一个数组，但在传入参数的那一刻，数组参数就被解构成变量x和y，对于函数内部的代码来说，它们能感受到的参数就是x和y。

	[[1,2],[3,4]].map(([a,b]) => a + b);
	//[3,7]
数组的map方法，传入是一个方法，方法的参数，一次传入数组的值

函数参数的解构也可以使用默认值

	function move({x=0,x=0} ={}){
		return [x,y];
	}
	move({x:3,y:8});//[3,8]
	move({x:3});//[3,0]
	move({});//[0,0]
	move();//[0,0]
	
上面代码中，函数move的参数是一个对象，通过对这个对象进行解构，得到变量x和y的值，如果解构失败，x和y等于默认值。

注意：

	function move({x：0,x：0} ={}){
		return [x,y];
	}
	move({x:3,y:8});//[3,8]
	move({x:3});//[3,undefined]
	move({});//[undefined,undefined]
	move();//[0,0]
为什么会得到不一样的结果，函数move的参数指定默认值，而不是为变量x和y指定默认值，所以会得到与前一种写法不同的结果。

undefined会触发函数参数的默认值

	[1,undefined,3].map((x = 'yes') => x);
	//[1,'yes',3]


##		圆括号的问题
解构赋值虽然很方便，但是解析起来并不容易，对于编译器来说，一个式子到底是模式，还是表达式，没有办法从一开始就知道，必须解析到等号才能知道

由此带来的问题是如果模式中出现圆括号该怎么处理。ES6的规则是，只要有可能导致解构的歧义，就不得使用圆括号。
但是，这条规则实际上不容易辨别，处理起来相当麻烦，因此，建议只要有可能，就不要再模式中方法之圆括号。

1.	变量声明中，不能带有圆括号
	
		//全部报错
		var [(a)] = [1];
		var {x:(c)} = {};
		var ({x:c})	= {};
		var {(x):c} = {};
	
		var {o:({p:p})} = {o:{p:2}};
		//变量声明语句，模式不能使用圆括号。

2.	函数参数中，模式不能带有圆括号

	函数参数也属于变量声明，因此不能带有圆括号
	
		//报错
		function f([(z)]) {return z; }

3.	赋值语句中，不能将整个模式，或嵌套模式中的一层，放在圆括号之中。
		
		//全部报错
		({p:a})  = {p:42};
		([a]) = [5];
		
		//报错
		[({p:a}),{x:c}] = [{},{}];

####	可以使用圆括号的情况
	
可以使用圆括号的只有一种情况：赋值语句的非模式部分，可以使用圆括号
	
	[(b)] = [3];//争取
	({p:(d)} =  {});//正确
	[(parseInt.prop)] = [3]//正确

这三行都是赋值语句，不是声明语句；其次，他们的圆括号都不属于模式的一部分。第一行语句中，模式时取数组的第一个成员，跟圆括号无关；第二行语句中，模式时p，而不是d；第三行语句与第一行语句的性质一致。


##  解构赋值的用处
	
1.	交换变量的值
	
	写法简洁，易读，语义非常清晰。
		
		[x,y] = [y,x];

2.	从函数返回多个值
	
	函数只能返回一个值，如果要返回多个直，只能将它们放在数组或者对象里返回，有了解构赋值，取出这些值就非常方便。
	
		//返回一个数组
		function example(){
			return [1,2,3];
		}
		var [a,b,c] = example();
	
		//返回一个对象
		function example(){
			return{
				foo:1,
				bar:2
			};
		}
		var {foo,bar} = example();

3.	函数参数的定义

	解构赋值可以方便地将一组参数与变量名对应起来。

		//参数是一组有次序的值
		function f([x,y,z]){...}
		f([1,2,3]);
		
		//参数是一组无次序的值
		function f({x,y,z}){...}
		f({z:3,y:2,x:1});

4.	提取JSON数据
	
	解构赋值对提取JSON对象中的数据，尤其有用。
		
		var jsonData = {
			id:42,
			status:'OK',
			data:[111,222]
		};
		
		let {id,status,data:number} =jsonDat;
	
		console.log(id,status,number);
		//42,"OK",[111,222]	

5.	函数参数的默认值
	
		jQuery.ajax = function(url,{
			async = true,
			beforeSend = function(){},
			cache = true,
			complete = function (){},
			crossDomain = false,
			global = true,
			//... more config
	
		}){
			//... do stuff
		};
	指定参数默认值，就避免了在函数体内部再写var foo = config.foo || 'default foo'这样的语句

6.	遍历Map结构
	
	任何部署了，Iterator接口的对象，都可以用for ... of循环遍历。Map结构原生支持Iterator接口，配合变量的解构赋值，获取键名和键值非常方便。

		var map = new Map();
		map.set('first','hello');
		map.set('second','world');
		
		for(let [key,value] of map){
			console.log(key + " is " +value);
		}
		//first is hello
		//second is world
	如果只想获取键名
		
		//获取键名
		for(let[key] of map){
			//...
		}
		
		//获取键值
		for(let [,value] of map){
			//...
		}

7.	输入模块的指定方法

	加载模块时，往往需要指定输入那些方法。结构赋值使得语句非常清晰
	
		const{SourceMapConsumer,SourceNode} = require("source-map");