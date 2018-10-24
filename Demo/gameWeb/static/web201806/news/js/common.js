//分享按钮
;(function () {
    var oPopup_weixin_qrcode = $('#popup-weixin-qrcode'),
        oPopup_weixin_qrcode_close = oPopup_weixin_qrcode.find('.close2');
    var url = window.location.href;
        // oShare = oP4.find('.share');

    oPopup_weixin_qrcode_close.click(function () {
        hide(oPopup_weixin_qrcode);
    });

    // $('.solink.solinkweixin,.sharelink-more-box .weixin,.wx-apt').click(function () {
        

    //     var localUrl = window.location.href;
    //     var qrcode;
    //     // 清除上一次的二维码
    //     if (qrcode) {
    //         qrcode.clear();
    //     }
    //     //创建二维码
    //     qrcode = new QRCode(document.getElementById("qrcode"), {
    //         width: 158, //设置宽高
    //         height: 158
    //     });

    //     qrcode.makeCode(localUrl);

    //     show(oPopup_weixin_qrcode);
    // });

//share
    // var shareconf = {
        //     title: '《天乩之白蛇传说》手游官网-同名电视剧官方正版手游',
        //     url: url,
        //     desc: '',
        //     wpic: '',
        //     pic: 'http://t.woniu.com/static/web201706/images/share.jpg'
        // };
        // var qzone = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + encodeURIComponent(shareconf.url) + '&title=' + shareconf.title + '&pics=' + shareconf.pic + '&summary=' + shareconf.desc;

        // var sinaurl = 'http://service.weibo.com/share/share.php?title=' + shareconf.title + '&url=' + encodeURIComponent(shareconf.url) + '&source=bookmark&pic=' + shareconf.pic;

        // var qqurl = 'http://connect.qq.com/widget/shareqq/index.html?url=' + encodeURIComponent(shareconf.url) + '&desc=' + shareconf.desc + '&title=' + shareconf.title + '&summary=&pics=' + shareconf.pic + '&flash=&site=&style=201&width=32&height=32&showcount=';

        // var tieba = 'http://tieba.baidu.com/f/commit/share/openShareApi?title=' + shareconf.title + '&url=' + shareconf.url;

        // $('.s-weibo').attr('href', sinaurl);
        // $('.s-qq').attr('href', qqurl);
        // $('.s-zone').attr('href', qzone);
        // $('.s-tieba').attr('href', tieba);


    function show(ele) {
        ele.fadeIn();
    }

    function hide(ele) {
        ele.fadeOut();
    }

    //浮动导航栏下载
    // $('#downbtn3').click(function(){
    //     $('#preBox').fadeIn();
    //     $('.yue-and').trigger('click');
    // });
    $('#downbtn4').click(function(){
        $('#preBox').fadeIn();
        $('.yue-ios').trigger('click');
    });
})();


