---
layout: post
title:  "js面向对象——原型"
date:   2018-10-22 23:00:54
categories: JavaScript
tags:   JavaScript
excerpt:    去改写对象下面公用的方法和熟悉，作用就是让公用的方法或者属性在内存中存在一分，好处就是（提高性能）
mathjax: true
author: 闵超
---
* content
{:toc}

##      js面向对象——原型

原型：去改写对象下面公用的方法和熟悉，作用就是让公用的方法或者属性在内存中存在一分，好处就是（提高性能）

类比:

原型：CSS中的class
普通方法：CSS中的style

普通方法写法：

    var arr = [1,2,3,4,5];
    arr.sum = function(){
        var result = 0;
        for(var i =0;i<arr.length;i++){
            result += this[i];
        }
        return result;
    }
    alert("和" + arr.sum())
    
原型写法:prototype:要卸载构造函数的下面

    var arr = [1,2,3,4,5];
    Array.prototype.sum = function{
        var result = 0;
        for(var i =0;i<arr.length;i++){
            result += this[i];
        }
        return result;
    }
    alert(arr.sum())
    
面向对象写法：利用混合的写法，公用的卸载原型下面，变化的卸载构造函数里

    function 构造函数(){
        对象.属性
    }
    构造函数.原型.方法 = function(){};
    
    var 对象1 = new 构造函数();
    对象1.方法();