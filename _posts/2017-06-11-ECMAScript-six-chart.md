---
layout: post
title:  "ES6第六章 数值的扩展"
date:   2017-06-11 23:35:54
categories: ES6
tags: ES6
excerpt:	ES6提供了二进制和八进制数值的新的写法，分别用前缀0b（或0B）和0o（或0O）表示。
mathjax: true
author:	闵超
---
* content
{:toc}

#	数值的扩展

###		二进制和八进制标示符
ES6提供了二进制和八进制数值的新的写法，分别用前缀0b（或0B）和0o（或0O）表示
	
	0b111110111 === 503 //true
	//二进制计算规则
	1*2^0+1*2^1+1*2^2+0*2^3 + 1*2^4 +1*2^5+ 1*2^6 +1*2^7 +1*2^8
	=1+2+4+0+16+32+64+128+256
	=503

	0o767 === 503 //true
	//八进制的计算规则
	7+8^0 +6*8^1 +7*8^2
	=7+48+228
	=503

从ES5开始，在严格模式中，八进制就不再允许使用前缀0表示，ES6进一步明确，要使用前缀0o表示。
	
	//非严格模式
	(function(){
		console.log(0o11 === o11);
	})()//true
	
	//严格模式
	(function(){
		'use strict';
		console.log(0o11 === o11);
	})()//Uncaught SyntaxError :Octal literals are not allowed in strict mode.

将0b和0o前缀的字符串数值转换为十进制，要使用Number方法
	
	Number('0b111') //7
	Number('0o10') //8

##		Number.isFinite(),Number.isNaN()
ES6在Number对象上，提供了Number.isFinite()和Number.isNaN()两个方法

###		Number.isFinite()用来检查数值是否是有限的(finite)
	
	Number.isFinite(15); //true
	Number.isFinite(0.8); //true
	Number.isFinite(NaN); //false
	Number.isFinite(Infinity); //false
	Number.isFinite(-Infinity); //false
	Number.isFinite('foo'); //false
	Number.isFinite('15'); //false
	Number.isFinite(true);//false
ES5可以通过以下方法来部署**Number.isFinite**方法
	
	(function(globa){
		var global_isFinite = global.isFinite;
	
		Object.defineProperty(Number,'isFinite',{
			value:function isFinite(value){
				return typeof value === 'number' && global_isFinite(value);
			},
			configurable:true,
			enumerable:false,
			writable:true
		});
	})(this)

###		Number.isNaN()用来检查一个值是否为NaN。
	
	Number.isNaN(NaN);//true
	Number.isNaN(15); //false
	Number.isNaN('15'); //false
	Number.isNaN(true); //true
	Number.isNaN(9/NaN); //true
	Number.isNaN('true'/0);//true
	Number.isNaN("true"/"true");//true

ES5通过下面的代码可以部署Number.isNaN()方法
	
	(function (global){
		bar global_isNaN = global.isNaN;
	
		Object.defineProperty(Number,'isNaN',{
			value : function isNaN(value){
				return type value === 'number' && global_isNaN(value);
			},
			configurable:true,
			enumerable:false,
			writable:true	
		});
	})(this)
	
它们与传统的全局方法isFinite()和isNaN()的区别在于，传统方法先调用Number()将非数值转为数值，再进行判断，而这两个新方法只对数值有效，非数值一律返回false。
	
	isFinite(25) //true
	isFinite("25") /true
	Number.isFinite(25) //true
	Number.isFinite("25") //false
	
	isNaN(NaN) //true
	isNaN("NaN") //true
	Number.isNaN(NaN) //true
	Number.isNaN("NaN") //false

##		Number.parseInt(),Number.parseFloat()
ES6将全局方法parseInt()和parseFloat()，移植到Number对象上，行为完全保持不变。
	
	//ES5写法
	parseInt("12.34"); //12
	parseFloat('123.45') //123.45
	
	//ES6写法
	Number.parseInt("12.34"); //12
	Number.parseFloat('123.45') //123.45

这样做的目的是逐步减少全局性方法，使得语言逐步模块化。
	
	Number.parseInt === parseInt //true
	Number.parseFloat === parseFloat //true

##		Number.isInteger()
	
Number.isInteger()用来判断一个值是否是整数。需要注意的是，在JavaScript内部，整数和浮点数是同样的储存方法，所以3和3.0被视为同一个值。
	
	Number.isInteger(25)  //true
	Number.isInteger(25.0) //true
	Number.isInteger(25.1) //false	
	Number.isInteger("15") //false	
	Number.isInteger(true) //false	
