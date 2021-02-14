// 基本数据类型
// let count = 1
// let plusCount = () => {
//   count++
// }
// setTimeout(() => {
//   console.log('b.js-1', count)
// }, 1000)
// module.exports = {
//   count,
//   plusCount,
//   get count() { //如果希望能够同步代码，可以export出去一个getter。
//     return count;
//   }
// }

// 复杂数据类型
// let obj = {
//   count: 1
// }
// let plusCount = () => {
//   obj.count++
// }
// setTimeout(() => {
//   console.log('b.js-1', obj.count)
// }, 1000)
// setTimeout(() => {
//   console.log('b.js-2', obj.count)
// }, 3000)
// module.exports = {
//   obj,
//   plusCount
// }

exports.done = false
let a = require('./a.js')
console.log('b.js-1', a.done)
exports.done = true
console.log('b.js-2', '执行完毕')


