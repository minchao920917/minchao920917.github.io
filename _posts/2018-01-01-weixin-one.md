---
layout: post
title:  "微信小程序开发学习与总结"
date:   2018-01-01 23:33:54
categories: 微信小程序
tags: 微信小程序
excerpt:	按照微信之父张小龙的定义，小程序是一种不需要下载安装即可使用的应用。小程序实现了触手可及的梦想，用户扫一扫或搜一下即可打开应用。同时，体现了用完即走的理念，用户不用安装太多的应用，应用将随时可用，但又无须安装卸载。
mathjax: true
author:	闵超
---

* content
{:toc}
#		微信小程序开发学习与总结

按照微信之父张小龙的定义，小程序是一种不需要下载安装即可使用的应用。小程序实现了触手可及的梦想，用户扫一扫或搜一下即可打开应用。同时，体现了用完即走的理念，用户不用安装太多的应用，应用将随时可用，但又无须安装卸载。

小程序有以下的有点：

1.	使用方便，打开即用，用完即走
2.	开发简单，小程序开发过程的本质是MVVM风格的JavaScript框架上开发，有前端经验的程序员可以无缝衔接，无经验的小白也可以快速入门
3.	跨平台运行：不用再区分iOS和Android版本，只需发布到微信小程序平台，所有平台都可使用
4.	快速分发与迭代：无需关心各种发布渠道，也无须担心旧版本升级和兼容问题

小程序的开放能力：

微信以框架、组件和API的形式开放了如下服务和支撑力：

-	视图容器：试图容器、可滚动视图容器、滑块视图容器
-	基本内容：图标、文本、进度条。
-	表单组件：按钮、表单、输入框、多项选择器、单项选择器、列表选择器、内嵌列表选择器、滚动选择器、开关选择器、标签等
-	操作反馈：底部菜单、模态弹框、消息提示框、加载提示符
-	导航：页面跳转与应用连接
-	媒体组件：音频、图片和视频
-	地图：地图map
-	画布：画布canvas
-	客服会话：进入客服会话按钮
-	网络:发起请求、上传、下载、WebSocket
-	媒体：图片、录音、音频、视频
-	文件操作：保存文件、删除文件、打开文档
-	数据缓存：存储数据、读取数据、删除数据、清除数据
-	位置：获取位置、查看位置、地图组件控制
-	设备：系统信息、网络状态、重力感应、罗盘、拨打电话、扫码
-	开放接口：登陆、用户信息、微信支付、模板消息、客服消息、分享、获取二维码


##		环境安装与开发工具介绍

###		下载安装

[微信开发者工具下载传送门](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html)

下载你想要的版本，然后进行下载安装，直接点击下一步即可

###		登陆，你需要用你的账号登陆微信开发者工具才可以进行开发

[微信开发者工具方法和了解地址，请仔细看一遍哦](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/page.html)



##		一个小游戏入门

扫码进入后，首先进入的是项目选择界面，这时你可以选择创建项目或选择已经创建的项目。这里我们选择添加项目，开发阶段，不用填AppID，所以这里选择"无AppID"，选择后，AppID文本会显示部分功能受限，不影响后续开发。

单击添加项目，进入开发界面

