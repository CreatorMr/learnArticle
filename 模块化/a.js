
// a.js 基本数据类型
// let mod = require('./b.js')
// console.log('a.js-1', mod.count)
// mod.plusCount()
// console.log('a.js-2', mod.count)
// setTimeout(() => {
//     mod.count = 3
//     console.log('a.js-3', mod.count)
// }, 2000)

// node a.js
// a.js-1 1
// a.js-2 1
// b.js-1 2  // 1秒后
// a.js-3 3  // 2秒后

// 使用getter 之后
// node a.js
// a.js-1 1
// a.js-2 2
// b.js-1 2  // 1秒后
// a.js-3 2  // 2秒后， 由于没有定义setter，因此无法对值进行设置。所以还是返回2


// a.js  复杂数据类型
// var mod = require('./b.js')
// console.log('a.js-1', mod.obj.count)
// mod.plusCount()
// console.log('a.js-2', mod.obj.count)
// setTimeout(() => {
//   mod.obj.count = 3
//   console.log('a.js-3', mod.obj.count)
// }, 2000)

// node a.js
// a.js-1 1
// a.js-2 2
// b.js-1 2
// a.js-3 3
// b.js-2 3

// 当遇到require命令时，会执行对应的模块代码。当循环引用时，有可能只输出某模块代码的一部分。当引用同一个模块时，不会再次加载，而是获取缓存
exports.done = false
let b = require('./b.js')
console.log('a.js-1', b.done)
exports.done = true
console.log('a.js-2', '执行完毕')