### call 和 apply 的区别是什么,哪个性能更好一些

```javascript
/**
 * 1、call 和 apply 的区别是什么,哪个性能更好一些
 * call apply 都是 function 原型上的方法,都是改变this的指向,只不过一个是一个一个传,一个是数组,
 * bind 也是 预先改变 this  但是没有执行
 *
 * 参数超过三个的call的性能快些
 */
// fn.call(obj, 10,20,30);
// fn.apply(obj, [10,20,30])

let arr = [10, 20, 30],
  obj = {};
function fn(x, y, z) {}
fn.apply(obj, arr); //=> x=10,y=20,z=30
```

### 实现(5).add(3).minus(2) ,使其输出结果为 6

```javascript
/**
 * 实现(5).add(3).minus(2) ,使其输出结果为6
 */

~(function () {
  //=>每一个返回执行完都要返回NUmber这个类的实例,这样才可以继续调取Number类原型中的方法（链式写法）
  function check(n) {
    n = Number(n);
    return isNaN(n) ? 0 : n;
  }
  function add(n) {
    n = check(n);
    return this + n;
  }
  function minus(n) {
    n = check(n);
    return this - n;
  }
  ["add", "minus"].forEach((item) => {
    Number.prototype[item] = eval(item);
  });
})();
```

### 箭头函数和普通函数的区别是什么？构造函数可以使用 new 生成实例,那么箭头函数可以吗,为什么？、

```javascript
/**
 * 箭头函数和普通函数的区别
 *     1、箭头函数语法上比普通函数更加简洁(ES6 中,每一种函数都可以使用形参赋默认值和剩余运算符)
 *     2、箭头函数中没有自己的this,他里面出现的this从属于所属的上下文
 *     3、没有arguments,只能基于...args获取传递的参数集合
 *     4、箭头函数不能被new 执行,因为箭头没有this 从属所属上下文,没有给实例加所属属性,箭头函数没有prototype
 */

document.body.onclick = () => {
  //= > this： window 不是当前操作的DOM
};
document.body.onclick = function () {
  //= > this： body

  arr.sort(function (a, b) {
    // this: window 回调函数中的this一般都是window
    return a - b;
  });

  arr.sort((a, b) => {
    // this: body
    return a - b;
  });
};
```

### 实现一个\$attr(name, value)遍历

```javascript
/**
 *
 * 属性为name
 * 值为value的元素集合
 */
function $attr(property, value) {
  // 获取当前页面所有的元素标签
  let elements = document.getElementsByTagName("*"),
    arr = [];
  [].forEach.call(elements, (item) => {
    let itemValue = item.getAttribute(property);
    if (property === "class") {
      // 样式类属性名要特殊处理
      new EegExp("\\b" + value + "\\b").test(itemValue) ? arr.push(item) : null;
      return;
    }
    if (itemValue === value) {
      arr.push(item);
    }
  });
  return arr;
}
let arr = $attr("class", "box");
```

### 英文字母汉字组成的字符串,用公正则给英文单词前后加空格

```javascript
/**
 * 英文字母汉字组成的字符串,用公正则给英文单词前后加空格
 */
let str = "no作No死, 你能你can,不能no哔哔！",
  reg = /\b[a-z]+\b/gi;
str = str
  .replace(reg, (value) => {
    return " " + value + " ";
  })
  .trim();
```

### 数组扁平化,请去除其中重复的部分的数据,得到一个升序且不重复的数组

```javascript
/** ！！！！ 重要
 * 数组扁平化,请去除其中重复的部分的数据,得到一个升序且不重复的数组
 */
let arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];
// 方案一：
arr = arr.flat(Infinity);
// [...new Set(arr)]
// arr = Array.from(new Set(arr)).sort((a,b)=>a-b)

// 方案二： 把数组变为字符串即可,（数组toString之后,不管你有多少级,最后都会变为以逗号分隔的字符串,没有中括号和所谓的层级了）,相当于数组的扁平化
arr
  .toString()
  .split(",")
  .map((item) => Number(item));
arr.join("|").split(/(?:),|\|/g);

// 方案三： JSON.stringify()
JSON.stringify(arr).replace(/(\[|\])/g, "");

// 方案四：arr.some 基于数组的some方法来进行判断检测  while ...
while (arr.some((item) => Array.isArray(item))) {
  arr = [].concat(...arr);
}
// 方案五
let normalize = (arr) =>
  arr.reduce(
    (pre, cur, index, arr) =>
      cur.constructor === Array ? pre.concat(normalize(cur)) : pre.concat(cur),
    []
  );
// 方案六 递归
~(function () {
  function myFlat() {
    let res = [],
      _this = this;
    let fn = (arr) => {
      for (let index = 0; index < arr.length; index++) {
        const item = arr[index];
        if (Array.isArray(item)) {
          fn(item);
          continue;
        } else {
          res.push(item);
        }
      }
    };
    fn(_this);
    return res;
  }
  Array.prototype.myFlat = myFlat;
})();
```

