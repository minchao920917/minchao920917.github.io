---
layout: post
title:  "JavaScript常用的方法"
date:   2016-02-12 23:35:54
categories: JavaScript
tags: JavaScript
excerpt:	js判断是否是电脑端还是手机端，改变url中某一个参数，js判断浏览器类型
mathjax: true
author:	闵超
---

* content
{:toc}

#	常用的js方法

##	判断是否是电脑端

	function isPC() {
	    var userAgentInfo = navigator.userAgent,
	        Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"],
	        flag = true;
	    for (var v = 0; v < Agents.length; v++) {
	        if (userAgentInfo.indexOf(Agents[v]) > 0) {
	            flag = false;
	            break;
	        }
	    }
	    return flag;
	}

##	改变url中的某一个参数

	/* 
	 * url 目标url 
	 * arg 需要替换的参数名称 
	 * arg_val 替换后的参数的值 
	 * return url 参数替换后的url 
	 */ 
	function changeURLArg(url,arg,arg_val){ 
		var pattern=arg+'=([^&]*)'; 
		var replaceText=arg+'='+arg_val; 
		if(url.match(pattern)){ 
			var tmp='/('+ arg+'=)([^&]*)/gi'; 
			tmp=url.replace(eval(tmp),replaceText); 
			return tmp; 
		}else{ 
			if(url.match('[\?]')){ 
			   return url+'&'+replaceText; 
			}else{ 
			   return url+'?'+replaceText; 
			} 
		} 
		return url+'\n'+arg+'\n'+arg_val; 
	} 

## 	判断当前浏览器类型

	function myBrowser(){

    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    var isSafari = userAgent.indexOf("Safari") > -1; //判断是否Safari浏览器
    if (isIE) {
        var IE5 = IE55 = IE6 = IE7 = IE8 = false;
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        IE55 = fIEVersion == 5.5;
        IE6 = fIEVersion == 6.0;
        IE7 = fIEVersion == 7.0;
        IE8 = fIEVersion == 8.0;
        if (IE55) {
            return "IE55";
        }
        if (IE6) {
            return "IE6";
        }
        if (IE7) {
            return "IE7";
        }
        if (IE8) {
            return "IE8";
        }
    }//isIE end
    if (isFF) {
        return "FF";
    }
    if (isOpera) {
        return "Opera";
    }
	}//myBrowser() end
	//以下是调用上面的函数
	if (myBrowser() == "FF") {
	    alert("我是 Firefox");
	}
	if (myBrowser() == "Opera") {
	    alert("我是 Opera");
	}
	if (myBrowser() == "Safari") {
	    alert("我是 Safari");
	}
	if (myBrowser() == "IE55") {
	    alert("我是 IE5.5");
	}
	if (myBrowser() == "IE6") {
	    alert("我是 IE6");
	}
	if (myBrowser() == "IE7") {
	    alert("我是 IE7");
	}
	if (myBrowser() == "IE8") {
	    alert("我是 IE8");
	}

##		Array相关

###		arrayEqual判断两个数组是否相等

	/**
	 * 
	 * @desc 判断两个数组是否相等
	 * @param {Array} arr1 
	 * @param {Array} arr2 
	 * @return {Boolean}
	 */
	function arrayEqual(arr1, arr2) {
	    if (arr1 === arr2) return true;
	    if (arr1.length != arr2.length) return false;
	    for (var i = 0; i < arr1.length; ++i) {
	        if (arr1[i] !== arr2[i]) return false;
	    }
	    return true;
	}

##		Class


###		hasClass判断元素是否有某个class

	/**
	 * 
	 * @desc 判断元素是否有某个class
	 * @param {HTMLElement} ele 
	 * @param {String} cls 
	 * @return {Boolean}
	 */
	function hasClass(ele, cls) {
	    return (new RegExp('(\\s|^)' + cls + '(\\s|$)')).test(ele.className);
	}

