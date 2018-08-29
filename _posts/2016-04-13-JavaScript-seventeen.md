---
layout: post
title:  "事件处理"
date:   2016-04-13 23:33:54
categories: JavaScript
tags: JavaScript
excerpt:	客户端JavaScript程序采用了异步事件驱动编程模型。在这种程序设计风格下，当文档、浏览器、元素或与之相关的对象发生某些有趣的事情时，Web浏览器就会产生事件(event)。
mathjax: true
author:	闵超
---

* content
{:toc}

#		事件处理
客户端JavaScript程序采用了异步事件驱动编程模型。在这种程序设计风格下，当文档、浏览器、元素或与之相关的对象发生某些有趣的事情时，Web浏览器就会产生事件(event)。例如，当Web浏览器加载完文档、用户把鼠标指针移到超链接上或敲击键盘时。Web浏览器都会产生事件。如果JavaScript应用程序关注特定类型的事件，那么它可以注册当这类事件发生时要调用的一个或多个函数。

事件类型(event type)是一个用来说明发生什么类型事件的字符串。例如，"mousemove"表示用户移动鼠标，"keydown"表示键盘上某个键被按下，而"load"表示文档(或某个其他资源)从网络上加载完毕。由于事件类型只是一个字符串，因此，实际上有时会被称为"事件名字"。

事件目标(event target)是发生的事件或与之相关的对象。当讲事件时，我们必须同时指明类型和目标。例如，Window上的load事件或`<button>`元素的click事件。在客户端的JavaScript应用程序中，Window、Document和Element对象是最常见的事件目标，但某些事件是由其他类型的对象触发。

事件处理程序(event handler)或事件监听程序(event listener)是处理或响应事件的函数。应用程序通过指明事件类型和事件目标，在Web浏览器中注册它们的事件处理程序函数。

事件对象(event object)是与特定事件相关并且包含有关事件详细信息的对象。事件对象作为参数传递给事件处理程序函数。

事件传播(event propagation)是浏览器决定哪个对象触发其事件处理程序的过程。对于单个对象的特定事件(比如Window对象的load事件)，必须是不能传播的。

事件传播的另外一种形式成为事件捕获(event capturing)，在容器元素上注册的特定处理程序有机会在事件传播到真是目标之前拦截(或"捕获")它。


特定的事件类型包括：

-	文档加载和准备就绪事件
-	鼠标事件
-	鼠标滚轮事件
-	拖放事件
-	键盘事件
-	文本输入事件

##		事件类型
Web初期，客户端的程序员只能用少部分事件，比如"load"、"click"和"mouseover"等。这些传统事件类型在所有浏览器中得到了很好的支持。随着Web平台发展到包括更强大的API，事件集合越来越大。
新事件有三个来源:

-	3级DOM事件规范，经过长期的停滞之后，W3C带动下又开始换发生机。

-	HTML5规范及相关衍生规范的大量新API定义了新事件，比如历史管理、拖放、跨文档通信，以及视频和音频的播放。

-	基于触摸和支持JavaScript的移动设备的出现，比如Ipone，它们需要定义新的触摸和手势事件类型。


###		传统的事件类型
-	表单事件
	
	`<form>`元素会分别处罚submit和reset事件。
-	Window事件
	
	Window事件是指事件的发生与浏览器窗口中显示的任何特定文档内容相关。
	
	load事件是这些事件中最重要的一个，当文档和其所有外部资源完全加载并显示给用户时就会触发它。

	unload事件是load事件的相对事件，当用户离开当前文档转向其他文档时触发。

	Window对象的onerror属性有点像事件处理程序，当JavaScript出错时会触发它。

