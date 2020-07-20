70+JS面试题 from  [程序员成长指北](https://mp.weixin.qq.com/s/HoltfI8MdE2DIihaWT0RCQ)
##### 1. undefined 和 null 有什么区别？
JavaScript有7种内置类型。string、number、boolean、null、undefined、object、symbol
基本类型string、number、boolean、null、undefined、symbol
第八种 BigInt 基本类型 比number支持范围更大

他们都是虚值，可以使用Boolean(value) 或者 !!value 将其转化为布尔值 false

undefined： 未指定特定值的变量的默认值，或者没有显式返回值的函数。如：console.log(1)，还包括对象中不存在的属性，这些 JS 引擎都会为其分配 undefined 值。
```
let _thisIsUndefined;
const doNothing = () => {};
const someObj = {
  a : "ay",
  b : "bee",
  c : "si"
};

console.log(_thisIsUndefined); // undefined
console.log(doNothing()); // undefined
console.log(someObj["d"]); // undefined
```
undefined值的变量和尚未定义的变量还不一样
```
var message;
alert(message)
alert(age) // error : age is not undefined
```

null 不代表任何值的值。红宝书：特殊值null， 表示空指针对象，也是使用typeof 检测null 返回‘object’ 的原因
如果定义的变量将来用来保存对象，那么初始化的时候保存null，只要检查null就可以确定变量是否保存了一个对象的引用
```
var car = null
typeof car === 'object'
```

##### 2. DOM 是什么？
DOM 文档对象类型， 是HTML和XML文档的接口（API)。当浏览器第一次读取HTML的文档时，会创建一个大对象，一个基于HTML文档的大的对象，-->DOM , 从HTML文档中建模的树状结构。DOM用于交互和修改DOM结构或特定元素或者节点



##### 6. 什么是事件传播?
当事件发生在DOM元素上时，该事件并不完全发生在那个元素上。在“冒泡阶段”中，事件冒泡或向上传播至父级，祖父母，祖父母或父级，直到到达window为止；而在“捕获阶段”中，事件从window开始向下触发元素 事件或event.target。
事件传播三个阶段
>- 捕获阶段
>- 目标阶段
>- 冒泡阶段
7. 什么是事件冒泡？
8. 什么是事件捕获？
##### 9. event.preventDefault() 和 event.stopPropagation()方法之间有什么区别？
event.preventDefault() 阻止默认行为。 
>- 表单 submit 阻止默认提交 
>- 锚元素中，阻止导航
>- 上下文菜单中，阻止显示
>- 兼容 event.returnValue=false; （IE8）

event.stopPropagation()方法用于阻止捕获和冒泡阶段中当前事件的进一步传播。
>- 兼容 event.cancelBubble=true;（IE8）


##### 10. 如何知道是否在元素中使用了event.preventDefault()方法？

使用event.defaultPrevented属性

##### 11. 为什么此代码obj.someprop.x会引发错误?
由于我们尝试访问someprop属性中的x属性，而 someprop 并没有在对象中，所以值为 undefined。记住对象本身不存在的属性，并且其原型的默认值为undefined。因为undefined没有属性x，所以试图访问将会报错。
##### 12. 什么是event.target？
发生事件的元素或触发事件的元素

##### 13. 什么是event.currentTarget？
附加事件处理程序的元素 获取的不一定是当前点击的元素，加方法的地方

##### 14. == 和 === 有什么区别？
==用于一般比较，===用于严格比较，==在比较的时候可以转换数据类型，===严格比较，只要类型不匹配就返回false。

==比较 

1、基本类型 -> 两边相同类型 转成=== 比较 。 对象 == 对象 -> 不一定相等，因为对象的操作的是引用地址，地址不相同，则不相等.
2、不同类型： 
>- 对象 == 数字     ： 对象 -> 数字
>- 对象 == 布尔     ： 对象 -> 数字  布尔->数字
>- 对象 == 字符串   ： 对象 -> 数字   字符串-> 数字
>- 布尔 == 数字     ： 布尔 -> 数字
>- 字符串 == 数字   ： 字符串 -> 数字
>- 字符串 == 布尔   ： 字符串 -> 数字  布尔->数字

