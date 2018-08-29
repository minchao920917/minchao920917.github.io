---
layout: post
title: node+ES6环境搭建
date:   2017-08-14 22:31:54
categories: ES6 node.js
tags:	node.js ES6
excerpt:	既然学了ES6,有了解了node的使用规则，那么，我们现在就简单的讲node和ES6的语法进行一次融合，来搭建一个node+ES6的环境。
mathjax: true
author:	闵超
---
* content
{:toc}
#		node+ES6环境搭建

既然学了ES6,有了解了node的使用规则，那么，我们现在就简单的讲node和ES6的语法进行一次融合，来搭建一个node+ES6的环境。

##		准备工作

前期的准备工作

1.	node的安装
2.	webstorm的安装

##		node的安装

###		下载

下载对应你系统的Node.js版本:[https://nodejs.org/en/download/](https://nodejs.org/en/download/)

###		选择安装目录进行安装

直接双击.msi文件进行安装

重要步骤:
可以选择自己的环境也可以使用默认的环境

![2267589-b87cc08121e1c880.png](https://i.loli.net/2017/08/14/59914a720aae8.png)

点击 win+R键入cmd打开命令行查看node是否安装好

键入node-v

![QQ截图20170814150223.png](https://i.loli.net/2017/08/14/59914b94cce5f.png)


键入npm -v 

![npm-v.png](https://i.loli.net/2017/08/14/59914b7dd9ff0.png)


###		环境配置

说明：这里的环境配置主要配置的是npm安装的全局模块所在的路径，以及缓存cache的路径，之所以要配置，是因为以后在执行类似：npm install express [-g] （后面的可选参数-g，g代表global全局安装的意思）的安装语句时，会将安装的模块安装到【C:\Users\用户名\AppData\Roaming\npm】路径中，占C盘空间。
例如：我希望将全模块所在路径和缓存路径放在我node.js安装的文件夹中，则在我安装的文件夹【D:\Develop\nodejs】下创建两个文件夹【node_global】及【node_cache】：

如图创建两个文件

![创建两个文件.png](https://i.loli.net/2017/08/14/59914c2509da8.png)

创建完两个空文件夹之后，打开cmd命令窗口，输入
	
	npm config set prefix"C:\Program Files\nodejs\node_global"
	npm config set cache "C:\Program Files\nodejs\node_cache"

如图所示:

![输入两个命令行.png](https://i.loli.net/2017/08/14/59914c7dd44d8.png)

接下来，需要修改环境变量了


“我的电脑”-右键-“属性”-“高级系统设置”-“高级”-“环境变量”

进入环境变量对话框，在【系统变量】下新建【NODE_PATH】，

环境变量名是:NODE_PATH

值：

	C:\Program Files\nodejs\node_global\node_modules

如图

![配置NODE_PATH.png](https://i.loli.net/2017/08/14/59914ec55378a.png)

将用户变量中Path的值修改

	C:\Program Files\nodejs\node_global\

![配置用户变量.png](https://i.loli.net/2017/08/14/59914f20549f3.png)
	

![配置用户变量二.png](https://i.loli.net/2017/08/14/59914f5fd5278.png)

![修改用户变量三.png](https://i.loli.net/2017/08/14/5991503d81981.png)

命令行中输入

	npm install express -g     # -g是全局安装的意思

如果能执行并准确安装就说明node配置成功了。


##		ES6环境搭建

在搭建es6开发环境之前，先简单介绍一下es6。

ECMAScript 6.0（以下简称 ES6）是 JavaScript 语言的下一代标准，已经在2015年6月正式发布了。它的目标，是使得 JavaScript 语言可以用来编写复杂的大型应用程序，**成为企业级开发语言**。

我们为什么要使用es6？es6有什么优点？......，博客前面有一个es6专题系列，来介绍es6的使用。本次分享的内容是 es6的开发环境搭建。

那么，你肯定又要问，问什么要搭建es的开发环境，上面不都说 es6是JavaScript 语言的下一代标准了嘛，我们平时写的js都不需要搭建环境，直接在浏览器里就能运行。


##		使用Webstorm IDE进行编写

###		创建工程目录:

先创建一个项目的工程目录(ES6):并在目录下面创建两个文件夹:src和dist

-	src:书写ES6代码的文件夹，写的js程序都放在这里
-	dist：利用Babel编译的ES5代码的文件夹，在HTML需要引入这里的js文件(即)


首先在src下创建index.html

	<!DOCTYPE html>
	<html lang="en">
	    <head>
	        <title></title>
	        <meta charset="UTF-8">
	        <meta name="viewport" content="width=device-width, initial-scale=1">
	        <script src="../dist/index.js"></script>
	    </head>
	    <body>
	        请按F12查看控制台
	    </body>
	</html>

着重注意

	<script src="./dist/index.js"></script>
是dist下的js文件

在src目录下，新建index.js文件。这个文件很简单，我们只作一个a变量的声明，并用console.log()打印出来。

###		创建src下的index.js文件

	let a=111;
	console.log(a);
我们用let声明，这里let是ES6的一种声明方式，接下来我们需要把这个ES6的语法文件自动编译成ES5的语法文件。

###		npm初始化项目

初始化项目文件,使用cmd命令行进入到文件中输入
	
	npm init -y
-y代表全部默认同意，就不用一次次按回车了。命令执行完成后，会在项目根目录下生产package.json文件。

	{
	  "name": "ES6",
	  "version": "1.0.0",
	  "description": "firstES6",
	  "main": "index.js",
	  "scripts": {
	    "test": "echo \"Error: no test specified\" && exit 1"
	  },
	  "author": "minchao",
	  "license": "ISC"
	  
	}

![package.png](https://i.loli.net/2017/08/14/59915973dc4f6.png)

可以自己定义内容，**下面devDependencies是后续生成的，暂时是没有的。**


### 		全局安装Babel-cli ###

在node终端要
如果npm很慢的话，就用cnpm来安装，这里，npm和cnpm的区别是，前者是国外镜像，后者是淘宝的福利，国内镜像，开源的并且是同步的哦，很方便。

 	npm install -g cnpm --registry=https://registry.npm.taobao.org

切换成国内镜像之后，再从国内镜像安装babel脚手架。

	cnpm install -g babel-cli

很快就安装好了
![安装bable脚手架.png](https://i.loli.net/2017/08/14/59915d50662a6.png)

###		本地安装babel-preset-es2015 和 babel-cli

	cnpm install --save-dev babel-preset-es2015 babel-cli

![本地安装babel-preset-es2015.png](https://i.loli.net/2017/08/14/59915e51ddc3d.png)

安装完成之后，package.json中就会多了devDependencie选项。


	  "devDependencies": {
	    "babel-cli": "^6.24.1",
	    "babel-preset-es2015": "^6.24.1"
	  }

###		新建.babelrc

在根目录下新建.babelirc文件(注意，以点揩油的文件是隐藏文件，需要在linux环境通过命令创建)并输入下面的代码

	{
	    "presets":[
	        "es2015"
	    ],
	    "plugins":[]
	}

这个文件的建立之后，我们就可以在终端输入的转换命令了，这次ES6成功转化为ES5的语法

###		对js进行转码

接着，我们开始转码了(数学老师：注意看，我要变形了)
	
	babel src/index.js -o dist/index.js

将转码后的结果放入到dist/index.js文件中，这时，我们打开会发现

![转码之后的结果.png](https://i.loli.net/2017/08/14/59915f973a510.png)

以上的一个项目ES6就是最简单的ES6环境搭建了。

##		总结

搭建顺序:

1.	创建项目创建两个文件夹src和dist
2.	创建src下对应的html和js文件
3.	使用npm init 初始化项目生成package.json（项目信息文件）
4.	使用 npm install -g babel-cli 全局安装(dist下的文件夹js和src下js一样没有变化)
5.	创建.babelrc文件,用于本地转码后有区别
6.	使用 npm install --save-dev babel-preset-es2015 babel-cli本地安装(dist下的js文件变化)
7.	babel src/index.js -o dist/index.js转码生成ES5语法

文件结构

![目录结构.png](https://i.loli.net/2017/08/14/599160adb96fe.png)


##		扩展


在学习vue 的时候，可以使用npm run build 直接利用we
bpack进行打包，在这里也希望利用这种方式完成转换。打开package.json文件，把文件修改成下面的样子。
	
	{
	  "name": "es6",
	  "version": "1.0.0",
	  "description": "",
	  "main": "index.js",
	  "scripts": {
	    "build": "babel src/index.js -o dist/index.js"
	  },
	  "keywords": [],
	  "author": "",
	  "license": "ISC",
	  "devDependencies": {
	    "babel-cli": "^6.24.1",
	    "babel-preset-es2015": "^6.24.1"
	  }
	}

修改好后，以后我们就可以使用 npm run build 来进行转换了。

这样，一个简单的基本的编译环境就OK了。