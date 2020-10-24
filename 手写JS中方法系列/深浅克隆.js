// ### 浅克隆

// ### 深克隆
// 实现深拷贝
var obj = {
  a: 100,
  b: [10, 20, 30],
  c: {
    x: 10
  },
  d: /^\d+$/
}
let arr = [10, [100, 200], {
  x: 10,
  y: 20
}]

/**
 * 这种方式存在一些问题： 某些格式的数据在转化为JSON字符串和JSON对象的时候出现问题
 * 正则 -> 空对象 
 * bigint -> 报错
 * new Date -> 转化为字符串就转换不回来了
 * Symbol/undefined/function --> 直接搞没了
 * 
 * BUG ： 在对象的循环引用中会出现问题（死递归） 解决：把每一个克隆的对象或数组简历标识，后期递归处理的时候，处理过的不再处理
 */
var output = JSON.stringify(input)
output = JSON.parse(output)
/**
 * 
 * @param {*} obj 
 */
function cloneDeep(obj) {
  // 验证类型
  if (obj === null) return null;
  if (typeof obj !== 'object') return obj;
  if (obj instanceof RegExp) return new RegExp(obj)
  if (obj instanceof Date) return new Date(obj)
  //对于对象和数组进行循环克隆
  let clone = new obj.constructor
  Object.keys(obj).forEach(key => {
    clone[key] = cloneDeep(obj[key])
  })
  return clone;
}