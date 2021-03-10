var choose;
$(function(){
	$('.page.index .btn').on('click',function(){
		$('.page.index').fadeOut(0)
		$('#header .logo').css('display','block')
		$('.pop').fadeOut(0)
		choose=0
		$('.page.choose').fadeOut(0);
		$('#picbox').css('background-image','url(images/pintu/pintu-img'+choose+'.jpg)')
		for(var i in $('.pic')){
			var n=i;
			$('.pic').eq(i).css('background-image','url(images/pintu/pintu-img'+choose+'-'+n+'.jpg)')
		}
		$('.page.pintu').fadeIn();
		$('.pop.tips').fadeIn()
	})
	// $('.pop.choosetip .close').on('click',function(){
	// 	$('.pop').fadeOut(0)
	// })


	$('.page.choose .gallery-top .swiper-slide').on('click',function(){
		$('#header .logo').css('display','block')
		if($(this).hasClass('disabled')){
			return false;
		}else{
			choose=$('.gallery-top .swiper-slide-active').index()
			$('.page.choose').fadeOut(0);
			$('#picbox').css('background-image','url(images/pintu/pintu-img'+choose+'.jpg)')
			for(var i in $('.pic')){
				var n=i;
				$('.pic').eq(i).css('background-image','url(images/pintu/pintu-img'+choose+'-'+n+'.jpg)')
			}
			$('.page.pintu').fadeIn();
			$('.pop.tips').fadeIn()
			var str='<div class="img"><img src="images/erweima-bg'+choose+'.png"></div>\
                    <div class="tit">用时<span class="time">11</span>秒，超过<span class="baifenbi">60%</span>的小伙伴</div>'
            $('.pop.erweima .content .cover').html(str)
			
		}
	})
	$('.pop.tips').on('click',function(){
		$('.pop').fadeOut(0)
		$('.pop.timeout .wrap .times .txt div').fadeOut(0)
		$('.pop.timeout .wrap .times .txt div').eq(0).fadeIn(0)
		$('.pop.timeout').fadeIn(function(){
			var start=0;
			var prev;
			var time=setInterval(function(){
				start++;
				prev=Number(start-1);
				if(start>=3){
					$('.pop.timeout').fadeOut(function(){
						setTimeout(function(){
							initPintu()
							$('.pintu .timebox .heliu').addClass('play')
						},2000)
						clearInterval(time)
					})
				}else{
					$('.pop.timeout .wrap .times .txt div').eq(prev).fadeOut(0)
					$('.pop.timeout .wrap .times .txt div').eq(start).fadeIn()
				}
				
			},1000)
		})

	})
	// $('.pop.tips .close').on('click',function(){
	// 	$('.pop').fadeOut(0)
	// 	$('.pop.timeout .wrap .times .txt div').fadeOut(0)
	// 	$('.pop.timeout .wrap .times .txt div').eq(0).fadeIn(0)
	// 	$('.pop.timeout').fadeIn(function(){
	// 		var start=0;
	// 		var prev;
	// 		var time=setInterval(function(){
	// 			start++;
	// 			prev=Number(start-1);
	// 			if(start>=3){
	// 				$('.pop.timeout').fadeOut(function(){
	// 					setTimeout(function(){
	// 						initPintu()
	// 						$('.pintu .timebox .heliu').addClass('play')
	// 					},2000)
	// 					clearInterval(time)
	// 				})
	// 			}else{
	// 				$('.pop.timeout .wrap .times .txt div').eq(prev).fadeOut(0)
	// 				$('.pop.timeout .wrap .times .txt div').eq(start).fadeIn()
	// 			}
				
	// 		},1000)
	// 	})

	// })
	// $('.pop.done .btn').on('click',function(){
	// 	// var shipinidIndex=Math.floor(Math.random()*16);
	// 	var shipinidIndex=Math.floor(Math.random()*2)+1;
	// 	if(shipinidIndex==1){
	// 		shipinidIndex=11;
	// 	}else if(shipinidIndex==2){
	// 		shipinidIndex=15;
	// 	}else{
	// 		shipinidIndex=15;
	// 	}
	// 	console.log(shipinidIndex)
	// 	console.log(shipinid[shipinidIndex])
	// 	var str='<video controls id="vid" preload="auto" webkit-playsinline="true" playsinline="" x5-playsinline><source src="media/video'+shipinidIndex+'.mp4" type="video/mp4"></video>'
	// 	$('.shipin .video').html(str);
	// 	$('.pop.done').fadeOut(0)
	// 	$('.page.pintu').fadeOut(0);
	// 	// $('.page.index').fadeOut(0);
	// 	$('#header .logo').css('display','none')
	// 	$('.page.shipin').fadeIn();
	// 	var flag;
	// 	$('#vid').get(0).play();
	//     if($('#music').hasClass('play')){
	//         flag=true;
	//     }else{
	//         flag=false;
	//     }
	//     // 视频播放时暂停背景音乐
	//     var vid = document.getElementById("vid");
	//     if(vid){
	//         vid.ontimeupdate = function() {
	//             if(!vid.paused){
	//                 playBgMusic(false);
	//                 clearInterval(musicTime);
	//                 $('#music').removeClass('play');
	//             }else{
	//                 if(flag){
	//                     playBgMusic(true);
	//                     musicTime=setInterval(begin,10);
	//                     $('#music').addClass('play');
	//                 }
	//             }
	//         };

	//     }
	// })
	// $('.page.shipin .again').on('click',function(){
	// 	$('.page.shipin').fadeOut(0);
	// 	$('.page.index').fadeIn();
	// 	$('#vid').get(0).pause();
	// 	pintuhuifu()
	// })
	// $('.page.shipin .share').on('click',function(){
	// 	$('#vid').get(0).pause();
	// 	$('#vid').fadeOut(0)
	// 	$('.pop.share').fadeIn();
	// })
	$('.pop.erweima .content .btn').on('click',function(){
		return;
		
	})
	$('.pop.erweima .content .again').on('click',function(){
	
		$('.page.index').fadeOut(0)
		$('.pop').fadeOut(0)
		choose=0
		sec = 0;
		$('.page.choose').fadeOut(0);
		$('#picbox').css('background-image','url(images/pintu/pintu-img'+choose+'.jpg)')
		for(var i in $('.pic')){
		  var n=i;
		  $('.pic').eq(i).css('background-image','url(images/pintu/pintu-img'+choose+'-'+n+'.jpg)')
		}
		$('.page.pintu').fadeIn();
		$('.pop.tips').fadeIn()
		
		

		console.log(123);
	})
	$('.jingxi .again').on('click',function(){
		$('.page.jingxi').fadeOut(0);
		pintuhuifu();
		$('.page.choose').fadeIn();
	})
	$('.pop.share').on('click',function(){
		$('#vid').fadeIn(0)
		$('.pop.share').fadeOut(0);
		$('.pop.fail').fadeIn();
	})
	$('.pop.fail .share').on('click',function(){
		$('.pop').fadeOut(0);
		$('.pop.share').fadeIn();
	})
	$('.pop.fail .again').on('click',function(){
		$('.pop').fadeOut(0);
		pintuhuifu();
		$('.page.choose').fadeIn();
		// pintuhuifu()
		// $('.pop').fadeOut(0)
		// $('.pop.timeout .wrap .times .txt div').fadeOut(0)
		// $('.pop.timeout .wrap .times .txt div').eq(0).fadeIn(0)
		// $('.pop.timeout').fadeIn(function(){
		// 	var start=0;
		// 	var prev;
		// 	var time=setInterval(function(){
		// 		start++;
		// 		prev=Number(start-1);
		// 		if(start>=3){
		// 			$('.pop.timeout').fadeOut(function(){
		// 				setTimeout(function(){
		// 					initPintu()
		// 					$('.pintu .timebox .heliu').addClass('play')
		// 				},2000)
		// 				clearInterval(time)
		// 			})
		// 		}else{
		// 			$('.pop.timeout .wrap .times .txt div').eq(prev).fadeOut(0)
		// 			$('.pop.timeout .wrap .times .txt div').eq(start).fadeIn()
		// 		}
				
		// 	},1000)
		// })
	})
	var flag;
	$('.jingxi .jingxibox .videoimg').on('click',function(){
		var index=$('.jingxi .jingxibox .swiper-slide-active').index();
		if($('#music').hasClass('play')){
			playBgMusic(false);
	        clearInterval(musicTime);
	        $('#music').removeClass('play');
	        flag=true;
	    }else{
	        flag=false;
	    }
	    var str='<video controls id="vid" preload="auto" webkit-playsinline="true" playsinline="" x5-playsinline>\
	    			<source src="media/video'+index+'.mp4" type="video/mp4">\
	    		</video>'
	    $('.pop.shipin .video').html(str);		
		// 视频播放时暂停背景音乐
	    var vid = document.getElementById("vid");
		$('.pop.shipin').fadeIn(function(){
			$('#vid').get(0).play();
		})
	})
	$('.jingxi .jingxibox .buy .btn1').on('click',function(){
		if($('#music').hasClass('play')){
			playBgMusic(false);
	        clearInterval(musicTime);
	        $('#music').removeClass('play');
	        flag=true;
	    }else{
	        flag=false;
	    }
	    var str='<video controls id="vid" preload="auto" webkit-playsinline="true" playsinline="" x5-playsinline>\
	    			<source src="media/video0.mp4" type="video/mp4">\
	    		</video>'
	    $('.pop.shipin .video').html(str);		
		// 视频播放时暂停背景音乐
	    var vid = document.getElementById("vid");
		$('.pop.shipin').fadeIn(function(){
			$('#vid').get(0).play();
		})
	})
	$('.jingxi .jingxibox .buy .btn2').on('click',function(){
		if($('#music').hasClass('play')){
			playBgMusic(false);
	        clearInterval(musicTime);
	        $('#music').removeClass('play');
	        flag=true;
	    }else{
	        flag=false;
	    }
	    var str='<video controls id="vid" preload="auto" webkit-playsinline="true" playsinline="" x5-playsinline>\
	    			<source src="media/video1.mp4" type="video/mp4">\
	    		</video>'
	    $('.pop.shipin .video').html(str);		
		// 视频播放时暂停背景音乐
	    var vid = document.getElementById("vid");
		$('.pop.shipin').fadeIn(function(){
			$('#vid').get(0).play();
		})
	})

	$('.pop.shipin .close').on('click',function(){
		$('#vid').get(0).pause();
		$('.pop.shipin').fadeOut()
		if(flag){
            playBgMusic(true);
            musicTime=setInterval(begin,10);
            $('#music').addClass('play');
        }
	})
})