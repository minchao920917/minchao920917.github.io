---
layout: post
title:  "脚本化http"
date:   2016-04-14 23:33:54
categories: JavaScript
tags: JavaScript
excerpt:	超文本传输协议(HyperText Transfer Protocol,HTTP)规定Web浏览器如何从Web服务器获取文档和向Web服务器提交表单内容，以及Web服务器如何响应这些请求和提交。
mathjax: true
author:	闵超
---

* content
{:toc}

#		脚本化http

超文本传输协议(HyperText Transfer Protocol,HTTP)规定Web浏览器如何从Web服务器获取文档和向Web服务器提交表单内容，以及Web服务器如何响应这些请求和提交。

Web浏览器会处理大量的HTTP，通常，HTTP并不在脚本的控制下，只是当用户单击链接、提交表单和输入URL时才发生。

但是，用JavaScript代码操作HTTP是可行的。当脚本设置window对象的location属性或调用表单对象的submit()方法时，都会初始化HTTP请求。

术语Ajax描述了一种主要使用脚本操作HTTP的Web应用架构。Ajax应用的主要特点是使用脚本操作HTTP和Web服务器进行数据交换，不会导致页面重载。避免页面重载的能力使Web应用更像传统的桌面应用。

Comet是使用脚本操纵HTTP的Web应用架构相关术语。在某种意义上Comt和Ajax相反，在Comet中，Web服务器发起通信并异步发送数据到客户端。如果Web应用需要响应服务端发送的消息，则它会使用Ajax技术发送或请求数据。在Ajax中，客户端从服务端"拉"数据。而在Comet中，服务器端向客户端"推"数据。Comet海波阔其他名词，("服务器推"、"Ajax推"和"HTTP流")


##		使用XMLHttpRequest

浏览器在XMLHttpRequest类上定义了它们的HTTP API。这个类的每个实例都表示一个独立的请求/响应对，并且这个对象的属性和方法允许指定请求细节和摄取响应数据。

当然，使用这个HTTP API必须要做的第一件事就是实例化XMLHttpRequest对象：
	
	var request = new XMLHttpRequest();

一个HTTP请求由4个部分组成：

1.	HTTP请求方法或"动作"(verb)
2.	正式请求的URL
3.	一个可选的请求头集合，其中可能包括身份验证信息
4.	一个可选的请求体

服务器返回的HTTP响应包含3部分:

1.	一个数字和文字组成的状态码，用来显示请求的成功和失败
2.	一个响应头集合
3.	响应主体

HTTP的基础请求/响应架构非常简单并且易于使用。但在实践中会有各种各样随之而来的复杂问题:客户端和服务区交换cookie，服务区重定向浏览器到其他服务器，缓存某些资源而剩下的不缓存，某些客户端通过代理通过代理服务器发送所有的请求等。
XMLHttpRequest不是协议级的HTTP API而是浏览器级的API。浏览器需要考虑cookie、重定向、缓存和代理，但代码只需要担心请求和响应。

###		指定请求

1.	创建XMLHttpRequest对象之后，发起HTTP请求的下一步是调用XMLHttpRequest对象的open()方法去指定这个请求的两个必需部分:方法和URL。

		request.open("GET",//开始一个HTTP GET请求
			"data.csv");//URL的内容
	
	-	open()的第一个参数指定HTTP方法或动作。这个字符串不区分大小写，但通常大家用大写字母来匹配HTTP协议。
	
		"GET"和"POST"方法得到了广泛的支持。
		
		"GET"用于常规请求，它适用于当URL完全指定请求资源，当请求对服务器没有任何副作用以及当服务器的响应是可缓存时。
		
		"POST"方法常用于HTML表单。它在请求主体中包含额外数据(表单数据)，且这些数据常存储在服务器数据库中(副作用)。
		
		除了这两个之外，XMLHttpRequest的规范还允许把"DELETE"、"HEAD"、"OPTIONS"和"PUT"作为open()的第一个参数。
		
	-	open()的第二个参数时URL，它时请求的主题。这时相对于文档的URL，这个文档包含调用open()的骄傲本。如果指定绝对URL、协议、主机和端口通常必须匹配所在文档的对应内容:跨域请求通常会报错。

