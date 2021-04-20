/* 
  平时练或者看过的一些，记录理解的一些东西，出处有些记不清，放在这里作为笔记记录，不做商业用途，若需要注明，请评论，或者告知删
*/
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
  console.log('baidu' && 'google');
};
var getName = function () {
  console.log(4);
};
function getName() {
  console.log(5);
}

/* 
在JavaScript预编译的时期 
变量、函数声明 提前
Foo(){}
Foo.getName;
Foo.prototype.getName;
var getName;
getName(){}


最后getName ---4
*/
// 请写出一下的输出结果
Foo.getName(); //2
getName(); //4
Foo().getName();//1  
getName();  //1
new Foo.getName();//2  
new Foo().getName();  //google
new new Foo().getName();//google
/* 
分析按”@小小沧海“博客很清晰。
首先定义了一个叫Foo的函数，
之后为Foo创建了一个叫getName的静态属性存储了一个匿名函数，
之后为Foo的原型对象新创建了一个叫getName的匿名函数。
之后又通过函数变量表达式创建了一个getName的函数，最后再声明一个叫getName函数。

第一问的 Foo.getName 自然是访问Foo函数上存储的静态属性，自然是2，没什么可说的。
第二问，直接调用 getName 函数。既然是直接调用那么就是访问当前上文作用域内的叫getName的函数，所以跟1 2 3都没什么关系。
此处有两个坑，一是变量声明提升，二是函数表达式。
function Foo() {
    getName = function () { alert (1); };
    return this;
}
var getName;//只提升变量声明
function getName() { alert (5);}//提升函数声明，覆盖var的声明

Foo.getName = function () { alert (2);};
Foo.prototype.getName = function () { alert (3);};
getName = function () { alert (4);};//最终的赋值再次覆盖function getName声明

getName();//最终输出4

第三问的 Foo().getName(); 先执行了Foo函数，然后调用Foo函数的返回值对象的getName属性函数。

Foo函数的第一句  getName = function () { alert (1); };  是一句函数赋值语句，注意它没有var声明，所以先向当前Foo函数作用域内寻找getName变量，没有。再向当前函数作用域上层，即外层作用域内寻找是否含有getName变量，找到了，也就是第二问中的alert(4)函数，将此变量的值赋值为 function(){alert(1)}。 

此处实际上是将外层作用域内的getName函数修改了。

注意：此处若依然没有找到会一直向上查找到window对象，若window对象中也没有getName属性，就在window对象中创建一个getName变量

简单的讲，this的指向是由所在函数的调用方式决定的。而此处的直接调用方式，this指向window对象。

遂Foo函数返回的是window对象，相当于执行 window.getName() ，而window中的getName已经被修改为alert(1)，所以最终会输出1

此处考察了两个知识点，一个是变量作用域问题，一个是this指向问题
第四问
直接调用getName函数，相当于 window.getName() ，因为这个变量已经被Foo函数执行时修改了，遂结果与第三问相同，为1

第五问 new Foo.getName(); ,此处考察的是js的运算符优先级问题。
-------（.）的优先级高于new操作 new (Foo.getName)();
可知这一步的顺序用应该是
    1、Foo.getName
    把Foo函数当作对象，查找里边属性名为getName的
    在图中找到是：function(){console.log(2);};(我们暂且把他命名为A)
    2、new A();
    让函数A执行
    => 2
    同时创建一个A函数的实例；（由于函数A里面没有带this的，所以实例中没有键值对） (在此题中没有用到，我们就先不画图了)

第六问 new Foo().getName() ，首先看运算符优先级括号高于new，实际执行为
(new Foo()).getName()
遂先执行Foo函数，而Foo此时作为构造函数却有返回值，所以这里需要说明下js中的构造函数返回值问题。
1、new Foo();
  让函数Foo执行
    >-重新给全局设置getName属性（步骤同第三步一致）
    >-同时创建一个Foo函数的实例；（由于函数Foo里面return this）
    >-返回这个实例（没有键值对的空对象）
2、实例.getName();
  由于实例中没有getName这个属性，所以通过作用域链，向上级查找是
  由图可以看出输出的是Foo.prototype上的getName
  => 3


第七问, new new Foo().getName(); 同样是运算符优先级问题。
最终实际执行为：
new ((new Foo()).getName)();
先初始化Foo的实例化对象，然后将其原型上的getName函数作为构造函数再次new。
遂最终结果为3
1、new Foo();
  让函数Foo执行
    重新给全局设置getName属性（步骤同第三步一致）
    同时创建一个Foo函数的实例；（由于函数Foo里面return this）
    返回这个实例（没有键值对的空对象）
2、new 新实例.getName();
  优先级问题
  1、新实例.getName
    找到新实例中的getName方法，新实例中没有这个方法所以向原型查找；找到的是function (){console.log(3);};我们假设为B
3、new B();
  让函数B执行；
  => 3
  同时创建一个B函数的实例；

这里确实是(new Foo()).getName()，但是跟括号优先级高于成员访问没关系，
实际上这里成员访问的优先级是最高的，因此先执行了 .getName，但是在进行左侧取值的时候，
 new Foo() 可以理解为两种运算：new 带参数（即 new Foo()）和函数调用（即 先 Foo() 取值之后再 new），
 而 new 带参数的优先级是高于函数调用的，因此先执行了 new Foo()，或得 Foo 类的实例对象，再进行了成员访问 .getName。
 */

