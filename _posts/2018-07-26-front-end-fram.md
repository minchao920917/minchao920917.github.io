---
layout: post
title:  " 现代前端交互框架"
date:   2018-07-26 23:06:05
categories: 前端知识
tags: 前端知识
excerpt: Web前端页面的开发避免不了与DOM的交互操作。自前端技术出现后，页面的结构越来越复杂，用户的操作交互越来越多，对应的DOM交互也越来越频繁。为了提高开发效率，我们常常借助DOM交互框架来简化页面的开发工作。经过Web前端这些年的发展，用于DOM交互的框架越来越多，设计思路也不尽相同。总结来说，前端框架一次次变化，从提升效率的阶段，慢慢走向改善性能的阶段。
mathjax: true
author:	闵超
---

* content
{:toc}

  

Web前端页面的开发避免不了与DOM的交互操作。自前端技术出现后，页面的结构越来越复杂，用户的操作交互越来越多，对应的DOM交互也越来越频繁。为了提高开发效率，我们常常借助DOM交互框架来简化页面的开发工作。经过Web前端这些年的发展，用于DOM交互的框架越来越多，设计思路也不尽相同。总结来说，前端框架一次次变化，从提升效率的阶段，慢慢走向改善性能的阶段。

##      直接DOM操作时代

<center>常见DOM API 举例</center>

|类型|方法|
|-----|--|
|节点查询型|getElementById、getElementsVyName、getElementsByClassName、getElementsByTagName、querySelector、querySelectorAll|
|节点创建型|createElement、createDocumentFragment、createTextNode、cloneNode|
|节点修改型|appendChild、replaceChild、removeChild、insertBefore、innerHTML|
|节点关系型|parentNode、previousSibling、childNodes|
|节点属性型|innerHTML、attributes、getAttribute、setAttribute、getComputedStyle|
|内容加载型|XMLHttpRequest、ActiveX|


<center>常见jQuery API举例</center>

|类型|方法|
|----|--|
|节点查询型|$(selector)、find()等|
|节点创建型|$(selector)、clone()等|
|节点修改型|html()、replace()、remove()、append()、before()、after()等|
|节点关系型|parent()、siblings()、closest()、next()、children()等|
|节点属性型|attr()、data()、css()、hide()、show()、slideDown()、slideUp()、animate()等|
|内容加载型|ajax()、get()、post()等|

##     MV*交互模式

###     前端MVC模式

有了jquery和zepto等DOM交互框架已经可以比较高效地处理DOM操作和事件绑定等问题了。这种高效的方式带来了效率上的提升，但随着页面结构和交互复杂性的提升，仅靠这种方式会增加维护管理的难度。

为解决这种问题，通常将页面上与DOM相关的内容抽象成数据模型、视图、事件控制函数三部分，这就有了前端MVC(Model-View-Controller)的设计思路。

MVC可以认为是一种开发设计模式，其基本思路是将DOM交互的内容分为数据模型、视图和事件控制函数三各部分，并对它们进行统一管理。

Model用来存放请求的数据结果和数据对象

View用于页面DOM的更新与修改

Controller则用于根据前端路由条件(例如不同的HASH路由)来调用不同Model给View渲染不同的数据内容。

当Model或View复杂后，我们也可以考虑将Model、View、Controller拆分成不同文件导入引用。需要注意的是，用户操作引起的DOM修改操作主要是通过Controller来直接控制的，但是Controller只进行修改操作指令的分发，数据的渲染一般是View层来完成。

###     前端MVP模式

MVP(Model-View-Presenter)可以跟MVC对照起来看。和MVC一样，M就是Model，V就是View，而P代表Presenter来完成后面的Model修改和其他View的更新，而MVC模式下，用户的操作是直接通过Controller来。Presenter和View的操作绑定通常是双向的，View的改变一般会触发Presenter的动作，Presenter的动作也会改变View。

View和MOdel主要用于提供视图模板和数据而不做任何逻辑处理，这是有好处的，因为我们现在只要关注Presenter上面的逻辑操作就可以了，它的职责很清晰，Presenter作为中间部分链接Model和View的通信交互完成所有的逻辑操作，但这样Presenter层的内容就可能变得很重了。另外用户在View上的操作会反馈到Presenter中进行Model修改，并更新

###     前端MVVM模式

MVVM则是可以认为是一个自动化的MVP框架，并且使用ViewModel代替了Presenter，即数据Model的调用和模板内容的渲染不需要我们主动操作，而是ViewModel自动触发完成，任何用户的操作也都是通过ViewModel的改变来驱动的。

