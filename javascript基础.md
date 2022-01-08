
变量没有意义，只是存储值
alert(2) '2' 基于alert 输出的结果都会转化为字符串  ：把值（如果是表达式先计算出结果）
通过toString这个方法转换为字符串 然后在输出


？Object.prototype.toString.call()
alert([12,34]) => '12,34'
alert({name: 'xxx'}) => [object, object] 为啥和数组的不一样

- confirm： 和 alert 用法一致

var flag = confirm(12)
alert(flag)

- prompt 
取消null  输入内容 有值

node不是语言，node也是一个基于V8引擎渲染和解析JS的工具  长得不像浏览器的“浏览器”

###  number 类型的详细剖析
1、number
NaN： not a number 但是他是数字类型的
isNaN： 检测当前是否不是有效数字  返回true 不是有效数字， 返回false 是有效数字
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

<font color='red'>重要： isNaN 检测是机制</font>
1、首先验证当前要检测的值是否是数字类型，如果不是，浏览器会默认的把值转换为数字类型
    [把非数字类型转数字]
        - 其他基本类型转化为数字： 直接使用Number()这个方法转换的
        Number('14') => 14
        Number('14px') => NaN 如果当前字符串中出现任意一个非有效数字字符结果则为NaN
        isNaN('13px') => true
        Number('13.5')  13.5
    [把布尔类型转数字]
        Number(true) -> 1
        Number(false) -> 0
    [其它]
      Number(null) -> 0
      Number(undefined) -> NaN

    - 把引用数据类型值转换为数字： 先把引用值调取toString转换为字符串，然后在把字符串调取Number 转换为数字
    [对象]
    ({}).toString() -> '[object, object]' -> NaN
    [数组]
    [12,23].toString() -> '12,23' -> NaN
    [12].toString() -> '12' -> 12
    [正则]
    /^$/.toString() -> '/^$/' -> NaN

    Number('') -> 0
    [].toString() -> ''
    => isNaN([]) -> false   [] 是有效数字


2、当前检测的值已经是数字类型，是有效数字返回false，不是返回true，（数字类型中只有NaN不是有效数字，其余都是有效数字）



parseInt/parseFloat
> 等同于Number， 也是为了把其它值转换为数字类型
> parseInt 和 Number 的区别在于字符串的转换分析上
> Number： 出现任意非有效数字字符，返回NaN
> parseInt： 把一个字符串中的整数部分解析出来，parseFloat把一个字符串中的小树部分解析出出来



NaN 的比较
NaN == NaN // false
思考题： 有一个变量存储的值不知道，检测是否是一个有效数字
if(isNaN(num)) { // 只有这一种方法
  <!-- 不是有效数字 -->
}

### 10 布尔类型 null undefined
> 只有两个值 true/false

`如何把其它数据类型行转为布尔类型`
- Boolean
- !
- !!
```javascript
Boolean(1) // true 数字里只有 中 0 和 NaN是false 其余都是true
!'字符串' false  //   ！先把其它数据类型转换为布尔类型，然后取反
!!null  false // 取两次反，等价于没取反，也就剩下转换为布尔值 
```

规则： `在JS中只有0 NaN ’‘ null undefined 这5个值转化为布尔类型的为false 其余都为true`

`null && undefined`
> 都代表空或者没有
> - null: 空对象指针
> - undefined : 未定义   松散和特殊性有一定关系

null一般都是意料之中的没有（通俗理解，一般都是人为手动的先赋值为null， 后面的程序中我们会再次给它赋值）

```javascript
var num = null; // 手动赋值，预示着后面会num的值修改
...
num = 12 ;
```
undefined 代表的没有一般都不是惹味手动控制的，大部分都是浏览器自主为空（后面可以赋值也可以不赋值）


是一个原始数据类型，也是一个原始值数据

undefined是全局对象上个一个属性，window.undefined

```
console.log(window.undefined)

// 不生效 writeable： false 不可写
window.undefined = 1

console.log(window.undefined)

// 不可配置 configurable: false
delete window.undefined

// 不可枚举  enumerable: false
for (const key in object) {
    if (key === undefined) {
        console.log(key)
    }
}

Object.definePropertie(window, 'undefined', {
    configurable: true,
    enumerable: true,
    writeable: true,
    value: 11
})
```
### 11 对象数据类型