/* 
  构造函数返回值问题
  在传统语言中，构造函数不应该有返回值，实际执行的返回值就是此构造函数的实例化对象。
  而在js中构造函数可以有返回值也可以没有。

  1、没有返回值则按照其他语言一样返回实例化对象。
  2、若有返回值则检查其返回值是否为引用类型。如果是非引用类型，
   如基本类型（string,number,boolean,null,undefined）则与无返回值相同，实际返回其实例化对象。
  3、若返回值是引用类型，则实际返回值为这个引用类型

*/

function fun(n, o) {
  console.log(o)
  return {
    fun: function (m) {
      return fun(m, n);
    }
  };
}

var a = fun(0); a.fun(1); a.fun(2); a.fun(3);
var b = fun(0).fun(1).fun(2).fun(3);
var c = fun(0).fun(1); c.fun(2); c.fun(3);


//如何在js代码中消除for循环
//问题一： 将数组中的 "0" 和空值去除
const arrContainsEmptyVal = [3, 4, 5, 2, 3, undefined, null, 0, ""];
const compact = arr => arr.filter(Boolean)
// 问题二： 判断字符串中是否含有元音字母
const randomStr = "hdjrwqpi";
const isVowel = char => ["a", "e", "o", "i", "u"].includes(char);
const containsVowel = str => [...str].some(isVowel);
var falg = containsVowel(randomStr);//true
// 將數組中的 VIP 用户餘額加 10
const VIPUsers = [
  { username: "Kelly", isVIP: true, balance: 20 },
  { username: "Tom", isVIP: false, balance: 19 },
  { username: "Stephanie", isVIP: true, balance: 30 }
];

VIPUsers.map((user) => {
  user.isVIP ? user.balance + 10 : user
})
VIPUsers.map(
  user => (user.isVIP ? { ...user, balance: user.balance + 10 } : user)
)
// 問題四：判斷用户是否全部是成年人

const users = [
  { name: "Jim", age: 23 },
  { name: "Lily", age: 17 },
  { name: "Will", age: 25 }
];

const t = users.every(user => {
  return user.age < 18;
})
//查询用户不是成年人的
const arr = users.find(user => user.age < 18)

// 問題六：將數組中重複項清除

const dupArr = [1, 2, 3, 3, 3, 3, 6, 7];
const uniq = [...new Set(dupArr)]

