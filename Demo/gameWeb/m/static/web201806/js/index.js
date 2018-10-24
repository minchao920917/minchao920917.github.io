$(function(){

    //判断操作系统
    var browser = {
        versions: function() {
            var u = navigator.userAgent,
                app = navigator.appVersion;
            return { //移动终端浏览器版本信息
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1 //是否iPad
            };
        }()
    };
    
    if (browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
        $('#iosBtns').fadeIn();
    } else {
        $('#androidBtns').fadeIn();
        $('#androidBtns').addClass("androidBtns-top");
         $('.slogan').addClass("slogan-top");
    }

    //顶部菜单
      $('.topnav, .morenav ').on('click', function() {
          $('.menu').fadeIn();
      })
      $('.close').click(function () {
          hide($('.pop'));
      });
    var sTop;
    $(window).scroll(function(){
        // console.log(111);
        loadanimate();
    });
    loadanimate();

    function loadanimate(){
        sTop=$(window).scrollTop();
        var isShow=( $(".bg4").offset().top - $(window).scrollTop() ) > $(window).height();
        if(!isShow){
            $('.flnav').addClass('show');
            $('.topnav').hide();
        }
        if(isShow){
            $('.flnav').removeClass('show');
            $('.topnav').show();
        }
        
    }

	//bg4的轮播
    var swiper1 = new Swiper('.swiper-container1', {
        pagination: '.swiper-pagination1',
        autoplay: 4500,
        paginationClickable: true,
        autoplayDisableOnInteraction: false,
        speed: 600,
        calculateHeight: true,
        loop:true
    });


    $('.closebtn').click(function(){
        $('.infopopbox').removeClass('show');
        $('.mask').hide();
    });

    window.scrollTo(0, 0);

    //bg2的轮播
    var swiper = new Swiper('.swiper-container3', {
        pagination: '.swiper-pagination3',
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflow: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows : true
        },
        autoplay: 5000,
        paginationClickable: true,
        autoplayDisableOnInteraction: false,
        speed: 600,
        calculateHeight: true,
        loop:true
    });


    //新闻tab切换
    $('.news-nav .nav-one').click(function(){
        var navindex=$(this).index('.news-nav .nav-one');
        $(this).addClass('cur').siblings().removeClass('cur');
        $('.newsone-detail').eq(navindex).addClass('cur').siblings().removeClass('cur');
    });

});

//预注册弹框popup-pre
(function () {
    var $ios = $('.ios'),
    $pop = $('.pop'),
    $apt = $('#apt'),
    $success = $('.success');
    var system = '';
    //判断操作系统
    var browser = {
        versions: function() {
            var u = navigator.userAgent,
                app = navigator.appVersion;
            return { //移动终端浏览器版本信息
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1 //是否iPad
            };
        }()
    };

    $('#device span').click(function() {
        if ($('.device-list').hasClass('show')) {
            $('.device-list').removeClass('show');
        } else {
            $('.device-list').addClass('show');
        }
    });
    $('.device-list ul li').click(function() {
        system = $(this).text();
        $('#device span').html(system);
        $('.device-list').removeClass('show');
    });
    $('.device-list ul li').click(function() {
        system = $(this).text();
        $('#device span').html(system);
        $('.device-list').removeClass('show');
    });
    //预约
    $('#pre-btn,#duebtn-btm-ios,#duebtnflnav-ios').on('click', function() {
        if (browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
            $('#pre-ios').fadeIn();
        } else {
            $('#pre-android').fadeIn();
        }
        // window.location.href = '//wdkl.woniu.com/m/static/mob/';
    });

    //社群
    // $('.commu, .sharelink.weixin').on('click', function() {
    //     $('.popsns').fadeIn();
    // })

    //ios预约
    var submitbtnState = null;
    $('#j-order').on('click', function() {
        if (submitbtnState) {
            return;
        }
        var $go_apt = $('.go-apt'),
        reg= /^[1][0-9]\d{9}$/,
        m_reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
        
        
        var phone = $('#phone').val(),
            mail = $('#mail').val(),
            sys = $.trim($('#device span').html());

        if(!reg.test(phone)||phone == null){
            alert("请输入正确的手机号！");
            return false;
        };
        if (!m_reg.test(mail)||mail == null) {
            alert("请输入正确的邮箱！");
            return false;
        };
        if (sys == "请选择您的设备型号"||sys == null) {
            alert("请选择您的设备型号！");
            return false;
        };
        submitbtnState = true;
        $.ajax({
            url: '//gwactv2.woniu.com/order/Appointment',
            type: 'get',
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            data: {
                phone: phone,
                mail: mail,
                system: '-',
                model: sys.replace(/\s+/g, ''),
                source: window.location.origin
            },
            success: function(data){
                submitbtnState = null;
                if (data.msgcode == 1) {
                    $ios.fadeOut('fast', function() {
                        $success.fadeIn();
                    });
                }else{
                    alert(data.msg);
                }
            }
        })
    });

    $('.close').click(function () {
        hide($('.pop'));
    });

})();

