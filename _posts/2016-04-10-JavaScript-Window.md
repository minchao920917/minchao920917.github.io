---
layout: post
title:  "Window对象"
date:   2016-04-10 23:11:54
categories: JavaScript
tags: JavaScript
excerpt:	Window对象在客户端的JavaScript中扮演核心角色：它是客户端JavaScript程序的全局对象。
mathjax: true
author:	闵超
---

* content
{:toc}

#		Window对象
Window对象在客户端的JavaScript中扮演核心角色：它是客户端JavaScript程序的全局对象。

##		计时器
setTimeout()和setInterval()可以用来注册在指定的时间之后单次或重复调用的函数。
因为它们都是客户端JavaScript中的重要全局函数，所以定义为Window对象的方法，但作为通用函数，其实不会对窗口做什么事情。

Window对象的setTimeout()方法用来实现一个函数在指定的毫秒数之后运行。

setTimeout()返回一个值，这个值可以传递给clearTimeout()用于取消这个函数的执行。

setInterval()和setTimeout()一样，只不过这个函数会在指定毫秒数的间隔里重复调用：

	setInterval(udpateClock,6000);//每60秒调用一次updateClock()

##		浏览器定位和导航
Window对象的location属性引用的是Location对象，它表示该窗口中当前显示的文档的URL，并定义了方法来使窗口载入新的文档。

Document对象的location属性也引用到Location对象：
	
	window.location === document.location //true

Document对象也有一个URL属性，是文档首次载入后保存该文档的URL的静态字符串。

###		解析URL
Window对象的location属性引用的是Location对象，它表示该窗口中当前显示的文档的URL。Location对象的href属性是一个字符串，后者包含URL的完整文本。Location对象的toString()方法返回href属性的值，因此在会隐式调用toString()的情况下，可以使用location代替location.href。

这个对象的其他属性——protocol，host，hostname，port，partname和search。分别表示URL的各个部分。这些是“URL分解”属性。

Location对象的hash和search属性比较有趣。如果有的话，hash属性返回URL中的"片段标识符"部分。search属性也类似，它返回的是问号之后的URL，这部分通常是某种类型的查询符串。一般来说，这部分内容是用来参数化URL并在其中嵌入参数的。

###		载入新的文档
Location对象的assign()可以使窗口载入并显示你指定的URL中的文档。replace()方法也类似，但它在载入新文档之前会从浏览历史中把当前文档删除。如果脚本无条件地载入一个新文档，replace()方法可能是比assgin()方法更好的选择。

	//如果浏览器不支持XMLHttpRequest对象
	//则将其重定向到一个不需要Ajax的静态页面
	if (!XMLHttpRequest) location.replace("staticpage.html");

这个例子中传入replace()的一个相对URL。相对URL是相当于当前页面所在目录来解析的，就像将它们用于一个超链接中。除了assgin()和replace()方法，Loading对象还定义了reload()方法，后者可以让浏览器重新载入当前文档。

使用浏览器跳转到新页面的一种更新传统的方法是直接把新的URL赋给location属性：

	location = "http://www.oreilly.com";//在此网站
	location = "page2.html"；//载入下一个页面
	
	location = "#top"; //跳转到文档的顶部

	location.search = "?page=" + (pagenum+1);//载入下一个页面

###		浏览历史
Window对象的history属性引用的是该窗口的History对象。History对象是用来把窗口的浏览历史用文档和文档状态列表的形式表示。History对象的length属性表示浏览历史列表中的元素数量。
	
	history.go(-2); //后退两个历史记录，相当于单击"后退"按钮两次

##		浏览器和屏幕信息
脚本有时候需要获取和它们所在的Web浏览器或浏览器所在的桌面相关的信息。
比如Window对象的navigator和screen属性。它们分别引用的是Navigator和Screen对象。

###		Navigator对象
Window对象的navigator属性引用的是包含浏览器厂商版本信息的Navigator对象。
Navigator对象的命名是为了纪念Netscape之后Navigator浏览器，不过所有其他浏览器也支持它。

-	appName
	
	Web浏览器的全称。IE中，这就是"Microsoft Internet Explorer"。在Firefox中，该属性就是"Netscape"。为了兼容现存的浏览器嗅探代码，其他浏览器通常也取值为"Netscape"。

-	appVersion
	
	此属性通常以数字开始，并跟着包含浏览器厂商和版本信息的详细字符串。字符串前面的数字通常是4.0或5.0，表示第4或第5带兼容的浏览器。appVersion字符串没有标准的格式，所以，没有办法直接用它来判断浏览器的类型。

-	userAgent

	浏览器在它的USER-AGENT HTTP头部中发送的字符串。这个属性通常包含appVersion中的所有信息没并且常常也可能包含其他的细节。

-	platform
		
	在其上运行浏览器的操作系统(并且可能是硬件)的字符串。

###		Screen对象
Window对象的screen属性引用的是Screen对象。它提供有关窗口显示的大小和可用的颜色数量的信息。属性withd和height指定的是以像素为单位的窗口大小。

属性availWidth和availHeight指定的是实际可用的显示大小，它们排除了像桌面任务栏这样的特性所占用的空间。属性colorDepth指定的是显示的BPP值。

window.screen属性和它引用的Screen对象都是非标准但广泛实现的。

##		对话框
Window对象提供了3个方法来向用户显示简单的对话框。

alert()向用户显示一条消息并等待用户关闭对话框。

