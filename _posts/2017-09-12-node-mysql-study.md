---
layout: post
title: Nodejs+mysql简单封装增删改查方法
date:   2017-09-12 23:31:54
categories: node.js
tags:	node.js
excerpt:	搭建一个express+node+mysql的demo
mathjax: true
author:	闵超
---
* content
{:toc}

#	Nodejs+mysql简单封装增删改查方法


在express中进行mysql的连接

##		express -e test_mysql -y

生成项目

## 		cd test_mysql

进入项目

## npm start 是可以启动服务的


下面我们来一步步连接mysql数据库

环境准备 	mysql和navicat for mysql

如果你的电脑没有安装mysql和navicat,安装mysql和navicat for mysql的安装教程就不说，请自行查阅资料并安装好


首先，我们使用navicat连接上本地mysql服务器，并创建node_test数据库，然后运行下面代码：

	CREATE TABLE IF NOT EXISTS `node_book` (
	  `book_id` int(11) NOT NULL AUTO_INCREMENT,
	  `book_name` varchar(100) COLLATE utf8_bin NOT NULL,
	  `author` varchar(100) COLLATE utf8_bin NOT NULL,
	  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	  PRIMARY KEY (`book_id`)
	) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=4 ;

此代码会在node_test下生成一个表

##	开始吧

###		在项目下创建config文件夹

创建好之后，再再config文件夹下创建dbconfig.json文件，内容是:

	{
	  "db" : {
	    "host" : "localhost",
	    "port" : "3306",
	    "user" : "root",
	    "password" : "123456",
	    "dbName" : "node_test"
	  }
	}
	
解释：很显然，这是一个json文件，并且，里面只有一个db属性，db中包含的就是数据库的信息，host是主机，port是端口号，user是用户名，password是数据库登陆密码，dbName是数据库名。

很多人的mysql安装的时候是没有设置密码的，由于编者这本地的数据库是密码是123456，所有这里多了个数据库的密码。

至于dbName，就是你使用navicat创建的数据名。


###		在项目文件夹下创建util文件夹

创建好后，并在util文件夹下创建util.js并输入一下内容

	var fs  = require('fs')//引入文件模块
    , sys = require('util');//引入常用工具模块
	/**
	 * 获取json文件中的key的
	 * @param fileName 文件路径+文件名
	 * @param key 属性名key
	 * @returns {*}
	 */
	exports.get = function(fileName, key){
	    var configJson = {};
	    try{
	        var str = fs.readFileSync(fileName,'utf8');//读取json文件
	        configJson = JSON.parse(str);//将字符转成对象类型
	    }catch(e){
	        sys.debug("JSON 解析错误")
	    }
	    return configJson[key];//返回key的对象
	}

解释:

fs.readFileSync(fileName,'utf8')：以UTF格式同步读取配置文件信息

consfigJson = JSON.parse(str):使用JSON的parse方法解析读取后的配置文件内容转化为json对象

return configJson[key]：返回需要的key值配置信息

这是一个通用工具文件，util的get方法是获取json文件下的某个key信息

既然都工具都写好了，那怎么用呢，下面就是重点了

###		导入mysql的包

	npm install mysql
项目中用到的mysql模块，有了这些才能开始连接数据库

###		在项目文件夹创建model文件夹

创建好之后，接着在model下面创建base_model.js

	var Util = require('../util/util.js')
    , mysql = require('mysql')
    , dbClient;
	
	module.exports = function(){
	    __constructor();
	
	 	/**
	     *
	     * 数据库连接构造函数
	     */
	    function __constructor(){
	        var dbConfig = Util.get('./config/dbconfig.json', 'db');
	        /* 获取mysql配置信息 */
	        client = {};
	        client.host = dbConfig['host'];
	        client.port = dbConfig['port'];
	        client.user = dbConfig['user'];
	        client.password = dbConfig['password'];
	        dbClient = mysql.createConnection(client);
	        dbClient.connect();
	        /* 执行mysql指令，连接mysql服务器的一个数据库 */
	        dbClient.query('USE ' + dbConfig['dbName'], function(error, results) {
	            if(error) {
	                console.log('数据库连接错误: ' + error.message);
	                dbClient.end();
	            }
	            console.log('数据库'+dbConfig['dbName']+' 连接成功!');
	        });
	    }
	}

