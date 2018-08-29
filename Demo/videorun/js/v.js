    function play_video(obj,e) {
        e = e || window.event;
        if ($("#aboutkdVideo").length != 0) {
            $("#aboutkdVideo").remove();
        }

        var container = $('<div id="aboutkdVideo" class="video-container"></div>');
        var del = $('<span class="del-icon">&#10005</span>');
        var video_html = '<video controls autobuffer class="video-wrap">';
        var urls = $(obj).data("url").split("|");
        for (var i = 0; i < urls.length; i++) {
            if(urls[i]=="mp4"){
            video_html += '<source src="'+urls[i]+'">';
            }else{
            video_html += '<source src="'+urls[i]+'" type="video/'+urls[i].substring(urls[i].lastIndexOf(".")+1)+'">';
            }
        }
        video_html += '</video>';
        var video = $(video_html);
        video[0].volume = 0.3;
        var mask = $('<div class="video-mask">');
        var loading = $('<div class="video-loading">');
        var isWeixin = is_weixin();
        if (!isWeixin) {
            mask.append(loading);
        }
        // 资源加载完成
        video.on("loadeddata", function(){
            if (!isWeixin) mask.hide();
            this.play();
        });

        // 点击播放 或 停止
        video.on("click", function(){
        if (this.paused) {
        this.play();
        } else {
        this.pause();
        }
        });

        // 播放完推出全屏
        video.on("ended", function(){
            exitFullscreen();
        });

        // 当视频由于需要缓冲下一帧而停止
        video.on("waiting", function(){
           if (!isWeixin) mask.show();
        });

        // 当音频/视频在已因缓冲而暂停或停止后已就绪时
        video.on("playing", function(){
           if (!isWeixin) mask.hide();
        });

        // 点击关闭按钮
        del.on("click", function(){
        
            if (isPC()) {
                container.remove();
            } else {
                $("#video_wrap").remove();
            }
        });
        //container.append('<div class="video-title">'+$(obj).prop("title")+'</div>');
        container.append(video);
        container.append(del);
        if (!isWeixin) container.append(mask);
        if (isPC()) {
            $("body").append(container);
        } else {
            $("body").append($('<div id="video_wrap" style="position:fixed;top:0;left:0;bottom:0;right:0;background-color:#000;"></div>').append(container));
        }
    }

    function is_weixin(){
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
            return true;
        } else {
            return false;
        }
    }
    // 退出全屏
    function exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.oRequestFullscreen){
            document.oCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
    function isPC() {
    var userAgentInfo = navigator.userAgent,
        Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"],
        flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
        return flag;
    }