$(function(){
	// $('.sharetofriend').click(function(){
	// 	$('.popsns').show();
	// })

    var myshare = new mShare({
        title: '黎明陨落--ARPG王者之作，现已破晓来袭！',
        desc: '2018年必玩APRG手游-黎明陨落现已开发预约，拥有超强的打击感和完美的画面效果，丰富的交互玩法，带来顶级的游戏体验',
        url: 'https://lm.woniu.com/m/',
        pic: 'https://lm.woniu.com/static/web201712/images/share.jpg'
    });

    $('.sharetofriend, .popshare').click(function(){
        myshare.show();
    })

})

//popup-video
;(function () {
    //video
    var _body = $('body');
    // console.log($('.swbigvideobox').attr('data-videosrc'));
    // $('.swbigvideobox').each(function(){
    //     if($(this).attr('data-videosrc')!=$.trim("")){
    //         // console.log("enter if");
    //         $(this).addClass('video-btn');
    //     }
    // });

    var oPopup_video = $('#popup-video'),
        oPopup_video_v = oPopup_video.find('.video'),
        oVideo_btn = $('#video-btn')[0],
        oPopup_video_layer = oPopup_video.find('.layer'),
        oPopup_video_close = oPopup_video.find('.close');


    var videoUrl = 'https://lm.woniu.com/static/web201712/media/lmyl.mp4';
    var video = '<video id="gmvideo" autoplay controls><source src="https://lm.woniu.com/static/web201712/media/lmyl.mp4" type="video/mp4"></video>';
    // console.log(oVideo_btn);
    $(oVideo_btn).click(function () {
        
        oPopup_video.fadeIn();
        oPopup_video_v.html(video);
        // $('#gmvideo')[0].play();
        _body.css('overflow', 'hidden');
    });

    oPopup_video_layer.click(function() {
        // oPopup_video.fadeOut();
        oPopup_video.hide();
        // $('#gmvideo')[0].pause();
        // $('#gmvideo').hide();
        $('#popup-video .video').html('');
        _body.css('overflow', 'auto');
    });

    oPopup_video_close.click(function () {
        oPopup_video.fadeOut();
        oPopup_video_v.html('');
        _body.removeAttr('onmousewheel');
    });
})();

//share
// ;(function () {
//     var url = window.location.href;
//     var oShareBox = $('#shareBox');
//     var oPopup_sns = $('#popup-sns');
//     var oPopup_sns_close = oPopup_sns.find('.close');
//     var oFollow_weixin_btn = oPopup_sns.find('.weixin-box .weixin');
//     var oFollow_qrcode = oPopup_sns.find('.follow .qrcode');
//     var oFollow_qrcode_close = oPopup_sns.find('.follow .qrcode .close');
//     var oShare_btn = oPopup_sns.find('.share-btn');
//     var oCom_layer = $('#com-layer');
//     var oShare_weixin_btn = oShareBox.find('.weixin');
//     var oShare_weixin = oShareBox.find('.weixin-share');
//     var isWeixinLayerShow=false;
//     var oShare_weixin1 = oShareBox.find('.weixin-share1');
//     var oShare_weixin1_close = oShare_weixin1.find('.close');

