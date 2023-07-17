/*
 * @@author: Creator
 * @LastEditTime: 2022-03-31 23:23:37
 * @Description:
 */

/**
 * 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
 * 输入: [4,1,2,1,2]
 * 输出: 4
 * @param {*} nums
 * @returns
 */
var singleNumber = function (nums) {
    // return nums.find(x => !nums.filter((x, index) => {
    //     return nums.lastIndexOf((x)) !== index
    // }).includes(x))
    return nums.reduce((a, b) => a ^ b)
}

console.log(singleNumber([4, 1, 2, 1, 2]))

// 一个数和 0 做 XOR 运算等于本身：a⊕0 = a
// 一个数和其本身做 XOR 运算等于 0：a⊕a = 0
// XOR 运算满足交换律和结合律：a⊕b⊕a = (a⊕a)⊕b = 0⊕b = b

/**
    * 位运算
    * &: 1 & 1 = 1 其他都位0
    * |: 0 | 0 =0  其他都位1
    * ^: 两个位相同则为 0，不同则为 1
    * ~: 0 则变为 1，1 则变为 0
    * << :左移运算，向左进行移位操作，高位丢弃，低位补 0
    * >> 右移运算，向右进行移位操作，对无符号数，高位补 0，对于有符号数，高位补符号位
    * 常见位运算
    * 1、实现乘除法 (数 a 向右移一位，相当于将 a 除以 2；数 a 向左移一位，相当于将 a 乘以 2)
    * int a = 2
    * a << 1 = 4
    * a >> 1 = 1
    * 2、交换数swap
    *  //普通操作
       void swap(int &a, int &b) {
           a = a + b;
           b = a - b;
           a = a - b;
       }

       // 位运算
       void swap(int &a, int &b){
           a ^=b;
           b ^=a;
           a ^=b;
       }
       异或支持交换律和结合律
    * 3、判断奇偶数
    * 根据数的最后一位是 0 还是 1 来决定即可，为 0 就是偶数，为 1 就是奇数
    *  x & 1 === 0 偶数 否则为 奇数
    * 4. 位操作交换符号
    * 交换符号将正数变成负数，负数变成正数
    *  ~x + 1  : 正数取反加1，正好变成其对应的负数(补码表示)；负数取反加一，则变为其原码，即正数
    * 注： 计算机实际运算都是补码进行的
    * 5. 位操作求绝对值
    * 整数的绝对值是其本身，负数的绝对值正好可以对其进行取反加一求得，即我们首先判断其符号位（整数右移 31 位得到 0，负数右移 31 位得到 -1,即 0xffffffff），然后根据符号进行相应的操作
       int abs(int a) {
           int i = a >> 31;
           return i == 0 ? a : (~a + 1);
       }
    * 6. 位操作进行高低位交换
    * s & ~s
    */

/**
 *
 * @param {*} nums
 */
var majorityElement = function (nums) {
    let n = nums.length
    let half = n / 2
    let obj = {}
    let arr = []
    nums.forEach(item => {
        if (obj.hasOwnProperty(item)) {
            obj[item] += 1
        } else {
            obj[item] = 1
        }
        if (obj[item] > half) {
            !arr.includes(item) && arr.push(item)
        }
    })
    return arr
}
var majorityElement = function (nums) {
    return nums.sort((a, b) => a - b)[Math.floor(nums.length / 2)]
}

// 输入：[2,2,1,1,1,2,2]
// 输出：2
var arr = [2, 2, 1, 1, 1, 2, 2]
console.log(majorityElement(arr))
var arr2 = [1]
console.log(majorityElement(arr2))
var arr3 = [1, 1, 1, 1, 1, 1, 8]
console.log(majorityElement(arr3))

/**
 * 汉诺塔
 * @param {*} A
 * @param {*} B
 * @param {*} C
 * @returns
 */
var hanota = function (A, B, C) {
    var N = A.length
    var move = (N, A, B, C) => {
        if (N === 1) {
            C.push(A.pop())
        } else {
            move(N - 1, A, C, B)
            C.push(A.pop())
            move(N - 1, B, A, C)
        }
    }
    move(N, A, B, C)
    return C
}
var A = [2, 1, 0],
    B = [],
    C = []
console.log(hanota(A, B, C))

