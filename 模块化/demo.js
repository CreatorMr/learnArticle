
let { a, obj, xxx } = require('./commonjs.js')
a = 3
console.log(a, obj, xxx, '打印-commonjs')

let data = require('./commonjs.js')
console.log(data, '打印-commonjs')

data.a = 2

console.log(data, '打印-commonjs222')