null == undefined  -> true
null === undefined -> false
null && undefined 和其它值都不相等
NaN == NaN -> false
NaN 和任何值都不相等



##### 15. 为什么在 JS 中比较两个相似的对象时返回 false？
因为对象的操作的是引用地址，地址不相同，则不相等.

##### 16. !! 运算符能做什么？
！！将右侧的值强制转换为布尔值
#####  17. 如何在一行中计算多个表达式的值？
function (x,y) {
  return (x+y, x+=x, x*y)
}
可以使用逗号运算符在一行中计算多个表达式。它从左到右求值，并返回右边最后一个项目或最后一个操作数的值。
 

##### 18. 什么是提升？
提升是用来描述变量和函数移动到其(全局或函数)作用域顶部的术语。

为了理解提升，需要来了解一下执行上下文。执行上下文是当前正在执行的“代码环境”。执行上下文有两个阶段:编译和执行。

编译-在此阶段，JS 引荐获取所有函数声明并将其提升到其作用域的顶部，以便我们稍后可以引用它们并获取所有变量声明（使用var关键字进行声明），还会为它们提供默认值：undefined。

执行——在这个阶段中，它将值赋给之前提升的变量，并执行或调用函数(对象中的方法)。

注意:只有使用var声明的变量，或者函数声明才会被提升，相反，函数表达式或箭头函数，let和const声明的变量，这些都不会被提升。

##### 19. 什么是作用域？
JavaScript 中的作用域是我们可以有效访问变量或函数的区域。JS 有三种类型的作用域：全局作用域、函数作用域和块作用域(ES6)。

##### 20. 什么是闭包？
闭包就是一个函数在声明时能够记住当前作用域、父函数作用域、及父函数作用域上的变量和参数的引用，直至通过作用域链上全局作用域，基本上闭包是在声明函数时创建的作用域。

简单来说： 函数执行形成私有上下文的机制就是”闭包“，只不过一般执行完都会被销毁，不会销毁的才真正称为”闭包“

分析：
>- 闭包机制： 函数执行形成的私有上下文，即能保护里面的私有变量不受外界干扰，也能在当前上下文中保存一些信息(前提是形成的上下文不被销毁),上下文中的这种保存和保护的机制，就是闭包机制



##### 21. JavaScript中的虚值是什么？
‘’ null undefined NaN 0 
转布尔的时候 只有这个五个是false 其它都是true

##### 22. 如何检查值是否虚值？
使用 Boolean 函数或者 !! 运算符。

##### 23. 'use strict' 是干嘛用的？
严格模式 -> ES5
严格模式的一些限制：

>-变量必须声明后再使用

>-函数的参数不能有同名属性，否则报错

>-不能使用with语句

>-不能对只读属性赋值，否则报错

>-不能使用前缀 0 表示八进制数，否则报错

>-不能删除不可删除的属性，否则报错

>-不能删除变量delete prop，会报错，只能删除属性delete global[prop]

>-eval不能在它的外层作用域引入变量
>-eval和arguments不能被重新赋值
>-arguments不会自动反映函数参数的变化
>-不能使用arguments.callee
>-不能使用arguments.caller
>-禁止this指向全局对象
>-不能使用fn.caller和fn.arguments获取函数调用的堆栈
>-增加了保留字（比如protected、static和interface）

设立”严格模式”的目的，主要有以下几个：

>-消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
>-消除代码运行的一些不安全之处，保证代码运行的安全；
>-提高编译器效率，增加运行速度；
>-为未来新版本的Javascript做好铺垫。

