---
layout: post
title:  "HTML, CSS基础及编码规范"
date:   2016-06-20 19:06:05
categories: HTML5 CSS3
tags: HTML5 CSS3
excerpt: HTML和CSS基础以及编码规范
mathjax: true
author:	闵超
---

* content
{:toc}

##  背景介绍
想要完成一个精美实用的网站，拥有稳定的后台，健壮的数据库设计，同样需要漂亮的设计以及精美的html和css实现，作为一个前端来说，需要突破这些限制因素的局限，能完美的呈现出精美的页面给用户看，并且给用一个完美的用户体验，这是前端要做的事。

## 	HTML部分

###		只有对HTML元素非常熟悉，才能知道何时应该选用何种标签。

1. 创建良好的标记

	1.1	选择DOCTYPE  

	在HTML的最开始部分声明DOCTYPE(Document Type(文档类型)的简写)可以让浏览器找到
		或者其他用户代理知道你要使用的HTML语言类型。DOCTYPE是一个健壮文档所必须的
		<!DOCTYPE html >
	
	1.2	指定语言和字符集

	与声明DOCTYPE同样重要的是将HTML文档指定为某一种人类的语言。
		<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
	//设置文档的XML语言，这里设置为英语的ISO代码en
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>
		//设置文档的字符集，这里是UTF-8
	
	1.3	指定标题
	每个HTML页面都需要一个用来描述网页内容的<title>元素,在游客将访问的页面
		保存到收藏夹时，<title>将作为链接名被保存在访客浏览器中
	
	1.4	选用恰当的元素

	根据文档内容的结构而选择HTML元素，而不是根据HTML元素的样式。例如，
		用p元素包含文字段落，而不是为了换行；用blockquote包含被引用的文字，
		而不是为了得到缩进
	
	1.5	避免过渡使用div和span
		
	设计HTML时一个常见的错误就是过渡使用div和span。少量、必要的合理使用
	可以明显地增强文档的结构性。span不应该代替label的作用，这不意味着div
	和span应避免使用。
	
	1.6尽可能少地使用标签
		
	前面两个提示所隐藏的含义就是，HTML标签使用得越少越好。事实上也是如此,使用的HTML标签越多，则渲染的时候dom结构越复杂，dom渲染的时候会慢。

### HTML编码规范

	<!DOCTYPE html>  
--HTML5 doctype为每个 HTML 页面的第一行添加标准模式（standard mode）的声明，这样能够确保在每个浏览器中拥有一致的展现。

	<html lang="zh-CN">
-- 强烈建议为 html 根元素指定 lang 属性，从而为文档设置正确的语言。这将有助于语音合成工具确定其所应该采用的发音，有助于翻译工具确定其翻译时所应遵守的规则等等。 

	<head>
	<title></title>
	<meta http-equiv="X-UA-Compatible" content="IE=Edge">
	<!-- IE 支持通过特定的 <meta> 标签来确定绘制当前页面所应该采用的 IE 版本。
	除非有强烈的特殊需求，否则最好是设置为 edge mode，从而通知 IE 采用其所支持的最新的模式。 -->
	<meta charset="utf-8">
	<!-- 通过明确声明字符编码，能够确保浏览器快速并容易的判断页面内容的渲染方式。
	这样做的好处是，可以避免在 HTML 中使用字符实体标记（character entity），
	从而全部与文档编码一致（一般采用 UTF-8 编码）。 -->

	<!-- 外部引入 CSS -->
	<link rel="stylesheet" href="code-guide.css">
	<!-- 外部引入 JavaScript -->
	<script src="code-guide.js"></script>
	</head>

标签要闭合，所有的html标签都要有/的闭合标签

	<body>
	
	<!--     
		class
	    id, name
	    data-*
	    src, for, type, href
	    title, alt
	    aria-*, role
	-->
	<!-- class 用于标识高度可复用组件，因此应该排在首位。
	id 用于标识具体组件，应当谨慎使用（例如，页面内的书签），因此排在第二位。 -->
	</body>
	</html>

##	CSS部分

### 	CSS部分，基础内容详见[《CSS夯实基础》](http://minchao.me/2015/05/18/CSS-Base/)

