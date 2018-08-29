/*
 * jquery-countdown plugin
 *
 * Copyright (c) 2009 Martin Conte Mac Donell <Reflejo@gmail.com>
 * Dual licensed under the MIT and GPL licenses.
 * http://docs.jquery.com/License
 */

jQuery.fn.countdown = function(userOptions)
{
  // 默认参数
  var options = {
    stepTime: 60,
    format: "dd:hh:mm:ss",
    startTime: "01:12:32:55",
    digitImages: 6,
    digitWidth: 88,
    digitHeight: 123,
    timerEnd: function(){},
    image: "./img/digits.png"
  };
  var digits = [], intervals = [];

  var createDigits = function(where)
  {
    var c = 0;
    for (var i = 0; i < options.startTime.length; i++)
    {
      if (parseInt(options.startTime[i]) >= 0)
      {
        elem = $('<div id="cnt_' + c + '" class="cntDigit" />').css({
          background: 'url(\'' + options.image + '\')',
          backgroundSize:'cover'
        });


        elem.current = parseInt(options.startTime[i]);
        digits.push(elem);

        margin(c, -elem.current * options.digitHeight * options.digitImages);

        switch (options.format[i]) 
        {
          case 'h':
            digits[c]._max = function(pos, isStart) {
              if (pos % 2 == 0)
                return 2;
              else
                return (isStart) ? 3: 9;
            };
            break;
          case 'd':
            digits[c]._max = function(){ return 9; };
            break;
          case 'm':
          case 's':
            digits[c]._max = function(pos){ return (pos % 2 == 0) ? 5: 9; };
        }
        ++c;
      }
      else
      {
        // elem = $('<div class="cntSeparator"/>').text(options.startTime[i]);
        elem = $('<div class="cntSeparator"/>');
      }

      where.append(elem)
    }
  };

  //设置和获取图片的margin
  var margin = function(elem, val)
  {
    if (val !== undefined)
    {
      digits[elem].margin = val;
      return digits[elem].css({'backgroundPosition': '0px ' + val + 'px'});
    }

    return digits[elem].margin || 0;
  };

  var makeMovement = function(elem, steps, isForward)
  {
    
    if (intervals[elem])
      window.clearInterval(intervals[elem]);

    var initialPos = -(options.digitHeight * options.digitImages *
                       digits[elem].current);
    // console.log(initialPos +','+digits[elem].current);//每六张为一秒
    margin(elem, initialPos);
    digits[elem].current = digits[elem].current + ((isForward) ? steps: -steps);

    var x = 0;
    intervals[elem] = setInterval(function(){
      if (x++ === options.digitImages * steps)
      {
        window.clearInterval(intervals[elem]);
        delete intervals[elem];
        return;
      }

      var diff = isForward ? -options.digitHeight: options.digitHeight;
      margin(elem, initialPos + (x * diff));
    }, options.stepTime / steps);
  };

  //这是通过“数字化”步骤完成运动。
  var moveDigit = function(elem)
  {
    if (digits[elem].current == 0)
    {
      // 是否有剩余时间
      if (elem > 0)
      {
        var isStart = (digits[elem - 1].current == 0);

        makeMovement(elem, digits[elem]._max(elem, isStart), true);
        moveDigit(elem - 1);
      }
      else // 到达了终点!00:00
      {
        for (var i = 0; i < digits.length; i++)
        {
          clearInterval(intervals[i]);
          margin(i, 0);
        }
        options.timerEnd();
      }

      return;
    }

    makeMovement(elem, 1);
  };

  $.extend(options, userOptions);
  createDigits(this);
  intervals.main = setInterval(function(){ moveDigit(digits.length - 1); },
                               1000);
};
