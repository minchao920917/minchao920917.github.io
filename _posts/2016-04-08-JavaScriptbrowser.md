---
layout: post
title:  "客户端的JavaScript(浏览器中的JavaScript)"
date:   2016-04-08 23:22:54
categories: JavaScript
tags: JavaScript
excerpt:	之前我们学习了JavaScript的语言核心。以及JavaScript在服务端的应用（简单粗糙的了解），现在，让我们把目光从基础语言核心拿到实际应用上来。JavaScript在客户端的应用中，我们会介绍大量的脚本宿主对象，这些对象可以表示浏览器窗口、文档树和文档的内容等。
mathjax: true
author:	闵超
---

* content
{:toc}




#		客户端的JavaScript(浏览器中的JavaScript)

之前我们学习了JavaScript的语言核心。以及JavaScript在服务端的应用（简单粗糙的了解），现在，让我们把目光从基础语言核心拿到实际应用上来。

JavaScript在客户端的应用中，我们会介绍大量的脚本宿主对象，这些对象可以表示浏览器窗口、文档树和文档的内容等。

##		客户端JavaScript

Window对象是所有客户端JavaScript特性和API的主要接入点。它表示Web浏览器的一个窗口或窗体，并且可以用标识符window来引用它。Windo对象定义了一些属性，比如，指代Location对象的location属性，Location对象指定当前显示在窗口中的URL，并允许脚本往窗口里载入新的URL；
	
	//设置location属性，从而跳转到新的Web页面
	window.location = "http://www.oreilly.com/";
Window对象还定义了一些方法，比如alert(),还有setTimeout(),可以注册一个函数，在给定的一段时间之后触发一个回调；
	
	//等待两秒钟,然后说hello
	setTimeout(function(){alert("hello");},2000);
这两个方法，都没有显式地使用window属性。在客户端的JavaScript中，Window对象也是全局对象。这意味着Window对象处于作用域链的顶部，它的属性和方法实际上是全局变量和全局函数。


###		Web文档里的JavaScript
JavaScript程序可以通过Document对象和它包含的Element对象遍历和管理文档内容。它可以通过操作CSS样式和类，修改文档内容的呈现。

也可以通过注册适当的事件处理程序来定义文档元素的行为。内容、呈现和行为的组合叫做动态HTML或DHTML。

Web文档里应当少量地使用JavaScript，因为JavaScript真正的角色是增强用户的浏览体验，使信息的获取和传递更容易。用户的体验不应依赖于JavaScript，但JavaScript可以增强体验。
	
增强体验的方式有如下三种方式
	
-	创建动画和其他视觉效果，巧妙地引导和帮助用户进行页面导航
-	对表格的列进行分组，让用户更容易找到所需要的。
-	隐藏某些内容，当用户"深入"到内容里面时，再逐渐展示详细信息。

###		Web应用里的JavaScript
Web浏览器已经有了很好的发展，现在已经不仅仅是作为显示文档的工具角色了，而逐渐变成了一个简易的操作系统。
Web浏览器允许在工具栏和文件夹中组织书签(表示文档和Web应用)。系统可以在一个窗口里运行多个应用；

操作系统定义了很多底层网络API、提供绘制图像、保存文件等功能。Web浏览器也定义了底层网络API、保存数据和绘制图像。

谨记Web浏览器简单的操作系统的概念，就可以把Web应用定义为用JavaScript访问更多浏览器提供的高级服务（比如网络、图像和数据存储）的Web页面。

浏览器也有很多其他特性的API，如地理位置信息、历史管理和后台线程。

JavaScript增强了Web文档，但是设计良好的文档需要在禁用JavaScript后还能继续工作。Web应用本质上就是JavaScript程序，后者使用由Wbe浏览器提供操作系统类型的服务，并且不用期望它们在禁用浏览器脚本后还能正常工作。

###		在HTML里嵌入JavaScript
在HTML文档里嵌入客户端JavaScript代码有4种方法：

-	内联，放置在&lt;script&gt;和&lt;/script&gt;标签对之间。
-	放置在由&lt;script\&gt;标签的src属性指定的外部文件中。
-	放置在HTML事件处理程序中，该事件处理程序由onclick或onmouseover这样的HTML属性值指定。
-	放在一个URL里，这个URL使用特殊的"javascript:"协议。
接下来的小节会逐一解释这4中JavaScript前提高技术。但是，HTML事件处理程序属性和JavaScript:URL这两种方式在现在JavaScript代码已经很少使用(它们在Web早期多少有点通用)。 

###		&lt;script&gt;元素
JavaScript代码可以以内联的形式出现在HTML文件里&lt;script&gt;和&lt;/script&gt;标签之间。会被当做其他内容一样对待。会被解释成XML标记。

###		src形式导入
src的优点：
-	可以把大块JavaScript代码从HTML文件中删除，这有助于保持内容和行为的分离，从而简化HTML文件
-	如果多个Web页面共用相同的JavaScript代码，用src属性可以让你只管理一份代码，而不用在代码改变时，编辑每一个HTML文件。
-	如果一个JavaScript代码文件由多个页面共享，只需要下载它一次，通过使用它的第一个页面——随后的页面可以从浏览器缓存检索它。
-	由src属性的值可以是任意的URL，因此，来自一个Web服务器的JavaScript程序或Web页面可以使用由另一个Web服务器输出的代码。很多互联网广告依赖于此。
-	从其他网站载入脚本的能力，可以让我们更好地利用缓存。