### CSS编码规范

		/*    
	    1、用两个空格来代替制表符（tab） -- 这是唯一能保证在所有环境下获得一致展现的方法。
	    2、为选择器分组时，将单独的选择器单独放在一行。
	    3、为了代码的易读性，在每个声明块的左花括号前添加一个空格。
	    4、声明块的右花括号应当单独成行。
	    5、每条声明语句的 : 后应该插入一个空格。
	    6、为了获得更准确的错误报告，每条声明都应该独占一行。
	    7、所有声明语句都应当以分号结尾。最后一条声明语句后面的分号是可选的，但是，如果省略这个分号，你的代码可能更易出错。
	    8、对于以逗号分隔的属性值，每个逗号后面都应该插入一个空格（例如，box-shadow）。
	    9、不要在 rgb()、rgba()、hsl()、hsla() 或 rect() 值的内部的逗号后面插入空格。
	        这样利于从多个属性值（既加逗号也加空格）中区分多个颜色值（只加逗号，不加空格）。
	    10、对于属性值或颜色参数，省略小于 1 的小数前面的 0 （例如，.5 代替 0.5；-.5px 代替 -0.5px）。
	    11、十六进制值应该全部小写，例如，#fff。在扫描文档时，小写字符易于分辨，因为他们的形式更易于区分。
	    12、尽量使用简写形式的十六进制值，例如，用 #fff 代替 #ffffff。
	    13、为选择器中的属性添加双引号，例如，input[type="text"]。只有在某些情况下是可选的，但是，为了代码的一致性，建议都加上双引号。
	    14、避免为 0 值指定单位，例如，用 margin: 0; 代替 margin: 0px;。
		*/

以上是CSS的编码规范总结，参照以上标准

	/* 不好的写法 CSS */
	.selector, .selector-secondary, .selector[type=text] {
	  padding:15px;
	  margin:0px 0px 15px;
	  background-color:rgba(0, 0, 0, 0.5);
	  box-shadow:0px 1px 2px #CCC,inset 0 1px 0 #FFFFFF
	}

	/* 好的写法 CSS */
	.selector,
	.selector-secondary,
	.selector[type="text"] {
	  padding: 15px;
	  margin-bottom: 15px;
	  background-color: rgba(0,0,0,.5);
	  box-shadow: 0 1px 2px #ccc, inset 0 1px 0 #fff;
	}

比较这两种写法，你会发现，下面一种更清晰，单独的选择器单独放在一行，左括号前加一个空格，属性：前加一个空格，0值不设单位等

下面，相关属性的声明，也有相关的顺序

	/*声明顺序
	相关的属性声明应当归为一组，并按照下面的顺序排列：
    Positioning 定位属性声明（布局）
    Box model	盒子模型属性声明（大小，间距）
    Typographic		字排版属性（font大小）
    Visual		视属性（可见的颜色，背景等）
	由于定位（positioning）可以从正常的文档流中移除元素，
	并且还能覆盖盒模型（box model）相关的样式，因此排在首位。盒模型排在第二位，因为它决定了组件的尺寸和位置。
	其他属性只是影响组件的内部（inside）或者是不影响前两组属性，因此排在后面。
	*/

	.declaration-order {
	  /* Positioning */
	  position: absolute;
	  top: 0;
	  right: 0;
	  bottom: 0;
	  left: 0;
	  z-index: 100;
	
	  /* Box-model */
	  display: block;
	  float: right;
	  width: 100px;
	  height: 100px;
	
	  /* Typography */
	  font: normal 13px "Helvetica Neue", sans-serif;
	  line-height: 1.5;
	  color: #333;
	  text-align: center;
	
	  /* Visual */
	  background-color: #f5f5f5;
	  border: 1px solid #e5e5e5;
	  border-radius: 3px;
	
	  /* Misc */
	  opacity: 1;
	}

切记不要轻易使用!important
	
	/*不要使用 @import
    与 <link> 标签相比，@import 指令要慢很多，不光增加了额外的请求次数，
    还会导致不可预料的问题。替代办法有以下几种：

    使用多个 <link> 元素
    通过 Sass 或 Less 类似的 CSS 预处理器将多个 CSS 文件编译为一个文件
    通过 Rails、Jekyll 或其他系统中提供过 CSS 文件合并功能
    请参考 Steve Souders 的文章了解更多知识。
	*/

