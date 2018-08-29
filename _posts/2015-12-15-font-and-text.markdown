---
layout: post
title:  "字体和文本效果"
date:   2015-12-15 15:14:54
categories: CSS3
tags: CSS3
excerpt: css3之前的版本，网页设计师不得不使用用户计算机已经安装的字体.使用css3，网页设计师可以使用他/她喜欢的任何字体。
mathjax: true
author:	闵超
---

* content
{:toc}

## 字体##
css3之前的版本，网页设计师不得不使用用户计算机已经安装的字体。  

使用css3，网页设计师可以使用他/她喜欢的任何字体
当你发现您要使用的字体文件时，只需要简单的将字体文件包含在网站中，它会自动下载给需要的用户。您所选择的新的css3版本有关于@font-face规则描述。  

您自己的字体是在css3@font-face规则中定义的。  
	
	<style> 
	@font-face
	{

	font-family: myFirstFont;
	src: url('myfont/fontawesome-webfont.ttf')
		,url('myfont/fontawesome-webfont.woff'); /* IE9 */

	}
	div
	{

	font-family:myFirstFont;

	}
	</style>

### demo#

	<!DOCTYPE html>
	<html>
	<head>
	<meta charset="utf-8"> 
	<title>字体</title> 
	<style> 
	@font-face
	{

	font-family: myFirstFont;
	src: url('myfont/fontawesome-webfont.ttf')
		,url('myfont/fontawesome-webfont.woff'); /* IE9 */

	}
	
	div
	{

	font-family:myFirstFont;

	}
	</style>
	</head>
	<body>
	
	<p style="font-family:'Microsoft YaHei'"> 微软雅黑 Microsoft YaHei  Internet Explorer 9 只支持 .eot 格式的字体.</p>
	<p style="font-family:'Times New Roman'"> Internet Explorer 9 只支持 .eot 格式的字体.</p>
	<p style="font-family:'SimSun'"> 宋体  Internet Explorer 9 只支持 .eot 格式的字体.</p>
	<p style="font-family:'SimHei'"> 黑体   Internet Explorer 9 只支持 .eot 格式的字体.</p>
	<p style="font-family:' Microsoft JhengHei'"> 微软正黑体 Internet Explorer 9 只支持 .eot 格式的字体.</p>
	<p style="font-family:' NSimSun'"> 新宋体 Internet Explorer 9 只支持 .eot 格式的字体.</p>
	<p style="font-family:'PMingLiU'"> 新细明体 Internet Explorer 9 只支持 .eot 格式的字体.</p>
	<p style="font-family:'DFKai-SB'"> 标楷体 Internet Explorer 9 只支持 .eot 格式的字体.</p>
	<p style="font-family:'FangSong'"> 仿宋 Internet Explorer 9 只支持 .eot 格式的字体.</p>
	<p style="font-family:'KaiTi'"> 楷体 Internet Explorer 9 只支持 .eot 格式的字体.</p>
	<p style="font-family:'_GB2312 FangSong_GB2312'">  仿宋_ Internet Explorer 9 只支持 .eot 格式的字体.</p>
	<p style="font-family:'_GB2312 KaiTi_GB2312'"> 楷体_ Internet Explorer 9 只支持 .eot 格式的字体.</p>
	
	
	
	<p style="font-family:myFirstFont;">自定义字体</p>
	<div>
	Internet Explorer 9 只支持 .eot 格式的字体.
	</div>
	
	</body>
	</html>

## 文本效果##

### text-shadow:字体阴影  

	.text{ 

	text-shadow:5 px 5px 5px #FF0000;

	}

##### 指定:水平阴影、垂直阴影、模糊的距离，以及阴影的颜色

### box-shadow:背景阴影
text-overflow:
文字溢出

	.text{

	text-overflow:clip|ellipsis;

	}



word-wrap:
剪切|…替代

如果某个单词太长，不适合在一个区域内，它扩展到外面：css3中，自动切换属性允许强制文本换行-即使这意味着分裂它中间的一个字。

	.text{

	word-wrap:break-word;

	}

word-break:规定非中日韩文本的换行规则

css3单词拆分换行属性指定换行规则：

	.text{
		word-break:keep-all|break-all;
	}

##  		新文本属性##

hanqing-punctuation:规定标点字符是否位于线框之外

punctuation-trim:规定是否对标点字符进行修剪

text-align-last：设置如何对齐最后一行或紧挨着强制换行符之前的行

Text-emphasis:向元素的文本应用重点标记以及重点标记的前背景色

Text-justify:规定当text-align设置为“justify”时所使用的对齐方法

Text-outline:规定文本的轮廓


## demo##
	<!DOCTYPE html>
	<html>
	<head>
	<meta charset="utf-8"> 
	<title>文本效果</title> 
	<style>
	h1
	{

	text-shadow: 10px 10px 5px #888;

	}
	div.test
	{

	white-space:nowrap; 
	width:12em; 
	overflow:hidden; 
	border:1px solid #000000;
	
	}

	</style>
	</head>
	<body>
	
	<h1>文字阴影效果</h1>
	
	<p>以下 div 容器内的文本无法完全显示，可以看到它被裁剪了。</p>
	
	<p>div 使用 &quot;text-overflow:ellipsis&quot;:</p>
	<div class="test" style="text-overflow:ellipsis;">This is some long text that will not fit in the box</div>
	
	<p>div 使用 &quot;text-overflow:clip&quot;:</p>
	<div class="test" style="text-overflow:clip;">This is some long text that will not fit in the box</div>
	
	<p>div 使用自定义字符串 &quot;text-overflow: &gt;&gt;&quot;(只在 Firefox 浏览器下有效):</p>
	<div class="test" style="text-overflow:'>>';">This is some long text that will not fit in the box</div>
	
	<p><b>注意:</b> Internet Explorer 9 以及更早版本的浏览器不支持 text-shadow属性.</p>
	
	</body>
	</html>