// 观察者 发布订阅 
/**
 * vm.$watch(vm, 'person.name', (newValue) => {})
 */
class Watcher{
  constructor(vm, expr, cb) {
    this.vm = vm
    this.expr = expr
    this.cb = cb
    // 默认先存放一个老值
    this.oldValue = this.getOldValue()
  }
  getOldValue() {
    Dep.target = this; // 先把自己放在全局的Dep 类上
    // 取值  把这个观察者  和数据关联起来
    let value = CompileUtil.getValue(this.expr, this.vm)
    Dep.target = null
    return value
  }
  update() { // 更新操作，数据变化，调用观察者的update方法
    let newValue = CompileUtil.getValue(this.expr,this.vm)
    if(newValue !== this.oldValue) {
      this.cb(newValue)
    }
  }
}

// 发布(subject)  存放观察者的地方  存放所有的watcher
class Dep{
  constructor() {
    this.subs = [] 
  }
  // 订阅
  addWatcher(watcher) {
    this.subs.push(watcher)
  }
  // 发布
  notify() {
    this.subs.forEach(x=>x.update())
  }
}