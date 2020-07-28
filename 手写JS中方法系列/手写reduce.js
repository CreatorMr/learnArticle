Array.prototype.reduce = function (callback, initVal) {
  if (null === this || 'undefined' === typeof this) {
    throw new TypeError(
        'Array.prototype.reduce called on null or undefined');
  }
  if ('function' !== typeof callback) {
    throw new TypeError(callback + ' is not a function');
  }
  let result;
  if(arguments.length > 1) { // 传入初始值
      result = initVal;
  } 
  if(arguments.length === 1 && this.length ===0) {
      throw new TypeError(
          'Reduce of empty array with no initial value'
      )
  }
  for(let i =0;i<this.length;i++) {
      if(this.hasOwnProperty(i)) {
          result = callback(result, this[i], i, this)
      } else {
          result = this[i]
      }
  }
  return result;
}