###		addClass为元素添加class

	/**
	 * 
	 * @desc   为元素添加class
	 * @param  {HTMLElement} ele 
	 * @param  {String} cls 
	 */
	function addClass(ele, cls) {
	    if (!hasClass(ele, cls)) {
	        ele.className += ' ' + cls;
	    }
	}

###		removeClass为元素移除class

	/**
	 * 
	 * @desc 为元素移除class
	 * @param {HTMLElement} ele 
	 * @param {String} cls 
	 */
	var hasClass = require('./hasClass');
	function removeClass(ele, cls) {
	    if (hasClass(ele, cls)) {
	        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
	        ele.className = ele.className.replace(reg, ' ');
	    }
	}

##		Cookie操作

###		getCookie根据name读取cookie

	/**
	 * 
	 * @desc 根据name读取cookie
	 * @param  {String} name 
	 * @return {String}
	 */
	function getCookie(name) {
	    var arr = document.cookie.replace(/\s/g, "").split(';');
	    for (var i = 0; i < arr.length; i++) {
	        var tempArr = arr[i].split('=');
	        if (tempArr[0] == name) {
	            return decodeURIComponent(tempArr[1]);
	        }
	    }
	    return '';
	}

###			setCookie 设置Cookie

	/**
	 * 
	 * @desc  设置Cookie
	 * @param {String} name 
	 * @param {String} value 
	 * @param {Number} days 
	 */
	function setCookie(name, value, days) {
	    var date = new Date();
	    date.setDate(date.getDate() + days);
	    document.cookie = name + '=' + value + ';expires=' + date;
	}

###		removeCookie根据name删除cookie

	var setCookie = require('./setCookie');
	/**
	 * 
	 * @desc 根据name删除cookie
	 * @param  {String} name 
	 */
	function removeCookie(name) {
	    // 设置已过期，系统会立刻删除cookie
	    setCookie(name, '1', -1);
	}

##		Device设备相关

###		getExplore获取浏览器类型和版本

	/**
	 * 
	 * @desc 获取浏览器类型和版本
	 * @return {String} 
	 */
	function getExplore() {
	    var sys = {},
	        ua = navigator.userAgent.toLowerCase(),
	        s;
	    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1]:
	        (s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] :
	        (s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] :
	        (s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] :
	        (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] :
	        (s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] :
	        (s = ua.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] : 0;
	    // 根据关系进行判断
	    if (sys.ie) return ('IE: ' + sys.ie)
	    if (sys.edge) return ('EDGE: ' + sys.edge)
	    if (sys.firefox) return ('Firefox: ' + sys.firefox)
	    if (sys.chrome) return ('Chrome: ' + sys.chrome)
	    if (sys.opera) return ('Opera: ' + sys.opera)
	    if (sys.safari) return ('Safari: ' + sys.safari)
	    return 'Unkonwn'
	}


###		getOS获取操作系统类型

	/**
	 * 
	 * @desc 获取操作系统类型
	 * @return {String} 
	 */
	function getOS() {
	    var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
	    var vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';
	    var appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';
	    if (/mac/i.test(appVersion)) return 'MacOSX'
	    if (/win/i.test(appVersion)) return 'windows'
	    if (/linux/i.test(appVersion)) return 'linux'
	    if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) 'ios'
	    if (/android/i.test(userAgent)) return 'android'
	    if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return 'windowsPhone'
	}


## 		Dom操作

###		getScrollTop 获取滚动条距顶部的距离

	/**
	 * 
	 * @desc 获取滚动条距顶部的距离
	 */
	function getScrollTop() {
	    return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
	}

###		setScrollTop设置滚动条距顶部的距离

	/**
	 * 
	 * @desc 设置滚动条距顶部的距离
	 */
	function setScrollTop(value) {
	    window.scrollTo(0, value);
	    return value;
	}

