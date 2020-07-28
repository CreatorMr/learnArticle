Array.prototype.newFilter = function(callback,thisArgs) {
  if(this == null) {
      throw new TypeError("Cannot read property 'map' of null or undefined");
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function')
  }

  let obj = Object(this)
  let len = obj.length >>> 0

  let k = 0;
  let resArr = new Array()
  while(k < len) {
    for(k in obj) {
      item = obj[k]
      let resItem = callback.call(thisArgs, item, k, obj)
      resItem ? (resArr[k] = obj[k]) : void 0
    }
    k++
  }
  return resArr;
}