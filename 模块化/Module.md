# JavaScript模块化

## 阮一峰ES6入门 22章Module语法

在ES6之前，一些模块的加载方案就 CommonJS 和 AMD 两种；
- CommonJS 用于服务器
- AMD  用于浏览器


ES6 模块设计的思想就是尽量静态化，使得编译时就能确定依赖， 以及输入和输出的变量
而CommonJS只能在运行时确定这些东西。

比如CommonJS模块就是对象，输入的时候查找的必须也是对象
```javascript
let {stat, exists, readFile} = require('fs');
// 等价于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readFile = _fs.readFile;
```
上面实质是整体加载fs 模块(即所有的方法)， 生成一个_fs对象，然后从对象上获取三个方法。这种称为“运行时加载”。只有运行时才能得到这个对象，导致在编译的时候没办法做“静态优化”。

ES6模块不是对象， 而是通过export命令显示的输出的代码，再通过import命令输入。
```javascript
import {stat, exists, readFile} from 'fs';
```
只加载了三个方法，不加载其它的方法。
称为： “编译时加载”或“静态加载”

编译时就完成模块的加载，效率比CommonJS高。
<font color="red">这也导致了ES6模块无法被引用，因为不是对象。</font>

**ES6 && CommonJS**

CommonJS与ES6 Module最本质的区别在于CommonJS对模块依赖的解决是“动态的”而ES6 Module是“静态的”

ES6 {
  - export: 可以输出多个，输出方式 {},
  - export default: 只能输出一个，可以与export同时输出， 但是不建议这么做 
  - 解析阶段确定对外输出的方法，解析阶段生成方法。
  - 模块不是对象，加载的不是对象。
  - 可以单独加载其中的某个方法
  - 静态分析，动态引用，输出的是值的引用，值改变，引用也改变，即原来模块中的值改变则改加载的值也改变， this指向undefined
  - 对于只读来说，即不允许修改引入变量的值，import的变量是只读的，不论是基本数据类型还是复杂数据类型。当模块遇到import命令时，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。
  - 循环加载时，ES6模块是动态引用。只要两个模块之间存在某个引用，代码就能够执行
}

CommonJS {
  - module.exports =... : 只输出一个， 且后面会覆上面的
  - exports....: 可以输出多个
  - 运行时确定方法，运行时才会加载模块
  - 模块是对象，加载的是该对象
  - 加载的是整个模块，即将所有的方法全部加载进来，当使用require命令加载某个模块时，就会运行整个模块的代码。
  - 输出的值是拷贝， 即原来模块中的值改变不会影响已经加载的该值，this指向当前模块
  - 对于基本数据类型，属于复制。即会被模块缓存。同时，在另一个模块可以对该模块输出的变量重新赋值
  - 对于复杂的数据类型，数据浅拷贝，由于两个模块引用的对象指向同一个内存空间，因此对该模块的值做修改时会影响另一个模块。
  - 当使用require命令加载同一个模块时，不会再执行该模块，而是取到缓存之中的值。也就是说，CommonJS模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载，就返回第一次运行的结果，除非手动清除系统缓存。
  - 循环加载时，属于加载时执行。即脚本代码在require的时候，就会全部执行。一旦出现某个模块被"循环加载"，就只输出已经执行的部分，还未执行的部分不会输出。

}


即commonjs是运行时加载模块，ES6是在静态编译期间就确定模块的依赖；

ES6在编译期间会将所有import提升到顶部，commonjs不会提升require；

两者的模块导入导出语法不同，commonjs是module.exports，exports导出，require导入；ES6则是export导出，import导入；

commonjs导出的是一个值拷贝，会对加载结果进行缓存，一旦内部再修改这个值，则不会同步到外部。ES6是导出的一个引用，内部修改可以同步到外部

## 模块化

IE6 之前是没有JS 引擎的
渲染引擎

最早就是在script标签中写代码

模块化的发展
一个js 文件太大
index.js  index2.js  防止一个文件太大  最早的模块化 ---  出现公共的怎么办？ ---> common.js 提到公共的js 文件中 


