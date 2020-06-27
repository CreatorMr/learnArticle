面向对象中我们要学会的一些概念
>- 对象
>- 类
>- 实例
>- 封装
>- 继承
>- 多态“重载和重写
>- 构造函数
>- 原型
>- 原型链
>- 函数的多种角色
>- this问题处理
>- 数据类型检测
>- 插件组件封装
>- ...

### 普通函数和new 函数的区别

```javascript
function func(x) {
  let y = 200;
  this.x = x; 
}
let res = func(100) // this.x  this  ->- window  普通函数
console.log(res);

res  = new func(100)
console.log(res)
```

new function (100) 执行
=> func是类，（函数类型）
=> 返回结果： 创建当前类的实例（对象数据类型的）
new 执行
1、也会像普通函数执行一样，形成全新的上下文
2、做一些普通函数执行没有的操作
>- v8底层，默认会帮我们创建一个空对象(实例)，让其__proto__指向func.prototype
>- v8底层，会把上下文的this指向这个对象  this -> obj
>- v8底层，发现函数没有写return或者return是基本类型值，都会把创建的实例对象返回

### 原型与原型链
原型链查找机制
>- 1、先找自己的私有属性
>- 2 基于__proto__找所属类原型上
>- 3 继续查找直到找到Object这个内置基类的原型为止

```javascript
function _new(Func, ...args) {
  //=>完成你的代码
  // 创建实例对象，
  // let obj = {};
  // obj.__proto__ = Func.prototype
  let obj = Object.create(Func.prototype)

  // 2、把方法执行，让里面的this是实例对象
  let result = Func.call(obj, ...args)

  // 3、分析返回结果 如果返回引用 对象，就返回这个
  if(result !== null && /^(object|function)$/.test( typeof result === result)) return result;
  return obj;
}

function _new2(Func) {
  let args = Array.prototype.slice.call(arguments, 1)
  let obj = Object.create(Func.prototype)
  let result = Func.call(obj, ...args)
   // 3、分析返回结果 如果返回引用 对象，就返回这个
  if(result !== null && /^(object|function)$/.test( typeof result === result)) return result;
  return obj;
}
```

```javascript
/*
 * JS中有很多内置类，而且在内置类的原型上有很多内置的属性和方法
 *    Array.prototype：数组作为Array的实例，就可以调取原型上的公共属性方法，完成数组的相关操作 => arr.push()：arr基于__proto__原型链的查找机制，找到Array.prototype上的push方法，然后把push方法执行，push方法执行
 *        + 方法中的THIS是要操作的arr这个数组实例
 *        + 作用是向arr(也就是this)的末尾追加新的值
 *        + 返回结果是新增后数组的长度
 *  
 * 向内置类原型扩展方法：
 *    Array.prototype.xxx = xxx
 *    =>这种方法存在风险：我们自己设置的属性名可能会把内置的属性给覆盖掉
 *    =>一般我们自己在内置类原型上扩展的方法，设置的属性名最好加上前缀
 * 
 *    Array.prototype={...}
 *    =>浏览器为了保护内置类原型上的方法，不允许我们重新定向内置类原型的指向（严格模式下会报错）
 */

Array.prototype.myPush = function (value) {
  console.log('自己的PUSH');
  this[this.length] = value
  return this.length
};
let arr = [10, 20];
arr.myPush(100);

let obj = {
  2:3,
  3:4,
  length:2,
  push: Array.prototype.push
}
obj.push(1);
obj.push(2)
console.log(obj);
```

面试题
```javascript
function Fn() {
  this.x = 100;
  this.y = 200
  this.getX = function() {
    console.log(this.x)
  }
}
Fn.prototype.getX = function (){
  console.log(this.x)
}
Fn.prototype.getY = function (){
  console.log(this.y)
}
let f1 = new Fn;
let f2 = new Fn;
console.log(f1.getX === f2.getX); // false
console.log(f1.getY === f2.getY); // true
console.log(f1.__proto__.getY === Fn.prototype.getY); // true
console.log(f1.__proto__.getX === f2.getX); // false
console.log(f1.getX === Fn.prototype.getX); // false
console.log(f1.constructor); // Fn  实例的构造函数一般指的就是它所属的类
console.log(Fn.prototype.__proto__.constructor);//Object
f1.getX();// 100
f1.__proto__.getX(); // undefined
f2.getY();// 200
Fn.prototype.getY(); // undefined
```

```javascript
function Fn(num) {
    this.x = this.y = num;
}
Fn.prototype = {
    x: 20,
    sum: function () {
        console.log(this.x + this.y);
    }
};
let f = new Fn(10);
console.log(f.sum === Fn.prototype.sum); //true
f.sum();//20
Fn.prototype.sum();//NaN
console.log(f.constructor);//Object   由于原型被重写
```