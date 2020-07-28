Array.prototype.newMap = function(callback,thisArgs) {
  if(this == null) {
      throw new TypeError("Cannot read property 'map' of null or undefined");
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function')
  } 
  let obj = Object(this)
  let len = obj.length >>> 0

  let k = 0;
  let resArr = new Array(len)
  while(k < len) {
    for(k in obj) {
      item = obj[k]
      let resItem = callback.call(thisArgs, item, k, obj)
      resArr[k] = resItem
    }
    k++
  }
  return resArr;
}