// 問題七：生成由随机整数组成的数组，数组长度和元素大小可自定义 !!!
const genNumArr = (length, limit) => {
  return Array.from({ length }, _ => Math.floor(Math.random() * limit))
}
genNumArr(10, 100)
// Array.from(arrayLike, mapFn, thisArg) <==>Array.from(arrayLike).map(mapFn, thisArg)
/* 
  参数：
    arrayLike：想要转换成数组的伪数组对象或可迭代对象。
    mapFn（可选）：如果指定了该参数，新数组中的每个元素会执行该回调函数，就是在生成的数组上在执行一次map方法在返回。
    thisArg（可选）：执行回调函数mapFn时this对象
  作用：
    将类似数组的对象和可遍历对象 转换成真正的数组
    1、伪数组对象（拥有一个length属性和若干索引属性的任意对象）
    2、可迭代对象（可以获取对象中的元素，如map和set等
 */
//字符串转换
Array.from('function')
//将字符串转为数组，然后返回字符串的长度。
//因为它能正确处理各种 Unicode 字符，可以避免 JavaScript 将大于\uFFFF的 Unicode 字符，算作两个字符的 bug。
Array.from('qwerty').length
//6

//含有length的类似数组对象转换
let arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  'length': 3
}
let arr2 = Array.from(arrayLike);//['a','b','c']
//只含有length的对象转换
Array.from({ length: 2 })
//[undefined,undefined]

//set转换
let s = new Set(['foo', 'aa']);
Array.from(s);
// ["foo", 'aa']

//map转换
let m = new Map([[1, 2], [2, 4], [4, 8]]);
Array.from(m);
// [[1, 2], [2, 4], [4, 8]]

//arguments数组转换
function f() {
  return Array.from(arguments);
}
f(1, 2, 3);
// [1, 2, 3]
// 实际应用中，常见的类似数组的对象是 DOM 操作返回的 NodeList 集合，转换成数组
let ps = document.querySelectorAll('p');
let a = Array.from(ps);

//使用第二个参数
Array.from([1, 3, 4], x => x + 10)//[11,13,14]

Array.from({ length: 5 }, (v, i) => i);
// [0, 1, 2, 3, 4]
//取出一组 DOM 节点的文本内容。
let ps = document.querySelectorAll('span');
let a = Array.from(ps, s => s.textContent);
//["1", "2", "3", "4", "5"]

function combine() {
  let arr = [].concat.apply([], arguments);  //[1, 2, 2, 2, 3, 3]没有去重复的新数组 
  return Array.from(new Set(arr));//new Set(arr): Set(3) {1, 2, 3}
}

var m = [1, 2, 2], n = [2, 3, 3];
console.log(combine(m, n)); // [1, 2, 3]
// 使用thisArg绑定this
//这里this就指向了{a:1}
Array.from([1, 2, 3], x => { return x + this.a }, { a: 1 });
//[2, 3, 4]
function args() {
  return Array.prototype.slice.apply([], arguments)
}

//给出一个函数，传入三个参数，函数，执行次数，间隔时间
function func(fn, n, time) {
  ;
  return function (x) {
    for (let i = 0; i < n; i++) {
      setTimeout(() => {
        fn(x)
      }, i * time);
    }
  }
}
var t = func(window.alert, 4, 3000);
t('hello')

// 类数组转成数组
function similarArrayToArray(arr) {
  // return Array.prototype.slice.call(arguments)
  // return Array.from(arguments)
  return [...arguments]
}

console.log('beging')
setTimeout(() => {
  console.log('setTimeout')
  Promise.resolve().then(() => {
    console.log('promise1')
    setTimeout(() => {
      console.log('setTimeout promis1 && promis2')
    })
  }).then(() => {
    console.log('promise2')

  }).then(() => {
    console.log('ssss')
  })
}, 0)
new Promise((resolve, reject) => {
  console.log('eeeee')
  // for(let i =0;i<99;i++){
  //     console.log('chuce')
  //     resolve();
  // }
  console.log('sdfasd')
}).then(() => {
  console.log('then')
})
console.log('end')

/* 3 4 1 */
setTimeout(function () {
  console.log(1);
}, 0)

