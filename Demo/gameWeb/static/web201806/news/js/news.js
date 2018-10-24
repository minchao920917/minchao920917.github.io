$(function(){
	var sTop= $(window).scrollTop();
	$(window).scroll(function(){
		sTop=$(window).scrollTop();
		if(sTop>430){
			$('.scrolltop').removeClass('none').addClass('show');
		}
		if(sTop<430){
			$('.scrolltop').addClass('none').removeClass('show')
		}
	});
	$('.scrolltop').click(function(){
		$("html,body").animate({scrollTop:0}, 500);
	});
	// $('.swtag').hover(function(){
	// 	var index=$(this).index();
	// 	$(this).addClass('cur').siblings().removeClass('cur');
	// 	$('.l-one-box').eq(index).addClass('cur').siblings().removeClass('cur')
	// });
	$(window).scroll(function(){
		sTop=$(window).scrollTop();
		if(sTop>399){
			$('.flmenu').addClass('drop');
		}
		if(sTop<399){
			$('.flmenu').removeClass('drop');
		}
	});
	$('.flnav .navlinksocial,.fldropdown').mouseenter(function(){
		$('.fldropdown').addClass("show");
	});
	$('.flnav .navlinksocial,.fldropdown').mouseleave(function(){
		$('.fldropdown').removeClass("show");

	});

    $(window).resize(function(){
        hideitem();
    });
    hideitem();
    function hideitem(){
        var winWidth;
        if (window.innerWidth)  {
            winWidth = window.innerWidth;
        }
        else if ((document.body) && (document.body.clientWidth)) {
            winWidth = document.body.clientWidth;
        }
        // console.log(winWidth);
        if(winWidth<1280){
            $('.flmenucont .flsocial').hide();
        }
        if(winWidth>1280){
            $('.flmenucont .flsocial').show();
        }
    }

    //弹框
    $('.duebtn-btm').click(function () {
        $('#preBox').fadeIn();
    });
});

