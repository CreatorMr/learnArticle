### webpack之 Tapable 

webpack 工作本质上是一种事件流的工作机制。之前整理的loader和plugin 其中都是通过Tapable串联起来的。所以说Tapable是webpack中base类。在webpack 启动编译 都在运用这Tapable 中的钩子方法
webpack 编译Complier构造器的hooks都是Tapable的实例，在compilation中hooks同样也是。如代码
```
//compiler
	this.hooks = Object.freeze({
			/** @type {SyncHook<[]>} */
			initialize: new SyncHook([]),
			done: new AsyncSeriesHook(["stats"]),
			afterEmit: new AsyncSeriesHook(["compilation"]),
      ... 
  })
// compilation
	this.hooks = Object.freeze({
			/** @type {SyncHook<[Module]>} */
			buildModule: new SyncHook(["module"]),
			/** @type {SyncHook<[Module]>} */
			rebuildModule: new SyncHook(["module"]),
			/** @type {SyncHook<[Module, WebpackError]>} */
			failedModule: new SyncHook(["module", "error"]),
			/** @type {SyncHook<[Module]>} */
			succeedModule: new SyncHook(["module"]),
			/** @type {SyncHook<[Module]>} */
			stillValidModule: new SyncHook(["module"]),
      ...
  })
```
下面让我们走进Tapable 类

还记得我们在plugin中的图，这里再放一遍
![tapable.jpg](http://106.52.111.158:3000/img/tapable.jpg)


这里的所有的钩子类都是在HooK.js 的实例上扩展而产生的。都是由 HookCodeFactory和Hook 而来。
调用HookCodeFactory 的create方法，创造不同形式的new Function 最后 return fn 

不同钩子的用法
| 钩子 | type | desc |
| ------ | ------ | ------ |
| SyncHook | 同步串行 |  不关心监听函数的返回值 |
SyncBailHook | 同步串行| 只要监听函数中有一个返回值不为 null/undefined，则跳过剩下所有的逻辑
|SyncWaterfallHook|同步串行|上一个监听函数的返回值可以传给下一个监听函数
|SyncLoopHook|同步循环|当监听函数被触发的时候，如果该监听函数返回true时则这个监听函数会反复执行，如果返回 undefined 则表示退出循环
|AsyncParallelHook|异步并发|不关心监听函数的返回值
|AsyncParallelBailHook|异步并发|只要监听函数的返回值不为 null，就会忽略后面的监听函数执行，直接跳跃到callAsync等触发函数绑定的回调函数，然后执行这个被绑定的回调函数
|AsyncSeriesHook|异步串行|不关系callback()的参数
|AsyncSeriesBailHook|异步串行|callback()的参数不为null，就会直接执行callAsync等触发函数绑定的回调函数
|AsyncSeriesWaterfallHook|异步串行|上一个监听函数的中的callback(err, data)的第二个参数,可以作为下一个监听函数的参数

##### 最小单元
tapable实际上就是运用的发布订阅模式
```
class SyncHook{
    constructor(args) {
        this.tasks = []
    }
    tap(name,task) {
        this.tasks.push(task);
    }
    call(){
        this.tasks.forEach(task=>task(...arguments))
    }
}

let hook = new SyncHook(['name']);

hook.tap('node', function(name){
    console.log('node', name);
})
hook.tap('vue', function(name){
    console.log('vue', name);
})

hook.call('creator');
```

像SyncHook和BailSyncHook 的区别返回值的问题，遇到null是否继续  tap（） 存在return 。 其他钩子waterfall 链式传值等。一个一个使用中理解每种钩子的使用场景和实现方式的匹配关系。
```
class SyncBailHook{
    constructor(args) {
        this.tasks = []
    }
    tap(name,task) {
        this.tasks.push(task);
    }
    call(){
        let ret;
        let index = 0;
        do {
            if(index<this.tasks.length) {
                ret = this.tasks[index++](...arguments)
            }
        } while (ret === undefined && index < this.tasks.length);
    }
}

let hook = new SyncBailHook(['name']);

hook.tap('node', function(name){
    console.log('node', name);
    return 'node --停止'
})
hook.tap('vue', function(name){
    console.log('vue', name);
})

hook.call('creator');
```











