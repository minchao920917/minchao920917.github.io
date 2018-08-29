---
layout: post
title:  "JavaScript语言核心——数据类型"
date:   2016-04-01 23:35:54
categories: JavaScript
tags: JavaScript
excerpt:	JavaScript是面向WEB的编程语言，绝大多数现代网站都使用了JavaScript，并且所有的现代浏览器——基于桌面系统、游戏机、平板电脑和智能手机浏览器——均包含了JavaScript解释器。JavaScript逐渐成为史上使用最广泛地编程语言。通过学习前淘宝团队译的《JavaScript权威指南第六版》来对JavaScript有一个深入的了解
mathjax: true
author:	闵超
---

* content
{:toc}

## 《JavaScript权威指南 第6版》学习第一部分，JavaScript语言核心

想成为一名合格的前端攻城狮，不会js肯定不行，前端就像是一个人，HTTML是前端的骨架，负责你的页面的内涵和基础，CSS是人的脸皮，负责你的多高，多胖，脸蛋有多漂亮，而js就像人的肌肉，负责人的运动和胸肌发不发，健不健壮。所以学好JavaScript是很有必要的。页面的动态和与后台的交互，都是交给js来做的。

JavaScript是面向WEB的编程语言，绝大多数现代网站都使用了JavaScript，并且所有的现代浏览器——基于桌面系统、游戏机、平板电脑和智能手机浏览器——均包含了JavaScript解释器。JavaScript逐渐成为史上使用最广泛地编程语言。

##		JavaScript的由来和历史

JavaScript诞生于1992年，当时，它的主要目的是处理以前由服务器端语言负责的一些验证操作。在js问世之前，必须把表单数据发送到服务器端才能确定用户是否没有填写某个必填项，是否输入有效的值。Nestcape navigator 希望通过JavaScript来解决这一问题。在电话拨号上网的年代，与服务器的每一次交换数据是对用户耐心的一次考验。

JavaScript是一门非常简单的语言，又是复杂的语言，简单是因为学会使用它只需要片刻功夫，说它复杂，是因为想要完全掌握和理解JavaScript，必须要了解它的本质、历史和局限性。

Netscape公司为了塔上媒体炒热java的顺风车，将LiveScript改名为JavaScript。随后不久，微软发布了internet Explorer中的Jscript。导致与C及其其他编程语言不同，JavaScript出现两个版本的局面。1997年由欧洲计算机制造协会定义了ECMAScript的新脚本语言的标准。“JavaScript”这个名字经常被误解。除了语法看起来和java类似之外，JavaScript和java是完全不同的两种编程语言。JavaScript早已超出了“脚本语言(scripting-language)”的范畴，成为了一种集健壮性、高效性和通用性为一身的编程语言。

ECMAScript第3版才是对该标准的第一次真正修改。 ECMAScript第4版对js进行了全面的检核修订。由于js在Web上日益流行。出台后的第4版不仅包含强类型变量、新语句和新数据结构、真正的类和 经典继承，还定义了与数据交互的新方式，由于跨度太大，因此被取消了第4版的发布。 ECMAScript最近一版是第5版,于2009年颁布


为了有用起见，通常每一种变成语言都有各自的开发平台、标准库或API函数，用来提供诸如基本输入输出的功能。JavaScript语言核心针对文本、数组、日期和正则表达式的操作定义了很少的API，但这些API不包含输入输出功能。输入和输出功能（类似网络、存储和图形相关的复杂性）是由JavaScript所属的“宿主环境(host enviroment)”提供的。

##		JavaScript语言核心

#### 	词法

1.	区分大小写:	关键字、变量、函数名和其他标识符都采取一致的大小写形式
2.	JavaScript会忽略标识符之间的空格:可以用空格、换行符和格式控制符来调整、缩进
3.	注释：单行注释//,和多行注释/**/
4.	直接量：程序中直接使用的数据值（数字、小数、文本字符串、布尔值、正则和空null）
5.	标识符和保留字：变量命名规则和java一样，必须以字母、下划线（_）或美元符($)开始
6.	分号可选：和java一样使用；将程序隔开

###		类型、值和变量


计算机程序的运行需要对**值**(value)进行操作。
能够表示并操作的值的类型称做数据**类型**(type)，当程序需要将值保存起来以备将来使用时，便将其赋值给一个变量。 **变量**是一个值的符号名称，可以通过名称来获得对值的引用。变量的工作机制是编程语言的另一种基本特性。