// 玩汉诺塔工具
var move = (N, A, B, C) => {
    if (N === 1) {
        console.log(A, '->', C)
    } else {
        move(N - 1, A, C, B)
        console.log(A, '->', C)
        move(N - 1, B, A, C)
    }
}
console.log(move(3, 'A', 'B', 'C'))

//1 ================================================================
let a = 1
function b(a) {
    a = 2
    console.log(a)
}
b(a)
console.log(a)
// 2 1
//2 ================================================================
function a(b = c, c = 1) {
    console.log(b, c)
}
a()
//   报错  暂时性死区

//3 ================================================================
let a = (b = 10)
;(function () {
    let a = (b = 20)
})()
console.log(a)
console.log(b)
// 10 20

//4 ================================================================
var a = { n: 1 }
var b = a
a.x = a = { n: 2 }
console.log(a.x)
console.log(b.x)
// undefined  {n:2}  因为.运算符优先级最高，所以会先执行a.x

//5 ================================================================

var arr = [0, 1, 2]
arr[10] = 10
console.log(
    arr.filter(function (x) {
        return x === undefined
    })
)
// []
/**
 * arr10]=10,那么索引3到9位置上都是undefined
 * arr[3]等打印出来也确实是undefined
 * 但是，这里其实涉及到ECMAScript版本不同对应方法行为不同的问题
 * ES6之前的遍历方法都会跳过数组未赋值过的位置，也就是空位，但是ES6新增的for of方法就不会跳过
 */
//6 ================================================================

var name = 'World'
;(function () {
    if (typeof name === 'undefined') {
        var name = 'Jack'
        console.info('Goodbye ' + name)
    } else {
        console.info('Hello ' + name)
    }
})()
// Goodbye jack

//7================================================================

console.log(1 + NaN)
console.log('1' + 3)
console.log(1 + undefined)
console.log(1 + null)
console.log(1 + {})
console.log(1 + [])
console.log([] + {})

// NaN  '13'  NaN  1 '1[object Object]' 1 '[object Object]'

//8================================================================

var a = {},
    b = { key: 'b' },
    c = { key: 'c' }
a[b] = 123
a[c] = 456
console.log(a[b])

// 456
//9================================================================
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
var out = 25
var inner = {
    out: 20,
    func: function () {
        var out = 30
        return this.out
    }
}
console.log((inner.func, inner.func)()) // 25
console.log(inner.func()) // 20
console.log(inner.func()) //20
console.log((inner.func = inner.func)()) // 25

//10================================================================
let { a, b, c } = { c: 3, b: 2, a: 1 }
console.log(a, b, c)
// 1，2，3

//11================================================================
console.log(Object.assign([1, 2, 3], [4, 5]))
// [4,5,3]

//12================================================================

var x = 1
switch (x++) {
    case 0:
        ++x
    case 1:
        ++x
    case 2:
        ++x
}
console.log(x)
// 4  1->case1: x++, ++x, 无break  -> case2: ++x  ---> 4

//13================================================================

console.log(typeof undefined == typeof NULL)
console.log(typeof function () {} == typeof class {})
// true true

// 14================================================================

var count = 0
console.log(typeof count === 'number')
console.log(!!typeof count === 'number')

// true false   逻辑非!的优先级比全等===高

// 15================================================================
;('use strict')
a = 1
var a = 2
console.log(window.a)
console.log(a)
// 2 2

// 16 ================================================================
var i = 1
function b() {
    console.log(i)
}
function a() {
    var i = 2
    //   function c() {
    //       console.log('c', i)
    //   }
    //   c()
    b()
}
a()
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!作用域的问题   1

// 17 ================================================================

var obj = {
    name: 'abc',
    fn: () => {
        console.log(this.name)
    }
}
obj.name = 'bcd'
obj.fn()
// undefined 这道题考察的是this的指向问题，箭头函数执行的时候上下文是不会绑定this的，所以它里面的this取决于外层的this，
// 这里函数执行的时候外层是全局作用域，所以this指向window，window对象下没有name属性，所以是undefined。

// 18 ================================================================
const obj = {
    a: {
        a: 1
    }
}
const obj1 = {
    a: {
        b: 1
    }
}
console.log(Object.assign(obj, obj1))
//{a: {b:1}} assign方法执行的是浅拷贝

// 19 ================================================================

console.log(a)
var a = 1
var getNum = function () {
    a = 2
}
function getNum() {
    a = 3
}
console.log(a)
getNum()
console.log(a)
// undefined 1 2

