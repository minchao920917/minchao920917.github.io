---
layout: post
title:  "微信小程序框架——视图层"
date:   2018-01-02 23:33:54
categories: 微信小程序
tags: 微信小程序
excerpt:	上一期学习了微信小程序开发的框架——配置和逻辑，下面来学习一下微信小程序的视图层。开发Web网页时，我们用HTML构建页面结构，用CSS描述展现样式。与此类似，小程序也提供自己的视图层描述语言WXML和WXSS。
mathjax: true
author:	闵超
---

* content
{:toc}

##		微信小程序框架——视图层

开发Web网页时，我们用HTML构建页面结构，用CSS描述展现样式。与此类似，小程序也提供自己的视图层描述语言WXML和WXSS。

###		样式文件 WXSS

WXSS实现了CSS的大部分特性，因此前端开发者可以很方便地进行开发。

1.	app.wxss和每个page的wxss的覆盖关系，如果有同名rule，page会覆盖app的样式，而CSS中，只是合并
2.	支持after、before伪类，但不支持first-child、last-child、nth-child伪类
3.	定义在app.wxss中的样式为全局样式，作用于每一个页面，page.wxss为局部样式，只作用于对应的页面
4.	WXSS不支持{ { } }嵌套，所以key-frames、CSS animation不可用，transition可用
5.	WXSS不能使用本地资源。例如，设置元素的background-image属性时，可以使用网络图片、base64或<image/>标签
6.	WXSS的rule不支持级联，如.class1 p
7.	不支持引入字体


####		WXSS的三种引入方式

WXSS有三种引入方式

-	默认方式：默认的样式文件是[页面名].wxxs，页面特有的样式都可以写在该文件里
-	样式导入：使用@import语句可以导入外联样式表
-	内联样式：使用style、css属性控制组件的样式

####		尺寸单位

微信对尺寸单位做了一些扩展特性，即引用rpx(responsive pixel)。其实微信还是支持rem(root em)、百分比、像素等尺寸单位。

-   尺寸单位列表：
    <table border="1">
        <tr>
            <th>单位</th>
            <th>描述</th>
            <th>示例</th>
            <th>是否支持</th>
        </tr>
        <tr>
            <th>%</th>
            <th>百分比</th>
            <th>width:50%;</th>
            <th>是</th>
        </tr>
        <tr>
            <th>px</th>
            <th>像素(图片或视频显示的基本单位，通俗的说法是屏幕上的一个点)</th>
            <th>width:187.5rpx</th>
            <th>是</th>
        </tr>
        <tr>
            <th>em</th>
            <th>1em等于当前字体尺寸2em等于当前字体的两倍</th>
            <th>width：10em</th>
            <th>是</th>
        </tr>
        <tr>
            <th>rpx</th>
            <th>可以根据屏幕宽度进行自适应，规定屏幕宽度为750rpx</th>
            <th>width：375rpx</th>
            <th>是</th>
        </tr>
        <tr>
            <th>rem</th>
            <th>固定屏幕宽度为20rem；1rem=(750/20)rpx</th>
            <th>width：10rem</th>
            <th>是</th>
        </tr>
        <tr>
            <th>in,cm,mm</th>
            <th>英寸、厘米、毫米</th>
            <th>width：10in，width:10cm;width:10mm;/th>
            <th>否</th>
        </tr>
        <tr>
            <th>ex</th>
            <th>一个ex是一个字体的x-height，通常是字体尺寸的一半</th>
            <th>width：10ex</th>
            <th>否</th>
        </tr>
        <tr>
            <th>pt</th>
            <th>磅(1pt等于1/72英寸)</th>
            <th>width：10pt</th>
            <th>否</th>
        </tr>
    </table>

####	选择器
-   选择器
    <table border="1">
        <tr>
            <th>选择器</th>
            <th>例子</th>
            <th>描述</th>
        </tr>
        <tr>
            <th>.class</th>
            <th>.intro</th>
            <th>选择所有拥有class='intro'的组件</th>
        </tr>
        <tr>
            <th>#id</th>
            <th>#intro</th>
            <th>选择拥有id='intro'的组件</th>
        </tr>
        <tr>
            <th>element</th>
            <th>view</th>
            <th>选择所有view组件</th>
        </tr>
        <tr>
            <th>element,element</th>
            <th>View,checkbox</th>
            <th>选择所有文档的view组件和所有的checkbox组件</th>
        </tr>
        <tr>
            <th>::after,::before</th>
            <th>view::after,view::before</th>
            <th>在view组件后面插入内容，在view组件前面插入内容</th>
        </tr>
    </table>

