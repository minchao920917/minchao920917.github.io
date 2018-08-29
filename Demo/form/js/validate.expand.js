//验证特殊字符
jQuery.validator.addMethod("isSpecialChar", function(value, element) {  
        var pattern = new RegExp("[`~$^&*=|%{}/?~@￥……&*|【】+\"\\\\]");  
        var specialStr = "";  
        for(var i=0;i<value.length;i++){  
             specialStr += value.substr(i, 1).replace(pattern, '');  
        }  
        if( specialStr == value){  
            return true;  
        }  
        return false;  
    }, "不能包含特殊字符"); 
// 联系电话(手机/电话皆可)验证
jQuery.validator.addMethod("isPhone",function(value,element) {
    var length = value.length;
    var mobile = /^1(3|4|5|7|8)\d{9}$/;
    var tel = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
    return this.optional(element) || (tel.test(value) || mobile.test(value));
}, "请正确填写电话");
// 邮政编码验证
jQuery.validator.addMethod("isZipCode", function(value, element) {
    var tel = /^[0-9]{6}$/;
    return this.optional(element) || (tel.test(value));
},"请正确填写您的邮政编码");
//验证身份证
jQuery.validator.addMethod("isIdCardNo", function(value, element) { 
      var idCard = /^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/;   
      return this.optional(element) || isIdCardNo(value);    
    }, "请输入正确的身份证号码。"); 
 	//身份证号码的验证规则
    function isIdCardNo(num){ 
    　　 var len = num.length, re; 
    　　 if (len == 15) 
    　　 re = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{2})(\w)$/); 
    　　 else if (len == 18) 
    　　 re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/); 
    　　 else {
            return false;
        } 
    　　 var a = num.match(re); 
    　　 if (a != null) 
    　　 { 
    　　 if (len==15) 
    　　 { 
    　　 var D = new Date("19"+a[3]+"/"+a[4]+"/"+a[5]); 
    　　 var B = D.getYear()==a[3]&&(D.getMonth()+1)==a[4]&&D.getDate()==a[5]; 
    　　 } 
    　　 else 
    　　 { 
    　　 var D = new Date(a[3]+"/"+a[4]+"/"+a[5]); 
    　　 var B = D.getFullYear()==a[3]&&(D.getMonth()+1)==a[4]&&D.getDate()==a[5]; 
    　　 } 
    　　 if (!B) {
            return false;
        } 
    　　 } 
    　　 if(!re.test(num)){
            return false;
        }
    　　 return true; 
    } 
// 手机号码验证
jQuery.validator.addMethod("isMobile", function(value, element) {
    var length = value.length;
    var mobile = /^(((13[0-9]{1})|(15[0-9]{1}))+d{8})$/;
    return this.optional(element) || (length == 11 && mobile.test(value));
}, "请正确填写您的手机号码");