----

##### Object对象数据类型
> 普通对象： 
> - 由大括号包裹起来的
> - 由零到多组属性名和属性值(键值对)组成

### 12 关于对象的一些细节

```Javascript
var obj = {
  name: 'dd'
  age:　30
}
obj.name   //dd
obj['name'] //dd
obj[name]  // undefined
```
'name' 和 name 的区别？
  => 'name' 是一个字符串值，他代表的是本身
  => name 是一个变量不是指，它代表的是本身存储的这个值

### 13 数组也是对象

----
属性名不仅仅字符串格式，还有可能数字格式
当我们存储的属性名不是字符串也不是数字的时候，浏览器会吧这个值转换为字符串（toString）然后再进行存储

----
数组对象(对象由键值对组件)
var obj = {
  a:12
}
var arr = [12,23]

### 14 js的运行机制

浅分析JS的运行机制
 - 当浏览器渲染和解析JS的时候，会提供给一个供JS代码运行的环境，我们把这个环境称之为“全局作用于”global/window/scope)
 - 代码自上而下执行 （之前还有个变量提升的阶段）
   =>基本数据类型的值会存储在当前的作用域下

   var a = 12
   1）首先开辟一个空间存储12   栈
   2）在当前作用域中声明一个变量a 
   3）让声明的变量和存储的12赋值给a => 赋值操作叫做定义

   基本类型值（也叫值类型）是按照值来操作：把原有的值复制一份放到新的空间或者位置上，和原来的值没有关系

  => 引用数据类型的值不能直接存储到当前的作用域下（因为可能存储的内容过于复杂） 需要先开辟一个新的空间（理解为仓库），把内容存储到空间中
    var obj1 = {n : 100}
    1）首先开辟一个内存空间， 把对象中的键值对依次存储起来*（为了保证后面可以找到这个空间，此空间有一个16进制的地址）
    2）声明变量
    3）让变量和空间地址关联在一起（把空间地址赋值给变量）

  引用类型不是按照值来操作，它操作的是空间的引用地址：把原来空间的地址赋值给新的变量，但是原来的空间没有被克隆，还是一个空间，这样会出现多个变量关联一个相同的空间，相互之间会存在影响了

  栈内存的作用：　本身就是一个供ＪＳ代码执行的环境，所有的基本类型的值都会直接的在占内存中开辟一个位置进行存储。

  堆内存：　用来存储引用类型中的信息值得
  对象存储的是键值对
  函数存储的是代码字符串

### 15 堆栈内存练习

```Javascript
/*
1、形成给一个全局作用域(栈内存)
2、代码自上而下
  首先开辟一个新的堆内存（AAAFFF000）， 把键值对存储到堆内存中
  n:10,
  m: obj.n

*/
var obj = {
  n: 10, 
  m: obj.n * 10
}
console.log(obj.m)
```
### 16 if-else-if
{} + 'str'  // NaN 变成数学相加 
```javascript
var num = parseInt('width: 35.5px')
console.log(num) 
if(num == 35.5) {

} else if(num == 35) {

} else if(num == NaN) {

} else if(typeof num == 'number') {
  console.log(1)
} else {

}
```

### typeof

> 在js中用来检测数据类型的方式之一，除了他以外还有
> - instanceof
> - constructor
> - Object.prototype.toString.call()

四种检测类型的方式

typeof null => object 因为null代表控对象指针(没有指向任何的内存空间)

typeof 检测数组/正则/对象，返回的都是‘object’  无法细分对象


typeof [] => 'object'
typeof typeof [] => 'string'

### 17 三元运算符

特殊情况
```javascript
// => 如果三元运算符当中的某一部分不需要任何的处理，我们使用null/undefined/void 0 ...占位即可
var num = 12
num>0?num++:null;
```


思考题：