2.	如果有请求头的话，请求进程的下一个步骤时设置它。例如，POST的请求需要"Content-Type"指定请求主题的MIME类型：

		request.setRequestHeader("Content-Type","text/plain");

	你不能自己指定"Content-Length"、"Date"、"Referer"或"User-Agent"头，XMLHttpRequest将自动添加这些头防止伪造它们。类似的XMLHttpRequest对象自动处理cookie、连续时间、字符集和编码判断

3.	使用XMLHttpRequest发起请求的最后一步是指定可选的请求猪蹄并向服务器发送它。使用send()方法实现
		request.send(null);

GET请求绝对没有主体，所以应该传递null或省略这个参数。POST的请求通常拥有主体，同时它应该匹配使用setRequestHeader()指定的"Content-Type"头。

**顺序问题**

HTTP请求的各部分有指定顺序：

-	请求方法和URL首先到达
-	然后请求头
-	最后是请求主体

XMLHttpRequest实现通常直到调用send()方法才开始启动网络。但XMLHttpRequest API设计似乎使每个方法都将写入网络流。这意味着调用XMLHttpRequest方法的顺序必须撇陪HTTP请求的架构。例如setRequestHeader()必须调用在必须在open()之后，send()之前

例子:POST方法发送纯文本给服务器

	function postMessage(msg){
		
		var request = new XMLHttpRequest();//新请求
		request.open("POST","/log.php");//用POST向服务器端发送脚本
		//用请求主体发送纯文本消息
		request.setRequestHeader("Content-Type",//请求主体是纯文本
							"text/plain;charset=UTF-8");
		request.send(msg);//把msg作为请求主体发送
		//请求完成，我们将忽略任何响应和任何错误
	}

###		取得响应

一个完整的HTTP响应由状态码、响应头集合和响应主体组成。这些都可以通过XMLHttpRequest对象的属性和方法使用：

-	status和statusText属性以数字和文本的形式返回HTTP状态码。这些属性保存标准的HTTP值，像200和"OK"表示成功请求，404和"Not Found"表示URL不能匹配服务器上的任何资源。
	
-	使用getResponseHeader()和getAllResponseHeader()能查询响应头。XMLHttpRequest会自动处理cookie：它会从getAllResponseHeaders()头返回集合中过滤掉cookie头，而去过给getResponseHeader()传递"Set-Cookie"和"Set-Cookie2"则返回null。

-	响应主体可以从responseText属性中得到文本形式的，从responseXML属性中得到Document形式。

XMLHttpRequest对象通常异步使用:发送请求后,send()方法立即返回，知道响应返回，前面列出的响应方法和属性才有效。

为了在响应准备就绪时得到通知，必须监听XMLHttpRequest对象上的readystatechange事件。

readyState是一个整数，它指定了HTTP请求的状态，第一列的符号时XMLHttpRequest构造函数定义的常量。

XMLHttpRequest的readyState值

	常量 				值			含义	

	UNSENT				0		open()尚未调用
	OPENED				1		open()已经调用
	HEADERS_RECEIVED	2		接受到头信息
	LOADING				3		接收到响应主体
	DONE				4		响应完成

示例：定义了getText()函数来演示如何监听readystatechange事件。

	// 发出一个HTTP GET请求以获得指定URL的内容
	// 当响应成功到达，验证它是否是纯文本
	// 如果是，把它传递给指定回调函数
	function getText(url, callback) {
	    var request = new XMLHttpRequest();         // 新建请求
	    request.open("GET", url);                   // 指定待获取的URL
	    request.onreadystatechange = function() {   // 定义事件处理程序
	        // 如果请求完成，则它是成功的
	        if (request.readyState === 4 && request.status === 200) {
	            var type = request.getResponseHeader("Content-Type");
	            if (type.match(/^text/))            // 确保响应式文本
	                callback(request.responseText); // 把它传递给回调函数
	        }
	    };
	    request.send(null);                         // 立即发送请求
	}

