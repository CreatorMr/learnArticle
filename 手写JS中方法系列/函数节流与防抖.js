let debounce = function (func, wait, immediate) {
  //=>result用来存储函数执行返回的结果
  //=>timeout记录定时器
  let result,
      timeout = null;
  //=>返回可被执行的函数
  return function (...args) {
      //=>now记录的是事件触发的时候立即执行，还是需要等待间隔事件后执行
      let context = this,
          now = immediate && !timeout;
      //=>每一次设置新的定时器等待之前，都要先清空上一次设置的，确保间隔时间内只执行一次
      clearTimeout(timeout);
      //=>设置定时器：到达时间间隔后执行函数
      timeout = setTimeout(() => {
          timeout = null;
          if (!immediate) result = func.apply(context, args);
      }, wait);
      //=>如果是事件触发就执行，把函数执行即可
      if (now) result = func.apply(context, args);
      return result;
  };
};
let throttle = function (func, wait) {
  let timeout = null,
      result = null,
      previous = 0; //=>上次执行时间点
  return function (...args) {
      let now = new Date,
          context = this;
      //=>remaining小于等于0，表示上次执行至此所间隔时间已经超过一个时间间隔
      let remaining = wait - (now - previous);
      if (remaining <= 0) {
          clearTimeout(timeout);
          previous = now;
          timeout = null;
          result = func.apply(context, args);
      } else if (!timeout) {
          timeout = setTimeout(() => {
              previous = new Date;
              timeout = null;
              result = func.apply(context, args);
          }, remaining);
      }
      return result;
  };
};