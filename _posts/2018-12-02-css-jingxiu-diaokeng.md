---
layout: post
title:  "CSS精修——高手也掉坑"
date:   2018-12-02 23:00:54
categories: CSS3
tags:   CSS3
excerpt:    CSS精修——高手也掉坑
mathjax: true
author: 闵超
---
* content
{:toc}

#       CSS精修——高手也掉坑

##      浮动 BFC详解

    横向布局：
    
        inline-block
        问题:代码换行会解析空格
        
        line-box
        浮动元素脱离文档流（当给一个元素设置浮动了之后，它不会再占用页面当中的“位置”了）
        造成的影响：不会撑开父级的高度
        
        清楚浮动:(清楚浮动造成的影响父级元素塌陷)
        1、给浮动元素的父级加高度
            扩展性不好，在不能确定父级高度的情况下不能使用
        2、clear:both; （用的最多的方法）
            
            zoom:1;用来触发 hasLayout（IE浏览器的BFC）
            
            .clear{
                *zoom: 1; //兼容IE67
            }
            .clear:after{
                content:' ';
                display:block;
                clear:both;
            }
        3、BFC 块级格式化上下文 (Block Fromatting Context) 
        
        一套渲染机制，触发一个元素的BFC，
        相当于在这个元素里面建立起一堵围墙，
        围墙里面的内容和围墙外面的内容不会产生干扰
        
        overflow:hidden;
        
        触发BFC的方法：
        -   body 根元素
        -   浮动元素：float 除 none 以外的值
        -   绝对定位元素：position (absolute、fixed) 不为static
        -   display 为 inline-block、table-cells、flex
        -   overflow 除了 visible 以外的值 (hidden、auto、scroll)