### new 实现

```javascript
function _new(fn, ...args) {
  let obj = Object.create(fn.prototype);

  let result = fn.call(obj, ...args);

  if (result !== null && /^(object|function)$/.test(typeof result))
    return result;
  return obj;
}
```

### 数组合并

```javascript
let arr1 = ["A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2"];
let arr2 = ["A", "B", "C", "D"];

//=>数组合并 ['A1','A2','A', 'B1','B2','B','C1','C2','C','D1','D2','D']

arr2 = arr2.map((item) => item + "Z");
let arr = arr1.concat(arr2);
arr = arr
  .sort((a, b) => a.localeCompare(b))
  .map((item) => item.replace(/Z/g, ""));

let arr1 = ["D1", "D2", "A1", "A2", "C1", "C2", "B1", "B2"];
let arr2 = ["A", "B", "C", "D"];

let n = 0;
for (let i = 0; i < arr2.length; i++) {
  const item2 = arr2[i];
  for (let k = 0; k < arr1.length; k++) {
    const item1 = arr1[k];
    if (item.includes(item2)) {
      n = k;
    }
  }
  arr1.splice(n + 1, 0, item2);
}
```

### 匿名函数如果设置了函数名,在外面还是无法调用的,但是在函数里面还是可以使用的

```javascript
/**
 * 匿名函数如果设置了函数名,在外面还是无法调用的,但是在函数里面还是可以使用的
 * 相当于创建的是一个常量  不能修改
 */
var b = 10
(function b(){
  b = 20;
  console.log(b)
})()

### push实现
Array.prototype.push = function(val) {
  this[this.length] = val
  return this.length
}
let obj = {
  2:3,
  3:4,
  length:2,
  push:Array.prototype.push
}
obj.push(1)
obj.push(2)
console.log(obj)
```

### 四种基础排序

```javascript
/**
 * 冒泡排序
 */
let arr = [12, 8, 24, 16, 1];
for (var i = 0; i < arr.length - 1; i++) {
  for (var j = 0; j < arr.length - 1 - i; j++) {
    if (arr[j] > arr[j + 1]) {
      [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
    }
  }
}
console.log(arr);

Array.prototype.bubble = function bubble() {
  let _this = this,
    flag = false;
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
        flag = true;
      }
    }
    if (!flag) break; // 一轮之后没有动，说明已经排好了
    flag = false;
  }
};

/**
 * 插入排序
 */
let arr = [12, 8, 24, 16, 1];
let handle = [];
handle.push(arr[0]);
for (var i = 1; i < arr.length; i++) {
  let A = arr[i];
  for (let j = handle.length - 1; j >= 0; j--) {
    let B = handle[j];
    if (A > B) {
      handle.splice(j + 1, 0, A);
      break;
    }
    if (j === 0) {
      handle.unshift(A);
    }
  }
}
console.log(handle);

/**
 * 实现快排
 */
let arr = [12, 8, 15, 16, 1, 24];
var quickSort = function (arr) {
  if (arr.length <= 1) return arr;
  var pivotIndex = Math.floor(arr.length / 2);
  var pivot = arr.splice(pivotIndex, 1)[0];
  let left = [],
    right = [];
  for (let i = 0; i < arr.length; i++) {
    let cur = arr[i];
    if (cur < pivot) {
      left.push(cur);
    } else {
      right.push(cur);
    }
  }
  return quickSort(left).concat(pivot, quickSort(right));
};

/**
 * 希尔排序
 * 
 */
Array.prototype.shell = function shell() {
    let gap = Math.floor(this.length / 2);
    while (gap >= 1) {
        for (let i = gap; i < this.length; i++) {
            while (i - gap >= 0 && this[i] < this[i - gap]) {
                swap(this, i, i - gap);
                i = i - gap;
            }
        }
        gap = Math.floor(gap / 2);
    }
};
let arr = [58, 23, 67, 36, 40, 46, 35, 28, 20, 10];
arr.shell();
console.log(arr);
 

/**
 * 二分查找
 */
function binary_search(arr, key) {
  var low = 0;
  var high = nums.length - 1;
  var mid;
  while (low <= high) {
    mid = parseInt((high + low) / 2);
    if (target === nums[mid]) return mid;
    else if (target > nums[mid]) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return -1;
}
```

