---
layout: post
title:  "flex布局的用法"
date:   2015-12-11 15:14:54
categories: CSS3
tags: CSS3
excerpt: Flex意为“弹性布局”，英文flexible box的缩写，flex布局使css盒模型变得更加强大和灵活，flex布局主要用在webapp和移动端中使用，移动端flex布局，将使的布局变得异常简单。任何一个容器都可以指定为flex布局；行内元素也可以使用flex布局
mathjax: true
author:	闵超
---

* content
{:toc}

## Css3的flex布局用法
Flex意为“弹性布局”，英文flexible box的缩写，flex布局使css盒模型变得更加强大和灵活，flex布局主要用在webapp和移动端中使用，移动端flex布局，将使的布局变得异常简单。
 任何一个容器都可以指定为flex布局；
行内元素也可以使用flex布局。

	.box{display:inline-flex;}

Webkit内核的浏览器，必须加上-webkit前缀
 
	.box{ display:-webkit;/*Safari*/display:flex;}

设为flex布局后，子元素的float、clear、和vertical-align属性将失效。

### 基本概念：###
采用css3 flex布局的元素,称为flex容器，它的所有子元素自动称为容器成员，称为(flex item) 
容器默认存在两根轴:水平的主轴(main axis)和垂直的交叉轴(cross axis)。主轴的开始位置(与边框的交叉点)叫main start,结束位置叫做 main end；交叉抽的开始位置叫做cross start,结束位置叫做cross end;

### 容器的6个属性：###
1.	flex-directio: 

决定主轴的方向（即项目排列的方向）  

用法：.box{flex-direction:row|row-reverse|column|column-reverse}  

值：		row:默认值 水平从左向右  row-reverse:水平从右向左  column:竖直从上往下  column-reverse：竖直从下往上  

2.	flex-wrap:

默认情况下项目都排在一条（轴线）线上,flex-warp属性定义，如果一条轴线排不下，如何换行。  

用法：.box{flex- wrap:nowrap| wrap | wrap -reverse;}  

nowrap:默认不换行  wrap：换行，第一行在上  wrap -reverse：换行，第一行在下方  

3.	flex-flow:

flex-flow属性是flex-direction属性和flex- wrap属性的简写形式，默认值是row no wrap。  

用法.box{ flex-flow:<flex-direction> || <flex-wrap>} 

4.	justify-content:

定义了项目在主轴的对齐方式  

用法：.box{justify-content:flex-start | flex-end | center | space-between | space-around;}  
 
flex-start:左对齐 flex-end:右对齐 center:居中 space-between:两端对齐，项目之间的间隔都相等  space-around: 每个项目两侧的间隔相等，所以，项目之间的间隔比项目与边框的间隔大一倍  

5.	align-items:

定义项目在交叉上如何对齐  

用法： . box{align-items:flex-satrt |flex-end|center|baseline|stretch}  

它可能取5个值，具体的对齐方式与交叉轴的方向有关，下面假设交叉轴从上到下  

flex-start:交叉轴的起点对齐  

flex-end:交叉轴的终点对齐  

center:交叉轴中点对齐  

baseline:项目中第一行文字的基线对齐  

stretch（默认值）：如果项目未设置高度或者为auto，将占满整个容器的高度  

6.	align-content

定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。  

用法：.box{ align-content:flex-start 或 flex-end 或 center 或 space-between 或 space-around 或 stretch}  

flex-start:与交叉轴起点对齐  

flex-end:与交叉轴终点对齐  

center：与交叉轴中点对齐  

space-between:与交叉轴两端对齐，轴线之间的间隔平均分布  

space-around:每根轴线两侧的间隔都相等，所以，轴线之间的间隔与边框的间隔大一倍  
 
stretch(默认):轴线占满整个交叉轴  

### 项目的6个属性:###

1.	order:

定义项目的排列顺序，数值越小，排列越靠前，默认为0  

