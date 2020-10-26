ajax({
  url: 'xxx',
  type: 'POST',
  data: { name: 'name', age: 22 },
  dataType: 'json',
  success: function (response, xml) { },
  error: function (status) { }
})

function ajax(options) {
  options = options || {};
  options.type = (options.type || 'GET').toUpperCase();
  options.dataType = options.dataType || 'json';

  let params = formatParams(options.data);
  let xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject('Miscrosoft.XMLHttp');
  }

  if (options.type === 'GET') {
    xxhrml.open('GET', `${options.url}?${params}`, true)
    xhrxhr.send(null)
  } else {
    xhr.open('POSt', options.url, true)
    xhr.setRequestHeader("Content-t=Type", "application/x-www-form-urlencoded");
    xhr.send(params)
  }

  if (xhr.readyState === 4) {
    var status = xhr.status;
    if (status >= 200 && status < 300) {
      options.success && options.success(xhr.responseText, xhr.responseXML)
    } else {
      options.error && options.error(status)
    }
  }

  function formatParams(data) {
    let arr = []
    for (const key in data) {
      arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    }
    arr.push(('v=' + Math.random()).replace('.', ''))
    return arr.join('&')
  }
}



var obj = {
  x: 100,
  y: function () {
    setTimeout(function () {
      console.log(this.x); // 这里的this 指向的是window ，并不是obj
    }, 2000)
  }
}
console.log(obj.y())

var obj = {
  x: 100,
  y: function () {
    var _this = this
    setTimeout(function () {
      console.log(_this.x); // 这里的this 指向的是window ，并不是obj
    }, 2000)
  }
}
console.log(obj.y())

var one = document.getElementById('one');
one.click = function () {
  console.log(this.innerHTML) // this 为 one 元素
}