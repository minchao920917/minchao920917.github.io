#	jquery类库

JavaScript的核心API设计得很简单，但由于浏览器之间的严重不兼容性，导致客户端的API过于复杂。IE9的到来缓和了这种不兼容性导致的糟糕境况，然而使用JavaScript框架或工具类库，能简化通用操作，能隐藏浏览器之间的差异，这让很多程序员在开发Web应用时变得更简单。

jQuery类库如此广泛地使用，作为Web开发者，我们必须熟悉它：即便没有在自己的代码中使用它，也很有可能在他人写的代码中遇见过。

jQuery足够小巧和稳定，本书就可以把它讲述清楚。

下面就介绍一下jQuery。

##	jQuery的特性

-	丰富强大的语法(CSS选择器)，用来查询文档元素

-	高效的查询方法，用来找到与CSS选择器匹配的文档元素集

-	一套有用的方法，用来操作选中的元素
-	强大的函数式编程技巧，用来批量操作元素集，而不是每次只操作单个
-	简洁的语言用法(链式调用)，用来表示一系列顺序操作


##		jQuery可以用来实现简单查询并操作dom

-	设置HTML属性、CSS样式和类、HTML表单的值和元素内容、位置高宽，以及数据
-	改变文档结构：对元素进行插入、替换、包装和删除操作
-	使用jQurey的跨浏览器事件模型
-	使用jQuery来实现动画视觉效果
-	jQuery的Ajax工具，如何用脚本来发起HTTP请求
-	jQuery的工具函数
-	jQuery选择器的所有语法，以及使用jQuery的高级选择方法
-	如何使用和编写插件来对jQuery进行扩展
-	jQuery UI 类库

##	jQuery基础

jQuery类库定义了一个全局函数:jQuery()。该函数使用频繁，因此在类库中还给它定义了一个快捷别名:$。这是jQuery在全局命名空间中定义的唯一两个变量。

###		jQuey()函数
		
在jQuery类库中，最重要的方法是jQuery()方法(也就是$())。它的功能很强大，有4种不同的调用方式。

1.	第一种是最常调用方式是传递CSS选择器(字符串)给$()方法
	
2.	第二种调用方式是传递一个Element、Document或Window对象给$()方法。例如:$(document)或$(this)

3.	第三种调用方式是传递HTML文本字符串给$()方法。在这种调用方式下，jQuery会根据传入的文本创建好HTML元素并封装为Jquery对象返回。

	在这种情况下，$()也可接收第二参数，可以传递Document对象来指定与所创建元素相关联的文档。例如：

		var img = $("<img/>",		//新建一个<img>元素
					{			
						src:url,	//具有HTML属性
						css:{},		// CSS样式
						click:handleClick	//事件程序有关
					})

	第二个参数对象的属性名是"css"、"html"、"text"、"width"、"height"、"offset"、"val"或"data"或者属性名是jQuery事件处理程序注册方法名时，jQuery将调用新创建元素上的同名方法，并传入属性值。（css()、html()、text()等）

4.	第四种调用方式时传入一个函数给$()方法。此时，当文档加载完毕且DOM可操控时，传入的函数将被调用。

	例如：
			
		jQuery(function(){ //文档加载完毕时调用
			//所有jQuery代码放在这里
		});
有时还可以看见$(f)的老式和完整写法：$(document).ready(f)


##		jQuery术语

1.	"jQuery函数"
	
	jQuery函数时jQuery或$()的值。该函数可以用来创建jQuery对象，用来注册DOM就绪时需要调用的处理程序，还用做jQuery命名空间。

2.	"jQuery对象"

	jQuery对象时由jQuery函数返回的对象。一个jQuery对象表示一组文档元素，也叫"jQuery结果"、"jQuery集"或"包装集"

3.	"jQuery方法"

	jQuery方法是由jQuery函数返回的jQuery对象的方法。jQuery类库最重要的部分就是它定义的这些强大的方法。

注意：jQuery函数和jQuery方法有时很难区分，因为有部分函数和方法的名称是一样的。注意下面这两行代码的差异:

	//jQuery的each()函数用来
	//对数组a种的每一个元素都调用一次函数f
	$.each(a,f)；
	
	//调用jQuery()函数获取表示文档种所有<a>元素的jQuery对象
	//然后调用该jQuery对象的each()方法
	//对选中的每一个元素调用一次函数f
	$("a").each(f);

jQuery官方文档使用类似$.each的命令来表示jQuery函数，用类似.each(带点号但不带美元符号)的命名表示jQuery方法。


