---
layout: post
title:  "CSS3的过渡和动画比较"
date:   2015-06-20 15:14:54
categories: CSS3
tags:	CSS3
excerpt: 深入理解CSS3的过渡特效和animation特效
mathjax: true
author:	闵超
---

* content
{:toc}

## 	CSS3的过渡和动画
	
CSS3的精彩之处(不，整个前端精彩之处)就在于它的CSS动画效果，当然牛皮吹的有点过了，前端的动画实现方式还有JavaScript动画，和Flash动画，当然这些技术都是可以穿插使用，主要的动画展现方式有CSS动画和js动画两种。而这里，CSS的动画包括Transition和Animation两个部分，话不多说,让我们开始吧。

##	CSS3的过渡 -transition

###		什么是CSS过渡
CSS有一个属性叫transition，它叫做过渡属性。它允许CSS元素的值在一定的时间区间内实现平滑的过渡。
意思是说，这个属性可以控制元素的属性从一个样式到另外一个样式。

正因为如此，我们可以在不使用Flash动画或者JavaScript动画的情况下，实现元素从一个样式到另一个样式的过渡效果。

这种效果可以在鼠标hover、获取焦点、被点击或者对元素任何改变中触发。并圆滑地以动画效果来改变CSS属性值。下面我们来讨论一下

###		CSS过渡的语法

transition 属性主要包含四个属性值：

transition-property -- 规定应用过渡的 CSS 属性的名称；

transition-duration -- 定义过渡效果花费的时间，默认是 0；

transition-timing-function -- 规定过渡效果的时间曲线。默认是 "ease"；

transition-delay -- 规定过渡效果何时开始，默认是 0。

transition -- 简写属性，用于在一个属性中设置四个过渡属性。

如需向多个样式添加过渡效果，请添加多个属性，由逗号隔开。

### 	transition的例子

CSS部分
	
	<style> 
	div {

    width: 100px;
    height: 100px;
    background: red;
	-webkit-transition: width 2s ease, height 2s ease, -webkit-transform 2s ease; 
    transition: width 2s ease-in-out, height 2s ease-in-out, transform 2s ease-in-out;
	
	}
	div:hover {

    width: 200px;
    height: 200px;
	-webkit-transform: rotate(360deg); 
    transform: rotate(360deg);
	
	}
	</style>

HTML部分

	<div>鼠标移动到 div 元素上，查看过渡效果。</div>

###		transition的优点

transition的优点在于简单易用，但是它有几个很大的局限。 

（1）transition需要事件触发，所以没法在网页加载时自动发生。
 
（2）transition是一次性的，不能重复发生，除非一再触发。 

（3）transition只能定义开始状态和结束状态，不能定义中间状态，也就是说只有两个状态。 

（4）一条transition规则，只能定义一个属性的变化，不能涉及多个属性。 


##	CSS3的动画 -animation

单纯的代码不会触发任何过渡操作，需要通过用户的行为（如点击，悬浮等）触发，可触发的方式有： 
:hoever :focus :checked 媒体查询触发 JavaScript触发

### 什么是CSS动画-animation

CSS Animation就是为了解决transition的局限性而提出的。

CSS3的animation属性可以像Flash制作动画一样，通过控制关键帧来控制动画的每一步，实现更为复杂的动画效果。ainimation实现动画效果主要由两部分组成：

1）通过类似Flash动画中的帧来声明一个动画； 

2）在animation属性中调用关键帧声明的动画。

### CSS动画的属性

1.	属性: animation-name

	描述：用来指定关键帧动画的名字,name为默认值

2.	属性:animation-duration
	
	描述:用于指定动画所需要的时间，一般以秒为单位,默认值为0,没有动画

3.	属性:animation-timing-function
	
	描述:设置动画的播放方式

4.	属性:animation-delay

	描述:在开始执行动画时需要等待的时间 

5.	属性:animation-iteration-count

	描述：定义动画的播放次数，默认为1，如果为infinite，则无限次循环播放 

6.	属性:animation-direction

	描述：默认为nomal，每次循环都是向前播放，（0-100），另一个值为alternate，动画播放为偶数次则向前播放，如果为基数词就反方向播放 

7.	属性:animation-state

	描述：默认为running，播放，paused，暂停
 
8.	属性:animation-fill-mode

	描述：定义动画开始之前和结束之后发生的操作，默认值为none，动画结束时回到动画没开始时的状态；forwards，动画结束后继续应用最后关键帧的位置，即保存在结束状态；backwards，让动画回到第一帧的状态；both：轮流应用forwards和backwards规则。

### 	css动画的例子

