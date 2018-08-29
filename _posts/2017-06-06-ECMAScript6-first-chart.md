---
layout: post
title: "ES6第一章 ES6简介和Babel转码"
date: 2017-06-06 23:40:54
categories: ES6
tags: ES6
excerpt: es6新增let命令，用来声明变量。它的用法类似于var，但是所声明的变量,只有在let命令所在的代码块内有效,同时也新增了Const，用于声明常量
mathjax: true
author:	闵超
---

* content
{:toc}


## 	什么是ES6

ECMAScript 6.0是JavaScript语言的下一代标准，在2015年6月正式发布，它的目标是，是的JavaScript语言
可以用来编写复杂的大型应用程序，成为企业级开发语言。

##	ECMAScript和JavaScript的关系
1996年11月，JavaScript的创建者Netscape公司，决定将JavaScript提交给国际标准化组织ECMA,
希望JavaScript能成为国际标准，为什么不叫JavaScript，有两个原因，一个是商标，Java是Sun公司
的商标，根据授权协议，只有Netscape公司可以合法使用JavaScript这个名字，二是，想体现这门语言
制定者是ECMA,不是Netscape，这样有利于保证这门语言的开放性和中立性
ECMAScript是JavaScript的规格，JavaScript是ECMAScript的实现。（另外的还有Jscript
和ActionScript）
ES6从开始定知道最后发布，用了整整15年

ES1.0 是1997年发布
ES2.0 是1998年
ES3.0 是1999年
3.0版本是一个巨大的成功，在业界得到了广泛的支持，成为通行标准，奠定了JavaScript的基本语法
ES4.0 从2000年开始酝酿，但最后没有通过，因为版本太激进了，对ES3做了彻底的升级
负责制定ECMAScript标准的成员，包括Microsoft、Mozilla、Goggle等大公司驳回了
ES4.0 2007年10月，以Yahoo、Microsoft、Google为首的大公司，反对JavaScript的大幅升级
ES3.1 2008年7月 终止了ES4.0的开发，只涉及部分功能改善，发布成了ES3.1
ES5.0 2009年12月，发布
ES5.1 2011年6月发布
ES6.0 2013年2月草案被冻结
ES6.0 2013年12月 发布
ES6.0 2015年6月 ECMAScript 6正是通过

##		部署进度
各大浏览器的最新版本，对ES6的支持可以看kangax.github.io/es5-compat-table/es6/。
随着时间的推移，支持度已经越来越高了，ES6的大部分特性都已经实现了

Node.js是JavaScript语言的服务器运行环境，对ES6的支持度比浏览器更高。通过Node，可以
体验更多的ES6的特性，建议使用版本工具nvm，来安装Node，以为可以自由切换版本。

##	第一章	Babel转码器
Babel是一个广泛使用的ES6转码器，可以将ES6转为ES5代码，从而在现有环境执行，这意味着，你可以用
ES6的方式编写程序，又不用担心现有环境是否支持

	//转码前
	input.map(item => item +1);
	
	//转码后
	input,map(function(item){
		return item +1;
	})


##	配置文件**.babelrc**
Babel的配置文件是**.babelrc**,存放在项目的根目录下。
使用Babel的第一步，就是配置这个文件，该文件用来设置转码规则和插件，基本格式如下

	{
	   "presets":[],
	   "plugins":[]
	}

presets字段设定转码规则，官方提供一下的规则集，你可以根据需要安装

plugins字段设定转码插件

####	ES2015转码规则

	$ npm  install  --save-dev babel-preset-es2015

####	react转码规则

	$npm install --save-dev babel-preset-react

####	ES7不同阶段语法天的转码规则（共四个阶段），选装其中一个

	$npm install --save-dev babel-preset-stage-0
	$npm install --save-dev babel-preset-stage-1 
	$npm install --save-dev babel-preset-stage-2
	$npm install --save-dev babel-preset-stage-3

然后，将这些规则加入到 .babelrc

	{
	  "presets":[
		"es2015",
		"react",
		"stage-2"
	  ],
	  "plugins":[]
	}

注意，一下所有的Babel工具和模块的应用都必须先写好.babelrc。

###	命令行转码babel-cli

Babel提供babel-cli工具，用于命令行转码