用法: . item{order:interger;}  

2.	flex-grow

定义项目的放大比例，默认为0，如果存在剩余空间，也不放大  

 用法 ：.item{ flex-grow:<number>/*default 0*/}  

3.	flex-shrink

定义了项目的缩小比例，默认为1，即如果控件不足，该项目将缩小  

用法：.item{ flex-shrink:number;/*default 1*/}  

4.	flex-basis

定义了在分配多余控件之前，项目占据的主轴控件(main size)
浏览器根据这个属性,计算主轴是否有多余控件,它的默认值是auto,即项目的本来大小.  

用法：.item{flex-basis:length 或 auto;/*default auto */}  

它可以设为跟width或height属性一样的值(比如350px)，则项目将占据固定控件  

5.	flex

属性是flex-grow,flex-shrink和flex-basis的简写，默认值为 0 1 auto;后两个属性可选  

用法： . item{ flex:none 或 flew-grow 或 flex-shrink 或 flex-basis’}  

该属性有两个快捷值： auto(1 1 auto)和none(0 0 auto)  

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值  

6.	align-self:

 允许单个项目与其他项目不一样的对齐方式，可覆盖align-items属性，默认值是auto，表示继承父类元素的align-items属性，如果没有父元素，则等同于stretch。  

用法:.item{align-self:auto 或 flex-start 或 flex-end 或 center 或 baseline 或 stretch}

	
	<!DOCTYPE html>
	<html>
	<head>
	<meta charset="utf-8"> 
	<title>flex Box</title> 
	<style> 
	.flex-container {
	    /*给容器设置布局为flex布局*/
	    display: -webkit-flex;/*Safari*/
	    display: flex;
	
	    /*1.flex-direction: 参数有row|row-reverse|column|column-reverse*/
	    /*flex-direction:row;*/
	
	    /*2.flex-wrap:参数有nowrap|wrap|wrap-reverse;*/
	    /*flex-wrap:wrap;*/
	
	    /*3.flex-flow是flex-direction和flex-wrap的集合*/
	    flex-flow:row wrap;
	
	    /*4.justify-content: 参数有 flex-start|flex-end|center|space-between|space-around*/
	    /*justify-content:space-around;*/
	
	    /*5.align-items：参数有 flex-start|flex-end|center|baseline|stretch*/
	    /*align-items:flex-end;*/
	
	    /*6.align-content:参数有 flex-start|flex-end|center|space-between|space-around|stretch;*/
	    align-content:space-around;
	
	    height:400px;
	    /*background-color: lightgrey;*/
	
	}
	
	.flex-item {
	    background-color: cornflowerblue;
	    width: 200px;
	    height: 100px;
	    margin: 5px;
	}
	
	.flex-item1{
	  order: 3;
	  flexs-shrink:0;
	}
	.flex-item3{
	  order: 4;
	  /*flex-grow:1.5;*/
	}
	.flex-item4{
	  /*flex-basis:600px;*/
	}
	.flex-item5{
	  /*flex属性是flex-grow,flex-shrink和flex-basis 的简写，默认值是0 1 auto 后两个属性可选*/
	  /*flex:0 1 auto;*/
	  flex:auto;  /*1 1 auto*/
	}
	.flex-item6{
	  /*align-self:参数有 auto(默认)|flex-start|flex-end|center|baseline|stretch|*/
	  /*align-self:center;*/
	}
	
	
	</style>
	</head>
	<body>
	
	<div class="flex-container">
	  <div class="flex-item flex-item1">flex item 1</div>
	  <div class="flex-item flex-item2">flex item 2</div>
	  <div class="flex-item flex-item3">flex item 3</div>    
	  <div class="flex-item flex-item4">flex item 4 </div>  
	  <div class="flex-item flex-item5">flex item 5 </div>  
	  <div class="flex-item flex-item6">flex item 6</div>
	
	</div>
	
	
	</body>
	</html>
	