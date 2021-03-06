---
layout: post
title:  " 前端三层结构与应用"
date:   2018-07-02 23:06:05
categories: 前端知识
tags: 前端知识
excerpt: 前端都知道的事情，前端有三个基本构成：结构层HTML，表现层CSS和行为层JavaScript。如果你不知道，那你肯定是个假前端或者后端的卧底，就不能成为一个正在的前端。
mathjax: true
author:	闵超
---

* content
{:toc}


前端都知道的事情，前端有三个基本构成：结构层HTML，表现层CSS和行为层JavaScript。
如果你不知道，那你肯定是个假前端或者后端的卧底，就不能成为一个正在的前端。


当然，身为一名合格的前端工程师，并不是说知道这是三个就可以的，前端三层结构是基础，是构建庞大前端世界工程的地基，现代的前端应用开发早已经不是简单的三层结构就能轻松解决问题的了，而是已经形成了编译流程化、生产环境基础优化结构运行的模式。

简单来讲，例如HTML开发可以使用Component(实现的形式比较多，例如Web Componet、目录级Component、其他框架自定义形式的Component)来管理结构。CSS由SASS、postCSS、stylus等预处理器的语法来开发替代，JavaScript则使用ECMAScript 6+、TypeScript等特性标准进行高效开发。

这些就是目前前端的主要开发技术，其主要过程是开发完成后讲开发项目的三层结构内容编译输出为浏览器支持运行的基础三层结构解释执行。

自前端技术诞生以来，一直保持着较快的发展速度。同时，前端技术的快速发展对前端工程师的要求也越来越高。

无论怎样，因为对效率需求迫切，现代前端的编译开发技术已经成为了主流。

##  结构层——HTML 基础

结构层HTML现在已经发展到HTML5版本，而在实际工程项目中，HTML5一般只又在移动端页面开发中才会使用到，桌面浏览器页面开发时，由于兼容性原因，使用的虽然是HTML5D doctype定义但一般不适用HTML5的新标签规范。幸运的是，HTML5标准是向后兼容的，HTML4版本的绝大多数常用标签依然可以继续使用。

###   你必须要知道的DOCTYPE

提到DOCTYPE，我们不妨先从HTML 4.01开始，HTML4.01是W3C在1999年制定发布的HTML语言规范。是基于SGML（Standard Generailized Markup language，标准通用标记语言）规范来定制的。

HTML5正式发布于2014年，HTML不是基于SGML演化而来的，可以理解为是W3C的另一套实现规范。

H5向后兼容绝大多数低版本的HTML元素标签，并添加了新的元素标签。

HTML是由XML衍生而来，目前已经进入HTML5成熟阶段。要了解的是，HTML5不是基于SGML的，不需要对DTD进行定义。实际上我们可能早已不再使用旧版本的声明模式了，但还是有必要了解其中的原因。

####    Web语义化标签

首先给出Web语义化标准的定义：Web语义化是指在HTML结构的恰当位置上使用语义恰当的标签，使页面具有良好的结构，是页面标签元素具有含义，能够让人或搜索引擎更容易理解。

例如：

1.  用正确的标签做正确的事情
2.  HTML语义化能让页面内容更具结构化且更加清晰，便于浏览器和搜索引擎进行解析，因此在兼容条件下，要尽量使用带有语义化结构的标签。
3.  即使在没有样式CSS的情况下，网页内容也应该是有序的文档格式显示，并且容易阅读
4.  是项目维护人员更容易对网站进行分块，便于阅读理解。

理解了以上四点，我们来看看HTML主要标签的设计。CSS规范规定：每个标签元素都是有display属性的。所以根据标签元素的display属性特点，可以将HTML标签分为以下几类

    -   行内元素：包括<a>、<b>、<span>、<img> 、<input>、<button>、<select>、<strong>等标签元素，其默认宽度是由内容宽度决定的
    -   块级元素:包括<div>、<ul>、<ol>、<dl>、<dt>、<dd>、<h1>~<h6>、<p>、<table>等标签，其默认宽度为父元素的100%
    -   空元素:例如<br>、<hr>、<link>、<meta>、<area>、<base>、<col>、<command>、<embed>、<keygen>、<param>、<source>、<track>等不能显示内容甚至不会在页面中出现，但是对页面的解析有着其他重要作用的元素
    
h1~h6通常表示标题的标签元素，ul、ol、dl分别表示无序、有序、带标题的描述列表。除此之外，合理的标签使用能够让搜索引擎更容易获取页面的主要内容，提升权重。例如，页面中的h1标题元素就比div标签元素更重要，会更容易被搜索引擎抓取和记录。因此，我们在设计HTML结构时，要尽量注意语义化的使用。

####     HTML糟糕的部分

也许没有人告诉过你，Web语义化规范并不是在任何时候都需要严格遵守的，有时直接使用甚至会产生一些副作用。例如在桌面浏览器应用开发时，若页面标签结构中使用HTML5的新语义化标签可能会导致这些标签可能会导致这些标签无法直接解析，所以考虑到兼容性，我们最终仍然需要使用div来代替，另外我们或许也会考虑使用html5.js来进行特殊解析，但是这样在部分版本的浏览器中，页面的解析就会变得较缓慢了。

