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