```javascript
var num = 12
if(num>0) {
  if(num< 10) {
    num++
  } else {
    num--
  }
} else {
  if(num==0) {
    num++
    num=num/10
  }
}

num>0? (num<10?num++:num--) : (num===0?(num++, num/=10):void 0)
```
### for循环
/*
在for循环体重，经常出现两个常用的关键字
break;  中断或者结束
continue; 继续
*/


### DOM
document.getElementById

分析包含的属性
> - className  当前元素的样式
> - id 当前元素的ID（字符串）
> - innerHTML 存储当前元素中的内容，（包含HTML标签）
> - innerText 存储当前元素中的文本内容（没有标签）
> - onclick
> - onmouseover 鼠标滑过
> - onmouseout 鼠标滑出
> - style 存储当前元素的所有行内样式值

获取元素集合
- [context].getElementsByTagName
> 在指定的上下文中， 通过元素的标签名或取一组元素的集合
> 上下文是我们自己来指定的

获取的结果是一个元素集合（HTMLCollection），首先他也是对象数据类型的，结构和数组非常相似，类数组

### 函数数据类型的运行机制
函数的运行机制
```JavaScript
function fn() {
  var t = 10;
  t+=10
  console.log(t)
}
fn()
1、函数也是引用类型，首先会开辟一个新的堆内存，把函数体重的代码当前‘字符串’存储到内存中，对象存储的是键值对
2、把开辟的堆内存地址赋值给函数名

[函数执行]
1、函数执行，首页会形成一个私有的作用域（一个供JS代码执行的环境也是一个栈内存）
2、把之前在堆内存中存储的字符串复制一份过来，变为真正JS代码，在新开辟的作用域中自上而下的执行
```

### 函数中形参与实参
> 参数是函数的入口：当我们在函数中封装一个功能，发现一些原材料不确定，需要执行函数的时候用户传递进来才可以，此时我们就基于参数的机制，提供出入口即可

```javascript
// =>此处的参数叫做形参：入口，形参是变量
function sum(n,m ) {

}
// => 此处函数执行传递的值是实参：实参是具体的数据值
sum()
```


<font color='red' size=8>JS中数据类型转换汇总</font>
JS中的数据类型分为
[基本数据类型]
 number、string、null、undefined、boolean、
引用数据类型
对象 object
- 普通对象
- 数组对象 Array
- 正则对象 RegEXP
- 日期对象 Date
- 数学函数 Math
- 函数 function

真是项目中，根据需求，我们往往需要把数据类型之前进行转换  规则和规则之间是独立的。规定。

### 把其他数据类型转换为number类型
`1、发生的情况`
- isNaN检测的时候： 当检测的值不是数字类型，浏览器会自己调用Number方法把它先转换为数字，然后再检测是否为非有效数字
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
- 基于parseInt/parseFloat去手动转换为数字类型
- 数学运算： + - * / % , 但是+不仅仅是数学运算，还可能是字符串拼接
```javascript
'3' - 1 => 2
  Number('3') => 3
  3 -1 => 2
'3px' - => NaN
'3px' + 1=>'3px1'
var i = '3';
i+=1  '31'
i++  4 // i++ 就是单纯的数学运算，已经摒弃掉字符串拼接的规则
```
- <font color='red'>在基于‘==’比较的时候 ，有时候也会把其它值转化为数字类型</font>
- ...

`2、转换规律`
```javascript
// => 转换的方法：Number (浏览器自行转换都是基于这个方法完成的)
[把字符串转换为数字]
只要遇到一个非有效数字字符，结果就是NaN
'' -> 0
'  ' -> 0
'\n' -> 0
'\t' -> 0
[把布尔转换为数字]
true -> 1
false -> 0
[把没有转换为数字]
null -> 0
undefined -> NaN
[把引用类型值转换为数字]
首先都先转换为字符串(toString), 然后再转换为数字（Number）
```

