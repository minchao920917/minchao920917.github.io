---
layout: post
title:  "图片上传功能"
date:   2015-08-10 19:06:05
categories: Java
tags: Java
excerpt: 最近在项目开发过程中出现了一个问题，一个表单中途改了需求，要求能进行上传附件（格式是PDF或者图片）
mathjax: true
author:	闵超
---

* content
{:toc}

#	图片上传功能

最近在项目开发过程中出现了一个问题，一个表单中途改了需求，要求能进行上传附件（格式是PDF或者图片）

前台代码如下，

	<form id="supplierForm" action="">
		<div class="row form-div">
			<p class="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-title">附件信息</p>
			<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 form-group">
			<label for="business-licence">公司简介(营业执照/税务登记证/资质文件等)<span class="require">*</span></label>
			<div class="upload" id="upload1">
				<input class="file-input" type="file" id="business" onchange="handleBusiness()" > 
				<input	id="businesslicence" type="text"  value="" class="form-control" readonly="readonly">
				<a id="businessBtn" href="javascript:void(0);"
					class="btn btn-info" onclick="uploadBusiness()">上传</a>
			</div>
		</div>						
	</form>

	<!-- 图片的表单   -->
	<form id="uploadForm" method="post" enctype="multipart/form-data"
		target="hiddenIframe" style="display: none; width: 0px; height: 0px;">
		<span id="fileContent"></span>
		<input type="submit" onclick="uploadFormSubmit()">
	</form>

js代码

	var businessFile = $("#business");
	var businesslicence = $("#businesslicence");
	function handleBusiness() {
		var of = $("#business");
		//修改属性
		of.attr("id", "uploadFile");
		of.attr("name", "uploadFile");
		$("#fileContent").empty();//清空表单
		$("#fileContent").append(of);//选中元素之后放入表单
		//将文件移动至上传表单
		var file = $("#uploadFile").val();
		function uploadFormSubmit(){
				var options = {
						type : 'POST',
						url : "${base}/uploaderSupplier.jspx",
						complete : function(data) {
							$("#businessPath").val(data.responseJSON.fileName);
							of.attr("id", "business");
							$("#upload1").append(of);
							layer.msg("简介文件上传成功!");
						}
					}
					$("#uploadForm").ajaxSubmit(options);
			}
			if(document.getElementById("uploadFile").files){
				var fileData = document.getElementById("uploadFile").files[0];
			}
			
			var ext = file.substring(file.lastIndexOf('.'), file.length).toUpperCase();
			if (ext == '.PNG' || ext == '.JPG' || ext == '.JPEG' || ext == '.GIF' || ext == '.PDF') {
				if (fileData.size <= 4 * 1024 * 1024) {
					businesslicence.val(businessFile.val());
					uploadFormSubmit();
				} else {
					layer.msg("文件最大不能超过4M!");
					$("#businesslicence").val("");
					of.attr("id", "business");
					$("#upload1").append(of);
				}
			} else {
				layer.msg("只能上传图片和PDF文件");
				$("#businesslicence").val("");
				of.attr("id", "business");
				
				$("#upload1").append(of);
				return;
			}
		};
		// 	点击上传按钮触发文件选择框
		function uploadBusiness() {
			businessFile.click();
		};

java后台代码:

	/**
     * <p>功能简述:图片上传接口</p>
     * <p>细节描述:返回图片的保存路径，图片名前拼接日期</p>
     * @param request
     * @param response
     * @param model [参数说明]
     * @author minchao
     * @since [2017年6月30日]
     */
    @RequestMapping(value = "/uploaderSupplier.jspx", method = RequestMethod.POST)
    public void uploaderSupplier(HttpServletRequest request, HttpServletResponse response,ModelMap model) {

        response.setCharacterEncoding("UTF-8");  
        response.setHeader("Cache-Control", "no-cache");  
        response.setDateHeader("Expires", 0);    
        String fileName = "";
        String filePath = ""; 
        // 转型为MultipartHttpRequest：   
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;   
        // 获得文件：  
        MultipartFile filedata = multipartRequest.getFile("uploadFile");   
        System.out.print(filedata);
        if (filedata != null && !filedata.isEmpty()) {   
           // 获取图片的文件名  
           fileName = filedata.getOriginalFilename();  
           // 将图片上传到服务器  
           filePath=saveFile(request, fileName, filedata);    
           // System.out.println("上传文件 "+filePath+"成功");  
        }  
        System.out.println(request);
        JSONObject json = new JSONObject();
        json.put("success", true);
        json.put("status", 1);
        json.put("fileName", filePath);
        ResponseUtils.renderJson(response, json.toString());
    }
    
    /**
     * <p>功能简述:保存文件方法</p>
     * <p>细节描述</p>
     * @param request
     * @param newFileName
     * @param filedata
     * @return [参数说明]
     * @author minchao
     * @since [2017年6月30日]
     */
    @Autowired
    private KdSupplierMng kdSupplierMng;
    public String saveFile(HttpServletRequest request, String newFileName,  
            MultipartFile filedata) {  
        String path = request.getSession().getServletContext().getRealPath("/r/cms/www/supAttachment/");
        String saveFilePath = path; 
        
        Date d = new Date(); 
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss");
        String dateNowStr = sdf.format(d); 
        String ext =  newFileName.substring(newFileName.lastIndexOf("."));
        newFileName = dateNowStr + ext;
        //System.out.println("文件名：" + newFileName); 
        // 构建文件目录  
        File tempFile = new File(saveFilePath);  
        if (!tempFile.exists()) {  
            tempFile.mkdirs();  
        }  
        // 保存文件到服务器  
        FileOutputStream fos;  
        try {  
            fos = new FileOutputStream(saveFilePath + "\\" + newFileName);  
            fos.write(filedata.getBytes());  
            fos.close();  
        }catch (Exception e) {  
            e.printStackTrace();  
        }  
        return "/r/cms/www/supAttachment/"+newFileName;  
    } 
    