![小程序开发创建项目.png](https://i.loli.net/2018/01/19/5a618802233c8.png)

微信程序默认创建的Helloworld的模板

![微信小程序默认的HelloWorld.png](https://i.loli.net/2018/01/19/5a61880222c16.png)


这里我们不需要登陆模板，我们只需要简单的MVVM模块就可以了，所以按照下面的步骤来，先别管报错哦

![微信小程序项目结构.png](https://i.loli.net/2018/01/19/5a619c346129b.png)

-	 app.js是小程序的脚本代码。我们可以在这个文件中监听并处理小程序的生命周期函数、声明全局变量。
	我的理解：（看不懂没关系，你只需要知道这个文件是监听整个程序的，处理程序生命周期等等）相当于iOS里面Appdelegate类。

-	 app.json是对整个小程序的全局配置。我们可以在这个文件中配置小程序是由哪些页面组成，配置小程序的窗口、背景色，配置导航条样式，配置默认标题。(注意该文件不可添加任何注释)我的理解：就是配置界面跳转的和导航栏的。，pages标签里配置的两个路径，就是当前项目里面啷个页面的路径，window标签里面，设置的是整个项目里面navigationBar的属性。

-	 app.wxss是整个小程序的公共样式表。我们可以在页面组件的class属性上直接使用app.wxss中声明的样式规则。

-	pages中的文件夹就是 用于放置页面文件

修改index.wxml,键入以下代码

	<!--index.wxml-->
	<view class="container">
	  <view class='title'>
	    <text >想知道一秒有多长吗？
	    手指放在圆圈上开始测试</text>
	  </view>
	    <view class='img'>
	    <image src='{{url}}'></image>
	  </view>
	  <view class='result'>
	  <text >{{result}}</text>
	  </view>
	  <view class='push_btn' id="push_btn" bindtouchstart='push_start'bindtouchend='push_end'>
	    <icon type='circle' size='45' color='orange'></icon>
	  </view>
	</view>

解释：

-	这一部分，相当于web开发的html部分
-	{{result}}的数据来自对应的Page的data
-	bindtouchstart和bindtouchend分别绑定了push_start和push_end的事件处理函数
-	icon标签展示了一个橘色的圆

修改index.wxss

	.container{
	  position: absolute;
	  width: 100%;
	  height: 100%;
	  background: rgba(255,175,75,1);
	  background: -moz-linear-gradient(top, rgba(255,175,75,1) 0%, rgba(250,66,42,1) 100%);
	  background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(255,175,75,1)), color-stop(100%, rgba(250,66,42,1)));
	  background: -webkit-linear-gradient(top, rgba(255,175,75,1) 0%,rgba(250,66,42,1) 100%);
	  background: -o-linear-gradient(top, rgba(255,175,75,1) 0%, rgba(250,66,42,1) 100%);
	  background: -ms-linear-gradient(top, rgba(255,175,75,1) 0%, rgba(250,66,42,1) 100%);
	  background: linear-gradient(to bottom, rgba(255,175,75,1) 0%, rgba(250,66,42,1) 100%);
	  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffaf4b', endColorstr='#fa422a', GradientType=0 );
	  display: flex;
	  flex-directio:column;
	}
	.title{
	    flex-grow:1;
	}
	.result{
	  flex-grow:2;
	  text-align: center;
	  font-weight: bloder;
	  color: #fff;
	  min-height: 50px;
	}
	.push_btn{
	  position: fixed;
	  margin:0 auto;
	  width: 64px;
	  height: 64px;
	  bottom: 20px;
	}
	
这一部分不用说大家都知道css样式部分

那么最后一步当然是修改index.js文件了

	//index.js
	//获取应用实例
	const app = getApp();
	
	var start_time;
	var end_time;
	
	Page({
	  data: {
	    result: ''
	  },
	  //事件处理函数
	  push_start: function (event) {
	    this.setData(
	      { result: '当你觉得是1秒你就松开\n' }
	    );
	    start_time = new Date().getTime();
	  },
	  push_end: function (event) {
	    end_time = new Date().getTime();
	    var diff_time_in_secode = (end_time - start_time) / 1000.0;
	    var diff_time = Math.abs(diff_time_in_secode - 1);
	    var diff_ratio = new Number(diff_time * 100).toFixed(2);
	
	    var wording;
	    if (0 <= diff_time && 0.05 > diff_time) {
	      wording = '太准了，你是天才吗？';
	      
	    } else if (0.05 <= diff_time && 0.1 > diff_time) {
	      wording = '时间感不错，接近天才了！';
	     
	    } else if (0.1 <= diff_time && 0.3 > diff_time) {
	      wording = '水平不错，不过还可以再精确些！';
	     
	    } else if (0.3 <= diff_time && 0.5 > diff_time) {
	      wording = '差强人意，继续努力吧！';
	     
	    } else if (0.5 <= diff_time && .7 > diff_time) {
	      wording = '差得有点多哦！';
	     
	    } else {
	      wording = '差太多了，不要紧张！';
	      
	    }
	
	    var diff_time_second = parseFloat(diff_time_in_secode);
	    var wording_html = '您按出了' + diff_time_second + '秒，误差是' + diff_ratio + '%\n' + wording;
	
	    this.setData(
	      { result: wording_html }
	    );
	  }
	})

解释：

-	data属性的result字段改变{{result}}里面的显示内容

好了，点击编译你就会发现左侧的界面是可以测试的了。

综上所述，我们用小程序框架实现一个“一秒有多长的”小游戏，这只是一个简单的小游戏。如果你是前端大牛，你就会发现微信小程序的这个框架类似与React Native和Vue.js等非常流行的移动网页开发的MVVM类型的框架，下面，我会按照我理解的细讲下这个框架。


##		开发框架简介和逻辑层

微信小程序开发的框架有一个非正式的名称MINA，是MINA Is Not App的递归缩写。

###		底层实现

小程序的底层实现可以用一句话概括：统一接口，不同实现。意思就是说，开发者考虑框架的语法和规则，不用关心底层如何实现。这样，开发这就不需要把精力花在系统、机型的适配上。比如，开发者需要用到重力感应功能，只需要监听重力感应数据的wx.onAccelerometerChange接口，不需要管iOS和Android如何实现重力感应功能的。

微信到底层操作系统有不同的实现方法。同一个功能，底层操作系统提供的调用方法、返回结构都不尽相同，微信需要在不同操作系统平台实现该功能，做到具体实现对上层透明。

###		小程序与HTML5的区别与联系

小程序与HTML5有着紧密的关系，如两者遵循相同的语法规范、拥有相似的组件、都支持响应式布局，甚至小程序的框架与NG、Vue.js拥有相似的功能(数据绑定、事件绑定、条件渲染、列表渲染、组件化、模块化)

1.	开发语言不同

	<table border="1">
	  <tr>
	    <th>分层</th>
	    <th>HTML5</th>
	    <th>小程序</th>
	    <th>功能</th>
	  </tr>
	  <tr>
	    <th>视图</th>
	    <th>HTML</th>
	    <th>WXML</th>
	    <th>展示用户界面</th>
	  </tr>
	 <tr>
	    <th>逻辑</th>
	    <th>JavaScript</th>
	    <th>JavaScript</th>
	    <th>控制交互逻辑</th>
	  </tr>
	 <tr>
	    <th>表现</th>
	    <th>CSS</th>
	    <th>WXSS</th>
	    <th>控制页面上组件显示的样式</th>
	  </tr>
	  </tr>
	</table>
	
	小程序的WXML标签语言和WXSS样式语言并非标准的HTML5和CSS 3。

2.	组件封装不同
	
	小程序独立出来很多原生App的组件，在HTML5需要模拟才能实现的功能，在小程序里可以直接调用组件，比如预览图片，录音等功能。

3.	执行效率不同

	![H5与小程序的加载流程图.png](https://i.loli.net/2018/01/19/5a61aa28da074.png)

	HTML5在加载时受限于网络环境，需要顺序加载HTML、CSS、JS，然后返回数据，最后渲染页面，并显示在浏览器中，用户经常要等待很长时间，体验会受影响。

	相比之下，小程序的两个线程——Appservice Thread和View Thread会同时进行、并加载，甚至AppService Thread会更早执行，当视图线程加载完，同时Appservice时，appservice会把准备好的数据用setData的方法返回给视图线程。
	
	小程序的这种优化策略可以减少用户的等待时间，加快小程序的响应速度。

###		小程序概览

小程序由以下5个部分组成。

1.	App：指小程序整个项目。
2.	window：用于设置小程序的状态栏、导航条、标题、窗口背景色
3.	页面：一个App包含若干页面，微信规定，同时打开的页面最多不超过5个
4.	组件：框架为开发者提供一系列基础组件，开发者可以通过组合这些基础组件进行快速开发，这些组件是构成页面的基本元素。
5.	路由：不同页面之间的跳转称为路由。

![微信小程序生命周期.png](https://i.loli.net/2018/01/19/5a61ae281597a.png)

从上图可以看出，生命周期分为3个阶段：

第一阶段是App启动阶段，主要加载小程序window配置，注册程序和页面；第二阶段是Page启动阶段，主要完成页面资源加载、页面渲染、页面挂在；第三阶段是销毁阶段，主要完成页面隐藏、卸载和销毁。


###		注册程序与页面

注册程序

小程序启动时，首先进入注册过程，在app.js文件里，用App()函数注册一个小程序。

App函数主要有4个监听函数：

-	onLaunch 监听程序初始化，当小程序初始化完成时触发onLaunch(全局只触发一次)
-	onShow 监听小程序显示。当小程序启动或者从后台进入前台时触发
-	onHide 监听小程序隐藏。当小程序从前台进入后台时触发
-	onError为错误监听函数。当小程序发生脚本错误或PI调用失败时触发，并附带错误信息

小程序有前台和后台之分，当用户点击左上角关闭或按设备的Home键离开微信时，小程序并没有直接销毁，而是进入了后台，当用户再次进入微信或再次打开小程序时，小程序又会从后台进入前台。

注册页面

当页面加载、切换、路由时用Page()函数进行注册。再页面的JS文件中，Page()函数接受一个object对象，指定页面的初始数据、生命周期函数、事件处理函数等。

<table border="1">
	  <tr>
	    <th>属性</th>
	    <th>类型</th>
	    <th>描述</th>
	  </tr>
	  <tr>
	    <th>data</th>
	    <th>Object</th>
	    <th>页面初始化数据</th>
	  </tr>
	 <tr>
	    <th>onLoad</th>
	    <th>Function</th>
	    <th>生命周期函数——监听页面加载</th>
	  </tr>
	 <tr>
	    <th>onReady</th>
	    <th>Function</th>
	    <th>生命周期函数——监听页面初次渲染完成</th>
	  </tr>
	  <tr>
	    <th>onShow</th>
	    <th>Function</th>
	    <th>生命周期函数——监听页面显示</th>
	  </tr>
	  <tr>
	    <th>onHide</th>
	    <th>Function</th>
	    <th>生命周期函数——监听页面隐藏</th>
	  </tr>
	  <tr>
	    <th>onUnload</th>
	    <th>Function</th>
	    <th>生命周期函数——监听页面卸载</th>
	  </tr>
	  <tr>
	    <th>onUnload</th>
	    <th>Function</th>
	    <th>生命周期函数——监听页面卸载</th>
	  </tr>
	  <tr>
	    <th>onPullDownRefresh</th>
	    <th>Function</th>
	    <th>生命周期函数——监听用户下拉动作</th>
	  </tr>
	  <tr>
	    <th>onReachBotton</th>
	    <th>Function</th>
	    <th>页面上拉触底事件的处理函数</th>
	  </tr>
	  <tr>
	    <th>自定义</th>
	    <th>Any</th>
	    <th>开发者可以添加任意函数或数据到object参数种，在页面函数种，this可以访问</th>
	  </tr>
</table>


###		页面的路由

在小程序中，所有页面的路由全部由框架进行管理。路由的触发方式和页面生命周期函数见表。

<table border="1">
	  <tr>
	    <th>路由方式</th>
	    <th>触发时机</th>
	    <th>路由后页面</th>
	  </tr>
	  <tr>
	    <th>初始化</th>
	    <th>小程序打开的第一个页面</th>
	    <th>onLoad，onShow</th>
	  </tr>
	 <tr>
	    <th>打开新页面</th>
	    <th>调用API wx.navigateTo
			使用组件'< navigator>'</th>
	    <th>onLoad,onShow</th>
	  </tr>
	 <tr>
	    <th>页面重定向</th>
	    <th>调用API wx.redirectTo
			使用组件'< navigator>'</th>
	    <th>onLoad,onShow</th>
	  </tr>
	  <tr>
	    <th>页面返回</th>
	    <th>调用API wx.navigateBack
			用户按左上角返回按钮</th>
	    <th>onShow</th>
	  </tr>
	  <tr>
	    <th>Tab 切换</th>
	    <th>1.调用API wx.switchTab
			2.使用组件 < navigator open-type='switchTab'/>
			3.用户切换 Tab</th>
 		<th>第一次打开onLoad，onshow;否则onShow</th>
	  </tr>
</table>

##		配置

小程序有两种配置：

-	全局配置，用于小程序的全局配置，决定页面文件的路径、窗口表现、设置网络超时时间、设置多tab等
-	页面配置文件，用于配置各个页面，将覆盖app.json的window配置项内容。


###		全局配置

配置在app.json中的参数，一般有以下5个参数对象：

1.	Pages  设置程序中所有页面，第一个页面为初始页面 每一项的命名为 路径+文件名
2.	window 设置程序中默认页面的状态栏、导航条、标题、窗口背景色
	<table border="1">
		  <tr>
		    <th>属性</th>
		    <th>类型</th>
		    <th>默认值</th>
			<th>描述</th>
		  </tr>
		  <tr>
		    <th>navigationBarBackgroundColor</th>
		    <th>十六进制</th>
		    <th>#000000</th>
			<th>导航栏背景色，如#000000</th>
		  </tr>
		  <tr>
		    <th>navigationBarTextStyle</th>
		    <th>String</th>
		    <th>white</th>
			<th>导航栏标题颜色，仅支持black/white</th>
		  </tr>
		  <tr>
		    <th>navigationBarTitleText</th>
		    <th>String</th>
		    <th></th>
			<th>导航栏标题文字内容</th>
		  </tr>
		  <tr>
		    <th>backgroundColor</th>
		    <th>十六进制</th>
		    <th>#ffffff</th>
			<th>窗口背景色</th>
		  </tr>
		  <tr>
		    <th>backgroundTextStyle</th>
		    <th>String</th>
		    <th>dark</th>
			<th>下拉背景字体、loading图的样式，仅支持dark/light</th>
		  </tr>
		  <tr>
		    <th>enablePullDownRefresh</th>
		    <th>Boolean</th>
		    <th>false</th>
			<th>是否开启下拉刷新</th>
		  </tr>
	</table>
	这里enablePullDownRefresh设置为true，可以用onPullDownRefresh监听用户下拉刷新事件。

3.	tarBar 可以配置多个tab页面，配置项包括指定tab栏的表现和tab切换时显示的对应页面
	<table border="1">
		  <tr>
		    <th>属性</th>
		    <th>类型</th>
			<th>必填</th>
		    <th>默认值</th>
			<th>描述</th>
		  </tr>
		  <tr>
		    <th>color</th>
		    <th>十六进制颜色值</th>
			<th>否</th>
		    <th></th>
			<th>tab上的文字默认颜色</th>
		  </tr>
		  <tr>
		    <th>selectedColor</th>
			<th>十六进制颜色值</th>
		    <th>否</th>
		    <th></th>
			<th>tab上的选中时的文字颜色</th>
		  </tr>
		  <tr>
		    <th>backgroundColor</th>
		    <th>十六进制颜色值</th>
		    <th>否</th>
			<th>否</th>
			<th>tab的背景颜色</th>
		  </tr>
		  <tr>
		    <th>borderStyle</th>
		    <th>String</th>
		    <th>否</th>
			<td>black</td>
			<th>tabBar上边框的颜色，仅支持black/white</th>
		  </tr>
		  <tr>
		    <th>list</th>
		    <th>Array</th>
		    <th>是</th>
			<th></th>
			<th>tab的列表，详见list属性，最少2个，最多5个</th>
		  </tr>
		  <tr>
		    <th>position</th>
		    <th>String</th>
		    <th>否</th>
		    <th>bottom</th>
			<th>可选值bottom、top</th>
		  </tr>
	</table>
	
	lis属性表
	<table border="1">
		  <tr>
		    <th>属性</th>
		    <th>类型</th>
			<th>必填</th>
			<th>描述</th>
		  </tr>
		  <tr>
		    <th>pagePath</th>
		    <th>String</th>
			<th>是</th>
			<th>页面路径，必须在Pages中先定义</th>
		  </tr>
		  <tr>
		    <th>text</th>
		    <th>String</th>
			<th>是</th>
			<th>tab上的按钮文字</th>
		  </tr>
		  <tr>
		    <th>iconPath</th>
		    <th>String</th>
			<th>否</th>
			<th>图片路径，icon大小限制为40KB</th>
		  </tr>
		  <tr>
		    <th>selectIconPath</th>
		    <th>String</th>
			<th>否</th>
			<th>图片路径，icon大小限制为40KB</th>
		  </tr>
	</table>
4.	networkTimeout  设置请求超时时间
	<table border="1">
		  <tr>
		    <th>属性</th>
		    <th>类型</th>
			<th>必填</th>
			<th>描述</th>
		  </tr>
		  <tr>
		    <th>request</th>
		    <th>Number</th>
			<th>否</th>
			<th>wx.request的超时时间，单位毫秒</th>
		  </tr>
		  <tr>
		    <th>connectSocket</th>
		    <th>Number</th>
			<th>否</th>
			<th>wx.connectSocket的超时时间，单位毫秒</th>
		  </tr>
		  <tr>
		    <th>uploadFile</th>
		    <th>Number</th>
			<th>否</th>
			<th>wx.uploadFile，单位毫秒</th>
		  </tr>
		  <tr>
		    <th>downloadFile</th>
		    <th>Number</th>
			<th>否</th>
			<th>downloadFile的超时时间，单位毫秒</th>
		  </tr>
	</table>
	

5.	debug		可以在开发者工具中开启debug模式，在开发者工具的控制台面板调试信息以info的形式给出，信息以Page的注册、页面路由、数据更新、事件触发等，可以帮助开发者快速定位一些常见的问题。


###		页面配置
小程序每一个页面都可以使用.json文件对本页面的窗口表现进行配置，页面的配置只能设置window参数中的内容，并且，页面配置项会覆盖app.json中的window中相同的配置项



##		小技巧

###		页面路由时传递参数

当我们希望页面跳转的时候从某一个页面传递某一个值到下一个页面时，可以这样实现参数传递

(1)	在页面导航时，导航页面地址后用'?'加上参数
	
	name：function(){
		wx.navigateTo({
			url:'../game/game?id=1'
		})
	} 
(2) game页面的game.js中接受参数
	
	onLoad:function(option){
		this.setData({
			option_id:option['id']
		})
	}

###		下拉刷新

如果某个页面需要下拉刷新功能，可以将配置中的widow的enablePullDownRefresh设置为true，并且用onPullDownRefresh监听用户刷新。

##		总结

小程序学到这里，我们基本上可以了解到小程序框架的底层实现和配置参数以及逻辑层的一些东西，了解了小程序的项目目录结构、配置文件、页面路由、全局设置、页面这是。