Promise.resolve(function () {
  console.log(2);
})
new Promise(function (resolve) {
  console.log(3);
})
console.log(4)
// 结束

const promise = new Promise((resolve, reject) => {
  console.log(1);
  resolve();
  console.log(2);
})

promise.then(() => {
  console.log(3);
})

console.log(4);
// 1 2 4 3  先输出1 2 ，而 Promise.then() 内部的代码在 当次 事件循环的 结尾 立刻执行 ，所以会继续输出4，最后输出3。


Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log)

/* 
  Promise.resolve 方法的参数如果是一个原始值，或者是一个不具有 then 方法的对象，
  则 Promise.resolve 方法返回一个新的 Promise 对象，状态为resolved，Promise.resolve 方法的参数，会同时传给回调函数。
  then 方法接受的参数是函数，而如果传递的并非是一个函数，它实际上会将其解释为 then(null)，这就会导致前一个 Promise 的结果会穿透下面。
  输出  1 
 */

if ([] == []) {
  console.log('[] == [] 为' + ([] == [])) // false
}
if ([1] == [1]) {
  console.log('[1] == [1] 为' + ([1] == [1])) //false
}
if ([] === []) {
  console.log('[] === [] 为' + ([] === [])) // false 
}
if ([] == false) {
  console.log('[] == false 为' + ([] == false)) // true 
}
if ([]) {
  console.log('[]是不是true' + [])
}
[] == true;// false
[] == false; // true
[] == ![]; //true
[] === ![] //false
if ({} == {}) {
  console.log('{} == {}' + " " + {} == {}) // false
}
if ({ a: 1 } == { a: 1 }) {
  console.log('{a:1} == {a:1}' + " " + { a: 1 } == { a: 1 }) //false 
}
if ({} == false) {
  console.log('{} == false 为' + ({} == false)) // false
}
if ([] === false) {
  console.log('[] === false 为' + ([] === false)) // false
}
if ({} === false) {
  console.log('{} === false 为' + ({} === false)) // false
}
/* 
 javascript 的隐式转换。比如-, *, /,和%等算术运算符都会把操作数转换成数字的，
 但是“+”号就有点不一样了，有些情况下，它是算术加号，有些情况下，是字符串连接符号，
 具体的要看它的操作数
 */
3 + true //4
// 字符串和数字相加，不管式数字在前还是在后，都是将数字转成字符串在相加
'2' + 3 //'23'
2 + '3' //'23'

// + 号的运算顺序式从左到右的
1 + 2 + '3' // '33'
1 + "2" + 3; // "123"

/*
 同时在隐式转换也存在一些错误的时候
 null会转成 0 。 undefined会转成NaN 

 JavaScript提供了isNaN来检测某个值是否为NaN，
 但是，这也不太精确的，因为，在调用isNaN函数之前，
 本身就存在了一个隐式转换的过程，它会把那些原本不是NaN的值转换成NaN的

*/
isNaN("foo"); // true
isNaN(undefined); // true
isNaN({}); // true
isNaN({ valueOf: "foo" }); // true


//那么就没有办法检测NaN了吗，不是的，！== 这个时候说我可以：哈哈，NaN不是不等于自身嘛那就自己和自己比
var x = NaN
x !== x // true
var y = []
y !== y // false 一定是自己和自己比  【】！== 【】 这个不是自己和自己比

/* 
对象的隐式转换
1、对象是可以转换成原始值的，常见的是转成字符串
 */
'this is string' + Object
//"this is stringfunction Object() { [native code] }"
'this is string' + Array
//"this is stringfunction Array() { [native code] }"
'this is string' + Math
//"this is string[object Math]"
var t = { a: 1 }
'this is a Object' + t
// "this is a Object[object Object]"

/* 对象 */
//例如有时候需要判断是不是数组
var array = []
Object.prototype.toString.call(array)//"[object Array]"

