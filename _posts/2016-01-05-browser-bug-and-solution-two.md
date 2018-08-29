---
layout: post
title:  "常见的浏览器兼容性问题及解决办法二"
date:   2016-01-05 15:14:54
categories: web浏览器
tag:	web浏览器
excerpt: 不同的浏览器有不同的版本；不同的版本有不同的兼容性
mathjax: true
author:	闵超
---

* content
{:toc}

##	浏览器的兼容性

浏览器的五大厂商：IE 火狐 谷歌 苹果 欧朋

不同的浏览器有不同的版本；不同的版本有不同的兼容性

IE的兼容性要求：实际工作一般要求兼容到IE8，IE6的兼容性问题特别喜欢问。

IE6的兼容性处理好，面试官会认为你的工作经验丰富。

##		hack

hacker：黑客的意思
hack的分两类

### 	1.	HTML hack

同一套代码为了让不同的浏览器显示相同的效果，需要加hack来处理浏览器的兼容性问题。

针对不同的浏览器在同一个html文件里，去写不同的html结构。
	
IE浏览器有很多兼容性问题，给我们提供了一些接口

		<!--[if lte IE 9]>
			<h3>您的浏览器版本太低，请升级高版本</h3>
		<![endif]-->
	
高级浏览器显示没有效果

lte:小于或等于该版本

lt:小于该版本

gt：大于该版本的显示

gte:大于或等于该版本

html hack表示低版本浏览器会认识这个hack，会正常渲染，高版本会认为这个hack是注释


针对IE6有固定的一个hack

		<!--[if IE 6]>
			<script type="text/javascript" src="js/png.js"></script>
		<![endif]-->

表示，只有IE6浏览器可以看到里面的内容，其他浏览器会认为是注释

###		2.	CSS hack

css hack包括值的hack和选择器的hack

###		CSS值的hack

	/* IE 6 */ 
	.selector { _color: blue; }    
	.selector { -color: blue; } 

	.box{
		width: 300px;
		height: 300px;
		background: pink;
		color:#000;
		-color:#fff;/* 这个属性只有IE6能认识*/
		font-size: 30px;8	
	}


Hack符：-、_

在属性名的前面加下划线或横线。

表示这个属性只有IE6认识，其他的都不认识这个属性。

	/* IE 6/7 */     
		Hack符：! $ & * ( ) = % + @ , . / ` [ ] # ~ ? : <> |

		.box{
			width: 300px;
			height: 300px;
			background: pink;
			color:#000;
			/*这个属性只能IE6/7可以正常加载*/
			!color:#fff;
			font-size: 30px;9	
		}

表示这个属性只有IE6/7认识，其他的都不认识这个属性。



	/* IE 8/9 */ 
		.selector { color: blue\0/; } 
Hack符：\0/。

需要写在属性值的后面。

只在IE8、9里认识。


	/* IE 6/7/8/9/10 */ 
		.selector { color: blue\9; }

	.box{
		width: 300px;
		height: 300px;
		background: pink;
		color:#000;
		font-size: 20px;
		/*这个属性只能IE6/7/8/9/10可以正常加载*/
		background-color:lightblue\9;9	
	}

Hack符：\9.

需要写在属性值的后面，分号前。


###		选择器的hack

####	低于IE 6
	/* IE 6 and below */ 
		* html .selector  {}   
		
这种选择器只在IE6里加载，其他的浏览器认为你的选择器是错的。

高级浏览器认为html已经是根标签，*不是他的祖先元素。

	* html .box{
		width: 300px;
		height: 300px;
		background: lightblue;
		color:#000;
		font-size: 20px;7	
	}
等价写法：

	.box{
		-width: 300px;
		-height: 300px;
		_color:#000;
		_font-size: 20px;
		-background-color:lightblue;7	
	}

####	低于IE 7

	/* IE 7 and below */ 
		.selector, {} 

这种选择器只在IE7及以下版本里加载，其他的浏览器认为你的选择器是错的。

	.box,{
		width: 300px;
		height: 300px;
		background: pink;
		color:#000;
		font-size: 20px;
		background-color:lightblue\9;8	
	}

等价写法：

	.box{
		!width: 300px;
		!height: 300px;
		!color:#000;
		!font-size: 20px;
		!background-color:lightblue;7	
	}

####	除了IE 6

	/* 除了IE 6 */ 
		html > body .selector {} 

这个>子级选择器：只选择儿子级，后代其他级别不选。

IE6不认识子级选择器。

除了IE6都能正常加载。

	html>body .box{
		width: 300px;
		height: 300px;
		background: pink;
		color:#000;
		font-size: 20px;
	}


##		IE6的兼容性

###		IE 6的选择器的兼容性

之前的7种选择器：

通配符，标签选择器，类选择器，id选择器，（基本选择器）

后代选择器，交集选择器（div.box），并集选择器。（高级选择器）

IE6支持以上7种选择器，但是不支持交集选择器中连续类名的书写。

这种写法IE6不认识；
			
	div.box.cl{
		color:orange;
		font-size: 30px;
	}

解决办法：不写连续类名的选择器

	div.box{}

###		盒模型的兼容问题


1.	DTD问题

	如果IE不写DTD他的盒模型是内减的。

	解决办法：必须DTD

		
2.	最小高度
	
	如果盒子高度小于默认字号，不会正常显示。高度会是最小的字号。

	解决方法：

	单独给IE6浏览器，强制给个很小的字号。

		.box{
			width: 200px;
			height: 4px;
			background: pink;
			-font-size:0;
		}

3.	浮动的盒子不会钻到底下
	
	情况：一个盒子浮动，一个盒子不浮动，在IE6里，不浮动的盒子不会钻到浮动盒子的下面占领它原来的标准流位置。

		.box1{
			width: 100px;
			height: 100px;
			background: lightblue;
			float: left;
	 	}
		.box2{
			width: 200px;
			height: 200px;
			background: pink;11	
		}

	解决办法：同级的元素，要么都浮动要么都不浮动。
  
	制作压盖效果必须用定位来实现。

4.	像素的bug

	情况：一个浮动，一个不浮动，IE6里两个盒子之间会出现3px的间距。

	解决办法：给左边的盒子加负数的margin-right

		.box1{
			width: 100px;
			height: 100px;
			background: lightblue;
			float: left;
			margin-right:-3px;	
		}

5.	双倍margin问题
	
	情况：一些元素浮动，有一个与浮动方向相同的方向的margin，第一个元素会出现双倍边距的问题。

		.box p{
			float: left;
			margin-left: 20px;
			width: 100px;
			height: 100px;
			background: pink;
		}

6.	overflow：hidden失效
	
	IE6不认识overflow：hidden；引申作用，没法帮我们清浮动，自动撑高盒子。

	IE浏览器加载机制：

	布局：layout

	有布局：盒子本身加载的时候，根据自身内容来加载，会强制检测里面的元素，通过里面的元素性质进行自身布局。

	没有布局：盒子本身加载的时候，根据祖先元素来加载，不会去管内部的元素。

	IE里有很多属性可以触发有布局的机制。触发hasLayout机制，就可以让overflowhidden生效。
	
	有一个属性永远触发hasLayout机制。

		_zoom: 1;


