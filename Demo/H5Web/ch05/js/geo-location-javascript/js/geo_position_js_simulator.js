/*!
 * geo-location-javascript v0.4.1  Simulator
 * http://code.google.com/p/geo-location-javascript/
 *
 * Copyright (c) 2009 Stan Wiechers
 * Licensed under the MIT licenses.
 *
 * Revision: $Rev: 62 $: 
 * Author: $Author: whoisstan $:
 * Date: $Date: 2009-12-17 15:46:49 -0500 (Thu, 17 Dec 2009) $:    
 */
var geo_position_js_simulator=function(){

	var pub = {};
	var current_pos=null;
	pub.init = function(array)
	{
		var next=0;
		for (i in array)
		{
				if(i==0)
				{
					current_pos=array[i];
				}
				else
				{
					setTimeout((function(pos) { 
					      return function() { 
					        current_pos=pos; 									
					      } 
					    })(array[i]),next);
				}
				next+=array[i].duration;							
		}
	}

	pub.getCurrentPosition = function(locationCallback,errorCallback)
	{
		locationCallback(current_pos);
	}
	return pub;
}();