##		jQuery的getter和setter方法

jQuery对象上最简单、最常见的操作是获取(get)或设置(set)HTML属性、CSS样式、元素内容和位置高宽的值。

-	jQuery使用同一个方法既当getter用游荡setter用，
-	用做setter时，这些方法会给jQuery对象种的每一个元素设置值，然后返回该jQuery对象以方便链式调用
-	用getter时，这些方法只会查询元素集中的第一个元素，返回单个值
-	用作setter时，这些方法会接受对象参数。
-	用所setter时，这些方法经常接受函数参数

###		获取和设置HTML属性

attr()方法是jQuery中用于HTML属性的getter/setter，它符合上面描述的概要理解中的每一条。
	
	$(img).attr("src","http://baidu.com");

	$().removeAttr();//删除属性

###		获取和设置CSS属性

css()方法和attr()方法类似
	
	$("h1").css("font-weight");//获取h1的字体重量
	$("h1").css("font-weight","bolder");//获取h1的字体重量

###		获取和设置元素内容

$(..).html()、$(..).text()、$(..).val()


###		获取和设置元素的位置高度

	$("div").offset()//获取当前位置
	var position =  $("div").offset().top +100;
	$("div").offset(position)//设置新的位置
	$("div").width()//获取元素的宽度
	$("div").innerWidth()
	$("div").outerWidth()
	$("div").borderWidth()
	$("div").marginWidth()

###		获取和设置元素数据

jQuery定义了一个名为data()的getter/setter方法，可用来设置或获取与文档元素Document或Window对象相关联的数据。

	$("div").data("x",1);//设置一些数据
	$("div.nodata").removeData("x");//删除一些数据
	var x = $("div").data("x")//获取一些数据

##		修改文档结构

###		插入和替换元素

在目标元素的结尾插入内容   append()  	appendTo()
在目标元素的起始处插入内容 preped()  	prepredTo()
在目标元素的后面插入内容  	after()  	insertAfter()
在目标元素的前面插入内容	before()  	insertBefore()
将目标元素替换为内容 		replaceWith()  replaceAll()


###		复制元素

clone()创建并返回每一个选中元素(包含元素所有的子孙)的一个副本

但不会复制事件处理程序和元素关联的其他数据


###		包装元素

wrap()包装每一个选中的元素

wrapInner()包装每一个选中元素的内容

wrapAll()则将选中元素作为一组来包装

这三个方法，通常传入一个新创建的包装元素或用来创新包装元素的HTML字符串。


###		删除元素

empty()会删除每个选中元素的所有子节点，但不会修改元素自身。

remove()方法会从文档中移除选中的元素（以及所有元素的内容）。

通常不调用参数，此时remove()会从文档中删除所有元素。

如果接受一个参数，该参数会被当作选择器，jquery对象中只有匹配到该选择器的元素才会被移除。

remove()方法会移除所有事件监听处理程序以及可能绑定到被移除元素上的其他数据。

detach()方法和remove()方法类似，但不会移除事件处理程序和数据。

unwrap()方法可以用来实现元素的移除，其方式是wrap()或wrapAll()方法的反操作:移除每一个选中元素的父元素，不影响选中元素及其兄弟节点。


##		jQuery处理事件程序

处理事件有时是一个难点IE(IE9以下)实现了一个与其所有其他浏览器不同的事件API。jQuey API具有简单的形式，比标准或IE的事件API更容易使用。jQuery API还有更复杂、功能更齐全的形式，比标准API更强大。

###		事件处理程序的简单注册

jQuery定义了简单的事件注册方法，可用于常用和普适的每一个浏览器事件。

比如，给单机事件注册一个事件处理程序，只要调用click()方法：
	
	//单击任意<p>时，使其背景变成灰色
	$("p").click(function(){
		$(this).css("background-color","gray");
	})

下面时jQuery定义的简单事件处理程序注册的方法:

	/* 焦点事件 */
	blur()//失去焦点 	focusin()//获取焦点	focus()//元素获得焦点时	focusout()//失去焦点

	/* 鼠标事件	*/
	mousedown()//按下鼠标按钮  	mouseup()//松开鼠标按钮  mouseenter()//鼠标指针进入（穿过）元素 	

	mouseleave()//鼠标移出	mousemove()//指定的元素中移动时	mouseout()//鼠标指针从元素上移开

	mouseover()	//鼠标指针位于元素上方时	scroll()//元素滚动 
	
	/*	键盘事件	*/
	keydown()//按下按键 	keypress()//按键次数		keyup()	//按键被松开并复位
	
	/*	元素事件	*/
	change()//发生变化	 click()//单击	select()//文本被选择时 	dbclick()//双击		
	
	/*	页面事件	*/
	resize()//浏览器窗口调整大小进行	submit()//提交表单时	load()//元素（及子元素）已加载时
					
	error()//载入遇到错误		unload()//当用户离开页面时，会发生 unload 事件


