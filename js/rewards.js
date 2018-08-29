(function(){
	var show = false;
	var myRewards = document.getElementById("btn-myRewards");
	var alipay = document.getElementById("alipay");
	var weixin = document.getElementById("weixin");
	myRewards.onclick=  function(){
		// alert("展示");
		if(show){
			document.getElementById("myRewards").style.width="0px";
			show = false;
		}else{
			document.getElementById("myRewards").style.width="240px";
			show = true;
		}	
	};
	alipay.onclick = function(){
		// alert("alipay");
		document.getElementById("alishow").style.display = "inline-block";
		document.getElementById("weixinshow").style.display = "none";
	};
	weixin.onclick = function(){
		// alert("weixin");
		document.getElementById("alishow").style.display = "none";
		document.getElementById("weixinshow").style.display = "inline-block";
	}
}())