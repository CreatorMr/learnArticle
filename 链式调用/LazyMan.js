LazyMan('Tony');
// Hi I am Tony

LazyMan('Tony').sleep(10).eat('lunch');
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
// Hi I am Tony
// I am eating lunch
// 等待了10秒...
// I am eating diner

LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food

class LazyManClass {
    constructor(name) {
      this.name = name
      this.tasks = []
      console.log(`Hi I am ${name}`)
      Promise.resolve().then(() => {
          this.next()
      })
    }

    // 先实现一个内部调用的_sleep
    _sleep(time) {
        return new Promise(resolve=>{
            setTimeout(() => {console.log(`等待了${time}秒`);resolve()},time*1000)
        })
    }
    sleep(time) {
        this.tasks.push(()=>{
            this._sleep(time).then(()=>{
                this.next()
            })
        })
        return this;
    }
    eat (type) {
        this.tasks.push(() => {
          console.log(`I am eating ${type}`)
          this.next();
        })
        return this
      }
      sleepFirst (time) {
        this.tasks.unshift(() => {
          this._sleep(time).then(() => {
            this.next()
          })
       })
       return this
      }
    
    next(){
        let fn = this.tasks.shift();
        fn && fn();
    }
    
 }
  
function LazyMan(name) {
    return new LazyManClass(name)
}