function getFunctionName(fun) {
  if (fun.name !== undefined) {
    return fun.name;
  }
  console.log(fun)
  var res = fun.toString()
  console.log(res)
}
function test() {
}
console.log(getFunctionName(() => { }))


// 问题1：

var a = 20;
var b = a;
b = 30;

// 这时a的值是多少？
// 问题2：

var a = { name: '前端开发' }
var b = a;
b.name = '新改的值';

// 这时a.name的值是多少
// 问题3：

var a = { name: '前端开发' }
var b = a;
a = null;

// 这时b的值是多少

// 思考题
var a = { n: 1 };
var b = a;
a.x = a = { n: 2 };

a.x 	// 这时 a.x 的值是多少 undefined
b.x 	// 这时 b.x 的值是多少  {n:2}

/* 
参考https://github.com/yygmind/blog/issues/16解答
*/
// 问题一：从内存来看 null 和 undefined 本质的区别是什么？

// 问题二：ES6语法中的 const 声明一个只读的常量，那为什么下面可以修改const的值？

const foo = {};
foo = {}; // TypeError: "foo" is read-only
foo.prop = 123;
foo.prop // 123
/* 
const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。
对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。
但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，
const只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，
就完全不能控制了。因此，将一个对象声明为常量必须非常小心。 */
// 

// 代码一
var scope = "global scope";
function checkscope() {
  var scope = "local scope";
  function f() {
    return scope;
  }
  return f;
}

checkscope()();
// 代码2：

var scope = "global scope";
function checkscope() {
  var scope = "local scope";
  function f() {
    return scope;
  }
  return f;
}

var foo = checkscope();
foo();
// 上面的两个代码中，checkscope()执行完成后，闭包f所引用的自由变量scope会被垃圾回收吗？为什么？


//手写一个new 实现
/* 
在之前分析一个new的操作得到了什么
new Person（）
1、返回了一个对象
2、 访问到了Person构造函数里面的属性
3、访问到了Person原型上的属性和方法，并且改变了this的指向，指向返回的对象*/
function create() {
  let obj = new Object()
  // 获取构造函数
  let constructor = [].shift.call(arguments)
  // 链接到原型
  obj.__proto__ = constructor.prototype
  // 绑定this ,执行构造函数
  let result = constructor.apply(obj, arguments)
  // 确保new出来得是一个对象
  return typeof result === 'object' ? result : obj
}
function Person() { }
let c = create(Person)
/* 
form yygmind
1、用new Object() 的方式新建了一个对象obj

2、取出第一个参数，就是我们要传入的构造函数。此外因为 shift 会修改原数组，所以 arguments 会被去除第一个参数

3、将 obj 的原型指向构造函数，这样obj就可以访问到构造函数原型中的属性

4、使用 apply，改变构造函数 this 的指向到新建的对象，这样 obj 就可以访问到构造函数中的属性

5、返回 obj

 */

function myNew(Obj, ...args) {
  let obj = Object.create(Obj.prototype)
  Obj.apply(obj, args)
  return obj
}

//reduce --实现map
const numbers = [10, 20, 30, 40];
const doubledOver50 = numbers.reduce((finalList, num) => {
  num = num * 2;
  if (num > 50) {
    finalList.push(num);
  }
  return finalList;
}, []);
doubledOver50; // [60, 80]
/* 
from yymind
 */
// 执行环境中  num 得所属
var num = 1;
var myObject = {
  num: 2,
  add: function () {
    this.num = 3;
    (function () {
      console.log(this.num);//1
      this.num = 4;
    })();
    console.log(this.num);
  },
  sub: function () {
    console.log(this.num)
  }
}
myObject.add();//3
console.log(myObject.num);//3
console.log(num);//4
var sub = myObject.sub;
sub();//4
// 严格模式下，报错。TypeError: Cannot read property 'num' of undefined
// 非严格模式下，输出：1、3、3、4、4

//箭头函数

var name = 'window'

