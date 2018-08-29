$(function(){
    var page = (function(){

        //初始计时器
        var initCountDown = function(){

		     $(".digits").countdown({

		      image: "./images/digits.png",

		      format: "dd:hh:mm:ss",
				
			  digitWidth: 36,
    
    		  digitHeight: 52,
		      
		      // startTime: formatRemainTime("2018/08/23 19:30:00")

		      startTime: "01:30:00"
    		});
        }
        
        /**
		 * 
		 * @desc   格式化现在距${endTime}的剩余时间
		 * @param  {Date} endTime  
		 * @return {String}
		 */
		function formatRemainTime(endTime) {
		    var startDate = new Date(); //开始时间
		    var endDate = new Date(endTime); //结束时间
		    var t = endDate.getTime() - startDate.getTime(); //时间差
		    var d = 0,
		        h = 0,
		        m = 0,
		        s = 0;
		    if (t >= 0) {
		        d = Math.floor(t / 1000 / 3600 / 24);
		        h = Math.floor(t / 1000 / 60 / 60 % 24) + d*24;
		        m = Math.floor(t / 1000 / 60 % 60);
		        s = Math.floor(t / 1000 % 60);
		    }
		    if(h<10){
		    	h ="0"+h;
		    }
		    if(m<10){
		    	m ="0"+m;
		    }
		    if(s<10){
		    	s ="0"+s;
		    }
		    return h + ":" + m + ":" + s;
		}
        //初始化函数
        var init = function(){
            initCountDown();//初始计时器
            
        };

        return{
            init: init
        }
    })();

    page.init();
})