### 处理月份数据

```javascript
let obj = {
  1: 333,
  2: 3334,
  5: 434,
};
// 1-12月份其余为null  转数组
new Array(12).fill(null).map((item, index) => {
  return obj[index + 1] || null;
});
```

### 数组交叉并补

```javascript
/**
 * 求数组交集
 */
let num1 = [1, 2, 2, 1];
let num2 = [2, 2]; // 当nums2 [2]  ==> 有问题
//=> [2,2]
let arr = [];
num1.forEach((item) => (num2.includes(item) ? arr.push(item) : null));
console.log(arr);
// for (let i = 0; i < num1.length; i++) {
//   let item1 = num1[i];
//   for(let k = 0;k<num2.length; k++) {
//     let item2 = num2[k]
//     if(item1 === item2) {
//       arr.push(item1)
//       break;
//     }
//   }
// }
let arr1 = [1, 2, 3, 4, 5],
  arr2 = [5, 6, 7, 8, 9],
  _arr1Set = new Set(arr1),
  _arr2Set = new Set(arr2);
// 注意： 说明： 输出结果中的每个元素一定是唯一的
// 交集
let intersection = arr1.filter((item) => _arr2Set.has(item));

// 并集
let union = Array.from(new Set([...arr1, ...arr2]));

// 补集 两个数组各自没有的集合
let complement = [
  ...arr1.filter((item) => !_arr2Set.has(item)),
  ...arr2.filter((item) => !_arr1Set.has(item)),
];

// 差集 数组arr1相对于arr2所没有的
let diff = arr1.filter((item) => !_arr2Set.has(item));
```

### 旋转数组

```javascript
/**
 * 旋转数组
 * 给定一个数组,将数组中的元素向右移动k个位置,其中k是非负数
 * 输入：[1,2,3,4,5,6,7] 和 k = 3
 * 输出：[5,6,7,1,2,3,4]
 *
 * 解释：
 * 向右旋转1步 [7,1,2,3,4,5,6]
 * 向右旋转2步 [6,7,1,2,3,4,5]
 * 向右旋转2步 [5,6,7,1,2,3,4]
 *
 * 输入：[-1, -100, 3, 99] 和 k = 2
 * 输出：[3, 99,-1, -100]
 *
 * 解释：
 * 向右旋转1步 [99,-1, -100, 3]
 * 向右旋转2步 [3, 99,-1, -100]
 */
let arr = [7, 1, 2, 3, 4, 5, 6];
function rotate(k) {
  if (k < 0 || k == 0 || k === this.length) return arr;
  if (k > this.length) k = k % this.length;
  // return arr.slice(-k).concat(arr.slice(0,this.length-k));
  // return [...this.splice(this.length-k), ...this]
  // for(var i = 0; i<k; i++) {
  //   this.unshift(this.pop())
  // }
  // new Array(k).fill('').forEach(_=> this.unshift(this.pop()))
  Array.from({ length: k }, (v, i) => i).forEach((_) =>
    this.unshift(this.pop())
  );
  return this;
}
Array.prototype.rotate = rotate;
arr.rotate(3);
```

### 函数柯理化题

