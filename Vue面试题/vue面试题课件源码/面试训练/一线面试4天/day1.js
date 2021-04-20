let result = 100 + true + 21.2 + null + undefined + "Tencent" + [] + null + 9 + false;
console.log(result)

/**
 * 
 * js 中的数据类型
 * 
 * 1、基本数据类型 
 *    number string boolean null undefined symbol bigint
 * 2、 引用数据类型
 *    object function（也是对象，typeof function 单独类型）
 * 
 *    对象+ 0  需要把对象转成字符串  然后在把字符串转换为数字
 *    toString valueOf
 * 
 * 
 *    加号两边出现字符串 就按字符串拼接
 * 
 *    null -- > 0 
 *    undefined 转换数字 为 NaN 
 *    
 *    隐式转换数字使用的就是 Number
 * 
 *    [] 转换为字符串是 ''  z直接调用的([]).toString()   ({}).toSting //[object, object]
 * 
 * 
 *    其他类型转换为boolean规则
 *    Boolean 
 *    !!
 *    规则： 只有 null 、undefined 、NaN 、0 、'' 转成布尔是false 其余都是true
 */ 

console.log([] == false);  // 全转成数字  false - > 0   [] --> '' --- > 0
/**
 * == 比较 转换规则：
 * 类型一样的几个特殊点 
 *  {} == {} false  对象比较的是堆内存的地址
 *  [] == [] false 
 * 
 * 不同类型的
 *  1. null==undefined：true，但是换成===结果是false（因为类型不一致），剩下null/undefined和其它任何数据类型值都不相等
 *  2. 字符串==对象  要把对象转换为字符串
 *  3. 剩下如果==两边数据类型不一致，都是需要转换为数字再进行比较
 * 
 */
console.log(![] == false); // true  ![] --> boolean  ![]--> false  == 优先级比较低


// valueOf() toString()
// 对象 --> 数字    先要toString
var a = {
  value: 0,
  toSting() {
    return ++this.value
  }
}
if(a ==1 && a ==2 && a==3) {
  console.log(1)
}
// vue 2.0 数据劫持   3.0 proxy 
var i = 0
Object.defineProperties(window, 'a' ,{
  get() {
    return ++i;
  }
})
// a.toString() // 默认 调用 Object.prototype.toString() 检测数据类型

var arr = [10.18, 0, 10, 25,23];
arr = arr.map(parseInt) // map  function（item，index）{}
console.log(arr)
/**
 * parseInt 第二个参数进制
 * parseInt(10.18, 0)
 * parseInt(0, 1)
 * parseInt(10, 2) // 0 * 2^0 + 1 * 2^1 => 2
 * parseInt(25, 3) // '25' 看作3进制 0，1，2 只有 2 符合 2*2^0 => 2
 * parseInt(23, 4) // ‘23’ 2 * 4^1 + 3 * 4^0 => 11
 * 
 * parseInt([value]) 把value转换为数字（内核机制，需要把value先变为字符串， 然后从字符串左侧第一个字符查找，把找到的[[有效]]数字字符转换为数字，知道遇到一个非有效的数字字符为止）
 * 
 * 看作n进制 转成十进制 
 * 【n】 不写 默认是10， 特殊情况以0X开头， 默认16进制
 *  2 ～ 36 
 */


 

//  数据类型及转换，js堆栈内存，闭包作用域，执行栈和事件队列，柯里化，compose函数式编程，原型原型链，this，组件封装，浏览器渲染机制，dom事件机制，发布订阅等设计模式，promise等异步generator，HTTP协议全家桶，SEO优化，ajax四步操作，状态码理解
// 封装ajax库，手写promise，手写axios，api接口版块管理，canvas，svg等，vue源码，性能优化，webpack，前端安全，node.js，小程序

/**
 * 堆栈内存
 */

let a = {n:1}
 let b = a
 a.x = a = {n:2}
 console.log(a.x)
 console.log(b)

/**
 * 栈内存  ECStack 执行环境栈
 * EC(G) 全局的执行上下文    execution context
 * VO(G) 全局对象
 * 
 * 所有赋值   先创建值  在进行赋值
 * 引用类型 --堆内存  Heap  AAAAFFF000 16进制地址  将地址入栈
 * a.x = a = {n:2}  所有戴成员访问的都要优先处理
 * 
 * 
 */


 /**
  * 变态的变量提升面试题
  * 
  *  变量提升： 在当前上下文代码运行之前  会把所有var function 的提前声明或者定义
  * 
  *    带var 的只声明，带function会声明 + 定义
  *    如果 当遇到{}  新老浏览器表现的不一致(兼容ES3, 兼容ES6)
  * 老版本浏览器 [ie 浏览<=ie10 ]
  *   不管条件{}, 还是一如既往的function声明+ 定义 而且也不会存在块级作用域  10 一下 所有的a 都是全局的
  * 
  * [新版浏览器]  {} 块级
  *   {} 中的function 在全局下 只声明不定义。
  *   {} 中出现function/let/const 会创建一个块级上下文 /块级作用域
  */