##### 24. JavaScript中 this 值是什么？
基本上，this指的是当前正在执行或调用该函数的对象的值。this值的变化取决于我们使用它的上下文和我们在哪里使用它。
this的用处：
>-1、一般用处
>-2、 this.x 与 apply()、call()
>-3、无意义（诡异）的this用处
>-4. 事件监听函数中的this


##### 25. 对象的 prototype 是什么？
简单地说，原型就是对象的蓝图。如果它存在当前对象中，则将其用作属性和方法的回退。它是在对象之间共享属性和功能的方法，这也是JavaScript实现继承的核心
##### 26. 什么是IIFE，它的用途是什么？
IIFE的一个主要作用是避免与全局作用域内的其他变量命名冲突或污染全局命名空间，来个例子

##### 27. Function.prototype.apply方法的用途是什么？
apply() 方法调用一个具有给定this值的函数，以及作为一个数组（或类似数组对象）提供的参数。
##### 28. Function.prototype.call方法的用途是什么？
call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。
##### 29. Function.prototype.apply 和 Function.prototype.call 之间有什么区别？
apply()方法可以在使用一个指定的 this 值和一个参数数组（或类数组对象）的前提下调用某个函数或方法。call()方法类似于apply()，不同之处仅仅是call()接受的参数是参数列表。

##### 30. Function.prototype.bind的用途是什么？
bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

##### 31. 什么是函数式编程? JavaScript的哪些特性使其成为函数式语言的候选语言？
函数式编程（通常缩写为FP）是通过编写纯函数，避免共享状态、可变数据、副作用 来构建软件的过程。数式编程是声明式 的而不是命令式 的，应用程序的状态是通过纯函数流动的。与面向对象编程形成对比，面向对象中应用程序的状态通常与对象中的方法共享和共处。

函数式编程是一种编程范式 ，这意味着它是一种基于一些基本的定义原则（如上所列）思考软件构建的方式。当然，编程范式的其他示例也包括面向对象编程和过程编程。

函数式的代码往往比命令式或面向对象的代码更简洁，更可预测，更容易测试 - 但如果不熟悉它以及与之相关的常见模式，函数式的代码也可能看起来更密集杂乱，并且 相关文献对新人来说是不好理解的。

##### 32. 什么是高阶函数？
高阶函数只是将函数作为参数或返回值的函数。
function a() {
  return function anonymous() {}
}

##### 33. 为什么函数被称为一等公民？
在JavaScript中，函数不仅拥有一切传统函数的使用方式（声明和调用），而且可以做到像简单值一样赋值（var func = function(){}）、传参(function func(x,callback){callback();})、返回(function(){return function(){}})，这样的函数也称之为第一级函数（First-class Function）。不仅如此，JavaScript中的函数还充当了类的构造函数的作用，同时又是一个Function类的实例(instance)。这样的多重身份让JavaScript的函数变得非常重要。

##### 34. 手动实现`Array.prototype.map`方法

```javascript
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
```

##### 35. 手动实现`Array.prototype.filter`方法
```javascript
// Array.filter(function(currentValue, indedx, arr), thisValue)
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
```

#### 35. 手动实现`Array.prototype.reduce`方法
```javascript
// arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
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
```

扩展 用reduce 实现map 功能
```javascript
const numbers = [10, 20, 30, 40];
const doubledOver50 = numbers.reduce((finalList, num) => {
  num = num * 2;
  if (num > 50) {
   finalList.push(num);
  }
  return finalList;
}, []);
doubledOver50; // [60, 80]
```
##### 37. arguments 的对象是什么？
arguments对象是函数中传递的参数值的集合。它是一个类似数组的对象，因为它有一个length属性，我们可以使用数组索引表示法arguments[1]来访问单个值，但它没有数组中的内置方法，如：forEach、reduce、filter和map。

转数组 -> Array.prototype.slice.call(arguments);

注意:箭头函数中没有arguments对象。