###		offset获取一个元素的距离文档(document)的位置，类似jQ中的offset()

	/**
	 * 
	 * @desc  获取一个元素的距离文档(document)的位置，类似jQ中的offset()
	 * @param {HTMLElement} ele 
	 * @returns { {left: number, top: number} }
	 */
	function offset(ele) {
	    var pos = {
	        left: 0,
	        top: 0
	    };
	    while (ele) {
	        pos.left += ele.offsetLeft;
	        pos.top += ele.offsetTop;
	        ele = ele.offsetParent;
	    };
	    return pos;
	}

###		scrollTo 滚动条平滑滚动到${to}指定位置

	var getScrollTop = require('./getScrollTop');
	var setScrollTop = require('./setScrollTop');
	var requestAnimFrame = (function () {
	    return window.requestAnimationFrame ||
	        window.webkitRequestAnimationFrame ||
	        window.mozRequestAnimationFrame ||
	        function (callback) {
	            window.setTimeout(callback, 1000 / 60);
	        };
	})();
	/**
	 * 
	 * @desc  在${duration}时间内，滚动条平滑滚动到${to}指定位置
	 * @param {Number} to 
	 * @param {Number} duration 
	 */
	function scrollTo(to, duration) {
	    if (duration < 0) {
	        setScrollTop(to);
	        return
	    }
	    var diff = to - getScrollTop();
	    if (diff === 0) return
	    var step = diff / duration * 10;
	    requestAnimationFrame(
	        function () {
	            if (Math.abs(step) > Math.abs(diff)) {
	                setScrollTop(getScrollTop() + diff);
	                return;
	            }
	            setScrollTop(getScrollTop() + step);
	            if (diff > 0 && getScrollTop() >= to || diff < 0 && getScrollTop() <= to) {
	                return;
	            }
	            scrollTo(to, duration - 16);
	        });
	}


##		Keycode键盘相关

	var keyCodeMap = {
	    8: 'Backspace',
	    9: 'Tab',
	    13: 'Enter',
	    16: 'Shift',
	    17: 'Ctrl',
	    18: 'Alt',
	    19: 'Pause',
	    20: 'Caps Lock',
	    27: 'Escape',
	    32: 'Space',
	    33: 'Page Up',
	    34: 'Page Down',
	    35: 'End',
	    36: 'Home',
	    37: 'Left',
	    38: 'Up',
	    39: 'Right',
	    40: 'Down',
	    42: 'Print Screen',
	    45: 'Insert',
	    46: 'Delete',
	    48: '0',
	    49: '1',
	    50: '2',
	    51: '3',
	    52: '4',
	    53: '5',
	    54: '6',
	    55: '7',
	    56: '8',
	    57: '9',
	    65: 'A',
	    66: 'B',
	    67: 'C',
	    68: 'D',
	    69: 'E',
	    70: 'F',
	    71: 'G',
	    72: 'H',
	    73: 'I',
	    74: 'J',
	    75: 'K',
	    76: 'L',
	    77: 'M',
	    78: 'N',
	    79: 'O',
	    80: 'P',
	    81: 'Q',
	    82: 'R',
	    83: 'S',
	    84: 'T',
	    85: 'U',
	    86: 'V',
	    87: 'W',
	    88: 'X',
	    89: 'Y',
	    90: 'Z',
	    91: 'Windows',
	    93: 'Right Click',
	    96: 'Numpad 0',
	    97: 'Numpad 1',
	    98: 'Numpad 2',
	    99: 'Numpad 3',
	    100: 'Numpad 4',
	    101: 'Numpad 5',
	    102: 'Numpad 6',
	    103: 'Numpad 7',
	    104: 'Numpad 8',
	    105: 'Numpad 9',
	    106: 'Numpad *',
	    107: 'Numpad +',
	    109: 'Numpad -',
	    110: 'Numpad .',
	    111: 'Numpad /',
	    112: 'F1',
	    113: 'F2',
	    114: 'F3',
	    115: 'F4',
	    116: 'F5',
	    117: 'F6',
	    118: 'F7',
	    119: 'F8',
	    120: 'F9',
	    121: 'F10',
	    122: 'F11',
	    123: 'F12',
	    144: 'Num Lock',
	    145: 'Scroll Lock',
	    182: 'My Computer',
	    183: 'My Calculator',
	    186: ';',
	    187: '=',
	    188: ',',
	    189: '-',
	    190: '.',
	    191: '/',
	    192: '`',
	    219: '[',
	    220: '\\',
	    221: ']',
	    222: '\''
	};
	/**
	 * @desc 根据keycode获得键名
	 * @param  {Number} keycode 
	 * @return {String}
	 */
	function getKeyName(keycode) {
	    if (keyCodeMap[keycode]) {
	        return keyCodeMap[keycode];
	    } else {
	        console.log('Unknow Key(Key Code:' + keycode + ')');
	        return '';
	    }
	};

