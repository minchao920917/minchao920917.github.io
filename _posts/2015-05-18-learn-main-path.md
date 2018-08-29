---
layout: post
title:  "理解浏览器关键渲染路径"
date:   2015-5-18 15:14:54
categories: web浏览器
tags:	web浏览器
excerpt: 理解浏览器的渲染流程，先创建DOM，再加载CSSOM，完成之后再运行JavaScript
mathjax: true
author:	闵超
---

* content
{:toc}

# 理解关键渲染路径
当浏览器接收到服务器响应的HTML页面时，在屏幕绘制图像之前发生了许多事情，浏览器初次绘制页面的过程叫做“关键选渲染路径”

了解CRP(关键渲染路径)对于理解如何提高网站性能非常有帮助


##	1. 构建 DOM 树
DOM（文档对象模型 Document Object Model）树是代表 HTML 页面完全解析的对象。从根元素<html>开始，为页面的每个元素/文本创建节点。嵌套在其他元素中的元素表示为子节点，每一个节点都包含了该元素的所有属性。例如，一个&lt;a&gt;元素与它相关的节点都拥有href属性。

	<html>
	<head>
	  <title>Understanding the Critical Rendering Path</title>
	  <link rel="stylesheet" href="style.css">
	</head>
	<body>
	  <header>
	    <h1>Understanding the Critical Rendering Path</h1>
	  </header>
	  <main>
	    <h2>Introduction</h2>
	    <p>Lorem ipsum dolor sit amet</p>
	  </main>
	  <footer>
	    <small>Copyright 2017</small>
	  </footer>
	</body>
	</html>
HTML 的一个好处是，它可以部分执行。在页面中，文档不需要加载完全才开始展示。然而，其它资源，CSS 和 JavaScript，会阻塞页面的渲染。

##	2. 构建 CSSOM 树

CSSOM（CSS对象模型CSS Object Model）是代表DOM样式的对象。它的表现类似于DOM，但表示的是每个节点的关联样式，不管是显性声明还是隐性继承的，都包含其中。
[CSSr是如何工作的](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Getting_started/How_CSS_works),浏览器在展现一个文档的时候，必须要把文档内容和响应的样式结合起来展示，这个处理过程一般分为两个阶段：

第一，浏览器先将标记语言（html标签，也有的说法叫html元素）和css转换成DOM（文档对象模型）结构。
第二，浏览器再把DOM内容展现出来.

DOM是一种树形结构。 每个元素和非空文本都可以看做是树形结构上的一个结点。DOM结点不再是容器，但是，它可以作为子结点的父类结点而存在。

CSS 被认为是 “渲染阻塞资源”,CSS 同时也是“脚本阻塞”。这是因为 JavaScript 文件必须等待 CSSOM 构建完才能运行
##	3. 运行 JavaScript

JavaScript 被认为是“解析阻塞资源”。这意味着 JavaScript 会阻塞 HTML 文档的解析。

不管是内联的还是外联的，它会停止获取（如果是外联的），立即运行。这就是为什么，如果文档包含一个 JavaScript 文件时，它必须放在文档之后。

为了避免 JavaScript 阻塞解析，可以应用async属性使它异步加载。

##	4. 创建渲染树

渲染树是 DOM 和 CSSOM 的结合。是代表最终渲染在页面上的内容的树。这意味着它只捕获可见内容，不包含如使用了display: none的不可见元素。

使用上文中的 DOM 和 CSSOM，创建以下的渲染树

##	5. 布局

布局决定了视窗的大小，CSS 样式取决于它提供的上下文，如百分比或者视窗单位。视窗尺寸由文档头部的 meta 视窗标签决定，如果没有提供该标签，那么默认宽度为 980px;	
最常用的是meta视窗值是设备的尺寸

	<meta name="viewport" content="width=devi；ce-width,initial-scale=1">

##	6. 绘制
最后，在绘制步骤中，页面的可见内容可以转换为在屏幕上显示的像素。

绘制所消耗的时间取决于 DOM 的大小和所应用的样式。有的样式会比其它样式需要更多的执行工作。例如，一个复杂的渐变背景图比一个简单的纯色背景图需要更多的时间

## 总结
我们可以在开发者工具中查看进程中的关键渲染路径。对于 Chrome，在 Timeline 标签中（对于 Canary，很快成为 Chrome 的稳定版，重命名为 Performance）。

