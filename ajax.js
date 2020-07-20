/**
 * ajax：一种请求数据的方式， 不需要刷新整个页面
 * ajax 的核心技术是XMLHttpRequest对象
 * 
 * ajax的请求过程： 创建XMLHttpRequest对象、链接服务器、发送请求、接收响应数据
 */

ajax({
  url: '',
  type: '',
  data: {name: 'name', age: 18},
  dataType: 'json',
  success: function(response, xml) {

  },
  error: function(status) {

  }
})

function ajax(options) {
  options = options || {}
  options.type = (options.type || 'GET').toUpperCase();
  options.dataType = options.dataType || 'json';
  var params = formatParams(options.data);

  // 1、创建
  var xhr;
  if(window.XMLHttpRequest) {
     xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
  }

  // 2、链接 发送
  if(options.type == 'GET') {
    // open()三参数： 请求类型、请求地址，是否异步请求(一般都是异步请求)
    xhr.open('GEt', options.url + '?' + params, true);
    xhr.send(null)
  } else if(options.type === 'POST') {
     xhr.open('POST', options.url, true);
     xhr.setRequestHeader("Content-t=Type", "application/x-www-form-urlencoded");
     xhr.send(params)
  }
  
  //3、接收
  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4) {
      var status  = xhr.status;
      if(status >= 200 && status < 300) {
        options.success && options.success(xhr.responseText, xhr.responseXML)
      } else {
        options.error && options.error(status)
      }
    }
  }
}

function formatParams(data) {
  var arr = []
  for (var name in data) {
    arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]))
  } 
  arr.push(('v=' + Math.random()).replace(".", ''))
  return arr.join("&")
}