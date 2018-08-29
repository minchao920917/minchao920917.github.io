---
layout: post
title:  "微信小程序组件与API"
date:   2018-01-03 23:33:54
categories: 微信小程序
tags: 微信小程序
excerpt:	上一期学习了微信小程序开发的框架相关的知识，下面来学习一下微信小程序的框架提供了一系列基础组件，开发者可以组合使用这些组件进行快速开发。
mathjax: true
author:	闵超
---

* content
{:toc}

#		微信小程序组件与API

微信小程序的框架提供了一系列基础组件，开发者可以组合使用这些组件进行快速开发。

微信小程序组件有如下特点：

-	组件是视图层的基本组成单位，即视图层的元素必须是组件标签，否则会编译报错
-	组件是微信风格的样式
-	组件与HTML 5的元素既有相同之处，也有不同之处

小程序目前支持的组件有以下9种

-	视图容器：试图容器、可滚动视图容器、滑块视图容器
-	基本内容：图标、文本、进度条。
-	表单组件：按钮、表单、输入框、多项选择器、单项选择器、列表选择器、内嵌列表选择器、滚动选择器、开关选择器、标签等
-	操作反馈：底部菜单、模态弹框、消息提示框、加载提示符
-	导航：页面跳转与应用连接
-	媒体组件：音频、图片和视频
-	地图：地图map
-	画布：画布canvas
-	客服会话：进入客服会话按钮

##		视图容器

view：类似与h5的div，都是盒模型的基础元素

scroll-view：类似与css语法中的overflow:scroll，规定元素溢出容器时滚动条的显示，适合制作列表、瀑布流、横幅等模块。

swiper：滑块视图容器，该容器可以滑动以切换swiper-item。

###		基础内容

-	icon	iocn为一组微信风格的图标
-	text	类似于H5中显示文本的元素h1-h6、p、span等
-	progress	用于展示进度条
	进度条属性列表：
	<table>
		<tr>
			<th>属性名</th>
			<th>类型</th>
			<th>默认值</th>
			<th>说明</th>
		</tr>
		<tr>
			<th>percent</th>
			<th>Float</th>
			<th>无</th>
			<th>百分比 0~100，可以带小数</th>
		</tr>
		<tr>
			<th>show-info</th>
			<th>Boolean</th>
			<th>false</th>
			<th>进度条右侧显示百分比</th>
		</tr>
		<tr>
			<th>stroke-width</th>
			<th>Number</th>
			<th>6</th>
			<th>进度条宽度，单位px</th>
		</tr>
		<tr>
			<th>color</th>
			<th>Color</th>
			<th>#09BB07</th>
			<th>进度条颜色</th>
		</tr>
		<tr>
			<th>active</th>
			<th>Boolean</th>
			<th>false</th>
			<th>进度条从左到右的动画</th>
		</tr>
	</table>

###		表单组件

-	button 按钮 form-type有两个值，submit为提交，reset为重置
-	checkout 多项选择器 
-	input	输入框 password，text，number，idcard，digit为带小数点数字
-	label	标签
-	picker-view 	嵌入页面的滚动选择器
-	radio		单项选择器
-	slider		滑动选择器
-	switch		开关选择器
-	textarea	多行输入框

###		导航

导航navigator提供了各个页面互相跳转的方式，按照不同的open-type的取值，可以设置页面的打开方式：跳转到新页面(navigate)、在当前页面打开(redirect)、切换Tab(switchTab)

<table>
	<tr>
		<th>属性名</th>
		<th>类型</th>
		<th>默认值</th>
		<th>说明</th>
	</tr>
	<tr>
		<th>url</th>
		<th>String</th>
		<th></th>
		<th>应用内的跳转链接</th>
	</tr>
	<tr>
		<th>redirect</th>
		<th>Boolean</th>
		<th>false</th>
		<th>打开方式为重定向，对应wx.redirectTo(废弃，建议使用open-type)</th>
	</tr>
	<tr>
		<th>open-type</th>
		<th>String</th>
		<th>navigate</th>
		<th>可选值navigate、redirect、switchTab，对应wx.navigateTo、wx.redirectTo、wx.switchTab的功能</th>
	</tr>
	<tr>
		<th>hover-class</th>
		<th>String</th>
		<th>navigator-hover</th>
		<th>指定点击时的样式类，当hover-class='none'时，没有点击状态</th>
	</tr>
	<tr>
		<th>hover-start-time</th>
		<th>Number</th>
		<th>50</th>
		<th>按住后多久出现点击态，单位毫秒</th>
	</tr>
	<tr>
		<th>hover-stay-time</th>
		<th>Number</th>
		<th>600</th>
		<th>手指松开后点击状态保留时间，单位毫秒</th>
	</tr>