// 20 ================================================================

var scope = 'global scope'
function a() {
    function b() {
        console.log(scope)
    }
    return b
    var scope = 'local scope'
}
a()()

// undefined  虽然var声明是在return语句后面，但还是会提升到a函数作用域的顶部

// 21 ================================================================

function fn() {
    console.log(this)
}
var arr = [fn]
arr[0]()
// [f] 数组本身   函数作为某个对象的方法调用，this指向该对象，数组显然也是对象，只不过我们都习惯了对象引用属性的方法：obj.fn，但是实际上obj['fn']引用也是可以的。

// 22 ================================================================

var a = 1
function a() {}
console.log(a)

var b
function b() {}
console.log(b)

function b() {}
var b
console.log(b)

// 1 function b  function b
// 函数声明和var声明，这两者都会发生提升，但是函数会优先提升，所以如果变量和函数同名的话，变量的提升就忽略了。

// 23 ================================================================

function Foo() {
    getName = function () {
        console.log(1)
    }
    return this
}
Foo.getName = function () {
    console.log(2)
}
Foo.prototype.getName = function () {
    console.log(3)
}
var getName = function () {
    console.log(4)
}
function getName() {
    console.log(5)
}

//请写出以下输出结果：
Foo.getName()
getName()
Foo().getName()
getName()
new Foo.getName()
new Foo().getName()
new new Foo().getName()
/**
 * 2
 * 4
 * 1  返回this，因为是在全局环境下执行，所以this指向window
 * 1
 * 2 new Foo.getName()   <==> new (Foo.getName)() ==> 2
 * 3 因为点运算符（.）的优先级和new是一样高的，所以从左往右执行 new Foo().getName() <==> (new Foo()).getName()
 * 3 new ((new Foo()).getName))()
 */

// 24 =================================================================

const person = {
    address: {
        country: 'china',
        city: 'hangzhou'
    },
    say: function () {
        console.log(`it's ${this.name}, from ${this.address.country}`)
    },
    setCountry: function (country) {
        this.address.country = country
    }
}

const p1 = Object.create(person)
const p2 = Object.create(person)

p1.name = 'Matthew'
p1.setCountry('American')

p2.name = 'Bob'
p2.setCountry('England')

p1.say()
p2.say()

/**
 * it's Matthew, from England
 * it's Bob, from England
 */

// 25 =================================================================

setTimeout(function () {
    console.log(1)
}, 0)
new Promise(function (resolve) {
    console.log(2)
    for (var i = 0; i < 10000; i++) {
        i == 9999 && resolve()
    }
    console.log(3)
}).then(function () {
    console.log(4)
})
console.log(5)

/**
 * 2 3 5  4  1
 */

// 26 =================================================================
console.log('1')

setTimeout(function () {
    console.log('2')
    process.nextTick(function () {
        console.log('3')
    })
    new Promise(function (resolve) {
        console.log('4')
        resolve()
    }).then(function () {
        console.log('5')
    })
})

process.nextTick(function () {
    console.log('6')
})

new Promise(function (resolve) {
    console.log('7')
    resolve()
}).then(function () {
    console.log('8')
})

setTimeout(function () {
    console.log('9')
    process.nextTick(function () {
        console.log('10')
    })
    new Promise(function (resolve) {
        console.log('11')
        resolve()
    }).then(function () {
        console.log('12')
    })
})
// 1 7 6 8 2 4  9 11  3 5 9 11 10 12 node 10 之后
// 1 7 6 8 2 4  9 11  3 10 5 12 node 10 之前
// 178 24 59 11 12 无 process.nextTick 浏览器环境
/**
 * node 早期版本
 * process.nextTick node 环境
 * node 中宏任务被分成了几种不同的阶段
 * 两个定时器属于timers阶段，setImmediate属于check阶段，
 * socket的关闭事件属于close callbacks阶段，
 * 其他所有的宏任务都属于poll阶段，除此之外，
 * 只要执行到前面说的某个阶段，那么会执行完该阶段所有的任务，
 * 这一点和浏览器不一样，浏览器是每次取一个宏任务出来执行，执行完后就跑去检查微任务队列了，
 * 但是nodejs是来都来了，一次全部执行完该阶段的任务好了，那么process.nextTick和微任务在什么阶段执行呢，
 * 在前面说的每个阶段的后面都会执行，但是process.nextTick会优先于微任务。
 */