1.	同步响应
	
	由于其本身的性质，异步处理HTTP响应是最好的方式。然而，XMLHttpRequest也支持同步响应。如果把false作为第三个参数传递给open()，那么send()方法将阻塞直到请求完成。

		// 发出一个HTTP GET请求以获得指定URL的内容
		// 返回响应文本，或如果请求不成功或响应不是文本就报错
		function getTexSynct(url) {
		    var request = new XMLHttpRequest();         // 新建请求
		    request.open("GET", url);                   // 传递false实现同步
			request.sen(null);							// 立即发送请求
		    
		    // 如果请求不是200 OK，就报错
		    if (request.status === 200) throw new Error(request.statusText);
	
			//如果类型错误，就报错
			var type = request.getResponseHeader("Content-Type");
		
			if(!type.match(/^text/))
				throw new Error("Expected textual response;got:"+type);
		
			return request.responseText;
		   
		}
	
	同步请求是吸引人的，但应该避免使用它们，客户端JavaScript是单线程的，当send()方法阻塞时，它通常会导致整个浏览器UI冻结。如果连接到服务器响应慢，那么用户的浏览器将冻结。


2.	响应解码
	
	在前面的示例中,我们假设服务器使用像"text/plain"、"text/html"或"text/css"这样的MIME类型发送文本响应，然后我们使用XMLHttpRequest对象的responseText属性得到它。
	
	如果服务器想发送诸如对象或数组这样的结构化数据作为其响应，它应该传输JSON编码的字符串数据。当接受它时，可以把responseText属性传递给JSON.parse()。

	示例解析HTTP响应
	
		// 发起HTTP GET响应以获取指定URL的内容
		// 当响应到达时，把它以解析后的XML Document对象、解析后的JSON对象
		// 或字符串形式传递给回调函数
		function get(url, callback) {
		    var request = new XMLHttpRequest();         // 创建新请求
		    request.open("GET", url);                   // 指定待获取的URL
		    request.onreadystatechange = function() {   // 定义事件监听器
		        // 如果请求完成且成功
		        if (request.readyState === 4 && request.status === 200) {
		            // 获取响应类型
		            var type = request.getResponseHeader("Content-Type");
		            // 检查类型，这样我们不能在将来得到HTML文档
		            if (type.indexOf("xml") !== -1 && request.responseXML) 
		                callback(request.responseXML);             // Document对象相应
		            else if (type === "application/json")
		                callback(JSON.parse(request.responseText)); // JSON响应
		            else 
		                callback(request.responseText);             // 字符串响应
		        }
		    };
		    request.send(null);                         // 立即发送请求
		}


###		编码请求主体

HTTP POST请求包括一个请求主体，它包含客户端传递给服务器的数据。我们通常使用HTTP请求发送的都是更复杂的数据。

1.	表单编码的请求
	
	考虑HTML表单。当用户提交表单时，表单中的数据(每个表单元素的名字和值)编码到一个字符串中并随请求发送。像这样:
	
		name=minchao&sex=man
	表单数据编码格式是一个正式的MIME类型：
		
		application/x-www-form-urlencoded

	当POST方法提交表单数据时，必须设置"Content-Type"请求头为这个值。这种编码并不要HTML表单。在Ajax应用中，你希望发送给服务器的很可能时一个JavaScript对象。
	
		{
			name:"minchao",
			sex:"man"
		}
	用于HTTP请求的编码对象
	
		/**
		 * 编码对象的属性，
		 * 如果它们是来自HTML表单的名/值对，使用application/x-wwww-form-urlencode格式
		 */
		function encodeFormData(data) {
		    if (!data) return "";    // 一直返回字符串
		    var pairs = [];          // 为了保存名值对
		    for(var name in data) {                                  // 遍历每个名字
		        if (!data.hasOwnProperty(name)) continue;            // 跳过继承属性
		        if (typeof data[name] === "function") continue;      // 跳过方法
		        var value = data[name].toString();                   // 把值转换成字符串
		        name = encodeURIComponent(name.replace(" ", "+"));   // 编码名字
		        value = encodeURIComponent(value.replace(" ", "+")); // 编码值
		        pairs.push(name + "=" + value);   // 记住名=值对
		    }
		    return pairs.join('&'); // 返回使用&连接的名/值对
		}
	
	使用表单编码数据发起一个HTTP POST请求
		
		function postData(url, data, callback) {
		    var request = new XMLHttpRequest();            
		    request.open("POST", url);                    // 对指定URL发生POST请求
		    request.onreadystatechange = function() {     // 简单的事件处理程序
		        if (request.readyState === 4 && callback) // 当响应完成
		            callback(request);                    // 调用回调函数
		    };
		    request.setRequestHeader("Content-Type",      // 设置 Content-Type
		                             "application/x-www-form-urlencoded");
		    request.send(encodeFormData(data));           // 发送表单数据
		}

	
	使用表单编码数据发起HTTP  GET请求
	
		function getData(url, data, callback) {
	    var request = new XMLHttpRequest(); 
	    request.open("GET", url +                     // 通过添加编码数据获取指定的url
	                 "?" + encodeFormData(data));    
	    request.onreadystatechange = function() {     // 简单事件处理程序
	        if (request.readyState === 4 && callback) callback(request);
	    };
	    	request.send(null);                           // 发送请求
		}

