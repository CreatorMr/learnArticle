console.log([] == false) // true
console.log(![] == false) // true

let arr = [10.18, 0, 10, 25, 23]
arr = arr.map(parseInt)
console.log(arr) // 10, NaN, 2, 2, 11

var a = {
  i = 0,
  toString() {
    return ++this.i
  }
};
if (a == 1 && a == 2 && a == 3) {
    console.log(1);
}

var x = 1;
function func(x, y = function anonymous1() {x = 2}) {
    var x = 3;
    y();
    console.log(x);
}
func(5);
console.log(x);
// 3 1

function fun(n, o) {
  console.log(o);
  return {
      fun: function (m) {
          return fun(m, n);
      }
  };
}
var c = fun(1,2).fun(3,4);
c.fun(5);
c.fun(6);
// 2 1 3 3



var name = '珠峰培训';
function A(x,y){
    var res=x+y;
    console.log(res,this.name);
}
function B(x,y){
    var res=x-y;
    console.log(res,this.name);
}
B.call(A,40,30); // 10 'A'
B.call.call.call(A,20,10); // NaN undefined
Function.prototype.call(A,60,50); // undefined
Function.prototype.call.call.call(A,80,70); // NaN undefined