focusein和focuseout事件支持冒泡 focuse和blur事件不支持冒泡

mouseover和mouseout事件支持冒泡,  mouseenter和mouseleave是非冒泡事件

这几个事件是最初从IE引入的，jQuery隐式的做了浏览器兼容，以确保它们在所有浏览器下正确工作。

resize和unload事件类型只在Window对象中触发，如果想要给这两个事件类型注册处理程序，应该在$(window)上调用resize（）和unload()方法。

scroll（）方法经常也用在$(window)对象上，但它也可以用在有滚动条的任何元素上。

除了以上的这些，还有两个特殊形式的方法，有时很有用。

hover（）h和toggle()

hover()是用来给mouseenter和mouseleve事件注册处理程序。调用hover（f,g）就和调用mouseenter(f)然后调用mouseleave(g)一样。如果仅传入一个参数给hover()，则该参数函数会同时用enter和leave事件的处理程序。

toggle()该方法将事件处理程序函数绑定到单击事件。可指定两个或多个处理程序函数，当单击事件发生时，jQuery每次会调用一个处理程序函数。


###		jQuery事件处理程序

上面的例子中的事件处理程序函数被当作是不带参数以及不返回值的。像这样书写事件处理程序非常正常，但jQuery调用每一个事件处理程序时的确传入了一个或多个参数，并且对处理程序的返回值进行了处理。

jQuery事件处理程序函数的返回值始终有意义。如果处理程序返回false。该事件相关联的默认行为，以及该事件接下来的冒泡都会被取消。也就是说，返回false等同于调用Event对象的preventDefault和stopPropation()方法。

###		jQuery事件对象

jQuery通过定义自己的Event对象来隐藏浏览器之间的实现差异。当一个jQuery事件处理程序被调用时，总会传入一个jQuery事件对象作为其第一个参数。Jquery事件对象主要以W3C标准为基准，同时它也实现了一些实际的事件标准。

jQuery会将以下字段从原生Event对象中复制到jQuery Event对象上：

	altkey 		ctrlKey 		newValue 		screenX
	attrChange	currentTarget	offsetX			screenY
	attrName	detail			offsetY			shiftKey
	bubbles		eventPhase		originalTarget	srcElement
	button		fromElement 	pageX			target
	cancelable 	keyCode			pageY			toElement
	charCode	layerX			prevValue 		view
	clientX		layerY			relatedNode		wheelDelta
	clientY		metaKey			relatedTarget	which
除了这些属性，Event对象还定义了以下方法:

	preventDefault()			isDefaultPrevented()
	stopPropagation()			isPropagationStopped()
	stopImmediatePropagation()	isImmediatePropagationStopped()

这些事件属性和方法在之前第十七章介绍过。并在第四部分的ref-Event中有详细文档说明。对于一部分字段，jQuery做了特殊处理，使其在所有浏览器中行为一致，需要我们留意:

metaKey
	
如果原生事件对象没有metaKey属性，jQuery会使其与ctrlKey属性的值一样。在Mac OS中，Command键设置meta键的属性

pageX，pageY

如果原生事件对象没有定义这两个属性，但定义了鼠标指针的视口坐标clientX和clientY，jquery会计算出鼠标指针的文档坐标并把它们存储在pageX和pageY中。

target,currentTarget,relatedTarget

target属性表示在其上发生事件的文档元素。如果原生事件对象的目标时文本节点，jQuery返回的目标会替换为包含该文本节点的元素.
currentTarget和target不一样，那么正在处理的事件是从触发它的元素冒泡上来的，此时使用is()方法来检测target元素可能会很有用。
relatedTarget表示其他元素

timeStamp

事件发生时的时间，单位时毫秒，由Date.getTime()方法返回，这个字段时jquery自身设置的，可以解决Firefox中一个长期存在的bug。

which

这是一个非标准事件属性，jQuery做了统一化处理，使其可以用来指明在事件发生期间，按下的是哪个鼠标按钮或键盘按键。