2.	JSON编码的请求

	在POST请求主体中使用表单编码时常见惯例。
	
		function postJSON(url, data, callback) {
		    var request = new XMLHttpRequest();            
		    request.open("POST", url);                    // 对指定URL发送POST请求
		    request.onreadystatechange = function() {     // 简单是事件处理程序
		        if (request.readyState === 4 && callback) // 当响应完成时
		            callback(request);                    // 调用回调函数
		    };
		    request.setRequestHeader("Content-Type", "application/json");
		    request.send(JSON.stringify(data));
		}

3.	XML编码的请求
	
	XML有时也用于数据传输的编码。JavaScript对象的用表单编码或JSON编码版本表达的。
	略

4.	上传文件
	
	HTML表单的特性之一时当用户通过< input type="file">元素选择文件时，表单将在它产生的POST请求主体中发送文件内容。HTNL表单始终能上传文件，但到目前为止，它还不能使用XMLHttpRequest API做相同的事。
	
	使用HTTP POST请求上传文件
	
		//查找有data-upload属性的全部<input tyep="file">元素
		//并注册onchange事件处理程序
		//这样任何选择的文件都会自动通过POST方法发送到指定的"uploadto"URL
		//服务器的响应是忽略的
		whenReady(function() {                        // 当文档准备就绪时运行
		    var elts = document.getElementsByTagName("input"); // 所有的input元素
		    for(var i = 0; i < elts.length; i++) {             // 遍历它们
		        var input = elts[i];
		        if (input.type !== "file") continue;  // 跳过所有非文件上传元素
		        var url = input.getAttribute("data-uploadto"); // 获取上级URL
		        if (!url) continue;                   // 跳过任何没有URL的元素
		
		        input.addEventListener("change", function() {  // 当用户选择文件时
		            var file = this.files[0];         // 假设单个文件选择
		            if (!file) return;                // 如果没有文件，不做任何事情
		            var xhr = new XMLHttpRequest();   // 创建新请求
		            xhr.open("POST", url);            // 向这个URL发送POST请求
		            xhr.send(file);                   // 把文件作为主体发送
		        }, false);
		    }
		});

5.	multipart/form-data请求

	当HTML表单同时包含文件上传元素和其他元素时，浏览器不能使用普遍的表单编码而必须使用称为"multipart/form-data"的特殊Content-Type来用POST方法提交表单。
	
	使用POST方法发送multipart/form-data请求主体	

		function postFormData(url, data, callback) {
		    if (typeof FormData === "undefined")
		        throw new Error("FormData is not implemented");
		
		    var request = new XMLHttpRequest();            // 新HTTP请求
		    request.open("POST", url);                     // 对指定URL发送POST请求
		    request.onreadystatechange = function() {      // 简单的事件处理程序
		        if (request.readyState === 4 && callback)  // 当响应完成时
		            callback(request);                     // 调用回调函数
		    };
		    var formdata = new FormData();
		    for(var name in data) {
		        if (!data.hasOwnProperty(name)) continue;  // 跳过继承的属性
		        var value = data[name];
		        if (typeof value === "function") continue; // 跳过方法
		        // 每个属性变成请求的一部分
		        // 这里允许File对象
		        formdata.append(name, value);              // 作为一部分添加名/值对
		    }
		    // 在multipart/form-data请求主体中发送名值对
			// 每对都是请求的一部分，注意，当传入FormData对象时
			// sen()会自动设置Content-Type头
		    request.send(formdata);  
		}