它的安装命令如下

	$npm install --global babel-cli

基本用法如下

	#转码结果输出到标准输出
	$babel example.js
	
	#转码结果写入一个文件
	# --out-file 或-o 参数指定输出文件
	$ babel example.js -o compiled.js
	
	#整个目录转码 
	# --out-dir 或 -d参数指定输出目录
	$ babel src --out-dir lib
	#或者
	$ babel src -d lib
	# -s参数生成 source map文件
	$babel src -d lib  -s

上面代码是在全局环境下，进行Babel转码。意味着，如果项目要运行，全局环境必须要有Babel，
这也就是说项目产生了对环境的依赖。
另一方面，这样做也无法支持不同项目使用不同版本的Babel

一个解决办法就是将babel-cli安装在项目之中
	
	#安装
	$ npm install --save-dev babel-cli

然后改写package.json

	{
		//...
		"devDependencies":{
			"babel-cli":"^6.0.0"
		},
		"scripts":{
			"bulid":"babel src -d lib"
		},
	}

转码的时候，就执行下面的命令

	$ npm run build

###		babel-node

babel-cli工具自带一个babel-node命令，提供一个支持ES6的REPL环境，它还支持Node的
REPL环境的所有功能，而且可以直接运行ES6代码

它不用单独安装，而是随着babel-cli一起安装，然后执行babel-node就进入了REPL环境
	
	$ babel-node
	> (x => x *2)(1)
	2

babel-node命令可以直接运行ES6脚本，将上面的代码放入脚本文件es6.js,然后直接运行

	$ babel-node es6.js
	2

babel-node也可以安装在项目中
	
	$ npm install --save-dev babel-cli

然后改写package.json

	{
		"scripts":[
			"script-name":"babel-node script.js"
		]
	}

解释：使用babel-node替代node,这样script.js本身就不用做任何转码处理

###		babel-register

babel-register模块改写require命令，为它加上一个钩子。此后，每当使用require加载
.js、.jsx、.es和.es6后缀名的文件，就会先用Babel进行转码

	$npm install --save-dev babel-register

使用时，必须首先加载babel-register。

	require("babel-register");
	require("./index.js");

然后，就不需要手动对index.js进行转码了
需要注意的是，babel-register只会对require命令加载的文件转码，而不会对大年文件转码。另外，由于它是
实时转码，所以只适合在开发环境使用

###	 babel-core

如果某些代码需要调用Babel的API进行转码，就要使用babel-core模块
安装命令如下

	$ npm install babel-core --save

然后，在项目中就可以调用babel-core

	var babel = require('babel-core');

	//字符串转码
	babel.transform('code();',optins);
	//=>{code,map,ast}
	
	//文件转码(异步)
	babel.transformFile('filename.js',options,function(err,result){
		result;//=>{code,map,ast}
	})
	
	//文件转码(同步)
	babel.transforFileSync('filename.js',options);
	//=>{code,map,ast}
	
	//Babel AST转码
	babel.transformFromAst(ast,code,options);
	//=>{code,map,ast}



例子：

	var es6Code = 'let x = n => n +1';
	var es5Code = require('babel-core').transform(es6Code,{
			presets:['es2015']
		}).code;
	//'"use strict";\n\n var x =function x(n){\n return n +1;\n}'

解释：transform方法的第一个参数是一个字符串，表示需要被转换的ES6代码，第二个参数
是转换的配置对象。

###		babel-polyfill

Babel默认只转换新的JavaScript句法(syntax),而不是转换新的API，比如Iterator、Generator
、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法
（比如object.assign）都不会转码。

举例来说，ES6在Array对象上新增了Array.from方法，Babel就不会转码这个方法。如果想让这个方法
运行，必须使用babel-polyfill,为当前环境提供一个垫片。
安装命令如下

	$ npm install --save babel-polyfill

然后，在脚本头部，加入如下一行代码。

	import 'babel-polyfill';
	//或者
	require('babel-polyfill');
	Babel默认不转码的API非常多，详细清单可以查看babel-plugin-transform-runtime模块的
	definitions.js文件。

###		浏览器换将

Babel也可以用于浏览器环境。但是从Babel6.0开始，不再直接提供浏览器版本，而是要构建工具构建
出来。如果你没有或不想使用构建工具，可以通过安装5.x版本的babel-core模块获取。

	$ npm install babel-core@5