关于前端标签元素或特性的兼容性，我们一般可以通过访问
[http://caniuse.com/](http://caniuse.com/)来查询。


编写HTML时的一些使用上的坏味道：

     <!-- <img>元素标签可以不用写alt或title，也能正常显示 -->   
    <img src="photo.jpg"/>
    
    <!-- <a>元素标签可以不写href属性，不过这样容易出现问题。即使添加块级元素也不会报错，但是里面的内容在浏览器解析后会发生位置偏移，如果出了问题将很难定位 -->
    <a><h2></h2></a>
    
    <!-- 并不是所有的标签都是带语义化的，<div>、<i>就是比较典型的例子，所以尽量避免在这些标签里面直接添加文字，实际项目开发中，我们常常把<i>元素标签当做页面上的icon图标标签来使用  -->
    <div></div>
    <i></i>
    
    <!-- 尽管HTML规范提供了有语义化的列表元素，但我们仍然可以用下面这种方式来定义列表，而且在页面上也可以正常显示 -->
    <div>
        <span class="list-item">1<span>
        <span class="list-item">2<span>
        <span class="list-item">3<span>
    </div>
    
    <!-- 元素中可以使用内联样式，当然这是旧版本的历史问题；元素样式里面随意添加top属性也是可以的，只是不生效不会报错；加入displey:relative;也不会报错，但是relative并不是display属性-->
    
    <!-- HTML定义了table元素，但是table是一次性渲染的，如果表格内容较长就比较慢了 -->
    
    <!-- 表单输入项内容不写lable也是没问题的，<label>可以定义与表单控件的关系，当用户选择该标签时，浏览器会自动将焦点转到和标签相关的表单控件上。 -->
    
    <!-- 还有一些很不合理的标签。新的标准已经将它们弃用了 -->
    <blink></blink>
    <marquee></maquee>
    <stike></stike>
    
这些坏味道(糟糕的设计)不仅降低了页面可读性，拖慢了页面性能，不利于SEO，而且误导了初学者对HTML的理解使用，更有可能让我们在已经除错的情况下找不到错误的原因和方向。

我们可以借助一些现代化开发工具插件或构建工具插件来分析上面的HTML页面中糟糕的地方。

####     AMP HTML

流动网页提速(Accelected Mobile Page AMP)是google推行的一个提升页面资源载入效率的HTML提议规范。基本思路有两点：使用严格受限的高效HTML标签以及使用静态网页缓存技术来提高网络访问静态资源的性能和用户体验。也就是说，尽量避免使用目前网页上渲染或展示性能比较差的标签，并将部分网页静态内容缓存到页面上进行分发，例如内联体积较小的样式和图片、延时加载较大的静态资源文件等，进而提高网页的初始载入速度。

AMP HTML提出了一个可选的实现方案就是同归添加自定义元素来代替AMP规范限制的元素，即使用<amp-video>、<amp-img>、<amp-audio>、<amp-pixel>等来做页面内容的延迟载入或渲染，其实本质上这类标签的逻辑封装实现和异步加载有些类似。

总的来说，使用AMP提升页面性能的基本的原则如下：

-   只允许异步的script脚本
-   只加载静态的资源
-   不能让内容阻塞渲染
-   不在关键路径中加载第三方JavaScript
-   所有的CSS必须内联
-   字体使用申明必须高效
-   最小化样式声明
-   只运行GPU加速动画
-   处理好资源加载顺序问题
-   页面必须立即加载
-   提升AMP元素性能

这里所说的快，并不是单纯指页面渲染速度快，还包括将可以异步或延后的渲染操作延后，在保证用户体验不降低的情况下尽早展示关键性内容。



##  前端结构层的演进

可扩展性标记语言(Extentsible Marjup Language,XML)是用来描述网络上存储数据的一种特殊文本标记格式。

它是在SGML的基础上演化而来的，XML推荐使用一对闭合标签的形式来描述数据的名称，这对闭合标签里面的内容则表示对应的值，同时XML推荐使用一对闭合标签的形式来描述数据的名称，这对闭合标签里面的内容则表示对应的值，同时XML规定任何一个开始的标签必须与一个结束标签配对。

HTML则是从SGML的基础上进化而来的另一种文本标记语言，一般用于网络上数据的展示。

| HTML5 | HTML4 | 描述与其他类似标签 | 
| - | :-: | -: | 
|  < header></ header> | < div id="header"></ div>| 一般用来定义页面头部模块元素。类似的还有footer、nav、section、hgroup(与section结合) | 
| < video src="movie.ogg"></ video> | < object type="video/ogg" data="movie.ogv" >< param name="src" value="movie.ogv"></ object> | 用来插入一个视频播放器界面，类似的有audio(音频)、embed(插件)、canvas(自定义图形，H5之前用svg)等显示媒体的标签 | 
| < source/> | < param name="" value="" > | 插入视频或音频的属性配置标签 |
| < article>< /article>|< p>< /p> |描述一个段落文章元素标签。类似的有aside(文章歪内容)、details(元素细节)、figure(描述信息)等内容类标签 |
|< time>< /time>|< span>< /span>|输出时间标签，类似的有output(页面输出内容)、mark(页面需要突出的文字)等标记类标签|
|< datalist>< /datalist>|Combox|可选数据的列表，和input配合使用|
|< progress>< progerss>|none|显示JavaScript等执行进度标签|
|< command/>|none|定义命令按钮。类似的有figcaption(自定义figure元素的标题)、keygen(页面秘钥)、meter(度衡量)、summary(描述)、ruby(同rp、rt 注释ruby代码使用)等标签|

####    HTML Web Component

在HTML中使用HTML import方式引入外部的Shadow DOM内容，Shadow host为< x-image>在支持Shadow DOM的浏览器上会将自定义组件引入到< x-image>的位置

##      弦外话——浏览器脚本演进历史

我们知道，目前前端浏览器上的执行脚本还是以JavaScript为主。但是这并不意味着我们在任何情况下都可以直接使用JavaScript进行安全开发，之前有人提JavaScript设计中糟糕的部分，还有人读过《JavaScript语言精髓》。作为一种标准化语言，竟然有很多特性被人公然地摒弃，十分不可思议。

例如：全局作用域、eval、with、类声明缺失等不合理的特性设计

###     CoffeeScript时代
CoffeeScript代表着前端脚本语言历史上的一段辉煌时期。CoffeeScript是一套可转译为JavaScript语法的语言。早在JavaScript规范混乱的时代，一些糟糕的设计不仅让开发的代码运行不稳定，而且还会增加大型项目的维护难度。像前面提到的全局变量、作用域this、函数参数为数组对象、类声明缺失、默认模式下无规范限制、语法声明冗繁等特性在开发过程中尤其需要注意，一旦处理不完善，就可能导致除错并花费大量的时间去排查。

###     ECMAScript标准概述

-   1999年12月，ECMAScript 3发布，主要定义了ECMAScript的一些常用对象和条件控制语法，例如内置对象、正则表达式、条件控制语法、异常处理、错误定义等
-   2009年12月，ECMAScript 5标准发布。其中主要新增了严格模式、JSON对象、新增Object接口、新增Array接口、Function.prototype.bind等特性
-   2015年6月17日，ECMAScript 6 正式发布。其中增加了块级作用域变量声明规范、String模板、解构、arrow函数、Symbol类型、类、迭代器、生成器、几何、Promise、Proxy等特性。这也是CoffeeScript开始走向没落的一个转折点
-   2016年，ECMAScript 7发布，主要增加了幂函数和array.prototype特性。


就兼容性方面而言，Node 6.0版本已基本支持到ECMAScript 6(93%特性支持)，新版本的Node也支持更多ECMAScript 6以上的特性。浏览器端Chrome 52已完全支持ES6,并逐渐添加了对ES7的支持，其他浏览器也在陆续添加对es6的支持。

在工程开发实践中，ES6的应用很快被推广并被分为两个方向：

-   一是用于浏览器端应用开发，由于浏览器版本较多，需要将ES6转译为ES5的语法运行，这其实跟CoffeeScript的使用方式一样，因此这种情况下ESS6只能作为语法糖使用，实际运行时不能真正使用新版本标准的特性；
-   二是Node端的应用开发由于Node环境对新版本特性支持较为完善，因此可以使用ES6的新特性，尤其是对完善或增强类特性的支持，能够大大提升开发效率，完善功能实现效果。
 

###     JavaScript标准实践
JavaScript标准自明确后就和ECMScript有着密切的联系，目前几乎所有的JavaScript代码都遵循ECMAScript规范。可以简单理解为JavaScript是语言，ECMAScript则是语言习惯。

如果将JavaScript比作英语，则ECMAScript可以理解为美式英语，TypeScript则可以理解为英式英语。它们大部分的语法是相同的，但仍有少部分的差异，都是英语的使用标准。

####        ES5

ES5于2009年12月发布，内容主要包括严格模式、JSON队形、新增Object接口、新增Array接口和Function.portotype.bind。可以认为，ES5规范的推出在原来没有规范的JavaScript语法上添加了有限的限制标准。

1.  严格模式
ES5严格模式的提出为开发者提供了更加安全规范的编程范围，限制了原有一些不规范的写法，让一些不合理的语法直接报错，从而提高了代码的安全性和规范性。例如严格模式下，未声明的全局变量赋值会抛出ReferenctError，禁止使用with、eval等语句，函数内容部arguments.callee()和arguments.caller()调用会报错，删除系统内置对象、对象已冻结的属性、对象已密封的属性、全局变量或var定义的变量等都是不允许的。依然不建议使用arguments变量，acll/apply的第一个参数将直接传入不自动封存为对象；对象属性不建议有重名的情况发生。


    
    'use strict';
    myName ='micale';//Uncaught ReferenceError: myName is not defined
    person = {//Uncaught ReferenceError: person is not defined
        name:'micale',
        address:'china',
        job:'engineer',
        job:'writer', //部分浏览器报错:Uncaught SyntaxError
    }
    
    with(person){   //Uncaught ReferenceError:Strict mode code may not include a with statement
        console.log(name,address,job);
        eval('alert(name)');
    };
    
    delete myName; //Uncaught ReferenceError:Delete of an unqualified identifier in strict mode
    
    
    function sayHi(arguments){ //Uncaught ReferenceError:Unexpected eval or arguments in strict mode
        console.log('Hi ${arguments}');
    }

需要注意的是，严格模式下错误的提示类型和描述在不同浏览器可能不同，具体跟浏览器的实现有关。总之，严格模式的添加消除了JavaScript语法的一些不合理、不严谨之处，减少了一些怪异行为，可以再一定程度上提高编译器效率，加快运行速度，为未来新版本的JavaScript标准化做了铺垫，这是非常有意义的。


2.  JSON

一般情况下，我们使用JavaScript语言解析字符串为JSON对象或解析JSON对象为字符串时可以使用JSON.parse()和JSON.stringify()。

问题是，JSON解析不是伴随着JavaScript的出现而产生的，例如在IE8更低版本的浏览器中不能直接使用JSON解析方法。需要引入es5-shim来增加浏览器对ECMAScript 5功能的支持，让浏览器支持JSON对象的解析。

    <script src=".../es5-shim.js"></script>
这样，我们就可以再后面的代码中放心地使用JSON.parse()和JSON.stringify()。
    
    JSON.stringify()    //适用于将JSON内容转换为字符串
    JSON.valueOf()   //用于获取某个对象的值
    JSON.toString() //被调用时，会调用Obejct原型上的toString()方法，会取得JSON对象的值并转为字符串，如果没有具体的值，则返回原型数组
    JSON.toLocaleString()   //也是Object原型上的方法，经常会返回toString()相同内容，但对于Date对象会返回格式化之后的时间字符串
    
    JSON.stringify({name:'minchao'});   //输出:"{"name":"minchao"}"
    JSON.toString({name:'minchao'});    //输出:"[object Object]"
    JSON.valueOf({name:'minchao'});     //输出:JSON{Symbol(Symbol.toStringTag):"JSON"}对象
    JSON.toLocaleString({na006De:"mincaho"});   // 输出:"[object object]"
    
    let colors =['red','blue','gree'];
    console.log(colors.toString());//red,blue,green
    console.log(colors.valueOf());//["red","blue","green"]
    console.log(colors.toLocaleString());//red,blue,green
    
    let date = new Date();
    console.log(date.toString());//Tue Jul 10 2018 14:44:53 GMT+0800 (中国标准时间)
    console.log(date.valueOf());//1531205093158
    console.log(date.toLocaleString());//2018/7/10 下午2:44:53


3.  新增Object方法属性

根据ES5规范文档，ES5标准添加了较多Object原型对象上的方法。

ES5中新增中Object方法和属性如下表：

尽管这些新增的Object属性或方法在我们实际业务开发中并不一定常用，但如果要自己抽象一个工具类或者实现JavaScript库，就可能会用到它们，列在这里，你可以灵活选择。

ES5中新增的Obejct方法：

|方法|描述|
|-- |-- |
|getPrototypeOf() |返回一个对象的原型|
|getOwnPropertyDescriptor() |返回某个对象自有的属性描述符|
|getOwnPropertyNames()|返回一个数组，包括对象所有自有属性名称集合(包括不可枚举的属性)|
|create() |创建一个拥有指定原型和若干指定属性的对象|
|defineProperties()|为对象定义一个新的属性，或者修改已有的属性，并对属性重新设置getter和setter，这里可以被用作数据绑定的对象劫持用途|
|defineProperties()|在一个对象上添加或修改一个或多个自有属性，与defineProperty类似|
|seal()|锁定对象。阻止修改现有属性的特性，并阻止添加新属性，但是可以修改已有属性的值|
|freeze()|阻止对对象的一切操作和更改，冻结对象将变为只读|
|preventExtensions()|让一个对象变的不可扩展，也就是不能再添加新的属性|
|isSealed()|判断对象是否被锁定|
|isFreezen()|判断对象是否被冻结|
|isExtensible()|判断对象是否可以被扩展|
|keys|返回一个由给定对象的所有可枚举自身属性名组成的数组|

    let colors =['red','blue','gree'];
    console.log(Object.getPrototypeOf(colors));//[Symbol(Symbol.unscopables):Object] 对象
    console.log(Object.getOwnPropertyDescriptor(colors));//undefined
    console.log(Object.getOwnPropertyNames(colors));//["0","1","2","length"]
    
    Object.seal(colors);//锁定对象
    Object.freeze(colors);//冻结对象
    Object.PREVENTeXTENSIONS(colors);//阻止扩展
    
    console.log(Object.isSealed(colors));//true
    console.log(Object.isFrozen(colors));//true
    console.log(Object.isExtensible(colors));//true
    console.log(Object.keys(colors));//["0","1","2"]
    
    colors['2']='gray';//Uncaught TypeError:Cannot assign to read omly property '2' of object '[object Array]'
    
    colors[4] = 'gray';//Uncaught TypeError:Can't add property 4,object is not extensible
    delete colors[2];//Uncaught TypeError: cannot delete property '2' of [object Array]
    
    
4. 新增Array方法属性

ES5标准对内置数组对象的原型方法做了扩展完善，主要添加了下列常用的方法。

|方法|描述|
|--|--|
|indexOf()|返回根据给定元素找到的第一个索引值，如果不存在则返回-1|
|lastIndexOf()|返回指定元素在数组中最后一个索引值，如果不存在则返回-1|
|every()|测试数组的所有元素是否都通过了指定函数的测试|
|some()|测试数组中的某些元素是否通过了指定函数的测试|
|forEach()|令数组的每一项都执行指定的函数|
|map()|返回一个由原数组中每个元素调用某个指定方法得到的返回值所组成的新数组，返回每一个处理结果|
|filter()|利用所有通过指定函数处理的元素创建一个新的数组并返回|
|reduce()|接收一个函数作为累加器，数组中的每个值(从左到右)开始缩减，最终缩减为一个值|
|reduceRight()|接收一个函数作为累加器，数组中的每个值(从右到左)开始缩减，最终缩减为一个值|

    let colors =['red','blue','green','green'];

    console.log(colors.indexOf('green'));//2
    console.log(colors.lastIndexOf('green'));//3
    
    console.log(colors.every(function(color){
        return color.length >= 3;
    }));//true 判断是否所有的元素长度均大于等3
    
    console.log(colors.some(function(color){
        return color.length > 4;
    }));//true ,判断是否有至少一个元素长度大于4
    
    colors.foreach(function(color){
        if(color == 'green'){
            console.log(color);
        }
    });//green green
    
    console.log(colors.map(function(color){
        if(color === 'green'){
            return color;
        }
    }));//输出数组 [undefined,undefined,"green","green"]
    
    console.log(colors.filter(function(color){
        if(color === 'green'){
            return color;
        }
    }));//输出数组["green","green"]
    
    console.log(colors.reduce(function(color,nextColor){
        return color +','+nextColor;
    }));//输出字符串 red,blue,green,green
    
    console.log(colors.reduceRight(function(color,nextColor){
        return color +','+nextColor;
    }));//输出字符串 green,green,blue,red
    
    
5. Function.prototype.bind
    
ECMAScript中新增的函数的bind()方法比较常用，bind()方法会创建一个新函数，称为绑定函数。当调用这个绑定函数时，绑定函数会以创建他时传入bind()方法的第一个参数作为this，以传入bind()方法的第二个及以后的参数和绑定函数运行时本身的参数按照顺序作为原函数的参数来调用。

    fun.bind(thisArg,[,arg1[,arg2[,...]]]);
    
其实JavaScript中重新绑定this变量的函数方法还有call()、apply()，不过bind()显然与它们有着明显的不同，bind()会返回一个新的函数，并传入的参数和函数绑定起来，而call()或apply()则是使用新的this去直接调用、执行函数。

    
    const fun = function(param){
        console.log(this + ':' + param);
    };
    fun.call(this,'minchao')//"[object Window]:minchao"
    fun.apply(this,['minchao']);//"[object Window]:minchao"
    
    let funNew = fun.bind('min','chao');
    funNew();//"min:chao"

6. String.prototype.trim()、Date.now()、Date().toJSON()
    

    console.log(' min chao '.trim());//"min chao";
    console.log(Date.now());//返回当前时间戳
    console.log((new Date()).toJSON());//2018-07-11T02:46:41.868Z
    
    
####        ES6

ES6是于2015年6月17日正式发布的，也被命名为ECMAScript2015。es6早在草案制定阶段，很多特性就被开发者应用到实际项目中。ES6借鉴了ES5和其他语言的特性，并在此基础上进行了补充和增强，最终形成了一套完整的特性集合，使得JavaScript语言规范更加高效、严谨、完善。例如字符串模板、集合、箭头函数、Promise、for...of循环等均是借鉴其他语言的优秀特性而增加的功能点，class类和import/export模块规范则可以认为是对原有ECMAScrpt标准缺失特性的补充，迭代器、生成器、解构赋值、函数参数等可以认为是对原有标准特性的增强。

1.  块级作用域变量声明关键字let、const


    let a=1;
    const b = 'hello';
    var A =2;
    
    {
        let c='c';
        const d;//Uncaught SyntaxError:Missing initializer in const declaration
    }
    
    console.log(c);//Uncaught SyntaxError:c in not defined
    b= 'word';//Uncaught SyntaxError:Assignment to constant variable.
    
    console.log(window.a || global.a);//undefined
    console.log(window.A||global.A);//2
有几个需要注意的地方：

一是let和const都只能作为块级作用域变量的声明，且只能在块作用域内生效，块内声明的变量无法再块级外层引用；

二是const声明的变量必须进行初始化赋值，而且一旦赋值就不能进行第二次修改。

三是：使用let、const在全局作用域下声明的变量不会作为属性添加到全局作用域对象里面，这点是和var不同的;

四是:通过测试，使用let、const赋值语句的执行速度比使用var快约65%左右。

综上所述：我们可以知道，模块内不变的引用和常量，一般使用const定义；可变的变量或引用使用let声明；var仅用于声明函数整个作用域内需要使用的变量。

2.  字符串模板

字符串模板设计主要来自其他语言和前端模板的设计思想，即当有字符串内容和变量混合连接时，可以使用字符串模板进行更高效的代码书写并保持代码格式和整洁性。如果没有字符串模板，我们依然需要向以前一样借助"字符串+操作符"拼接或数组join()方法来链接多个字符串变量。


    let name ="mincaho";
    let str = `<h2>hi,${name} </h2>h2>
        <p>hello,world!</p>
        <p>2017-5-11</p>`;
        
需要注意的是，字符串模板不会压缩内部的换行和空格，二是按照原有的格式输出，只将变量内容填充替换掉。实际开发中如果ES6的转译工具将ES6的代码处理生成ES5的代码后，格式可能丢失，因为ES5及之前是没有字符串模板格式的。

3.  解构赋值

解构赋值是ES6的一大亮点功能，它解决了赋值的编码冗余和模块按需导出的问题。解构赋值主要分为数组解构和对象解构。

    let [a,b,c] =[11,22];
    let {one,two.three} = {two:2,three:3,one:1};
    [a,b] = [b,a];//交换a、b变量的值
    console.log(c);//undefined

这里数组解构是严格按照数组下标依次对应顺序赋值的，如果赋值的常量个数不够，则对应下标的天来那个默认为undefined;如果常量个数超出，则多余的会被舍弃，所以顺序很重要；而对象解构赋值则是根据对象引用的键名来进行赋值，可以无视顺序。

如果某个变量已经被声明，就不能再参加解构赋值了，JavaScript执行引擎会把它当做重复声明处理，而ES6中任何变量的重复声明是不允许的。

4.  数组新特性

ES6也为数组内置对象添加了较多的新的特性，主要包括...复制数组和新增的数组API

    const arr=['min','chao'];
    const newArr = [...arr];//['min','chao']

需要注意的是...进行的数组复制是签浅拷贝


ES6新增数组方法

|方法|描述|
|--|--|
|Array.from()|用于将类数组对象(包括对象[array-like object]和可遍历对象)转化为真正的数组|
|Array.of()|将传入的一组参数值转换为数组|
|Array.prototype.copyWithin()|可以在当前数组内部将指定位置的数组项复制到其他位置，然后返回当前数组，使用copyWithin方法会修改当前数组|
|Array.prototype.fill()|使用给定值，填充一个数组，会改变原来的数组|
|Array.prototype.find()|用来之熬出第一个符合条件的数组元素，有点类似于filter|
|Array.prototype.findIndex()|用来返回某个特定数组元素在数组中的位置|

还更新了关于数组迭代的方法：entries()、keys()和values()，均可遍历数组，
[ES6关于数组新特性传送门](http://minchao.me/2017/06/13/ECAMScript-seven-chart/)

5.  函数参数

ES6对函数参数进行了新的设计，对原有函数参数设计糟糕的部分进行了改善，主要添加了默认参数、不定参数和扩展参数。

    //默认参数
    function sayHi(name = 'minchao'){
        console.log('Hello ${name}');
    }
    sayHi();//hello minchao
    
    //不定参数
    function sayHi(...name){
        //这里name的值为['min','chao']
        console.log(name.reduce(a,b)=>`Hellp ${a} ${b}`);
    }
    
    sayHi('min','chao');//Hello min chao
    
    //扩展参数
    let name = ['min','chao'];
    function sayHello(name1,name2){
        console.log(`Hello ${name1} ${name2}`);
    }
    sayHello(...name);//Hello min chao
    

6.  箭头函数

 箭头函数的设计来自于CoffeeScript等语言特性，ECMAScript 6标准中也添加了这个特性，让段函数的声明更加方便。
 
     //箭头函数
    [1,2,3].foreach((x) => x*x);
    
    (() => {
        console.log('hello minchao!');//hello minchao
    })();
    
需要注意的是，箭头函数没有完整的执行上下文，因为其this和外层的this相同，可以理解为它的执行上下文只有变量对象和作用域链，没有this值。

在JavaScript中，代码的执行上下文由变量对象、作用域链和this值组成。但箭头函数与外层执行上下文共享this值，如果需要创建具有独立上下文的函数，就不要使用箭头函数。

[ES6箭头函数传送门](http://minchao.me/2017/06/14/ECAMScript-eight-chart/#%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0)



7.  增强对象
  
在ES6中，对象的使用变得更加方便。你可以在定义对象时通过属性简写、变量作为属性名或省略对象函数属性是书写方式来提高编码的效率。


    const name ="chao";

    const people = {
        //属性简写
        name,
        //返回变量或对象作为属性名
        [getKey('family')]:'min',
        //对象方法属性简写声明
        sayHi(){
            console.log(`Hello ${this.family} ${this.name} `);
        }
    }
    
    people.sayHi();//Hello min chao
    
    function getKey(key){
        return key;
    }

为了便于代码的维护和理解，建议尽量不将变量或对象作为对象的属性名。

[ES6对象的扩展传送门](http://minchao.me/2017/06/15/ECAMScript-nine-chart/)

8.  类

JavaScript没有类这一点一直是ES5设计里比较糟糕的地方，这也导致了再ES6之前，定义类的方法以及类的继承方式多种多样。就类的继承方式来说，基本思路就有原型链继承、构造函数继承、实例继承和拷贝继承几种。但每种做法都有缺陷，因为它们不是真正的类的继承。

ES6添加了关键词class

    
    class Aminal{
        constructor(){
            //...
        }
    }
    
    Class People extends Aminal{
        constructor(contents={}){
            super();
            this.name = contents.name;
            this.family = contents.family;
        }
    
        sayHi(){
            console.log(`Hello ${this.family} ${this.name}`);
        }
    }
    
    let boy = new People({
        name:'chao',
        family:'min'
    });
    
    boy.sayHi();//Hello min chao

[ES6对象的类传送门](http://minchao.me/2017/07/04/ECAMScript-eighteen-Class/)

有了class，就有extends，对于开发者来说，使用class很大的好处是实现一个类的代码模块只能在一个地方定义。以前我们可以在代码的任意位置扩展基类prototype属性，从某种意义上来说，class类声明解决了这个之前设计糟糕的地方。

9.  模块module

ES6引入模块引用规范，这是之前语言标准上是没有的。这样就有了JavaScript模块化规范又多了一个选择：import/export。

    //简单的模块导入导出示例
    import {sayHi} from './people';
    export default sayHi;

JavaScript之前的模块化规范比较多，包括AMD、CMD、CommonJs，现在又有了ES6的import/export。所以为了统一，选择模块开发规范时应尽量遵循语言标准的特性。

10.  循环与迭代器Iterator

略，具体请看传送门
[ES6 iterator(遍历器)](http://minchao.me/2017/06/28/ECAMScript-fourteen-chart/)

11.  生成器Generator

略，具体请看传送门
[ES6 Generator函数](http://minchao.me/2017/06/29/ECMAScript-fifteen-chart/)

12.  集合类型Map+Set+WeakMap+WeakSet

[传送门](http://minchao.me/2017/06/23/ECAMScript-thirteenfourteen-chart/)

13.  Promise、Symbol、Proxy增强类型

[传送门](http://minchao.me/2017/07/01/ECAMScript-sixteen-Promise-object/)

14.  统一码


15.  进制数支持

[传送门](http://minchao.me/2017/06/25/ECAMScript-twelve-chart/)

16.  Reflect对象和tail calls尾调用
  
[传送门](http://minchao.me/2017/06/20/ECAMScript-eleven-Proxy-and-Reflect/)


####    ES7+

2016年，ES7正式发布，在ES6版本逐渐稳定之后，后期版本添加的主要内容已经不是太多了，主要包含幂指数操作符合Array.prototype.includes。

1.  幂指数操作


    x**y产生的结果等同于Math.pow(x,y)
    console.log(2**3);//8   

2.  Array.prototype.includes  

    
    let colors =['red','blue','green','green'];
    console.log(colors.include('green'));//true

3.  异步函数async/await

ES6发布时，部分特性的实现方案并没有按期发布，大家便预想这些特性会在下个版本中出现，其中被关注比较多的就是异步函数了，ES7中异步

    const asyncFunction = async function(){
    const numbers = [1,2,3,4,5];
    for(let number of numbers){
        await sleep(3000);
        console.log(number);
        }
    }
    let result = asyncFunction();
    console.log('finish');
    
    // 输出结果
    finish
    1
    2
    3
    4
    5
    
    
    
##      前端表现层基础

### CSS发展概述

CSS(Cascading Style Sheets)是随着前端表现分离的提出而产生的，因为最早网页内容的样式都是通过< center>、< strike>标签或fontColor等属性内容来体现，而CSS设计则提出使用样式描述语言来表达页面内容，而不是HTML的标签来表达。

W3C在1998年发布了CSS2规范，CSS2的出现主要是为了解决早期网页开发过程中排版时表现分离的问题，后来随着页面表现的内容越来越复杂，浏览器平台厂商继续推动W3C组织对CSS规范进行更多的改善。

CSS3特性完成更多、更复杂的事情。

CSS4的草案也在定制中，CSS4中更强大的选择器，伪类和伪元素特性已经被曝光出来，但具体发布时间仍不确定。

####    CSS 选择器与属性
CSS选择器

id选择器、类选择器、元素选择器、组合选择器、伪类、伪元素。

!import > 内嵌样式(权重1000)>id选择器(权重100)>类选择器(权重10)>元素选择器(权重1)

另外值得注意的是，元素定义的CSS伪类和伪元素是不同的。简单地说，伪元素会在HTML中添加了before或after这类内容，而像:visited、:hover、:first-child、:nth-child、:enable、:checked这些伪类则不会，一般用于表示元素在用户不同操作下的状态或选择指定某些元素的描述。

CSS属性

CSS属性分类
|属性类型|属性名|
|--|--|
|布局类属性|position类、弹性布局flex、浮动float、对齐align|
|几何类属性|盒模型相关(margin、padding、width、height、border)、box-shadow、渐变gradient、background类、transform类|
|文本类属性|font类、line-height、color类、text类(text-decoration、text-indent\textoverflow)、white-space、user-select、text-shawdow等|
|动画类属性|以css3为主的transition、animation等|
|查询类|Media query和IE Hack等|

##  前端界面技术

前端表现层CSS样式一统化、预处理技术、表现层动画实现

###     CSS样式统一化
目前访问Web网站应用时，用户使用的浏览器版本较多，由于浏览器间内核实现的差异性，不同浏览器可能对同一元素标签样式的默认设置是不同的，如果不对CSS样式进行统一化处理，可能会出现同一个网页在不同浏览器下打开时显示不同或样式不一致的问题。要处理这一问题目前主要有三种实现思路:rest、normalize和neat。

-   reset


    body,h1,h2,h3,h4,h5,h6,hr,p,blockquote,dl,dt,dd,ul,ol,li,pre,
    form,fieldset,legend,button,input,textarea,th,td{
        margin:0;
        padding:0;
    
    }

-   normalize


    body,h1,h2,h3,h4,h5,h6,hr,p,blockquote,dl,dt,dd,ul,ol,li,pre,
    form,fieldset,legend,button,input,textarea,th,td{
        margin:5px;
        padding:5px;
    
    }

-   neat   


    body,dl,dt,dd,ul,ol,li, form,fieldset,button,input,textarea{
        margin:0;
        padding:0;
    
    }
    
    h1,h2,h3,h4,h5,h6,hr,p,blockquote,dt,pre,legend,textarea,th,td{
        margin:5px;
        padding:5px;
    
    }
    
    
###     CSS预处理

网页前端表现层通常是直接使用CSS来实现，目前CSS开发也已经进入了预处理时代。

CSS预处理工具有很多，例如SASS、LESS、Stylus、postCSS等。

整体上来看，CSS预处理器的语法特性和模式的设计很像编程语言的设计思路，开发完成后通过语法处理器来解析编译成标准规范CSS。

1.  变量声明和计算。方便一次赋值和随处使用，并能进行简单原酸，提高开发管理效率
2.  语法表达式。例如if-else条件语句、for循环等简单语法的设计能让页面CSS规则生成更加灵活
3.  函数处理。方便多次计算的地方能统一复用，例如函数处理和Mixin等特性
4.  属性的继承。元素类属性的继承在开发样式相似但略微不同的多个模块的过程中非常有用，可以减少大量重复代码
5.  兼容性补全。类似autoprefixer这种功能，让开发不用过多关注不同浏览器的兼容性问题，处理多个浏览器兼容性的代码能在预处理阶段自动生成补全。

###     表现成动画

1.  JavaScript直接实现动画


    ...
    let timer = setInterval(function(){
        if(left <window.innerWidth -200 ){
            element.style.marginLeft = left + 'px';
            left ++;
        }else{
            clearInterval(timer);
        }
    })
    ...

通过JavaScript实现动画通常会导致页面频繁重排重绘，很消耗性能，如果是稍微复杂的动画，在性能较差的浏览器上就会明显卡顿。

2.  SVG动画

SVG又称可伸缩矢量图形，原生支持一些动画效果，通过组合可以生成较复杂的动画，而且不需要使用JavaScript参与控制。SVG动画由SVG元素内部的元素属性控制，通常通过< set>、< animate>、< animateColor>、< animateTransform>、< animateMotion>这几个元素来实现。

< set>控制动画延迟

< animate>可以对属性的连续改变进行控制

< animateColor>表示颜色的变化

< animateTransform>可以控制缩放、旋转等几何变化

< animateMotion>则用于控制SVG内元素的移动路径

3.  CSS3 transition
    
同下，传送门

4.  CSS3 animation

[CSS3过渡和动画](http://minchao.me/2015/06/20/CSS3-stransition-and-animation/)

5.  Canvas动画

< canvas>作为HTML5的新增元素，也可以借助Web API实现页面动画。Canvas动画的实现思路和SVG的思路有点类似，都是借助元素标签来达到页面动画的效果，都需要借助对应的一套API来实现，不过SVG的API可以认为主要通过SVG元素内部的配置规则来实现，而Canvas则是通过JavaScript API来实现的。需要注意的是，和SVG动画一样，Canvas动画只能在< canvas>元素内部，超出元素边界将不被显示。

6.  requestAnimationFrame


    <!DOCTYPE html>
    <html>
    <head>
    <title>Script-based animation using requestAnimationFrame</title>
    <style type="text/css">
    div { position: absolute; left: 10px; top:100px; padding: 50px;
      background: crimson; color: white; }
    </style>
    <script type="text/javascript">
        var requestId = 0;
        var startime = 0;
        var lpos = 0;
        var elm;
    
        function init() {
            elm = document.getElementById("animated");
        }
    
        function render() {
            elm.style.left = ((lpos += 3) % 600) + "px";
            requestId = window.requestAFrame(render);
        }
    
        function start() {
            if (window.performance.now) {
                startime = window.performance.now();
            } else {
                startime = Date.now();
            }
            requestId = window.requestAFrame(render);
        }
        function stop() {
            if (requestId)
                window.cancelAFrame(requestId);
        }
    
    
        // handle multiple browsers for requestAnimationFrame()
        window.requestAFrame = (function () {
            return window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    // if all else fails, use setTimeout
                    function (callback) {
                        return window.setTimeout(callback, 1000 / 60); // shoot for 60 fps
                    };
        })();
    
        // handle multiple browsers for cancelAnimationFrame()
        window.cancelAFrame = (function () {
            return window.cancelAnimationFrame ||
                    window.webkitCancelAnimationFrame ||
                    window.mozCancelAnimationFrame ||
                    window.oCancelAnimationFrame ||
                    function (id) {
                        window.clearTimeout(id);
                    };
        })();
    
    
    </script>
    </head>
    <body onload="init();">
    
    <div id="animated">Hello there.</div>
    <button onclick="start()">Start</button>
    <button onclick="stop()">Stop</button>
    </body>
    </html>

requestAnimationFrame只是将回调的方法传入到自身的参数中处理执行，而不是通过setInterval调用，其他的实现过程则基本一样。



##      响应式网站开发技术

-   能否使用同一个站点域名避免跳转的问题
-   能否保证移动端加载的资源内容最优
-   如何做移动端和桌面端浏览器的差异化功能
-   如何根据更多的信息进行更加灵活的判断，而不仅仅是userAgent


###     结构层响应式

结构层响应式设计可以理解成HTML内容的自适应渲染实现方式，即根据不同的设备浏览器渲染不同的页面内容结构，而不是直接进行页面跳转。这里页面中结构层渲染的方式可能不同，包括前端渲染数据和后端渲染数据，这样主要就有两种不同的思路了：

-   页面内容在前端渲染
-   页面内容在后端渲染