-	鼠标事件
	
	当用户在文档上移动或者单击鼠标时都会产生鼠标事件。这些事件在鼠标指针所对应的最深嵌套元素上触发。但它们会冒泡直到文档最顶层。传递给鼠标事件处理程序的事件对象有属性集。

	mousemove事件。用户每次移动或拖动鼠标时会触发。这些事件的发生非常频繁，因此不能用于触发计算密集型任务。

	mosuedown和mouseuo。用户按下或释放鼠标按键是，糊触发。通过注册mousedown和mosuemove事件处理程序，可以探测和响应鼠标的拖动。合理地这样做能够不过鼠标事件。甚至当鼠标从开始元素移出时我们都能够持续地接受到mousemove事件。

	在mousedown和mosueup事件队列之后，浏览器也会触发click事件。如果用户在较短的时间内连续两次单击鼠标按键，跟在第二个click事件之后的是dbclick事件。

	mouseover和mouseout事件，当鼠标指针从悬停到新元素上时，浏览器会在该元素上触发mouseover事件。当鼠标指针不在悬停在某个元素上时，浏览器会触发mouseout事件。

	mouseenter和mouseleave。用于判断鼠标指针是离开了这个元素还是移到了另一个元素。

-	键盘事件
	
	当键盘聚焦到Web浏览器时，用户每次按下或释放键盘上的按键时都会产生事件。键盘快捷键对于操作系统和浏览器本身有特殊意义，它们经常被操作系统或浏览器"吃掉"并对JavaScript事件处理程序不可见。
	
	传递给键盘事件处理程序的事件对象有keyCode字段，它指定按下或释放的键是哪个。除了keyCode，键盘事件对象也有altKey、CtrlKey、metaKey和shiftKey，描述键盘辅助键的状态。

	所有浏览器都支持keydown、keyup和keypress事件，但有一些互用性问题，因为事件对象的keyCode属性值从未标准化过。

###		DOM事件
	
标准化了冒泡的mouseenter和mouseleave事件来取代不冒泡的mouseover和mouseout事件。

###		HTML5事件
HTML5及相关标准定义了大量新的Web应用API，其中许多API都定义了事件。

由于HTML5中加入了播放音频和视频的`<audio>`和`<video>`元素。这些元素有长长的事件列表，它们触发各种关于网络事件、数据缓冲状况和播放状态的通知：
	
	canplay 		loadeddata		playing 		stalled
	canplaythrough	loadedmetadata	progress		suspend
	durationchange	loadstart		ratechange		timeupdate
	emptied 		pause 			seeked 			volumechange
	ended			play			seeking			waiting

HTML5的拖放API允许JavaScript应用参与操作系统的拖放操作，实现Web和原生应用间的数据传输。
	
	dragstart 		drag 		dragend
	dragenter		dragover	dragleave
	drop
触发拖放事件对象和通过鼠标事件来发送的对象类似，其附加属性dataTransfer持有DataTransfer对象，它包含关于传输的数据和其中可用的格式的信息。

HTML5包含了对离线Web应用的支持，它们可以安装到本地应用缓存中，所以即使浏览器离线时它们依旧能运行，比如何时浏览器失去或得到网络连接都会在Window对象上触发它们。
	
	cached	checking 	downloading 	error
	noupdate	obsolete 	progress	updateready


###		触摸屏和移动设备事件
强大的移动设备的广泛采用(特别时使用触摸屏的那些设备)需要建立新的事件类别。在许多情况下，触摸屏事件映射到传统的事件类型(click和srcoll)，但不是每次和触摸屏UI的交互都能仿效鼠标，也不是所有的触摸屏都可以当作鼠标事件处理。

手势是高级事件，用于通知已经翻译的手势。如果想实现自定义手势，你可以监听低级触摸事件。当手指接触屏幕的时候会触发touchstart事件，当手指移动时会触发touchmove事件，而当手指离开屏幕时会触发touchend事件。

当用户允许用户从竖屏旋转到横屏时会在Window对象上触发orientationchanged事件，该事件传递的事件对象本身没有用，但是，在移动版的Safari中，Window对象的orientation属性能给出当前方位，其值时0、90、180或-90。

##		注册事件处理程序
注册事件处理程序有两种基本方式。

第一种方式出现在Web初期，给事件目标对象或文档元素设置属性。

第二种方式时更新并且更通用，是将事件处理程序传递给对象或元素。复杂的是，每种技术都有两个版本，可以在JavaScript代码中设置事件处理程序为对象属性，或对于文档元素，可以在HTML中直接设置相应属性。