var rules ={
    name:{
        required:true,
        isSpecialChar:true
    },
    lastName:{
        required:true,
        isSpecialChar:true
    },
    identity:{
        required:true,
        isIdCardNo:true
    },
    nation:{
        required:true,
        isSpecialChar:true
    },
    birthday:{
        required:true,
    },
    origin:{
        required:true,
        isSpecialChar:true
    },
    political:{
        required:true,
        isSpecialChar:true
    },
    height:{
        required:true,
        isSpecialChar:true,
        number:true
    },
    health:{
        required:true,
        isSpecialChar:true,
        
    },
    permanentAddress:{
        required:true,
        isSpecialChar:true
    },
    identityAddress:{
        required:true,
        isSpecialChar:true
    },
    fileUnit:{
        required:true,
        isSpecialChar:true
    },
    fileAddress:{
        required:true,
        isSpecialChar:true
    },
    currentTel:{
        required:true,
        isPhone:true
    },
    currentCode:{
        required:true,
        isZipCode:true
    },
    currentAddress:{
        required:true,
        isSpecialChar:true
    },
    familyTel:{
        required:true,
        isPhone:true
    },
    familyCode:{
        required:true,
        isZipCode:true
    },
    familyAddress:{
        required:true,
        isSpecialChar:true
    },
    personalMobile:{
        required:true,
        isMobile:true,
    },
    personalEmail:{
        required:true,
        email:true
    },
    father:{
        required:true
    },
    fatherBirth:{
        required:true
    },
    fatherWork:{
        required:true
    },
    fatherMobile:{
        required:true,
        isPhone:true
    },
    mother:{
        required:true
    },
    motherBirth:{
        required:true
    },
    motherWork:{
        required:true
    },
    motherMobile:{
        required:true
    },
    borther:{
        required:true
    },
    bortherBirth:{
        required:true
    },
    bortherWork:{
        required:true
    },
    bortherMobile:{
        required:true
    },
    sister:{
        required:true
    },
    sisterBirth:{
        required:true
    },
    sisterWork:{
        required:true
    },
    sisterMobile:{
        required:true
    },
    spouse:{
        required:true
    },
    spouseBirth:{
        required:true
    },
    spouseWork:{
        required:true
    },
    spouseMobile:{
        required:true
    },
    child:{
        required:true
    },
    childBirth:{
        required:true
    },
    childWork:{
        required:true
    },
    childMobile:{
        required:true
    },
    friendName:{
        required:true
    },
    friendRelation:{
        required:true
    },
    friendBirth:{
        required:true
    },
    friendWork:{
        required:true
    },
    friendMobile:{
        required:true,
        isPhone:true
    },
    friendMobile1:{
        isPhone:true
    },
    friendMobile2:{
        isPhone:true
    },
    friendMobile3:{
        isPhone:true
    },
    experienceStart:{
        required:true
    },
    experienceEnd:{
        required:true
    },
    experienceUnit:{
        required:true
    },
    experiencePeople:{
        required:true
    },
    experienceTel:{
        required:true,
        isPhone:true
    },
    experienceTel1:{
        isPhone:true
    },
    experienceTel2:{
        isPhone:true
    },
    experienceTel3:{
        isPhone:true
    },
    educationStart:{
        required:true
    },
    educationEnd:{
        required:true
    },
    educationCollege:{
        required:true
    },
    educationMajor:{
        required:true
    },
    educationRecord:{
        required:true
    }

};
var messages = {
        name:{
            required:"请输入中文名称"
        },
        lastName:{
            required:"请输入曾用名，无就填无"
        },
        identity:{
            required:"请输入您的身份证号码"
        },
        nation:{
            required:"请输入民族"
        },
        birthday:{
            required:"请选择出生日期"
        },
        origin:{
            required:"请输入籍贯"
        },
        political:{
            required:"请输入政治面貌"
        },
        height:{
            required:"请输入身高",
            number:"请输入正确的身高"
        },
        health:{
            required:"请输入健康状况"
        },
        permanentAddress:{
            required:"请输入户口地址"
        },
        identityAddress:{
            required:"请输入身份证地址"
        },
        fileUnit:{
            required:"请输入档案存放单位地址"
        },
        fileAddress:{
            required:"请输入档案地址"
        },
        currentTel:{
            required:"请输入当前住所电话"
        },
        currentCode:{
            required:"请输入目前住所邮编"
        },
        currentAddress:{
            required:"请输入目前住所地址"
        },
        familyTel:{
            required:"请输入家庭住所电话"
        },
        familyCode:{
            required:"请输入家庭住所邮编"
        },
        familyAddress:{
            required:"请输入家庭住所地址"
        },
        personalMobile:{
            required:"请输入个人手机号"
        },
        personalEmail:{
            required:"请输入私人邮箱",
            email:"请输入正确的邮箱格式"
        },
        father:{
            required:"请输入您父亲的姓名，无就填无"
        },
        fatherBirth:{
            required:"请输入您父亲的出生年月"
        },
        fatherWork:{
            required:"请输入您父亲的工作单位(职务)"
        },
        fatherMobile:{
            required:"请输入您父亲的联系电话"
        },
        mother:{
            required:"请输入您母亲的姓名，无就填无"
        },
        motherBirth:{
            required:"请输入您母亲的出生年月"
        },
        motherWork:{
            required:"请输入您母亲的工作单位(职务)"
        },
        motherMobile:{
            required:"请输入您母亲的联系电话"
        },
        borther:{
            required:"请输入您兄弟的姓名，无就填无"
        },
        bortherBirth:{
            required:"请输入您兄弟的出生年月"
        },
        bortherWork:{
            required:"请输入您兄弟的工作单位(职务)"
        },
        bortherMobile:{
            required:"请输入您兄弟的联系电话"
        },
        sister:{
            required:"请输入您姐妹的姓名，无就填无"
        },
        sisterBirth:{
            required:"请输入您姐妹的出生年月"
        },
        sisterWork:{
            required:"请输入您姐妹的工作单位(职务)"
        },
        sisterMobile:{
            required:"请输入您姐妹的联系电话"
        },
        spouse:{
            required:"请输入您配偶的姓名，无就填无"
        },
        spouseBirth:{
            required:"请输入您配偶的出生年月"
        },
        spouseWork:{
            required:"请输入您配偶的工作单位(职务)"
        },
        spouseMobile:{
            required:"请输入您配偶的联系电话"
        },
        child:{
            required:"请输入您子女的姓名，无就填无"
        },
        childBirth:{
            required:"请输入您子女的出生年月"
        },
        childWork:{
            required:"请输入您子女的工作单位(职务)"
        },
        childMobile:{
            required:"请输入您子女的联系电话"
        },
        friendName:{
            required:"请输入联系人姓名"
        },
        friendRelation:{
            required:"请输入联系人关系"
        },
        friendBirth:{
            required:"请输入联系人出生年月"
        },
        friendWork:{
            required:"请输入联系人工作单位"
        },
        friendMobile:{
            required:"请输入联系人电话"
        },
        experienceStart:{
            required:"请输入起始年月"
        },
        experienceEnd:{
            required:"请输入终止年月"
        },
        experienceUnit:{
            required:"请输入工作单位"
        },
        experiencePeople:{
            required:"请输入证明人"
        },
        experienceTel:{
            required:"请输入联系电话",
        },
        educationStart:{
            required:"请输入起始年月"
        },
        educationEnd:{
            required:"请输入终止年月"
        },
        educationCollege:{
            required:"请输入学校名称"
        },
        educationMajor:{
            required:"请输入专业名称"
        },
        educationRecord:{
            required:"请输入学历"
        }        
};