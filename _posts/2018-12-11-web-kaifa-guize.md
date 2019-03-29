---
layout: post
title:  "前端项目开发规范"
date:   2018-12-11 23:00:54
categories: 前端知识
tags:   前端知识
excerpt:    现代前端技术飞速发展，最终形成了以效率和质量为核心的两大趋势。就效率而言，在大型前端项目的开发中，规范的制定、框架的出现与升级、构建的使用更新、组件化的设计实现等都在于让前端能更快、更高效地完成更多的事情。质量方面，前端优化的提出、前端用户数据的收集、错误日志的收集等，都是为了帮助开发者来提高前端性能，提升用户体验。
mathjax: true
author: 闵超
---
* content
{:toc}

#   前端项目开发规范

现代前端技术飞速发展，最终形成了以效率和质量为核心的两大趋势。就效率而言，在大型前端项目的开发中，规范的制定、框架的出现与升级、构建的使用更新、组件化的设计实现等都在于让前端能更快、更高效地完成更多的事情。质量方面，前端优化的提出、前端用户数据的收集、错误日志的收集等，都是为了帮助开发者来提高前端性能，提升用户体验。

##      前端开发规范
开发规范是软件工程师之间的交流的一种语言，它在一定程度上决定了团队协作过程中开发的程序代码是否具有一致性和易维护性，同意的开发规范常常可以降低代码的出错概率和团队开发的协作成本。

开发规范制定的重要性不言而喻，使用怎么样的规范又成为了另一个问题，因为编程规范并不唯一。

规范的差别很多时候只是代码写法上的区别，不同的规范都有各自的特点，没有优劣之分，在选择时也没有必要纠结于使用哪种规范。同一个团队尽可能使用同一种开发规范比较好。


##     前端通用规范

1.  三层结构分离

HTML、CSS、JS分离，保证它们之间的最小耦合，方便前期开发和后期维护

2.  缩进

统一使用tab(4个空格宽度)来进行缩进，可以在开发的IDE上进行设置

3.  内容编码

HTML文档中用<meta charset="utf-8">来指定编码，以避免出现页面乱码问题。但是css不需要为css显示定义编码，其默认为uft-8.

    /* 不推荐 */
    @charset "utf-8";
    html,body{
        margin:0;
        padding:0;
    }
    
    /* 推荐 */
    html,body{
        margn:0;
        padding:0;
    } 
     

4.  小写

所有的HTML标签、HTML标签属性、样式名及规则建议使用小写，我们一般习惯使用小写英文字符，大写单词相对不容易阅读和理解。HTML属性的id属性可以使用驼峰大小写组合的命名方式，因为id属性常常只用于JavaScript的DOM查询引用，而JavaScript语言标准推荐使用驼峰大小写组合的命名方式。

5.  代码单行长度限制

代码单行长度不要超过120个字符(或80字符，具体根据团队习惯来决定)，长字符串拼接通常使用加号来连接换行的内容。

6.  注释
尽可能地为代码写上注释无论是HTML、CSS、还是JavaScript，必要的注释是不能少的。
段内容描述可以使用段注释，单行内容则使用单行注释，对于独立的文件而言，也尽量在文件头部添加文件注释。

当然更推荐使用自文档风格化的IDE进行开发，通过代码的含义来代替注释。

    /**
    * filename:util.js
    * author:minchao
    * description:提供常见的工具函数集，主要包含
    *  getDay():获取中文星期时间格式，例如星期一
    *   formatTime():获取格式化后的中文时间表示，例如:2017年12月12日
    *   ...
    */
    let util = {};
    
    /**
    *   获取带中文的星期字符串
    *   @param {[timestamp]} timestamp[输入时间戳]
    *   @return {[string]} 返回中文星期时间表示
    */
    function _getDay(timestamp){
        //默认的星期表示字符串
        const Day = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
        return Day[timestamp.getDay()];
    }
    ....
    
    module.exports ={
        getDay:_getDay,
        ..
    }

7.  尾行空格与符号

删除尾行空格与多余的符号，这些内容是没有必要存在的。


###     前端HTML规范

1.  文档类型定义


    <! --推荐-->
    <!DOCTYPE html>
2.  head内容

    
    <!-- 推荐-->
    <head>
        <title>xxxx</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
        <meta itemprop="name" content="页面标题">
        <meta name="keywords" content="关键字">
        <meta name="description" content="描述">
	    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    </head>

3.  省略type属性


    <!--推荐-->
    <link rel="stylesheet" href=".../xx.css">
    <script src="./xx.js"></script>

4.  使用双引号包裹属性值


    <!--推荐-->
    <div class="xxx"></div>
    
5.  属性值省略


    <!--推荐 -->
    <input type="text" readonly>
    <inpu type="text" disabled>
    
6.  嵌套

    所有元素必须正确嵌套，尽量使用语义化标签，不允许交叉，不允许在inline元素中包裹block元素

7.  标签闭合

    
    略
    
8.  使用img的alt属性


    略

9.  使用label的for属性


    略
    
10.  按模块添加注释


    <!--模块-->
    <div></div>
    <!--模块 end-->
    
11.  标签元素格式


12.  语义化标签

    <section class="m-news g-mod">
        <header></header>
        <div></div>
        <footer></footer>
    </section>


###     前端CSS规范

1.  CSS引用规范

    
    略
    
2.  样式的命名约定

