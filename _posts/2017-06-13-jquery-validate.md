---
layout: post
title:  "Jquery.validate.js插件的使用心得"
date:   2017-06-13 13:35:54
categories: Jquery
tags: Jquery
excerpt:	对Jquery.validate.js使用有了一些心得和体会，在此进行了记录，并附录一些常用的表单字段验证的方法以供参考
mathjax: true
author:	闵超
---

* content
{:toc}

#	jquery.validate.js的表单验证使用心得

最近又是有一个项目，需求用户提交表单，却足足有65个字段需要提交，其中包括必填项和选填项。包括手机、固话、邮件、时间选择器、图片上传、验证码等。

##		什么是表单验证

###		默认校验规则

	(1)required:true               必输字段
	(2)remote:"check.php"          使用ajax方法调用check.php验证输入值
	(3)email:true                  必须输入正确格式的电子邮件
	(4)url:true                    必须输入正确格式的网址
	(5)date:true                   必须输入正确格式的日期
	(6)dateISO:true                必须输入正确格式的日期(ISO)，例如：2009-06-23，1998/01/22 只验证格式，不验证有效性
	(7)number:true                 必须输入合法的数字(负数，小数)
	(8)digits:true                 必须输入整数
	(9)creditcard:                 必须输入合法的信用卡号
	(10)equalTo:"#field"           输入值必须和#field相同
	(11)accept:                    输入拥有合法后缀名的字符串（上传文件的后缀）
	(12)maxlength:5                输入长度最多是5的字符串(汉字算一个字符)
	(13)minlength:10               输入长度最小是10的字符串(汉字算一个字符)
	(14)rangelength:[5,10]         输入长度必须介于 5 和 10 之间的字符串")(汉字算一个字符)
	(15)range:[5,10]               输入值必须介于 5 和 10 之间
	(16)max:5                      输入值不能大于5
	(17)min:10                     输入值不能小于10

###		默认的提示

	messages: {  
	    required: "This field is required.",  
	    remote: "Please fix this field.",  
	    email: "Please enter a valid email address.",  
	    url: "Please enter a valid URL.",  
	    date: "Please enter a valid date.",  
	    dateISO: "Please enter a valid date (ISO).",  
	    dateDE: "Bitte geben Sie ein gltiges Datum ein.",  
	    number: "Please enter a valid number.",  
	    numberDE: "Bitte geben Sie eine Nummer ein.",  
	    digits: "Please enter only digits",  
	    creditcard: "Please enter a valid credit card number.",  
	    equalTo: "Please enter the same value again.",  
	    accept: "Please enter a value with a valid extension.",  
	    maxlength: $.validator.format("Please enter no more than {0} characters."),  
	    minlength: $.validator.format("Please enter at least {0} characters."),  
	    rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),  
	    range: $.validator.format("Please enter a value between {0} and {1}."),  
	    max: $.validator.format("Please enter a value less than or equal to {0}."),  
	    min: $.validator.format("Please enter a value greater than or equal to {0}.")  
	}

###		Jquery Validate 自定义验证规则
	
addMethod(name,method,message)方法：

参数name 是添加的方法的名字
	
参数method是一个函数,接收三个参数(value,element,param) value 是元素的值,element是元素本身 
param是参数,我们可以用addMethod 来添加除built-in Validation methods 之外的验证方法
	
比如有一个字段,只能输一个字母,范围是a-f,写法如下:

	$.validator.addMethod(“af”,function(value,element,params){
		if(value.length>1){
			return false;
		}
		if(value>=params[0] && value<=params[1]){
			return true;
		}else{
			return false;
		}
	},”必须是一个字母,且a-f”);

##		Demo及使用方法：

###		将校验规则写到控件中

导入js文件

	<script src="../js/jquery.js" type="text/javascript"></script>  
	<script src="../js/jquery.validate.js" type="text/javascript"></script>  
	<script src="./js/jquery.metadata.js" type="text/javascript"></script>  
	<script src="../js/messages_cn.js" type="text/javascript"></script>  //这是单独放一个文件夹的情况

