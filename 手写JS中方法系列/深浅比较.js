
// ### 浅比较
Object.assign(obj1, obj2)

// ### 深比较
function _assignDeep(obj1, obj2) {
  // 先把OBJ1中的每一项深度克隆一份赋值给新的对象
  let obj = _cloneDeep(obj1);

  // 再拿OBJ2替换OBJ中的每一项
  for (let key in obj2) {
    if (!obj2.hasOwnProperty(key)) break;
    let v2 = obj2[key],
      v1 = obj[key];
    // 如果OBJ2遍历的当前项是个对象，并且对应的OBJ这项也是一个对象，此时不能直接替换，需要把两个对象重新合并一下，合并后的最新结果赋值给新对象中的这一项
    if (typeof v1 === "object" && typeof v2 === "object") {
      obj[key] = _assignDeep(v1, v2);
      continue;
    }
    obj[key] = v2;
  }
  return obj;
}


function _is(val1, val2) {
  const type1 = val1 === null ? 'null' : typeof val1,
      type2 = val2 === null ? 'null' : typeof val2;
  // 函数
  if (type1 === "function" && type2 === "function") {
      return val1.toString() === val2.toString();
  }
  // 对象
  if (type1 === "object" && type2 === "object") {
      // 正则和日期
      const ct1 = val1.constructor,
          ct2 = val2.constructor;
      if ((ct1 === RegExp && ct2 === RegExp) || (ct1 === Date && ct2 === Date)) {
          return val1.toString() === val2.toString();
      }
      // 其它对象
      const keys1 = Object.keys(val1),
          keys2 = Object.keys(val2);
      if (keys1.length !== keys2.length) return false;
      for (let i = 0; i < keys1.length; i++) {
          let key1 = keys1[i],
              key2 = keys2[i];
          if (key1 !== key2) return false;
          let item1 = val1[key1],
              item2 = val2[key2];
          let flag = _is(item1, item2);
          if (!flag) return false;
      }
      return true;
  }
  // 其它
  return val1 === val2;
}
