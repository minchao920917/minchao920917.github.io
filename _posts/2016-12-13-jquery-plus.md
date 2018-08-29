---
layout: post
title: jQuery插件封装规则
date:   2016-12-13 20:00:54
categories: Jquery
tags:	Jquery
excerpt:	身为一个前端工程师，Jquery是不能不了解的，它可以节省大量开发时间。这里介绍jQuery插件开发的基本知识，最佳做法和常见的陷阱。我们理解了jQuery插件的基础知识，让我们写一个插件，做一些事情，读懂别人的插件更简单一些。
mathjax: true
author:	闵超
---
* content
{:toc}

#		jQuery插件封装

web开发中，jquery几乎是必不可少的，jQuery用过的都知道，今天我们来讨论jquery的插件机制，jquery有着成千上万的第三方插件。有时，我们写好了一个独立的功能，也想将其与jquery结合起来，可以用jquery链式调用，这就是扩展jquery，写成插件形式了。

##		jQuery封装插件知识储备

###		jQuery.extend()和jQuery.fn.extend()

为了方便用户创建插件，jquery提供了jQuery.extend()和jQuery.fn.extend()方法。

用JQuery写插件时，最核心的方法有如下两个：

**$.extend(object) 可以理解为JQuery 添加一个静态方法。**

**$.fn.extend(object) 可以理解为JQuery实例添加一个方法。**

1.	jQuery.extend(object)方法重载

	这有个扩展jquery的例子

		//在jQuery上内置静态方法，调用只需$.方法名即可
		jQuery.extend({
			"minValue":function(a,b){
				return a<b?a:b;
			},
			"maxValue":function(a,b){
				return a>b?a:b;
			}
		});
	
		var i =100,j=10;
	
		console.log($.minValue(i,j));//10
		console.log($.maxValue(i,j));//100

	重载版本:jQuery.extend([deep],target,object1,[objectN])
	用一个或多个其他对象来扩展一个对象，返回被扩展的对象
	
		var settings = { validate: false, limit: 5, name: "foo" }; 
		var options = { validate: true, name: "bar" }; 
		console.log(jQuery.extend(settings, options));
		//Object{ validate: true, limit: 5, name: "bar"}

	这个常用来使用自定义的options来覆盖插件的默认值

2.	jQuery.fn.extend()方法

		//sample:扩展jquery对象的方法，bold()用于加粗字体。
        (function ($) {
            $.fn.extend({
                "bold": function () {
                    ///<summary>
                    /// 加粗字体
                    ///</summary>
                    return this.css({ fontWeight: "bold" });
                }
            });
        })(jQuery);

	调用方式

		$(function(){
			$("p").bold();
		});

###		jQuery(function () { }); 与  (function ($) { })(jQuery);的区别：

	jQuery(function () { });
	//相当于
	$(document).ready(function () { });
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	(function ($) { })(jQuery);
	//相当于
	var fn = function ($) { };
	fn(jQuery);

jQuery(function () { });是某个DOM元素加载完毕后执行方法里的代码。

(function ($) { })(jQuery); 定义了一个匿名函数，其中jQuery代表这个匿名函数的实参。通常用在JQuery插件开发中，起到了定义插件的私有域的作用。

##		自执行的匿名函数/闭包

