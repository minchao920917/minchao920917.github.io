(function(){

	 var delVal=50;
	 function autoMove(){
		 delVal++;
		 if(delVal>400){
			delVal=50; 
		 }

		 document.getElementById("mvBtn").style.left = delVal + "px";
	 }
	 setInterval(autoMove,8);
	 var deNum=0;
	 function autoTsq(){
		document.getElementsByClassName("mvSq")[0].style.color = "#F5FAFD";
		document.getElementsByClassName("mvSq")[1].style.color = "#F5FAFD";
		document.getElementsByClassName("mvSq")[2].style.color = "#F5FAFD";
		setTimeout(function(){
			document.getElementsByClassName("mvSq")[0].style.color = "#29B6FF";
		},0);
		setTimeout(function(){
			document.getElementsByClassName("mvSq")[1].style.color = "#29B6FF";
		},500);
		setTimeout(	function(){
			document.getElementsByClassName("mvSq")[2].style.color = "#29B6FF";
		},1000);
	 }


	 setInterval(autoTsq,1500);

 })()
 