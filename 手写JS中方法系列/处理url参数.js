(proto => {
  function queryURLParams() {
    let obj = {};
    this.replace(/([^?=&#]+)=([^?=&#]+)/g, (_, key, value) => obj[key] = value);
    this.replace(/#([^?=&#]+)/g, (_, hash) => obj['HASH'] = hash);
    return obj;
  }
  proto.queryURLParams = queryURLParams;
})(String.prototype);

console.log('http://www.xxxxxxx.cn/?lx=1&name=JS&from=baidu#video'.queryURLParams());


function queryURLParams(url) {
  // 1.创建A标签（A元素对象）来获取到问号参数和哈希值
  let link = document.createElement('a');
  link.href = url;
  let askText = link.search.substr(1),
    polText = link.hash.substr(1),
    obj = {};
  // 2.向对象中进行存储
  polText ? obj['HASH'] = polText : null;
  if (askText) {
    let arr = askText.split(/(?:&|=)/g); //=>同时按照两个字符来拆分：["lx", "1", "name", "JS", "from", "baidu"]
    for (let i = 0; i < arr.length; i += 2) {
      // console.log(arr[i], arr[i + 1]); 属性名和属性值
      obj[arr[i]] = arr[i + 1];
    }
  }
  return obj;
}
let result = queryURLParams('http://www.xxxxxxx.cn/?lx=1&name=JS&from=baidu#video');
console.log(result);

/* <a href="http://www.xxxxxxx.cn/?lx=1&name=JS&from=baidu#video" id="link">*/