```javascript
/**
 * 函数柯理化：预先处理的思想(利用闭包的机制)
 */
~(function () {
  // =>this :需要改变this的函数
  // =>context: 需要改变的this指向
  // =>outerArgs: 其余需要传递给导函数的实参信息
  function myBind(context = window, ...outerArgs) {
    let _this = this;
    return function anonymous(...interArgs) {
      _this.call(context, ...outerArgs.concat(...interArgs));
    };
  }
  Function.prototype.myBind = myBind;
})();
/**
 * 实现一个add函数，满足
 */
add(1); //1
add(1)(2); //3
add(1)(2)(3); //6
add(1)(2)(3)(4); //10
add(1), (2, 3); //6
add(1, 2)(3); //6
add(1, 2, 3); //6

function currying(fn, length) {
  length = length || fn.length;
  return function (...args) {
    if (args.length === length) {
      return fn(...args);
    }
    return currying(fn.bind(null, ...args), length - args.length);
  };
}
function add(n1, n2, n3, n4) {
  return n1 + n2 + n3 + n4;
}
// let add = currying(add, 4)
let add = currying((...args) => eval(args.join("+")), 4);
console.log(add(1)(2)(3)(4));
console.log(add(1, 2)(3, 4));

// 修改返回的内容函数的toString

// 固定每次执行只有一个参数
function add(x) {
  var sum = x;
  var tmp = function (y) {
    sum = sum + y;
    return tmp;
  };
  tmp.toString = function () {
    return sum;
  };
  return tmp;
}
```

### 基于 instanceof

```javascript
// / 基于 instanceof  可以检测；
// 实例是否属于某个类，现在需要自己编写这个的方法；
// 实现出instanceof的效果
function instanceOfDemo(example, classFunc) {
  example = example.__proto__;
  classFunc = classFunc.prototype;
  while (true) {
    if (example == null) {
      return false;
    }
    if (example === classFunc) {
      return true;
    }
    example = example.__proto__;
  }
}
```

### 变量提升

```javascript
//8
/**
 * EC(G)
 *  变量提升： function foo；  大括号的只声明 不定义
 */
{
  /**
   * EC(BLOCK)
   *  变量提升： function foo(){} 声明 + 定义
   */
  function foo() {} // 因为此函数在全局下声明过，再私有中也声明过(处理： 把之前对于foo 操作映射给全局一份（全局的定义了）,但是下面的操作都认为是私有foo的操作了)

  foo = 1;
  // 私有 => 1
}
console.log(foo); // foo 函数

// 全局 function foo;
{
  // 私有 function foo() {}  /  function foo(){}
  // foo 是最后的这个函数
  function foo() {} // 之前的代码映射到全局
  foo = 1;
  function foo() {} // 之前的代码映射到全局  全局  变成 1 私有 也是 1
}
console.log(foo); // 1
{
  function foo() {}
  foo = 1;
  function foo() {}
  foo = 2; // 私有2
}
console.log(foo); // 1
```

### 链式调用

```javascript
console.log("start");
new Promise((resolve, reject) => {
  console.log("进入执行第一个promise");
  setTimeout((_) => console.log(1), 3000);
});
new Promise((resolve, reject) => {
  console.log("进入执行第二个promise");
  setTimeout((_) => console.log(2), 2000);
});
new Promise((resolve, reject) => {
  console.log("进入执行第三个promise");
  setTimeout((_) => console.log(3), 1000);
});
console.log("end");
/**
 * 1 实现 new Queue()
 *  .task(1, 3000)
 *  .task(2, 2000)
 *  .task(3, 1000)
 *  .run()
 *
 *  6s 内执行
 */
class Queue {
  constructor() {
    this.tasks = [];
  }
  task(val, wait) {
    this.tasks.push(function () {
      return new Promise((resolve, reject) =>
        setTimeout((_) => (console.log(val), resolve()), wait)
      );
    });
    return this;
  }
  run() {
    let result = this.tasks[0]();
    for (let i = 1; i < this.tasks.length; i++) {
      result = result.then(this.tasks[i]);
    }
  }
}
new Queue().task(1, 3000).task(2, 2000).task(3, 1000).run();
```

### 掌握盒子水平垂直居中的五大方案

> - 定位 三种
> - display: flex
> - JavaScript
> - display:table-cell

