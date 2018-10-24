$(function(){
    $('.hover a').click(function() {
        alert('敬请期待！');
    })
    //===============page1==================
    $(".sharelink-more").hover(function(){
        $('.sharelink-more-box').addClass('show');
    },function(){
        $('.sharelink-more-box').removeClass('show');
    });

    $('.hr2-mov').hide();
    $('.txtdesc1').addClass('show');
    $('.descimg1').addClass('show');

    $('.bg1 .duebtn').hover(function(){
        $(this).addClass('animated').addClass('pulse');
    },function(){
        $(this).removeClass('animated').removeClass('pulse');
    });

    //手动将flnav的hover移动到官方首页
    $('.flmenu .flnav .thumb').css('left','0');

    // $('.navlinkbox .navlink').hover(function(){
    // 	var index = $(this).index();
    // 	// if(index%2==0)index--;
    // 	var dis = 46.2; //滑块每次移动距离
    // 	$(this).siblings(".thumb").animate({"left":dis*index},300);
    // 	// $(this).addClass('cur').siblings().removeClass('cur');
    // 	// $(".info .news-cont").removeClass("cur").eq(index).addClass("cur");
    // },function(){
    // 	var index=$('.cur').index();
    // 	var dis = 46.2; //滑块每次移动距离
    // 	$(this).siblings(".thumb").animate({"left":dis*index},300);
    // });

    //第四屏的大轮播添加cur
    // $('.showcontbox').eq(0).addClass('cur');
    $('.page-a1').addClass('cur');



    //=================浏览器宽度====================
    $(window).resize(function(){
        hideitem();
    });
    hideitem();
    function hideitem(){
        var winWidth;
        if (window.innerWidth) 	{
            winWidth = window.innerWidth;
        }
        else if ((document.body) && (document.body.clientWidth)) {
            winWidth = document.body.clientWidth;
        }
        if(winWidth<1600){
            $('.char1').hide();
            $('.char2-1').hide();
            $('.char2-2').hide();
            $('.char3').hide();
        }
        if(winWidth>1600){
            $('.char1').show();
            $('.char2-1').show();
            $('.char2-2').show();
            $('.char3').show();
        }
    }

    //===============滚轮事件==================
    // 滚轮触发动画
    var isScroll = 0;
    var sTop= $(window).scrollTop();


    $(window).scroll(function(){
        sTop=$(window).scrollTop();
        if(sTop>799){
            $('.flmenu').addClass('drop');
        }
        if(sTop<799){
            $('.flmenu').removeClass('drop');
        }
        animatefunc();
    });
    //加载触发动画
    var sTop= $(window).scrollTop();
    animatefunc();

    //动画函数
    function animatefunc(){
        if(sTop>599){
            // $('.char1').addClass('show animated fadeInRight');
        }
        if(sTop>299){

            // $('.bg2 .bg-tit .tit-box').addClass('animated bounceIn show');
            // $('.boxtp1').eq(0).addClass('show');
            // setTimeout(function(){$('.boxtp1').eq(1).addClass('show');},200);
            // setTimeout(function(){$('.boxtp1').eq(2).addClass('show');},400);
            // setTimeout(function(){$('.boxtp1').eq(3).addClass('show');},600);
            // setTimeout(function(){$('.boxtp3').eq(0).addClass('show');},800);
            // setTimeout(function(){$('.boxtp2').eq(0).addClass('show');},1000);
            // setTimeout(function(){$('.boxtp2').eq(1).addClass('show');},1200);
            // setTimeout(function(){$('.boxtp1').eq(4).addClass('show');},1400);
            // setTimeout(function(){$('.boxtp4').eq(0).addClass('show');},1600);
        }
        if(sTop>799){
            // $('.char2-1').addClass('show animated fadeInLeft');
            // $('.char2-2').addClass('show animated fadeInLeft');
        }
        // if(sTop>999){
        if(sTop>199){
            // $('.bgimgvideo').get(0).pause();
            $(".newsbox .left").addClass('show');
            $('.bg3 .bg-tit .tit-box').addClass('animated bounceIn show');
            setTimeout(function(){$(".newsbox .middle").addClass('show');},200);
            setTimeout(function(){$(".newsbox .right").addClass('show');},400);
        }
        if(sTop<999){
            // $('.bgimgvideo').get(0).play();
        }
        if(sTop>1599){
            // $('.char3').addClass('show animated fadeInRight').animate({"opacity":"1"},100,function(){$(this).addClass('comp-animated')});
        }
        // if(sTop>2199){
        if(sTop>1399){
            // $('.showcontbox .txtdesc1').addClass('show');
            // $('.showcontbox .descimg1').addClass('show');
        }
        // if(sTop>2799){
        if(sTop>1999){
            $('.media-box .weibo-box').addClass('show');
            setTimeout(function(){$('.media-box .media').addClass('show');},400);
        }
        // if(sTop>3399){
        if(sTop>2299){
            $('.bg6 .tit').addClass('animated bounceIn show');
            setTimeout(function(){$('.bg6 .subtit').addClass('animated bounceIn show');},400);
        }
    }



    //===============page2==================


    $('.flnav .navlinksocial,.fldropdown').mouseenter(function(){
        $('.fldropdown').addClass("show");
    });
    $('.flnav .navlinksocial,.fldropdown').mouseleave(function(){
        $('.fldropdown').removeClass("show");
    });

    //浮动导航栏的滑块
    // $('.flnav .navlink').hover(function(){
    // 	var index = $(this).index();
    // 	var dis = 48.2; //滑块每次移动距离
    // 	$(this).siblings(".thumb").animate({"left":dis*index},300);
    // 	// $(this).addClass('cur').siblings().removeClass('cur');
    // 	// $(".info .news-cont").removeClass("cur").eq(index).addClass("cur");
    // },function(){
    // 	var index=$('.cur').index();
    // 	var dis = 48.2; //滑块每次移动距离
    // 	$(this).siblings(".thumb").animate({"left":dis*index},300);
    // });
    // $('.flnav').hover(function(){
    // 	$('.flnav .navlink').hover(function(){
    // 		var index=$(this).index();
    // 		var dis = 48.2; //滑块每次移动距离
    // 		$(this).siblings(".thumb").animate({"left":dis*index},300);
    // 		// $(this).addClass('cur').siblings().removeClass('cur');
    // 		// $(".info .news-cont").removeClass("cur").eq(index).addClass("cur");
    // 	});
    // },function(){
    // 	var index=$('.flnav .cur').index();
    // 	var dis = 48.2; //滑块每次移动距离
    // 	$(this).siblings(".thumb").animate({"left":dis*index},300);
    // });

    //===============page3==================

    //page3轮播
    // var mySwdivobj=new swdivobj({
    //     swiperdiv:'.swdiv',
    //     imgwidth:460,
    //     imgheight:307,
    //     animattime:500,
    //     duration:4500
    // });
    //page3轮播
    var myNews = new Swiper('.swiper1',{
        pagination: '.pagination',
        autoplay : 4000,//可选选项，自动滑动
        loop: true,
        simulateTouch : false,
        paginationClickable: true
    });
    //page3的新闻导航栏
    $('.vernavtag:not(.vernavtagmore)').on('mouseenter',function(){
        var index=$(this).index();
        $(this).addClass('cur').siblings().removeClass('cur');
        $('.infobigbox').eq(index).addClass('cur').siblings().removeClass('cur');
    });

    //===============page4==================

    //page4切换

    var page4Swiper = $('.swiper2').swiper({
        // pagination: '.pagination',
        // autoplay: 3000,
        autoplay:false,
        loop:true,
        simulateTouch: false,
        // grabCursor: true,
        paginationClickable: true,
        onSlideChangeStart: function(swiper){
            /**
             * 切换结束时，告诉我现在是第几个slide
             */
            var index = swiper.activeLoopIndex;
            // setPageNumber(index);
            $('.page-a').eq(index).addClass('cur').siblings().removeClass('cur');
        }
    });
    $('.page-a').click(function() {
        var _index = $(this).index();
        $(this).addClass('cur').siblings().removeClass('cur');
        page4Swiper.swipeTo(_index, 500, false);
        setPageNumber(page4Swiper.activeLoopIndex);
        setAutoPlay();
    });
    $('.lf').on('click', function(e) {
        e.preventDefault();
        page4Swiper.swipePrev();
        setPageNumber(page4Swiper.activeLoopIndex);
        setAutoPlay();
    })
    $('.rig').on('click', function(e) {
        e.preventDefault();
        page4Swiper.swipeNext();
        setPageNumber(page4Swiper.activeLoopIndex);
        setAutoPlay();
    })
    function setPageNumber(index){
        var num = parseInt(index) + 1;
        $('.pagenum span').html(num);
    }
    function setAutoPlay() {
        page4Swiper.stopAutoplay();
        setTimeout(function() {
            page4Swiper.startAutoplay();
        }, 3000);
    }


    //===============page5==================
    $('.medianav a').mouseenter(function(){
        var index = $(this).index();
        var dis = 84; //滑块每次移动距离
        $(this).siblings(".thumb").animate({"left":dis*index},100);
        $(this).addClass('cur').siblings().removeClass('cur');
        $(".newscont").removeClass("cur").eq(index).addClass("cur");
    });
    var medialogoindex=0;
    $('.media-left').on('click',function(){
        if(medialogoindex>0){
            medialogoindex--;
            $('.mediascroll').animate({"marginLeft":"-"+133*medialogoindex},300);

        }
    });
    $('.media-right').on('click',function(){
        if(medialogoindex<$('.medialogo').length-1){
            medialogoindex++;
            $('.mediascroll').animate({"marginLeft":"-"+133*medialogoindex},300);
        }
        // console.log(medialogoindex);
    });
    // $('.duebtn-btm').click(function(){
    //     $('html,body').animate({"scrollTop":"0"},1000);
    // });

    //预注册弹框
    $('#duebtn1').click(function () {
        $('#preBox').fadeIn();
    });





    //hover显示微信二维码
    $('.sharebox .sharelink.weixin').hover(function(){
        $('.weixin-qrcode').show();
    },function(){
        $('.weixin-qrcode').hide();
    });


});



