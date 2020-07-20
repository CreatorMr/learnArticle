// after 
// 希望调用 某个函数 3次之后再去执行
function after(time, say) {
  return function(){
    if(--time === 0) {
      say();
    }
  }
}
let newSay = after(3, function say() {
  console.log('say')
})
newSay();
newSay();
newSay();


// 异步并发问题 同时发送多个请求，希望拿到最终的结果 {name,age ,address}