### 把其它类型的值转换为字符串
`1、发生的情况`
- 基于alert/confirm 等方法的输出内容的时候，会把输出的值转换为字符串，然后再输出
```javascript
alert(1) // '1'
```
- 基于‘+ ’ 进行字符串拼接的时候
- 把引用类型转换为数字的时候，首先会转换为字符串，然后再转换为数字
- 给对象设置属性名，如果不是字符串，首先转换为字符串，然后再当做属性存储到对象中（对象的属性只能是数字或者字符串）
- 手动调用toString/toFixed/join/String/ 等方法的时候，也是为了转换为字符串
```javascript
var n = Math.Pi; // 获取圆周率 
n.toFixed(2) // '3.14'
var arr = [1,2,3]
arr.join(',') // '1,2,3'
- ...

```
`2、转换规律`
```javascript
//=> 调用的方法： toString
【除了对象，都是你理解的结果】
1 -> '1'
NaN -> 'NaN'
true -> 'true'
false -> 'false'
null -> 'null'
undefined -> 'undefined'
[] -> ''
[12] -> '12'
[2,3] -> '2,3'
function(){} -> 'function(){}'
[对象]
{name: 'xx'} -> '[object, object]'
{} -> '[object, object]'
不管是啥样的普通对象最后结果都一样
```
### 把其他值转换为布尔

`1、发生的情况`
- 基于！/ !! /Boolean 等方法转换
- 条件判断中的条件最后都会转换为布尔类型
- ...

```javascript
if(n) {
  // => 把n的值转换为布尔验证条件真假
}

if('3px' + 3) {
  // => 先计算表达式的结果 '3px3' ，把结果转换为布尔true，条件成立
}
```

`2、转换规律`
只有0、NaN、undefined、null、‘’五个值转化为布尔的false，其余都是true

### 特殊情况： 数学运算和字符串拼接 “+”
<font color='red'>***</font>
```javascript
// => 当表达式中长线字符串，就是字符串拼接，否则就是数学运算
1 + true -> 2
'1' + true -> '1true'
[12] + 10 -> '1210' 虽然现在没看见字符串，但是引用类型转换数字，首先会转换为字符串，所以变为了字符串拼接
({}) + 10 -> '[object,object]10'
{} + 10 -> 10 // 这个和以上说的没有毛关系，因为它根本就不是数学运算，也不是字符串拼接，它是两部分代码
    {}  代表代码块（块级作用域）
    + 10 才是我们的操作
    严格写 {}; + 10
[] + 10 -> '10'
{} + {} -> '[object,object][object,object]'
function(){}+10 -> 10
  function(){};
  +10
```

思考题：
```javascript
12 + true + false + null + undefined + [] + 'dd' + null + undefined + [] + true
// 'NaNddnullundefinedtrue'
12 + true -> 13
13+ false -> 13
13 + null -> 13
13 + undefined -> NaN
NaN + [] -> 'NaN'
'NaN' + 'dd' -> 'NaNdd'
'NaNdd' + null -> 'NaNddnull'
'NaNddnull' + undefined -> 'NaNddnullunfined'
'NaNddnullunfined' + [] -> 'NaNddnullunfined'
'NaNddnullunfined' + true -> 'NaNddnullunfinedtrue'
```
### 特殊情况： ‘==’ 在进行比较的时候，如果左右两边的数据类型不一样，则先转换为相同的乐行，再进行比较

相同类型的情况 == 换成=== 进行比较
- 对象==对象： 不一定相等，因为对象的操作的是引用地址，地址不相同，则不相等
```javascript
{name: 'xxx'} == {name: 'xxx'} => false

[] == [] => false

var obj1 = {}
var obj2 = obj1
obj1 == obj2 => true
```
- 对象==数字： 把对象转换为数字，然后再进行比较
- 对象==布尔： 把对象转换为数字，把布尔也转换为数字
- 对象==字符串： 把对象转换为数字，把字符串也转换为数字
- 字符串==数字： 字符串转换为数字
- 字符串==布尔： 都转换为数字
- 布尔==数字： 把布尔转换为数字

==============>不同情况比较都是 把其它值转换为数字，然后再比较的

null == undefined -> true
null === undefined -> false
null && undefined 和其它值都不相等
NaN==NaN -> false
NaN 和谁都不相等 

==============>特殊记忆

