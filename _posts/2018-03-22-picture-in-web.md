---
layout: post
title:  " 网页制作中的图片"
date:   2018-03-22 23:06:05
categories: 前端知识
tags: 前端知识
excerpt: 总有人问我为什么他在html展示的时候图片变形了，或者部分没展示出来，图片尺寸应该怎么弄，因此，我觉得还是有必要在这里对网页中的图片做一下说明
mathjax: true
author:	闵超
---

* content
{:toc}

#	网页制作中的图片

图片：jpg，png，gif

##	jpg图片

我们最常见的。

jpg：可压缩的，有损图片质量的格式。虽然可压缩，它的色彩还是比较丰富。

特点：文件小、色彩丰富。

在网页中常用。

劣势：不能保存透明背景图片。

用途：插入图，大篇幅的整个的背景图。本身不要求太清晰，文件加载够快。

IE6图片边框

 如果在img标签外面套了一个a标签，在IE6里会给图片加一个边框。我们需要清除这个边框。

	img{
	    border:none;
	}


##	png图片

png：不可压缩的，可以保存图层。

质量比较大，真正使用的时候保存的是png32格式。

png特点：支持透明和半透明。

用途：精灵图、背景图。

问题：IE6不支持它的透明和半透明。

高级浏览器支持透明和半透明。

解决办法：引入一段js语句

	<!--[if IE 6]>	
		<script type="text/javascript" src="js/png.js"></script>
		<script type="text/javascript">
			DD_belatedPNG.fix("div,ul,img,li,input,span,b,h1,h2,h3,h4"); 
		</script>
	<![endif]-->

##		gif图片

gif：本身跟压缩无关，颜色色值较少，256种、128种、2种。

特点：可以保存透明，不支持半透明。可以保存动图。

在IE6里，透明效果没有兼容性问题。

用途：背景透明，动图。