###		HTML代码
	<form id="supplierForm" action="">
		
		...

	</form>

###		js代码

	//补充自定义的验证方法。
  	// 联系电话(手机/电话皆可)验证
    jQuery.validator.addMethod("isPhone",function(value,element) {
        var length = value.length;
        var mobile = /^1(3|4|5|7|8)\d{9}$/;
        var tel = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
        return this.optional(element) || (tel.test(value) || mobile.test(value));
    }, "请正确填写电话");
    jQuery.validator.addMethod("isSpecialChar", function(value, element) {  
        var pattern = new RegExp("[`~#$^&*=|{}/?~@#￥……&*|【】+\"\\\\]");  
        var specialStr = "";  
        for(var i=0;i<value.length;i++){  
             specialStr += value.substr(i, 1).replace(pattern, '');  
        }  
        if( specialStr == value){  
            return true;  
        }  
        return false;  
    }, "不能包含特殊字符"); 
	
###		开始验证

	$("#supplierForm").validate({   
	
		onfocusout: function(element) { $(element).valid();},
		//这一段的作用是使得表单变成失去焦点验证
	    rules:{
	        telephone:{
	            required:true,
	            isSpecialChar:true,
	            isPhone:true
	        }
	    },
	   messages: {
	        telephone:{
	            required:"请输入公司电话(固话或移动电话)"
	        }
	   },
	submitHandler: function(){      
	   	//优先验证验证码
		$("#captcha").removeClass("red");
		var captcha = $.trim($("#captcha").val().toLowerCase());
	    if (captcha == "") {
	    	layer.alert("验证码还没填写！", {
				  icon: 2,
				  skin: 'layer-ext-moon' 
				});
	        return;
	    }
		if(businesslicence.val() == ""){
			layer.alert("营业执照附件未上传!", {
				  icon: 2,
				  skin: 'layer-ext-moon' 
				});
			return;
		}
		//发送ajax请求
		$.ajax({
			url : '${base}/supplierSave.jspx',
			type : 'post',
			dataType : 'json',
			data : $("#supplierForm").serializeArray(),
			type : "post", //请求方式
			success : function(data) {
				...
			},
			error : function(data) {
				...
			}
		});
		}  
	}) ;