comfirm()也是显示一条消息，要求用户单击"确定"或"取消"按钮，并返回一个布尔值。

prompt()同样也显示一条消息，等待用户输入字符串，并返回那个字符串。

尽管alert()、confirm()和prompt()方法都很容易使用，但是良好的设计还是需要有节制地使用它们。
除了这三个以外，还要一个更复杂的方法showModalDialog()。显示一个包含HTML格式的"模态对话框"，可以给它传入参数。以及从对话框里面返回值。


## 		错误处理
Window对象的onerror属性是一个事件处理程序，当未捕获的异常传播到调用栈上时就会调用它，并把错误消息输出到浏览器的JavaScript控制台上。如果给这个属性赋一个函数，那么只要这个窗口中发生了JavaScript错误，就会调用该函数，即它成了窗口的错误程序。
	
	/在一个对话框中弹出错误消息，但不超过三次
	window.onerror = function(msg,url,line){
		if(onerror.num++ < onerror.max){
			alert("ERROR:" + msg + "\n" + url + ":" + line);
			return true;
		}
	}
	onerror.max = 3;
	onerror.num = 0;

##		作为Window对象属性的文档元素
如果在HTML文档中用id属性来为元素命名，并且如果Window对象没有此名字的属性，Window对象会赋予一个属性，它的名字是id属性的值，而它们的值指向表示文档元素的HTMLElement对象。

Window对象是全局对象的形式存在于作用域链的最上层，这就意味着在HTML文档中使用的id属性会成为可以被脚本访问的全局变量。如果文档包含一个&lt;button id="okay" &gt;元素，可以通过全局变量okay来引用元素。

但是，如果是已经具有此名字的属性，就不会发生如id是"history"、"location"或"navigator"的元素，就不会以全局变量的形式出现。

##		多窗口和窗体
一个Web浏览器窗口可能在桌面上包含多个标签页，每一个标签页都是独立的"浏览上下文"，每一个上下文都有独立的Window对象，而且相互之间互不干扰。

###		打开和关闭窗口
使用Window对象的open()方法可以打开一个新的浏览器窗口(或标签页，这通常和浏览器的配置选项有关)。Window.open()载入指定的URL到新的或已经存在的窗口中，并返回代表那个窗口的Window对象。

open()的第一个参数是在新文档中显示文档的URL，如果这个参数省略了，或是空字符串，那么就会使用空白页的URL about:blank。

open()第二个参数是重新打开窗口的名字。如果指定的是一个已经存在的窗口的名字(并且脚本允许跳转到那个窗口)会直接使用已经存在的窗口。否则会打开新的窗口，并将这个指定的名字赋值给它。如果此参数省略，会使用指定的名字"_blank"打开一个新的、未命名的窗口。

open()第三个可选参数是一个以逗号分隔的列表，包含大小和各种属性，用以表明新窗口是如何打开的。如果省略这个参数，那么新窗口就会用一个默认的大小，而且带有一整组标准的UI组件，即菜单栏、状态栏、工具栏等。
	
	var w = window.open("Smallwin.html","smallwin","width=400,height=350,status=yes,resizable=yes");

open()第四个参数只在第二个参数命名的是一个已经存在的窗口中才有用，它是一个布尔值，声明了由第一个参数指定的URL是应用替换掉窗口浏览历史的当前条目(true),还是应该在窗口浏览历史中创建一个新的条目(false),后者是默认值。

	var w = window.open();			//打开一个新的空白窗口
	w.alert("About to visit htp://example.com");//调用alert()方法
	w.location = "http://example.com";	//设置它的location属性。

关闭窗口

就像方法open()打开一个新窗口一样，方法close()将关闭一个窗口。如果已经创建了window对象w，可以直接使用
	
	w.close() //将w关闭

###		窗体之间的关系

我们已经知道Window对象的方法open()返回代表新建的窗口的Window对象。而且这个新窗口具有opener属性，该属性可以打开它的原始窗口。这样，两个窗口就可以相互引用，彼此都可以读取对方的属性或调用对方的方法。窗体也是这样的。

任何窗口或窗体中的JavaScript代码都可以将自己的窗口和窗体引用为window或self。窗体可以用parent属性引用包含它的窗口或窗体的Window对象:
	
	parent.histor.back();
如果一个窗口是顶级窗口或标签，而不是窗体，呢么其parent属性引用的就是这个窗口本身：
	
	parent == self;//只有顶级窗口才会返回true

###		交互窗口中的JavaScript
每个窗口和窗体都是它自身的JavaScript执行上下文，以Windwo作为全局对象。但是如果一个窗口或窗体中的代码可以应用到其他窗口或窗体，那么一个窗体或脚本就可以和其他窗口或窗体中的脚本进行交互。

设想一个Web页面里有两个iframe元素，分别叫A和B，并假设这些窗体包含的文档来自同一个服务器，并且包含交互脚本。窗体A里面脚本定义了一个变量i:
	
	var i = 3;
这个变量只是全局对象的一个属性，也是Window对象的一个属性。窗体A中的代码可以用标识符i来引用变量，或者用window对象显式地引用这个变量：
	
	window.i
由于B窗体中的脚本可以引用窗体A的Window的对象，因此它也可以引用那个Window对象的属性：
	
	parent.A.i = 4;//改变窗体A中的变量i值。

	parent.B.f()//调用B窗体中定义的一个函数

	var f = parent.B.f;//A窗体中使用B窗体的函数f