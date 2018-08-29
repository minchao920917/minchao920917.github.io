---
layout: post
title:  "Webpack"
date:   2017-02-20 23:14:54
categories: Webpack
tags:	Webpack
excerpt:	打算系统的学一下js的MVVM框架，官方推荐使用 Webpack + vue-loader构建这些单文件 Vue 组件，于是就开始了webpack的学习之旅。 因为原来没有用过任何的构建工具与模块化工具，所以本系列会比较基础。
mathjax: true
author:	闵超
---

* content
{:toc}

##	Webpack学习第一部分

最近学习js的框架，选择了vue，然后接触到了vue中的单文件组件，官方推荐使用 Webpack + vue-loader构建这些单文件 Vue 组件，于是就开始了webpack的学习之旅。 因为原来没有用过任何的构建工具与模块化工具，所以本系列会比较基础。

###		什么是webpack

Webpack 是德国开发者 Tobias Koppers 开发的模块加载器兼打包工具，在webpack中，它能把各种资源，例如JS（含JSX）、coffee、样式（含less/sass）、图片等都作为模块来使用和处理。因此, Webpack 当中 js 可以引用 css, css 中可以嵌入图片 dataUrl。 对应各种不同文件类型的资源, Webpack 有对应的模块 loader比如vue用的是vue-loader。

### 	环境安装

因为webpack是一个基于node的项目，所以首先需要确保你的电脑里面已经安装了node.js，以及npm。在这里我使用的版本是：
node：v6.10.0 ，npm：3.10.10,若是版本问题，请更新到最新版。 若是有出现npm安装过慢的情况，可以使用nrm这个项目来进行npm源地址的切换。

首先我们直接进行全局的安装，运行如下命令：npm install webpack -g，可能需要一点时间。

安装成功后，在命令行输入webpack -h即可查看当前安装的版本信息。以及可以使用的指令。

当然，我们都应该将webapck安装到当前的项目依赖中，此时就可以使用项目的本这样就可以使用项目本地版本的 Webpack。

通过cd/dir确保已经进入项目目录

确定已经有 package.json，没有就通过

npm init 

创建，直接一路回车就好，后面再来详细说里面的内容。

安装 webpack 依赖

npm install webpack --save-dev

简单的写法：缩写形式 

npm i webpack -D

save：模块名将被添加到dependencies，可以简化为参数-S。

–save-dev: 模块名将被添加到devDependencies，可以简化为参数-D。

	{
	  "name": "first-demo",
	  "version": "1.0.0",
	  "description": "this is my first-demo",
	  "main": "index.js",
	  "scripts": {
	    "test": "echo \"Error: no test specified\" && exit 1"
	  },
	  "author": "minchao",
	  "license": "MIT",
	  "dependencies": {},
	  "devDependencies": {
	    "webpack": "^1.12.14"
	  }
	}

既然环境都已经安装好了，那么我们就开始来用webpack进行我们的第一个打包运行程序吧！

###		开始创建我们第一个打包程序

首先创建一个静态页面 index.html 和一个 JS 入口文件 entry.js,（这里你想用什么名字都可以，只需要在打包的时候读取文件为该名字就好，不过，到时候就知道这个名字的含义啦！）：

	<!-- index.html -->
	<html>
	<head>
	    <meta charset="utf-8">
	</head>
	<body>
	    <h1 id="app"></h1>
	    <script src="bundle.js"></script>
	    <!-- 注意这里引入的不是我们创建的文件，而是用webpack生成的文件 -->
	</body>
	</html>

下面是js部分

	/*** entry.js ***/
	document.getElementById('app').innerHTML="这是我第一个打包成功的程序";

文件都已经创建成功了，那么就开始我们的打包吧！

执行这一句: webpack entry.js bundle.js

在浏览器中打开index.html，就能看到我们设置的文字了！：这是我第一个打包成功的程序

这么简单的功能直接在html中引入不就好了吗？确实是这样的，不过我们这才刚刚开始，不要急。

