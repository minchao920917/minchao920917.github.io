---
layout: post
title:  "服务器端JavaScript"
date:   2016-04-07 23:56:54
categories: JavaScript
tags: JavaScript
excerpt:	JavaScript并不满足于只存在于浏览器端，随着Nodejs的发展，以及chromev8引擎在后台服务器端的应用，使得JavaScript逐渐活跃于服务器端
mathjax: true
author:	闵超
---

* content
{:toc}


#		服务器端JavaScript

##		Rhino脚本话java
Rhino是一种用java编写的JavaScript解释器，其设计目标是借助强大的java平台API实现轻松编写JavaScript程序。Rhino能自动完成JavaScript原生类型的Java原生类型之间的相互转换，因此JavaScript脚本可以设置、查询java属性并调用java方法。

Rhino定义了少量重要的全局函数，不过它们都不是JavaScript的核心组成部分。

	//特定于嵌入的全局函数：输入help()获取更多的rhino提示
	print(x);				//全局输出函数，将内容输出到控制台
	version(170);			//告诉Rihno需要使用JS 1.7的语言特性
	load(filename,...);		//加载并执行1个或多个JavaScript代码文件
	readFile(file);			//读取文本文件，并以字符串形式返回内容
	readUrl(url);			//读取URL的原文内容，并以字符串的形式返回内容
	spawn(f);   			//运行f()或者在一个新线程中加载执行文件f
	runCommand(cmd,[args...]);//使用o或多个命令参数来运行系统命令
	quit()					//退出Rhino

Rhino会将Java包和类表示成JavaScript对象：
	
	//全局变量packages是Java包层次机构的根
	Packages.any.package.name  //任何来自Java CLASSPATH的包
	java.lang 				//全局变量java是Package.java的短名
	javax.swing				//javax是package.javax的短名

	//类：能像包的属性一样存取
	var System = java.lang.System;
	var JFrame = javax.swing.JFrame;

由于Rhino把包和类表示为JavaScript对象，因此可以将它们赋值给变量从而得到相应的短名。如果愿意，也可以正式导入它们：

	var ArrayList = java.util.ArrayList;//为类创建短名
	importClass(java.util.HashMap); 	//其等同于:var HashMap = java.util.HashMap
	
	//使用importPackage()导入包(惰性地)
	//不要导入java.lang：太多的名字和JavaScript全局变量有冲突
	importPackage(java.util);
	importPackage(java.net);
	
	//另一技术：传入任意数量的类和包给JavaImport()
	//并在with语句中使用它返回的对象
	
	var guipkgs = JavaImporter(java.awt.event,Packages.javax.swing);
	with(guipks){
		/* 这里定义Font、ActionListener和JFrame等类 */
	}
	
	Java类能使用new进行实例化，就像JavaScript类一样:
	
	//对象：使用new实例化Java类
	var f = new java.io.File("/tmp/test");//我们将在后面使用这些对象
	var out = new java.io.FileWriter(f);
Rhino让JavaScript的instanceof云算符能用于Java对象和类：
	f instanceof java.io.File 		// => true
	out instanceof java.io.Reader  // => false:它是Writer而非Reader
	out instanceof java.io.Closeable // => true:Write实现Closeable

##		用node实现异步I/O
Node是基于C++的高速JavaScript解释器，绑定了用于进程、文件和网络套接字等底层Unix API，还绑定了HTTP客户端和服务器API。除了一些专门命名的同步方法外，Node的绑定都是异步的，且Node程序默认绝不阻塞，这意味着它们通常具有强大的可伸缩能力并能有效地处理高负荷。由于API是异步的，因此Node依赖事件处理程序，通常使用嵌套函数和闭包来实现。

我们之前从print()和load()函数开始介绍Rhino。Node也是类似函数，只是名字不同：
	
	//Node定义了console.log(),可以像在浏览器中那样调试代码输出
	console.log("Hello Node");//调试输出到控制台
	
	//使用require()替代load()
	//它加载并执行(只有一次)命名模块，返回包含其导出标示符(exported symbol)的对象
	var fs = require("fs");//加载"fs"模块，并返回其API对象

Node 在其全局对象实现了所有标准的ECMAScript5构造函数、属性和函数。除此之外，它也支持客户端的计时器函数集setTimeout()、setInterval()、clearTimeout()和clearInterval():
	
	//1秒钟后输出"Hello World"
	setTimeout(function(){ console.log("Hello World");},1000);

Node在process名字空间中定义了其他重要的全局属性。这里有该对象的一些属性：
	
	process.version  //Node的版本字符串信息
	process.argv	//"node"命令行的数组参数，arfv[0]是"node"
	process.env		//环境变量对象。例如:process.env.PATH
	process.pid		//进程id
	process.getuid() //返回用户id
	process.cwd()	//返回当前的工作目录
	process.chdir()	//改变目录
	process.exit()	//退出(运行shutdown命令之后)
由于Node的函数和方法都是异步的，因此，当它们等待运算完成时并不产生阻塞。非阻塞方法的返回值无法返回异步运算的结果给你。如果想要获取结果，或想知道完成运算的时间，当结果准备好或完成运算(或发生错误)时，就必须提供Node能调用的一个函数。

Node的设计目标示高性能I/O,因此其流API常被用到。当数据准备好时，可读流会触发事件。在下面代码中，假设s是在其他地方得到的可读流。下面我们将看到如何从文件和网络套接字中得到流对象。

	//输入流s
	s.on("data",f);  //当数据可用时，把它作为参数传给f
	s.on("end",f);	//当不再有数据到达，在文件结束(EOF)时会触发“end”事件
	s.on("error",f) //如果发生错误，把异常传给f()
	s.readable		//如果它是依旧打开的可读流，返回true；
	s.pasus()		//“暂停”data事件，例如，为了限制上次上传
	s.resume();		//再次恢复

	//如果想把字符串传给"data"事件处理程序，请指定编码
	s.setEncoding(enc);		//如何对字节编码:"utf-8"、"ascii"或"base64"
可写流比可读流的核心事件少，使用write()方法发送数据，当所有数据写入完毕后，使用end()方法结束流。write()方法绝不会阻塞。若Node无法立即写入数据而不得不在内部缓存它，则write()方法返回false

	//输出流s
	s.write(buffer);		//写入二进制数据
	s.write(string,encodeing)//写入字符串数据，默认编码是"utf-8'
	s.end()					//结束流
	s.end(buffer);			//写入最后的二进制数据块并结束
	s.end(str,encoding);	//写入最后的字符串并结束所有流
	s.writeable;			//如果流依旧打开且可写入，返回true
	s.on("drain",f)			//当内部缓冲区为空，调用f()
如上所示，Node的流能处理二进制数据和文本数据。文本传输使用的是普通JavaScript字符串，字节使用Node特定的缓冲区来处理。Node的缓冲区是有固定长度的类数组对象，其元素数量必须在0~255之间。

好了，关于JavaScript的服务端，先写这么多，感觉node是越来越火了，后续会对node进行一波学习。



	

	
