
function isIE(){
	if (window.navigator.userAgent.indexOf("MSIE")>=1) 
	return true; 
	else
	return false; 
}

$(function() {
	
		var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();
		
		$('#fullCalendar').fullCalendar({
			//头部信息
			header: {
				left: '',
				center: 'prev,title,next',
				right: ''
			},
			defaultView: 'agendaWeek',
			firstDay:0,//默认值0.  一周中显示的第一天是哪天. 星期天是0, 星期一是1
			editable: false,//默认值false,设置日历中的日程是否可以编辑.  可编辑是指可以移动, 改变大小等.
			selectable:true,//允许用户通过单击或拖动选择日历中的对象，包括天和时间。
			selectHelper:true,
			select:function( start, end, jsEvent, view ){  
	            console.log(start);
	            console.log(end);
	            console.log(jsEvent);
	            console.log(view);
	            alert('时间区间是:'+start.Format("yyyy-MM-dd hh:mm:ss")+"至"+end.Format("yyyy-MM-dd hh:mm:ss") );
	         },
	         titleFormat:{
	         	week: "yyyy年MMMM月d日{'&#8212;'yyyy年MMMM月d日}"
	         },
			eventMouseover:function( event, jsEvent, view ) {
					console.log(event);
					console.log(jsEvent);
					console.log(view);

			 },
			 timeFormat:{
            	agenda: 'H:mm{ - H:mm}',
				'':'H:mm'
            },//设置显示的日程事件的时间格式，如timeFormat: 'H:mm' 则显示24小时制的像10:30
            allDaySlot:false,
            slotEventOverlap:false,
			slotMinutes:15,// 表示在agenda的views中, 两个时间之间的间隔.
			axisFormat: 'H:mm',
		    events: function(start, end, callback) {
		        $.ajax({
		            url: 'js/ceshi.json',
		            dataType: 'json',
		            data: {
		                start: start,
		                end: end
		            },
		            success: function(data) {

		                var events = [];
		           
			                data.events.forEach(function(e){
			                	
	 							events.push({
			                        title: e.title,
			                        start: new Date(e.start.replace("-","/").replace("-","/")), // will be parsed
				                    end: new Date(e.end.replace("-","/").replace("-","/")), // will be parsed,
				                    allDay:e.allDay
			                    });
			                })
		            	
		                callback(events);
		            }
		        });
		    },
		    eventClick: function(calEvent, jsEvent, view) {
 					console.log(calEvent);
			        // alert('Event: ' + calEvent);
			        // alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
			        // alert('View: ' + view.name);
			 
			        // $(this).css('border-color', 'red');
			        // $(this).css('background-color', 'red');
			    }
		});
		
	});