对于通过方法调用的处理程序注册，有一个标准方法，命名为**addEventListener()**,除IE8及以前版本之外，所有浏览器都支持这种方式，而IE9之前的版本支持的是一个叫attachEvent()的不同方法。

###		设置JavaScript对象属性为事件处理程序

注册事件处理程序最简单的方式就是通过设置目标的属性为所需事件处理程序函数。按照约定，事件处理程序属性的名字由"on"后面跟着事件名称组成:onclick、onchange、onload、onmouseover等。

###		设置HTML标签属性为事件处理程序

HTML5规范章程草案定义了这类事件处理程序的完整列表：
	
	onafterprint	onfocus		oninline		onresize
	onbeforeprint	onhashchange	onpagehide	onstorage
	onbeforeunload	onload		onpageshow		onundo
	onblur		onmessage		onpopstate		onunload
	onerror		onnoffline		onredo

**程序员应该谨记这条规则：禁止(或至少避免)使用HTML事件处理程序属性，因为这些属性直接混合了JavaScript和HTML**

###		addEventListener()
除IE8及之前版本之外的所有浏览器都支持的标准事件模型中，任何能成为事件目标的对象——这些对象包括Window对象、Document对象和所有文档元素都定义了一个名叫addEventListener()的方法。使用这个方法可以为事件目标注册事件处理程序。

相对addEventListener()的是removeEventListener()方法。同样接受三个参数，从对象中删除事件处理程序。

###		attachEvenet()
IE9之前不支持addEventListener()和removeEventListener()。IE5及以后版本定义了类似的attachEvent()和detachEvent()。

attachEvent()和detachEvent()方法的工作原理与addEventListener()和removeEventListener()类似，但也有如下区别:

-	因为IE事件模型不支持事件捕获，所有attachEvent()和detachEvent()要求只有两个参数：事件类型和处理程序函数。
-	IE方法的第一个参数使用了带"on"前缀的事件处理程序属性名，而非没有前缀的事件类型。例如，当给addEventListener()传递"click"时，要给attachEvent()传递"onclick"。
-	attachEvent()允许相同的事件处理程序函数注册多次。当特定的事件类型发生时，注册函数的调用次数和注册次数一样。


##		事件处理程序的调用
一旦注册了事件处理程序，浏览器会在指定的对象上发生指定类型事件时自动调用它。

###		事件处理程序的参数
通常调用事件处理程序时把事件对象作为它们的一个参数(有一个例子，后面会介绍)。事件对象的属性提供了有关事件的详细信息。例如：type属性指定了发生的事件类型。

IE8及以前版本中，通过设置属性注册事件处理程序，当调用它们时并未传递事件对象。取而代之地通过window.event来获取事件对象。处于互通性，你能像下面这样书写事件处理程序。
	
	function handler(event){
		event = event || window.event;
		//处理程序代码出现在这里
	}
向使用attachEvent()注册的事件处理程序传递事件对象，但它们也能使用window.event。

当通过设置HTML属性注册事件处理程序时，浏览器会把JavaScript编码转换到一个函数中。非IE浏览器使用event参数来构造函数，而IE在构造函数时没有要求参数，如果在这样的函数中使用event标识符，那么引用的正式window.event。在这两种情况下，HTML事件处理程序都能作为event引用事件对象。

###		事件处理程序的运行环境
当通过设置属性注册事件处理程序时，看起来像在文档上定义了新方法：
	
	e.onclick = function(){/* 处理程序代码*/};
事件处理程序在事件目标上定义，所以它们作为这个对象的方法来调用，并不出人意料，在事件处理程序内，this关键字指的是事件目标。