//     $('.commu,.sharelink.weixin').click(function () {
//         // console.log('commu click');
//         show(oPopup_sns);
//     });
//     $('.linkonesocial').click(function(){
//         // console.log('linkonesocial click');
//         show(oPopup_sns);
//         $('.headslidenav').hide();
//     })
//     oPopup_sns_close.click(function () {
//         hide(oPopup_sns);
//     });
//     $('#shareBox .layer').click(function () {
//         hide(oShareBox);
//         if(isWeixinLayerShow) {
//             hide(oShare_weixin);
//             isWeixinLayerShow=false;
//         }
//     });
//     $('#shareBox .close').click(function () {
//         oShareBox.fadeOut();
//     });
//     //share
//     oShare_btn.click(function () {
//         show(oShareBox);
//         hide(oPopup_sns);
//     });
//     $('.sharetofriend').click(function () {
//         show(oShareBox);
//         hide(oPopup_sns);
//     });
//     oCom_layer.click(function () {
//         hide(oShareBox);
//     });
//     oShare_weixin_btn.click(function () {
//         if (is_weixn()) {
//             show(oShare_weixin);
//             isWeixinLayerShow=true;
//         } else {
//             console.log(oShare_weixin1)
//             show(oShare_weixin1);
//         }
//     });
//     oShare_weixin.click(function(){
//         hide(oShare_weixin);
//     });
//     oShare_weixin1_close.click(function () {
//         hide(oShare_weixin1);
//     });
//     oFollow_weixin_btn.click(function () {
//         show(oFollow_qrcode);
//     });
//     oFollow_qrcode_close.click(function () {
//         hide(oFollow_qrcod);
//     });
//     function is_weixn() {
//         var ua = navigator.userAgent.toLowerCase();
//         if (ua.match(/MicroMessenger/i) == "micromessenger") {
//             return true;
//         } else {
//             return false;
//         }
//     }

//     var shareconf = {
//         title: '《黑暗与光明》手游官方网站-同名端游IP改编，3DMMO魔幻史诗阵营对决！',
//         url: url,
//         desc: '光暗对决，终极魔幻！3DMMO史诗级魔幻手游《黑暗与光明》真实无缝1496万平方米超大魔幻世界，真实演绎光与暗的对决， 随机动态事件，一起参与改变世界，体验一场富有生命的终极魔幻盛宴！',
//         wpic: '',
//         pic: ''
//     };
//     var qzone = '//sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + encodeURIComponent(shareconf.url) + '&title=' + shareconf.title + '&pics=' + shareconf.pic + '&summary=' + shareconf.desc;

//     var sinaurl = '//service.weibo.com/share/share.php?title=' + shareconf.desc + '&url=' + encodeURIComponent(shareconf.url) + '&source=bookmark&pic=' + shareconf.pic;

//     var qqurl = '//connect.qq.com/widget/shareqq/index.html?url=' + encodeURIComponent(shareconf.url) + '&desc=' + shareconf.desc + '&title=' + shareconf.title + '&summary=&pics=' + shareconf.pic + '&flash=&site=&style=201&width=32&height=32&showcount=';

//     $('#shareBox .weibo').attr('href', sinaurl);
//     $('#shareBox .qq').attr('href', qqurl);
//     $('#shareBox .qqz').attr('href', qzone);





// })();

function show(ele){
    ele.show();
}
function hide(ele){
    ele.hide();
}


$('.swiper-link').click(function(event) {
    window.location.href = $(this).attr('url');
});