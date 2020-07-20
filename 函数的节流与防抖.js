/* 
函数节流（throttle）与 函数防抖（debounce）都是为了限制函数的执行频次，
以优化函数触发频率过高导致的响应速度跟不上触发频率，出现延迟，假死或卡顿的现象。
 */
// 函数节流
// 高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率

// 思路：
// 每次触发事件时都判断当前是否有等待执行的延时函数
function throttle(func, gapTime) {
  let endTime = null

  return function () {
    // 当前时间
    let currentTime = new Date().getTime()
    if (!endTime || currentTime - endTime > gapTime) {
      func.apply(this, arguments)
      // 更新上次时间节点
      endTime = currentTime
    }
  }
}
// 函数防抖
// 触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间

// 思路：
// 每次触发事件时都取消之前的延时调用方法
function _debounce(func, wait) {
  let timer = null
  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, arguments)
    }, wait)
  }
}