ES5可以通过下面的代码，部署Number.isInteger()。
	
	(function(){
		var floor = Math.floor,
			isFinite = global.isFinite;
		
		Object.defineProperty(Number,'isInteger',{
			value: function isInteger(value){
				return typeof value === 'number' && isFinite(value) &&
						value > -9007199254740992 && value < 9007199254740992 &&
						floor(value) === value;
			},
			confogurable:true,
			enumerable:false,
			writable:true
			
		});
	})(this)

##		Number.EPSILON
ES6在Number对象上面，新增了一个极小的常量**Number.EPSILON**。
	
	Number.EPSILON
	//2.220446049250313e-16
	Number.EPSILON.toFixed(20);
	//'0.00000000000000022204'

引入一个这么小量的目的，在于为浮点数计算，设置一个误差范围。因为浮点数不是精确的
	
	0.1 + 0.2
	//0.3000000000004
	
	0.1 + 0.2 - 0.3
	//5.551115124125783e-17

但是如果误差能够小于Number.EPSILON,我们就可以认为得到了正确结果。

因此，Number.EPSILON的实质是一个可以接受的误差范围。

##		安全整数和Number.isSafeInteger()
JavaScript能够准确表示的整数范围是 -2^53和2^53（不含两个端点），超过这个范围，无法精确表示这个值
	Math.pow(2,53)  //9007199254740992
	
	9007199254740992  //9007199254740992
	9007199254740993  //9007199254740992
	
	Math.pow(2,53) === Math.pow(2,53) +1 //true
如代码所示，超过2的53次方之后，一个数就不精确了

ES6引入了Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER这两个常量，用来表示这个范围的上下限
	
	Number.MAX_SAFE_INTEGER === Math.pow(2,53) -1 // true
	Number.MAX_SAFE_INTEGER === 9007199254740991 // true
	Number.MAX_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER // true
	.MAX_SAFE_INTEGER === -9007199254740991 // true
由此，可以看出JavaScript能够精确表示的极限。
Number.isSafeInteger()则是用来判断一个整数是否落在这个范围之内。

这个函数的实现很简单，就跟安全整数两个边界值比较一下
	
	Number.isSafeInteger = function (n) {
		return (typeof n === 'number' && 
				Math.round(n) === n &&
				Number.Min_SAFE_INTEGER <= n &&
				n <= Number.MAX_SAFE_INTEGER);
	}
实际使用者函数时，需要注意，验证运算结果是否落在安全整数的范围内，不要只验证运算结果，而是同时验证参与运算的没有一个值。

	Number.isSafeInteger(9007199254740993 - 990)//true
	返回结果9007199254740992
	//正确答案应该是9007199254740003

##		Math对象的扩展
ES6在Math对象上新增了17个与数学相关的方法，这些方法都是静态的，只能在Math对象上调用。

###		Math.trunc()
Math.trunc方法用于出去一个数的小数部分，返回整数部分
	
	Math.trunc(4.2) //4
	Math.trunc(-4.2) //-4
	Math.trunc(-0.1234) //-0
对于非数字，Math.trunc内部使用Number方法将其先转为数值
	
	Math.trunc('123.456');//123
对于空值和无法截取整数的值，返回NaN

	Math.trunc(NaN);  //NaN
	Math.trunc('foo'); //NaN
	Math.trunc();   //NaN

对于这个没有部署这个方法的环境，可以用下面的代码模拟
	
	Math.trunc = Math.trunc || function(x){
		return x <0 ? Math.ceil(x) : Math.floor(x);
	};

###	 Math.sign()
Math.sign方法用来判断一个数到底是整数、负数、还是零。

它会返回五种值
	
-	参数为正数，返回+1
-	参数为负数，返回-1
-	参数为0，返回0
-	参数为-0，返回-0
-	其他值，返回NaN

	
###		Math.cbrt()
Math.cbrt()方法用于计算一个数的立方根
	
	Math.cbrt(-1) //-1
	Math.cbrt(0)  //0
	Math.cbrt(1)  //1
	Math.cbrt(2)  //1.2599210498948734

###		Math.clz32()
JavaScript的整数使用32位二进制形式表示，Math.clz32方法返回一个数的32位无符号整数形式有多少个前导0

	Math.clz32(0) //32
	Math.clz32(1) //31
	Math.clz32(1000) //22
0的二进制形式全是0，所以有32个前导0，1的二进制形式是0b1,只占1位，所以32位之中有31个前导0；1000的二进制形式是0b1111101000,一共10位，故有22个前导0。

