---
layout: post
title:  "ES6第五章 正则的扩展"
date:   2017-06-10 20:35:54
categories: ES6
tags: ES6
excerpt:	在ES6中，RegExp构造函数的参数有两种情况的y修饰符和u修饰符。
mathjax: true
author:	闵超
---
* content
{:toc}

#		正则的扩展

##		RegExp构造函数
在ES5中，RegExp构造函数的参数有两种情况。

第一种情况，参数是字符串，第二个参数表示正则表达式的修饰符(flag)。

	var regex = new RegExp('xyz','i');
	//等价于
	var regex = /xyz/i;
第二种情况，参数是一个正则表达式，这时会返回一个原有正则表达式的拷贝。

	var regex = new RegExp(/xyz/i);
	//等价于
	var regex = /xyz/i;
但是ES5中，不允许此时使用第二个参数来添加修饰，会报错
	
	var regex = new RegExp(/xyz/,'i');
	//Uncaught TypeError 
ES6允许了这种行为，如果RegExp构造函数第一个参数是一个正则对象，那么可以使用第二个参数指定修饰符。而且返回的正则表达式还会忽略原有的正则表达式的修饰符，只使用新指定的修饰符。
	
	new RegExp(/abc/ig,'i').flage
	//  'i'

##		字符串的正则方法
字符串对象共有4个方法，可以使用正则表达式：match()、replace()、search()和split()。

String.prototype.match调用RegExp.prototype[Symbol.match]
String.prototype.replace调用RegExp.prototype[Symbol.replace]
String.prototype.search调用RegExp.prototype[Symbol.search]
String.prototype.split调用RegExp.prototype[Symbol.split]

##		u修饰符
ES6对正则表达式添加了u修饰符，含义为"Unicode"模式，用来正确处理大于\uffff的Unicode字符。

一旦加上u修饰符号，就会修改一些正则表达式的行为。

##		y修饰符
除了u修饰符，ES6还为正则表达式添加了y修饰符，叫做“粘连”修饰符
y修饰符的作用与g修饰符类似，也是全局匹配，后一次匹配从上一次匹配成功的下一个位置开始。不同之处在于，g修饰符只要剩余位置中存在匹配就可，而y修饰符确保匹配必须从剩余第一位置开始，这也就是"粘连"。

	var s = 'aaa_aa_a';
	var r1 = /a+/g;
	var r2 = /a+/y;

	r1.exec(s)//["aaa"]
	r2.exec(s)//["aaa"]
	
	r1.exec(s)//["aa"]
	r2.exec(s)//null
一个是g修饰符，一个是y修饰符，这两个正则表达式个执行了一次，第一次执行两者行为相同，得到的字符串相同都是["aaa"],剩余字符串都是_aa_a,当第二次执行的时候，**y** 修饰符必须从头开始匹配，所以得不出与a+的匹配模式相符合的字符串，所以返回null，而 **g** 修饰符匹配是不要求从第一个位置开始的。所以返回["aa"]

使用lastIndex属性，可以更好地诠释y修饰符
	
	const REGEX = /a/g;
	
	//指定从2号位置(y)开始匹配
	REGEX.lastIndex = 2;
	
	//匹配成功
	const match = REGEX.exec('xaya');
	match.index //3

	//下一次匹配从4号位开始
	REGEX.lastIndex = 4;
	REGEX.exec('xaxa');//null

g修饰符从lastIndex指定你每次搜索的开始位置向后搜索，直到发现匹配为止

y修饰符同样遵守lastIndex属性，但必须要求在lastIndex指定位置发现匹配

	const REGEX = /a/y;
	
	//指定从2号位置(y)开始匹配
	REGEX.lastIndex = 2;
	
	//匹配失败
	const match = REGEX.exec('xaxa');//null
	
	指定从3号位置开始匹配
	REGEX,=.lastIndex = 3;

	//3号位置是粘连，匹配成功
	const match = REGEX.exec('xaxa');
	REGEX.lastIndex//3;
	REGEX.lastIndex;//4
进一步说，y修饰符号隐含了头部匹配的标志**^**
	
	/b/y.exec('aba');
	//null 
y修饰符设计的本意，就是让头部匹配的表示^在全局匹配中都有效。

在split方法中使用y修饰符，原字符串必须以分隔号开头，这也意味着，只要匹配成功，数组的第一个成员肯定是空字符串。

	//没有找到匹配
	'x##'.split(/#/y)
	//['x##']

	//找到两个匹配
	'##x'.split(/#/y)
	//['','','x']
后续的分隔符只有紧跟前面的分隔符，才会被识别

	'#x#'.split(/#/y)
	//['','x#']
	'##'.split(/#/y)
	//['','','']

##	sticky属性
与 **y** 修饰符相匹配，ES6的正则对象多了 **sticky** 属性,表示是否这只y修饰符

	var r = /hello\d/y;
	r.sticky //true

##		flags属性
ES6为正则表达式新增了**flags**属性
	
	ES5的source属性
	//返回正则表达式的正文
	/abc/ig.source
	//"abc"
	
	//ES6的flags属性
	//返回正则表达式的修饰符
	/abc/ig.flags
	//'gi'

##		RegExp.escape()
字符串必须转义，才能作为正则模式
已经有提议将这个需求标准化，作为RegExp对象的静态方法RegExp.escape(),放入ES7。但TC39认为，这个方法有安全风险，又不想这个方法变得过于复杂，没有列入ES7。

	RegExp.escape('The  Quick Brown Fox');
	//"The  Quick Brown Fox"

	RegExp.escape('Buy it. use it. break it. fix it.');
	//'Buy it\ use it\. break it\. fix it\.'
	
	RegExp.escape('(*.*)');
	//"\(\*\.\*\)"
字符串转义以后，可以使用RegExp构造函数生成正则模式
	
	var str = "hello world"; 
	var regex = new RegExp(RegExp.escape(str),'g');

##		后行断言
JavaScript语言的正则表达式，只支持先行断言(lookahead)和线性否定断言(nagative lookkahead)，不支持后行断言(lookbehind)和后行否定断言(negative lookbehind)

先行断言：指的是x只有在y前面才匹配，必须写成 **/x(?=y)/**,比如，只匹配百分号之前的数字，要写成**/\d+(?=%)/**。

先行否定断言：指的是，x只有不在y前面才匹配，必须携程 **/x(?!y)/** ,比如，只匹配不在百分号之前的数字，要写成 **/\d+(?!%)/**。
	
	/\d+(?=%)/.exec('100% of US presidents have been male'); //["100"]
	/\d+(?!%)/.exec('that's all 44 of them') 		//["44"]

后行断言正好与先行断言相反，只有x在y后面才匹配，必须写成 **/(?<=y)x/**,问号后面多了个 **<** 小于号。

后行否定断言和先行否定断言相反，**/(?<!y)x/**,等号改成 **！** 非符号
	
	/(?<=\$)\d+/.exec('Benjamin Franklin is on the $100 bill') //["100"]
	/(?<!\$)\d+/.exec('it's worth about &90')  //['90']
	