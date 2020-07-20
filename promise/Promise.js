const promise = new Promise((resolve) => {
    console.log(1);
    resolve();
    console.log(2);
})

promise.then(()=> {
    console.log(3);
}).then(() =>{
    console.log(5)
})
console.log(4);

/*
分析：Promise 首次新建完成会立即执行，会输出1 2 Promise.then() 内部的代码在当次的事件循环的结尾立刻执行。，所以会输出4，最后输出3、
    

    下面对比下，直接.then()
 */

new Promise((resolve) => {
    console.log(1)
    setTimeout(()=>{
        resolve()
        console.log(2)
    },0)
    // resolve(1)
    Promise.resolve(1).then(()=>{
        console.log(7)
        resolve(1)
    }) //新的promise
}).then((res)=>{
    console.log(res)
    console.log(3)
    setTimeout(()=>{
        console.log(4)
    },0)
}).then(() => {
    console.log(6)
})
console.log(5)


/* 
    Promise.resolve(value)方法返回一个以给定值解析后的Promise 对象。
    但如果这个值是个thenable（即带有then方法），返回的promise会“跟随”这个thenable的对象，
    采用它的最终状态（指resolved/rejected/pending/settled）；
    如果传入的value本身就是promise对象，则该对象作为Promise.resolve方法的返回值返回；
    否则以该值为成功状态返回promise对象。状态为resolved.

    Promise.resolve 方法的参数，会同时传给回调函数。

    then 方法接受的参数是函数，而如果传递的并非是一个函数，它实际上会将其解释为 then(null)，这就会导致前一个 Promise 的结果会穿透下面。
*/
//使用静态方法Promise.resolve
Promise.resolve("Success").then(function(value) {
    console.log(value); // "Success"
  }, function() {
    // 不会被调用
  });
//resolve另一个对象
var original = Promise.resolve('我在第二行');
var cast = Promise.resolve(original);
cast.then(function(value) {
  console.log('value: ' + value);
});
console.log('original === cast ? ' + (original === cast));
var second = Promise.resolve('我在第二行')
var cast2 = Promise.resolve(second);
console.log('cast === cast2' + ' ' + (cast === cast2))
var cast3 = Promise.resolve(original);
console.log('cast === cast3' + ' ' + (cast === cast3))
/*
*  打印顺序如下，这里有一个同步异步先后执行的区别
*  original === cast ? true
*  value: 我在第二行
*/

//resolve thenable 的对象们并抛出错误
// Resolve一个thenable对象
var p1 = Promise.resolve({ 
    then: function(onFulfill) { onFulfill("fulfilled!"); }
  });
  console.log(p1 instanceof Promise) // true, 这是一个Promise对象
  
  p1.then(function(v) {
      console.log(v); // 输出"fulfilled!"
    }, function() {
      // 不会被调用
  });
// Thenable在callback之前抛出异常
// Promise rejects
var thenable = { then: function(resolve) {
    throw new TypeError("Throwing");
    resolve("Resolving");
}};
  
var p2 = Promise.resolve(thenable);
p2.then(function() {
    // 不会被调用
}, function(e) {
    console.log(e); // TypeError: Throwing
})  

// Thenable在callback之后抛出异常
// Promise resolves
var thenable = { then: function(resolve) {
    resolve("Resolving");
    throw new TypeError("Throwing");
}};
  
var p3 = Promise.resolve(thenable);
p3.then(function(v) {
    console.log(v); // 输出"Resolving"
}, function(e) {
    // 不会被调用
});


Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log)


Promise.resolve(1)
    .then(Promise.resolve(3))
    .then(()=>{console.log(3)})

const first = () => (new Promise((resolve, reject) => {
    console.log(3);
    let p = new Promise((resolve, reject) => {
        console.log(7);
        setTimeout(() => {
            console.log(5);
            resolve(6);
        }, 0)
        resolve(1);
    });
    resolve(2);
    p.then((arg) => {
        console.log(arg);
    });
    
}));
    
first().then((arg) => {
    console.log(arg);
});
console.log(4);   
// 3 7 4 1 2 5
/* 
先执行宏任务，主script ，new Promise立即执行，输出【3】，
执行 p 这个new Promise 操作，输出【7】，
发现 setTimeout，将回调放入下一轮任务队列（Event Queue），p 的 then，姑且叫做 then1，放入微任务队列，发现 first 的 then，叫 then2，放入微任务队列。执行console.log(4)，输出【4】，宏任务执行结束。
再执行微任务，执行 then1，输出【1】，
执行 then2，输出【2】。
到此为止，第一轮事件循环结束。开始执行第二轮。

第二轮事件循环
先执行宏任务里面的，也就是 setTimeout 的回调，输出【5】。
resolve(6) 不会生效，因为 p 这个 Promise 的状态一旦改变就不会在改变了。
 */

var p = new Promise(function(resolve, reject){
    resolve(1);
  });
  p.then(function(value){               //第一个then
    console.log(value);
    return value*2;
  }).then(function(value){              //第二个then
    console.log(value);
  }).then(function(value){              //第三个then
    console.log(value);
    return Promise.resolve('resolve'); 
  }).then(function(value){              //第四个then
    console.log(value);
    return Promise.reject('reject');
  }).then(function(value){              //第五个then
    console.log('resolve: '+ value);
  }, function(err){
    console.log('reject: ' + err);
  })
  /* 
    1
    2
    undefined
    "resolve"
    "reject: reject" */
  
//   链接：https://juejin.im/post/597724c26fb9a06bb75260e8





var p1 = Promise.resolve( 1 );
var p2 = Promise.resolve( p1 );
var p3 = new Promise(function(resolve){
  resolve(1);
});
var p4 = new Promise(function(resolve){
  resolve(p1);
});

console.log(p1 === p2); 
console.log(p1 === p3);
console.log(p1 === p4);
console.log(p3 === p4);

p4.then(function(value){
  console.log('p4=' + value);
});

p2.then(function(value){
  console.log('p2=' + value);
})

p1.then(function(value){
  console.log('p1=' + value);
})
/* 
true
false
false
false
p2=1
p1=1
p4=1 */
console.log('beging')
setTimeout(()=>{
    console.log('setTimeout')
    Promise.resolve().then(()=>{
        console.log('promise1')
        setTimeout(()=>{
            console.log('setTimeout promis1 && promis2')
        })
    }).then(()=>{
        console.log('promise2')
        
    }).then(()=>{
        console.log('ssss')
    })
},0)
new Promise((resolve,reject)=>{
    console.log('eeeee')
    // for(let i =0;i<99;i++){
    //     console.log('chuce')
    //     resolve();
    // }
    console.log('sdfasd')
}).then(()=>{
    console.log('then')
})
console.log('end')

/* 3 4 1 */
setTimeout(function(){
  console.log(1);
}, 0)

Promise.resolve(function(){
  console.log(2);
})
new Promise(function(resolve){
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