甚至当使用addEventListener()注册时，调用的处理程序使用事件目标作为它们的this值。但是对于attchEvent()来说，这就是不对的，使用attachEvent()注册的处理程序作为函数调用，它们的this值时全局(Window)对象。
	
	/*
	*	在指定的事件目标上注册用于处理指定类型事件的处理程序函数
	*	确保处理程序一直作为事件目标的方法调用
	*/
	function addEvent(target,type,handler){
		if(target.addEventListener)
			target.addEventListener(type,handler,false);
		else
			target.attachEvent("on"+type,function(event){
					//把处理程序作为事件目标的方法调用
					//传递事件对象
					return handler.call(target,event);
			});
	}

###		事件处理程序的作用域
像所有的JavaScript函数一样，事件处理程序从词法上讲也是作用域。它们在其定义时的作用域而非调用时的作用域执行。并且它们能存取那个作用域中任何一个本地变量。


###		事件处理程序的返回值
通过设置对下岗属性或HTML属性注册事件处理程序的返回值有事时非常有意义的，通常情况下，返回值false就是告诉浏览器不要执行这个事件相关的默认操作。例如表单提交按钮的onclick事件处理程序能返回false阻止浏览器提交表单。(当用户是输入验证失败时使用)

Window对象的onbeforeunload事件处理程序的返回值也非常有意义。当浏览器将要跳转到新页面时触发这个事件。如果事件处理程序返回一个字符串，那么它将出现在询问客户是否想离开当前页面的标准对话框中。

###		调用顺序

文档元素或其他对象可以为指定事件类型注册多个事件处理程序。当适当的事件发生时，浏览器必须按照如下规则调用所有事件处理程序：
	
-	通过设置对象属性或HTML属性注册的处理程序优先调用。
-	使用addEventListener()注册的处理程序按照它们的注册顺序调用
-	使用attachEvent()注册的处理程序可能按照任何顺序调用，所以代码不应该依赖与调用顺序。

###		事件传播
当事件目标是Window对象或其他一些单独对象时，浏览器简单地通过调用对象上适当地处理程序响应事件。当目标时文档或文档元素时，情况比较复杂。

在调用在目标元素上的事件处理函数后，大部分事件会"冒泡"到DOM树根。调用目标的父元素的事件处理程序，然后调用在目标的祖父元素上注册的事件处理程序。

发生在文档元素上的大部分事件都会冒泡，值得注意的例外是focus、blur和scroll事件。文档元素上的load事件会冒泡，但它不会在Document对象上停止冒泡而不会传播到Window对象。

js的事件时向上传播的。

	$("div").click(function(event) {  
	    alert("div clicked");  
	}); 
	
	$("p").click(function(event) {  
	    alert("p clicked");  
	}); 
	 
	
	$("span").click(function(event) {  
	    alert("span clicked");  
	});

	<div>
	    <p>hello, <span>world!</span>
	</div>

如果点击world，会一次弹出三个框”span clicked“，”p clicked“，”div clicked“。因为在点击span的时候，span的click事件向上传播到p的onclick函数里，然后再向上传播到div的onclick函数里。

如果点击hello，会一次弹出两个框”p clicked“，”div clicked“。因为在点击p的时候，p的click事件向上传播到div的onclick函数里。

如果点击div，就只会一次弹出一个框”div clicked“。

解决事件向上传播(冒泡)的方法:

-	return false;
	
		$("div").click(function(event) {  
		    alert("div clicked");  
		}); 
		 
		$("p").click(function(event) {  
		    alert("div clicked");
		    return false;  
		}); 
		
		$("span").click(function(event) {  
		    alert("span clicked");  
		    return false;  
		});

-	event.target来识别判断

		$("div").click(function(event) {  
		    if (event.target == this)   
		        alert("div clicked");  
		});  
		
		$("span").click(function(event) { 
		    if (event.target == this) 
		    alert("span clicked");  
		});  
		
		$("span").click(function(event) {  
		    alert("span clicked");  
		});



-	调用even.stopPropagation()方法

	
		$("div").click(function(event) {  
		    alert("div clicked");  
		});  
		$("span").click(function(event) {  
		    alert("span clicked");  
		    event.stopPropagation();  
		});

###		事件取消（即是上面中的阻止冒泡的三种方法达到的目的）
(略查看上面的三种方法)


##		文档加载事件