导入文件使用link，不使用import

	/*<!-- Use link elements -->*/
	<link rel="stylesheet" href="core.css"></link>
	
	/*<!-- 避免 @imports -->*/
	<style>
	  @import url("more.css");
	</style>

媒体查询（Media query）的位置
	
	/*
    将媒体查询放在尽可能相关规则的附近。不要将他们打包放在
    一个单一样式文件中或者放在文档底部。如果你把他们分开了，将来只会被大家遗忘。下面给出一个典型的实例
	*/

带前缀的属性
	
	/*
	  当使用特定厂商的带有前缀的属性时，通过缩进的方式，让每个属性的值在垂直方向对齐，这样便于多行编辑
	*/
	
单行规则声明

	/*
	
    对于只包含一条声明的样式，为了易读性和便于快速编辑，
    建议将语句放在同一行。对于带有多条声明的样式，还是应当将声明分为多行。
    这样做的关键因素是为了错误检测 -- 例如，CSS 校验器指出在 183 行有语法错误。
    如果是单行单条声明，你就不会忽略这个错误；如果是单行多条声明的话，你就要仔细分析避免漏掉错误了
	*/
	
简写形式的属性声明

	/*
	在需要显示地设置所有值的情况下，应当尽量限制使用简写形式的属性声明。常见的滥用简写属性声明的情况如下：
	    padding
	    margin
	    font
	    background
	    border
	    border-radius
    大部分情况下，我们不需要为简写形式的属性声明指定所有值。例如，
    HTML 的 heading 元素只需要设置上、下边距（margin）的值，因此，
    在必要的时候，只需覆盖这两个值就可以。过度使用简写形式的属性声明会导致代码混乱，
    并且会对属性值带来不必要的覆盖从而引起意外的副作用。

    MDN（Mozilla Developer Network）上一片非常好的关于shorthand properties 的文章，
    对于不太熟悉简写属性声明及其行为的用户很有用。
	*/
好的写法与不好的写法

	/* 不好的写法 */
	.element {
	  margin: 0 0 10px;
	  background: red;
	  background: url("image.jpg");
	  border-radius: 3px 3px 0 0;
	}
	
	/*好的写法 */
	.element {
	  margin-bottom: 10px;
	  background-color: red;
	  background-image: url("image.jpg");
	  border-top-left-radius: 3px;
	  border-top-right-radius: 3px;
	}

class 命名

	/*
    class 名称中只能出现小写字符和破折号（dashe）（不是下划线，也不是驼峰命名法）。
        破折号应当用于相关 class 的命名（类似于命名空间）（例如，.btn 和 .btn-danger）。
    避免过度任意的简写。.btn 代表 button，但是 .s 不能表达任何意思。
    class 名称应当尽可能短，并且意义明确。
    使用有意义的名称。使用有组织的或目的明确的名称，不要使用表现形式（presentational）的名称。
    基于最近的父 class 或基本（base） class 作为新 class 的前缀。
    使用 .js-* class 来标识行为（与样式相对），并且不要将这些 class 包含到 CSS 文件中。

    在为 Sass 和 Less 变量命名是也可以参考上面列出的各项规范。
	*/

选择器

	/*
	    对于通用元素使用 class ，这样利于渲染性能的优化。
	    对于经常出现的组件，避免使用属性选择器（例如，[class^="..."]）。浏览器的性能会受到这些因素的影响。
	    选择器要尽可能短，并且尽量限制组成选择器的元素个数，建议不要超过 3 。
	    只有在必要的时候才将 class 限制在最近的父元素内（也就是后代选择器）
	    （例如，不使用带前缀的 class 时 -- 前缀类似于命名空间）。
	*/

总结：
	这里对于常见的编写规范错误，我一般会犯的是编写css过于随意，不喜欢用缩写，对于class的命名总是用驼峰命名，希望在将来的工作学习中改掉这些坏毛病。