data

如果注册事件处理程序时指定了额外的数据，处理程序可以用该字段的值来访问。

handler

当前正被调用的事件处理程序函数的引用。

result
该事件最近调用的处理程序的返回值，忽略没有返回值的处理程序

originalEvent
浏览器生成的原生事件对象的引用


###		事件处理程序的高级注册

.bind（）绑定一个事件类型字符串和一个方法函数

	$("#id").bind("click",f);

###		注销事件处理程序

.unbind()注销事件处理程序避免在将来的事件中触发它。


###		触发事件

当用户使用鼠标、键盘或触发其他事件类型时，注册事件处理程序会自动调用。然而，如果能手动触发事件，有时会很有哟个，手动触发事件最简单的方式是不带参数调用事件注册的简单方法。如(click()或mouseover())

	$("form").submit();		//和用户单击提交按钮一样

###		实时事件

bind()方法绑定事件处理程序到指定文档元素，就与addEventListner()和attachEvent()一样。



##		动画效果

之前十六章的脚本化css我们知道了，通过设置CSS的visibility属性，可以显示和隐藏元素，

jQuery还定义了fadeIn()和fadeOut()等简单方法来实现视觉效果，除了简单动画方法，jQuery还定义了一个animate()方法。

jQuery动画方法经常使用动画时长来作为第一个可选的参数。如果省略时长参数，通常会得到默认值400ms。注意，省略时长时，有部分方法会立刻跳到最后一帧，没有中间的动画效果:


###		简单动画

fadeIn()、fadeOut()、fadeTo()

show()、hide()、toggle()

slideDown()、slideUp()、slideDown()

###		自定义动画

	$("#id").animate({
		opacity:.25,		//将不透明度调整为0.25
		font-seize：10		//将字体大小变化到10像素
	},{
		?duration:500,		//动画持续半秒
		complete:function(){		//在动画完成时调用该函数
			this.text("Goodble");//改变文本元素
		}
	})

1.	动画属性对象
	
	animate()方法的第一个参数必须是对象，该修啊ing的属性名必须是css属性名，这些属性名必须是动画的目标值

2.	动画选项对象

	animate()方法的第二个参数是可选的，该选项对象用来指定动画如何执行。有两个最重要的选项我们已经接触过。duration属性指定动画持续的毫秒时间，该属性的值还可以是"fast"、"slow"或任何在jquery.fx.speed中定义的名称


###		动画的取消、延迟和队列

jQuery还定义了一些动画和队列相关的方法，我们需要进一步了解。首先是stop()方法；它用来停止选中元素的当前正在执行的任何动画。

	//当鼠标悬浮在图片上时，图片变得不透明
	//注意：我们没有在鼠标事件上持有队列化动画
	$("img").bind({
		mouseover:function(){ $(this).stop().fadeTo(300,1.0);},
		mouseout:function(){$(this).stop().fadeTo(300,0.5);}
	});

与动画相关的第二个方法时delay()。这会直接添加一个时间延迟到动画队列中:第一个参数时时长(以毫秒为单位的数值或字符串),第二个参数是队列名，是可选的。

	//快速淡出为半透明，等一等，然后向上滑动
	$("img").fadeTo(100,0.5).delay(200).slideUp();


##		jQuery中的Ajax

在Web应用编程技术里，Ajax很流行，它使用HTTP脚本(参考第18章)来按需加载数据，而不需要刷新整个页面。在Web应用中，Ajax技术非常有用，因此jQuery内置了Ajax工具来简化使用。

jQuery定义了一个高级工具方法和四个高级工具函数。这些高级工具都基于同一个强大的底层函数:jQuery.ajax()。

###		load()方法

load()是所有jQuery工具中最简单的:向它传入一个URL，它会异步加载该URL的内容，然后将内容插入每一个选中元素中，替换掉已经存在的任何内容。

	//每隔60秒加载并显示最新的状态报告
	setInterval(function(){
		$("#status").load("status_report.html");
	},60000);

除了必须的URL参数，load()方法还接受两个可选的参数，第一个可选的参数表示的数据，可以追加到URL后面，或者与请求一起发送。如果传入的是字符串，则会追加到URL后面(放在"?"或"&"后面)。如果传入对象，该对象会被转化为一个用"&"分隔的名/值对后与请求一起发送。

load()方法的另一个可选参数是回调函数，当Ajax请求成功或未成功，以及(当请求成功时)URL加载完毕并插入选中元素时，会调用该回调函数。