```html
<style>
  body {
    height: 100%;
    overflow: hidden;
  }
  .box {
    width: 100px;
    height: 50px;
    line-height: 48px;
    box-sizing: border-box;
    text-align: center;
    font-size: 16px;
    border: 1px solid lightblue;
    background: lightcyan;
  }
  /*d定位1 -三种*/
  /* body{
  position: relative;
} */
  /* 知道宽高 */
  /* .box{ 
  position: absolute;
  top: 50%;
  left:50%;
  margin-top: -25px;
  margin-left: -50px;
} */
  /* 不考虑宽高，但是必须得有宽高 */
  /* .box{
  top: 0 ;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
} */
  /* 不需要知道具体宽高， 不兼容 */
  /* .box{
  position: absolute;
  top: 50%;
  left:50%;
  transform: translate(-50%,-50%);
} */
  /* flex */
  /* body {
  display: flex;
  justify-content: center;
  align-items: center;
} */
  /* javascript */

  /* table 父级必须有固定宽高*/
  body {
    display: table-cell;
    vertical-align: middle;
    text-algin: center;
  }
  .box {
    display: inline-block;
  }
</style>
<div class="box" id="box"></div>
<script>
  let html = document.documentElement,
    // box = document.getElementById('box')
    winW = html.clientWidth,
    winH = html.clientHeight,
    boxW = box.offsetWidth,
    boxH = box.offsetHeight; // box 可以不用获取  有id 作属性

  box.style.position = "absolute";
  box.style.left = (winW - boxW) / +"px";
  box.style.top = (winH - boxH) / +"px";
</script>
```

### 关于 CSS3 中盒模型的

标椎盒子模型：最常用的 box-sizing: border-box width 就是 content 的宽， 盒子的 宽高 是 由内容 + padding + border 。真是项目可能会遇到问题。 设置 width/height 为 100 的时候，设置了 border 实例占位置就大了，会出现掉下来的情况。后来 css3 使用 box-sizing： border-box 可以使用 ie 的盒模型， width 就是内容的宽。element-UI 和 bootstarp 等源码中大部分使用的也是让盒子默认使用 box-sizing： border-box.

怪异盒子模型：width = content+ border+ padding
flex 弹性伸缩盒子模型：

### 两列定宽中间自适应 三列布局

负 margin + 浮动
calc 计算性能慢
flex
定位

### 移动端响应式布局三大方案

> - media
> - rem
> - flex
> - vh/vw
> - ...

### 闭包

```javascript
var a = 0,
  b = 0;
function A(a) {
  A = function (b) {
    alert(a + b++);
  };
  alert(a++);
}
A(1); // '1'
A(2); // '4'
```

##### 对象（数组） 的深克隆和浅克隆

```JavaScript
var obj = {
  a:100,
  b:[10,20,30],
  c: {
    x:10
  },
  d: /^\d+$/
}

// 浅克隆
let obj2 = {}
for(let key in obj) {
  if(!obj.hasOwnProperty(key)) break;
  obj2[key] = obj[key];
}

// es6 浅克隆
obj2 = {...obj}

// 深克隆
let obj2 = JSON.parse(JSON.stringify(obj)) // 函数 -> 没了 、日期->日期字符串、正则 -> {} 都会出现问题


function deepClone(obj) {
  if(obj instanceof null) return null;
  if(typeof obj !== 'object') return obj;
  if(obj instanceof Function) return new Function(obj)
  if(obj instanceof RegExp)  return new RegExp(obj)
  if(obj instanceof Date) return new Date(obj)
  // 不直接创建空对象，目的让克隆的结果和之前保持相同的所属类
  let newObj = new obj.constructor;
  for(let key in obj) {
    if(obj.hasOwnProperty(key)) {
      newObj[key] = deepClone(obj[key])
    }
  }

  return newObj;
}
```

### 面向对象 同步异步

变量提升
Foo = AAAFFF000
getName = func -> 5
代买执行
getName= func-> 4

```javascript
function Foo() {
  getName = function () {
    console.log(1);
  };
  return this;
}
Foo.getName = function () {
  console.log(2);
};
Foo.prototype.getName = function () {
  console.log(3);
};
var getName = function () {
  // 代码执行
  console.log(4);
};
function getName() {
  console.log(5);
}
Foo.getName(); // 2
getName(); // 4
Foo().getName(); // 1 (Foo()).getName()   Foo普通函数执行  return this ==》window
getName(); // 1
// 无参数new 18  和 有参数 new .成员访问19  相同的优先级的从左到右执行
new Foo.getName(); // 2 Foo.getName -> func -> 2
new Foo().getName(); // 3 先执行newFoo（） 实例上getName 为 原型上的getName
new new Foo().getName(); // 3 new Foo() 实例 xxx => new xxx.getName()  new func->3  --> 3
```

同步异步

