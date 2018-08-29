---
layout: post
title: node.js核心模块
date:   2017-08-15 22:31:54
categories: node.js
tags:	node.js
excerpt:	核心模块是 Node.js 的心脏，它由一些精简而高效的库组成，为 Node.js 提供了基本的API
mathjax: true
author:	闵超
---
* content
{:toc}

#		node.js核心模块

核心模块是 Node.js 的心脏，它由一些精简而高效的库组成，为 Node.js 提供了基本的API。本章中，我们挑选了一部分最常用的核心模块加以详细介绍，主要内容包括：

1.	全局对象；
2.	常用工具；
3.	事件机制；
4.	文件系统访问；
5.	HTTP 服务器与客户端。

##		全局对象
JavaScript 中有一个特殊的对象，称为全局对象（Global Object），它及其所有属性都可
以在程序的任何地方访问，即全局变量。在浏览器 JavaScript 中，通常 window 是全局对象，
而 Node.js 中的全局对象是 global，所有全局变量（除了 global 本身以外）都是 global
对象的属性。

###		全局对象与全局变量

global 最根本的作用是作为全局变量的宿主。按照 ECMAScript 的定义，满足以下条
件的变量是全局变量：

-	在最外层定义的变量；
-	全局对象的属性；
-	隐式定义的变量（未定义直接赋值的变量）。

**当你定义一个全局变量时，这个变量同时也会成为全局对象的属性**

###		process
process 是一个全局变量，即 global 对象的属性。它用于描述当前 Node.js 进程状态
的对象，提供了一个与操作系统的简单接口。

process 对象的一些最常用的成员方法。
	
1.	process.argv是命令行参数数组，第一个元素是 node，第二个元素是脚本文件名，
从第三个元素开始每个元素是一个运行参数。

2.	process.stdout是标准输出流，通常我们使用的 console.log() 向标准输出打印
字符，而 process.stdout.write() 函数提供了更底层的接口。

3.	process.stdin是标准输入流，初始时它是被暂停的，要想从标准输入读取数据，
你必须恢复流，并手动编写流的事件响应函数。

4.	process.nextTick(callback)的功能是为事件循环设置一项任务，Node.js 会在
下次事件循环调响应时调用 callback。


###		console
console 用于提供控制台标准输出，它是由 Internet Explorer 的 JScript 引擎提供的调试
工具，后来逐渐成为浏览器的事实标准

-	console.log()：向标准输出流打印字符并以换行符结束
-	console.error()：与 console.log() 用法相同，只是向标准错误流输出。
-	console.trace()：向标准错误流输出当前的调用栈。


##		常用工具util
util 是一个 Node.js 核心模块，提供常用函数的集合，用于弥补核心 JavaScript 的功能
过于精简的不足。

###		util.inherits

util.inherits(constructor, superConstructor)是一个实现对象间原型继承的函数。JavaScript 的面向对象特性是基于原型的，与常见的基于类的不同。
	
	var util = require('util');
	function Person() {
		this.name = 'minchao';
		this.toString = function() {
			return this.name;
		};
	}
	var obj = new Person();
	console.log(util.inspect(obj));
	console.log(util.inspect(obj, true));
	
运行结果是：

	Person { name: 'minchao', toString: [Function] }
	Person {
	  name: 'minchao',
	  toString:
	   { [Function]
	     [length]: 0,
	     [name]: '',
	     [arguments]: null,
	     [caller]: null,
	     [prototype]: { [constructor]: [Circular] }
		}
	}

除了以上我们介绍的几个函数之外，util还提供了util.isArray()、util.isRegExp()、
util.isDate()、util.isError() 四个类型测试工具，以及 util.format()、util.
debug() 等工具。

