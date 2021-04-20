function axios(index, timer) {
  console.log(`当前第${index}个请求开始请求`);
  return new Promise((resolve, reject) => {
    setTimeout(_ => resolve(`第${index}个请求完成`), timer);
  })
}

class RequestLimit {
  constructor(limit) {
    this.limit = limit;
    this.queueList = [];// 当前请求队列
    this.curRequestCount = 0; // 正在进行中的请求数量
  }
  async awaitQueue() {
    return new Promise(resolve => this.queueList.push(resolve))
  }
  async request(fn, ...args) {
    return new Promise(async (resolve, reject) => {
      if (this.curRequestCount > this.limit) {
        await this.awaitQueue()
      }
      this.curRequestCount++
      return this.exec(fn, args, resolve, reject);
    })
  }
  exec(fn, args, resolve, reject) {
    return fn(...args).then(resolve, reject).finally(_ => {
      this.curRequestCount--;
      if (this.queueList.length) {
        const next = this.queueList.shift()
        next();
      }
    })
  }
}


let request = new RequestLimit(2);

request.request(axios, 1, 1000).then(_ => console.log(_))
request.request(axios, 2, 2000).then(_ => console.log(_))
request.request(axios, 3, 3500).then(_ => console.log(_))
request.request(axios, 4, 8000).then(_ => console.log(_))
request.request(axios, 5, 10000).then(_ => console.log(_))
request.request(axios, 6, 3000).then(_ => console.log(_))
request.request(axios, 7, 4000).then(_ => console.log(_))




//  push
Array.prototype.push = function (value) {
  this[this.length] = value
  return this.length;
}
// instanceof
function instanceof (subClass, parnetClass) {
  subClass = subClass.__proto__;
  parnetClass = parnetClass.prototype;
  while (true) {
    if (subClass === null) {
      return false
    }
    if (subClass === parnetClass) {
      return true
    }
    subClass = subClass.__proto__;
  }
}

let t = [1, 2, 3].reduce((pre, cur, index, arr) => {
  return pre + cur
}, 0)
console.log(t)
Array.prototype.reduce = function (callback, initVal) {
  if (this === null || 'undefined' === typeof this) {
    throw new TypeError(
      `Array.prototype.reduct called on null or undefined`
    )
  }

  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  let result;
  if (arguments.length > 1) {
    result = initVal;
  }
}


let ary = [1, 2, 3, 1, 2, 1, 2, 3, 2, 1, 2, 3];
let newArray = []
for (let i = 0; i < arr.length; i++) {
  let item = ary[i];
  if (newArray.includes(item)) {
    continue;
  }
  newArray.push(item)
}

for (let i = 0; i < ary.length; i++) {
  let item = ary[i]
  for (let j = i + 1; j < ary.length; j++) {
    if (item === ary[j]) {
      ary.splice(j, 1)
      j--
    }
  }
}
let obj = {}

for (let i = 0; i < ary.length; i++) {
  let item = ary[i]
  if (obj[item] !== undefined) {
    ary[i] = ary[ary.length - 1]
    ary.length--
    i--;
  }
  obj[item] = item;
}



// 32 个手写JS

// 数组扁平化

const arr = [1, [2, [3, [4, 5]]], 6];
// var newArr = arr.flat(Infinity)
// var newArr = JSON.stringify(arr).replace(/\[|\]/g, '').split(',')
// var newArr = JSON.parse('[' + JSON.stringify(arr).replace(/\[|\]/g, '') + ']')

// const flatten = arr => {
//   return arr.reduce((pre, cur, index, arr) => {
//     return pre.concat(Array.isArray(cur) ? flatten(cur) : cur)
//   }, [])
// }
// var newArr = flatten(arr)

const res = []
const fn = arr => {
  for (let i = 0; i < arr.length; i++) {
    let cur = arr[i]
    if (cur.constructor === Array) {
      fn(cur)
    } else {
      res.push(cur)
    }
  }
}
var newArr = fn(arr)

console.log(newArr)

// 去重复

const arr2 = [1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}];
// => [1, '1', 17, true, false, 'true', 'a', {}, {}]

// Array.from(new Set(arr))

// const unique1 = arr => {
//   let len = arr.length
//   for (let i = 0; i < len; i++) {
//     for (let j = i + 1; j < len; j++) {
//       if (arr[i] === arr[j]) {
//         arr.splice(j, 1)
//         len--; // 提高性能
//         j--;
//       }
//     }
//   }
// }

const unique2 = arr => {
  let res = []
  arr.forEach((item, index) => {
    if (res.indexOf(item) === -1) res.push(item)
  })
  return res;
}
console.log(unique2(arr2))

arr2.filter((item, index) => arr2.indexOf(item) === index)

const a = arr => {
  let map = new Map()
  let res = []
  for (let i = 0; i < arr.length; i++) {
    if (!map.has(arr[i])) {
      map.set(arr[i], true)
      res.push(arr[i])
    }
  }
  return res;
}

Array.prototype.slice.call()



function getNums36() {
  var nums36 = [];
  for (var i = 0; i < 36; i++) {
    if (i >= 0 && i <= 9) {
      nums36.push(i);
    } else {
      nums36.push(String.fromCharCode(i + 87));
    }
  }
  return nums36;
}

//十进制数转成36进制
function scale36(n) {
  var arr = [];
  var nums36 = getNums36();
  while (n) {
    var res = n % 36;
    //作为下标，对应的36进制数，转换成
    arr.unshift(nums36[res]);
    //去掉个位
    n = parseInt(n / 36);
  }
  return arr.join("");
}