```javascript
/**
 * JS中的同步异步编程
 * 1、浏览器只分配一个线程，用来执行JS代码(一次只能做一个事情 => 同步)
 * 2、任务队列的机制： 遇到需要异步执行的任务（客户端： 定时器、事件绑定、AJAX、Promise、await），先把任务放置在任务队列中，接下来继续执行同步任务，
 * 当同步任务都执行完了，浏览器渲染线程闲下来了，再去任务队列中，按照指定顺序把异步任务拿出来执行......
 *  => Event Loop
 *  => Event Queue:  微任务 宏任务  （先找微任务，再找宏任务）
 */
new Promise((resolve, reject) => {
  // 立即把这个函数执行
  resolve(); // 异步=> 方法执行，不是立即通知then中存放的方法执行，而是一个异步的，等一些事情处理完，再把promise状态改变，并且通知指定的方法执行
}).then(result=>{}, reason=>{})

// async 把当前函数返回promise实例
async function func() {
  // 遇到await 先把func2执行，看他的返回结果，await必须保证返回的是成功态，才会把下面代码执行
  // 异步体现在await下面的代码先不执行，等func2返回成功才会执行
  await func2();
  console.log('ok')
  // 默认返回promise实例
}
// ========
/** promise和await 是微任务
 * 任务队列
 *  微任务：1、await(下面代码) 2、Resolve(通知then中的第一个方法执行)
 *  宏任务：1.定时器(5ms 执行代码)
 */
async function async1() {
  console.log('async1 start'); // => 2
  await async2();
  console.log('async1 end'); // => 6
}
async function async2() {
  console.log('async2'); // => 3
}
console.log('script start'); // => 1
setTimeout(function () {
  console.log('setTimeout'); // => 9
}, 0)
async1();
new Promise(function (resolve) {
  console.log('promise1'); //=> 4
  resolve();
}).then(function () {
  console.log('promise2'); // => 7
}).then(res=> {
  console.log('promise3'); // 8
});
console.log('script end'); // => 5
// ----浏览器渲染线程空闲下来了  去任务队列中找微任务
// 正常微任务的执行顺序，谁先放置的谁先执行 (不同V8 的版本对于它的处理会有所偏差)
// 微任务1
// 微任务2
// 宏任务1
'script start'
'async1 start'
'async2'
'promise1'
'script end'
'async1 end'
'promise2'
'promise3'
'setTimeout'



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

1 4 'func1 start' 'func2 start' 8 5 2 'func1 start' 3 7 6
```

作业

```javascript
function A() {
  alert(1);
}
function Fn() {
  A = function () {
    alert(2);
  };
  return this;
}
Fn.A = A;
Fn.prototype = {
  A: () => {
    alert(3);
  },
};

A(); // '1'
Fn.A(); // '1'
Fn().A(); // '2'
new Fn.A(); // '1'
new Fn().A(); // '3'
new new Fn().A(); // 报错，箭头函数不能被new
```

```javascript
var x = 2;
var y = {
  x: 3,
  z: (function (x) {
    this.x *= x;
    x += 2;
    return function (n) {
      this.x *= n;
      x += 3;
      console.log(x);
    };
  })(x),
};
var m = y.z;
m(4); // 7
y.z(5); // 10
console.log(x, y.x); // 16 15
```

```javascript
var x = 0,
  y = 1;
function fn() {
  x += 2;
  fn = function (y) {
    console.log(y + --x);
  };
  console.log(x, y);
}
fn(3); // 2 1
fn(4); // 5
console.log(x, y); // 1 1
```

```javascript
setTimeout(() => {
  console.log(1);
}, 20);
console.log(2);
setTimeout(() => {
  console.log(3);
}, 10);
console.log(4);
console.time("AA");
for (let i = 0; i < 90000000; i++) {}
console.timeEnd("AA"); // 79ms 左右
console.log(5);
setTimeout(() => {
  console.log(6);
}, 8);
console.log(7);
setTimeout(() => {
  console.log(8);
}, 15);
console.log(9);
// 2
// 4
// AA: 58.51123046875ms
// 5
// 7
// 9
// undefined
// 3
// 1
// 6
// 8
```

### vue 和 react

