{} + 0 ? alert('ok'): alert('no')
0 + {} ? alert('ok'): alert('no')
// 'no'
// 'ok'
//2
let arr = ['20.5px', 30, '0001', 123, 234.22]
arr = arr.map(parseInt)
console.log(arr) //[20,NaN, 1, 5, 11]
//3
var x = 5, 
   y = 6;

function func() {
  x +=y;
  func = function(y) {
    console.log(y + (--x)) 
  };
  console.log(x, y)
}
func(4);
func(3)
console.log(x, y)
/**
11 6
13
10 6
 */
// 4
var x = 1;
function func(x, y=function anonymous1() {x=2}){
  var x = 3;
  var y = function anonymous2() {x=4}
  y();
  console.log(x)
}
func(5)
console.log(x)
// 4 1
// 5
function fn1(){
  console.log('fn1')
}
function fn2() {
  console.log('fn2')
}
fn1.call(fn2);  // 'fn1'
fn1.call.call.call(fn2) // 'fn2'
Function.prototype.call(fn1); // 'fn1'
Function.prototype.call.call.call(fn1); // 'fn2'

// 6)
let res  = fn(1,2)(3)
console.log(res)
function fn(...outArgs){
  return function anonymous(...innerArgs) {
    return outArgs.concat(innerArgs).reduce((a,b)=>a+b,0)
  }
}






