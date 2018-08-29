---
layout: post
title:  "定位体系和媒体查询"
date:   2015-10-10 15:14:54
categories: CSS3
tags: CSS3
excerpt: 影响框( box )布局因素之一，便是定位体系,控制框在不同屏幕的适配或者说位置，那就是媒体查询，既可以查出载体的尺寸，也可以查出载体朝向(智能手机横屏与竖屏)和分辨率
author:	闵超
---

* content
{:toc}


## position定位与meida媒体查询
 
### 三种定位体系
	
影响框( box )布局因素之一，便是定位体系。定位体系也是其最为重要的影响因素。
CSS2.1 中，一个框可以根据三种定位体系布局。CSS2.1 中的定位体系帮助作者使他们的文档更容易理解，并不需要使用标记的手段（如，不可见的图片）达到布局的效果。

####	常规流(	Normal flow )

常规流，是对 "normal flow" 的直译。
之所以称之为常规流，是因为这是相对于后面的浮动和绝对定位的一个概念，浮动和绝对定位元素都脱离了当前的常规流。

在 CSS2.1中，常规流包括块框( block boxes )的块格式化( block formatting )， 行内框( inline boxes )的行内格式化( inline formatting )，块框或行内框的相对定位，以及插入框的定位。

####	浮动( Floats )

浮动，顾名思义，相对于常规流来讲，它漂浮在常规流的上方。
在浮动模型中，一个框( box )首先根据常规流布局，再将它从流中取出并尽可能地向左或向右偏移。内容可以沿浮动区的侧面排列。 因为它首先要根据常规布局后才偏移，所以效率较常规流低。
用 'float' 特性声明浮动，特性值可以是："none"、"left"、"right"。


#### 	绝对定位	( Absolute positioning)

在绝对定位模型中，一个框整个地从常规流中脱离（它对后续的兄弟元素没有影响），并根据它的包含块来分配其位置。

- 	static
	
	该框是一个常规框，布局根据常规流。'left' 、'right'、'bottom' 和 'top' 属性不适用。

-	relative
	
	框的位置根据常规流计算（被称为常规流中的位置）。然后框相对于它的常规位置而偏移。既然还属于常规流中，那它后面的兄弟是不受影响，后面的兄弟不会上前占位。

-	absolute

	框的位置（可能还有它的尺寸）是由'left'，'right'，'top'和'bottom'特性决定。这些特性指定了框相对于它包含块的偏移量。 绝对定位的框从常规流向中脱离。这意味着它们对其后的兄弟元素的会向前占位。另外，尽管绝对定位框有外边距(margin)， 它们不会和其它任何外边距发生折叠（Collapsing margins）。

-	fixed

	框位置的计算根据 'absolute' 模型，不过框要额外地根据一些参考而得到固定。跟绝对定位一样，固定定位元素的外边距不会和任何其他外边距发生折叠。 应用于手持终端、投影设备、屏幕、TTY、电视媒体类型时，框相对于可视窗口固定，滚动时不移动。应用于打印媒介类型时，框被渲染于每一页， 并相对于页框固定，就好象是通过可视窗口查看该页一样（例如，打印预览）。对于其他的媒介类型，表现没有被定义。


### 	总结：

1.	absolute和fixed优先级最高，有它存在时，浮动起不了作用。

2.	如果display的值是none，那么position和float不起作用，在这种情况下，元素不产生框，因此浮动和定位无效。

3.	Position的值是absolution或fixed

	如果position的值是absolution或fixed，框就是绝对定位的，框的位置将由top、right、bottom和left属性和该框的包含确定。

4.	'float' 的值不是 "none"
	如果 'float' 的值不是 "none"，该框浮动并且 'display' 会被按照转换对应表设置。 




### 媒体查询

@media规则在css2中就有介绍，针对不同媒体颗星可以定制不同的样式规则。例如：你可针对不同的媒体类型(包括显示器、便携设备、电视机等等)设置不同的样式规则。但这些多媒体类型在很多设备上支持还不够友好

 CSS3多媒体查询根据设置自适应显示。媒体查询可用于检测很多事情，例如：

 viweport(视窗)的宽度与高度

 设备的高度与宽度

 朝向(智能手机横屏与竖屏)

 分辨率

####	常见的媒体查询

	/*大屏幕*/
	@media screen and (min-width: 1200px) {
	    body {
	        background-color: brown;
	    }
	}
	/*平板电脑与小屏电脑之间的分辨率*/
	@media screen and (min-width: 768px) and (max-width:979px) {
	    body {
	        background-color: blue;
	    }
	}
	/*横向放置的手机和竖向放置的平板之间的分辨率*/
	@media screen and (max-width:767px) {
	    body {
	        background-color: blueviolet;
	    }
	}
	
	/*竖向放置的手机以及分别率*/
	@media screen and (max-width: 480px) {
	    body {
	        background-color: black;
	    }
	}


媒体查询，使用方法，不需要所有元素的在同一屏幕的情况写在一起，可以有多个css媒体查询