###		jQuery的Ajax状态码

success: 表示请求成功完成

notmodified:	表示请求已正常完成，但服务器返回的响应内容是HTTP 304"Not Modified",表示请求的URL内容和上次请求的相同，没有变化

error: 表示请求没有成功完成，原因是某些HTTP错误，更多细节，可以检查传入每个回调函数中的XMLHttpRequest对象的HTTP状态码来获取

timeout:如果ajax请求没有在选定的时间区域内完成，会调用错误回调，并传入该状态码

parseerror:该状态码表示HTTP请求已成功完成，但jQuery无法按照期望的方式解析


###		Ajax工具函数

jQuery的其他Ajax高级工具不是方法，而是函数，可以通过jQuery或$直接调用，而不是在jQuery对象上调用。jQuery.getScript()加载并执行JavaScript代码文件。jquery.getJSON()加载URL，将其解析未JSON，并将解析结果传递到指定的回调函数中。这两个函数会调用一个更通用的URL获取函数:jQuery.get()。最后，jQuery.post()和jQuery.get()很类似，除了执行的是HTTP POST而不是GET请求，与load()方法一样，所有这些函数都是异步的:在任何数据加载前它们就会返回调用者，加载结果则通过调用指定的回调函数来通知。

1.	jQuery.getScript()
	
	jQuery.getScript()函数的第一个参数是JavaScript代码文件的URL。它会异步加载文件，加载完成后在全局作用域执行该代码，它能同时适用同源和跨源脚本
	
		//从其他服务器动态加载脚本
		jQuery.getScript("http:?/example.com/js/widget.js");

	也可以传入回调函数作为第二个参数，在这种情况下，jQuery会在代码加载和执行完成后调用一次该回调函数:
	
		//加载一个类库，并在加载完成时立刻使用它
		jQuery.getScript("js/jquery.my_plugin.js",function(){
			$("#id").my_plugin();//使用加载的类库
		});

2.	jQuery.getJSON()

	jQuery.getJSON()与jQuery.getScript()类似：它会获取文本，然后特殊处理以下，再调用指定的回调函数。jQuery.getJSON()获取到文本后，不会将其当作脚本执行，而会将其解析未JSON。

		//假设data.json包含文本{"x":1,"y":2}
		jQuery.getJSON("data.json",function(data){
			//data 参数是对象{x:1,y:2}
		})

3.	jQuery.get()和jQuery.post()

	jQuery.get()和jQuery.post()获取指定URL的内容，如果有数据的话，还可传入指定数据，最后则将结果传递给指定的回调函数。jQuery.get()使用HTTP GET请求来实现，jQuery.post()使用HTTP POST请求，其他两者都是一样的。
		
		//从服务器请求文本，并在警告对话框中显示
		jQuery.get("debu.txt",alert);


###		jQuery的Ajax的数据类型

可以给get()和post()传递下面6中类型作为参数。

"text"
	
将服务器的响应作为纯文本返回，不做任何处理
	
"html"

该类型和"text"一样，响应的是纯文本，load()方法使用该类型，将返回的文本插入到文档自身中

"xml"

请求的URL被认为指向XML格式的数据，jQuery使用XMLHttpRequest对象的responseText属性。传给回调函数的值是一个表示该XML文档的Document对象，而不是保存文档文字的字符串

"script"

请求的URL被认为指向JavaScript文件，返回的文本在传入回调函数前，会当作脚本执行

"json"
	
请求的URL被认为指向JSON格式的数据文件，会使用jQuery.parseJson()来解析返回的内容，得到JSON对象后传入回调函数

"jsonp"

请求的URL被认为指向服务器脚本，该脚本支持JSON协议，可以将JSON格式的数据作为参数传递给客户端指定的函数。


###		jQuery.ajax()函数

jQuery的所有Ajax工具最后都会调用jQuery.ajax（）——这是整个类库中最复杂的函数。

jQuery.ajax()仅接受一个参数，一个选项对象，该对象的属性指定Ajax请求如何执行的很多细节。

例如：jQuery.getScript(url,callback)与以下jQuery.ajax()的调用等价
	
	jQuery.ajax({
		type:"GET",		//HTTP请求方法
		url:url,		//要获取数据的url
		data:null,		//不给url添加任何数据
		dataType:"script",	//一旦获取到数据，立刻执行脚本
		success:callback	//完成时调用该函数
	});


