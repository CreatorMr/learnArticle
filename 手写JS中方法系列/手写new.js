function newFunc(fn, ...args) {
  let obj = Object.create(fn.prototype)

  let result = fn.call(obj, ...args)

  if (result !== null && /^(function|object)$/.test(typeof result)) return result;
  return obj;
}


function _new2(Func) {
  let args = Array.prototype.slice.call(arguments, 1)
  let obj = Object.create(Func.prototype)
  let result = Func.call(obj, ...args)
  // 3、分析返回结果 如果返回引用 对象，就返回这个
  if (result !== null && /^(object|function)$/.test(typeof result)) return result;
  return obj;
}