/* jshint asi:true */
//先等图片都加载完成
//再执行布局函数

/**
 * 执行主函数
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
(function() {

  /**
     * 内容JSON
     */
  var demoContent = [
    {
      demo_link: '../Demo/navbar/navbar.html',
      img_link: '../img/demoImg/navbar/navbar.png',
      code_link: 'https://github.com/minchao920917/Dome/tree/master/navbar',
      title: '一个简单的常用企业网站导航栏',
      core_tech: 'bootstrap,navbar',
      description: '常用公司官网的导航栏，兼容手机端'
    }, {
      demo_link: '../Demo/myModal/index.html',
      img_link: '../img/demoImg/myModal/modal.jpg',
      code_link: 'https://github.com/minchao920917/Dome/tree/master/myModal',
      title: '一个简单的模态框',
      core_tech: 'js、css、html',
      description: '纯手写模态框'
    }, 
    {
      demo_link: '../Demo/loading/index.html',
      img_link: 'https://ooo.0o0.ooo/2017/05/26/5927a823b94b2.jpg',
      code_link: 'https://github.com/minchao920917/Dome/tree/master/loading',
      title: '十一个loading特效集合',
      core_tech: 'js、css、html',
      description: '纯手写的loading动画'
    },
      {
          demo_link: '../Demo/scorlly/index.html',
          img_link: 'https://ooo.0o0.ooo/2017/06/21/594a183bc9b0d.png',
          code_link: 'https://github.com/minchao920917/Dome/tree/master/scorlly',
          title: '一划一页',
          core_tech: 'js、css、html',
          description: '鼠标滚动事件，页面自动上下滚动一屏幕'
      },
      {
          demo_link: '../Demo/explode/index.html',
          img_link: 'https://ooo.0o0.ooo/2017/06/21/594a2803d660a.png',
          code_link: 'https://github.com/minchao920917/Dome/tree/master/explode',
          title: '基于jquery的点击爆炸事件',
          core_tech: 'js、css、html',
          description: '点击爆炸事件，可控制分块数量'
      },
          {
              demo_link: '../Demo/tabLabel/index.html',
                  img_link: 'https://ooo.0o0.ooo/2017/06/23/594cd3ef50634.png',
              code_link: 'https://github.com/minchao920917/Dome/tree/master/tabLabel',
              title: 'css和js的tabl分栏',
              core_tech: 'js、css、html',
              description: '可以tab分栏，并兼容手机端'
          },
          {
              demo_link: '../Demo/videorun/index.html',
                  img_link: 'https://ooo.0o0.ooo/2017/06/23/594cd48973b40.png',
              code_link: 'https://github.com/minchao920917/Dome/tree/master/videorun',
              title: '视频播放',
              core_tech: 'js、css、html',
              description: '视频播放，兼容手机端，数据源放7牛网上'
          },
          {
              demo_link: '../Demo/svgAnimate/index.html',
                  img_link: 'https://ooo.0o0.ooo/2017/06/23/594cd4ffee171.png',
              code_link: 'https://github.com/minchao920917/Dome/tree/master/svgAnimate',
              title: 'svg动画',
              core_tech: 'js、css、html',
              description: '由css控制svg中的元素的动画'
          },
          {
              demo_link: '../Demo/H5Web/index.html',
              img_link: 'https://i.loli.net/2018/01/15/5a5c48dfd09af.png',
              code_link: 'https://github.com/minchao920917/Dome/tree/master/H5Web',
              title: '《HTML5移动Web开发实战》',
              core_tech: 'js、css、html',
              description: 'HTML5与移动网站，介绍HTML5和移动网站的基本概念和学习'
          },
         {
             demo_link: '../Demo/vue/index.html',
             img_link: 'https://ooo.0o0.ooo/2017/06/30/5955f276ed1c6.png',
             code_link: 'https://github.com/minchao920917/Dome/tree/master/vue',
             title: 'vuejs例子Demo',
             core_tech: 'vuejs、css、html',
             description: 'vue公司培训的Demo'
         },
        {
          demo_link: '../Demo/form/index.html',
          img_link: 'https://i.loli.net/2017/08/15/5992620778455.png',
          code_link: 'https://github.com/minchao920917/Dome/tree/master/form',
          title: '动态表单',
          core_tech: 'bootstrap、css、html',
          description: '基于bootstrap的动态表单，可添加，可减少的可，兼容手机端'
         },
          {
              demo_link: '../Demo/oldHomePage/index.html',
              img_link: 'https://i.loli.net/2017/08/22/599bc0d9dfd1d.png',
              code_link: 'https://github.com/minchao920917/Dome/tree/master/oldHomePage',
              title: '个人主页(old老的样本)',
              core_tech: 'bootstrap、css、html',
              description: '个人主页，未改版之前的版本'
          },
          {
              demo_link: '../Demo/2048/demo.html',
              img_link: 'https://i.loli.net/2017/08/24/599e3a014d1ae.png',
              code_link: 'https://github.com/minchao920917/Dome/tree/master/2048',
              title: '2048小游戏',
              core_tech: 'JavaScript、css、html',
              description: '2048小游戏，兼容手机端'
          },
          {
              demo_link: 'https://github.com/minchao920917/FAST',
              img_link: 'https://i.loli.net/2017/09/07/59b0bc6b8265c.jpg',
              code_link: 'https://github.com/minchao920917/FAST',
              title: 'FAST系统',
              core_tech: '手机端app页面合集',
              description: '该系统是自己模仿手机app写的，包括新闻列表、日期、FAQ、会议管理、预定页面，设置，个人中心等模块过程，只是用于练习，方便将来能快速开发。'
          },
           {
               demo_link: '../Demo/fullcalendar/index.html',
               img_link: 'https://i.loli.net/2017/12/28/5a44b1de59f65.png',
               code_link: 'https://github.com/minchao920917/Dome/tree/master/fullcalendar',
               title: 'fullcalendar插件例子',
               core_tech: 'javscript、css、html',
               description: 'fullcalendar的插件调用，纯手写周选择器，确定调用js'
           },
          {
              demo_link: 'https://github.com/minchao920917/Dome/tree/master/test_mysql',
              img_link: 'https://i.loli.net/2018/01/17/5a5ea8018379e.png',
              code_link: 'https://github.com/minchao920917/Dome/tree/master/test_mysql',
              title: 'node+express+mysql增删改查',
              core_tech: 'node、express、mysql',
              description: '使用node+mysql初步封装测试增删改查数据库'
          },
          {
              demo_link: '../Demo/timesAxis/index.html',
              img_link: 'https://i.loli.net/2018/04/28/5ae3ca7131ee4.png',
              code_link: 'https://github.com/minchao920917/Dome/tree/master/time-axis',
              title: '纯css手写时间轴',
              core_tech: 'css',
              description: '使用node+mysql初步封装测试增删改查数据库'
          },
          {
              demo_link: '../Demo/opp_v2/index.html',
              img_link: 'https://i.loli.net/2018/08/29/5b86297fd82f2.png',
              code_link: 'https://github.com/minchao920917/Dome/tree/master/opp_v2',
              title: '活动日历翻页倒计时',
              core_tech: 'css+js',
              description: '使用jquery插件'
          }
  ];

  contentInit(demoContent) //内容初始化
  waitImgsLoad() //等待图片加载，并执行布局初始化
}());