1.	通用选项
	
	type:指定HTTP的请求方法。默认时GET，常用POST。也可以指定其他HTTP的请求方法,比如"DELETE"和"PUSH"，但不是所有浏览器都支持它们

	url:要获取的URL。对于GET请求，data选项会添加到该URL后面，对于JSONP请求，当cache选项未false时，jQuery可以添加参数到URL中
	
	data： 添加到URL后(GET请求)或请求内容体中(POST请求)发送的数据。

	dataType：指定响应数据的预期类型，以及jQuery处理该数据的方式；合法值就是上面的六种类型

	contentType：指定请求的HTTP Content-Type头，默认是"application/x-www-form-urlencoded",这是HTML表单和绝大部分服务器脚本使用的正常值。如果将type选项设置为"POST",向发送纯文本或XML文档作为请求体时，需要设置该选项

	timeout：超过时间，单位是毫秒，如果设置了该选项，当请求没有在指定超时时间内完成，请求会取消同时触发error回调
	
	cache：对于GET请求，如果该选项设置为false，jQuery会添加一个"_="参数到URL中，或者替换已经存在的同名参数。该参数的值时当前时间(毫秒格式)。这样禁用基于浏览器的缓存，因为每次请求的URL都不一样
	
	ifModified：该选项设置为true时，jQuery会请求每一个URL记录Last-Modified和If-None-Match响应头的值，并会在接下里的请求中为相同的URL设置蛇蝎头部信息。

	global：该选项指定jQuery是否应该触发上面描述的Ajax请求过程中的事件。默认值时true；设置该选项为false会禁用Ajax相关的所有事件。

2.	回调

	context:该选项指定回调函数在调用时的上下文对象——就是this。该选项没有默认值，如果不设置，this会指向选项对象。设置context选项也会影响Ajax事件触发的方式，如果设置该选项，值应该是windo、document或触发事件所在的Elemengt

	beforeSend:该选项指定Ajax请求发送到服务器之前激活的回调含糊，第一个参数是XMLHttpRequest对象。

	success:该选项指定Ajax请求成功完成时调用的回调函数。第一个参数是服务器发送的数据；第二个参数是jQuery状态码；第三个参数是用来发送该请求的XMLHttpRequest对象

	error：该选项指定Ajax请求不成功时调用的回调函数。

	complets：该选项指定Ajax请求完成时激活的回调函数。每一个Ajax请求或者成功时调用success回调，或者失败时调用error回调。在调用success或error后，jQuery会调用complete回调。传给complete回调的第一个参数是XMLHttpRequest对象，第二个参数则是状态码。

3.	不常用的选项和钩子

	async：脚本化的HTTP请求本身就是异步的。然而，XMLHttpRequest对象提供了一个选项，可以用来阻塞当前进程，直到接受到响应。如果想开启这一阻塞行为，可以设置该选项为false。

	dataFilter：该选项指定一个函数，用来过滤或预处理服务器返回的数据。第一个参数是从服务器返回的原始数据，第二个参数是dataType选项的值，如果指定该函数，则它必须返回一个值。该值会用来替换调服务器 的响应。注意dataFileter()函数会在JSON解析和脚本执行前执行。同时注意对于跨域的"script"和"jsonp"请求不会调用dataFilter()。
	
	jsonp：当设置dataType选项为"jsonp"时，url或data选项通常会包含一个类似"jsonp=?"的参数。

	jsonpCallback：对于dataType为"jsonp"请求(或URL中带有类似"jsonp=?"这种JSONP参数的"json"请求)，jQuery必须将URL中的"?"替换成包装函数名。
	
	processData:当设置data选项为对象时，jQuery通常会将该对象转化成字符串，该字符串遵守标准的HTML"application/x-www-form-urlencoded"格式。如果想要省略掉该不走，可设置该选项为fasle

	scriptCharset:对于跨域的"script"和"jsonp"请求，会使用<script>元素，该选项用来指定<script>元素的charset属性值。

	tranditional:jQuery 1.4改变了数据对象的序列化为"application/x-www-form-urlencoded"字符串的方式。设置该选项为true，可以让jQuery回复到原来的方式
	
	username,password：如果请求需要密码验证，请使用这两个选项来指定用户名和密码。

	xhr：该选项指定一个工厂函数，用来获取XMLHttpRequest对象。该工厂函数在调用时不带参数，而且必须返回一个实现了XMLHttpRequest API的对象，这个非常底层的钩子可以创建自己对XMLHttpRequest的包装，也可以给方法添加特性和测量。