####  JavaScript中的类型

JavaScript的数据类型有两种分类：

第一种：基本类型、特殊类型、复杂类型

	JavaScript数据类型
	1.	基本类型
		- Number:数字
		- String：字符串
		- Boolean：布尔
	2.	特殊类型
		- Null：空
		- Undefined：未定义
	3.	复杂类型
		-Function：函数
		-Object:对象

第二种：原始(值)类型、对象类型

	1. JavaScript数据类型
		- 原始(值)类型
		- 数字(Number)
		- 字符串(String)
		- 布尔值(Boolean)
		- Null、Undefined
	2.	对象类型
		- Object
		- 函数

####	数字（number）类型

1. 不区分整型数值和浮点型数值
2. 所有数字都采用64位浮点格式存储，类似于doubule格式
3. 整数
	- 10进制的整数由数字的序列组成
	- 16进制数前面加上0x,八进制前面加0
3. 浮点数
	- 使用小数点记录数据，如:3.4,5.6,.5
	- 使用指数记录数据，如4.3e23 = 4.3 ×10
4. 数值范围
	
	-	JS 定义了全局变量Infinity和NaN,用来表示正无穷大和非数字值
	-	`Infinity `	&nbsp;&nbsp;&nbsp;&nbsp;		//将一个可读写的变量初始化为infinity
	-	`Number.POSITIVE_INFINITY`  &nbsp;&nbsp;&nbsp;//同样的值，只读
	-	`1/0`   		&nbsp;&nbsp;&nbsp;//同样的值
	-	`Number.MAX_VALUE +1` 	&nbsp;&nbsp;&nbsp;//计算结果还是Infinity
	-	同样：`-Infinity、-1/0，- Number.MAX_VALUE -1` &nbsp;&nbsp;&nbsp;//结果表示负无穷
	-	`NaN`  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//not a number 非数字类型的
	-	同样:`Number.NaN、0/0` &nbsp;&nbsp;&nbsp;&nbsp;表示非数字类型 			
	-	`Number.MIN_VALUE/2`	&nbsp;&nbsp;&nbsp;//发生下溢，结果为0
	-	`Number.MIN_VALUE/2`	&nbsp;&nbsp;&nbsp;//负0

####  字符串文本（string）类型

1.	表示文本
	-	由Unicode字符、数字、标点符号组成的序列
2.	首尾由一对单引号或双引号括起
3.	加号(+)运算符用于数字，表示两数相加，用于字符串，表示二个字符串拼接。
4.	特殊字符需要转义字符\，如:\n,\\,\’,\”
	-	var aa=“\u4f60\u597d\n欢迎来到\”JavaScript的世界\””;alert(aa);
5.	字符串具有length属性，表示字符串长度。
6.	除了length属性，还有很多可调用的方法
	-	`charAt(n)`	//表示第n-1个字符
	-	`substring(n,m)`//表示第n,到m-1个字符
	-	`slice(n,m)/slice(4)/slice(-n)`//同上/0-3/length-n~length
	-	`indexOf(“h”)`//索引h第一次出现的位置
	-	`indexOf(“h”,n)`//n位之后出现h的位置
	-	`split(“,”)`//根据,来切分字符串
	-	`replace(“h”,”H”)`//用H代替h
	-	`toUpperCase()`//全大写

JS定义了ReExp()构造函数，用来创建文本匹配模式的对象。这些模式称为”正则表达式”。详细后续会详细介绍。

#### 	(布尔)Boolean类型

1.	Boolean类型
	-	仅有两个值
	-	true：真值
	-	false：假值
	-	也代表1和0
	-	实际运算中true =1,false = 0;
2.	多用于结构控制语句，用于控制分支走向
	-	If(true or false){}else{}
	-	while(true or false){}

####	JavaScript中特殊类型

1.	null
	-	null在程序中表示“无值”或者“无对象”
	-	可以通过给一个变量赋值 null来清除变量的内容
2.	undefined
	-	声明了变量但从未赋值或者对象属性不存在

`注`：尽管null和undefined是不同的，但它们都表示”值的空缺”,两者往往可以互换，”==”认为两者是相等的,必须要用===严格相等来区分

#### JavaScript中的对象类型
对象可以是JavaScript中的重中之重，是整个js的精华所在，任何语言，只要能实现面对对象编程，实现一切皆对象就是高级语言。

