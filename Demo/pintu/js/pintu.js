//计时函数
var playTime;
var sec = 0;
var baifenbi;
function timer() {
  var startjindu = $(".pintu .timebox .jindu").innerWidth();
  var endjindu = $(".pintu .timebox").innerWidth();
  var alljindu = endjindu - startjindu;
  sec++;
  if (sec < 10) {
    sec = "00" + sec;
  } else if (sec < 100) {
    sec = "0" + sec;
  }
  // if (sec >= 120) {
  //   clearInterval(playTime);
  //   var time = 121;
  //   $.ajax({
  //     type: "POST",
  //     url: "https://chncpah5.nicelab.cn/public/index.php",
  //     data: {
  //       times: time,
  //     },
  //     dataType: "json",
  //     success: function (data) {
  //       console.log(data);
  //       if (data.code == "200") {
  //         baifenbi = data.baifenbi;
  //       }
  //     },
  //   });
  // setTimeout(function () {
  //   $(".pintu .timebox .heliu").removeClass("play");
  //   $(".pop.fail").fadeIn();
  // }, 1000);
  // }
  $(".pintu .timebox .jindu").animate(
    { left: Math.floor((alljindu / 120) * Number(sec)) + "px" },
    1000
  );
  $(".pintu .timing").text(sec);
}
function initPintu() {
  var picbox = document.getElementById("picbox");
  var pic = document.querySelectorAll(".pic");
  var picWidth = pic[0].offsetWidth;
  var picHeight = pic[0].offsetHeight;
  var picboxWidth = picbox.offsetWidth;
  var picboxHeight = picbox.offsetHeight;
  var go = document.getElementById("go");
  var startjindu = $(".pintu .timebox .jindu").innerWidth();
  var endjindu = $(".pintu .timebox").innerWidth();
  var alljindu = endjindu - startjindu;
  // console.log(startjindu,endjindu,alljindu)
  playTime = setInterval(timer, 1000);
  $(".pintu .content .line").fadeIn(0);
  $(".pic").fadeIn(0, function () {
    $("#picbox").css("background-image", "none");
  });
  for (var i = 0; i < 20; i++) {
    //随机打乱
    var a = Math.floor(Math.random() * 9);
    var b = Math.floor(Math.random() * 9);
    if (a != b) {
      random(a, b);
    }
  }

  function random(a, b) {
    //随机打乱函数，其中交换部分，可以提取出来封装
    var aEle = pic[a];
    var bEle = pic[b];
    var _left;
    _left = aEle.style.left;
    aEle.style.left = bEle.style.left;
    bEle.style.left = _left;
    var _top;
    _top = aEle.style.top;
    aEle.style.top = bEle.style.top;
    bEle.style.top = _top;
    var _index;
    _index = aEle.getAttribute("data-index");
    aEle.setAttribute("data-index", bEle.getAttribute("data-index"));
    bEle.setAttribute("data-index", _index);
  }
}
var oneIndex, twoIndex, oneData, twoData;
$(".pic").on("click", function () {
  if ($(this).hasClass("one")) {
    // console.log(1)
    $(".pic").removeClass("one");
    oneIndex = $(this).index();
    oneData = $(this).attr("data-index");
    $(this).find("i").fadeIn(100);
  } else {
    // console.log(2)
    twoIndex = $(this).index();
    twoData = $(this).attr("data-index");
    $(".pic").eq(oneIndex).css("zIndex", "100");
    $(".pic")
      .eq(oneIndex)
      .css(
        {
          left: $(".pic").eq(twoIndex).css("left"),
          top: $(".pic").eq(twoIndex).css("top"),
        },
        500
      );
    $(".pic").eq(oneIndex).attr("data-index", twoData);
    $(".pic").eq(twoIndex).css("zIndex", "1");
    $(".pic")
      .eq(twoIndex)
      .css(
        {
          left: $(".pic").eq(oneIndex).css("left"),
          top: $(".pic").eq(oneIndex).css("top"),
          zIndex: "1",
        },
        500
      );
    $(".pic").eq(twoIndex).attr("data-index", oneData);

    if (isSuccess()) {
      var time = Number(sec);
      clearInterval(playTime);


        // var str = '<img id="scream" src="images/success.png">';
        // $(".pop.erweima .cover .img").html(str);
        // $(".pop.erweima .cover .tit .time").text(Number(sec));
        // $(".pop.erweima .cover .tit .baifenbi").text(baifenbi + "%");
        setTimeout(function () {
          $(".pop.erweima").fadeIn(function () {
            var c = document.getElementById("myCanvas");
            var ctx = c.getContext("2d");
            var img = new Image();
            img.crossOrigin = "anonymous";
            img.src = 'http://minchao.me/pingtu/images/success.png'
            img.onload = function () {
              if (Number(sec) < 10) {
         
                  ctx.drawImage(img, 0, 0, 616, 976);
                  ctx.font = "15px Arial";
                  ctx.textAlign = "left";
                  ctx.fillStyle = "#173b85";
                  ctx.font = "34px Arial";
                  ctx.fillText("用时", 78, 884);
                  ctx.fillText("秒，超过", 184, 884);
                  ctx.fillText("的小伙伴", 415, 884);
                  ctx.font = "50px Arial";
                  ctx.textAlign = "center";
                  ctx.fillText(Number(sec), 166, 886);
                  ctx.fillText("90" + "%", 369, 886);
                
              } else if (Number(sec) < 20) {
            
                  ctx.drawImage(img, 0, 0, 616, 976);
                  ctx.font = "15px Arial";
                  ctx.textAlign = "left";
                  ctx.fillStyle = "#173b85";
                  ctx.font = "34px Arial";
                  ctx.fillText("用时", 64, 884);
                  ctx.fillText("秒，超过", 200, 884);
                  ctx.fillText("的小伙伴", 428, 884);
                  ctx.font = "50px Arial";
                  ctx.textAlign = "center";
                  ctx.fillText(Number(sec), 166, 886);
                  ctx.fillText("50" + "%", 388, 886);
                
              } else {
           
                  ctx.drawImage(img, 0, 0, 616, 976);
                  ctx.font = "15px Arial";
                  ctx.textAlign = "left";
                  ctx.fillStyle = "#173b85";
                  ctx.font = "34px Arial";
                  ctx.fillText("用时", 50, 884);
                  ctx.fillText("秒，超过", 212, 884);
                  ctx.fillText("的小伙伴", 445, 884);
                  ctx.font = "50px Arial";
                  ctx.textAlign = "center";
                  ctx.fillText(Number(sec), 164, 886);
                  ctx.fillText('40' + "%", 395, 886);
                
              }
              var image = new Image();
              image.src = c.toDataURL("image/png");
              console.log("image",image)
              // $("#cover").html(image);
              var imgstr = '<img id="theImg" src="'+c.toDataURL("image/png")+'" />'
              $('#cover').prepend(imgstr);
            };
          });
        }, 50);
      
    }

    $(".pic").css("zIndex", "10");
    $(".pic").addClass("one");
    $(".pic i").fadeOut(0);
  }
});
function isSuccess() {
  //判断成功标准
  var str = "";
  for (var i = 0; i < $(".pic").length; i++) {
    str += $(".pic").eq(i).attr("data-index");
  }
  if (str == "123456789") {
    return true;
  }
  return false;
}
function pintuhuifu(a, b) {
  //随机打乱函数，其中交换部分，可以提取出来封装
  $(".pintu .timing").text("000");
  sec = 0;
  $(".pintu .timebox .jindu").css("left", 0);
  $(".pintu .content .pic").addClass("one");
  $(".pintu .content .pic i").fadeOut(0);
  $(".pintu .content .pic").fadeOut(0);
  $(".pintu .content .line").fadeOut(0);
  $("#picbox").css(
    "background-image",
    "url(images/pintu/pintu-img" + choose + ".jpg)"
  );
}