/*
 * @@author: Creator
 * @LastEditTime: 2022-01-21 17:47:04
 * @Description:
 */

/**
 * 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
 * 输入: [4,1,2,1,2]
 * 输出: 4
 * @param {*} nums
 * @returns
 */
var singleNumber = function (nums) {
    // return nums.find(x => !nums.filter((x, index) => {
    //     return nums.lastIndexOf((x)) !== index
    // }).includes(x))
    return nums.reduce((a, b) => a ^ b)
}

console.log(singleNumber([4, 1, 2, 1, 2]))

// 一个数和 0 做 XOR 运算等于本身：a⊕0 = a
// 一个数和其本身做 XOR 运算等于 0：a⊕a = 0
// XOR 运算满足交换律和结合律：a⊕b⊕a = (a⊕a)⊕b = 0⊕b = b

/**
 * 位运算
 * &: 1 & 1 = 1 其他都位0
 * |: 0 | 0 =0  其他都位1
 * ^: 两个位相同则为 0，不同则为 1
 * ~: 0 则变为 1，1 则变为 0
 * << :左移运算，向左进行移位操作，高位丢弃，低位补 0
 * >> 右移运算，向右进行移位操作，对无符号数，高位补 0，对于有符号数，高位补符号位
 * 常见位运算
 * 1、实现乘除法 (数 a 向右移一位，相当于将 a 除以 2；数 a 向左移一位，相当于将 a 乘以 2)
 * int a = 2
 * a << 1 = 4
 * a >> 1 = 1
 * 2、交换数swap
 *  //普通操作
    void swap(int &a, int &b) {
        a = a + b;
        b = a - b;
        a = a - b;
    }

    // 位运算
    void swap(int &a, int &b){
        a ^=b;
        b ^=a;
        a ^=b;
    }
    异或支持交换律和结合律
 * 3、判断奇偶数
 * 根据数的最后一位是 0 还是 1 来决定即可，为 0 就是偶数，为 1 就是奇数
 *  x & 1 === 0 偶数 否则为 奇数
 * 4. 位操作交换符号
 * 交换符号将正数变成负数，负数变成正数
 *  ~x + 1  : 正数取反加1，正好变成其对应的负数(补码表示)；负数取反加一，则变为其原码，即正数
 * 注： 计算机实际运算都是补码进行的
 * 5. 位操作求绝对值
 * 整数的绝对值是其本身，负数的绝对值正好可以对其进行取反加一求得，即我们首先判断其符号位（整数右移 31 位得到 0，负数右移 31 位得到 -1,即 0xffffffff），然后根据符号进行相应的操作
    int abs(int a) {
        int i = a >> 31;
        return i == 0 ? a : (~a + 1);
    }
 * 6. 位操作进行高低位交换
 * s & ~s
 */

/**
 *
 * @param {*} nums
 */
var majorityElement = function (nums) {
    let n = nums.length
    let half = n / 2
    let obj = {}
    let arr = []
    nums.forEach(item => {
        if (obj.hasOwnProperty(item)) {
            obj[item] += 1
        } else {
            obj[item] = 1
        }
        if (obj[item] > half) {
            !arr.includes(item) && arr.push(item)
        }
    })
    return arr
}
var majorityElement = function (nums) {
    return nums.sort((a, b) => a - b)[Math.floor(nums.length / 2)]
}

// 输入：[2,2,1,1,1,2,2]
// 输出：2
var arr = [2, 2, 1, 1, 1, 2, 2]
console.log(majorityElement(arr))
var arr2 = [1]
console.log(majorityElement(arr2))
var arr3 = [1, 1, 1, 1, 1, 1, 8]
console.log(majorityElement(arr3))

/**
 * 汉诺塔
 * @param {*} A
 * @param {*} B
 * @param {*} C
 * @returns
 */
var hanota = function (A, B, C) {
    var N = A.length
    var move = (N, A, B, C) => {
        if (N === 1) {
            C.push(A.pop())
        } else {
            move(N - 1, A, C, B)
            C.push(A.pop())
            move(N - 1, B, A, C)
        }
    }
    move(N, A, B, C)
    return C
}
var A = [2, 1, 0],
    B = [],
    C = []
console.log(hanota(A, B, C))

