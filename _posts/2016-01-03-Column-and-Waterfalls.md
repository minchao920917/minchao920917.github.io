---
layout: post
title:  "多列和瀑布流总结"
date:   2016-01-03 15:14:54
categories: CSS3
tags: CSS3
excerpt: CSS3中出现了新的多列布局(multi-column)是传统HTML网页中块状布局模式的有力扩充。简单的瀑布流可以由多列生成
author:	闵超
---

* content
{:toc}


##	多列与瀑布流

###	什么叫多列

CSS3中出现了新的多列布局(multi-column)是传统HTML网页中块状布局模式的有力扩充。这种语法能够让WEB开发人员轻松的让文本呈现多列显示。我们知道，当一行文字太长时，读者读起来比较费劲。视点从文本的一端移到另一端、然后换到下一行的行首，如果眼球移动浮动过大，他们的注意力就会减退，容易读不下去。所以，为了最大效率的使用大屏幕显示器，页面设计中需要限制文本的宽度，让文本按多列呈现，就像报纸上的新闻排版一样。

###	多列(columns)的用法

多列的属性有下面几种:

1.	指定多少列

		column-count:3;
		-moz-column-count:3; /* Firefox */
		-webkit-column-count:3; /* Safari and Chrome */

	
2.	指定列与列之间的间隔

		column-gap: 100px;
		-moz-column-gap: 100px; /* Firefox */
		-webkit-column-gap: 100px; /* Chrome, Safari, Opera */
    
3.	列边框操作

	    -webkit-column-rule-style: solid; /* Chrome, Safari, Opera */
	    -moz-column-rule-style: solid; /* Firefox */
	    column-rule-style: solid;
	
	    -webkit-column-rule-width: 1px; /* Chrome, Safari, Opera */
	    -moz-column-rule-width: 1px; /* Firefox */
	    column-rule-width: 1px;
	   
		-webkit-column-rule-color: lightblue; /* Chrome, Safari, Opera */
	    -moz-column-rule-color: lightblue; /* Firefox */
	    column-rule-color: lightblue;

		 /*合在一起写法*/
		 -webkit-column-rule: 1px solid lightblue; 
		 -moz-column-rule: 1px solid lightblue; 
		 column-rule: 1px solid lightblue;

4.	指定列的宽度

		-webkit-column-width: 100px; /* Chrome, Safari, Opera */
     	column-width: 100px;

5.	指定元素横跨多少列

		column-span:all;
		-webkit-column-span:all; /* Safari and Chrome */

###	总结

CSS3的多列布局(columns)是一种方便WEB开发者高效利用宽屏显示器的非常有用的功能特征。你会发现在很多地方都需要用到它们，特别是需要自动平衡列高度的地方(如报纸，杂志排版时)。


###	demo
	<style> 
	.newspaper
	{
		/*/指定多少列*/
		column-count:3;
		-moz-column-count:3; /* Firefox */
		-webkit-column-count:3; /* Safari and Chrome */
		/*指定列与列之间的间隔*/
		-webkit-column-gap: 100px; /* Chrome, Safari, Opera */
	    -moz-column-gap: 100px; /* Firefox */
	    column-gap: 100px;
	   
	 	-webkit-column-rule: 1px solid lightblue; 
	    -moz-column-rule: 1px solid lightblue; 
	    column-rule: 1px solid lightblue;
	
	    /*指定列的宽度*/
	     -webkit-column-width: 100px; /* Chrome, Safari, Opera */
	     column-width: 100px;
	}
	h2
	{ 
		/*指定元素横跨多少列*/
		column-span:all;
		-webkit-column-span:all; /* Safari and Chrome */
	}
	</style>

	<div class="newspaper">
	<h2>报纸的多列布局11111111111111111111111111111111111111111111111</h2>
	当我年轻的时候，我梦想改变这个世界；当我成熟以后，我发现我不能够改变这个世界，我将目光缩短了些，决定只改变我的国家；当我进入暮年以后，我发现我不能够改变我们的国家，我的最后愿望仅仅是改变一下我的家庭，但是，这也不可能。当我现在躺在床上，行将就木时，我突然意识到：如果一开始我仅仅去改变我自己，然后，我可能改变我的家庭；在家人的帮助和鼓励下，我可能为国家做一些事情；然后，谁知道呢?我甚至可能改变这个世界。
	</div>


## 瀑布流

###	什么是瀑布流
	
参差不齐的多列布局就是瀑布流。像淘宝商品的展示，似乎一夜之间出现在国内外大大小小的网站上，这种布局适合小数据块，每个数据块的内容相近且没有侧重。通常，随着页面滚动条向下滚动，这种布局还会不断加载数据块并附加至当前尾部，就像瀑布一样不会断开。所以，我们给这样的布局起了这个形象的名字，——瀑布流布局	

###	如何实现瀑布流

####	1.	传统浮动，各列固定宽度，并且左浮动
	
		<style>
		.wrap{
			width:100%;
		}
		.box{
			width:30%;
			float: left;
			padding: 10px;
		}
		</style>
		<div class="wrap">
			<div class="box">...</div>	
			<div class="box">...</div>	
			<div class="box">...</div>
		</div>

特点：布局简单，不用明确数据块的高度，当数据块中有图片时，也不需要指定图片的高度

缺点:
列数固定，扩展不易，当浏览器窗口大小变化时，只能固定列数。

如果要添加一列很难调整数据块的排列

当滚动加载数据时，还要指定插入第几列中，不是很方便。


####		2.	CSS3定义多列实现方式

	指定容器的列数

		.container {
			-webkit-column-count: 5；
			/*-webkit-column-gap: 20px；*/
			-webkit-column-rule: 5px solid #333；
			-webkit-column-width: 20%；

			-moz-column-count: 5；
			/*-moz-column-gap: 20px；*/
			-moz-column-rule: 5px solid #333；
			-moz-column-width: 20%；

			column-count: 5；
			/*column-gap: 20px；*/
			column-rule: 5px solid #333；
			column-width: 20%；
		}

优点：方便，直接定义css样式，扩展方便，直接往容器里面添加内容即可

缺点：


- 当他的数据块排列是从上到下排列到一定高度后，会把剩余元素一次排列到下一列。


- 只有高级浏览器能用,更适合文字的多栏排列

####	3.	绝对定位，通过js排版
	

- 	设置父级container样式：水平居中

-	设置每个块框box的样式：绝对定位

-	设置窗口滚动事件的监听函数：读取数据添加块框

			<style>
				#container {
					margin:100px auto;/* 居中 */  
					position:relative;
				}
				#container .box{
					position:absolute;
				}
			</style>

			<div id="container">
				<div class="box">
					<div class="info">
						<div class="pic"><img src="images/1.jpg"></div>
						<div class="title"><a href=""></a></div>
					</div>
				</div>
			</div>

			<script>
					...
			</script>



另外：还有封装好的js插件可供选择

1.	masonry.pkgd.min.js

	引入js后，js调用

		$('#container').masonry({  
		    itemSelector: '.item',  
		    isAnimated: true,  
		    // columnWidth: 450,       
		    isFitWidth: true     // 自适应宽度  
		  });  
	
2.	jaliswall.js
	
	引入js后，调用

	 	$('.Pbl-wrap').jaliswall({ item: '.Pbl-item' });
	
本文中详细demo请见demo部分的瀑布流部分

