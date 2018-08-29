/**
 * some JavaScript code for this blog theme
 */
/* jshint asi:true */


/**
 * 菜单点击事件 
 */

(function() {
  if (window.innerWidth <= 770) {
    var menuBtn = document.querySelector('#headerMenu')
    var nav = document.querySelector('#headerNav')
    menuBtn.onclick = function(e) {
      e.stopPropagation()
      if (menuBtn.classList.contains('active')) {
        menuBtn.classList.remove('active')
        nav.classList.remove('nav-show')
      } else {
        nav.classList.add('nav-show')
        menuBtn.classList.add('active')
      }
    }
    
    document.querySelector('body').addEventListener('click', function() {
      nav.classList.remove('nav-show')
      menuBtn.classList.remove('active')
    })
  }
}());

//////////////////////////回到顶部和分享隐藏与显示////////////////////////////
(function() {
  var backToTop = document.querySelector('.back-to-top')
  var backToTopA = document.querySelector('.back-to-top a')
  var shareMenu = document.getElementById("share-menu");
 
  window.addEventListener('scroll', function() {

    // 页面顶部滚进去的距离
    var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop)
    
    if (scrollTop > 200) {
      backToTop.classList.add('back-to-top-show')
    } else {
      backToTop.classList.remove('back-to-top-show')
    }
    //判断是否到底部
    if( document.documentElement.scrollHeight - (document.documentElement.scrollTop + document.body.scrollTop)-document.documentElement.clientHeight <= 0){
      shareMenu.classList.remove('share-show')
    }else{
      shareMenu.classList.add('share-show')
    }
  })


}());

//////////////////////////hover on demo//////////////////////////////
(function() {
  var demoItems = document.querySelectorAll('.grid-item')
}());