##### 38. 如何创建一个没有 prototype(原型) 的对象？
我们可以使用Object.create方法创建没有原型的对象。

```javascript
var obj = Object.create(null)
obj.toString() // throws an error obj.toString is not a function 
```
39. 为什么在调用这个函数时，代码中的`b`会变成一个全局变量?

```javascript
function myFunc() {
  let a = b = 0;
}
myFunc();
```
原因是赋值运算符是从右到左的求值的。这意味着当多个赋值运算符出现在一个表达式中时，它们是从右向左求值的。所以上面代码变成了这样

```javascript
function myFunc() {
  let a = (b = 0); // 向上找
}

myFunc();
```

##### 40. ECMAScript是什么？

ECMAScript 是编写脚本语言的标准，这意味着JavaScript遵循ECMAScript标准中的规范变化，因为它是JavaScript的蓝图。

ECMAScript 和 Javascript，本质上都跟一门语言有关，一个是语言本身的名字，一个是语言的约束条件
只不过发明JavaScript的那个人（Netscape公司），把东西交给了ECMA（European Computer Manufacturers Association），这个人规定一下他的标准，因为当时有java语言了，又想强调这个东西是让ECMA这个人定的规则，所以就这样一个神奇的东西诞生了，这个东西的名称就叫做ECMAScript。

javaScript = ECMAScript + DOM + BOM（自认为是一种广义的JavaScript）

ECMAScript说什么JavaScript就得做什么！

JavaScript（狭义的JavaScript）做什么都要问问ECMAScript我能不能这样干！如果不能我就错了！能我就是对的！

——突然感觉JavaScript好没有尊严，为啥要搞个人出来约束自己，

那个人被创造出来也好委屈，自己被创造出来完全是因为要约束JavaScript。

##### 41. ES6或ECMAScript 2015有哪些新特性？

>- 箭头函数
>- 类
>- 模板字符串
>- 加强的对象字面量
>- 对象解构
>- Promise
>- 生成器
>- 模块
>- Symbol
>- 代理
>- Set
>- 函数默认参数
>- rest 和展开
>- 块作用域

##### 42. `var`,`let`和`const`的区别是什么
>- var声明的变量会挂载在window上，而let和const声明的变量不会：
>- var声明变量存在变量提升，let和const不存在变量提升:
>- let和const声明形成块作用域
>- 同一作用域下let和const不能声明同名变量，而var可以
>- 暂存死区
```javascript
var a = 100;

if(1){
  a = 10;
  //在当前块作用域中存在a使用let/const声明的情况下，给a赋值10时，只会在当前作用域找变量a，
  // 而这时，还未到声明时候，所以控制台Error:a is not defined
  let a = 1;
}
```

##### 43. 什么是箭头函数？
() => {}

function a() { return res;}

() => () 返回值不需要return 
this 问题，箭头函数中没有this

##### 44. 什么是类？

类(class)是在 JS 中编写构造函数的新方法。它是使用构造函数的语法糖，在底层中使用仍然是原型和基于原型的继承。
```javascript
//ES5 Version
   function Person(firstName, lastName, age, address){
      this.firstName = firstName;
      this.lastName = lastName;
      this.age = age;
      this.address = address;
   }

   Person.self = function(){
     return this;
   }

   Person.prototype.toString = function(){
     return "[object Person]";
   }

   Person.prototype.getFullName = function (){
     return this.firstName + " " + this.lastName;
   }  

   //ES6 Version
   class Person {
        constructor(firstName, lastName, age, address){
            this.lastName = lastName;
            this.firstName = firstName;
            this.age = age;
            this.address = address;
        }

        static self() {
           return this;
        }

        toString(){
           return "[object Person]";
        }

        getFullName(){
           return `${this.firstName} ${this.lastName}`;
        }
   }
```
```javascript
//ES5 Version
Employee.prototype = Object.create(Person.prototype);

function Employee(firstName, lastName, age, address, jobTitle, yearStarted) {
  Person.call(this, firstName, lastName, age, address);
  this.jobTitle = jobTitle;
  this.yearStarted = yearStarted;
}

Employee.prototype.describe = function () {
  return `I am ${this.getFullName()} and I have a position of ${this.jobTitle} and I started at ${this.yearStarted}`;
}

Employee.prototype.toString = function () {
  return "[object Employee]";
}

//ES6 Version
class Employee extends Person { //Inherits from "Person" class
  constructor(firstName, lastName, age, address, jobTitle, yearStarted) {
    super(firstName, lastName, age, address);
    this.jobTitle = jobTitle;
    this.yearStarted = yearStarted;
  }

  describe() {
    return `I am ${this.getFullName()} and I have a position of ${this.jobTitle} and I started at ${this.yearStarted}`;
  }

  toString() { // Overriding the "toString" method of "Person"
    return "[object Employee]";
  }
}
```