###		HTTP进度事件

在之前的示例中，使用readystatechange事件探测HTTP请求的完成。

常见的progress事件处理程序一样使用upload事件处理程序，对于XMLHttpRequest对象x，设置x.onpressgress以监控响应的下载进度，并且设置x.upload.onprogress以监控请求的上传进度。

	// 查找所有含有"fileDropTarget"类的元素
	// 并注册DnD事件处理程序使它们能响应文件的拖拽
	// 当文件放下时，上传它们到data-uploadto属性
	whenReady(function() {
	    var elts = document.getElementsByClassName("fileDropTarget");
	    for(var i = 0; i < elts.length; i++) {
	        var target = elts[i];
	        var url = target.getAttribute("data-uploadto");
	        if (!url) continue;
	        createFileUploadDropTarget(target, url);
	    }
	
	    function createFileUploadDropTarget(target, url) {
	        // 跟踪当前是否正在上传，因此我们能拒绝放下
			// 我们可以处理多个并发上传
			// 但对这个例子使用进度通知太困难了
	        var uploading = false; 
	
	        console.log(target, url);
	
	        target.ondragenter = function(e) {
	            console.log("dragenter");
	            if (uploading) return;  // 如果正忙，忽略拖放
	            var types = e.dataTransfer.types;
	            if (types && 
	                ((types.contains && types.contains("Files")) ||
	                 (types.indexOf && types.indexOf("Files") !== -1))) {
	                target.classList.add("wantdrop");
	                return false;
	            }
	        };
	        target.ondragover = function(e) { if (!uploading) return false; };
	        target.ondragleave = function(e) {
	            if (!uploading) target.classList.remove("wantdrop");
	        };
	        target.ondrop = function(e) {
	            if (uploading) return false;
	            var files = e.dataTransfer.files;
	            if (files && files.length) {
	                uploading = true;
	                var message = "Uploading files:<ul>";
	                for(var i = 0; i < files.length; i++) 
	                    message += "<li>" + files[i].name + "</li>";
	                message += "</ul>";
	                
	                target.innerHTML = message;
	                target.classList.remove("wantdrop");
	                target.classList.add("uploading");
	                
	                var xhr = new XMLHttpRequest();
	                xhr.open("POST", url);
	                var body = new FormData();
	                for(var i = 0; i < files.length; i++) body.append(i, files[i]);
	                xhr.upload.onprogress = function(e) {
	                    if (e.lengthComputable) {
	                        target.innerHTML = message +
	                            Math.round(e.loaded/e.total*100) +
	                            "% Complete";
	                    }
	                };
	                xhr.upload.onload = function(e) {
	                    uploading = false;
	                    target.classList.remove("uploading");
	                    target.innerHTML = "Drop files to upload";
	                };
	                xhr.send(body);
	
	                return false;
	            }
	            target.classList.remove("wantdrop");
	        }
	    }
	});