vue 2.0 /3.0 双向数据绑定

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="view"></div>
    <input type="text" id="input" />
    <script>
      // 2.0
      let obj = {
        name: "",
      };
      let newObj = JSON.parse(JSON.stringify(obj));
      Object.defineProperty(obj, "name", {
        get() {
          return newObj.name;
        },
        set(val) {
          if (val === newObj.name) return;
          newObj.name = val;
          observer();
        },
      });
      function observer() {
        view.innerHTML = obj.name;
        input.value = obj.name;
      }
      observer();
      setTimeout(() => {
        obj.name = "哈哈哈";
      }, 1000);
      input.oninput = function () {
        obj.name = this.value;
      };
      /**
       * 1、对原始数据克隆
       * 2、需要分别给对象中每一个属性都设置监听
       */
    </script>
    <script>
      // 3.0  不需要克隆一份  也不需要给对象每个属性都设置
      let obj = {};
      obj = new Proxy(obj, {
        get(target, prop) {
          console.log("A");
          return target[prop];
        },
        set(target, prop, value) {
          console.log("B");
          target[prop] = value;
          observer();
        },
      });
      function observer() {
        view.innerHTML = obj.name;
        input.value = obj.name;
      }
      observer();
      setTimeout(() => {
        obj.name = "哈哈哈";
      }, 1000);
      input.oninput = function () {
        obj.name = this.value;
      };
    </script>
  </body>
</html>
```

### MVC 和 MVVM 区别

MVC onchange 就是 vue 的视图更新 影响 数据

```javascript
import React from "react";
import ReactDOM from "react-dom";

class A extends React.Component {
  state = {
    name: "",
  };
  render() {
    let { name } = this.state;
    return (
      <>
        姓名： <span>{name}</span>
        <br />
        <input
          type="text"
          value={name}
          onChange={() => {
            this.setState({
              name: ev.target.value,
            });
          }}
        />
      </>
    );
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        name: "hahhh",
      });
    }, 1000);
  }
}
ReactDOM.render(
  <>
    <A />
  </>,
  document.getElementById("root")
);
```

### 算法

```javascript
var arr = [1,2,3,2,3,4,3,4,5]
/**
 * 方案一：双循环
 * 1、依次拿出数组中的每一项(排除最后一项)
 * 2、和当前拿出项后面的每一项依次比较
 * 3、如果返现有重复的，把找到的这个重复向在数组中删除掉（splice）
 **/
for(var i = 0;i < arr.length-1; i++) {
  var item = arr[i];
  for(var j = i+1; j<arr.length; j++) {
    if(item === arr[j]) {
      // arr.splice(k, 1); // 这里有问题  数组塌陷问题
      arr.splice(k, 1) ;// 删除后不能让k累加了
      k--; // 删除后先减减， 再加加的时候相当于没加没减
    }
  }
}

/**
 * 方案二：
 * 基于对象的属性名不能重复，实现高性能的数组去重
 **/
var map = {}
for(var i = 0; i< arr.length; i++) {
  var item = arr[i] // 把这一项作为对象的属性名和属性值
  if(typeof map[item] !== 'undefined') {
    // arr.splice(i,1);
    // i--
    /*
    1、把数组最后一项替换当前项
    2、删除最后一项
    */
    arr[i] =arr[arr.length-1]
    arr.length--
    i--
    continue;
  }
  map[item] = item
}
// 其它方案
var array =[];
for(var i = 0; i < arr.length; i++) {
  if( !array.includes( arr[i]) ) {//includes 检测数组是否有某个值
    array.push(arr[i]);
  }
}
return array

arr.filter((x, index, arr)=>arr.indexOf(x) === index)
arr.reduce((prev,cur) => prev.includes(cur) ? prev : [...prev,cur],[]);
Array.from(new Set(arr))
[...new Set(arr)]
// 1 先排序，后与前不相等
arr.sort((a,b)=>a-b)
arr = arr.join('@') + '@'
let reg = /(\d+@)\1*/g;
let arr2 = []
arr.replace(reg, (val, group1)=> {
  console.log(val, group1)
  arr2.push(Number(group1.slice(0, group1.length-1)))
})
console.log(arr2)



```
### 类数组转数组
```javascript
Array.from(arguments)
Array.prototype.slice.call(arguments)
[...arguments]

Array.prototype.concat.apply([], arguments)
```
### 斐波那契数列

实现一个 fibonacci 函数，要求实现以下的功能
斐波那契数列 1 1 2 3 5 6 12 21 ...
fibonacci(0) -> 1
fibonacci(4) -> 5

```javascript
function fibonacci(n) {
  if (n <= 1) return 1;
  let arr = [1, 1];
  // 即将要创建多少个
  let i = n + 1 - 2;
  while (i > 0) {
    arr.push(arr[arr.length - 1] + arr[arr.length - 2]);
    i--;
  }
  return arr[arr.length - 1];
}