##### 45. 什么是模板字符串？
```javascript
var t = 'sss'
let str = `abc${t}ddd`

```

##### 46. 什么是对象解构？

```javascript
var t = {
  a:1, 
  b:2,
  c:3
}
var arr = [1,2,3]
let {a,b, c} = t
let [, i,j] = arr
```

###### 47. 什么是 ES6 模块？

模块使我们能够将代码基础分隔成多个文件，已获得更高的可维护性，并且避免将所有代码放在一个大文件中。在ES6 支持模块之前，有两个流行的模块
>- CommonJS-Node.js
>- AMD(异步模块协议) - 浏览器

基本上，使用模块的方式很简单，import用于从另一个文件中获取功能或几个功能或值，同时export用于从文件中公开功能或几个功能或值

导出
使用 ES5 (CommonJS)
```javascript
// 使用 ES5 CommonJS - helpers.js
exports.isNull = function (val) {
  return val === null;
}
exports.isUndefined = function (val) {
  return val === undefined;
}

exports.isNullOrUndefined = function (val) {
  return exports.isNull(val) || exports.isUndefined(val);
}
```
使用 ES6 模块

```javascript
// 使用 ES6 Modules - helpers.js
export function isNull(val){
  return val === null;
}

export function isUndefined(val) {
  return val === undefined;
}

export function isNullOrUndefined(val) {
  return isNull(val) || isUndefined(val);
}
```
在另一个文件中导入函数
```javascript
// 使用 ES5 (CommonJS) - index.js
const helpers = require('./helpers.js'); // helpers is an object
const isNull = helpers.isNull;
const isUndefined = helpers.isUndefined;
const isNullOrUndefined = helpers.isNullOrUndefined;

// or if your environment supports Destructuring
const { isNull, isUndefined, isNullOrUndefined } = require('./helpers.js');
-------------------------------------------------------

// ES6 Modules - index.js
import * as helpers from './helpers.js'; // helpers is an object

// or 

import { isNull, isUndefined, isNullOrUndefined as isValid } from './helpers.js';

// using "as" for renaming named exports
```
在文件中导出单个功能或默认导出

```javascript
// 使用 ES5 (CommonJS) - index.js
class Helpers {
  static isNull(val) {
    return val === null;
  }

  static isUndefined(val) {
    return val === undefined;
  }

  static isNullOrUndefined(val) {
    return this.isNull(val) || this.isUndefined(val);
  }
}


module.exports = Helpers;


// 使用 ES6 Modules - helpers.js
class Helpers {
  static isNull(val) {
    return val === null;
  }

  static isUndefined(val) {
    return val === undefined;
  }

  static isNullOrUndefined(val) {
    return this.isNull(val) || this.isUndefined(val);
  }
}

export default Helpers
```


###### 48. 什么是`Set`对象，它是如何工作的？
set 对象允许你存储任何类型的唯一值， 无论是原始值还是对象引用
我们可以使用Set 构造函数创建Set实例
```javascript
const set1 = new Set();
const set2 = new Set(["a","b","c","d","d","e"]);
```