// 玩汉诺塔工具
var move = (N, A, B, C) => {
    if (N === 1) {
        console.log(A, '->', C)
    } else {
        move(N - 1, A, C, B)
        console.log(A, '->', C)
        move(N - 1, B, A, C)
    }
}
console.log(move(3, 'A', 'B', 'C'))

//1 ================================================================
let a = 1
function b(a) {
    a = 2
    console.log(a)
}
b(a)
console.log(a)
// 2 1
//2 ================================================================
function a(b = c, c = 1) {
    console.log(b, c)
}
a()
//   报错  暂时性死区

//3 ================================================================
let a = (b = 10)
;(function () {
    let a = (b = 20)
})()
console.log(a)
console.log(b)
// 10 20

//4 ================================================================
var a = { n: 1 }
var b = a
a.x = a = { n: 2 }
console.log(a.x)
console.log(b.x)
// undefined  {n:2}  因为.运算符优先级最高，所以会先执行a.x

//5 ================================================================

var arr = [0, 1, 2]
arr[10] = 10
console.log(
    arr.filter(function (x) {
        return x === undefined
    })
)
// []
/**
 * arr10]=10,那么索引3到9位置上都是undefined
 * arr[3]等打印出来也确实是undefined
 * 但是，这里其实涉及到ECMAScript版本不同对应方法行为不同的问题
 * ES6之前的遍历方法都会跳过数组未赋值过的位置，也就是空位，但是ES6新增的for of方法就不会跳过
 */
//6 ================================================================

var name = 'World'
;(function () {
    if (typeof name === 'undefined') {
        var name = 'Jack'
        console.info('Goodbye ' + name)
    } else {
        console.info('Hello ' + name)
    }
})()
// Goodbye jack

//7================================================================

console.log(1 + NaN)
console.log('1' + 3)
console.log(1 + undefined)
console.log(1 + null)
console.log(1 + {})
console.log(1 + [])
console.log([] + {})

// NaN  '13'  NaN  1 '1[object Object]' 1 '[object Object]'

//8================================================================

var a = {},
    b = { key: 'b' },
    c = { key: 'c' }
a[b] = 123
a[c] = 456
console.log(a[b])

// 456
//9================================================================
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
var out = 25
var inner = {
    out: 20,
    func: function () {
        var out = 30
        return this.out
    }
}
console.log((inner.func, inner.func)()) // 25
console.log(inner.func()) // 20
console.log(inner.func()) //20
console.log((inner.func = inner.func)()) // 25

//10================================================================
let { a, b, c } = { c: 3, b: 2, a: 1 }
console.log(a, b, c)
// 1，2，3

//11================================================================
console.log(Object.assign([1, 2, 3], [4, 5]))
// [4,5,3]

//12================================================================

var x = 1
switch (x++) {
    case 0:
        ++x
    case 1:
        ++x
    case 2:
        ++x
}
console.log(x)
// 4  1->case1: x++, ++x, 无break  -> case2: ++x  ---> 4

//13================================================================

console.log(typeof undefined == typeof NULL)
console.log(typeof function () {} == typeof class {})
// true true

// 14================================================================

var count = 0
console.log(typeof count === 'number')
console.log(!!typeof count === 'number')

// true false   逻辑非!的优先级比全等===高

// 15================================================================
;('use strict')
a = 1
var a = 2
console.log(window.a)
console.log(a)
// 2 2

// 16 ================================================================
var i = 1
function b() {
    console.log(i)
}
function a() {
    var i = 2
    //   function c() {
    //       console.log('c', i)
    //   }
    //   c()
    b()
}
a()
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!作用域的问题   1

// 17 ================================================================

var obj = {
    name: 'abc',
    fn: () => {
        console.log(this.name)
    }
}
obj.name = 'bcd'
obj.fn()
// undefined 这道题考察的是this的指向问题，箭头函数执行的时候上下文是不会绑定this的，所以它里面的this取决于外层的this，
// 这里函数执行的时候外层是全局作用域，所以this指向window，window对象下没有name属性，所以是undefined。

// 18 ================================================================
const obj = {
    a: {
        a: 1
    }
}
const obj1 = {
    a: {
        b: 1
    }
}
console.log(Object.assign(obj, obj1))
//{a: {b:1}} assign方法执行的是浅拷贝

// 19 ================================================================

console.log(a)
var a = 1
var getNum = function () {
    a = 2
}
function getNum() {
    a = 3
}
console.log(a)
getNum()
console.log(a)
// undefined 1 2