##		Object对象操作

###		deepClone深拷贝

	/**
	 * @desc 深拷贝，支持常见类型
	 * @param {Any} values
	 */
	function deepClone(values) {
	    var copy;
	    // 处理3个简单类型，null或未定义
	    if (null == values || "object" != typeof values) return values;
	    // 处理日期类型
	    if (values instanceof Date) {
	        copy = new Date();
	        copy.setTime(values.getTime());
	        return copy;
	    }
	    // 处理数组
	    if (values instanceof Array) {
	        copy = [];
	        for (var i = 0, len = values.length; i < len; i++) {
	            copy[i] = deepClone(values[i]);
	        }
	        return copy;
	    }
	    // 处理对象
	    if (values instanceof Object) {
	        copy = {};
	        for (var attr in values) {
	            if (values.hasOwnProperty(attr)) copy[attr] = deepClone(values[attr]);
	        }
	        return copy;
	    }
	    throw new Error("Unable to copy values! Its type isn't supported.");
	}

###		isEmptyObject 对象判空
	
	/**
	 * 
	 * @desc   判断`obj`是否为空
	 * @param  {Object} obj
	 * @return {Boolean}
	 */
	function isEmptyObject(obj) {
	    if (!obj || typeof obj !== 'object' || Array.isArray(obj))
	        return false
	    return !Object.keys(obj).length
	}

##		Random随机函数的应用

###		randomColor随机生成颜色

	/**
	 * 
	 * @desc 随机生成颜色
	 * @return {String} 
	 */
	function randomColor() {
	    return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
	}

###		randomNum 生成指定范随机数

	/**
	 * 
	 * @desc 生成指定范围随机数
	 * @param  {Number} min 
	 * @param  {Number} max 
	 * @return {Number} 
	 */
	function randomNum(min, max) {
	    return Math.floor(min + Math.random() * (max - min));
	}

##		Regexp正则对象

###		isEmail

	/**
	 * 
	 * @desc   判断是否为邮箱地址
	 * @param  {String}  str
	 * @return {Boolean} 
	 */
	function isEmail(str) {
	    return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
	}

###		isIdCard是否为身份证号

	/**
	 * 
	 * @desc  判断是否为身份证号
	 * @param  {String|Number} str 
	 * @return {Boolean}
	 */
	function isIdCard(str) {
	    return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str)
	}

###		 isUrl是否为URL地址

	/**
	 * 
	 * @desc   判断是否为URL地址
	 * @param  {String} str 
	 * @return {Boolean}
	 */
	function isUrl(str) {
	    return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str);
	}


##		String字符串相关