###		中止请求和超时
可以通过调用XMLHttpRequest对象的abort()方法来取消正在进行的HTTP请求。abort()方法在所有的XMLHttpRequest版本和XHR2中可用。
	
	// 发起HTTP GET请求获取指定的URL的内容
	//  如果响应成功到达，传入responseText给回调函数
	//	如果响应在timeout毫秒内没有到达，中止这个请求
	// 	浏览器可能在abort()后触发"readstatechange"
	// 	如果时部分请求结果到达，甚至可能设置status属性
	//	所以需要设置一个标记，当部分且超时的响应到达时不会调用回调函数
	//	如果使用load事件就没有这个风险
	function timedGetText(url, timeout, callback) {
	    var request = new XMLHttpRequest();         // 创建新请求
	    var timedout = false;                       // 是否超时
	    // 启动计时器，在timeout毫秒后将中止请求
	    var timer = setTimeout(function() {         // 如果触发，启动一个计时器
	                               timedout = true; // 如果标记
	                               request.abort(); // 然后中止请求
	                           },
	                           timeout);            // 中止请求之前的时长
	    request.open("GET", url);                   // 获取指定的URL
	    request.onreadystatechange = function() {   // 定义事件处理程序
	        if (request.readyState !== 4) return;   // 忽略未完成的请求
	        if (timedout) return;                   // 忽略中止请求
	        clearTimeout(timer);                    // 取消等待的超时
	        if (request.status === 200)             // 如果请求成功
	            callback(request.responseText);     // 把response传给回调函数
	    };
	    request.send(null);                         // 立即发送请求
	}


###		跨域HTTP请求
作为同源策略的一部分，XMLHttpRequest对象通常仅可以发起和文档具有相同服务器的HTTP请求。


##		借助< script>发送HTTP请求:JSON
< script>元素可以作为一种Ajax传输机制:只须设置< script>元素的src属性，然后浏览器就会发送一个HTTP请求以下载src属性所指向的URL。

**脚本和安全性**

为了使用< script>元素进行Ajax传输，必须允许Web页面可以执行远程服务器发送过来的任何JavaScript代码，这意味着对于不可信的服务器，不应该采取该技术。当与可信的服务器通信时，要提防攻击者可能进入服务器中，然后黑客会接管你的页面，运行他自己的代码，并显示任何他想要的内容。


这种使用< script>元素作为Ajax传输的技术成为JSONP，若HTTP请求所得到的响应数据时经过JSON编码的，则适合使用该技术。

	// 根据指定的URL发送一个JSON请求
	// 然后把解析得到的响应数据传递给回调函数
	//	在URL中添加一个名为jsonp的查询参数，用于指定该请求的回掉函数的名称
	function getJSONP(url, callback) {
	    // 为本次请求创建一个唯一的回调函数名称
	    var cbnum = "cb" + getJSONP.counter++; // 每次自增计数器
	    var cbname = "getJSONP." + cbnum;      // 作为JSONP函数的属性
	    
	    // 将回调函数名称以表单编码的形式添加到URL的查询部分
		// 使用jsonp作为参数名，一些支持JSONP的服务
		// 可能使用其他的参数名，比如callback
	    if (url.indexOf("?") === -1)   // URL没有查询部分
	        url += "?jsonp=" + cbname; // 作为查询部分添加参数
	    else                           // 否则
	        url += "&jsonp=" + cbname; // 作为新的参数添加它
	
	    // 创建script元素用于发送请求
	    var script = document.createElement("script");
	
	    // 定义将被脚本执行的回调函数
	    getJSONP[cbnum] = function(response) {
	        try {
	            callback(response); // 处理响应数据
	        }
	        finally {               // 即使回调函数或响应抛出错误
	            delete getJSONP[cbnum];                // 删除该函数
	            script.parentNode.removeChild(script); // 移除script元素
	        }
	    };
	
	    // 立即触发HTTP请求
	    script.src = url;                  // 设置脚本的URL
	    document.body.appendChild(script); // 把它添加到文档中
	}
	
	getJSONP.counter = 0;  // 用于创建唯一回调函数名称的计数器


##		基于服务器端推送事件的Come技术
在服务器端推送事件的标准草案中定义了一个EventSource对象，简化了Comet应用程序的编写可以传递一个URL给EventSource()构造函数，然后在返回的实例上监听消息事件。
	
	var ticker = new EventSource("stockprices.php");
	ticker.onmessage = function(e){
		var type = e.type;
		var data = e.data;
		//现在处理事件类型和事件的字符串数据
	}


Comet架构的一个常见的应用是聊天应用，聊天客户端可以通过XMLHttpRequest向聊天室发送新的消息，也可以通过EventSource对象订阅聊天信息。