接口返回的存放图片的名称。

实现图片上传的方法是，新写一个表单，专门用来上传图片。由上传按钮来触发文件框的弹出选择文件窗口，接着，再由文件框的onchange()方法触发新表单的ajax上传文件功能。

注意，如果直接粘贴复制代码的话，需要导入jquery.form.js和layer.js文件。

###		当然，事情并不会就这样结束。

ie9	有两个坑：

第一个坑:
getElementById("uploadFile").files[0]会报错，因为ie9是无法读取浏览器之外的本地文件的。

解决方法是：在var fileData = document.getElementById("uploadFile").files[0];//获取文件和var ext = file.substring(file.lastIndexOf('.'), file.length).toUpperCase();//判断尾缀z之间加一段判断代码

	if(document.getElementById("uploadFile").files){
		var fileData = document.getElementById("uploadFile").files[0];
	}else{
		 var fileEle = document.getElementById("uploadFile");
		 var fileData = null;
		 /*
        低版本IE由于JS安全问题，不允许JS访问本地文件,所以无法获取files, 对于低版本的IE可以使用ActiveXObject获取文件对象, 但是默认情况下
        ActiveXObject为不可用的, 所以要想使用此对象要先启用设置, 即:  Tools(工具) / Internet options(选项) / Security(安全) / Custom level(自定义级别)
        找到"Initialize and script ActiveX controls not marked as safe for scripting"设置为"Enable(not secure)"即可.
        初始化和脚本化ActiveX控件，标记为脚本安全
        */
    var fso = new ActiveXObject("Scripting.FileSystemObject");

    /*
        1. 获取文件路径
            出于安全性的考虑，低版本IE上传文件时屏蔽了真实的本地文件路径,
            以C:\fakepath\**取而代之, 所以默认情况下通过fileEle.value 不能获取到
            文件的真实路径.
            如果想获取真实路径, 有两种方式:
                1. 通过设置IE的安全设置, 即:
                    Tools(工具) / Internet options(选项) / Security(安全) / Custom level(自定义级别)
                    找到"Include local directory path when uploading files to a server"
                    设置为的"Enable"
                2. 使用JS获取, 即:
                    fileEle.select().blur();
                    var filePath = document.selection.createRange().text;
    */
    fileEle.select();
    fileEle.blur();
    var filePath = $("#uploadFile").val();
        /*
            FileExists:  判断 文件是否存在
            GetFile: 获取文件对象
        */
        if(fso.FileExists(filePath)){
        	fileData = fso.GetFile(filePath);
        }
        
	}
	console.log(fileData);

其中还要用户配合打开ie浏览器的安全限制

第二个坑:由于IE9的安全限制，会导致按钮触发文件选择框的时候会报错。JAVASCRIPT5的错误。

ie10以下有这个问题，为了安全性能考虑，只允许点击file文本的时候才可以上传，因此，需要设置一个透明的 <  input type="file">浮动到自定义按钮上，设置透明度为0，即可解决此问题

这个的解决办法是将input文件框透明置顶，当点击空白处时自动触发文件选择。但这与需求相违背了。JIRA上测试始终给我报了个错，说是用户常用习惯不符，触发文件选择框都是由点击上传按钮开始触发。因此，就只能放大招将IE9屏蔽了。

综上所述。

后期如果我找到了好的上传插件，并且兼容IE9的。会后续补充在博客里。
如果您有好的上传插件或者更好的解决办法。希望您能在评论里留言告知，方便我学习。