//首页弹出视频
;(function () {
    var oPopup_video = $('#popup-video'),
        oPopup_video_video = $('#j-popvideo'),
        oPopup_video_layer = oPopup_video.find('.layer'),
        oPopup_video_close = oPopup_video.find('.close2');

    $('#video-btn').click(function () {
        var videoUrl = window.location.protocol + '//lm.woniu.com/static/web201712/media/lmyl.mp4';
        jwplayer('j-popvideo').setup({
            'flashplayer': '//static.woniu.com/script/jwplayer/player.swf',
            'width': '720',
            'height': '400',
            'file': videoUrl,
            'autostart': true,
            'controls': false
        });
        oPopup_video.fadeIn();
        oPopup_video.find('.wrap').addClass('animated bounceInDown');
        $('.bgimgvideo').get(0).pause();
        _hmt.push(['_trackEvent', "视频播放", "首屏视频播放按钮"]);

    });
    oPopup_video_close.click(function () {
        oPopup_video.fadeOut();
        oPopup_video_video.html('');
        $('.bgimgvideo').get(0).play();

    });
})();

	//预约弹窗


//分享按钮
;(function () {
    var url = window.location.href;
     //share
    var shareconf = {
        title: '《萌将风云》邀您抢先体验！',
        url: url,
        desc: '定义动作卡牌新概念，《萌将风云》邀您抢先体验！百种微操技能自由搭配，颠覆传统卡牌无脑数值！全立绘人物激萌搞笑，谈笑间开创宏图霸业！立即预约首测资格，100%得首测礼包！',
        wpic: '',
        pic: ''
    };
    var qzone = 'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + encodeURIComponent(shareconf.url) + '&title=' + shareconf.title + '&pics=' + shareconf.pic + '&summary=' + shareconf.desc;

    var sinaurl = 'https://service.weibo.com/share/share.php?title=' + shareconf.title + '&url=' + encodeURIComponent(shareconf.url) + '&source=bookmark&pic=' + shareconf.pic;

    var qqurl = 'https://connect.qq.com/widget/shareqq/index.html?url=' + encodeURIComponent(shareconf.url) + '&desc=' + shareconf.desc + '&title=' + shareconf.title + '&summary=&pics=' + shareconf.pic + '&flash=&site=&style=201&width=32&height=32&showcount=';

    var tieba = 'https://tieba.baidu.com/f/commit/share/openShareApi?title=' + shareconf.title + '&url=' + shareconf.url;

    $('.sharemore .share-weibo, .share.weibo').attr('href', sinaurl);
    $('.sharemore .share-qq, .share.qq').attr('href', qqurl);
    $('.sharemore .share-qqzone, .share.qzone').attr('href', qzone);
    $('.share.tieba').attr('href', tieba);


})();
