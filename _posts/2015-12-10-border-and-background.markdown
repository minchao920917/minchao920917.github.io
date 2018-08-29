---
layout: post
title:  "边框和背景"
date:   2015-12-10 15:14:54
categories: CSS3
tags: CSS3
excerpt: css3中可以创建圆角边框，添加阴影框，并作为边框的形象而不使用设计程序 
mathjax: true
author:	闵超
---

* content
{:toc}

## css的边框和背景详解

### css边框的三个属性  

border:
用法：.box{ border:border-width||border-style||border-color;}(第三个颜色使可选的)  

css3中可以创建圆角边框，添加阴影框，并作为边框的形象而不使用设计程序  

1.	border-radius:

用法 ：.box{ border-radius:25px;}

2.	border-shadow:

用法 ：.box{ box-shadow:10px 10px 5px #888888;}

第一个参数是X轴偏移量，第二个参数是Y轴偏移量，第三个是阴影的尺寸，第四个是颜色

3.	border-image:

用法 ：    
	.box{   
		border- image:url() 30 30 round;
		-webkit-border-image:url() 30 30 round;/*Safari and  older*/
		-o-border-image:url() 30 30 round;/*Opera*/
	}

  
总结:  

	<!DOCTYPE html>
	<html>
	<head>
	<meta charset="utf-8"> 
	<title>边框</title> 
	<style> 
	.flex-container {
	    display: -webkit-flex;
	    display: flex;
	    flex-flow:row wrap;
	    justify-content:stretch;
	    /*align-items:baseline;*/
	    align-content:stretch;
	    /*width: 400px;*/
	
	
	    height:400px;
	    background-color: lightgrey;
	
	}
	
	.flex-item {
	    background-color: cornflowerblue;
	    width: 200px;
	    height: 100px;
	    margin: auto;
	    margin-right: 10px;
	    border:1px solid red;
	    border-radius:5px 15px 20px 35px;
	/*边框阴影*/
	    -moz-box-shadow: 10px 10px 5px #888888; /* 老的 Firefox */
	    box-shadow: 10px 10px 5px #888888;
	}
	.flex-item:hover{
	/*  -webkit-flex-shrink:0.5;
	  flex-shrink:2;*/
	  flex-grow:1.2;
	  border-color: green;
	}
	
	
	</style>
	</head>
	<body>
	
	<div class="flex-container">
	  <div class="flex-item">flex item 1</div>
	  <div class="flex-item">flex item 2</div>
	  <div class="flex-item">flex item 3</div>    
	  <div class="flex-item">flex item 4</div>  
	  <div class="flex-item">flex item 5</div>  
	  <div class="flex-item">flex item 6</div>
	  <div class="flex-item">flex item 7</div>
	  <div class="flex-item">flex item 8</div>    
	  <div class="flex-item">flex item 9</div>  
	  <div class="flex-item">flex item 10</div>    
	
	
	</body>
	</html>
  
###CSS3中包含几个新的背景属性，提供更大的背景元素控制###
	1.background-image:
 	.box{
		background-image:url();
		background-position:left bottom;
	} 
背景图片，背景图片的位置

	2.background-size:
 	.box{
		background-size:100% 100%;
	}
背景图片的大小  

	3.background-orgin:
 	.box{
		background:border-box或content-box或padding-box
	}   
是指背景显示的区域，或者说背景是从哪个区域开始绘制的(边框、补白或内容区域)  

	4.background-clip:
 	.box{
		background-clip:content-box或padding-box或border-box;
	}
该属性指定了背景在哪些区域可以显示，但与背景开始绘制的位置无关，背景的绘制的位置可以出现在不显示背景的区域，这时就相当于背景图片被不显示背景的区域裁剪了一部分一样。  

	5.background-attachment:
scroll:默认值，背景图相对于元素固定，背景随页面滚动而移动，即背景和内容绑定。

fixed：背景图相对于视口固定，所以随页面滚动背景不动，相当于背景被设置在了body上。

local：背景图相对于元素内容固定，

inhert:继承，没什么说的。