附录，一些常用的验证规则补充在validate的方法里的:

	// 字符验证
	jQuery.validator.addMethod(“stringCheck”, function(value, element) {
		return this.optional(element) || /^[u0391-uFFE5w]+$/.test(value);
	}, ”只能包括中文字、英文字母、数字和下划线”);
	
	// 中文字两个字节
	jQuery.validator.addMethod(“byteRangeLength”, function(value, element, param) {
		var length = value.length;
		for(var i = 0; i < value.length; i++){
			if(value.charCodeAt(i) > 127){
				length++;
			}
		}
		return this.optional(element) || ( length >= param[0]&&length <= param[1] );
	}, ”请确保输入的值在3-15个字节之间(一个中文字算2个字节)”);

	
	// 身份证号码验证
	jQuery.validator.addMethod(“isIdCardNo”, function(value, element) {
		return this.optional(element) || isIdCardNo(value);
	}, ”请正确输入您的身份证号码”);
	
	// 手机号码验证
	jQuery.validator.addMethod(“isMobile”, function(value, element) {
		var length = value.length;
		var mobile = /^(((13[0-9]{1})|(15[0-9]{1}))+d{8})$/;
		return this.optional(element) || (length == 11 && mobile.test(value));
	}, ”请正确填写您的手机号码”);
	
	// 电话号码验证
	jQuery.validator.addMethod(“isTel”, function(value, element) {
		var tel = /^d{3,4}-?d{7,9}$/; //电话号码格式010-12345678
		return this.optional(element) || (tel.test(value));
	}, ”请正确填写您的电话号码”);
	
	// 联系电话(手机/电话皆可)验证
	jQuery.validator.addMethod(“isPhone”, function(value,element) {
		var length = value.length;
		var mobile = /^(((13[0-9]{1})|(15[0-9]{1}))+d{8})$/;
		var tel = /^d{3,4}-?d{7,9}$/;
		return this.optional(element) || (tel.test(value) || mobile.test(value));
	
	}, ”请正确填写您的联系电话”);
	
	// 邮政编码验证
	jQuery.validator.addMethod(“isZipCode”, function(value, element) {
		var tel = /^[0-9]{6}$/;
		return this.optional(element) || (tel.test(value));
	}, ”请正确填写您的邮政编码”);
	
	

	//字母数字
	jQuery.validator.addMethod(“alnum”, function(value, element) {
		return this.optional(element) || /^[a-zA-Z0-9]+$/.test(value);
	}, “只能包括英文字母和数字”);
	
	// 邮政编码验证
	jQuery.validator.addMethod(“zipcode”, function(value, element) {
		var tel = /^[0-9]{6}$/;
		return this.optional(element) || (tel.test(value));
	}, “请正确填写邮政编码”);
	
	// 汉字
	jQuery.validator.addMethod(“chcharacter”, function(value, element) {
		var tel = /^[u4e00-u9fa5]+$/;
		return this.optional(element) || (tel.test(value));
	}, “请输入汉字”);
	
	// 字符最小长度验证（一个中文字符长度为2）
	jQuery.validator.addMethod(“stringMinLength”, function(value, element, param) {
		var length = value.length;
		for ( var i = 0; i < value.length; i++) {
		if (value.charCodeAt(i) > 127) {
			length++;
		}
	}
	return this.optional(element) || (length >= param);
	}, $.validator.format(“长度不能小于{0}!”));
	
	// 字符最大长度验证（一个中文字符长度为2）
	jQuery.validator.addMethod(“stringMaxLength”, function(value, element, param) {
		var length = value.length;
		for ( var i = 0; i < value.length; i++) {
			if (value.charCodeAt(i) > 127) {
				length++;
			}
		}
		return this.optional(element) || (length <= param);
	}, $.validator.format(“长度不能大于{0}!”));
	
	// 字符验证
	jQuery.validator.addMethod(“string”, function(value, element) {
		return this.optional(element) || /^[u0391-uFFE5w]+$/.test(value);
	}, “不允许包含特殊符号!”);
	
	// 手机号码验证
	jQuery.validator.addMethod(“mobile”, function(value, element) {
		var length = value.length;
		return this.optional(element) || (length == 11 && /^(((13[0-9]{1})|(15[0-9]{1}))+d{8})$/.test(value));
	}, “手机号码格式错误!”);
	
	// 电话号码验证
	jQuery.validator.addMethod(“phone”, function(value, element) {
		var tel = /^(d{3,4}-?)?d{7,9}$/g;
		return this.optional(element) || (tel.test(value));
	}, “电话号码格式错误!”);
	
	// 邮政编码验证
	jQuery.validator.addMethod(“zipCode”, function(value, element) {
		var tel = /^[0-9]{6}$/;
		return this.optional(element) || (tel.test(value));
	}, “邮政编码格式错误!”);
	
	// 必须以特定字符串开头验证
	jQuery.validator.addMethod(“begin”, function(value, element, param) {
		var begin = new RegExp(“^” + param);
		return this.optional(element) || (begin.test(value));
	}, $.validator.format(“必须以 {0} 开头!”));
	
	// 验证两次输入值是否不相同
	jQuery.validator.addMethod(“notEqualTo”, function(value, element, param) {
		return value != $(param).val();
	}, $.validator.format(“两次输入不能相同!”));
	
	// 验证值不允许与特定值等于
	jQuery.validator.addMethod(“notEqual”, function(value, element, param) {
		return value != param;
	}, $.validator.format(“输入值不允许为{0}!”));
	
	// 验证值必须大于特定值(不能等于)
	jQuery.validator.addMethod(“gt”, function(value, element, param) {
		return value > param;
	}, $.validator.format(“输入值必须大于{0}!”));