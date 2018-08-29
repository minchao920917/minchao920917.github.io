---
layout: post
title:  "闭包理解"
date:   2018-05-20 23:06:05
categories: JavaScript
tags: JavaScript
excerpt: 对于新手来说，闭包的概念往往有些难懂，书上的描写也很简短。然后，随着对js的理解深入，会发现讨论闭包作用的越来越多，到最后，会觉得越看越晕。越来越搞不懂闭包了，所以这里将自己对闭包的浅显的理解记录下来。   　　
mathjax: true
author:	闵超
---

* content
{:toc}



对于新手来说，闭包的概念往往有些难懂，书上的描写也很简短。然后，随着对js的理解深入，会发现讨论闭包作用的越来越多，到最后，会觉得越看越晕。越来越搞不懂闭包了，所以这里将自己对闭包的浅显的理解记录下来。

###     什么是闭包

闭包是指有权限地访问另一个函数作用域中的变量函数。-《JavaScript高级程序设计》

意思就是说有一个函数fun2，它可以访问在其他函数比如fun1中的局部变量，那fun2就是闭包。

通常情况下，创建闭包的简单方式，就是在函数内部创建另一个函数。

    function fun1(){
        var a = 0;
        function fun2(){//fun2就是一个闭包
            console.log(a);
        }
        fun2();
    }
    
###     闭包的使用和注意事项

1.  在函数外调用闭包的方法，逃离方式

-   将内部函数指定给一个全局变量

    
    var globalVar;
    function outer(){
        console.log('outer');
        function inner(){
            console.log('inner');
        }
        globalVar = inner;
    }
    
    outer();//outer
    globalVar();//inner

inner（）通过全局变量的引用成功逃离，现在可以在全局中调用，而且可以引用outer（）的变量

-   通过返回值来'营救'内部函数


    function outer(){
        console.log('outer');
        function inner(){
            console.log('inner');
        }
        return inner;
    }
    var fn = outer();//outer
    fn();//inner
    
inner（）通过返回值成功逃离，现在可以在全局中调用，而且可以引用outer（）的变量

2.  在函数外调用闭包的影响：增加内存占用

正常的情况下是函数调用结束之后函数的执行环境离开环境栈，定义的变量废弃（废弃与垃圾收集机制有关），活动变量（变量对象）会被销毁，内存释放。但是现在因为闭包的作用域链包含了外部函数的变量对象，外部函数的变量有可能再被引用，垃圾收集机制不会将外部函数的变量废弃，在内存保留的外部函数的变量对象。这样就加大了对内存的占用。

3.  闭包与变量的关系：常见的误区和解决技巧

闭包保存的是函数的整个变量对象，所取得的外部对象变量为闭包被调用时刻的对象变量，一般为外部函数变量的最后一个值。

    
    function createFun(){
        var result = [];
        for(var i = 0;i< 10;i++){
            result[i] = function(){
                return i;
            };
        }
        return result;
    }
    var result = createFun();
    console.log(result[5]());
    
这里外部函数的返回值为一个数组，数组值为不同函数（闭包）的引用，我们会误认为每个闭包的调用的返回值不同，但实际上每个函数都会返回一样的值。因为当闭包调用时，调用闭包的外部函数已经执行完毕，此时外部函数的变量对象中的 i = 10，而我们闭包的返回值为i，闭包会获取调用时的外部变量对象，此时的i为10。

正确用法：



    function createFun(){
        var result = [];
        for(var i=0;i<10;i++){
            result[i] = function(num){
                return function(){
                    return num;
                };
            }(i)
        }
        return result;
    }
    var result = createFun();
    console.log(result[5]());//5


　这里外部函数的返回值为一个数组，数组值为不同函数（闭包）的引用,在循环中，我们定义了一个匿名数组，并将立即执行该匿名函数的结果赋给数组，这里的匿名函数有一个参数num，每次将i作为参数传递给num，每次循环num都会得到不同的值，所以每次返回了不同的函数（区别在于num值不同），当在外部调用数组值时，会返回不同的值，与我们需要的相符。
　
4.  闭包中的this值
首先，关于函数中的this指向，我们应该知道this指向该函数的对象，若无明确调用对象则指向window对象。

在闭包中最容易弄错this的指向。

    var name ="window";
    var o = {
        name:'object',
        getName:function(){
            return function(){
                return this.name;
            };
        }
    }
    console.log(o.getName()());//window
    
闭包的this指向了全局对象，为什么呢？可以吧o.getName()()写成(o.getName())(),这个表达式相当于第一步执行了o.getName()，这个函数返回了一个匿名函数(闭包)，然后在全局下执行了这个闭包，并不是通过对象o调用，所以this指向了全局对象。


当然使用闭包也有很多优点，如：使用匿名函数模仿块级作用域，定义访问私有变量的特权方法，避免全局变量污染等，大家可以自行研究。


函数带()才是执行函数！ 单纯的一句 var f = function() { alert('Hi'); }; 是不会弹窗的，后面接一句 f(); 才会执行函数内部的代码。


闭包就是一个函数引用另外一个函数的变量，因为变量被引用着所以不会被回收，因此可以用来封装一个私有变量。这是优点也是缺点，不必要的闭包只会徒增内存消耗！另外使用闭包也要注意变量的值是否符合你的要求，因为他就像一个静态私有变量一样。闭包通常会跟很多东西混搭起来，接触多了才能加深理解，这里只是开个头说说基础性的东西。

保持谦卑，你会走的更远！