---
layout: post
title:  "HTML中常见的长度单位"
date:   2015-5-18 15:14:54
categories: HTML
tags:	HTML
excerpt:	在做屏幕适配过程中，最麻烦的点就在于像素的缩放比例
mathjax: true
author:	闵超
---

* content
{:toc}

##	THML中常见的8种长度

###		1、常见的单位

px：像素（Pixel）,相对于设备的长度单位，像素是相对于显示器屏幕分辨率而言的。譬如，Windows的用户所使用的分辨率一般是96像素/英寸。而MAC的用户所使用的分辨率一般是72像素/英寸。

em：相对长度单位。相对于当前对象内文本的字体尺寸。如当前行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸。

ex：相对长度单位。相对于字符“x”的高度。此高度通常为字体尺寸的一半。如当前对行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸。

pt：点（Point），绝对长度单位。

pc：派卡（Pica），绝对长度单位。相当于我国新四号铅字的尺寸。

in：英寸（Inch），绝对长度单位。

mm：毫米（Millimeter），绝对长度单位。

cm：厘米（Centimeter），绝对长度单位

###		2、理解
cm(厘米)也是随着显示器分辨率变化而变化的。

对于计算机的屏幕设备而言，像素(Pixel)或者说px是一个最基本的单位，就是一个点。其它所有的单位，都和像素成一个固定的比例换算关系。所有的长度单位基于屏幕进行显示的时候，都统一先换算成为像素的多少，然后进行显示。所以，就计算机的屏幕而言，相对长度和绝对长度没有本质差别。任何单位其实都是像素，差别只是比例不同。

如果把讨论扩展到其它输出设备，比如打印机，基本的长度单位可能不是像素，而是其它的和生活中的度量单位一致的单位了。

CSS绝对长度单位是对于输出设备(output device)而言的。拿pt来说，这是一个在文字排版工具(word,adobe等)中非常常用的字体单位，不管你的显示器分辨率是1024×768，还是800×600，同一篇文档打印在纸面上的结果是一样的。

写网页用哪个长度单位更好，是px还是pt呢？

我个人比较偏向px，因为px能够精确地表示元素在屏幕中的位置和大小，网页主要是为了屏幕显示，而不是为了打印等其它需要的。

###		3、相对长度

单位 		说明

em 		元素的字体高度

ex 		字母x的高度

px 		像素Pixels

% 		百分比Percentage


4、换算的长度

转换公式：

px to em:Example:		12px / 16px = .75em

px to %:Example: 	12px / 16px * 100 = 75%

px to pt:Example: 		16px * 72 (72 points = 1 inch) / 96 (96 pixels per inch in Windows, 72 in Mac) = 12pt

em to px:Example: 	.75em * 16px = 12px

em to %:Example: 	.75em * 100 = 75%

% to px:Example:		 75 * 16px / 100 = 12px

% to em:Example: 	75 / 100 = .75em

pt to px:Example: 		12pt * 96ppi / 72ppi = 16px

###		总结

现在看来，用px做字体单位在IE下无法用浏览器字体缩放的功能的缺点已经不再是那么重要了。

因为新版本ie7，ie8都已经支持整个网页的缩放功能，包括火狐默认也是缩放整个网页，而不是缩放css字体，单纯的缩放字体意义不大了。

另外：CSS3新增了一个相对单位：rem，这个单位引起了广泛的关注，意思是(root em)根em，区别在于使用rem为元素设定字体大小时，仍然是相对大小，但相对的只是HTML根元素。

目前，除了IE8及更早版本外，所有浏览器均已支持rem。对于不支持它的浏览器，应对方法也很简单，就是多写一个绝对单位的声明。这些浏览器会忽略用rem设定的字体大小。

###		Rem的例子：

html { font-size: 62.5%;/*10 ÷ 16 × 100% = 62.5%*/ } 

body { font-size: 1.4rem;/*1.4 × 10px = 14px */ }

 h1 { font-size: 2.4rem;/*2.4 × 10px = 24px*/ }

 p {font-size:14px; font-size:1.4rem;}

IE8及之前版本的IE浏览器使用14像素

根元素中定义了一个基本字体大小为62.5%（也就是10px。设置这个值主要方便计算，如果没有设置，将是以“16px”为基准 ）。

从上面的计算结果，我们使用“rem尺寸字体”就像使用“px尺寸字体”一样的方便。


###  页面加载自动生成meta标签，做屏幕自适应功能
	
	/**
	 * 
	 * viewport scale根据设备像素比自动生成
	 * Html根元素font-size根据设备像素比自动生成
	 * by MC
	 */
	
	(document.DOMContentLoaded = function () {
	    var meta = document.createElement("meta"),
	        scale = 1.0 / window.devicePixelRatio;
	    meta.name = "viewport";
	    meta.content = "target-densitydpi=device-dpi,width=device-width,minimum-scale=" + scale + ",maximum-scale=" + scale + ",initial-scale=" + scale + ",user-scalable=no";
	    document.head.appendChild(meta);
	    document.documentElement.setAttribute("style", "font-size:" + 16 * window.devicePixelRatio + "px");
	})();
