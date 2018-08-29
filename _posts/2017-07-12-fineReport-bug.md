---
layout: post
title:  "报表入门-项目中踩到的坑"
date:   2017-07-12 23:32:54
categories: fineReport
tags:	fineReport
excerpt: 最近做一个官网项目，给官网添加由供应商填写的表单，可直接提交到官网的后台数据库，由于官网的后台权限不能给给采购部以避免官网被别人肆意改动，于是乎便将后台放在其他地方，使用报表来写，这里记录报表知制作过程中遇到的坑。
mathjax: true
author:	闵超
---
* content
{:toc}


#	报表入门(fineReport)

##	FineReport下载安装，直接一键安装

安装完成后，会在本地有一个报表的服务器地址默认是：

[http://localhost:8075/WebReport/ReportServer](http://localhost:8075/WebReport/ReportServer)

在设计器打开

使用FineReport设计器设计模板，首先需要了解FineReport模板制作的思路，沿着其思路来了解FineReport报表中的所有功能。

![报表制作流程](https://i.loli.net/2017/07/20/597084efc96c6.png)

1.	新建数据

2.	新建模板与数据集

3.	模板设计

	-	报表设计
	-	参数设计
	-	图表设计
	-	填报设计

4.	模板预览

解释：

#####	新建数据连接：

在制作模板之前首先要确保设计者知道存储数据的数据库类型、数据库地址、访问数据库的用户名密码，然后在FineReport设计器中新建一个数据连接，建立数据库与设计器的交互桥梁；


![报表数据连接.png](https://i.loli.net/2017/07/20/5970854344337.png)


#####	新建模板与数据集：

数据连接创建好之后，就需要进行模板的添加了，数据连接是用于整个工程的，并没有实质的将数据从数据库中取出来，故还需要在特定模板中新建数据集，通过数据连接从数据库中取数；

![报表数据集.png](https://i.loli.net/2017/07/20/5970858c8c57b.png)

#####	模板设计：

数据准备完成之后，就是进行模板的设计了，模板设计是FineReport学习过程中的重中之重。

我们将模板设计分为报表设计、参数设计、图表设计和填报设计四个部分

这四个部分是FineReport模板的几大使用方式

-	报表设计是纯粹的数据展示
-	参数设计是动态查询数据
-	图表设计是使用图表来展示数据
-	填报设计是录入数据，将数据写入数据库中

根据实际情况确定使用哪一种使用方式，或者联合使用哪几种使用方式；

#####	模板预览：

模板设计完成之后，保存模板至工程目录下面，即可预览在web端查看模板效果。

下面，我们来进行第一张带填报属性的报表。

基础的查询就不多说多了，能在模板数据集中查出的数据，均可以拖拽到右边的报表单元格中。

##		各种控件的设计和开发要点

序号的设计：是最常用的也是最简单的部分，用于统计报表展示数据的行数

![xuhaodesheji.png](https://i.loli.net/2017/07/20/597085bef2320.png)

选项栏的设计

![xuanxianglandesheji.png](https://i.loli.net/2017/07/20/597085ddc469e.png)




代码复制直接粘贴

	if (!window.lineboxes) {
	    window.lineboxes = [];
	}
	lineboxes[lineboxes.length] = this;

按钮控件的设计

![anniukongjiandesheji.png](https://i.loli.net/2017/07/20/597085f2013af.png)

参数设计————参数查询栏直接拖拽

*注意控件名要和查询条件的字段对应*

下面进行填报属性的设计，意思是要将表单的数据插入到数据库中

想要进行报表填报，跟制定数据集一样，需要设置报表的填报属性

模板->	报表填报属性  (进入如下页面)

![baobiaotianbaoshuxingshezhi.png](https://i.loli.net/2017/07/20/5970860a26988.png)

模板->	模板Web属性 -> 填报页面设置 ->添加事件

![mobanwebshuxingshezhi.png](https://i.loli.net/2017/07/20/5970861f4b765.png)

加载之后绑定的事件(很明显是为了配合点击选项，行式填报时使用)

![afterloadevent.png](https://i.loli.net/2017/07/20/59708632ea8a4.png)

添加的代码是:

	contentPane.on("cellselect", function(td) {    //增加单元格选中监听事件  
	 	var rownum = contentPane.curLGP.getTDRow(td)-2;   //获取选中的单元格的当前行号  
	});  

##		遭遇的问题

报表填报过程中，踩到一个大坑，描述如下：

需求是选中需要填报的行，点击处理按钮，将选中行的处理状态由"未处理"变为"已处理"。并且填入当前处理人的真是姓名和处理时间。

1.	处理人的姓名由fr_username只能获取当前登录人的账号
2.	点处理之后直接提交，无需再点左上角的提交按钮。

解决办法：

在参数查询栏添加处理按钮，并给按钮添加点击事件输入如下代码：
	
	/*
		获取填报时间的方法，封装成想要的时间格式
	*/
	function getClock(){
	    var now = new Date();
	    var year = now.getFullYear();       //年
	    var month = now.getMonth() + 1;     //月
	    var day = now.getDate();            //日
	    var hh = now.getHours();            //时
	    var mm = now.getMinutes();          //分
		var ss=now.getSeconds();			//秒
	    var clock = year + "-";
	    if(month < 10) clock += "0";       
	    	clock += month + "-";
	    if(day < 10) clock += "0"; 
	    	clock += day + " ";
	    if(hh < 10) clock += "0";
	    	clock += hh + ":";
	    if (mm < 10) clock += '0'; 
	   	 clock += mm+ ":";	
	    if (ss < 10) clock += '0'; 
			clock += ss;

		return clock;
	}
	
	//如果页面有值
	if(window.lineboxes) { 
		// 判断是否有选中的项
		var flag = false;//用于标记是否有未选中的项
		for (var i = 0; i < lineboxes.length; i++) {   
			if (lineboxes[i].selected()) {    
			 	flag = true;
			}   
		}
		if(flag == false){
		     FR.Msg.alert("警告","您还没选择要处理的选项!");
		     return;	
		 }
	
			 for (var i = 0; i < lineboxes.length; i++) { 
		     	   
			     if (lineboxes[i].selected()) { 
			     	
			     	lineboxes[i].selected(false);   
			 		var cr=FR.cellStr2ColumnRow(window.lineboxes[i].options.location); 
			 		if(_g().getCellValue(68,cr.row)=="未处理"){ 			     	
			 			//获取勾选复选框所在行列    
			 			_g().setCellValue(68, cr.row, '已处理'); 
			 			_g().setCellValue(69, cr.row, fullName); 
			 			_g().setCellValue(70, cr.row, getClock());  
			 			//逐一赋值,这里列号列序号，第一列是0，第2列为1，依次类推	
			 		}
			 		
			         }   
		     }
		    
		 	//直接提交
		 	 _g('${sessionID}').writeReport();  
		 	 //提交完成，根据参数刷新页面
			 setTimeout(function() {   
			    		_g().parameterCommit();
			    }, 2000);
			 return;
    
	}else{
		FR.Msg.alert("警告","您还没选择要处理的选项!");	
		return;
	}

你会发现，这个fullName这个是会报错，原因是没有给参数设置值，这个fullName的意思就是处理人的真实姓名,这里给参数fullName对应的值那一栏选择公式，然后在弹框中输入如下代码:

SQL("kmoatest","select fullname from sys_user where account= '" + $fr_username + "'", 1, 1)

此处的kmoatest填入的并非是模板数据集的名称，而是模板数据集中的真实数据库的名称，正常情况下是系统数据库的finedb，如果是不是系统的数据库。需要重新添加一个数据集。


到此，我的第一张fineReoprt制作成功了，其中，报表的报表设计、参数设计、图表设计、填报设计中有了三项了，除了图表设计之外，其余的应该都算涉及了。

理解：报表设计就是报表的搭建，意思就是你的报表上要展现哪些内容，参数就是报表的查询条件。填报设计要注意报表的值是统一提交，是直接从页面修改来进行提交的。	