### 	Math.imul()
Math.imul方法返回两个数以32位带符号整数形式相乘的结果，返回的也是一个32位的带符号整数。

	Math.imul(2,4) //8
	Math.imul(-1,8) //-8
	Math.imul(-2,-2) //4
如果只考虑最后32位，多数情况下，Math.imul(a,b)与a*b的结果是相同的，即该方法等同于(a*b)|0的效果（超出32位的部分溢出）。之所以需要部署这个方法，是因为JavaScript有精度显示，超过2^53次方的值无法精确表示。对于那些很大的数的乘法，低位数值往往都是不精确的，Math.imul方法可以返回正确的低位数值。

###		Math.fround()
Math.fround方法返回一个数的单精度浮点数形式。

	Math.fround(0)  //0
	Math.fround(1)  //1
	Math.fround(1.337) //1.3370000123977661
	Math.fround(1.5)  //1.5
	Math.fround(NaN)  //NaN
对于整数来说，Math.fround方法返回结果不会有任何不同，区别主要是那些无法用64个二进制位精确表示的小数。这时，Math.fround方法会返回最接近这个小数的单精度浮点数。

###		Math.hypot()
Math.hypot方法返回所有参数的平方和的平方根
	
	Math.hypot(3,4);//5
	Math.hypot(3,4,5); //7.0710678118654755
	Math.hypot();		//0
	Math.hypot(NaN);	//NaN
	Math.hypot(3,4,'foo'); //NaN
	Math.hypot(3,4,'5') //7.0710678118654755
	Math.hypot(-3)		//3

###		对数方法
ES6 新增了4个对数方法
	
1.	Math.expm1()
	
	Math.expm1(x)返回e^x -1 即Math.exp(x)-1。
		
		Math.expm1(-1)  //-0.632120558828577
		Math.expm1(0) 	//0
		Math.expm1(1)	//1.718281828459045
	对于没有部署这个方法的环境，可以用下面的代码模拟。

		Math.expm1 = Math/expm1 || function(){
			return Math.exp(x)-1;
		}

2.	Math.log1p()
	
	Math.log1p(x)方法返回1+x的自然对数，即Math.log(1+x),如果x小于-1，返回NaN.
		
		Math.log1p(1)  //0.6931471805599453
		Math.log1p(0)   //0
		Math.log1p(-1)	//-Infinity
		Math.log1p(-2)  //NaN
	对于没有部署这个方法的环境们可以用下面代码模拟
	
		Math.log1p = Math/log1p || function(){
			return Math.log(1+x);
		}
3.	Math.log10()

	Math.log10(x)返回以10为底的对数，如果x小于0，则返回NaN
		
		Math.log10(2) //0.3010299956639812
		Math.log10(1) //0
		Math.log10(0) // -Infinity
		Math.log10(-2) //NaN
		Math.log10(100000) //5
	对于没有部署这个方法的环境，可以用下面的代码模拟
		Math.log10 = Math.log10 || function(x){
			return Math.log(x) /Math.LN10;
		};

4.	Math.log3()
	
	Math.log2(x)返回以2为底的x的对数，如果小于0，则返回NaN
	
		Math.log2(3)  //1.584962500721156
		Math.log2(2)  //1
		Math.log2(1)  //0
		Math.log2(0)  //-Infinity
		Math.log2(-2) //NaN
		Math.log2(1024) //10
		Math.log2(1 << 29) //29
	对于没有部署这个方法的环境，可以用下面的代码模拟
	
	Math.log2 = Math.log2 || function(x){
		return Math.log(x)/Math.LN2;
	}

###		三角函数方法
ES6新增了6个三角函数的方法。
	
-	Math.sinh(x)	返回x的双曲正弦(hyperbolic sine)
-	Math.cosh(x)	返回x的双曲余弦(hyperbolic cosine)
-	Math.tanh(x)	返回x的双曲正切(hyperbolic tangent)
-	Math.asinh(x)	返回x的反双曲正弦(inverse hyperbolic sine)
-	Math.acosh(x)	返回x的反双曲余弦(inverse hyperbolic cosine)
-	Math.atanh(x)	返回x的反双曲正切(inverse hyperbolic tangent)

###		指数运算符
ES7新增了一个指数运算符(**),目前Babel转码器已经支持
	
	2 ** 2 //4
	2 ** 3 //8
指数运算符可以与等号结合，形成一个新的赋值运算符(**=)
	
	let a =2;
	a **= 2;
	//等同于 a= a*a;
	
	let b =3;
	b **=3;
	//等同于b = b*b*b*b;




