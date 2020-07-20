// 函数柯里化

// 判断一个变量的类型

// 判断；类型  有四种方式 constructor  instanceof  typeof object.prototype.toString.call

// function checkType(content,type) {
//   return Object.prototype.toString.call(content) === `[object ${type}]`
// }

// let bool = checkType('hello', 'String')
// let bool1 = checkType('aa', 'String')

// 什么叫函数柯里化  把一个函数的范围进行缩小  让函数 变的更具体一些

// function checkType(type) {
//   // 私有化 ，这个函数 可以拿到 上层函数的参数   这个空间不会被释放掉
//   return function (content) {
//     return Object.prototype.toString.call(content) === `[object ${type}]`
//   }
// }

// // 闭包  定义的函数并没有在当前的作用域下执行

// let isString = checkType('String');
// let isBoolean = checkType('Boolean')
// let flag = isString('hello')
// let flag1 = isBoolean(true)


// // 通用的函数柯里化  我希望可以分开传递
// function checkType(content, type) {
//   return Object.prototype.toString.call(content) === `[object ${type}]`
// }

// 如何实现通用的函数柯里化
const add = (a, b, c, d, e) => {
  return a + b + c + d + e;
}

const curring = (fn, arr = []) => {
  let len = fn.length // 长度指代的是函数的参数个数
  return (...args) => { // 保存用户传入的参数
    arr = arr.concat(args) // [1]
    if(arr.length < len) { // 通过传递的参数 不停的判断是否达到函数执行的参数个数
      return curring(fn, arr); // [1] 
    }
    return fn(...args); // 如果达到了执行个数之后，会让函数执行
  }
}



console.log(curring(add)(1)(2)(3, 4)(5))// 15

function checkType(type,content) {
  return Object.prototype.toString.call(content) === `[object ${type}]`
}

let obj = {};
['Number', 'String', 'Boolean'].forEach(item => {
    obj['is' + item] = curring(checkType)(item)
})

let r = obj.isString('hello')