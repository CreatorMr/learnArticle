// Array.from() es6

var obj = {
    0: 1,
    1: 2,
    2: 3
}

console.log(obj.length)

var obj2 = {
    0: 1,
    1: 2,
    2: 3,
    push: [].push
}

obj2.push(9)
console.log(obj2, obj2.length)

// ----

var obj3 = {
    0: 1,
    1: 2,
    2: 3,
    length: 3
}

/**
 * [
 *   {
 *
 *        studentId: 1,
 *        order: 0,
 *   },
 * {
 *
 *        studentId: 2,
 *        order: 1,
 *   },
 *  {
 *
 *        studentId:3,
 *        order: 2,
 *   },
 * ]
 */
const newArr = Array.from(obj3) //[1,2,3]

// const data = newArr.map((item, index) => {
//     return {
//         studentId: 'ooo'+item,
//         order: index
//     }
// })

const data2 = Array.from(obj3, function (item, index) {
    return {
        studentId: 'ooo' + item,
        order: index
    }
})

const data2 = Array.from(
    obj3,
    function (item, index) {
        return {
            studentId: this.prefix + item,
            order: index
        }
    },
    {
        prefix: 'no'
    }
)

// 对象化 new Object()
var obj4 = {}

obj4.a = 1

var newObj = new Object(obj4)
console.log(newObj === obj4) // true

const arr2 = [2,3,4]
var newArr2  = new Object(arr2)
var newArr3 = new Array(arr2)
console.log(newArr2 === arr2) // true
console.log(newArr3 === arr2) // false

// function Array  Object --> 引用值 ---> Object.prototype


// Object.keys  Object.getOwnPropertyNames


// Array.from 如何实现？？？？