-   Directive：指令，简单地说就是自定义的执行函数
-   filter 过滤器，指用户希望传入的初始数据进行处理，然后再将这个处理的结果交给Directive或下一个Fileter
-   表达式设计。如if...else...等，类似前端普通的模板表达式，其作用是控制页面内容按照具体条件来展示
-   ViewModel设计。实现传入的Model数据在内存中存放的环节，通常ViewModel也会提供一些基本的操作API，方便开发者对数据进行读取或修改。
-   数据变更检测。  MVVM是通过数据改变来驱动的，这样就需要进行数据的双向绑定。一方面要更具View层的变化来改变Model，是通过一些特殊元素的onchange事件来触发修改JavaScript中ViewModel对象数据的内容来实现的，这点比较容易理解。另一方面，通过VM修改，触发View的自动更新，实现数据变更检测的方法主要有手动触发绑定、脏数据检测、对象劫持、Proxy等

##      Virtual DOM交互模式

###     Virtual DOM设计理念

MVVM的前端交互模式大大提高了编程效率，自动双向数据绑定让我们可以将页面逻辑实现的核心转移到数据层的修改操作上，而不是在页面中直接操作DOM。但实际上，尽管MVVM改变了前端开发的逻辑方式，但是最终数据层反应到页面上View层的渲染和改变仍是通过对应的指令来操作DOM完成的，而且通常一次VM的变化可能会触发页面上多个指令操作DOM变化，带来大量的页面结构层DOM操作或渲染。

###     Virtual DOM的核心实现

Virtual DOM模式来控制页面DOM结构更新的过程：创建原始页面或组件的Virtual DOM结构，用户操作后需要进行DOM更新时，生成用户操作后页面或组件的Virtual DOM结构并与之前的结构进行对比，找到最小变化Virtual DOM的差异化描述对象，最后把差异化的Virtual DOM 根据特定的规则渲染到页面上。

所以核心操作可以抽象成三个步骤：

一创建Virtual DOM;

二比对两个VirtualDOM生成差异化Virtual DOM;

三将差异化Virtual DOM渲染到页面上

##      前端MNV*时代

尽管，Virtual DOM的交互模式能在页面数据渲染和变更时，尽可能地减少DOM操作，但仍无法完全脱离DOM交互模式。我们知道DOM的操作效率不高，在移动设备的Hybrid WebView上表现会更慢，所以为了进一步改进Hybrid应用中的DOM性能，希望完全脱离DOM编程的模式来进行结构层的操作。

目前主流Hybrid App的Web内容通常是在原生应用中嵌入WebView来实现的，而原生应用的界面数据渲染可以通过调用原生控件来实现，它不仅没有HTML DOM的性能缺陷，而且还可以直接调用Natibe系统底层的API；其次，Hybrid App可以通过统一的JavaScript交互协议来调用原生的方法和控件。


###     MNV*模式简介

我们把这种JavaScript调用原生控件或事件绑定来生成应用程序的交互模式成为前端MNV*开发模式。可以简单理解为Model-NativeView-*,而后面的*可以表示Virtual DOM或者MVVM中的ViewModel，我们也可以自己使用Controller来实现调用方式。这样定义是非常合适的，相比之前的不同无非就是NativeView代替了View。

如果说Virtual DOM减少了DOM的交互次数，那么MNV*想要做的一件事情就是完全抛弃使用DOM，而交互数据的操作依然可以使用ViewModel、Virtual DOM或者直接的Model来实现，具体就看实现方式了。

整体上设计实现一个Native渲染机制思路并不难，但是实现好JavaScript端和Native端的封装，难度就比较大了。MNV*框架端的主要任务是解析Model、ViewModel或Virtual DOM组成的JSBridge协议串并发送，而Native端的实现将会比较复杂，需要处理不同的标签元素解析后，例如遇到< TextView>标签，会创建TextView控件，遇到< Layout>标签会创建Layout控件，还可能需要处理事件的绑定等，即将JavaScript的事件通过Native事件来实现。整体上像是使用移动端原生的方式来解析HTML上需要实现的应用功能。

MNV*的基本原理主要是JSBridge和DOM编程的方式进行结合，让前端能够快速构建开发原生界面的应用，从而脱离DOM的交互模式。


总结：

经过对各类前端框架的原理性分析，从直接DOM编程到MV*交互模式，再到Virtual DOM编程理念，以及MNV*渲染方式，前端框架一直秉承着提高效率和性能的宗旨一步步变化。

身为一名前端工程师，我们需要深入理解体会各类框架的实现设计方式，这样才能理解前端框架的变化规律。同时，我们需要这种追根究底的精神。因为前端的发展速度太快了，(前端不是一招鲜吃遍天的技术工种，而是伴随着日新月异不断进化的技术工种)，不学习不充电迟早在技术上就会被淘汰。（这是身为一名前端工程最辛苦的地方，同时也是最有意思的地方）