###		digitUppercase现金额转大写

	/**
	 * 
	 * @desc   现金额转大写
	 * @param  {Number} n 
	 * @return {String}
	 */
	function digitUppercase(n) {
	    var fraction = ['角', '分'];
	    var digit = [
	        '零', '壹', '贰', '叁', '肆',
	        '伍', '陆', '柒', '捌', '玖'
	    ];
	    var unit = [
	        ['元', '万', '亿'],
	        ['', '拾', '佰', '仟']
	    ];
	    var head = n < 0 ? '欠' : '';
	    n = Math.abs(n);
	    var s = '';
	    for (var i = 0; i < fraction.length; i++) {
	        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
	    }
	    s = s || '整';
	    n = Math.floor(n);
	    for (var i = 0; i < unit[0].length && n > 0; i++) {
	        var p = '';
	        for (var j = 0; j < unit[1].length && n > 0; j++) {
	            p = digit[n % 10] + unit[1][j] + p;
	            n = Math.floor(n / 10);
	        }
	        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
	    }
	    return head + s.replace(/(零.)*零元/, '元')
	        .replace(/(零.)+/g, '零')
	        .replace(/^整$/, '零元整');
	};

##		Support浏览器支持类型判断

##		isSupportWebP 判断浏览器是否支持webP格式图片

	/**
	 * 
	 * @desc 判断浏览器是否支持webP格式图片
	 * @return {Boolean} 
	 */
	function isSupportWebP() {
	    return !![].map && document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;
	}

##		Time时间处理

###		formatPassTime距现在的已过时间

	/**
	 * @desc   格式化${startTime}距现在的已过时间
	 * @param  {Date} startTime 
	 * @return {String}
	 */
	function formatPassTime(startTime) {
	    var currentTime = Date.parse(new Date()),
	        time = currentTime - startTime,
	        day = parseInt(time / (1000 * 60 * 60 * 24)),
	        hour = parseInt(time / (1000 * 60 * 60)),
	        min = parseInt(time / (1000 * 60)),
	        month = parseInt(day / 30),
	        year = parseInt(month / 12);
	    if (year) return year + "年前"
	    if (month) return month + "个月前"
	    if (day) return day + "天前"
	    if (hour) return hour + "小时前"
	    if (min) return min + "分钟前"
	    else return '刚刚'
	}


###		formatRemainTime距xxx的剩余时间

	/**
	 * 
	 * @desc   格式化现在距${endTime}的剩余时间
	 * @param  {Date} endTime  
	 * @return {String}
	 */
	function formatRemainTime(endTime) {
	    var startDate = new Date(); //开始时间
	    var endDate = new Date(endTime); //结束时间
	    var t = endDate.getTime() - startDate.getTime(); //时间差
	    var d = 0,
	        h = 0,
	        m = 0,
	        s = 0;
	    if (t >= 0) {
	        d = Math.floor(t / 1000 / 3600 / 24);
	        h = Math.floor(t / 1000 / 60 / 60 % 24);
	        m = Math.floor(t / 1000 / 60 % 60);
	        s = Math.floor(t / 1000 % 60);
	    }
	    return d + "天 " + h + "小时 " + m + "分钟 " + s + "秒";
	}

###		Format：格式化

	var d = new Date(2013, 0, 1);
	
	d.toString()
	// "Tue Jan 01 2013 00:00:00 GMT+0800 (CST)"
	
	d.toUTCString()
	// "Mon, 31 Dec 2012 16:00:00 GMT"
	
	d.toISOString()
	// "2012-12-31T16:00:00.000Z"
	
	d.toJSON()
	// "2012-12-31T16:00:00.000Z"
	
	d.toDateString() // "Tue Jan 01 2013"
	
	d.toTimeString() // "00:00:00 GMT+0800 (CST)"
	
	d.toLocaleDateString()
	// 中文版浏览器为"2013年1月1日"
	// 英文版浏览器为"1/1/2013"
	
	d.toLocaleTimeString()
	// 中文版浏览器为"上午12:00:00"
	// 英文版浏览器为"12:00:00 AM"