var a = 0;
if (true) {
    a = 1;
    function a() {}; // 块级 全局和块级均声明了function a 。浏览器起会处理，遇到这行代码后，会把代码之前的左右对a的操作都映射给全局一份，后面的则不会处理（认为后面的都是私有的了）
    a = 21;
    console.log(a)
}
console.log(a);
// 21 1  


/**
 * 闭包，作用域链
 * 
 * 如何开栈，如何开堆，浏览器执行上下文
 */
var x = 1
function func(x, y = function aa() {x=2}) {
  x = 3
  y();
  console.log(x) // 2
}
func(5)
console.log(x) // 1
/**
 * Es6 中存在块级作用域  (只要{}除对象之外的打括号，里出现let 。const /function)
 * 有一种该情况也会产生
 * 1、函数有形参赋值了默认值
 * 2、函数体中有单独声明过某个变量
 * 这样在函数运行的时候，会产生两个上下文 
 *    第一个函数执行形成的私有上下文  EC（FUNC)  => 作用域链/形参赋值/。。。
 *    诶二个 函数体大括号抱起来的是一个块级上下文EC（BLOCK）
 *    
 * 
 * EC(G)
 *      x = 1
 *      func = AAAFFF000
 */
var x = 1
function func(x, y = function aa() {x=2}) {
  /**
   * EC(FUNC)私有上下文
   *    作用域链： <EC(FUNC) ,EC(G) >
   *    x= 5   （2）
   *    y=anonymous1 [[scope]]: EC(FUNC)
   * 
   * EC(BLOCK) 块级上下文 （上级上下文 EC（FUNC）
   *     变量提升： var x;
   *    在代码没执行之前, 会把EC(FUNC)对应的值也给它一份  x = 5  （3）
   *    
   */
  var x = 3 // 块级上下文中的x  x= 3
  y(); // 不是块级的y ，向上级找  EC(FUNC)
  // anonymous1 执行
  // 私有上下文 EC（AN） 作用域链：<EC（AN）, EC(FUNC)>
  // x= 2 修改的是EC(FUNC) 中的2
  console.log(x) // 3
}
func(5)
console.log(x) // 1


let res = fn(1,2)(3)
console.log(res) // =>6
// 柯里化
function fn(...outerArgs) {
  return function anonymous(...interArgs) {
    return outerArgs.concat(interArgs).reduce((a,b)=>a+b, 0)
  }
}
// 一个函数执行一定会形成私有上下文  基于闭包事先存储值 后期用的机制 柯里化


/* 
    在函数式编程当中有一个很重要的概念就是函数组合， 实际上就是把处理数据的函数像管道一样连接起来， 然后让数据穿过管道得到最终的结果。 例如：
    const add1 = (x) => x + 1;
    const mul3 = (x) => x * 3;
    const div2 = (x) => x / 2;
    div2(mul3(add1(add1(0)))); //=>3
​
    而这样的写法可读性明显太差了，我们可以构建一个compose函数，它接受任意多个函数作为参数（这些函数都只接受一个参数），然后compose返回的也是一个函数，达到以下的效果：
    const operate = compose(div2, mul3, add1, add1)
    operate(0) //=>相当于div2(mul3(add1(add1(0)))) 
    operate(2) //=>相当于div2(mul3(add1(add1(2))))
​
    简而言之：compose可以把类似于f(g(h(x)))这种写法简化成compose(f, g, h)(x)，请你完成 compose函数的编写 
*/
// 规定方法的执行顺序  
function compose(...args){
  return  args.reduce((a,b)=>arg=>a(b(arg)))
}

function compose(...funcs) {
  return function anonymous(...args) {
    if(funcs.length === 0) return args;
    if(funcs.length === 1) return funcs[0](...args);
    // return funcs.reduce((a, b) => a(b(...args)))

    let n = 0
    return funcs.reduce((a, b) => {
      n++
      if(n===1) return b(a(...args))

      return b(a)
    })
  }

}
let result = compose()(0, 1)
console.log(result)
let result = compose(add1)(0, 1)
console.log(result)
let result = compose(add1, mul3, div2, add1)(0, 1)
console.log(result)


/// 面向对象

