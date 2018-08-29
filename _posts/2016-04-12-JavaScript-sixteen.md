---
layout: post
title:  "脚本化CSS"
date:   2016-04-12 23:33:54
categories: JavaScript
tags: JavaScript
excerpt:	层叠样式表(Cascading Style Sheet,CSS)是一种指定HTML文档视觉表现的标准。CSS的本意是想让视觉设计师来使用的。它允许设计师精确地指定文档元素的字体、颜色、外边距、缩进、边框甚至是定位。
mathjax: true
author:	闵超
---

* content
{:toc}

#		脚本化CSS
层叠样式表(Cascading Style Sheet,CSS)是一种指定HTML文档视觉表现的标准。CSS的本意是想让视觉设计师来使用的。它允许设计师精确地指定文档元素的字体、颜色、外边距、缩进、边框甚至是定位。

想要理解CSS脚本化，我们必须熟悉CSS基础和最常用的样式属性。


##		CSS概览
HTML文档的视觉显示包含很多变量：字体、颜色、间距等。CSS标准列举了这些变量，我们称为样式属性。CSS定义了这些属性以指定字体、颜色、外边距、边框、背景图片、文本对齐方式、元素尺寸和元素位置。为了定义HTML的视觉表现，规定了这些CSS属性的值。为此，紧跟冒号和值，例如：
	
	font-weight:blod
为了全面地描述一个元素的视觉表现，通常需要指定不止一个属性。
	
	margin-left:10Z%;/* 左边距是页面宽度的10%*/
	text-indent:.5in;	/* 1/2英寸缩进*/
	font-size:12pt;/* 字体尺寸12pt*/
如你所见，CSS忽略了"/*"和"*/"之间的注释，但是它不支持 "//"后面的注释。


###		层叠
在CSS中的C代表的就是"层叠"。该术语指示了应用于文档中任何给定元素的样式规则是各个来源的层叠。
	
-	Web浏览器默认样式表
-	文档的样式表
-	每个独立的HTML元素的style属性

当然，style属性中的样式覆盖了样式表中的样式。

###		CSS历史
CSS是一个相对较老的标准。CSS1只出了具体的颜色、字体、外边距、边框和一些基本样式。CSS2澄清和更正了CSS2，并且删除了浏览器供应商从未实现的功能。CSS3规范了CSS各种各样的专门化模块。

###		非标准属性
当浏览器厂商实现非标准CSS属性时，它们用属性名前加一个厂商的前缀。

Firefox使用-moz-，Chrome使用-webkit-，而IE使用-ms-，它们甚至用这种方式来实现将来会标注化的属性。

##		CSS重要属性
对于客户端的程序员来说，最重要的CSS特性是那些指定文档中每个元素的可见性、尺寸和精确定位的属性。

	属性						描述
	position			指定元素的定位类型
	top、left			指定元素上、左边缘的位置
	bottom、right		指定元素下、右边缘的位置
	width,height		指定元素的尺寸
	z-index				指定元素相对于其他重叠元素的"堆叠次序"，定义了元素定位的三个维度
	display				指定元素是否以及如何显示
	visibility			指定元素是否可见
	clip				定义元素的"裁剪区域，只显示元素在区域内的部分"
	overflow			指定元素比分配的空间要大时的处理方式
	margin、border、padding	指定元素的空白和边框
	background			指定元素的背景颜色或图片
	opacity				指定元素的不透明(或半透明)，它是CSS3的属性，有些浏览器支持，IE中不同

###		用CSS定位元素
position有四个属性值
	
-	static	
	默认属性。指定元素按照常规的文档内容流(对多数西方语言而言就是从左往右、从上到下)进行定位。静态定位的元素不能用top、left和类似其他属性定位。想要用tlbr(top、left、bottom、right)四个属性定位，必须将此属性设置其他三个值。
-	absolute
	该值指定元素是相对于它包含的元素进行定位。相对于所有其他的元素，绝对定位的元素是独立定位的，它不是静态定位的元素中文档流的一部分。它的定位，要么是相对于最近的定位祖先元素，要么是相对于文档本身。
-	fixed
	该值指定元素是相对于浏览器窗口进行定位的。固定定位的元素总是显示在那里，不会随着文档其他部分而滚动。类似于绝对定位的元素，固定定位的元素和所有元素是独立的，它不是文档流的一部分，除了IE6，现代浏览器都支持固定定位。
-	relative
	当position属性设置为relative，元素按照常规的文档流进行布局，它的定位相对于它文档流中的位置进行调整。系统保留着元素在正常文档流中的空间，不会因为要填充空间而将其各边合拢，也不会将元素从新的位置"推开"。

###		第三个维度：z-index
left、top、right和bottom属性是容器元素二维坐标中指定x和y坐标，z-index属性，定义了第三个维度：它允许指定元素的堆叠次序，并指示两个或多个重叠元素中的哪一个应该绘制在其他的上面。


