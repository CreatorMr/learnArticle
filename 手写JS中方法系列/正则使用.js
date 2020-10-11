String.prototype.millimeter = function millimeter() {
  return this.replace(/\d{1,3}(?=(\d{3})+$)/g, value => {
    return value + ',';
  });
};


let str = "hello";
let ary = [...new Set(str.split(''))];
let max = 0;
let code = '';
for (let i = 0; i < ary.length; i++) {
  let reg = new RegExp(ary[i], 'g');
  let val = str.match(reg).length;
  if (val > max) {
    max = val;
    code = ary[i];
  } else if (val === max) {
    code = `${code}、${ary[i]}`;
  }
}
console.log(`出现次数最多的字符是：${code},次数为：${max}`); 
