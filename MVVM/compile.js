class Compile {
  constructor(el, vm) {
    // 判断一个el 属性是不是一个元素 
    this.$el = this.isElement(el) ? el : document.querySelector(el)
    console.log(this.$el)
    this.vm = vm;
    if(this.$el) {
      let fragment = this.nodeToFragment(this.$el)
      console.log(fragment)
      this.compile(fragment)
      this.$el.appendChild(fragment)
    }
  }
  isElement(el) {
    return el.nodeType === 1
  }
  nodeToFragment(el) {
    // 创建一个文档碎片
    let fragment = document.createDocumentFragment()
    let firstChild;
    while(firstChild = el.firstChild) {
      // 把当前页面中的节点移到内存中   appendChild 具有移动性
      fragment.appendChild(el.firstChild)
    }
    return fragment;
  }
  
  compile(fragment) {  // 编译内存中DOM节点
    let childNodes = fragment.childNodes;
    [...childNodes].forEach(child => {
      // 判断是node节点还是文本
      if(this.isElement(child)){
        this.compileElement(child)
        // 如果是元素的话，需要把自己传进去， 再去遍历子节点
        this.compile(child)
      } else {
        this.compileText(child)
      }
    })
  }
  compileElement(node) { // 编译元素的
    let attributes = node.attributes;
    [...attributes].forEach(attr => {
      console.log(attr) // v-model = "person.age"
      let {name, value} = attr;
      if(this.isDirective(name)) { // v-model v-html v-bind
        // 需要调用不同的指令来处理
         // v-text v-html v-on:click
        let [, type] = name.split('-')
        let [nodeType, eventType] = type.split(':')
        debugger
        CompileUtil[nodeType](node, value, this.vm, eventType)
      } else if(this.starsWith2(name)){
        let eventType = name.slice(1)
        CompileUtil['on'](node, value, this.vm, eventType)
      } else {

      }
    })
  }
   // 编译文本的
  compileText(node) { // 判断当前文本节点中内容是否包含{{xxxx }} 获取xxxx
    let expr = node.textContent
    let reg = /\{\{(.+?)\}\}/
    if(reg.test(expr)) {
      console.log(expr) // 找到所有文本
      // 文本节点
      CompileUtil['text'](node, expr, this.vm) // {{a}} {{b}}
    }
  }
  isDirective(str) { // 判断是不是指令的
    return str.startsWith('v-')
  }

   starsWith2(str) {
    return str.startsWith('@')
  }
}


const CompileUtil = {
  setVal(expr, vm, value) {
    expr.split('.').reduce((pre,next)=> {
      pre[next] = value
    }, vm.$data)
  },
  getValue(expr, vm) { // 根据表达式取到对应的数据
    console.log(expr, '77777777')
    // vm.data.person.name
    let value = expr.split('.').reduce((pre, next)=> {
      return pre[next]
    }, vm.$data)
    return value
  },
  getContentValue(vm, expr){
    
    // 遍历表达式，将内容重新替换成一个完整的内容， 返还回去
    return expr.replace(/\{\{(.+?)}\}/g, (...args)=> {
      console.log(args[1], 'getContentValue')
      return this.getValue(args[1], vm)
    })
  },
  text(node, expr, vm) {
    // 获取expr :{{person.name}}  拿到 person.name
    let updateFn = this.updater['textUpdater'];
    //  this.updater.textUpdater(node, expr)
    let value
    if(expr.indexOf('{{') != -1){
      value = expr.replace(/\{\{(.+?)}\}/g, (...args)=> {
        console.log(args[1],'00000',vm,'99999',expr, '----------')
        // 给表达式中每个{{}}都加上观察者
        new Watcher(vm, args[1], (newVal) => {
          // this.getContentValue(vm,expr) // 返回了一个全的字符串
          updateFn(node, this.getContentValue(vm,expr))
        })
        return this.getValue(args[1], vm)
      })
    }
    else {
      value = this.getValue(expr, vm)
    }
    updateFn && updateFn(node, value)
  },
  html(node, expr, vm) {
    let updateFn = this.updater['htmlUpdater']
    new Watcher(vm, expr, (newVal) => {
      console.log('newVal', newVal)
      updateFn && updateFn(node, newVal)
    })
    let value = this.getValue(expr, vm)
    updateFn && updateFn(node, value)
  },
  model(node, expr, vm) { // node 是节点 expr是表达式  vm 是当前实例
    let updateFn = this.updater['modelUpdater']
    new Watcher(vm, expr, (newVal) => { // g给输入框加一个观察者，稍后数据更新会触发次方法，会拿新值 给输入框赋值
      updateFn && updateFn(node, newVal)
    })
    let value = this.getValue(expr, vm)
    node.addEventListener('input', (e) => {
      console.log('输入输入')
      this.setVal(expr, vm, e.target.value)
    })
    updateFn && updateFn(node, value)
  },
  on(node, expr,vm, eventType) {
    let fn = vm[expr]
    node.addEventListener(eventType, fn.bind(vm), false)
  },
  updater: {
   	//文本更新
		textUpdater(node,value){
			node.textContent = value;
		},
		//输入框更新
		modelUpdater(node,value){
			node.value = value;
    },
    
    htmlUpdater(node, value) {
      node.innerHTML = value
    }
  }
}