解释：

1.	mysql = require('mysql'):获取MySQL模块对象
1.	__constructor();//调用自身的构造器，其方法在本函数中定义
2.	function __constructor(){}：定义私有构造函数 __constructor

我们先从BaseModel的构造函数开始走流程，__constructor涉及数据库的连接，因此需要一些配置信息，这里通过一个util.js工具类来存放一些公用方法，包含json配置文件解析的方法。

3.	dbConfig = Util.get('config.json','db')：读取config.json配置文件，并获取db的配置信息
4.	client.host = dbConfig['host']：数据库连接服务器的host。
5.	client.port = dbConfig['port']:数据库连接服务器的端口。
6.	client.user = dbConfig['user'];数据库连接的用户名
7.	client.password = dbConfig['password'];数据库连接的用户密码
8.	dbClient = mysql.createConnection(client);创建MySQL服务器的连接对象
9.	dbClient = connect()：连接MySQL服务器
10.	dbClient.query('USE ' + dbConfig['dbName'], function(error, results) {...}执行数据的MySQL操作，use关键字是来简介M有SQL中的一个MySQL数据库

下面，我们的mysql连接已经写好了，那么如何来测试数据库连接是否能成功连接与否呢。

##		测试mysql数据库连接

###		我们在 routes文件夹下添加一个test.js
	
	var express = require('express');
	var router = express.Router();
	
	var BaseModel = require('../model/base_model.js');
	
	/* GET test page. */
	router.get('/', function(req, res, next) {
	    var baseModel = new BaseModel();//创建baseModel实例

	    res.render('index', { title: 'test mysql' });
	});
	
	module.exports = router;

解释：

var BaseModel = require('../model/base_model.js');//引用base_model模块，用于连接数据库

var baseModel = new BaseModel();//创建baseModel实例 数据库已经正确连接

###		在app.js中引入test.js的路由
	
	...
	var index = require('./routes/index');
	var users = require('./routes/users');
	var test = require('./routes/test');
	
	var app = express();
	...
	...
	...
	app.use('/', index);
	app.use('/users', users);
	app.use('/test', test);
	...
	
这时候，重启服务器
	
	npm start

并在你的浏览器中访问 [http://localhost:3000/test](http://localhost:3000/test)

看后台，你会发现

![node mysql 封装增删改查.png](https://i.loli.net/2018/01/16/5a5daeb2ad541.png)

此时，你的数据都已经连接成功了。

那么，我们开始对数据库的增删改查进行简单的封装。

##		（增）在某张表中insert一条数据

让我们回到base_model.js中来，在base_model.js中第13行左右，添加insert方法

	...
	module.exports = function(){
    	__constructor();

	/**
     *
     * @desc 向数据库插入数据
     * @param tableName string
     * @param rowInfo json
     * @param callback function
     * @return null
     */
    this.insert = function(tableName, rowInfo, callback){
        dbClient.query('INSERT INTO ' + tableName + ' SET ?', rowInfo, function(err, result) {
            if (err) throw err;
            callback(result.insertId);
        });
    };
	...

1.	dbClient.query('INSERT INTO ' + tableName + ' SET ?', rowInfo,...，会将rowInfo的json数据转化为key = value的形式。
2.	callback(result.insertId):result.insertId为插入数据后返回的主键值，并将执行结果交由回调函数处理

##	测试增加  insert方法

在test.js中，添加如下代码

	..
	router.get('/', function(req, res, next) {

	var baseModel = new BaseModel();
    var tableName = 'node_book';

    /*数据插入验证 */

    var rowInfo = {};
    var tableName = 'node_book';

    rowInfo.book_name = 'minchao book';
    rowInfo.author = 'minchao';
    console.log(tableName+"....."+ JSON.stringify(rowInfo));
    baseModel.insert(tableName, rowInfo, function(ret){
        console.log(JSON.stringify(ret));
    });

	res.render('index', { title: 'test mysql' });
	..
解释:

1.	rowInfo = {}:初始化一个json对象
2.	rowInfo.book_name：设置json需要插入数据库的boo_name变量
3.	rowInfo.author = 'minchao';设置json需要插入数据库的author变量
4.	baseModel.insert(tableName, rowInfo,...;调用baseModel中的insert基类方法，向数据库插入数据
5.	console.log(JSON.stringify(ret));打印回调函数的结果

这时候，重启服务器
	
	npm start

并在你的浏览器中访问 [http://localhost:3000/test](http://localhost:3000/test)

你会发现后台打印出你插入的行号，也就是插入数据后返回的主键值

此时刷新navicat for mysql的界面，可以看见多了一条数据。


##		(删)删除数据库某张表中的一条数据

回到base_model.js中来，在base_model.js中insert方法后，添加remove方法

	...
	/**
     *
     * @desc 删除数据库的一条数据
     * @param tableName string
     * @param idJson json
     * @param rowInfo json
     * @param callback function
     * @return null
     */
    this.remove = function(tableName, idJson, callback){
        dbClient.query('delete from ' + tableName + ' where ?', idJson,
            function(error, results) {
                if(error) {
                    console.log("ClientReady Error: " + error.message);
                    dbClient.end();
                    callback(false);
                } else {
                    callback(true);
                }
            });
    };
	...

解释：和insert方法类似

##		测试删除操作

在routes/test.js中的get方法中添加如下测试代码,注释掉insert的测试代码

		..
 		var tableName = 'node_book';
	    var idJson = {'book_id': 3};
        baseModel.remove(tableName, idJson, function(ret){
            console.log(JSON.stringify(ret));//true
        });
		...

重启服务器，发起请求:
	
	npm start

并在你的浏览器中访问 [http://localhost:3000/test](http://localhost:3000/test)

你会在后台中是true

并且，刷新navicat for mysql的界面，可以看见id为3的成功删除了


##		（改）修改数据库的一条数据

回到base_model.js中来，在base_model.js中remove方法后，添加modify方法

	/**
     *
     * @desc 修改数据库的一条数据
     * @param tableName string
     * @param idJson json
     * @param callback function
     * @return null
     */
    this.modify = function(tableName, idJson, rowInfo, callback){
        dbClient.query('update ' + tableName + ' SET ? where ?', [rowInfo, idJson], function(err, result) {
            if(err) {
                console.log("ClientReady Error: " + err.message);
                callback(false);
            } else {
                callback(result);
            }
        });
    };

##	测试 修改
在test.js中添加

	/* modify验证 */
    var newInfo = {};
    newInfo.book_name = 'nodejs book-by danhuang';
    newInfo.author = 'Jimi';
    var idJson = {'book_id': 2};
    baseModel.modify(tableName, idJson, newInfo, function(ret){
         console.log(JSON.stringify(ret));
    });
     

重启服务器，发起请求:
	
	npm start

并在你的浏览器中访问 [http://localhost:3000/test](http://localhost:3000/test)

你会在后台中看见你修改的值

##		（查）查找一条数据（根据主键查找）

在base_model.js中添加

	/**
     *
     * 根据主键id值查询数据库的一条记录
     * @param tableName string
     * @param idJson id
     * @param callback function
     * @return null
     */
    this.findOneById = function(tableName, idJson, callback){
        dbClient.query('SELECT * FROM ' + tableName + ' where ?', idJson,
            function(error, results) {
                if (error) {
                    console.log('GetData Error: ' + error.message);
                    dbClient.end();
                    callback(false);
                } else {
                    if(results){ //如果查询到数据则返回一条数据即可
                        callback(results.pop());
                    } else{ //查询数据为空则返回空数据
                        callback(results);
                    }
                }
            });
    };

##		验证根据Id查找(根据主键查找)
在test.js中添加

	/* findOneById验证 */

    var idJson = {'book_id': 1};
    baseModel.findOneById(tableName, idJson, function(ret){
        bookInfo = ret;
        console.log(bookInfo);
    });

重启服务器，发起请求:
	
	npm start

并在你的浏览器中访问 [http://localhost:3000/test](http://localhost:3000/test)

你会在后台看见你所查找的那一条数据

##		（查） 条件查询数据

在base_model.js中添加

	 /**
     *
     * @desc 条件查询数据
     * @param tableName string
     * @param whereJson json desc(and和or区别，其中的条件为key值、连接符大于小于还是等于、value值)
     * @param orderByJson json desc({'key' : 'time', 'type':'desc'})
     * @param limitArr array desc（第一个元素是返回偏移量，第二个是返回数量，空返回全部）
     * @param fieldsArr array desc（返回哪些字段）
     * @param callback function
     * @return null
     */
    this.find = function(tableName, whereJson, orderByJson, limitArr, fieldsArr, callback){
        var andWhere   = whereJson['and']
            , orWhere    = whereJson['or']
            , andArr = []
            , orArr  = [];
        /* 将数组转换为where and条件array */
        for(var i=0; i<andWhere.length; i++){
            andArr.push(andWhere[i]['key'] + andWhere[i]['opts'] + andWhere[i]['value']);
        }
        /* 将数组转换为where or条件array */
        for(var i=0; i<orWhere.length; i++){
            orArr.push(orWhere[i]['key'] + orWhere[i]['opts'] +orWhere[i]['value']);
        }
        /* 判断条件是否存在，如果存在则转换相应的添加语句 */
        var filedsStr = fieldsArr.length>0 ? fieldsArr.join(',') : '*'
            , andStr    = andArr.length>0    ? andArr.join(' and ') : ''
            , orStr     = orArr.length>0     ? ' or '+orArr.join(' or ') : ''
            , limitStr  = limitArr.length>0  ? ' limit ' + limitArr.join(',') : ''
            , orderStr  = orderByJson ? ' order by ' + orderByJson['key'] + ' ' + orderByJson['type'] : '';
        /* 执行mysql语句 */
        dbClient.query('SELECT ' + filedsStr + ' FROM ' + tableName + ' where ' + andStr + orStr + orderStr + limitStr,
            function(error, results) {
                if (error) {
                    console.log('GetData Error: ' + error.message);
                    dbClient.end();
                    callback(false);
                } else {
                    callback(results);
                }
            });
    };

##		测试条件查询
在test.js中添加


   	//book_name 等于nodejs且author等于 danhuang 或者十以内的数据
   	var whereJson = {
        'and' : [{'key':'book_name', 'opts':'=', 'value' : '"nodejs"'}, {'key':'author', 'opts':'=', 'value' : '"danhuang"'}],
        'or' : [{'key':'book_id', 'opts':'<', 'value' : 10}]
    };
    var fieldsArr = ['book_id','book_name', 'author', 'time'];//查询结果中显示的字段
    var orderByJson = {'key':'time', 'type':'desc'};//按照时间降序排序
    var limitArr = [0, 3]; //查询结果的前三个
    baseModel.find(tableName, whereJson, orderByJson, limitArr, fieldsArr, function(ret){
        console.log(JSON.stringify(ret));
    });

1.	var whereJson = {
        'and' : [{'key':'book_name', 'opts':'=', 'value' : '"nodejs"'}, {'key':'author', 'opts':'=', 'value' : '"danhuang"'}],
        'or' : [{'key':'book_id', 'opts':'<', 'value' : 10}]
    };中key为条件键名，opts为条件，value为对比值

2.	andWhere = whereJson['and']：获取条件and数组。
3.	orWhere = whereJson['or']：获取条件or数组
4.	fieldsArr = ['book_name', 'author', 'time']： 返回哪些字段
5.	orderByJson = {'key':'time', 'type':'desc'}：按time降序排序
6.	limitArr = [0, 10];第一个元素是返回偏移量，第二个是返回数量，空返回全部


至此，我们就实现了Node.js中MySQL的操作基类，这个基类可以作为所有Model层操作类，使用方法参考test.js,其中包含了所有函数接口的使用方法。需要特别留意的是，本基类没有进行MySQL执行语句的转义处理，在真正的项目应用时，需要引用Node.js的MySQL模块提供的mysql.escape和mysql。escapepeId，避免MySql注入。










	      


	