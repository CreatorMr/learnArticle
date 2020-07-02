### webpack plugin

webpack plugin 简单来说做loader做不了的事, plugin更加灵活
但是文档在plugin和loader上并不友好，除了一写API说明很少

webpack插件具有apply属性的javascript对象。
超级简单的demo，然而还是啥也不知道
```Javascript
class MyPlugin {
  constructor(opt) {
    this.options = Object.assign({}, opt || {})
  }
  apply() {
    console.log('apply 函数执行了')
    compiler.hooks.afterEmit.tap('DemoPlugin', compilation => {
      console.log(compilation, '专门处理编译')
    })
    
  }
}
module.exports = MyPlugin
```
下面让走进源码结合官网文档的plugin的API去学习如何编写webpack-plugin
```Javascript
//webpack.js
module.exports = webpack = (opt, callback) => {
  const compiler;

  if(Array.isArray(opt)){

  }else {
    compiler = createCompiler(opt)
  }
  if(callback) {
    compiler.run((err, stats) => {
      //...
    })
  }
  return compiler;
}

const createCompiler = rawOptions => {
  for (const plugin of options.plugins) {
    if (typeof plugin === "function") {
      plugin.call(compiler, compiler);
    } else {
      plugin.apply(compiler);
    }
	}
}
```

从面createCompiler中，执行每个插件的apply传入compiler参数，而compiler 为 Compiler的实例，

##### webpack 版本 
webpack4.0支持， 最初用的之前的webpack项目直接写插件，一直报 钩子 of undefined。compiler也传了，打印了也有，就是hooks没有，后来发现项目的webpack 还是之前的老版本，醉了。
更新了webpack版本就好了，下面的说的就是更新之前其他包老版本存在问题，这里在处理demo的时候说个题外的，在webpack4.x版本环境下，vue-loader 的版本最好升到14.2.3等14.+版本，否则会兼容问题。(学习新东西，要从新建工程开始，在老的基础里搞，可能会走很多弯路；当然可以回过头再在老项目里跑，先理解，再填坑)

### 源码解析

在webpack.config.js中 webpack会按顺序实例化plugin对象。从上面入口webpack.js中 实际上对于插件的最重要的就是apply，依次调用每个plugin的apply方法
```Javascript
for (const plugin of options.plugins) {
  if (typeof plugin === "function") {
    plugin.call(compiler, compiler);
  } else {
    plugin.apply(compiler);
  }
}
```
通过接收的compiler对象 ，可以监听这个对象，从而触发各种事件，然后执行对应的操作函数。类似node 的EventEmitter,深入看下去其实就是发布订阅。

webpack本质上是一种事件流的机制，将每个插件都串联起来。之前整理的loader部分，现在的plugin部分和loader理解上大体一样。这里把webpack工作比成西天取经(哈哈，语文功底差，能比成啥就是啥了，重在理解)。  西天取经要九九八十一难，没有一难都是一次洗礼。 这里 Tapable就入场了。他们就是师徒四人(可能是多人，毕竟里面的钩子类辣么多，如下)
![tapable.jpg](http://106.52.111.158:3000/img/tapable.jpg)


在apply方法中执行 compiler.hooks.钩子(emit, afterDone, afterEmit, .....等)()
这些钩子都是师徒中的实例出来的（猴子的分身）

现在轮到compiler 
```Javascript
/**
* @param {string} context the compilation path
*/
class Compiler extends Tapable {
  constructor(context) { // context  process.cwd()
    this.hooks = {
      钩子1: new 某个Tapable的钩子类
      。。。
    }
  }
  watch() {} // 监听文件，有变动重新编译
  run() {} // 触发编译的所有工作
  emitAssets() {} // 将编译输出的文件写入本地
  createCompilation() { // 创建一个compilation对象，并将compiler自身作为参数传递
    return new Compilation(this);
  }
  compile() {} //触发编译，在内部创建compilation实例并执行相应操作
}
```


在demo中 compilation 专注编译，在compiler中 new Compilation(this) 的实例，这里递归createChildCompiler 就不在深入了。
在Compilation 处理编译的所有事情，找findModule、buildModule、getModule、processModuleDependencies、moduleGraph...
这里面包含模块资源、编译生成的资源，变化文件，依赖状态，关系图等，提供给plugin使用。
在实际使用中，compiler。hooks的使用场景根据文档查阅。比如我想改变文件内容，或者根据输入构造的新的数据结构存成新的文件到输出等。使用
```Javascript
afterEmit
AsyncSeriesHook
生成资源到 output 目录之后。
参数：compilation

```
到这里plugin的理解就先到这里了，目前只是在编写自定义插件的时候有些API看着理解不是很好，所以简单的通过看webpack的源码辅助理解