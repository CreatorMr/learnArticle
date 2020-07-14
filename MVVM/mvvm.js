class MVVM {
  constructor(options) {
    this.$el = options.el;
    this.$data = options.data;
    
    let computed = options.computed;
    let methods = options.methods;

    // 如果这个元素存在
    if(this.$el) {
      new Observer(this.$data)
      for (const key in computed) { // 有依赖关系  数据变化
        Object.defineProperty(this.$data, key, {
          get:()=>{
            if(typeof computed[key] === 'function') {
              return computed[key].call(this)
            } {
              return computed[key].get.call(this)
            }
          }
        })
      }
      for (const key in methods) {
        Object.defineProperty(this, key, {
          get: ()=>{
            return methods[key]
          }
        })
      }
      this.proxyVm(this.$data)
      console.log(this, ' 代理data 之后')
      // 编译
      new Compile(this.$el, this)
    }
    
  }

  proxyVm(data) { // 把数据代理到this 上
    for (const key in data) {
      Object.defineProperty(this, key, {
        get(){
          return data[key]
        },
        set(newVal) {
          data[key] = newVal
        }
      })
    }
  }
}