下面我们再来增加一个文件，名为first.js内容如下：

	var h2= document.createElement("h2")
	h2.innerHTML="这就是我的第二个打包程序啦！";
	document.body.appendChild(h2);
	
更改 entry.js:

	document.getElementById('app').innerHTML="这是我第一个打包成功的程序";

//添加

	require("./first.js");

再来进行一次重复的工作，再打包一次。webpack entry.js bundle.js，如果成功，打包过程会显示日志：

	Hash: b1cfe7ff9d75ce235dc9
	Version: webpack 1.12.14
	Time: 54ms
	    Asset     Size  Chunks             Chunk Names
	bundle.js  1.82 kB       0  [emitted]  main
	   [0] ./entry.js 208 bytes {0} [built]
	   [1] ./first.js 145 bytes {0} [built]

总结：Webpack 会分析入口文件，解析包含依赖关系的各个文件。这些文件（模块）都打包到 bundle.js 。Webpack 会给每个模块分配一个唯一的 id 并通过这个 id 索引和访问模块。在页面启动时，会先执行 entry.js 中的代码，其它模块会在运行 require 的时候再执行。

刷新浏览器，可以发现我们的刚刚的代码已经生效，又有了新的文字出现。

我们已经成功的把简单的事情变得复杂了，把我们的只有几行代码的两个文件first.js、entry.js使用webpack进行文件打包生成了bundle.js。

###		Webpack 能做的就是这样，只能处理 JavaScript 模块。

当然它如果能做的仅仅是这样，那它也就不可能这么火了。所以它可以通过引入其他的loader，进而可以处理其它类型的文件。

####		loader介绍

Loader可以理解为是模块和资源的转换器，它本身是一个函数，接受源文件作为参数，返回转换的结果。这样，我们就可以通过require来加载任何类型的模块或文件，比如VUE、JSX、SASS 或图片。

先来看看 loader 有哪些特性？

1.	Loader可以通过管道方式链式调用，每个loader可以把资源转换成任意格式并传递给下一个loader，但是最后一个loader必须返回JavaScript。
2.	Loader可以同步或异步执行。
3.	Loader运行在node.js环境中，所以可以做任何可能的事情。
4.	Loader可以接受参数，以此来传递配置项给loader。
5.	Loader可以通过文件扩展名（或正则表达式）绑定给不同类型的文件。
6.	Loader可以通过npm发布和安装。除了通过package.json的main指定，通常的模块也可以导出一个loader来使用。
7.	Loader可以访问配置。
8.	插件可以让loader拥有更多特性。
9.	Loader可以分发出附加的任意文件。

####	loader使用
安装

根据上面说的loader的知识，就这样编译是肯定不行的，所以我们安装用来读取css文件的css-loader，再用 style-loader 把它插入到页面中。

在命令行中输入：npm install css-loader style-loader --save-dev

在package.json中，主要是devDependencies这个字段有了改变：

	"devDependencies": {
	    "css-loader": "^0.23.1",
	    "style-loader": "^0.13.0",
	    "webpack": "^1.12.2"
	}

当然你可以用一个更加方便的方式进行安装，可以直接在package.json中，添加相应的依赖（如上面的代码），之后的命令行中运行npm intall，它会自动帮我们安装相应的依赖。

安装完毕。

加载 CSS 文件

在之前的first-demo中来添加一个css文件。style.css,在里面添加

	body {
	    background: red;
	}

修改我们的entry.js，原文件不变，添加require("!style!css!./style.css");,用来引入我们的css文件。

我们继续编译:

webpack entry.js bundle.js

完成后，刷新我们的页面，背景颜色是不是已经变成了红色了呢？

扩展名自动绑定loader

这就是我们的loader的使用方式了。如果每次 require CSS 文件的时候都要写 loader 前缀!style!css!这样的东西，显然是一件很麻烦的事情。我们需要它可以根据模块类型（扩展名）来自动绑定需要的 loader。

