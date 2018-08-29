---
layout: post
title:  "渐变"
date:   2015-12-13 15:14:54
categories: CSS3
tags: CSS3
excerpt: 渐变包含线性渐变和径向渐变。
author:	闵超
---

* content
{:toc}

## 	渐变

### 	线性渐变 


语法：background: linear-gradient(direction, color-stop1, color-stop2, ...);

### 	从上到下

	#grad1 {
	    height: 200px;
	    background: -webkit-linear-gradient(#000, #888); /* Safari 5.1 - 6.0 */
	    background: -o-linear-gradient(#000, #888); /* Opera 11.1 - 12.0 */
	    background: -moz-linear-gradient(#000, #888); /* Firefox 3.6 - 15 */
	    background: linear-gradient(#000, #888); /* 标准的语法（必须放在最后） */
	}

###	 从左到右

	#grad2 {
	    height: 200px;
	    background: -webkit-linear-gradient(left, red , blue); /* Safari 5.1 - 6.0 */
	    background: -o-linear-gradient(right, red, blue); /* Opera 11.1 - 12.0 */
	    background: -moz-linear-gradient(right, red, blue); /* Firefox 3.6 - 15 */
	    background: linear-gradient(to right, red , blue); /* 标准的语法（必须放在最后） */
	}

### 从左上到右下

	#grad3 {
	    height: 200px;
	    background: -webkit-linear-gradient(left top, #000 , #888); /* Safari 5.1 - 6.0 */
	    background: -o-linear-gradient(bottom right, #000, #888); /* Opera 11.1 - 12.0 */
	    background: -moz-linear-gradient(bottom right, #000, #888); /* Firefox 3.6 - 15 */
	    background: linear-gradient(to bottom right, #000 , #888); /* 标准的语法（必须放在最后） */
	}
---

## 径向渐变

语法: background: radial-gradient(center, shape size, start-color, ..., last-color);

	#grad6 {
	    height: 150px;
	    width: 200px;
	    background: -webkit-radial-gradient(red, green, blue); /* Safari 5.1 - 6.0 */
	    background: -o-radial-gradient(red, green, blue); /* Opera 11.6 - 12.0 */
	    background: -moz-radial-gradient(red, green, blue); /* Firefox 3.6 - 15 */
	    background: radial-gradient(red, green, blue); /* 标准的语法（必须放在最后） */
	}

### 	不均匀分布

	#grad7 {
	    height: 150px;
	    width: 200px;
	    background: -webkit-radial-gradient(red 5%, green 15%, blue 60%); /* Safari 5.1 - 6.0 */
	    background: -o-radial-gradient(red 5%, green 15%, blue 60%); /* Opera 11.6 - 12.0 */
	    background: -moz-radial-gradient(red 5%, green 15%, blue 60%); /* Firefox 3.6 - 15 */
	    background: radial-gradient(red 5%, green 15%, blue 60%); /* 标准的语法（必须放在最后） */
	}

### 	椭圆形  默认

	#grad8 {
	    height: 150px;
	    width: 200px;
	    background: -webkit-radial-gradient(red, yellow, green); /* Safari 5.1 - 6.0 */
	    background: -o-radial-gradient(red, yellow, green); /* Opera 11.6 - 12.0 */
	    background: -moz-radial-gradient(red, yellow, green); /* Firefox 3.6 - 15 */
	    background: radial-gradient(red, yellow, green); /* 标准的语法（必须放在最后） */
	}

### 	圆形

	#grad9 {
	    height: 150px;
	    width: 200px;
	    background: -webkit-radial-gradient(circle, red, yellow, green); /* Safari 5.1 - 6.0 */
	    background: -o-radial-gradient(circle, red, yellow, green); /* Opera 11.6 - 12.0 */
	    background: -moz-radial-gradient(circle, red, yellow, green); /* Firefox 3.6 - 15 */
	    background: radial-gradient(circle, red, yellow, green); /* 标准的语法（必须放在最后） */
	}

###		重复

	#grad10 {

	    height: 150px;
	    width: 200px;
		background: -moz-repeating-radial-gradient(#ace, #ace 5px, #f96 5px, #f96 10px);
		background: -webkit-repeating-radial-gradient(#ace, #ace 5px, #f96 5px, #f96 10px);
		background: -moz-repeating-linear-gradient(top left -45deg, #ace, #ace 5px, #f96 5px, #f96 10px);
		background: -webkit-repeating-linear-gradient(top left -45deg, #ace, #ace 5px, #f96 5px, #f96 10px);

	}


## demo
	<!DOCTYPE html>
	<html>
	<head>
	<meta charset="utf-8"> 
	<title>渐变</title> 
	<style>
	/*从上到下*/
	#grad1 {

    height: 200px;
    background: -webkit-linear-gradient(#000, #888); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#000, #888); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#000, #888); /* Firefox 3.6 - 15 */
    background: linear-gradient(#000, #888); /* 标准的语法（必须放在最后） */

	}
	/*从左到右*/
	#grad2 {

    height: 200px;
    background: -webkit-linear-gradient(left, red , blue); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, red, blue); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, red, blue); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, red , blue); /* 标准的语法（必须放在最后） */

	}
	/*从左上到右下*/
	#grad3 {

    height: 200px;
    background: -webkit-linear-gradient(left top, #000 , #888); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(bottom right, #000, #888); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(bottom right, #000, #888); /* Firefox 3.6 - 15 */
    background: linear-gradient(to bottom right, #000 , #888); /* 标准的语法（必须放在最后） */

	}
	/*彩虹渐变*/
	#grad4 {

    height: 55px;
    background: -webkit-linear-gradient(left, red, orange, yellow, green, blue, indigo, violet); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(left, red, orange, yellow, green, blue, indigo, violet); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(left, red, orange, yellow, green, blue, indigo, violet); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet); /* 标准的语法（必须放在最后） */

	}
	#grad5 {

    height: 200px;
    background: -webkit-linear-gradient(left, rgba(255,0,0,0), rgba(255,0,0,1)); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, rgba(255,0,0,0), rgba(255,0,0,1)); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, rgba(255,0,0,0), rgba(255,0,0,1)); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1)); /* 标准的语法（必须放在最后） */

	}
	/*径向渐变*/
	/*均匀分布*/
	#grad6 {

    height: 150px;
    width: 200px;
    background: -webkit-radial-gradient(red, green, blue); /* Safari 5.1 - 6.0 */
    background: -o-radial-gradient(red, green, blue); /* Opera 11.6 - 12.0 */
    background: -moz-radial-gradient(red, green, blue); /* Firefox 3.6 - 15 */
    background: radial-gradient(red, green, blue); /* 标准的语法（必须放在最后） */

	}
	/*不均匀分布*/
	#grad7 {

    height: 150px;
    width: 200px;
    background: -webkit-radial-gradient(red 5%, green 15%, blue 60%); /* Safari 5.1 - 6.0 */
    background: -o-radial-gradient(red 5%, green 15%, blue 60%); /* Opera 11.6 - 12.0 */
    background: -moz-radial-gradient(red 5%, green 15%, blue 60%); /* Firefox 3.6 - 15 */
    background: radial-gradient(red 5%, green 15%, blue 60%); /* 标准的语法（必须放在最后） */

	}
	/*椭圆形  默认*/
	#grad8 {

    height: 150px;
    width: 200px;
    background: -webkit-radial-gradient(red, yellow, green); /* Safari 5.1 - 6.0 */
    background: -o-radial-gradient(red, yellow, green); /* Opera 11.6 - 12.0 */
    background: -moz-radial-gradient(red, yellow, green); /* Firefox 3.6 - 15 */
    background: radial-gradient(red, yellow, green); /* 标准的语法（必须放在最后） */

	}
	/*圆形*/
	#grad9 {

    height: 150px;
    width: 200px;
    background: -webkit-radial-gradient(circle, red, yellow, green); /* Safari 5.1 - 6.0 */
    background: -o-radial-gradient(circle, red, yellow, green); /* Opera 11.6 - 12.0 */
    background: -moz-radial-gradient(circle, red, yellow, green); /* Firefox 3.6 - 15 */
    background: radial-gradient(circle, red, yellow, green); /* 标准的语法（必须放在最后） */

	}
	/*重复*/
	#grad10 {

    height: 150px;
    width: 200px;
	background: -moz-repeating-radial-gradient(#ace, #ace 5px, #f96 5px, #f96 10px);
	background: -webkit-repeating-radial-gradient(#ace, #ace 5px, #f96 5px, #f96 10px);
	background: -moz-repeating-linear-gradient(top left -45deg, #ace, #ace 5px, #f96 5px, #f96 10px);
	background: -webkit-repeating-linear-gradient(top left -45deg, #ace, #ace 5px, #f96 5px, #f96 10px);

	}
	
	.flex-box{
		display: flex;
	}
	.flex-item{
		margin-left: 30px;
	}
	</style>
	</head>
	<body>
	
	<h3>线性渐变 - 从上到右</h3>
	<div id="grad1"></div>
	
	<h3>线性渐变 - 从左到右</h3>
	<div id="grad2"></div>
	
	<h3>线性渐变 - 从左上到右下</h3>
	<div id="grad3"></div>
	
	<h3>彩虹渐变</h3>
	<div id="grad4" style="text-align:center;margin:auto;color:#999;font-size:40px;font-weight:bold">渐变背景</div>
	
	<h3>线性渐变 - 透明度</h3>
	<p>为了添加透明度，我们使用 rgba() 函数来定义颜色结点。rgba() 函数中的最后一个参数可以是从 0 到 1 的值，它定义了颜色的透明度：0 表示完全透明，1 表示完全不透明。</p>
	<div id="grad5"></div>
	
	<h1 style="text-align:center;margin:auto;color:#333;font-weight:bold">径向渐变</h1>
	
	<div class="flex-box">
		<div class="flex-item">
		<h3>径向渐变 - 颜色结点均匀分布</h3>
		<div id="grad6"></div>
		</div>
		<div class="flex-item">
		<h3>径向渐变 - 颜色结点不均匀分布</h3>
		<div id="grad7"></div>
		</div>	
		<div class="flex-item">
		<p><strong>椭圆形 Ellipse（默认）：</strong></p>
		<div id="grad8"></div>
		</div>	
		<div class="flex-item">
		<p><strong>圆形 Circle：</strong></p>
		<div id="grad9"></div>
		</div>	
		<div class="flex-item">
		<p><strong>重复：</strong></p>
		<div id="grad10"></div>
		</div>
	
	</div>
	
	
	
	
	<p><strong>注意：</strong> Internet Explorer 9 及之前的版本不支持渐变。</p>
	</body>
	</html>