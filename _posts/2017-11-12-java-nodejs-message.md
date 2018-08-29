---
layout: post
title: java与nodejs的一次握手
date:   2017-11-12 23:31:54
categories: node.js Java
tags:	node.js Java
excerpt:	本地通过socket进行通信。node.js作为服务器，java向node.js请求消息
mathjax: true
author:	闵超
---
* content
{:toc}
#		java与nodejs的一次握手

重构公司OA主页的过程中，添加了BMP的审批流程，在重构过程中，添加了消息推送功能，也就是说，如果登陆人的OA主页打开，当别人进行了审批的时候，流程走到当事人的步骤的时候，当事人需要进入BMP审批流程，添加了后台推送的功能。

#	本地test

直接在本地通过socket进行通信。node.js作为服务器，java向node.js请求消息，node.js处理请求并返回。

##		步骤一：创建node服务器并监听socket端口

创建 app.js

	var net = require('net');  
	var HOST = '10.186.255.231';  
	var PORT = 11111;  
	  
	net.createServer(function(socket) {  
	    console.log('java已经连接: ' +  
	        socket.remoteAddress + ':' + socket.remotePort);  
	  
	    socket.on('data', function(data) {  
	        console.log('从java获得信息 : ' + data);  
	        socket.write('node服务器已经收到信息\n' );  
	    });  
	  
	    socket.on('close', function(data) {  
	        console.log('关闭: ' + socket.remoteAddress + ' ' + socket.remotePort);  
	    });  
	}).listen(PORT, HOST);  //启动服务器
	  
	console.log('Server listening on ' + HOST +':'+ PORT);  

引入net模块

	npm install net 

启动node服务并监听11111的端口状态

	node app.js
如图所示：

![启动node服务器.png](https://i.loli.net/2018/01/17/5a5f00025f205.png)

##		步骤二：创建java客户端

在src下新建javatest文件夹创建test.java文件

	package javatest;
	import java.net.Socket;
	import java.util.Scanner;
	import java.io.BufferedReader;
	import java.io.BufferedWriter;
	import java.io.InputStreamReader;
	import java.io.OutputStreamWriter;
	import java.io.PrintWriter;
	
	public class test{
	    public static void main(String[] arges){
	        try{
	            Scanner scan = new Scanner(System.in);
	            Socket socket = new Socket ("10.186.255.231", 11111);
	            BufferedReader in = new BufferedReader (new InputStreamReader (socket.getInputStream()));
	            PrintWriter out = new PrintWriter (
	                    new BufferedWriter( new OutputStreamWriter( socket.getOutputStream ())), true);
	            String str = scan.nextLine();
	            while(!str.equals("quit")){
	                out.println(str);
	                System.out.println(in.readLine());
	                str = scan.nextLine();
	            }
	            out.println(str);
	            System.out.println(in.readLine());
	            scan.close();
	            socket.close();
	        }catch(Exception e){
	            System.out.println(e);
	        }
	    }
	}

直接右击运行java文件
如图所示

![启动java客户端.png](https://i.loli.net/2018/01/17/5a5f00025c0bc.png)

node 服务器如图所示

![node.png](https://i.loli.net/2018/01/17/5a5f00025b130.png)
##		测试是否成功握手

在java客户端的后台输入：

hello nodejs 后回车

java客户端如图所示

![java客户端发送信息.png](https://i.loli.net/2018/01/17/5a5f000253397.png)

node如图所示

![node获取string.png](https://i.loli.net/2018/01/17/5a5f00dfe4157.png)


ip地址请忽略