-	什么是自执行的匿名函数
	
	形如: (function(){//code})()的函数

-	error——为什么(function {// code})();可以被执行, 而function {// code}();却会报错?

	  (1). 首先, 要清楚两者的区别:     
			(function {//...})是表达式, function {//...}是函数声明.     
      (2). 其次, js"预编译"的特点:     
			js在"预编译"阶段, 会解释函数声明, 但却会忽略表达式. 

	  (3). 当js执行到function() {//code}();时, 由于function() {//code}在"预编译"阶段已经被解释过, js会跳过function(){//code}, 试图去执行(); 故会报错;   
  
    当js执行到(function {// code})();时, 由于(function {// code})是表达式, js会去对它求解得到返回值, 由于返回值是一 个函数, 故而遇到();时, 便会被执行.   


##		一步一步封装JQuery插件

尝试写一个高亮的插件:

1.	定一个闭包区间，防止插件"污染"
	
		//闭包限定命名空间
		(function($){
			
		})(window.jQuery);
2.	jQuery.fn.extend(object)扩展jquery方法，制作插件

		//闭包限定命名空间
		(function($){
			$.fn.extend({
				"heightLight":function(options){
					//do something
				}
			});
		})(window.jQuery)

3.  给插件默认参数，实现 插件的功能
	
		//闭包限定命名空间
		(function ($){
			$.fn.extend({
				"highLight":function(options){
					var opts = $.extend({},defaluts,options);//使用jQuery.extend覆盖插件默认参数
					this.each(function(){//这里的this就是Jquery对象
						//遍历所有的要高亮的dom，当调用highLight()插件的是一个集合的时候
						var $this = $(this);//获取当前dom的jQuery对象，这里的this是当前循环的dom
						//根据参数来设置dom的样式
						$this.css({
							backgroundColor:opts.background,
							color:opts.foreground
						});
					});
				}
			});
				
			 //默认参数
		    var defaluts = {
		        foreground: 'red',
		        background: 'yellow'
		    };	

		})(window.jQuery)

	到这一步，高亮插件基本功能已经具备了，调用代码如下：
		
		$(function(){
			$("p").heightLight();//调用自定义的高亮插件
		})
		
	这里只能直接调用，不能链式调用。但是jQuery是可以链式调用的，就是可以在一个Jquery上调用多个方法，如:
		
		$("#id").css({marginTop:'100px'}).addAttr("title","测试");
	
	但是，我们上面的插件，就不能这样链式调用。比如:
	
		$("p").highLight().css({marginTop:'100px'});
		//将会报找不到css方法，原因是我们在完成功能后，没有将jQuery没有返回出来。
	
	接下来，return jQuery对象，让我们的插件也支持链式调用。(其实很简单，就是在执行完我们插件代码的时候将jQuery对象return出来。和上面代码没什么区别)
	
		//闭包限定命名空间
		(function($){
			$.fn.extend({
				"highLight":function(options){
					//使用jQuery.extend覆盖插件默认参数
					var opts = $.extend({},defaluts,options);
					//遍历高亮的doom，当调用highLight()插件是一个集合的时候
					return this.each(function(){
						//获取当前的dom的jquery对象，这里this是当前循环的dom
						var $this = $(this);
						//根据参数来设定dom的样式
						$this.css({
							backgroundColor:opts.background,
							color:opts.foreground
						});
					});
				}
			});
			//默认参数
			var defaults = {
				foreground:"red",
				background:"yellow"
			};
		
		})(window.jQuery);
	
	这样就实现了链式调用，加上return 返回jQuery对象就可以实现链式调用。

4.	暴露公共方法，给别人来扩展你的插件(如果有需求的话)

	比如高亮插件有一个format方法来格式化高亮文本，否则我们可以写成公共，暴露给插件使用者，不同的使用者会根据自己需求来重写format方法，从而使高亮文本呈现不同的格式。
		
		//公共的格式化 方法. 默认是加粗，用户可以通过覆盖该方法达到不同的格式化效果。
	    $.fn.highLight.format = function (str) {
	        return "<strong>" + str + "</strong>"; 
	    }
5.	插件的私有方法
	
	有些时候，我们插件需要一些私有方法，不能被外界访问。例如 我们插件里面需要有个方法来检测用户调用插件时传入的参数是否符合规范。

6.	其他的一些设置，如：为你的插件加入元数据插件的支持使其变得更加强大。

完成的插件，包含公共方法和私有方法

	//闭包限定命名空间
	(function ($) {
	    $.fn.extend({
	        "highLight": function (options) {
	            //检测用户传进来的参数是否合法
	            if (!isValid(options))
	                return this;
	            var opts = $.extend({}, defaluts, options); //使用jQuery.extend 覆盖插件默认参数
	            return this.each(function () {  //这里的this 就是 jQuery对象。这里return 为了支持链式调用
	                //遍历所有的要高亮的dom,当调用 highLight()插件的是一个集合的时候。
	                var $this = $(this); //获取当前dom 的 jQuery对象，这里的this是当前循环的dom
	                //根据参数来设置 dom的样式
	                $this.css({
	                    backgroundColor: opts.background,
	                    color: opts.foreground
	                });
	                //格式化高亮文本
	                var markup = $this.html();
	                markup = $.fn.highLight.format(markup);
	                $this.html(markup);
	            });
	
	        }
	    });
	    //默认参数
	    var defaluts = {
	        foreground: 'red',
	        background: 'yellow'
	    };
	    //公共的格式化 方法. 默认是加粗，用户可以通过覆盖该方法达到不同的格式化效果。
	    $.fn.highLight.format = function (str) {
	        return "<strong>" + str + "</strong>";
	    }
	    //私有方法，检测参数是否合法
	    function isValid(options) {
	        return !options || (options && typeof options === "object") ? true : false;
	    }
	})(window.jQuery);

调用:

    //调用者覆盖 插件暴露的共公方法
    $.fn.highLight.format = function (txt) {
         return "<em>" + txt + "</em>"
    }
    $(function (){
        $("p").highLight({ foreground: 'orange', background: '#ccc' }); //调用自定义 高亮插件
    });