###		Date.Format(fmt)

	// 对Date的扩展，将 Date 转化为指定格式的String
	// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
	// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
	// 例子： 
	// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
	// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
	//(new Date()).Format("yyyy/M/d h:m:s.S")      ==> 2006/7/2 8:9:4.18
	Date.prototype.Format = function (fmt) { //author: meizz 
	    var o = {
	        "M+": this.getMonth() + 1, //月份 
	        "d+": this.getDate(), //日 
	        "h+": this.getHours(), //小时 
	        "m+": this.getMinutes(), //分 
	        "s+": this.getSeconds(), //秒 
	        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
	        "S": this.getMilliseconds() //毫秒 
	    };
	    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
	    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return fmt;
	}
	
	//调用： 
	//var time1 = new Date().Format("yyyy-MM-dd");
	//var time2 = new Date().Format("yyyy-MM-dd hh:mm:ss");


###		Date.pattern年月日季度星期时分秒毫秒

	/**
	  * 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
	    可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) * eg: * (new
	    Date()).pattern("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423      
	 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04      
	 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04      
	 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04      
	 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18      
	 **/        
	Date.prototype.pattern=function(fmt) {         
	    var o = {         
	    "M+" : this.getMonth()+1, //月份         
	    "d+" : this.getDate(), //日         
	    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时         
	    "H+" : this.getHours(), //小时         
	    "m+" : this.getMinutes(), //分         
	    "s+" : this.getSeconds(), //秒         
	    "q+" : Math.floor((this.getMonth()+3)/3), //季度         
	    "S" : this.getMilliseconds() //毫秒         
	    };         
	    // var week = {         
	    // "0" : "/u65e5",         
	    // "1" : "/u4e00",         
	    // "2" : "/u4e8c",         
	    // "3" : "/u4e09",         
	    // "4" : "/u56db",         
	    // "5" : "/u4e94",         
	    // "6" : "/u516d"        
	    // };  
	    var week = {         
	    "0" : "日",         
	    "1" : "一",         
	    "2" : "二",         
	    "3" : "三",         
	    "4" : "四",         
	    "5" : "五",         
	    "6" : "六"        
	    };  
	    if(/(y+)/.test(fmt)){         
	        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));         
	    }         
	    if(/(E+)/.test(fmt)){         
	        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "星期" : "周") : "")+week[this.getDay()+""]);         
	    }         
	    for(var k in o){         
	        if(new RegExp("("+ k +")").test(fmt)){         
	            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
	        }         
	    }         
	    return fmt;         
	}       
	     
	//var date = new Date();      
	//console.log(date.pattern("yyyy-MM-dd hh:mm:ss"))
	//console.log(date.pattern("yyyy-MM-dd E HH:mm:ss"))
	//console.log(date.pattern("yyyy-MM-dd EE hh:mm:ss"))
	//console.log(date.pattern("yyyy-MM-dd EEE hh:mm:ss"))
	//console.log(date.pattern("yyyy-MM-dd hh:mm:ss"))
	//console.log(date.pattern("q"))

##		URL操作

###		parseQueryString参数转对象

	/**
	 * 
	 * @desc   url参数转对象
	 * @param  {String} url  default: window.location.href
	 * @return {Object} 
	 */
	function parseQueryString(url) {
	    url = url == null ? window.location.href : url
	    var search = url.substring(url.lastIndexOf('?') + 1)
	    if (!search) {
	        return {}
	    }
	    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
	}

###		stringfyQueryString对象序列化

	/**
	 * 
	 * @desc   对象序列化
	 * @param  {Object} obj 
	 * @return {String}
	 */
	function stringfyQueryString(obj) {
	    if (!obj) return '';
	    var pairs = [];
	    for (var key in obj) {
	        var value = obj[key];
	        if (value instanceof Array) {
	            for (var i = 0; i < value.length; ++i) {
	                pairs.push(encodeURIComponent(key + '[' + i + ']') + '=' + encodeURIComponent(value[i]));
	            }
	            continue;
	        }
	        pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
	    }
	    return pairs.join('&');
	}