```javascript
1 == true -> true
1 ==false -> false
2 ==true -> false  true->1  2 == 1  false
[] ==[] -> false
![] == [] -> ![] -> false -> false == [] -> 0 == 0 -> true

[] == false -> true 都转换为数字 0 == 0
![] == false -> true 先算 ![] ， 把数组转布尔取反=> false  false == false

[] == true  -> false 0 == 1
![] == true ->  false 
```

### 关于JS数组常用方法的剖析
数组也是对象数据类型的，也是由键值对组成的
```javascript
var arr = [12, 23, 34]
/**
 * 
 * 结构： 
 *  0：12，
 *  1： 23，
 *  2：34，
 *  length： 3
 * 1、以数字作为索引（属性名）从0 开始递增，
 * 2、由一个length属性
 * /
```

数组中的常用方法
> 按照四个维度记忆
> - 方法的作用
> - 方法的参数
> - 方法的返回值
> - 原有数组的是否改变

##### 数组
<font color='red'>增删改</font>
**`push`**
作用： 向数组末尾追加新的内容
参数： 追加的内容（可以是一个，可以是多个）
返回值： 新增后数组的长度
原有数组改变
arr.push()
```javascript
Array.prototype.push = function(val) {
  this[this.length] = val
  return this.length
}
```

**`pop`**
作用： 删除数组最后一项
参数： 无
返回值： 被删除的哪一项内容
原有数组改变
arr.pop()

**`shift`**
作用： 删除数组中的第一项
参数： 无
返回值：被删除的那一项
原有数组改变

**`unshift`**
作用：  向数组开头增加一个元素
参数： 添加的内容
返回值：新增数组的长度
原有数组改变

**`splice`**
作用：实现数组指定位置的增加、修改、删除
参数： {
  n ,m ,x 都是数字
  从索引n开始，删除m个元素(m不写/超过最大值，就是删除到末尾)， 用x占用删除的部分
}
返回值：把删除的部分用新数组存储起来返回
原有数组改变

使用方法： 
> - arr.splice(n, m, x)

> - 删除
  1) arr.splice(0)  可以清空数组，把原始数组中的内容基于新数组存储爱来(像克隆)
  2) arr.splice(arr.length-1) 删除最后一项
  3) arr.splice(0, 1) 删除第一项
> - 增加
  1) 从n开始，一个都不删，把x放在索引n的前面--> 返回空数组
  2) arr.splice(arr.length, 0, x) 在数组最后增加x项
  3) arr.splice(0, 0, x) 在数组开头增加x项
> - 修改 用x替代删除的m即可

**`删除数组末尾一项的几种方法`**
> - arr.length--
> - arr.pop()
> - arr.splice(arr.length-1)
> - delete arr[arr.length-1] 能删除，但是length不变(不用)

**`向数组末尾增加项的几种方法`**
> - arr.push()
> - arr[arr.length] = [value]
> - arr.splice(arr.length, 0 , [value])

<font color='red'>查询和拼接</font>

**`slice`**
作用：  在一个数组中按照条件查找出其中的部分内容
参数： 两个参数（n/m）从索引n开始找到索引m处
返回值：以一个新数组存储查找的内容
原有数组不会改变

```javascript
arr.slice(n,m) //从n到m 不包含m
arr.slice(0) // m不写找到末尾  实现数组克隆-参数都不写

arr.slice(-n, -m) // 负数作为索引 总长度 + 负数索引
```

**`concat`**
作用：  实现多个数组拼接
参数： 数组或者值
返回值：拼接后的新数组
原有数组不会改变

<font color='red'>把数组转换成字符串</font>

**`toString`**
作用：  把数组转换为字符串
参数： 无
返回值：转换后的字符串，每一项用逗号分隔
原有数组不会改变

**`join`**

作用：  把数组转换为字符串
参数： 指定的分隔符
返回值：转换后的字符串，每一项用逗号分隔
原有数组不会改变

<font color='red'>排序或排列</font>

**`reverse`**
作用：  把数组倒过来
参数： 无
返回值：排列后的新数组
原有数组改变
**`sort`**
作用：  把数组排序
参数： 可以没有，可以是函数
返回值：排列后的新数组
原有数组改变

<font color='red'>检测数组中是否包含某一项</font>