可以使用add方法向Set实例中添加一个新值，因为add方法返回Set对象，所以我们可以以链式的方式再次使用add。如果一个值已经存在于Set对象中，那么它将不再被添加。

```javascript
set2.add("f");
set2.add("g").add("h").add("i").add("j").add("k").add("k");
// 后一个“k”不会被添加到set对象中，因为它已经存在了
```

```javascript

// 我们可以使用has方法检查Set实例中是否存在特定的值。
set2.has("a") // true
set2.has("z") // true

set2.size // returns 10

set2.clear(); // clear方法删除 Set 中的数据。

[...new Set(array)]
```


###### 49. 什么是回调函数？

回调函数是一段可执行的代码段，它作为一个参数传递给其他的代码，其作用是在需要的时候方便调用这段（回调函数）代码。

在JavaScript中函数也是对象的一种，同样对象可以作为参数传递给函数，因此函数也可以作为参数传递给另外一个函数，这个作为参数的函数就是回调函数

###### 50. Promise 是什么？

promise 异步编程的解决方案 
三种状态  
>- pending(等待态)，
>- fulfiled(成功态)，
>- rejected(失败态)；
状态一旦改变，就不会再变。创造promise实例后，它会立即执行。

```javascript
```
###### 51. 什么是 `async/await` 及其如何工作？
它是基于Promise构建的，这意味着幕后使用仍然是Promise。

使用 async关键声明函数会隐式返回一个Promise。

```javascript
const giveMeOne = async () => 1;

giveMeOne()
  .then((num) => {
    console.log(num); // logs 1
  });
```
###### 52. 展开运算符和Rest运算符有什么区别？

相反

```javascript
function add(a, b) {
  return a + b;
};

const nums = [5, 6];
const sum = add(...nums);
console.log(sum);

const [first, ...others] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(others); // [2,3,4,5]
```
###### 53. 什么是默认参数？
```javascript
var x = 1
function a (x=0, y=function(){x+=2}) {
  y()
  return x
}
a(3)
```
###### 54. 什么是包装对象（wrapper object）？
string -> String 等
```javascript
console.log(new String(name).toUpperCase()); // "MARKO"
```

###### 55. 隐式和显式转换有什么区别？

隐式强制转换是一种将值转换为另一种类型的方法，这个过程是自动完成的，无需我们手动操作

```javascript
console.log(1 + '6'); // 16
console.log(false + true); // 1
console.log(6 * '2'); // 12
```
显式强制是将值转换为另一种类型的方法，我们需要手动转换。

```javascript
console.log(1 + parseInt('6'));
```

###### 56. 什么是NaN？以及如何检查值是否为 NaN？

isNaN检测的时候： 当检测的值不是数字类型，浏览器会自己调用Number方法把它先转换为数字，然后再检测是否为非有效数字
```javascript
// isNaN： 检测当前是否不是有效数字  返回true 不是有效数字， 返回false 是有效数字
isNaN([value])
isNaN('12')//false
isNaN(true) // false
isNaN(false) // false
isNaN(null) // false
isNaN(undefined) // true
isNaN({xxx:'xxx'}) // true
isNaN([12,23]) // true
isNaN([12]) // false
isNaN(/^$/) // true
isNaN(function(){}) // true
```

###### 57. 如何判断值是否为数组？

```javascript
let arr = []
Array.isArray(arr)

arr.constructor 

Object.prototype.toString.call(arr)

arr instanceof Array
```

###### 58. 如何在不使用`%`模运算符的情况下检查一个数字是否是偶数？
使用按位&运算符 -> 并将其视为二进制值，然后执行与运算。
奇数最后一位 为1
```javascript
function isEven(num) {
  if (num & 1) {
    return false
  } else {
    return true
  }
}
```


