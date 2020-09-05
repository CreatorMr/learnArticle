async function a(){

  console.log("a函数执行等待b函数")
  await b();
	console.log("b执行完了")
}
async function b (){
  console.log("b函数执行");
}
console.time("ss")

// a().then(()=>{
// 	console.log("执行最后的回调");
// 	console.timeEnd("ss")
// })
(async ()=>{
	await a();
	console.log("执行最后的回调");
	console.timeEnd("ss")
})()


function a(){
 return new Promise((resolve,reject)=>{
    console.log("a函数执行等待b函数")
    b().then(()=>{console.log("b函数执行完了");resolve();})
  })

}
function b (){

 return new Promise((resolve,reject)=>{
    console.log("b函数执行");
   resolve();

 })
}
console.time("ss")
a().then(()=>{
	console.log("执行最后的回调");
	console.timeEnd("ss")
})


console.log(1) 
setTimeout(_=>console.log(10), 0)
new Promise(resolve=> {
  console.log(2)
  resolve()
}).then(r=> {
  console.log(3)
  new Promise(resolve => {
    console.log(6)
    resolve()
  }).then(p=>{
    console.log(7)
  })
}).then(s=> {
  console.log(4)
})
console.log(5)



new Promise((resolve, reject) => {
  console.log('log 外部的promise')
  resolve()
}).then(_=> {
  console.log('log 外部的第一个then')
  new Promise((resolve, reject) => {
    console.log('log 内部的promise')
    resolve()
  }).then(s => {
    console.log('log 内部的第一个then')
  }).then(d=>{
    console.log('log 内部的第二个then')
  })

}).then(_=> {
  console.log('log 外部的第二个then')
})