大部分Web应用都需要Web浏览器通知它们文档加载完毕和为操作准备就绪的时间。Window对象的load事件就是为了这个目的，当文档加载解析完毕且所有延迟(deferred)脚本都执行完毕时会触发DOMContentLoade事件，此时图片和异步(async)脚本可能依旧再加载，但是文档已经操作准备就绪了。

FF引入了这个事件，然后它被包括Microsoft的IE9在内的所有其他浏览器厂商采用，尽管其名字中有DOM,但HTML5标准化了它。

document.readState属性随着文档加载过程而变。在IE中，每次状态改变都伴随着Document对象上的readystatechange事件，当IE接受到"complete"状态时使用这个事件来做判断是可行的。


##		鼠标事件
与鼠标相关的事件有不少，除了"mouseenter"和"mouseleave"外的所有事件都能冒泡。链接和提交按钮上的click事件都是默认操作且能够阻止。可以取消上下文菜单事件来阻止显示上下文菜单。但一些浏览器有配置选项导致不能取消上下文菜单。

1.	click：			高级事件，当用户按下并释放鼠标按键或其他方式"激活元素时触发"
2.	contextmenu:	可以取消的事件，当上下文菜单即将出现时触发。当前浏览器在鼠标右击时显示上下文菜单，所有，这个事件也能像click事件那样使用。
3.	dbclick：		当用户双击鼠标时触发
4.	mousedown:		当用户按下鼠标按键时触发
5.	mouseup：		当用户释放鼠标按键时触发
6.	mousemove：		当用户移动鼠标时触发
7.	mouseover：		当鼠标进入元素时触发
8.	mouseout：		当鼠标离开元素时触发
9.	mouseenter：		类似"mouseover",但不冒泡
10.	mouseleave：		类似"mouseout",但不冒泡


##		鼠标滚轮事件
所有现代浏览器都支持鼠标滚轮，并在用户滚动滚轮时触发事件。浏览器通常使用鼠标滚轮滚动或缩放文档，但可以通过取消mousewheel事件来阻止这些默认操作。

##		拖放事件
拖放(Drag-and-Drop)实在"拖放源(drag source)"和"拖放目标(drop target)"之间传输数据的用户界面，它可以存在相同应用也是不同应用之间。拖放是复杂的人机交互，用于实现拖放的API总是很复杂：
-	它们必须与底层OS结合，使它们能够在不相关的应用间工作。
-	它们必须适用于"移动"、"复制"、"链接"数据传输操作，允许拖放源和拖放目标通过设置限制允许的操作，然后让用户选择(通常使用键盘辅助键)许可设置
-	它们必须为拖放源提供一种方式指定待拖动的图标或图像
-	它们必须为拖放源和拖放目标的交互提供基于事件的通知。

见源码第十七章17-4自定义时间拖放。

##		文本事件

浏览器有3个传统的键盘输入事件。keydown事件是低级事件，keypress事件是较高级的事件，它产生了一个可打印字符。

建议中的textinput事件和已经实现的textInput事件都传递一个简单的事件对象，它有一个用于保存输入文本的data属性。(另一个属性inputMethod是建议用于指定输入源，但它尚未实现)。

通过keypress事件传递的对象更加混乱。一个keypress事件表示输入的单个字符。事件对象以数字Unicode编码的形式指定字符，所以必须用String.fromCharCode()把它转换成字符串。

示例见源码17-7使用propertychange事件探测文本输入

##		键盘事件
当用户在键盘上按下或释放按键时，会发生keydown和keyup事件，它们由辅助键、功能键和数字键产生，如果用户按键事件足够长会导致它开始重复，那么在keyup事件到达之前会收到多个keydown事件。

这些事件对象都有数字属性keyCode，指定了按下的键是哪个。

无论shift键处于什么状态，子母键总是产生大写keyCode值，这是因为它们出现在物理键盘上。

类似鼠标事件对象，键盘事件对象由altKey、ctrlKey和shiftKey属性，当事件发生时，如果对应的辅助键被按下，那么它们会被设置为true。

