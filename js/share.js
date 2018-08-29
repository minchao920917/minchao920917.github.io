(function() {
	var toggle = document.getElementById("ss_toggle");
	var menu = document.getElementById("ss_menu");
	var rot;
	toggle.onclick = function () {
		rot = parseInt(toggle.getAttribute("data")) - 180;
		// console.log(rot);
		menu.style.transition="-webkit-transform 500ms ease-out";
		menu.style.webkitTransform="rotate(" + rot + "deg)";
		if (rot / 180 % 2 == 0) {
			toggle.parentNode.setAttribute('class','menu ss_active');
			toggle.setAttribute('class','share close');
		} else {
			toggle.parentNode.setAttribute('class','menu');//移除
			toggle.setAttribute('class','share');//移除close
		}
		toggle.setAttribute('data', rot);
	}
}())