</table>

###		媒体组件

媒体组件有音频(audio)、图片(image)和视频(video)

-	音频

	音频组件可以播放音频(包括音乐)，高组件播放音乐时只能在前台播放。
	<table>
		<tr>
			<th>属性名</th>
			<th>类型</th>
			<th>默认值</th>
			<th>说明</th>
		</tr>
		<tr>
			<th>id</th>
			<th>String</th>
			<th></th>
			<th>audio组件的唯一标识符</th>
		</tr>
		<tr>
			<th>src</th>
			<th>Boolean</th>
			<th></th>
			<th>要播放的音频的资源地址</th>
		</tr>
		<tr>
			<th>loop</th>
			<th>Boolean</th>
			<th>false</th>
			<th>是否循环播放</th>
		</tr>
		<tr>
			<th>controls</th>
			<th>Boolean</th>
			<th>true</th>
			<th>是否显示默认控件</th>
		</tr>
		<tr>
			<th>poster</th>
			<th>String</th>
			<th></th>
			<th>默认控件音频封面的图片资源地址，如果controls属性值为false就这设置poster无效</th>
		</tr>
		<tr>
			<th>name</th>
			<th>String</th>
			<th></th>
			<th>默认控件上的音频名字，如果controls属性值为false就这设置name无效</th>
		</tr>
		<tr>
			<th>author</th>
			<th>String</th>
			<th></th>
			<th>默认控件上的作者名字，如果controls属性值为false就这设置author无效</th>
		</tr>
	</table>

-	图片
	图片组件最重要的属性时mode，mode有13种模式，其中4种是缩放模式，9种是裁剪模式。

	scaleToFill:不保持纵横比缩放图片，使图片的宽高完全拉伸至填满image容器，适用于image容器与图片宽高比相同的情况，如果宽高比不同，图片就会变形

	aspectFit：保持纵横比缩放图片，使图片的长边能完全显示出来，也就是说，可以将图片完整显示出来，适用于将图片完整显示的场景，如文章详情图片等。
	
	aspectFill：保持纵横比缩放图片，只保证图片的短边能完全显示出来，也就是说，图片通常只在水平或竖直方向完整的，另一个方向会发生截取。适用于image容器固定，图片自动缩放的场景，例如图片缩略图
	
	widthFix：宽度不变，高度自动变化，保持原图宽高比不变。使用于查看长图

-	视频

	支持弹幕显示与发送
	
		<video id="myVideo" src="" danmu-list="{{danmuList}}" enable-danmu danmu-btn controls></video>
	
	弹幕的数据结构:
	
		danmuList:[{
					text:'第1s出现的弹幕',
					color:"#ff0000",
					time:1
				}]
				
	发送弹幕的方法:
	
		this.video.Context.sendDanmu({
			text:'弹幕文字',
			color:'弹幕颜色'
		})

-	其他组件
	
	地图map组件可以显示给定经纬度位置的地图，还可以显示标记点、路线、圆、控件

	画布canvas组件可以在页面创建canvas，利用canvas丰富的功能作画。
	
	客服会话按钮组件在页面上显示一个客服会话按钮，用户点击该按钮进入客服会话。

##		API

小程序目前开放的API有以下8种：

-	网络:发起请求、上传、下载、WebSocket
-	媒体：图片、录音、音频、视频
-	文件操作：保存文件、删除文件、打开文档
-	数据缓存：存储数据、读取数据、删除数据、清除数据
-	位置：获取位置、查看位置、地图组件控制
-	设备：系统信息、网络状态、重力感应、罗盘、拨打电话、扫码
-	界面：交互反馈、设置导航条、导航、动画、绘图、下拉刷新
-	开放接口：登陆、用户信息、微信支付、模板消息、客服消息、分享、获取二维码

###		网络

####		发起请求是网络API最常用的功能，类似于HTML 5种的Ajax请求。

	wx.request({
		url:'https://localhost/test.php',//本地test.php接口
		data:{
			x:'1',
			y:'2'
		},
		header:{
			'content-type':'application/json'
		},
		success:function(res){
			console.log(res.data);
		}
	})
	
url是开发者服务接口地址，必须是HTTPS请求，而且不能指定端口,url的域名必须与管理后台设置的相同。
打开小程序后台，设置页面配置服务器信息。

data是请求参数

header种的content-type默认是'application/json'，发送给服务器的数据会进行json序列化

####		Websocket