###		WXML标签语言

wxml是微信框架设计的一套标签语言，结合基础组件，事件系统可以构建出页面结构：

####	基础组件

	<!-- pages/test/test.wxml -->
		<view class='container'>
		
		  <!-- 简单的绑定 -->
		  <view >{ {message}}</view>
		
		  <!-- 组件属性 -->
		  <view id="item_{ {id}}" >组件属性</view>
		
		  <!--控制属性-->
		  <view wx:if="{ {condition_yes}}">能看到</view>
		  <view wx:if="{ {condition_no}}">能看到</view>
		
		  <!-- 三元运算 -->
		  <view hidden="{ {flag_hidden?true:false}}">Hidden</view>
		  <view hidden="{ {!flag_hidden?true:false}}">show</view>
		
		  <!-- 算数运算 -->
		  <view>{ {a+b}} + { {c}} +d</view>
		
		  <!--逻辑判断于wx:if条件渲染 -->
		  <view wx:if='{ {length>5}}'>lenght > 5</view>
		
		  <!--block wx:if 条件渲染 -->
		  <block wx:if='{ {block}}'>
		    <view>Block view 1</view>
		    <view>Block view 2</view>
		  </block>
		
		  <!-- 字符串运算 -->
		  <view>{ { "Message: " + message}}</view>
		
		  <!-- 组合：数组与wx:for列表渲染 -->
		  <view wx:for="{ {[zero,1,2,3,4]}}">
		    { {item}}
		  </view>
		
		  <!-- block wx:for列表渲染 -->
		  <block wx:for="{ {['一','二','三','四']} }">
		    <view>NO.{{index}}</view>
		    <view>{{item}}</view>
		  </block>
		
		</view>
知道vue或者ng或者react的可能一眼就能看出和v-if,v-for,ng-if,ng-for是类似的模板。

####		WXML模板与引用

在程序中，经常会用到模板片段，需要在不同的地方调用，于是，引入了模板的概念

	 <!-- include header -->
	  <include s rc='header.wxml'/>
	
	  <!-- import -->
	  <i mport s cr='odd_template.wxml'/>
	  <i mport s cr='even_template.wxml'/>
	
	  < block wx:for='{ {[1,2,3,4,5]}}'>
	    < template is="{{ item % 2 === 0 ? 'even':'odd' }}" data="{ {num:item }}" />
	  </block>
	
	  < include s rc='footer.wxml'/>

odd_template.wxml
	
	< template name='odd'>
	    <view>
	      odd:{ {num}}
	    </view>
	</template>

import 可以在文件中使用目标定义的Template仅仅是使用，不会把代码拷贝到import的位置

include可以将目标文件除了<template/>的整个代码引入，相当于复制到include的位置


#### WXML事件绑定
	
在页面的js中添加事件监听
-   事件监听
    <table border="1">
        <tr>
            <th>类型</th>
            <th>触发条件</th>
        </tr>
        <tr>
            <th>touchstart</th>
            <th>手指触摸</th>
        </tr>
        <tr>
            <th>touchmove</th>
            <th>手指触摸后移动</th>
        </tr>
        <tr>
            <th>touchcancel</th>
            <th>手指触摸动作被打断，如来电提醒、弹窗</th>
        </tr>
        <tr>
            <th>touchend</th>
            <th>手指触摸动作结束</th>
        </tr>
        <tr>
            <th>tap</th>
            <th>手指触摸后离开</th>
        </tr>
        <tr>
            <th>longtap</th>
            <th>手指触摸后，超过350ms再离开</th>
        </tr>
    </table>

事件绑定的写法同组件的属性，以key、value的形式绑定。

key以bind或catch开头，然后跟上事件的类型，如bindtap、catchtouchstart。所有的事件都是加上bind或catch

value是一个字符串，需要再对应的Page中定义同名的函数，不然当触发事件时会报错。

总结：
到这里，我们应该知道了WXSS和WXML的相关知识，小程序的数据绑定、渲染、模板和引用以及事件绑定，其实都是和vue、ng等js框架是类似的。

