---
layout: post
title:  "手机型号、尺寸及分辨率"
date:   2018-08-24 10:00:54
categories: UI
tags:	UI
excerpt:	身为一个前端工程师，发现sketch可以转化成多种尺寸可供选择
mathjax: true
author:	闵超
---

* content
{:toc}

##  手机型号、尺寸及分辨率

| 分辨率 | 对应输出素材 | 机型 | 备注 |
| ------ | ------ | ------ | ------ |
| 320 x 480 | @1x、mdpi | iphone 3GS、Android | 此类分辨率根据工作经验无特殊情况已不需要考虑输出素材|
| 480 x 640 | hdpi | Android | 标准安卓机型分辨率 |
|640 x 1136 &nbsp;&nbsp;<br>640 x 960|@2x、xhdpi| iPhone 4s、5s及Android|标准Android机型分辨率|
|750 x 1280|xhdpi|Android|低端Android机型常见尺寸、主流尺寸，设计过程中需要着重考虑|
|750 x 1334|@2x|iphone 6|针对iPhone 6,建议用此分辨率作为基准尺寸|
|1080 x 1920|xxhdpi|Android|较高端Android机型标配分辨率，主流尺寸需着重考虑|
|1422x2208|@3x|iPhone 6 Plus|iPhone 6 Plus的物理尺寸，渲染尺寸为1080 x 1920|

##  移动设备使用的字体

|苹果|Android|
|--|--|
|华文黑体<br>苹方(iOS9中文字体)<br>helvetica neue LT|安卓系统字体|

##      dp、px、sp

pt:Point，磅因，国际通行的印刷单位，是一个自然界标准的长度单位

dp:Density-independent pixels，也写作dip或者dpi，这个是最常用的也最难理解的尺寸单位。它与"像素密度"(ppi)密切相关，以160ppi屏幕为标准，则1dp = 1px;(1dp x ppi/160) = 1px，例如屏幕ppi为320，则1dp = 2px;

sp:Scale-independent pixels,与缩放无关的抽象像素，Android的字体单位之一，一般有小、正常、大、超大等。以160ppi屏幕像素为标准，当字体大小为100%时，1sp = 1px。


##      最小可点区域

由于移动设备屏幕一般较小，且不同于PC端使用鼠标指针来操控，因此在设计UI界面时，对点击区域的宽高均不能小于48dp，在按钮等可点击区域的设计中需要注意，元素太小，将会对用户操作造成困难。