###		HTML中的事件处理程序
当脚本所在的HTML文件被载入浏览器时，这个脚本里的JavaScript代码只会执行一次。为了交互，JavaScript程序必须定义事件处理程序——Web浏览器先注册JavaScript函数，并在调用它作为事件的响应(比如用户输入)。

###		URL中的JavaScript
	
	<a href= "javascript:new Date().toLocaleTimeString();">
		What time os ot?</a>

##		JavaScript程序的执行
客户端JavaScript程序没有严格的定义。我们可以说JavaScript程序是右Web页面中所包含的所有JavaScript代码(内联脚本、HTML事件处理程序和javas：URL)和通过src引用外部代码组成。所有这些单独的代码共用同一个全局Window对象。这意味着它们可以看到相同的Document对象，可以共享相同的全局函数和变量的集合;如果一个脚本定义了新的全局变量或函数，那么这个变量或函数会在脚本执行之后对任意JavaScript代码可见。

JavaScript程序的执行有两个阶段。

第一阶段，载入文档内容，并执行&lt;script&gt;元素离的代码(包括内联脚本和外部脚本)。脚本通常会按照它们在文档里的出现顺序执行。所有脚本里的JavaScript代码都是从上往下，按照它在条件、循环以及其他控制语句中出现的顺序执行。

第二阶段，这个阶段是异步的，是由事件驱动的。在事件驱动阶段，Web浏览器调用事件处理程序函数(由第一阶段里执行的脚本指定的HTML事件处理程序，或之前调用的事件处理程序来定义)，来响应异步发生的事件。调用事件处理程序通常是响应用户输入(如单击鼠标，键盘按下等)。还可以由网络活动、运行时间或者JavaScript代码中的错误来触发。

###		同步、异步和延迟的脚本
JavaScript第一次添加到Web浏览器时，还没有API可以用来遍历和操作文档的结构和内容。当文档还在载入时，JavaScript影响文档内容的唯一方法是快速生成内容。它使用document.write()方法来完成上述任务。

脚本的执行只在默认情况下是同步和阻塞的。&lt;script&gt;标签可以有defer和async属性，在浏览器里，可以改变脚本的执行方式，这些都是布尔属性，没有值；直接使用出现即可。
defer和async属性就像在告诉浏览器链接进来的脚本不会使用document.write()也不会生成文档内容，因此浏览器可以在下载脚本时继续解析和渲染文档。defer属性使得浏览器延迟脚本的执行，直到文档的载入和解析完成，并可以操作。async属性使得浏览器可以尽快地执行脚本，而不用在下载脚本时阻塞文档解析。

###		事件驱动的JavaScript
古老的JavaScript程序是同步载入的程序：在页面载入时开始执行，生成一些输出，然后结束。这种类型的程序在今天已经不常见了。反之，我们通过注册事件处理程序来写程序，之后在注册的事件发生时异步调用这个些函数。

对于大部分浏览器中的大部分事件来说，会把一个对象传递给事件处理程序作为参数，那个对象的属性提供了事件的详细信息。比如，传递给单击事件的对象，会有一个属性说明鼠标的哪个按钮被单击。

###		客户端JavaScript线程模型
JavaScript语言核心并不包含任何线程机制，并且客户端JavaScript传统上也没有定义任何线程机制。HTML5定义了一种作为后台线程的"WebWorker",但是客户端JavaScript还像严格的单线程一样工作。甚至可能并发执行的时候，客户端JavaScript也不会知晓是否真的有并行逻辑的执行。

###		客户端JavaScript时间线
我们已经看到了，JavaScript程序从脚本执行阶段开始，然后切换到事件处理阶段。

1.	Web浏览器创建Document对象，并且返回开始解析Web页面，解析HTML元素和它们的文本内容后添加Element对象和Text节点到文档中。在这个阶段document.readystate属性值是"loading"。
2.	当HTML解析器遇到没有async和defer属性的&lt;script&gt;元素时，它把这些元素添加到文档中，然后执行行内或外部脚本。这些脚本会同步执行，并且在脚本下载和执行解析器会暂停。这样脚本就可以用document.write()来把文档插入到输出流中。解析器恢复时这些文本会成为文档的一部分。同步脚本经常简单定义函数和注册后面使用的注册事件处理程序，但它们可以遍历和操作文档树，因为在它们执行时已经存在了。
3.	当解析器遇到设置了async属性的&lt;script&gt;时，它开始下载脚本文本，并继续解析文档。脚本会在它下载完成后尽快执行，但是解析器没有停下等它下载。异步脚本禁止使用document.write()方法。它们可以看到自己的&lt;script&gt;元素和它之前的文档元素，并且可能或干脆可能访问其他的文档内容。
4.	当文档完成解析，document.readyState属性变成"interactive"。
5.	所有由defer属性的脚本，会按他么在文档里的出现顺序执行。异步脚本可能也会在这个时间执行。延迟脚本能访问完整的文档树，禁止使用document.write()方法
6.	浏览器对象上触发DOMContentLoaded事件。这标志着程序执行从同步脚本执行阶段转换到异步事件驱动阶段。但要注意，这时可能还有异步脚本没有执行完成。
7.	这是，文档已经完全解析完成，但是浏览器可能还在等待其他内容载入，比如图片。当所有这些内容完成载入时，并且所有异步脚本完成载入和执行，document.readyState属性改变为"complete",Web浏览器触发Window事件对象上的load事件。
8.	从此刻起，会调用异步事件，以异步响应用户输入事件、网络事件、计时器过期等。

注：兼容性和互用性、可访问性、安全性、客户端框架，这些后面会单独介绍。