#####	什么是JavaScript对象？
对象是JS中最重要的元素，由属性和方法封装而成
 
用来描述对象特性的一组数据，也就是若干变量，通常称为属性。
 
用来操作对象特性的若干动作，也就是若干函数，通常称为方法。

1.	JS包含多种对象
	-	全局对象
		global object:全局对象的属性是全局定义的符号，JavaScript程序是可以直接使用，当JavaScript解释器启动时（web浏览器加载新页面的时候），它将创建一个新的全局对象，并给它一组定义的初始属性;

		全局属性，比如undefined、Infinity和NaN；

		全局函数,比如isNaN()、parseInt()和eval()；

		构造函数,比如Date()、RegExp()、String()、Object()、和Array()；

		全局对象，比如Math和JSON

	-	内置对象
	
		Array对象、Boolean对象、Date对象、Math对象、Number对象、Object对象、RegExp对象、String对象、Global对象、Function对象

	-	自定义对象
		
		var object = {"name":"minchao","age":"18","sex":"man"}	

	-	浏览器对象(常用的浏览器对象)
	
		applet	当前文档中的小程序

		document	当前窗口中的HTML文档


		event	浏览器中发生的事件


		history	浏览器访问过的url历史记录

		location	浏览器当前显示网页的URL

		mimeType	浏览器支持的特定MIME类型信息

		navigator	当前浏览器

		screen	用户屏幕

		window	浏览器窗口或窗口中的框架
	

	-	HTML DOM对象(跟上面浏览器对象可以合并)
	
		alert()

		confime()

		prompt()

	-	包装对象

		需要注意的是，String(),Number(),Boolean()构造函数来显式创建包装对象

2.	对象属性的引用
	
	-	使用(.)运算符

4.	对象方法的引用

	-	ObjectName.methodName()
	

####	值类型和引用对象类型

1.	原始值(undefined、null、布尔、数字和字符串)

2.	对象(包括数组和函数)

3.	两者有着根本区别：
	
	-	原始值是不可更改的：任何方法都无法更改一个原始值 	例如:字符串中所有的方法看上去返回一个修改后的字符串，实际上返回的是一个新的字符串值。
	
	-	对象是可变的:它们的值是可修改的
	
	-	原始值的比较是值的比较：只有它们的值相等时它们才相等
	
	-	对象的比较是引用的比较，想要比较两个单独的对象或数组，则必须比较它们的属性或元素

值类型理解：变量的交换等于在一个新的地方按照连锁店的规范标准（统一店面理解为相同的变量内容）新开一个分店，这样新开的店与其它旧店互不相关、各自运营。

	function chainStore(){ 
		var store1='Nike China'; 
		var store2=store1;
		store1='Nike U.S.A.';
		alert(store2); 
	} 
	chainStore(); 


引用类型理解：变量的交换等于把现有一间店的钥匙（变量引用地址）复制一把给了另外一个老板，此时两个老板同时管理一间店，两个老板的行为都有可能对一间店的运营造成影响。

	function chainStore(){
	var store1=['Nike China']; 
	var store2=store1; 
	alert(store2[0]); //Nike China 
	store1[0]='Nike U.S.A.'; 
	alert(store2[0]); //Nike U.S.A. 
	} 
	chainStore(); 

####  JavaScript中数据类型的转换

1.	数据类型的隐式转换（自动转换）

	-	JavaScript属于松散类型的语言
		-	变量在声明时不需要指定数据类型
		-	变量由赋值操作确定数据类型
	-	不同类型数据在计算过程中会自动进行转换
		-	数字+字符串——数字转换为字符串，与字符串拼接
		-	数字+布尔——true转换为1，fasle转换为0
		-	字符串+布尔值——布尔值转换为字符串true或false
		-	布尔值+布尔值——布尔值转换为1或0

2.	数据类型的显式转换（强转）

	-	做显式类型转换最简单的方法就是使用Boolean()、Number()、String()或Object()函数。
	-	toString()
		-	转换成字符串
		-	所有数据类型均可转换成字符串
	-	parseInt()
		-	强制转换成整数，如果不是则返回NaN
	-	parsFloat()
		-	强制转换成浮点数
	-	typeof()
		-	查询当前类型(返回string、number、boolean、object、function、undefined)
	-	isNaN
		-	用于判断是否为数字

**注：
除了null和 undefined之外的任何值都具有 toString()方法。**