/**
 * 内容初始化
 * @return {[type]} [description]
 */
function contentInit(content) {

  var htmlStr = ''
  for (var i = 0; i < content.length; i++) {
    htmlStr += '<div class="grid-item">' + '   <a class="a-img" target="_blank" href="' + content[i].demo_link + '">' + '       <img src="' + content[i].img_link + '">' + '   </a>' + '   <h3 class="demo-title">' + '       <a target="_blank" href="' + content[i].demo_link + '">' + content[i].title + '</a>' + '   </h3>' + '   <p>主要技术：' + content[i].core_tech + '</p>' + '   <p>' + content[i].description + '       <a target="_blank" href="' + content[i].code_link + '">源代码 <i class="fa fa-code" aria-hidden="true"></i></a>' + '   </p>' + '</div>'
  }
  var grid = document.querySelector('.grid')
  grid.insertAdjacentHTML('afterbegin', htmlStr)
}

/**
 * 等待图片加载
 * @return {[type]} [description]
 */
function waitImgsLoad() {
  var imgs = document.querySelectorAll('.grid img')
  var totalImgs = imgs.length
  var count = 0
  //console.log(imgs)
  for (var i = 0; i < totalImgs; i++) {
    if (imgs[i].complete) {
      //console.log('complete');
      count++
    } else {
      imgs[i].onload = function() {
        // alert('onload')
        count++
        //console.log('onload' + count)
        if (count == totalImgs) {
          //console.log('onload---bbbbbbbb')
          initGrid()
        }
      }
    }
  }
  if (count == totalImgs) {
    //console.log('---bbbbbbbb')
    initGrid()
  }
}

/**
 * 初始化栅格布局
 * @return {[type]} [description]
 */
function initGrid() {
  var msnry = new Masonry('.grid', {
    // options
    itemSelector: '.grid-item',
    columnWidth: 250,
    isFitWidth: true,
    gutter: 20
  })
}