来看看更简便的方式，将 entry.js 中的 require("!style!css!./style.css")修改为require("./style.css")，可以改变一个背景颜色让你更明显的查看到变化！然后执行：

webpack entry.js bundle.js --module-bind "css=style!css"


没成功对吧! 因为!在命令行中具有特殊的含义，所以我们需要对它进行转义操作。再来试试：

 webpack ./entry.js bundle.js --module-bind "css=style\!css"

成功的话，应该能再次看到背景的变化。

虽然这样可以将多个css文件进行编译打包，但是总感觉很是繁琐，我不想每次都运行那么一长串的命令怎么办？

在上面我们已经尝试过了两种对于loader的使用方式，无论是在require的时候编写我们loader的前缀，还是在我们的命令行中进根据扩展名来自动绑定我们的loader，显然都不够自动化，在需要编译的语言继续增加的情况下，显然会是一个噩梦。 所以webapck实际上为我们提供了一个简单的方法，下面就一起来看看。

###		了解webpack配置

Webpack在执行的时候，除了在命令行传入参数，还可以通过指定的配置文件来执行。默认情况下，会搜索当前目录的webpack.config.js文件，这个文件是一个 node.js 模块，返回一个 json 格式的配置信息对象，或者通过 --config 选项来指定配置文件。

所以现在我们就来新建一个webpack.config.js，在里面填写进下面的内容：

	var Webpack = require("webpack");
	module.exports = {
	    entry: ["./entry.js"],
	    output: {
	        path: __dirname,
	        filename: "bundle.js"
	    },
	    module: {
	        loaders: [{
	            test: /\.css$/,
	            loader: "style!css"
	        }]
	    }
	}

我们现在仅仅需要运行:webpack，如果你的配置没有问题的话，可以在命令行中看到正确的输出，因为这个命令会自动在当前目录中查找webpack.config.js的配置文件，并按照里面定义的规则来进行执行。

修改css文件感受一下。

上面我们仅仅是使用了这个配置文件，我们肯定想在实际的工作环境中，自我对于项目进行针对性的配置。下面我们就先来简单的了解一下里面参数的意义：



- entry：指入口文件的配置项，它是一个数组的原因是webpack允许多个入口点。 当然如果你只有一个入口的话，也可以直接使用双引号"./entry.js"


- output：配置打包结果，path定义了输出的文件夹，filename则定义了打包结果文件的名称


- module：定义了对模块的处理逻辑，这里可以用loaders定义了一系列的加载器，以及一些正则。当需要加载的文件匹配test的正则时，就会调用后面的loader对文件进行处理，这正是webpack强大的原因。

在这里仅仅能做一些很简单的介绍，如果想要真正做到在项目中的实际应用，还需要大量的练习与尝试。在等真正用到了再记录下来。

###		了解webpack插件

下面就来看看webpack中的插件：

插件可以完成更多loader不能完成的功能。插件的使用一般是在webpack.config.js中的plugins 选项中指定。

Webpack本身内置了一些常用的插件，还可以通过npm安装第三方插件。

接下来，我们从一个最简单的，用来给输出的文件头部添加注释信息BannerPlugin的内置插件来实践插件的配置和运行。

修改webpack.config.js，添加 plugins配置项：

	var Webpack = require("webpack");//必须引入
	module:{
	},
	plugins: [
	    new webpack.BannerPlugin("这里是打包文件头部注释！")//注意这是一个数组..
	]
运行正确的话应该是这样的，打开bundle.js，会发现在文件头部已经有了我们添加的注释：

	/*! 这里是打包文件头部注释 */
	/******/ (function(modules) { // webpackBootstrap
	/******/    // The module cache
	/******/    var installedModules = {};
	        /***  省略 ***/
	        })
最简单的插件使用方式就是这样的了

[文章出处](https://github.com/guowenfh/vue-webpack/tree/master/webpack)