var person1 = {
  name: 'person1',
  show1: function () {
    console.log(this.name)
  },
  show2: () => console.log(this.name),
  show3: function () {
    return function () {
      console.log(this.name)
    }
  },
  show4: function () {
    return () => console.log(this.name)
  }
}
var person2 = { name: 'person2' }

person1.show1() // person1，隐式绑定，this指向调用者 person1 
person1.show1.call(person2) // person2，显式绑定，this指向 person2

person1.show2() // window，箭头函数绑定，this指向外层作用域，即全局作用域
person1.show2.call(person2) // window，箭头函数绑定，this指向外层作用域，即全局作用域

person1.show3()() // window，默认绑定，这是一个高阶函数，调用者是window
// 类似于`var func = person1.show3()` 执行`func()`
person1.show3().call(person2) // person2，显式绑定，this指向 person2
person1.show3.call(person2)() // window，默认绑定，调用者是window

person1.show4()() // person1，箭头函数绑定，this指向外层作用域，即person1函数作用域
person1.show4().call(person2) // person1，箭头函数绑定，
// this指向外层作用域，即person1函数作用域
person1.show4.call(person2)() // person2


var name = 'window'

function Person(name) {
  this.name = name;
  this.show1 = function () {
    console.log(this.name)
  }
  this.show2 = () => console.log(this.name)
  this.show3 = function () {
    return function () {
      console.log(this.name)
    }
  }
  this.show4 = function () {
    return () => console.log(this.name)
  }
}

var personA = new Person('personA')
var personB = new Person('personB')

personA.show1() // personA，隐式绑定，调用者是 personA
personA.show1.call(personB) // personB，显式绑定，调用者是 personB

personA.show2() // personA，首先personA是new绑定，产生了新的构造函数作用域，
// 然后是箭头函数绑定，this指向外层作用域，即personA函数作用域
personA.show2.call(personB) // personA，同上 ?????????

personA.show3()() // window，默认绑定，调用者是window
personA.show3().call(personB) // personB，显式绑定，调用者是personB
personA.show3.call(personB)() //window，默认绑定，调用者是window

personA.show4()() // personA，箭头函数绑定，this指向外层作用域，即personA函数作用域
personA.show4().call(personB) // personA，箭头函数绑定，call并没有改变外层作用域，
// this指向外层作用域，即personA函数作用域
personA.show4.call(personB)() //personB，解析同题目1，最后是箭头函数绑定，
// this指向外层作用域，即改变后的person2函数作用域

/* 
题目一和题目二的区别在于题目二使用了new操作符。

使用 new 操作符调用构造函数，实际上会经历一下4个步骤：

创建一个新对象；
将构造函数的作用域赋给新对象（因此this就指向了这个新对象）；
执行构造函数中的代码（为这个新对象添加属性）；
返回新对象。
 */


//模拟实现bind
/* 
1、可以指定this
2、返回一个函数
3、可以传入参数
4、柯里化 */
Function.prototype.bind2 = function (context) {
  var self = this // this 指向调用者
  var args = Array.prototype.slice.call(arguments, 1)
  var fNOP = function () { }

  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments)
    return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs))
  }
  //  原型式继承
  fNOP.prototype = this.prototype
  fBound.prototype = new fNOP()
  return fBound
}

Function.prototype.bind3 = function (oThis) {
  //  拿到第一个参数，bind改变this指向的指向对象  foo.bind(bar) 即bar
  var args = Array.prototype.slice.call(arguments, 1),
    fToBound = this,
    fNOP = function () { }

  fBound = function () {
    return function () {
      fToBound.apply(this instanceof fNOP ? this : oThis, args.concat(Array.prototype.slice(arguments)))
    }
  }
  fNOP.prototype = this.ptototype
  fBound.prototype = new fNOP()

  return fBound;


}

var arr = [0, 0, 1, 'a', 1, 2, 'b', 'a', 'a'];
var res = arr.filter(function (ele, index, array) {
  return index === array.indexOf(ele);
});
var array = [0, 0, 1, 'a', 1, 2, 'b', 'a', 'a']
var t = [...new Set(array)]
console.log(t)