###		边框、外边框和内边距
border表示边框，margin表示外边框padding表示内边距

###		文件显示和可见性
两个CSS属性影响了文档的可见性：visibility和display。visibility属性很简单，当其值为hidden时，该元素不显示；当其值设置为visible时，该元素显示。而display设置为none时，受影响的元素将不显示，甚至根本没有布局。

visibility和display 属性之间的差别可以从它们对使用静态或相对定位的元素的影响中看到。对于一个常规布局流中的元素，设置visibility属性为hidden使得元素不可见，但是在文档布局中人保留了它的空间。类似的元素可以重复隐藏和显示而不改变文档布局，它各边的元素会合拢，就当它从来不存在。

visibility和display属性对绝对定位和固定定位的元素的影响是等价的，因为这些元素都不是文档流的一部分。热庵后在隐藏和显示定位元素时一般首选visibility属性。

###		颜色、透明度和般透明度color,RGB,opacity
可以通过CSS的color属性指定文档元素包含的文本颜色。
	
	opactity:.75;	/*透明度，CSS3*/
	filter:alpha(opacity =  75); /*IE透明度设置*
	
###		部分可见：overflow和clip
visibility属性可以让文档元素完全隐藏，而overflow和clip属性允许只显示元素的一部分。overflow属性指定内容超出元素的大小时该如何显示。

-	visible
	默认值，如果需要，内容可以溢出并绘制在元素的边框外面。
-	hidden
	裁减掉和隐藏溢出的内容，即在元素尺寸和定位属性值定义的区域外不会绘制内容
-	scroll
	元素显示水平和垂直滚动条。如果内容超出元素尺寸，允许用户通过滚动条来查看额外的内容。此属性值负责文档在计算机屏幕中的显示。
-	auto
	滚动条只在内容超出元素尺寸时显示

clip属性的值指定了元素的裁剪区域。裁剪区域是矩形，不过clip属性的语法预留了开放的可能。
	
	clip:rect(top right bottom left)；
相对于元素的边框的左上角,top、right、bottom、left四个值指定了裁剪矩形的边界。

##		脚本化内联样式
脚本话CSS最直接了当的方法就是更改单独的文档元素的style属性。类似大多数HTML属性，style也是元素对象的属性，它可以在JavaScript中操作。但是style属性不同寻常：它的值不是字符串，而是一个CSSStyleDeclaration对象。该style对象的JavaScript属性代表了HTML代码中通过style指定的CSS属性。
	
	e.style.fontSize = "24pt";
	e.style.fontWeight = "bold";
	e.style.color = "blue";
注意：CSSStyleDeclaration对象中的属性名和实际的CSS属性名有所区别。如果一个CSS中的属性名是-链接的字符。则CSSStyleDeclaration属性名的格式是移除连字符，使用驼峰命名法。


###		CSS动画
脚本化的CSS最常见的用途之一是产生视觉动画效果。使用setTimeout()或setInterval()重复调用函数来修改元素的内联样式达到目的。


##		查询计算出的样式
元素的style属性代表了元素的内联样式，它覆盖所有的样式表，它是设置CSS属性值来改变元素的视觉表现最好的地方。但是，它在查询元素实际应用的样式时用处不大。

用浏览器窗口对象的getComputedStyle()方法来获取一个元素的计算样式。此方法的第一个参数就是要获取其计算样式的元素，第二个参数也是必需的，通常是null或空字符串，但它也可以是命名CSS伪类对象的字符串，如":before"、":after"、":first-line"或":first-letter"。

	var title = document.getElementById("section1title");
	var titlestyles = window.getComputedStyle(element,null);
getComputedStyle()方法的返回值是一个CSSStyleDeclaration对象，它代表了应用在指定元素(或伪对象)上的所有样式。


##		脚本化CSS类
通过内联style属性脚本化CSS样式的一个可选方案是脚本化HTML的class属性值。改变元素的class就改变了应用于元素的一组样式表选择器，它能在同一时刻改变多个CSS属性。

HTML元素可以有多个CSS类名，class属性保存了一个用空格隔开的类名列表。className属性是一个容易误解的名字：classNames可能更好。上面的函数假设className属性只指定零个或一个类名，如果有多个类名就无法工作了。
	

##		脚本化样式表
到目前为止，我们已经看到如何设置和查询CSS样式和单个元素的类名。脚本化样式表当然也是可能的。虽然不经常这么做，但偶尔这却非常有用。

脚本化样式表时，将会碰到两类需要使用的对象。

第一类是元素对象，由`<style>`和`<lin>`元素表示。两种元素包含或引用样式表。这些事常规的文档元素，如果它们由id属性值，可以用document.getElementById()函数来选择它们。

第二类是CSSStyleSheet对象，它表示样式表本身，document.styleSheets属性是一个只读的类数组对象，它包含CSSStyleSheet对象，表示与文档关联在一起的样式表。