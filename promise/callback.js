// 什么叫高阶函数，如果一个函数的参数是一个函数（回调函数） 一个函数返回一个函数  （函数柯里化）
// 写代码时希望不要破坏原有的逻辑   而增加一些功能
// 对函数进行包装（装饰）AOP切片编程 （我们可以把核心抽离出来） 包装上自己的内容 切片AOP

const say = (...args) => {
  console.log('说话', args)
}

// 希望在调用say方法之前做一些事
// Function.prototype 给每个函数都扩展一些功能
Function.prototype.before = function(beforeFunc) {
  return (...args) => { // 箭头函数中没有this 指向
    beforeFunc(); // 调用用户提前传入的before方法
    // ... 有两个作用 在函数参数中 叫生育运算符  展开运算符
    this(...args); // apply 可以 一次的将数组传入
  }
}

let newSay = say.before(function() {
  console.log('before say')
})

newSay('a','b','c','d') //