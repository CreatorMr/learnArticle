class Observer {
  constructor(data) {
    this.observer(data)
  }
  observer(data) {
    if( data && typeof data === 'object') {
      for(let key in data ) {
        this.defineReactive(data, key, data[key])
      }
    }
  }

  defineReactive(data, key, value) {
    this.observer(value)
    const dep = new Dep() // 给每个属性 都加上一个具有发布订阅的功能
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: false,
      get() {
        // 创建watcher时， 会取到对应的内容，并且把watcher放到了全局上
        Dep.target && dep.addWatcher(Dep.target)
        return value
      },
      set(newVal) {
        if(newVal != value) {
          // this.observer(newVal)
          value = newVal
          dep.notify()
        }
      }
    })
  }
}