推荐一种规范，所有命名都使用小写，加上ui-等前缀，表示这个类名只用来控制元素样式展现

    <!--不推荐-->
    .xinwen{}
    .XINWEN-list{}
    .xinwen-list{}
    .ui-xw-ft{}
    .news{}
    //不推荐使用拼音作为样式名，尤其是使用缩写的拼音与英文混合的方式
    
    .news .info{}
    //尽量不使用info、current、news，单独的一级命名很容易造成冲突覆盖，并且很难理解
    
    .center{}
    .left{}
    //不以模块表现样式来命名，要根据内容来命名
    
    #news{}
    //针对id的元素样式很难复用
    
    <!--推荐-->
    .ui-news .news-info{}
    
    .ui-search{}
    .ui-main{}
    
    .ui-news{}
    
3.  简写方式

单位0的缩写。如果属性值为0，则不需要为0加单位，如果是以0位个数的小数，前面的0可以省略不写
    
    //推荐
    .ui-news{
       margin:0;
       padding:0;
       opacity:.7;
    }

    //去掉了url中的引号，这没必要，影响阅读
    body{
        background-image:url(../xx.png);
    }
    //颜色值写法，简写尽量缩写至3位
    
    body{
        color:#f00;//#FF0000;
    }
4.  属性书写顺序

CSS书写顺序遵循先布局，后内容的规则，即先写元素布局属性，再写元素的内容属性。

    //推荐
    .ui-news{
        float:left;
        margin:10px;
        padding:10px;
        width:500px;
        height:200px;
        color:#000;
        background:#000;
    }

5.  Hack写法

尽可能减少对CSSHack的使用和依赖，可以使用其他解决方案来代替Hack的思路。如果避免不了，尽量选择稳定、常用并易于理解的书写方式。

    .ui-news p{
        color:#000;     /* For all*/
        color:#111\9;   /* For all IE */
        color:#222\0;   /* For IE8 and later, Opera without Webkit */
        color:#333\9\0; /* For IE9 and later */
    }

CSS规则要实现多种浏览器内核上兼容，就要遵循先写私有属性后写标准属性的原则，这样有利于浏览器版本向前兼容。

    .ui-news{
        -webkit-box-shadow:1px 1px 5px;
           -moz-box-shadow:1px 1px 5px;
            -ms-box-shadow:1px 1px 5px;
             -o-box-shadow:1px 1px 5px;
                box-shadow:1px 1px 5px;
    }
    
针对IE，可以使用条件注释来作为预留Hack来使用，IE条件注释语法可以如下书写

    <!--[if <keywords>? IE <version>?] >
    <link rel="stylesheet" href="./hack.css" />
    <![endif]-->
    
6.  CSS高效实现规范

尽量使用简短的CSS实现方式，对于无继承关系的元素使用合并的写法更简洁。

不同元素之间属性存在继承关系时，使用分拆方式，避免继承属性的重复定义。

7.  使用预处理脚本编码开发

尽可能使用预处理器的高效语法来提高开发效率，如嵌套、变量、嵌套属性、注释、继承等，避免直接使用CSS开发，使用SASS来编写CSS就高效很多。



###     ES5常用规范

1.  分号

JavaScript语句后面统一加上分号。以前也有人推荐统一不分号，但是加上更容易阅读，而且更容易和换行语句区分

2.  空格

在所有运算符、符号与英文单词之间添加必要的空格，利于开发者阅读

3.  空行

一般推荐在代码块后留一行空行，显得块内容层次更加分明

    <!--推荐-->
    let obj = {
        foo:function(){
            
        },
        
        //对象属性之前保留一行
        bar；function(){
            
        }
    };
4.  引号

推荐JavaScript字符串最外层统一使用单引号。

    let y = 'foo',
        z = '<div id="2" ></div>';

5.  变量命名

标准变量使用驼峰式命名。常亮使用全大写形式命名，并用下画线连接。构造函数首字母大写，jQuery对象推荐以"$"为开头命名，便于分辨jQuery对象和普通对象。

    //推荐
    const MAX_NUMBER = 99;
    const $body = $('body');
    let objName ;
    function Person(name){
        this.name = name;
    }

6.  对象

对象属性名不需要加引号。对象属性键值以缩进的形式书写，不要写在同一行。数组、对象属性后不能有逗号，否则部分浏览器可能会解析出错。

    //推荐
    let a = {
        b:1,
        c:2
    };
    
    leb b = [1,2,3];

7.  大括号

程序中的快代码推荐使用大括号包裹，要注意换行，这样更清晰，而且方便后面扩展增加内容。

8.  条件判断

分别使用===、!==、代替 ==、!=

9.  不要在条件语句或循环语句中声明函数


10.  一些其他的可选规范参考

for-in循环里面要尽量含有hasOwnProperty的判断，防止访问不存在的对象属性时出错。


###     ES6参考规范

1.  正确使用ES6的变量声明关键字
2.  字符串拼接使用字符串模板完成
3.  解构赋值尽量使用一层结构，否则声明变量嵌套太深难以理解
4.  数组拷贝推荐使用...实现，更加简洁高效
5.  数组循环遍历使用for...of,非必要情况下不推荐使用forEach、map、简单循环
6.  使用ES6的类来代替之前的类实现方式，尽量使用constructor进行属性成员变量赋值
7.  模块化多变量导出时尽量使用对象解构，不适用全局导出。尽量不要把import和export写在一行
8.  导出类名时，保持模块名称和文件名相同，类名首字符需要大写
9.  生成器中yield进行异步操作时需要使用try...catch包裹，方便对异常进行处理
10.  推荐使用Promise，避免使用第三方库或直接回调，原声的异步处理性能更好而且符合语言规范
11.  如果不是必须，避免使用迭代器
12.  不适用统一码，中文的正则匹配和计算较消耗时间，而且容易出问题
13.  合理使用Generator，推荐使用async/await，更加简洁


[ES6参考传送门](http://minchao.me/Tags/#ES6)