###### 59. 如何检查对象中是否存在某个属性？

>- 使用 in 操作符号
>- hasOwnProperty
>- []

```javascript
const o = { 
  "prop" : "bwahahah",
  "prop2" : "hweasa"
};

console.log("prop" in o); // true
console.log("prop1" in o); // false

console.log(o.hasOwnProperty("prop2")); // true
console.log(o.hasOwnProperty("prop1")); // false

console.log(o["prop"]); // "bwahahah"
console.log(o["prop1"]); // undefined
```

###### 60. AJAX 是什么？

即异步的 JavaScript 和 XML，是一种用于创建快速动态网页的技术，传统的网页（不使用 AJAX）如果需要更新内容，必需重载整个网页面。使用AJAX则不需要加载更新整个网页，实现部分内容更新

用到AJAX的技术：
>- HTML - 网页结构
>- CSS - 网页的样式
>- JavaScript - 操作网页的行为和更新DOM
>- XMLHttpRequest API - 用于从服务器发送和获取数据
>- PHP，Python，Nodejs - 某些服务器端语言

###### 61. 如何在JavaScript中创建对象？
>- 字面量
>- 构造函数
>- Object.create


###### 62. Object.seal 和 Object.freeze 方法之间有什么区别？

Object.freeze() -- 啥都不能改

Object.freeze() 方法可以冻结一个对象。一个被冻结的对象再也不能被修改；冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。此外，冻结一个对象后该对象的原型也不能被修改。freeze() 返回和传入的参数相同的对象

Object.seal() 加不行改行  属性可写就可改
```javascript
Object.seal() //方法封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置。当前属性的值只要可写就可以改变
```

###### 63. 对象中的 in 运算符和 hasOwnProperty 方法有什么区别？

hasOwnPropert()方法返回值是一个布尔值，指示对象自身属性中是否具有指定的属性，因此这个方法会忽略掉那些从原型链上继承到的属性

in -> 指定的属性在指定的对象或其原型链中 （向上查）

###### 64. 有哪些方法可以处理javascript中的异步代码？
>-回调
>-Promise
>-async/await
>-还有一些库：async.js, bluebird, q, co

###### 65. 函数表达式和函数声明之间有什么区别？
```javascript
hoistedFunc();
notHoistedFunc();

function hoistedFunc(){
  console.log("注意：我会被提升");
}

var notHoistedFunc = function(){
  console.log("注意：我没有被提升");
}
```

###### 66. 调用函数，可以使用哪些方法？

```javascript
function a () {}
var b = {
  a:3,
  method: ()=>{}
}
new a()

a.apply/call
```

###### 67. 什么是缓存及它有什么作用？

缓存是建立一个函数的过程，这个函数能够记住之前计算的结果或值。使用缓存函数是为了避免在最后一次使用相同参数的计算中已经执行的函数的计算。这节省了时间，但也有不利的一面，即我们将消耗更多的内存来保存以前的结果。

###### 68. 手动实现缓存方法
```javascript
function memoize(fn) {
  const cache = {};
  return function (param) {
    if (cache[param]) {
      console.log('cached');
      return cache[param];
    } else {
      let result = fn(param);
      cache[param] = result;
      console.log(`not cached`);
      return result;
    }
  }
}

const toUpper = (str ="")=> str.toUpperCase();

const toUpperMemoized = memoize(toUpper);

toUpperMemoized("abcdef");
toUpperMemoized("abcdef");

```