function fibonacci(count) {
  function fn(count, curr = 1, next = 1) {
    if (count == 0 || count == 1) {
      return curr;
    } else {
      return fn(count - 1, next, curr + next);
    }
  }
  return fn(count);
}
```

### 输入正数 N， 输出所有和为 N 的连续正数序列

例如 输入 15
结果 [[1,2,3,4,5],[4,5,6], [7,8]]

```javascript
// 从N开始计算连续M个正数序列和
// 1 + （1+1） + （1+ 1+ 1）。。
// N M
// N +( N +1) + (N+2) + ... (N + M -1)
//=> (N + (N + M -1)) * M /2

function fn(count) {
  let result = [];
  let middle = Math.ceil(count / 2);

  // c从1 开始累加
  for (let i = 1; i <= middle; i++) {
    // 控制累加多少次
    for (let j = 2; ; j++) {
      // 求累加多次的和
      let total = (i + (i + j - 1)) * (j / 2);
      if (total > count) {
        break;
      } else if (total === count) {
        result.push(createArr(i, j));
        break;
      }
    }
  }
  return result;
}
function createArr(n, len) {
  let arr = new Array(len).fill(null),
    temp = [];
  arr[0] = n;
  arr = arr.map((item, index) => {
    if (item === null) {
      item = temp[index - 1] + 1;
    }
    temp.push(item);
    return item;
  });
  return arr;
}
```

```javascript
// 扩展
// 输入一位数组array和n , 找出和值为sum 的n 个元素即可
let array = [2, 3, 1, 10, 4, 30],
  n = 2,
  sum = 31;
function findGroup(arr, n, sum) {
  // 动态规划
}
let result = findGroup(array, 2, 31);
console.log(result);
// result =[1,30] TOD
```

```javascript
// 输入任意对象，任意参数路径能获取对应的值的 js 函数
get(obj, "selector.to.toutiao", "target[0]", "target[2].name");
var obj = {
  selector: {
    to: { toutiao: "FE Coder" },
  },
  target: [1, 2, { name: "byted" }],
};
function get(data, ...args) {
  const res = JSON.stringify(data);
  var a = args.map((item) => new Function(`return ${res}.${item} `)());
  console.log(a);
}
```

```javascript
// 输入 任意对象， 任意参数  安全检车并返回对应的值
function safeAccessObj(obj, ...args) {
  if (!obj) return null;
  let result = [];
  let reg = /([a-zA-Z_$]+[a-zA-Z_$0-9]*)|\[([0-9]+)\]*/g;
  args.forEach((item) => {
    let arr = execAll(reg, item);
    let t = arr.reduce((pre, cur) => {
      if (typeof pre !== "object") return pre;
      if (cur.indexOf("[") !== -1) {
        // return pre[cur.replace(/\[([0-9]+)\]/, "$1")]
        return eval(`pre${cur}`);
      } else {
        return pre[cur];
      }
    }, obj);
    result.push(t);
  });
  return result;

  // path.replace(/[a-zA-Z]+|\[([0-9]+)\]/g, (a, b) => {console.log(b)})
  // 'a.b.c[9].d[33]'.replace(/([a-zA-Z]+)|\[([0-9]+)\]/g, (a, b,c) => {console.log(a, '-',b,c)})
}
console.log(
  safeAccessObj(
    {
      a: {
        b: { c: [0, 1, { d: "hahha" }, 3, { name: "name000" }] },
        m: "dsafads",
      },
    },
    "a.b.c[2].d",
    "a.m"
  )
);
// console.log(safeAccessObj({a:{b:{c:[0,1,{d:'hahha'},3,{name:'name000'}]}}}, 'a.b.c'))

function execAll(reg, str) {
  let arrRes = [];
  let res = reg.exec(str);

  while (res) {
    let [big] = res;
    arrRes.push(big);
    res = reg.exec(str);
  }
  return arrRes;
}
// console.log(execAll(/([a-zA-Z_$]+[a-zA-Z_$0-9]*)|\[([0-9]+)\]*/g, 'a.b.v[9].name'))
```
