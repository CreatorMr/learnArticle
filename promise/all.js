// Promise.all


const fs = require('fs') // fs 是 一个node 中的file system 有文件的读写操作

// 有异步的API  (异步是要等待同步代码执行完成 才会执行)

// node 中的异步方法都有会回调   并发 同时 去读取文件读取完毕的时机不一样

// 并发操作 就是两个操作互不影响
// function after( times , sya ) { // 高阶函数
//  let renderObj = {};
//   return function (key, value) {
//     renderObj[key] = value;
//     if (--times === 0) {
//       say();
//     }
//   }

// }

const after = (times, fn) => --times ===0 && fn();




 
let out = after(2, ()=> { // 并发的解决核心就是靠定时来维护的
  console.log(renderObj)
})

let renderObj = {};
fs.readFile('./name.text', 'utf8', function (err, data) {
  renderObj.name = data;
  out()
})
fs.readFile('./age.text', 'utf8', function (err, data) {
  renderObj.age = data;
  out()
})