运行上面的命令以后，就可以在当前目录的node_mpdules/babel-core/子目录里面，找到
babel的浏览器版本browser.js（未精简）和browser.min.js(已经精简)

然后，将下面的代码插入网页
	<script src="node_modules/babel-core/browser.js"><scrpit>
	<script type="text/babel">
	//your ES6 CODE
	</script>

上面代码中，browser.js是Babel提供的转换脚本，可以在浏览器运行。用户的ES6脚本放在
script标签中，弹药注明type="text/babel"。另一种方法是使用babel-standalone模块提供的
浏览器版本，将其插入网页

	<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.4.4/babel,min,js"></scrip>
	<script type="text/babel">
	//your ES6 CODE
	</script>

注意，网页中实时将ES6代码转为ES5，对性能会有影响。生产环境需要加载转码完成的脚本。

下面是如何将代码打包成浏览器可以使用的脚本，一Babel配合Browserify为例。首先，安装
	babelify模块。
	$ npm install --save-dev babelify babel-preset-es2015

然后，再用命令行转换ES6脚本。

	$ browserif script.js -o bundle.js \
	-t [ babelify --presets [es2015]]
上面代码将ES6脚本script.js，转为bundle.js，浏览器直接加载后者就可以了。
在package.json设置下面的代码，就不用每次命令行都输入参数了

	{
		"browserify":{
			"transform":[["babelify",{"presets":["es2015"]}]]
		}
	}

###	 与其他工具的配合
许多工具需要Babel进行前置转码，这里有两个例子：ESLint和Mocha。
ESLint用于静态检查代码语法和风格，安装命令如下。
	
	$ npm install --save-dev selint babel-eslint

然后，在项目根目录下，新建一个配置文件 .eslintrc,在其中加入parser字段。

	{
		"parser":"babel-eslint",
		"rules":{
			...
		}
	}

再在package.json之中，加入响应的scripts脚本

	{
		"name":"my-module",
		"scripts":{
			"lint":"eslint myfiles.js"
		},
		"devDependencies":{
			"babel-eslint":"...",
			"eslint":"...",
		}
	}



###	Traceur转码器

Google公司的Traceur转码器，也可以将ES6代码转为ES5代码。

####	直接插入网页
Traceur允许将ES6代码直接插入网页，首先必须在网页头部加载Traceur库文件

	<script src="https://google.github.io/traceur-compiler/bin/traceur.js"></script>
	<script src="https://google.github.io/traceur-compiler/bin/BrowserSystem.js"></script>
	<script src="https://google.github.io/traceur-compiler/bin/bootstrap.js"></script>
	<script type="module">
	import './Greeter.js';
	</script>

上面代码一共有4个script标签，第一个是加载Trcaeur的库文件，第二个和第三个是将这个库文件
用于浏览器环境，第四个则是加载用户脚本，这脚本里面可以使用ES6代码。
注意，第四个script标签的type属性的值是module,而不是text/javascript。这是Traceur编译器识别
ES6代码的标志，编译器会自动将所有type=module的代码编译为ES5，然后再交给浏览器执行
除了外部ES6脚本，也可以直接在网页中放置ES6代码

####	在线转换
Traceur也提供一个在线编辑器，可以在线将ES6代码转为ES5代码，可以直接作为ES5代码插入网页运行

###		 命令行转换

作为命令行工具使用时，Traceur是一个Node的模块，首先需要用npm安装

	$ npm install -g traceur

安装成功后，就可以在命令行下使用Traceur了。

Traceur直接运行es6脚本文件，会在标准输出显示运算结果，以前的calc.js为例。

	$ traceur calc.js
	Calc constructor 
	9

如果要将ES6脚本转为ES5保存，要采用下面的写法。

	$ traceur --script cal.es6.js --out cale.es5.js

上面代码的--script选项表示指定输入文件，--out选项表示指定输出文件

为了防止编译不成功，可以加上--experimental选项

	$ traceur --script calc.es6.js --out calc.es5.js --experimental

命令行下转换生成的文件，就可以直接放到浏览器中运行

###	ES7

2013年3月，ES6草案封闭，不再接受新功能了，新的功能将被列入ES7

