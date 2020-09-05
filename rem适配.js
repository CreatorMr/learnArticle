window.onload = function () {
  // 获取屏幕区域的宽度
  var width = document.documentElement.clientWidth;
  // 获取html
  var htmlNode = document.querySelector('html')
  // 设置字体大小
  htmlNode.style.fontSize = width + 'px'
}