// 20 ================================================================

var scope = 'global scope'
function a() {
    function b() {
        console.log(scope)
    }
    return b
    var scope = 'local scope'
}
a()()

// undefined  虽然var声明是在return语句后面，但还是会提升到a函数作用域的顶部

// 21 ================================================================

function fn() {
    console.log(this)
}
var arr = [fn]
arr[0]()
// [f] 数组本身   函数作为某个对象的方法调用，this指向该对象，数组显然也是对象，只不过我们都习惯了对象引用属性的方法：obj.fn，但是实际上obj['fn']引用也是可以的。

// 22 ================================================================

var a = 1
function a() {}
console.log(a)

var b
function b() {}
console.log(b)

function b() {}
var b
console.log(b)

// 1 function b  function b
// 函数声明和var声明，这两者都会发生提升，但是函数会优先提升，所以如果变量和函数同名的话，变量的提升就忽略了。

// 23 ================================================================

function Foo() {
    getName = function () {
        console.log(1)
    }
    return this
}
Foo.getName = function () {
    console.log(2)
}
Foo.prototype.getName = function () {
    console.log(3)
}
var getName = function () {
    console.log(4)
}
function getName() {
    console.log(5)
}

//请写出以下输出结果：
Foo.getName()
getName()
Foo().getName()
getName()
new Foo.getName()
new Foo().getName()
new new Foo().getName()
/**
 * 2
 * 4
 * 1  返回this，因为是在全局环境下执行，所以this指向window
 * 1
 * 2 new Foo.getName()   <==> new (Foo.getName)() ==> 2
 * 3 因为点运算符（.）的优先级和new是一样高的，所以从左往右执行 new Foo().getName() <==> (new Foo()).getName()
 * 3 new ((new Foo()).getName))()
 */

// 24 =================================================================

const person = {
    address: {
        country: 'china',
        city: 'hangzhou'
    },
    say: function () {
        console.log(`it's ${this.name}, from ${this.address.country}`)
    },
    setCountry: function (country) {
        this.address.country = country
    }
}

const p1 = Object.create(person)
const p2 = Object.create(person)

p1.name = 'Matthew'
p1.setCountry('American')

p2.name = 'Bob'
p2.setCountry('England')

p1.say()
p2.say()

/**
 * it's Matthew, from England
 * it's Bob, from England
 */

// 25 =================================================================

setTimeout(function () {
    console.log(1)
}, 0)
new Promise(function (resolve) {
    console.log(2)
    for (var i = 0; i < 10000; i++) {
        i == 9999 && resolve()
    }
    console.log(3)
}).then(function () {
    console.log(4)
})
console.log(5)

/**
 * 2 3 5  4  1
 */

// 26 =================================================================
console.log('1')

setTimeout(function () {
    console.log('2')
    process.nextTick(function () {
        console.log('3')
    })
    new Promise(function (resolve) {
        console.log('4')
        resolve()
    }).then(function () {
        console.log('5')
    })
})

process.nextTick(function () {
    console.log('6')
})

new Promise(function (resolve) {
    console.log('7')
    resolve()
}).then(function () {
    console.log('8')
})

setTimeout(function () {
    console.log('9')
    process.nextTick(function () {
        console.log('10')
    })
    new Promise(function (resolve) {
        console.log('11')
        resolve()
    }).then(function () {
        console.log('12')
    })
})
// 1 7 6 8 2 4  9 11  3 5 9 11 10 12 node 10 之后
// 1 7 6 8 2 4  9 11  3 10 5 12 node 10 之前
// 178 24 59 11 12 无 process.nextTick 浏览器环境
/**
 * node 早期版本
 * process.nextTick node 环境
 * node 中宏任务被分成了几种不同的阶段
 * 两个定时器属于timers阶段，setImmediate属于check阶段，
 * socket的关闭事件属于close callbacks阶段，
 * 其他所有的宏任务都属于poll阶段，除此之外，
 * 只要执行到前面说的某个阶段，那么会执行完该阶段所有的任务，
 * 这一点和浏览器不一样，浏览器是每次取一个宏任务出来执行，执行完后就跑去检查微任务队列了，
 * 但是nodejs是来都来了，一次全部执行完该阶段的任务好了，那么process.nextTick和微任务在什么阶段执行呢，
 * 在前面说的每个阶段的后面都会执行，但是process.nextTick会优先于微任务。
 */
