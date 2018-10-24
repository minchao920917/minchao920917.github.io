$(function() {
    var common = (function() {

        var hideQQbox = function() {
            setTimeout(function() {
                $('.share-box .qq .qq-box').removeClass('show');
            }, 3000);
        }

        var slideShare = function() {
            var $more_box = $('.more-box'),
                $more = $('.more');
            $more.hover(function() {
                $more_box.stop();
                $more_box.fadeIn();
            }, function() {
                $more_box.stop();
                $more_box.fadeOut();
            });
        };

        var navShare = function() {
            var shareconf = {
                title: '黎明陨落--ARPG王者之作，现已破晓来袭！',
                url: '//lm.woniu.com/',
                desc: '2018年必玩APRG手游-黎明陨落现已开发预约，拥有超强的打击感和完美的画面效果，丰富的交互玩法，带来顶级的游戏体验',
                pic: '//lm.woniu.com/static/web201712/images/share.jpg'
            };
            var qzone = 'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + encodeURIComponent(shareconf.url) + '&title=' + shareconf.title + '&pics=' + shareconf.pic + '&summary=' + shareconf.desc;

            var sinaurl = 'https://service.weibo.com/share/share.php?title=' + shareconf.title + '&url=' + encodeURIComponent(shareconf.url) + '&source=bookmark&pic=' + shareconf.pic;

            var qqurl = 'https://connect.qq.com/widget/shareqq/index.html?url=' + encodeURIComponent(shareconf.url) + '&desc=' + shareconf.desc + '&title=' + shareconf.title + '&summary=&pics=' + shareconf.pic + '&flash=&site=&style=201&width=32&height=32&showcount=';

            var tieba = 'https://tieba.baidu.com/f/commit/share/openShareApi?title=' + shareconf.title + '&desc=' + shareconf.desc + '&comment=&pic=' + shareconf.pic + '&url=' + encodeURIComponent(shareconf.url);

            $('.s-weibo').attr('href', sinaurl);
            $('.s-qq').attr('href', qqurl);
            $('.s-qzone').attr('href', qzone);
            $('.s-tieba').attr('href', tieba);
        };

        var qrcode = function() {
            var localUrl = window.location.href;
            var qrcode;
            
            $('.s-weixin,.solinkweixin, .sharelink-more-box .share-weixin').click(function(event) {
                // 清除上一次的二维码
                if (qrcode) {
                    qrcode.clear();
                }
                //创建二维码
                qrcode = new QRCode(document.getElementById("qrcode"), {
                    width: 158, //设置宽高
                    height: 158
                });

                qrcode.makeCode(localUrl);

                $('#popup-weixin-qrcode').fadeIn();
            });

            $('#popup-weixin-qrcode .close2').click(function(){
                $('#popup-weixin-qrcode').hide();
            })
        };

        var aptPop = function() {
            //预约弹窗
            ;(function() {

                function checkMobile(num) {
                    var myreg = /^1[3|4|5|7|8|9][0-9]\d{8,8}$/; //现在是7-11位手机号，如果要标准11位要{8,8}
                    if (!(myreg.test(num))) return false;
                    return true;
                }

                function checkEmail(str) {
                    var regex = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
                    if (regex.test(str)) return true;
                    return false;
                }


                $('.popdue .close').click(function() {
                    if ($(this).hasClass('back') == true) {
                        $('.popdue .content').show();
                        $('.due-success').hide();
                        $(this).removeClass('back');
                        // return;
                    }

                    $('.popdue').animate({ 'top': 1500 }, 600, function() {
                        $('.popdue').css('position', 'fixed');
                        $(".main").removeAttr("style");
                        $('#pub_footer').show();
                    });
                });
                // #duebtn2
                $('#orderbtn, #duebtn3').click(function() {
                    $('.popdue').animate({ 'top': 0 }, 600, function() {
                        // $('html, body').animate({ 'scrollTop': 0 }, 100, function() {
                        //     // $('.popdue').css('position','absolute');
                        //     // $(".device-list").mCustomScrollbar();
                        // });
                        // $('.main').css('height', '945px');
                        // $('.main').css('overflow', 'hidden');
                        // $('#pub_footer').hide();
                    });


                });

                $('.sys-btn').click(function() {
                    var index = $(this).index();
                    $(this).addClass('cur').siblings().removeClass('cur');
                    $('.sys-cont').eq(index).addClass('cur').siblings().removeClass('cur');
                });

                var isIE = !!window.ActiveXObject;
                var isIE6 = isIE && !window.XMLHttpRequest;
                var isIE7 = !!(!window.addEventListener && window.XMLHttpRequest && !document.querySelectorAll);
                var isIE8 = !!(!window.addEventListener && document.querySelectorAll);
                var isIE9 = navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/9./i) == "9."

                //  ie 8 -9  支持placeholder 属性
                function placeholder() {
                    var supportPlaceholder = 'placeholder' in document.createElement('input');
                    if (!supportPlaceholder) {
                        $("#ios-phone, #android-phone").val('请填写真实手机号').css('color', '#b3b3b3');
                        $("#ios-email").val("请填写您的常用邮箱").css('color', '#b3b3b3');
                    }
                }

                placeholder();
                if (isIE || isIE6 || isIE7 || isIE8 || isIE9) {
                    $("#ios-phone, #ios-email, #android-phone").focus(function() {
                        if ($(this).val() == '请填写真实手机号' || $(this).val() == '请填写您的常用邮箱') {
                            $(this).val('');
                            $(this).css('color', '');
                        }
                    });
                    $("#ios-phone, #ios-email, #android-phone").focusout(function() {
                        if (($(this).attr('id') == 'ios-phone' || $(this).attr('id') == 'android-phone') && $(this).val() == '') {
                            $(this).val('请填写真实手机号');
                        } else if ($(this).attr('id') == 'ios-email' && $(this).val() == '') {
                            $(this).val('请填写您的常用邮箱');
                        }
                    });
                }




                var system = 'ios',
                    iosphone, androidphone, phone, iosmail, androidmail, mail, iosmodel, model, source = window.location.origin;

                $('#device span,.ios-device-msg').on('click', function() {
                    $('.ios-device-msg').hide();
                    if ($('.device-list').hasClass('show')) {
                        $('.device-list').removeClass('show');
                    } else {
                        $('.device-list').addClass('show');
                    }
                });
                $('.device-list ul li').click(function() {
                    iosmodel = $(this).text().replace(' ', '');
                    var iosModelText = $(this).text();
                    $('#device span').html(iosModelText);
                    $('.device-list').removeClass('show');
                })

                // 当提示框被点击时，它下面的input会获得焦点
                $('.inputmsg').click(function() {
                    $(this).hide();
                    $(this).siblings('input').eq(0).trigger('focus');
                });



                $('#ios-phone').blur(function() {
                    iosphone = $(this).val();
                    if (iosphone == '') {
                        $(this).siblings().eq(0).html('请输入手机号');
                        $(this).siblings().eq(0).show();
                    }
                    if (!checkMobile(iosphone)) {
                        $(this).siblings().eq(0).html('请输入正确的手机号');
                        $(this).siblings().eq(0).show();
                    }
                });


                $('#ios-email').blur(function() {
                    iosmail = $(this).val();
                    if (!checkEmail(iosmail)) {
                        $(this).siblings('.inputmsg').eq(0).html('请输入正确的邮箱地址');
                        $(this).siblings('.inputmsg').eq(0).show();
                    }
                });



                $('.ios-due-now').click(function() {
                    system = 'ios';
                    model = iosmodel;

                    // if ($('#device span').html() == '请选择您的设备型号') {
                    //     $('.ios-device-msg').show();
                    //     $('.ios-device-msg').html('请选择您的设备型号');
                    //     return;
                    // }

                    if (checkMobile(iosphone) && checkEmail(iosmail) && iosmodel) {
                        $.ajax({
                            type: 'get',
                            url: '//gwactv2.woniu.com/order/Appointment',
                            dataType: 'jsonp',
                            jsonp: 'jsoncallback',
                            data: {
                                phone: iosphone,
                                mail: iosmail,
                                system: system,
                                model: iosmodel,
                                source: source
                            },
                            success: function(data) {
                                if (data.msgcode == 1) {
                                    $('.popdue .content').hide();
                                    $('.due-success').show();
                                    $('.popdue .close').addClass('back');
                                }else {
                                    alert(data.msg);
                                }
                            }
                        })
                    } else {
                        // consoleFunc(iosphone);
                        if (!checkMobile(iosphone) || !iosphone || iosphone == '') {
                            $('.ios-phone-msg').html('请输入正确的手机号');
                            $('.ios-phone-msg').show();
                        }
                        if (!checkEmail(iosmail) || !iosmail) {
                            $('.ios-email-msg').html('请输入正确的邮箱地址');
                            $('.ios-email-msg').show();
                        }
                        if (!iosmodel) {
                            $('.ios-device-msg').show();
                            $('.ios-device-msg').html('请选择您的设备型号');
                        }
                    }
                });
            })();
        };

        var init = function() {
            hideQQbox();
            aptPop();
            slideShare();
            navShare();
            qrcode();
        }

        return {
            init: init
        }

    })();

    common.init();
})