[更多API地址](http://nodejs.org/api/util.html)


##		事件驱动 events
events 是 Node.js 最重要的模块，没有“之一”，原因是 Node.js 本身架构就是事件式的，而它提供了唯一的接口，所以堪称 Node.js 事件编程的基石。events 模块不仅用于用户代码与 Node.js 下层事件循环的交互，还几乎被所有的模块依赖。


###		事件发射器

events 模块只提供了一个对象： events.EventEmitter。

EventEmitter 的核心就是事件发射与事件监听器功能的封装。EventEmitter 的每个事件由一个事件名和若干个参数组成，事件名是一个字符串，通常表达一定的语义。对于每个事件，EventEmitter 支持
若干个事件监听器。当事件发射时，注册到这个事件的事件监听器被依次调用，事件参数作为回调函数参数传递。

	var events = require('events');
	var emitter = new events.EventEmitter();
	emitter.on('someEvent', function(arg1, arg2) {
		console.log('listener1', arg1, arg2);
	});
	emitter.on('someEvent', function(arg1, arg2) {
		console.log('listener2', arg1, arg2);
	});
	emitter.emit('someEvent', 'minchao', 1991);

运行的结果是：

	listener1 minchao 1991
	listener2 minchao 1991

解释：

emitter 为事件 someEvent 注册了两个事件监听器，然后发射了someEvent 事件。运行结果中可以看到两个事件监听器回调函数被先后调用;

-	EventEmitter.on(event, listener) 为指定事件注册一个监听器，接受一个字
符串 event 和一个回调函数 listener。

-	EventEmitter.emit(event, [arg1], [arg2], [...]) 发射 event 事件，传
递若干可选参数到事件监听器的参数表。

-	EventEmitter.once(event, listener) 为指定事件注册一个单次监听器，即
监听器最多只会触发一次，触发后立刻解除该监听器。

-	EventEmitter.removeListener(event, listener) 移除指定事件的某个监听
器，listener 必须是该事件已经注册过的监听器。

-	EventEmitter.removeAllListeners([event]) 移除所有事件的所有监听器，
如果指定 event，则移除指定事件的所有监听器。

[更多详细eventAPI请参考](http://nodejs.org/api/events.html。)

###		error事件

EventEmitter 定义了一个特殊的事件 error，它包含了“错误”的语义，我们在遇到
异常的时候通常会发射 error 事件。当 error 被发射时，EventEmitter 规定如果没有响
应的监听器，Node.js 会把它当作异常，退出程序并打印调用栈。我们一般要为会发射 error
事件的对象设置监听器，避免遇到错误后整个程序崩溃。

	var events = require('events');
	var emitter = new events.EventEmitter();
	emitter.emit('error');

运行时会显示以下错误：

	node.js:201
	throw e; // process.nextTick error, or 'error' event on first tick
	^
	Error: Uncaught, unspecified 'error' event.
	at EventEmitter.emit (events.js:50:15)
	at Object.<anonymous> (/home/byvoid/error.js:5:9)
	at Module._compile (module.js:441:26)
	at Object..js (module.js:459:10)
	at Module.load (module.js:348:31)
	at Function._load (module.js:308:12)
	at Array.0 (module.js:479:10)
	at EventEmitter._tickCallback (node.js:192:40)

###		继承 EventEmitter

大多数时候我们不会直接使用 EventEmitter，而是在对象中继承它。包括 fs、net、http 在内的，只要是支持事件响应的核心模块都是 EventEmitter 的子类。

为什么要这样做呢？原因有两点。

-	具有某个实体功能的对象实现事件符合语义，事件的监听和发射应该是一个对象的方法。

-	JavaScript 的对象机制是基于原型的，支持部分多重继承，继承 EventEmitter 不会打乱对象原有的继承关系。

##		文件系统 fs

fs 模块是文件操作的封装，它提供了文件的读取、写入、更名、删除、遍历目录、链接等 POSIX 文件系统操作。

###		fs.readFile
fs.readFile(filename,[encoding],[callback(err,data)])是最简单的读取文件的函数。

-	第一个必选参数 filename，表示要读取的文件名。
-	第二个参数 encoding是可选的，表示文件的字符编码。
-	callback 是回调函数，用于接收文件的内容。如果不指定 encoding，则 callback 就是第二个参数。回调函数提供两个参数 err 和 data，err 表示有没有错误发生，data 是文件内容。

如果指定了 encoding，data 是一个解析后的字符串，否则 data 将会是以 Buffer 形式表示的二进制数据。
	
	我们从content.txt中读取数据，但不制定编码
首先，我们在three文件夹下新建content.txt文件，随便键入111222保存。
再在同一文件夹下创建fsDemo.js 内容如下:
	//	//未加入编码
	var fs = require('fs');
	fs.readFile('content.txt',function(err,data){
		if(err){
			console.log(err);
		}else{
			console.log(data);
		}
	})
	
有node进入该文件夹，执行node fsDemo.js

运行结果是:
	
	<Buffer 31 31 31 32 32 32>

这个程序以二进制的模式读取了文件的内容，data 的值是 Buffer 对象。如果我们给
fs.readFile 的 encoding 指定编码：

	//加入编码
	var fs = require('fs');
	fs.readFile('content.txt','utf-8',function(err,data){
		if(err){
			console.log(err);
		}else{
			console.log(data);
		}
	})
运行结果是:

	111222


**注意:**

Node.js 的异步编程接口习惯是以函数的最后一个参数为回调函数，通常一个函数只有一个回调函数。回调函数是实际参数中第一个是 err，其余的参数是其他返回的内容。如果没有发生错误，err 的值会是 null 或
undefined。如果有错误发生，err 通常是 Error 对象的实例。

###		fs.readFileSync

fs.readFileSync(filename, [encoding])是 fs.readFile 同步的版本。
它接受的参数和 fs.readFile 相同，而读取到的文件内容会以函数返回值的形式返回。如果有错误发生，fs 将会抛出异常，你需要使用 try 和 catch 捕捉并处理异常。

###		fs.open

fs.open(path, flags, [mode], [callback(err, fd)])是 POSIX open 函数的封装，与 C 语言标准库中的 fopen 函数类似。它接受两个必选参数。

-	path 为文件的路径，
-	flags 可以是以下值。
	1.	r ：以读取模式打开文件。
	2.	r+ ：以读写模式打开文件。
	3.	 w ：以写入模式打开文件，如果文件不存在则创建。
	4.	w+ ：以读写模式打开文件，如果文件不存在则创建。
	5.	a ：以追加模式打开文件，如果文件不存在则创建。
	6.	a+ ：以读取追加模式打开文件，如果文件不存在则创建。
-	mode 参数用于创建文件时给文件指定权限，默认是 0666。
-	回调函数将会传递一个文件描述符 fd。

###		fs.read
fs.read(fd, buffer, offset, length, position, [callback(err, bytesRead,buffer)])是 POSIX read 函数的封装，相比 fs.readFile 提供了更底层的接口。

fs.read的功能是从指定的文件描述符 fd 中读取数据并写入 buffer 指向的缓冲区对象。

-	offset 是buffer 的写入偏移量。
-	length 是要从文件中读取的字节数。
-	position 是文件读取的起始位置，如果 position 的值为 null，则会从当前文件指针的位置读取。
-	回调函数传递bytesRead 和 buffer，分别表示读取的字节数和缓冲区对象。

以下是一个使用 fs.open 和 fs.read 的示例。
		
	var fs = require('fs');
	
	fs.open('content.txt','r',function(err,fd){
		if(err){
			console.log(err);
			return;
		}

		var buf = new Buffer(8);
		fs.read(fd,buf,0,8,null,function(err,bytesRead,buffer){
			
			if(err){
				console.log(err);
				return;
			}
			
			console.log('bytesRead:'+bytesRead);
			console.log(buffer);
		})
		
	});
运行结果:

	bytesRead:6
	<Buffer 31 31 31 32 32 32 00 00>

注：一般来说，除非必要，否则不要使用这种方式读取文件，因为它要求你手动管理缓冲区和文件指针，尤其是在你不知道文件大小的时候，这将会是一件很麻烦的事情。


##		HTTP服务器和客户端

Node.js 标准库提供了 http 模块，其中封装了一个高效的 HTTP 服务器和一个简易的HTTP 客户端。

http.Server 是一个基于事件的 HTTP 服务器，它的核心由 Node.js 下层 C++部分实现，而接口由JavaScript 封装，兼顾了高性能与简易性。

http.request 则是一个HTTP 客户端工具，用于向 HTTP 服务器发起请求。


###		HTTP服务器

http.Server 是 http 模块中的 HTTP 服务器对象，用 Node.js 做的所有基于 HTTP 协议的系统，如网站、社交应用甚至代理服务器，都是基于 http.Server 实现的。

它提供了一套封装级别很低的 API，仅仅是流控制和简单的消息解析，所有的高层功能都要通过它的
接口来实现。

	//app.js
	var http = require('http');//导入http模块
	http.createServer(function(req, res) {//创建一个实例，将函数作为HTTP请求的处理函数
		res.writeHead(200, {'Content-Type': 'text/html'});
		//res 显式地写回了响应代码 200 指定响应头为'Content-Type': 'text/html'
		res.write('<h1>Node.js</h1>');//写入响应体 '< h1>Node.js</h1 >'
		res.end('<p>Hello World</p>');//通过 res.end结束并发送
	}).listen(3000);

	console.log("HTTP server is listening at port 3000.");

运行node app.js ,打开浏览器输入http:\\localhost:3000即可查看结果

http.createServer 创建了一个 http.Server 的实例，将一个函数作为 HTTP 请求处理函数。

这个函数接受两个参数，分别是请求对象（ req ）和响应对象（ res ）。

在函数体内，res 显式地写回了响应代码 200 （表示请求成功），指定响应头为'Content-Type': 'text/html'，然后写入响应体 '< h1>Node.js</h1 >'，通过 res.end结束并发送。

最后该实例还调用了 listen 函数，启动服务器并监听 3000 端口。

1.	http.Server 的事件
	
	http.Server 是一个基于事件的 HTTP 服务器，所有的请求都被封装为独立的事件，开发者只需要对它的事件编写响应函数即可实现 HTTP 服务器的所有功能。它继承自EventEmitter并提供了以下几个事件。
	-	request：当客户端请求到来时，该事件被触发，提供两个参数 req 和res，分别是http.ServerRequest 和 http.ServerResponse 的实例，表示请求和响应信息。
	-	connection：当 TCP 连接建立时，该事件被触发，提供一个参数 socket，为net.Socket 的实例。connection 事件的粒度要大于 request，因为客户端在Keep-Alive 模式下可能会在同一个连接内发送多次请求。
	-	close ：当服务器关闭时，该事件被触发。注意不是在用户连接断开时。

	在这些事件中， 最常用的就是 request 了， 因此 http 提供了一个捷径：http.createServer([requestListener]) ， 功能是创建一个 HTTP 服务器并将requestListener 作为 request 事件的监听函数，这也是我们前面例子中使用的方法。事实上它显式的实现方法是：
	
		//httpserver.js
		var http = require('http');
		var server = new http.Server();
		server.on('request', function(req, res) {
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write('<h1>Node.js</h1>');
			res.end('<p>Hello World</p>');
		});
		server.listen(3000);
		console.log("HTTP server is listening at port 3000.");
2. http.ServerRequest

	http.ServerRequest 是 HTTP 请求的信息，是后端开发者最关注的内容。它一般由http.Server 的 request 事件发送，作为第一个参数传递，通常简称 request 或 req。

	HTTP 请求一般可以分为两部分：请求头（Request Header）和请求体（Requset Body）。以上内容由于长度较短都可以在请求头解析完成后立即读取。而请求体可能相对较长，需要一定的时间传输，因此 http.ServerRequest 提供了以下3个事件用于控制请求体传输。
	
	-	data：当请求体数据到来时，该事件被触发。该事件提供一个参数 chunk，表示接收到的数据。如果该事件没有被监听，那么请求体将会被抛弃。该事件可能会被调用多次。
	-	end ：当请求体数据传输完成时，该事件被触发，此后将不会再有数据到来。
	-	close： 用户当前请求结束时，该事件被触发。不同于 end，如果用户强制终止了传输，也还是调用close。
	
	以上是ServerRequest的三个事件，下面是ServerRequest的属性
	
	-	ServerRequest.complete : 客户端请求是否已经发送完成
	-	ServerRequest.httpVersion : HTTP 协议版本，通常是 1.0 或 1.1
	-	ServerRequest.method : 	HTTP 请求方法，如 GET、POST、PUT、DELETE
	-	ServerRequest.url : 原始的请求路径，例如  /user?name=minchao
	-	ServerRequest.headers : HTTP 请求头
	-	ServerRequest.trailers :  HTTP 请求尾（不常见）
	-	ServerRequest.connection : 当前 HTTP 连接套接字，为 net.Socket 的实例
	-	ServerRequest.socket : connection 属性的别名
	-	ServerRequest.client : client 属性的别名


5.	http.ServerResponse
	
	http.ServerResponse 是返回给客户端的信息，决定了用户最终能看到的结果。它也是由 http.Server 的 request 事件发送的，作为第二个参数传递，一般简称为response 或 res。
	
	http.ServerResponse 有三个重要的成员函数，用于返回响应头、响应内容以及结束请求。

	-	response.writeHead(statusCode, [headers])：向请求的客户端发送响应头。
		
		statusCode 是 HTTP 状态码，如 200 （请求成功）、404 （未找到）等。headers是一个类似关联数组的对象，表示响应头的每个属性。该函数在一个请求内最多只能调用一次，如果不调用，则会自动生成一个响应头。

	-	response.write(data, [encoding])：向请求的客户端发送响应内容。
		
		data是一个 Buffer 或字符串，表示要发送的内容。如果 data 是字符串，那么需要指定encoding 来说明它的编码方式，默认是 utf-8。在 response.end 调用之前，response.write 可以被多次调用。

	-	response.end([data], [encoding])：结束响应，告知客户端所有发送已经完成。
		
		当所有要返回的内容发送完毕的时候，该函数 必须 被调用一次。它接受两个可选参数，意义和 response.write 相同。如果不调用该函数，客户端将永远处于等待状态。

3. 获取 GET 请求内容

	注意，由于 GET 请求直接被嵌入在路径中，URL是完整的请求路径，包括了 ? 后面的部分，因此你可以手动解析后面的内容作为 GET请求的参数。Node.js 的 url 模块中的 parse 函数提供了这个功能
	
		//httpserverrequestget.js
		var http = require('http');
		var url = require('url');
		var util = require('util');
		http.createServer(function(req, res) {
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.end(util.inspect(url.parse(req.url, true)));
		}).listen(3000);
		console.log("端口号是3000");
	
	执行node httpserverrequestget.js
	然后在浏览器输入
	
		http://127.0.0.1:3000/user?name=mincaho&email=minchao19920917@163.com

	查看结果：

		Url {
		  protocol: null,
		  slashes: null,
		  auth: null,
		  host: null,
		  port: null,
		  hostname: null,
		  hash: null,
		  search: '?name=mincaho&email=minchao19920917@163.com',
		  query: { name: 'mincaho', email: 'minchao19920917@163.com' },
		  pathname: '/user',
		  path: '/user?name=mincaho&email=minchao19920917@163.com',
		  href: '/user?name=mincaho&email=minchao19920917@163.com' 
		}

	通过 url.parse①，原始的 path 被解析为一个对象，其中 query 就是我们所谓的 GET请求的内容，而路径则是 pathname。
	

4.	获取 POST 请求内容
	
	HTTP 协议 1.1 版本提供了8种标准的请求方法，其中最常见的就是 GET 和 POST。

	相比GET 请求把所有的内容编码到访问路径中，POST 请求的内容全部都在请求体中。

	http.ServerRequest 并没有一个属性内容为请求体，原因是等待请求体传输可能是一件耗时的工作，譬如上传文件。而很多时候我们可能并不需要理会请求体的内容，恶意的 POST请求会大大消耗服务器的资源。所以 Node.js 默认是不会解析请求体的，当你需要的时候，需要手动来做。

		//httpserverrequestpost.js
		var http = require('http');
		var querystring = require('querystring');
		var util = require('util');
		http.createServer(function(req, res) {
			var post = '';
			req.on('data', function(chunk) {
				post += chunk;//每当接受到请求体的数据，就累加到 post 变量中
			});
			req.on('end', function() {
				post = querystring.parse(post);
				//通过 querystring.parse 将 post 解析为真正的 POST 请求格式
				res.end(util.inspect(post));
				
			});
		}).listen(3000);
		console.log("端口号是3000");
	
	上面代码并没有在请求响应函数中向客户端返回信息，而是定义了一个 post 变量，用于在闭包中暂存请求体的信息。通过 req 的 data 事件监听函数，每当接受到请求体的数据，就累加到 post 变量中。在 end 事件触发后，通过 querystring.parse 将 post 解析为真正的 POST 请求格式，然后通过 res.end结束并向客户端返回。

	**注意:**
	**不要在真正的生产应用中使用上面这种简单的方法来获取 POST 请求，因为它有严重的效率问题和安全问题，这只是一个帮助你理解的示例。**

###		HTTP客户端

http 模块提供了两个函数 http.request 和 http.get，功能是作为客户端向 HTTP服务器发起请求。

1.	http.request(options, callback) 发起 HTTP 请求。接受两个参数，option 是一个类似关联数组的对象，表示请求的参数，callback 是请求的回调函数。
	
	option常用的参数如下所示。
	
	-	host ：请求网站的域名或 IP 地址。
	-	port ：请求网站的端口，默认 80。
	-	method ：请求方法，默认是 GET。
	-	path ：请求的相对于根的路径，默认是“/”。QueryString 应该包含在其中。例如 /search?query=byvoid。
	-	headers ：一个关联数组对象，为请求头的内容。
	
	callback :传递一个参数，为 http.ClientResponse 的实例。
	
	http.request: 返回一个 http.ClientRequest 的实
	
		//httprequest.js

		var http = require('http');
		var querystring = require('querystring');
		var contents = querystring.stringify({
			name: 'minchao',
			email: 'minchao19920917@163.com',
			address: 'suzhou jinfenglu',
		});
		var options = {
			host: 'www.minchao.com',
			path: '/application/node/post.php',
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length' : contents.length
			}
		};
		var req = http.request(options, function(res) {
		
			res.setEncoding('utf8');
			res.on('data', function (data) {
				console.log(data);
			});
		});
		req.write(contents);
		req.end();

	运行后结果如下：

		array(3) {
		["name"]=>
			string(6) "minchao"
		["email"]=>
			string(17) "minchao19920917@163.com"
		["address"]=>
			string(30) "suzhou jinfenglu"
		}

	**不要忘了通过 req.end() 结束请求，否则服务器将不会收到信息。**

2.	http.get(options, callback) http 模块还提供了一个更加简便的方法用于处理GET请求：http.get。它是 http.request 的简化版，唯一的区别在于http.get自动将请求方法设为了 GET 请求，同时不需要手动调用 req.end()。
		
		//httpget.js
		var http = require('http');
		http.get({host: 'minchao.me'}, function(res) {
			res.setEncoding('utf8');
			res.on('data', function (data) {
			console.log(data);
			});
		});

	-	http.ClientRequest
	
		http.ClientRequest 是由 http.request 或 http.get 返回产生的对象，表示一个已经产生而且正在进行中的 HTTP 请求。它提供一个 response 事件，即 http.request或 http.get 第二个参数指定的回调函数的绑定对象。我们也可以显式地绑定这个事件的监听函数：
			
			//httpresponse.js
			var http = require('http');
			var req = http.get({host: 'minchao.me'});
			req.on('response', function(res) {
				res.setEncoding('utf8');
				res.on('data', function (data) {
					console.log(data);
				});
			});
		http.ClientRequest 像 http.ServerResponse 一样也提供了 write 和 end 函数，用于向服务器发送请求体，通常用于 POST、PUT 等操作。所有写结束以后必须调用 end函数以通知服务器，否则请求无效。http.ClientRequest 还提供了以下函数。
	
		1.	request.abort()：终止正在发送的请求。
		2.	request.setTimeout(timeout, [callback])：设置请求超时时间，timeout 为毫秒数。当请求超时以后，callback 将会被调用。

		此外还有request.setNoDelay([noDelay])、request.setSocketKeepAlive([enable], [initialDelay]) 等函数，具体内容请参见 Node.js 文档。

	-	http.ClientResponse
	
	http.ClientResponse 与 http.ServerRequest 相似，提供了三个事件 data、end和 close，分别在数据到达、传输结束和连接结束时触发，其中 data 事件传递一个参数chunk，表示接收到的数据。

	http.ClientResponse 也提供了一些属性，用于表示请求的结果状态，

		-	statusCode HTTP 状态码，如 200、404、500
		-	httpVersion HTTP 协议版本，通常是 1.0 或 1.1
		-	headers HTTP 请求头
		-	trailers HTTP 请求尾（不常见）
		-	http.ClientResponse 还提供了以下几个特殊的函数。

	response.setEncoding([encoding])：设置默认的编码，当 data 事件被触发时，数据将会以 encoding 编码。默认值是 null，即不编码，以 Buffer 的形式存储。常用编码为 utf8。

	response.pause()：暂停接收数据和发送事件，方便实现下载功能。

	response.resume()：从暂停的状态中恢复。


总结：至此，node.js的核心模块看完了，HTTP客户端的req和res理解的不是很透彻，后期，在实际运用中如果有了新的进展，会来继续更新的这一块的，如果你有好的学习网站或者地址，欢迎在下面的评论中给出你的建议或贴出更好的学习链接。