CommonJS 的模块主要由原生的module来实现。
```javascript
Module {
  id: '',// 如果是mainModule id 固定为 '.', 如果不是则为模块的绝对路径
  exports: {},
  filename: '/absolute/path/to/entry.js', // 当前模块的绝对路径
  loaded: false, // 模块是否已加载完毕
  children: [], // 被该模块引用的模块
  parent: '', 第一个引用该模块的模块
  paths: [// 模块的搜索路径
    '/absolute/path/to/node_modules',
    '/absolute/path/node_modules',
    '/absolute/node_modules',
    '/node_modules'
  ]
}
```

为什么可以直接使用require方法加载模块？
在CommonJS编写模块的时候，会使用require来加载模块，使用exports来做模块的输出，还有module,_filename, __dirname 这些变量，为什么他们不需要引用就能使用？
答： Node在解析JS模块的时候，会先按文本读取内容，然后将模块内容进行包裹，在外层裹一个function， 传入变量。再通过vm.runInThisContext将字符串 转成 Function 形成作用域，避免全局污染，
```javascript
let wrap = function(script) {
  return Module.wrapper[0] + script + Module.wrapper[1];
};
 
const wrapper = [
  '(function (exports, require, module, __filename, __dirname) { ',
  '\n});'
];
```
参数中的 module 是当前模块的的 module 实例（尽管这个时候模块代码还没编译执行），exports 是 module.exports 的别名，最终被 require 的时候是输出 module.exports 的值。require 最终调用的也是 Module._load 方法。__filename，__dirname 则分别是当前模块在系统中的绝对路径和当前文件夹路径。

CommonJS -> require  同步

引用  创建一个模块实例  实例化
缓存机制

require 引用进来会模块会变成一个立即执行函数
(function(exports, require, module, _filename, __dirname) {

})()

**AMD**
AMD  就是 CommonJS 来的  CommonJS node上运行，浏览器运行不了
AMD  Asynchronous module definition 异步模块定义
```javascript
define(moduleName, [module], factory)  //定义模块
requie([module], callback) //引入模块
```

RequireJS 需要配置路径
```javascript
require.config({
  path: {
    moduleA: 'js/module_a.js'
  }
})

require(['moduleA','moduleB','moduleC'], function(moduleA,moduleB,moduleC) {
  console.log(moduleA,moduleB,moduleC)
})
```
moduleA,moduleB,moduleC 都加载完成 才执行回调函数， 三个module 是异步加载。但是执行回调函数需要等待都加载完成 **前置依赖**

**CMD**
阿里 模块化的标准 通用模块定义

```javascript
define(function(require, exports, module) {}) // 定义模块
seajs.use([module路径], function(moduleA, moduleB, moduleC) {}) // 使用模块 
```

靠require加载 define定义
exports导出 module 操作模块

依赖就近 按需加载  

跟CommonJS和AMD 本质上的不同 

AMD 依赖前置 模块都加载完成才执行回调

CMD 依赖就近，需要A 再去引用模块A  而不是在模块都加载完成再执行，而是在某个地方需要的时候 再加载， 产生依赖就近的原则。


## module.exports与exports，export与export default之间的关系和区别


优先使用 module.exports
为了方便，Node为每个模块提供一个exports变量，指向module.exports。这等同在每个模块头部，有一行这样的命令。
var exports = module.exports;

注意，因为 Node 模块是通过 module.exports 导出的，如果直接将exports变量指向一个值，就切断了exports与module.exports的联系，导致意外发生：
```JavaScript
// a.js
exports = function a() {};

// b.js
const a = require('./a.js') // a 是一个空对象

```




### 总结： 

1、CommonJS 模块输出的是一个值的拷贝
  ES6 模块输出的是值的引用
2、CommonJS模块是在运行时加载
   ES6 模块是在编译时加载，本身就是模块



YUI 模块化 JavaScript 函数库


参考： 
[CommonJS 和 ES6 Module 究竟有什么区别？](https://blog.csdn.net/xgangzai/article/details/106935104)
[CommonJS模块与ES6模块的区别](https://www.cnblogs.com/unclekeith/archive/2017/10/17/7679503.html)
[exports,module.exports,  export,export default ](https://segmentfault.com/a/1190000010426778)