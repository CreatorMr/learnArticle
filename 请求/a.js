const one = x => typeof x === 'function' ? x() : 1;
const two = x => typeof x === 'function' ? x() : 2;
const add = a => b => a + b;
console.log(one(add(two())))
// 3
console.log(two(add(one())))
// 3

function sum(...args) {
  var arr = [...args]; // 存储参数的数组；
  var sum_fn = function (...innerArgs) {
    arr = arr.concat(innerArgs)
    return sum_fn
  }
  sum_fn.valueOf = function () {
    return arr.reduce((x, y) => x + y, 0);
  }
  return sum_fn
}
console.log(sum(1)(2)(3)(4)(5).valueOf())
console.log(sum(1, 2, 3, 4)(5).valueOf())
console.log(sum(1, 2, 3, 4)(5).valueOf())
console.log(sum(1, 2, 3)(4)(5).valueOf())
console.log(sum(1, 2)(3, 4)(5).valueOf())

const add = (...args) => {
  let arr = [];
  arr = [...args];
  return function (...innerArgs) {
    if ([...innerArgs].length) {
      arr = arr.concat(innerArgs)
      return add(...arr)
    } else {
      return arr.reduce((x, y) => x + y, 0)
    }
  }

}
console.log(add(1)(2)(3)())
console.log(add(1, 2)(3)())
console.log(add(1, 2, 3)())





function sum(arr) {
  return arr.reduce(function (x, y) {
    return x + y
  })
}
console.log(sum([1, 2, 3, 4, 5]))

// 但是，如果不需要立刻求和，而是在后面的代码中，根据需要在计算怎么办？
// 可以不返回求和的结果，返回求和的函数
function lazzy_sum(arr) {
  var sum = function () {
    return arr.reduce(function (x, y) {
      return x + y;
    })
  }
  return sum
}


function mathss(args, q) {
  var fn = args[0];
  var arr = fn();
  var sum = 0;
  if (typeof arr == "number") {
    sum = arr;
  }
  else {
    sum = arr[0];
    for (var i = 0; i < arr.length - 1; i++) {
      q = 1 ? sum += arr[i + 1] : sum -= arr[i + 1]

    }
  }
  for (var i = 1; i < args.length; i++) {
    // console.log(args[i])
    q = 1 ? sum += args[i] : sum -= args[i]
  }
  return function () {
    return sum
  }
}


function add(...args) {
  return mathss(args, 1)
}

function subtract(...args) {
  return mathss(args, 0)
}

function num(x) {
  var arr = [];
  arr.push(x);
  var num_fn = function (x) {
    if (!x) return arr;
    else {
      arr.push(x);
      return num_fn;
    }
  }
  return num_fn;
}

console.log(add(add(num(3)(4)(5)), 2, 4)()) //18


/**
 * 请实现一个cacheRequest方法，保证当使用ajax(请求相同资源时，此题中相同资源的判断是以url为判断依据)
 * 真实网络层中，实际只发出一次请求（假设已存在request方法用于封装ajax请求，调用格式为：，
 * 
 * request(url, successCallback, failCallback)
 * 比如调用方代码（并行请求）如下
 * cacheRequest('/user', data => {
    console.log('请求的user，数据为' + data);
  })
  cacheRequest('/user', data => {
    console.log('请求的user，数据为' + data);
  })
 */

const request = (url, successCallback, failCallback) => {
  // return new Promise((resolve, reject) => {
  //   setTimeout(_ => {
  //     resolve(`请求连接为： ${url}`)
  //   }, 1000)
  // })
  console.log('发生请求了')
  return new Promise((resolve, reject) => {
    setTimeout(_ => {
      resolve(`请求连接为： ${url}`)
    }, 1000)
  }).then(data => successCallback(data), reason => failCallback(reason))
}
request('url', (data) => {
  console.log(data)
})
class CacaheRequestList {
  constructor() {
    this.urlMap = {}
  }
  add(url) {
    this.urlMap[url] = this.urlMap[url] || {};
    this.urlMap[url].list = this.urlMap[url].list || []
    let promise = new Promise((resolve, reject) => {
      request(url, (data) => {
        this.urlMap[url].data = data;
        resolve()
      }, reason => {
        console.log('失败', reason);
        reject()
      })
    })
    this.urlMap[url].list.push(promise)
    console.log(this.urlMap)
  }
  exec(url) {

  }
}
const cache = new CacaheRequestList();
const cacheRequest = async (url, successCallback) => {
  cache.add(url)
  let data = await cache.request('/user', 2000)
  successCallback(data)
}

cacheRequest('/user', data => {
  console.log('请求的user，数据为' + data);
})
cacheRequest('/user', data => {
  console.log('请求的user，数据为' + data);
})
