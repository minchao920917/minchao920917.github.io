---
layout: post
title:  "浮动与清除浮动"
date:   2015-10-11 23:14:54
categories: CSS3
tags: CSS3
excerpt: 浮动的元素脱离标准流，不再区分块级元素和行内元素。能够让浮动的元素并排在一行显示，还可以设置宽高。由于会脱离文档流，会导致后面的元素受影响，如何清除浮动呢？
author:	闵超
---

* content
{:toc}
# 	浮动与清除浮动

##		浮动的性质


##		浮动的元素脱离标准流
	
浮动的元素脱离标准流，不再区分块级元素和行内元素。能够让浮动的元素并排在一行显示，还可以设置宽高。

	<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
	<title>Document</title>
	<style type="text/css">
		*{
			padding:0;
			margin:0;
		}
		div{
			float:left;
			width:200px;
			height:60px;
			background-color: pink;
		}
		span{
			float: left;
			width:200px;
			height:60px;
			background-color: lightblue;
		}
	</style>
	</head>
	<body>
		<div>div</div>
		<span>span</span>
	</body>



##		浮动的元素没有margin塌陷

	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
		<title>Document</title>
		<style type="text/css">
			*{
				padding:0;
				margin:0;
			}
			.box{
				width: 300px;
				height: 600px;
				border:1px solid #ddd;
			}
			.box .son1{
				width: 200px;
				height: 200px;
				background-color: lightblue;
				margin-bottom:50px;
				float: left;
			}
			.box .son2{
				float: left;
				width: 200px;
				height: 200px;
				background-color: pink;
				margin-top:80px;
			}
		</style>
	</head>
	<body>
		<div class="box">
			<div class="son1"></div>
			<div class="son2"></div>
		</div>
	</body>	

##		浮动的元素依次贴边
浮动的元素依次贴边，贴边有方向之分。
以左浮动为例：

1、	贴边顺序：父盒子内侧 ← 子盒子1 ← 子盒子2 ← 子盒子3 ← 子盒子4....

	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
		<title>Document</title>
		<style type="text/css">
			/*清除默认样式*/
			*{
				padding:0;
				margin:0;
			}
			.box{
				width: 500px;
				height: 300px;
				background-color: pink;
				border:1px solid #ddd;
			}
			.box div{
				float:left;
				width: 100px;
				height: 100px;
			}
			.box div.son1{
				background-color: blue;
			}
			.box div.son2{
				background-color: purple;
			}
			.box div.son3{
				background-color: yellowgreen;
			}
			.box div.son4{
				background-color: lightblue;
			}
		</style>
	</head>
	<body>
		<div class="box">
			<div class="son1">1</div>
			<div class="son2">2</div>
			<div class="son3">3</div>
			<div class="son4">4</div>
		</div>
	</body>

2、如果前一个盒子剩余的宽度不够，会再前一个贴边。

	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
		<title>Document</title>
		<style type="text/css">
			/*清除默认样式*/
			*{
				padding:0;
				margin:0;
			}
			.box{
				width: 500px;
				height: 300px;
				background-color: pink;
				border:1px solid #ddd;
			}
			.box div{
				float:left;
				width: 100px;
				height: 100px;
			}
			.box div.son1{
				height:200px;
				background-color: blue;
			}
			.box div.son2{
				width:200px;
				height:150px;
				background-color: purple;
			}
			.box div.son3{
				height:130px;
				background-color: yellowgreen;
			}
			.box div.son4{
				width:130px;
				height:50px;
				background-color: lightblue;
			}
		</style>
	</head>
	<body>
		<div class="box">
			<div class="son1">1</div>
			<div class="son2">2</div>
			<div class="son3">3</div>
			<div class="son4">4</div>
		</div>
	</body>

3、浮动的元素不会钻盒子：
	
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
		<title>Document</title>
		<style type="text/css">
			/*清除默认样式*/
			*{
				padding:0;
				margin:0;
			}
			.box{
				width: 500px;
				height: 300px;
				background-color: pink;
				border:1px solid #ddd;
			}
			.box div{
				float:left;
				width: 100px;
				height: 100px;
			}
			.box div.son1{
				height:230px;
				background-color: blue;
			}
			.box div.son2{
				background-color: purple;
			}
			.box div.son3{
				height:190px;
				width:290px;
				background-color: yellowgreen;
			}
			.box div.son4{
				width:60px;
				height:100px;
				background-color: lightblue;
			}
		</style>
	</head>
	<body>
		<div class="box">
			<div class="son1">1</div>
			<div class="son2">2</div>
			<div class="son3">3</div>
			<div class="son4">4</div>
		</div>
	</body>

4、浮动的元素让出标准流的位置

	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
		<title>Document</title>
		<style type="text/css">
			*{
				padding:0;
				margin:0;
			}
			.box1{
				float:left;
				width:100px;
				height:100px;
				background-color: pink;
			}
			.box2{
				width: 200px;
				height: 200px;
				background-color: lightblue;
			}
		</style>
	</head>
	<body>
		<div class="box1">1</div>
		<div class="box2">2</div>
	</body>

##		浮动的影响（浮动存在的问题）

1.	浮动的元素不能撑高父盒子。
2.	浮动的元素会影响后面浮动的元素。

浮动的影响，导致box1和box2没有被撑起，且box2的元素位置错乱

	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
		<title>Document</title>
		<style type="text/css">
			*{
				padding:0;
				margin:0;
			}
			.box1,.box2{
				width:700px;
				border:5px solid #ddd;
				margin-bottom:10px;
			}
			.box1 p,.box2 p{
				float: left;
				width:100px;
				height:100px;
				background-color: lightblue;
				margin-right:10px;
			}
		</style>
	</head>
	<body>
		<div class="box1">
			<p>1</p>
			<p>2</p>
			<p>3</p>
			<p>4</p>
		</div>
		<div class="box2">
			<p>5</p>
			<p>6</p>
			<p>7</p>
		</div>
	</body>

##		清除浮动的方法

1.	给父盒子直接加高度

	解决：对后面浮动元素的影响；margin有距离。没解决：高度自适应。

2.	加clear属性

		clear:清除；
			属性值：left（清除左浮动元素的影响）
			right（清除右浮动元素的影响）
			both(清除左右浮动元素的影响)。

	解决：浮动元素对后面浮动元素的影响。

	没解决：高度自适应；margin距离

3.	隔墙法

	3.1  外墙法	
	
	给俩个大盒子之间加一堵清除了浮动，有高度的墙。

	解决：浮动元素对后面浮动元素的影响；视觉有了距离；
	
	没解决：高度自适应


	3.2	 内墙法

	在两个大盒子的最底部加一堵清除了浮动的墙。

	解决：都解决了。

	虽然内墙法解决了我们所有问题，但是增加了很多无意义的标签。影响代码加载速度以及可读性。

4.	overflow法

	给父盒子加overflow:hidden;


overflow：hidden作用

1.	强制我们父盒子去检测里面的子盒子的高度，让父盒子的高度等于子盒子的高度。（以后只要看到让盒子高度自适应，就加overflow:hidden）
2.	强制我们父盒子去检测他里面浮动的子盒子，管住他里面浮动的元素不让他去影响别人。
（overflow：hidden;是我们解决浮动存在的问题的最好也是最简单的办法）

实际工作中：

我们使用overflow：hidden;解决浮动存在的问题；

可以在几个大的板块之间加一堵墙；
