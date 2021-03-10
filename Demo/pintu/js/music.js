var musicTime;
//---------背景音乐开关----------
function triggerBgMusic(e){
    if(!sessionStorage.bgmusic||sessionStorage.bgmusic=='play'){
        playBgMusic(false);
    }else{
        playBgMusic(true);
    }
}
//---------音乐播放和暂停----------
function playBgMusic(val){
    if(val){
        audio.play();
        sessionStorage.bgmusic='play';
        // console.log('正在播放')
    }else{
        audio.pause();
        sessionStorage.bgmusic='pause';
        // console.log('停止播放了')
    }
}
function initMusic(){
	var audio = document.getElementById('audio');
    if(sessionStorage.bgmusic=='pause'){
        playBgMusic(true);
    }else{
        playBgMusic(true);
         //----------处理自动播放------------
        //--创建页面监听，等待微信端页面加载完毕 触发音频播放
        document.addEventListener('DOMContentLoaded', function () {
            function audioAutoPlay() {
                playBgMusic(true);
                document.addEventListener("WeixinJSBridgeReady", function () {
                    playBgMusic(true);
                }, false);
            }
            audioAutoPlay();
        });
        //--创建触摸监听，当浏览器打开页面时，触摸屏幕触发事件，进行音频播放
        function audioAutoPlay() {
            playBgMusic(true);
            document.removeEventListener('touchstart',audioAutoPlay);
        }
        document.addEventListener('touchstart', audioAutoPlay);
    }
    //----------处理页面激活------------
    var hiddenProperty = 'hidden' in document ? 'hidden' :    
    'webkitHidden' in document ? 'webkitHidden' :    
    'mozHidden' in document ? 'mozHidden' :    
    null;
    var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
    var onVisibilityChange = function(){
        if (!document[hiddenProperty]) {    
            if(!sessionStorage.bgmusic||sessionStorage.bgmusic=='play'){
                audio.play();
            }
        }else{
            audio.pause();
        }
    }
    document.addEventListener(visibilityChangeEvent, onVisibilityChange);
	$('#music').on('click',function(){

        console.log(111)
		if($(this).hasClass('play')){
			$(this).removeClass('play');
			clearInterval(musicTime);
            playBgMusic(false);
		}else{
			$(this).addClass('play');
			musicTime=setInterval(begin,10);
			playBgMusic(true);
		}
	})	
}

// 音乐按钮有旋转效果
var rot=0;
function begin(time){
	if(rot==360){
		rot=0;
	}
    document.getElementById("music").style.transform="rotatez("+rot+"deg)";
    rot+=1;
}