**`indexOf/lastIndexOf`**
作用： 检测当前项在数组中第一次/最后一次出现位置的索引值
参数： 要检测的这一项内容
返回值：索引 、没有-1
原有数组不会改变

**`includes`**
作用： 是否包含某项
参数： 要检测的这一项内容
返回值：布尔
原有数组不会改变

<font color='red'>遍历及映射</font>

**`forEach`**
作用： 遍历数组中的每一项
参数： 回调函数
返回值：无/undefined
原有数组不会改变

**`map`**
作用： 数组映射
参数： 回到函数
返回值：映射后的新数组
原有数组不会改变

arr.map(function(item,index){});
<font color='red'>其它方法</font>
**`filter`**
**`find`**
**`reduce`**
**`some`**
**`every`**

<font color='red'>数组去重和双循环数组塌陷问题</font>
数组去重

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
// 2 、indexOf 
```


### 字符串常用的方法

关于字符串中常用的方法
字符串是基本数据类型，每一次操作都是值直接进行操作，不像数组一样基于空间地址来操作的，所以不存在原有字符串是否改变这一说，肯定是不变的。

**`charAt/charCodeAt`**
作用： charAt根据索引获取指定位置的字符
      charCodeAt不仅仅获取字符，他获取的是字符对应的Unicode的编码值ASC II码值 a-97
参数： 索引
返回值： 字符或者对应的编码

```javascript
var str = 'zyx'
str.charAt(0) // 'z'
srt[0] // 'z'
str[100] // undefined
str.charAt(100) // ''
// 和直接操作索引方式获取的区别
1、当索引不存在的时候，str[x] 获取的结果是undefined， 运行的机制和对象是一样，而charAt获取的结果是空字符串
str.charCodeAt(0) // 122
String.fromCharCode(122) //'z' 
```

**`indexOf/lastIndexOf`**

**`slice`**

作用：  在一个数组中按照条件查找出其中的部分内容
参数： 两个参数（n/m）从索引n开始找到索引m处
返回值：指定位置的子字符串

**`substring`**

作用：  和slice语法一模一样，唯一区别，slice支持负数索引，substring 不支持
参数： 两个参数（n/m）从索引n开始找到索引m处
返回值：返回位于string对象中指定位置的子字符串。

substring():返回位于string对象中指定位置的子字符串。
strVariable.substring(start,end);(不含end)
注意的是substring方法使用start和end两者中较小的值作为子字符串的起始点。
str.substring(0,3)和str.substring(3,0)相同
若start和end为NaN 或者负数，那么将其替换为0

**`substr`**

作用：  返回一个指定位置开始的指定长度的子字符串。
参数：stringVar.substr(start[,length]);若length为0或者为负数，将返回一个空字符串。
返回值：以一个新数组存储查找的内容

**`toUpperCase/toLowerCase`**

实现字母的大小写转换

**`split`**

和数组中join对应

**`replace`**

一般和正则配合使用
作用： 替换字符串中的原有字符
参数：原有字符，替换字符
返回值，替换后的字符串

```javascript
str.replace(//g, '')
// 获取URL参数 TODO 
var str = 'http://www.baidu.com/test/ss?params=1&param2=&param3#end'
~function(pro){
  pro.queryURLParameter = function() {
    var obj = {};
    this.replace(/([^?=&#]+)(?:=)(([^?=&#]+)?)/g, (_, key, value) => obj[key] = value)
    return obj;
  }
}(String.prototype)
str.queryURLParameter(str)
```

### 函数与函数的返回值

```javascript
function fn(n, m ) {
  var t = 0;
  t = n + m
  console.log(t)
}
fn(10, 20)
var a = 12
fn(a, 1 === 1? 10 :0);// => 实参一定是值，即使我们写的是变量或者表达式，也是吧变量或者表达式计算的结果作为值传递给形参变量



函数执行的时候，都会形成给一个全新的私有作用域(私有的栈内存)， 目的是：
1、把原有的堆内存中存储的字符串变为JS表达式执行
2、保护里面的私有变量不受外界的干扰（和外界是隔离得）
我们把函数执行的这中保护机制，称之为“闭包”
```