```javascript
const slice = Array.prototype.slice;
function memoize(fn) {
  const cache = {};
  return (...args) => {
    const params = slice.call(args);
    console.log(params);
    if (cache[params]) {
      console.log('cached');
      return cache[params];
    } else {
      let result = fn(...args);
      cache[params] = result;
      console.log(`not cached`);
      return result;
    }
  }
}
const makeFullName = (fName, lName) => `${fName} ${lName}`;
const reduceAdd = (numbers, startingValue = 0) => numbers.reduce((total, cur) => total + cur, startingValue);

const memoizedMakeFullName = memoize(makeFullName);
const memoizedReduceAdd = memoize(reduceAdd);

memoizedMakeFullName("Marko", "Polo");
memoizedMakeFullName("Marko", "Polo");

memoizedReduceAdd([1, 2, 3, 4, 5], 5);
memoizedReduceAdd([1, 2, 3, 4, 5], 5);

```
###### 69. 为什么typeof null返回 object？如何检查一个值是否为 null？
=== 

###### 70. new 关键字有什么作用？
new关键字做了4件事:
>- 1、创建空对象
>- 2、空对象分配给this
>- 3、__proto__ 指向构造函数的constructor
>- 4、若没有显示返回 ，返回this

```javascript
function Person() {
 this.name = '前端小智'
}
// 创建一个空对象：var obj = {}
// 将空对象分配给 this 值：this = obj
// 将空对象的proto__`指向构造函数的`prototype`:`this.__proto = Person().prototype
// 返回this:return this
```
###### 71. 什么时候不使用箭头函数? 说出三个或更多的例子？

>- 当想要函数被提升时(箭头函数是匿名的)
>- 要在函数中使用this/arguments时，由于箭头函数本身不具有this/arguments，因此它们取决于外部上下文
>- 使用命名函数(箭头函数是匿名的)
>- 使用函数作为构造函数时(箭头函数没有构造函数)
>- 当想在对象字面是以将函数作为属性添加并在其中使用对象时，因为咱们无法访问 this 即对象本身

###### 72. Object.freeze() 和 const 的区别是什么？

const 声明一个只读的变量，一旦声明，常量的值就不可改变：
Object.freeze适用于值，更具体地说，适用于对象值，它使对象不可变，即不能更改其属性

###### 73. 如何在 JS 中“深冻结”对象？
```javascript
let person = {
    name: "Leonardo",
    profession: {
        name: "developer"
    }
};
Object.freeze(person); 
person.profession.name = "doctor";
console.log(person); //output { name: 'Leonardo', profession: { name: 'doctor' } }
```
// 递归
```javascript
function deepFreeze(object) {
    let propNames = Object.getOwnPropertyNames(object);
    for (let name of propNames) {
        let value = object[name];
        object[name] = value && typeof value === "object" ?
            deepFreeze(value) : value;
    }
    return Object.freeze(object);
}
```

###### 74. `Iterator`是什么，有什么作用？
遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署Iterator接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。

Iterator 的作用有三个：
>- 为各种数据结构，提供一个统一的、简便的访问接口；
>- 使得数据结构的成员能够按某种次序排列；
>- ES6 创造了一种新的遍历命令for…of循环，Iterator 接口主要供for…of消费。

遍历过程：
>- 创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。
>- 第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。
>- 第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。
>- 不断调用指针对象的next方法，直到它指向数据结构的结束位置。

每一次调用next方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含value和done两个属性的对象。其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束

```javascript
```
###### 75. `Generator` 函数是什么，有什么作用？

如果说 JavaScrip 是 ECMAScript 标准的一种具体实现、Iterator遍历器是Iterator的具体实现，那么Generator函数可以说是Iterator接口的具体实现方式。

执行Generator函数会返回一个遍历器对象，每一次Generator函数里面的yield都相当一次遍历器对象的next()方法，并且可以通过next(value)方法传入自定义的value,来改变Generator函数的行为。

Generator函数可以通过配合Thunk 函数更轻松更优雅的实现异步编程和控制流管理。


### 模拟点击事件

```javascript
let a = document.createElement("a"); 
let event = new MouseEvent("click"); 
a.download = `wxapp${this.fromSource?'-'+this.fromSource:''}` || "photo"
a.href = this.previewWxappQrCode; 
a.dispatchEvent(event);
```