function Dog(name) {
  this.name = name;
}
Dog.prototype.bark = function () {
  console.log('wangwang');
}
Dog.prototype.sayName = function () {
  console.log('my name is ' + this.name);
}
function _new(Func, ...args) {
  //=>完成你的代码
  // 创建实例对象，
  // let obj = {};
  // obj.__proto__ = Func.prototype
  let obj = Object.create(Func.prototype)

  // 2、把方法执行，让里面的this是实例对象
  let result = Func.call(obj, ...args)

  // 3、分析返回结果 如果返回引用 对象，就返回这个
  if(result !== null && /^(object|function)$/.test( typeof result)) return result;
  return obj;
}
let sanmao = _new(Dog, '三毛');
sanmao.bark(); //=>"wangwang"
sanmao.sayName(); //=>"my name is 三毛"
console.log(sanmao instanceof Dog); //=>true
/**
 * new Dog
 * 1、创建一个实例对象 __proto__= Dog.prototype
 * 2、把函数执行，this变成实例对象
 * 3、函数没有返回值 return this 有返回值 引用类型
 */


 /**
  * 手写call 方法
  */
~function(){
  function change(context, ...args){
      //=>实现你的代码
      // this --> func
      context=context==undefined?window:context;
      let type = typeof context
      if(!/^(object|function)$/.test(type)){
        if(/^symbol|bigint$/.test(type)) {
          context = Object(context)
        }
        context = new context.constructor(context); // 处理字符串
      }
      let key = Symbol('key'), result;
      context[key] = this;
      result = context[key](...args)
      delete context[key];
      console.log(result, 'result', context, 'context')
      return result;
  };
  Function.prototype.change=change;
}();
let obj = {name:'zhufeng'};
function func(x,y){
  this.total=x+y;
  return this;
}
let res = func.change(obj,100,200);
let res = func.change('xxx',100,200);// 怎么办 new 'xxx'.constructor('xxx')
// let res = func.call(obj,100,200);
//res => {name:'Alibaba',total:300}

// obj.xxx = func
// obj.xxx(10,20)

// call 和apply哪个性能好  call 好

/**
 * 手写bind
 * 
 * 预先处理， 柯里化函数思想
 */
~function(){
  //=>bind方法在IE6~8中不兼容，接下来我们自己基于原生JS实现这个方法
  function bind(context, ...args){
    // this -> func
    let _this = this
    context = context==undefined?window:context
    let type = typeof context
    if(!/^(object|function)$/.test(type)) {
      if(/^symbol|bigint$/.test(type)) {
        context = Object(context)
      }
      context = new context.constructor(context);
    }

    return function anonymous(...innerArgs) {
      _this().call(context, ...args.concat(innerArgs))
    }
  };
  Function.prototype.bind=bind;
}();
var obj = {name:'zhufeng'};
function func(){
  console.log(this,arguments);
  //=>当点击BODY的时候，执行func方法，输出：obj [100,200,MouseEvent事件对象]
}
document.body.onclick = func.bind(obj,100,200);


//=>浅克隆：只复制对象或者数组的第一级内容
//=>深克隆：克隆后数组的每一级都和原始数组没有关联
//那么请说出，浅克隆都怎么去实现，如何实现深度克隆
let obj = {
  a: 100,
  b: [10, 20, 30],
  c: {
      x: 10
  },
  d: /^\d+$/
};

let arr = [10, [100, 200], {
  x: 10,
  y: 20
}];



/**
 * 
 */
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
async function async2() {
  console.log('async2');
}
console.log('script start');
setTimeout(function () {
  console.log('setTimeout');
}, 0)
async1();
new Promise(function (resolve) {
  console.log('promise1');
  resolve();
}).then(function () {
  console.log('promise2');
});
console.log('script end');

/**
 * script start
 * async1 start
 * async2
 * promise1
 * script end
 * async1 end
 * promise2
 * setTimeout
 */

function func1(){
  console.log('func1 start');
  return new Promise(resolve=>{
      resolve('OK');
  });
}
function func2(){
  console.log('func2 start');
  return new Promise(resolve=>{
      setTimeout(()=>{
          resolve('OK');
      },10);
  });
}
console.log(1);
setTimeout(async () => {
  console.log(2);
  await func1();
  console.log(3);
}, 20);
for (let i = 0; i < 90000000; i++) {} //循环大约要进行80MS左右
console.log(4);
func1().then(result=>{
  console.log(5);
});
func2().then(result=>{
  console.log(6);
});
setTimeout(() => {
  console.log(7);
}, 0);
console.log(8);

/**
 * 1
 * 4
 * func1 start
 * func2 start
 * 8
 * 5
 * 
 * 2
 * func1 start
 * 3
 * 7
 * 6
 */
function swap(a,b) {
  a  = a+b
  b = a-b
  a = a-b
}

 // 冒泡练习
 let arr = [12,8,24,16,1]
 for(let i=0; i < arr.length-1; i++) {
   for(let j = 0; j < arr.length -1 -i; j++) {
      if(arr[j] > arr[j+1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
      }
   }
 }
 console.log(arr)