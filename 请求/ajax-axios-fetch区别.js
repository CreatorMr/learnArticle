/**
 * 面试必问： Ajax、Axios、Fetch的核心区别
 */
// Ajax前后端数据通信[同源、跨域]
// 4步
let xhr = new XMLHttpRequest()
// ActiveXObject()
// 第三个参数是否异步
xhr.open('get', 'url请求地址', true)
xhr.send()
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4 && xhr.status === 200) {
    console.log(xhr.responseText)
  }
}


$.ajax({
  url: '',
  method: 'get',
  success() {

  }
})

/**
 *  axios 也是对ajax 封装 基于promise管理请求的，解决回调地狱问题（await）
 *  
 * 
 */

/**
 * ES6 新增fetch 新增通信方法， 不是ajax 但是他本身实现数据通信，就是基于promise管理的
 */