Websocket是独立的、创建在TCP上的协议，和HTTP的唯一关联是使用HTTP协议的101状态码进行切换，使用TCP端口是80，可以用于大多数防火墙的限制。

Webscoket使得客户端和服务器之间的数据交换变得更加简单，允许服务器端直接向客户端推送数据而不需要客户端进行请求。

在Websocket API中，浏览器和服务器只需要完成一次握手，两者之间就可以直接建立持久性的链接，并允许数据进行双向传送。

利用Websocket 可以很容易地建立即时聊天、即时响应类应用。


####		文件

wx.saveFile实现保存文件到本地

wx.downloadFile实现下载文件资源到本地，但文件的保存路径为临时路径，仅限本次启动期间正常使用，下次启动就会失效。
如果需要持久保存，就需要再次主动调用wx.saveFile，在小程序下次启动时才能访问。

wx.openDocument可以实现文档预览功能，支持doc、xls、ppt、pdf、docx、xlsx、pptx等格式，移动端预览文档很不方便，该功能弥补了这方面的缺陷。

	wx.downloadFile({
		url:'http:example.com/somefile.pdf',
		success:function(res){
			var filePath = res.tempFilePath;
			
			wx.openDocument({
				filePath:filePath,
				success:function(res){
					console.log('打开文档成功');
				}
			})
		}
	})


####		设备

系统信息：获取系统信息有两个方法：wx.getSystemInfo和wx.getSystemInfoSync。前者时异步获取方法，后者是同步获取方法。

<table>
	<tr>
		<td>属性</td>	
		<td>说明</td>	
		<td>用途</td>	
	</tr>
	<tr>
		<td>Model</td>	
		<td>手机型号</td>	
		<td>获取手机厂商、品牌、型号</td>	
	</tr>
	<tr>
		<td>pixelRatio</td>	
		<td>设备像素比</td>	
		<td>可识别Retina屏幕</td>	
	</tr>
	<tr>
		<td>windowWidth</td>	
		<td>窗口宽度</td>	
		<td>用于布局</td>	
	</tr>
	<tr>
		<td>windowHeight</td>	
		<td>窗口高</td>	
		<td>用于布局</td>	
	</tr>
	<tr>
		<td>language</td>	
		<td>微信设置的语言</td>	
		<td>提供多语言支持(i18n)</td>	
	</tr>
	<tr>
		<td>version</td>	
		<td>微信版本号</td>	
		<td>识别微信的版本号</td>	
	</tr>
	<tr>
		<td>system</td>	
		<td>操作系统版本号</td>	
		<td>识别操作系统</td>	
	</tr>
	<tr>
		<td>platform</td>	
		<td>客户端平台</td>	
		<td>识别客户端平台</td>	
	</tr>
</table>

####		网络状态

wx.getNetworkType获取网络状态。返回网络状态的有效值可能为wifi/2g/3g/4g/unknown/none其中之一


####		扫码

wx.scanCode是扫描二维码的功能，该功能调起客户端扫码界面，扫码成功返回对应的结果。
	
	wx.scanCode({
		success:(res) => {
			console.log(res);
		}
	})
	
扫码success回调函数返回的参数：

result:扫码的内容
sacnType：扫码的类型
charSet：扫码的字符集
path：当所扫的码为当前小程序的合法二维码时会返回此字段，内容为二维码携带的path

扫码接口大大加强了线上线下结合(O2O)的能力。

####		其他API

wx.onAccelerometerChange用于监听重力感应数据，频率为5次/秒，该API返回x轴、y轴、z轴的值。

wx.onCompassChange用于监听罗盘数据，频率为5次/秒，该API返回面对的方向的度数

wx.makePhoneCall：用于打call，(拨打电话)

####		分享

分享是一个让大家欢呼的功能，2016年12月21日，分享意味着小程序不是一个信息孤岛，而是能够在好友群聊里口碑相传，给小程序带来传播能力。

	Page({
		onShareAppMessage:function(){
			return {
				title:'自定义分享标题',
				desc:'自定义分享描述',
				path:'/page/user?id=123'
			}
		}
	})
	
分享图片自动获取，不能自定义，获取规则，从顶部开始，取当前页面高度为80%的屏幕宽度的图像作为分享图片。

####		获取小程序页面二维码

通过后台接口可以获取小程序任意页面的二维码，扫描该二维码可以直接进入小程序对应的页面。请注意，path需要在app.json的pages中定义，该接口调用次数仅有100 000个，需要谨慎调用。


##		补充Flex布局

网页布局的技术史上有三种比较流行的方法：表格布局、盒式布局和Flex布局。

felx布局请参考博客总css中的flex布局部分。