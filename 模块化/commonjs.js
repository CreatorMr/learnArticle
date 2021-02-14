let a = 1;
let obj = {
  name: 'creator',
  age: 18
}




exports.xxx = 222;
exports.objCommonjs = {
  name: 'objCommonjs'
}

module.exports = {
  a,obj
}

/**
 * 只要有module.exports 存在  不管exports.xxx = xxx
 * 有多少个都失效了
 */

