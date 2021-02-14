// https://www.cnblogs.com/unclekeith/archive/2017/10/17/7679503.html
let a = require('./a.js')
let b = require('./b.js')  // 都完了

console.log('c.js-1', '执行完毕', a.done, b.done)

// 1在Node.js中执行c模块。此时遇到require关键字，执行a.js中所有代码。
// 2在a模块中exports之后，通过require引入了b模块，执行b模块的代码。
// 3在b模块中exports之后，又require引入了a模块，此时执行a模块的代码。
// 4a模块只执行exports.done = false这条语句。
// 5回到b模块，打印b.js-1, exports, b.js-2。b模块执行完毕。
// 6回到a模块，接着打印a.js-1, exports, b.js-2。a模块执行完毕
// 7回到c模块，接着执行require，需要引入b模块。由于在a模块中已经引入过了，所以直接就可以输出值了。
// 8结束。

// 总结： 当遇到require命令时，会执行对应的模块代码。当循环引用时，有可能只输出某模块代码的一部分。当引用同一个模块时，不会再次加载，而是获取缓存