css部分

	<style>
	/*申明动画帧*/
	@-webkit-keyframes cricle {
	    0%{
	        top:0;
	       left:0;
	        background:red;
	    }
	    25%{
	       left:200px;
	        top:0;
	        background: #000;
	    }
	    50%{
	        top:200px; left:200px;
	        background: blue;
	    }
	    75%{
	        top:200px; left:0;
	        background: yellow;
	    }
	    100%{
	      left:0px;
	      top:0px;
	      background: red;
	    }
	}
	@keyframes cricle {
	    0%{
	        top:0;
	       left:0;
	        background:red;
	    }
	    25%{
	       left:200px;
	        top:0;
	        background: #000;
	    }
	    50%{
	        top:200px; left:200px;
	        background: blue;
	    }
	    75%{
	        top:200px; left:0;
	        background: yellow;
	    }
	    100%{
	      left:0px;
	      top:0px;
	      background: red;
	    }
	}
	/*直来直回动画帧*/
	@webkit-keyframes straight{
	    0%{
	        left:0;
	        background: #000;
	    }
	    25%{
	        left: 400px;
	        background: yellow;
	    }
	    50%{
	        left: 800px;
	        background: #000;
	    }
	    75%{
	        left: 400px;
	        background: red;
	    }
	    100%{
	        left: 0;
	        background: #000;
	    }
	}
	@keyframes straight{
	    0%{
	        left:0;
	        background: #000;
	    }
	    25%{
	        left: 400px;
	        background: yellow;
	    }
	    50%{
	        left: 800px;
	        background: #000;
	    }
	    75%{
	        left: 400px;
	        background: red;
	    }
	    100%{
	        left: 0;
	        background: #000;
	    }
	}
	
	.box{width:100px;height:100px;
	    background: red;
	    position:relative;
	    /*动画*/
		/*指定动画的名字 straight  cricle*/
	    -webkit-animation-name:cricle;
	            animation-name:cricle;
		/*指定动画时长*/
	    -webkit-animation-duration:5s;
	            animation-duration:5s;
	    /*动画播放方式 linear ease ease-in  ease-out ease-in-out  cubic-bezier(n,n,n,n) steps(n,start) */
	    -webkit-animation-timing-function:steps(5,start); 
	            animation-timing-function:steps(5,start);
		/*指定动画开始时间以秒为单位*/
	    -webkit-animation-delay:1s;
	            animation-delay:1s;
	    /*指定动画播放的循环次数  infinite 无限循环*/
	    -webkit-animation-iteration-count:infinite;
	            animation-iteration-count:infinite;
	    /*控制动画的播放方向 normal 默认正常播放 reverse动画方向播放 alternate奇数正偶反 alternate-reverse 奇反偶正*/        
	    -webkit-animation-direction:reverse;
	            animation-direction:reverse;
	    /*设置动画播放的状态，暂停还是播放  paused  running */        
	    -webkit-animation-palay-state:running;
	            animation-palay-state:running;
	    /*设置动画时间外属性 none默认值 动画在执行*/        
	    -webkit-animation-fill-mode:both;
	            animation-fill-mode:both;
        /*设置动画时间外属性 none默认值 动画在执行之前和之后不会有任何样式到目标元素
            forwards 在动画结束之后，动画将应用该属性值
            backwards 动画将应用子啊animatio-delay定义期间启动动画的第一次迭代的关键帧中定义的属性值
            both 动画遵循forward和backwards的规则，也就是说，动画会在两个方向上扩展动画属性
        */
	  -webkit-animation: straight 5s ease-out 2s infinite reverse backwards;
	            animation: straight 5s ease-out 2s infinite reverse backwards;
	
	}
	
	</style>

HTML部分

 	<div id="box" class="box">    
    </div>
    <input id="btn" type="button" onclick="pasused()" 
	style="position:relative;left:600px;top400px;" value="暂停" >

JS部分

	<script type="text/javascript">
	
	function pasused(){
	    var box = document.getElementById("box");
	    var btn = document.getElementById("btn");
	    if(btn.value=="暂停"){
	        box.style.animationPlayState="paused";
	        btn.value="开始";
	    }else{
	        box.style.animationPlayState="running";
	        btn.value="暂停";
	    }
	}
	</script>

说明,这里我定义了两个动画帧 straight  和 cricle，并且应用了不同的属性进行了测试和观察，最后，顺便写了js来控制动画的播放。

### 总结
 animation属性类似于transition，他们都是随着时间改变元素的属性值，其主要区别在于：

1.	transition需要触发一个事件才会随着时间改变其CSS属性；animation在不需要触发任何事件的情况下，也可以显式的随时间变化来改变元素CSS属性，达到一种动画的效果 。

2.	transition是面向结果的，animition是面向过程的。transition一经触发，会过渡到结果，而动画，已经触发，展示了一个过程的动态变化，过程中可以暂停也可以开始。
