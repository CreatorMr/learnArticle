[toc]
# 何为 tree-shaking


熟悉 webpack 的同学很多，使用和优化更是得心应手。


将模块中未被使用的代码剔除，仅打包有效代码，减少包体积。

支持tree-shaking 的构建工具
- Rollup
- Webpack2
- Closure compiler

工作机制及原理


Tree-shaking 是 DCE 的一种新的实现，Javascript同传统的编程语言不同的是，javascript绝大多数情况需要通过网络进行加载，然后执行，加载的文件大小越小，整体执行时间更短，所以去除无用代码以减少文件体积，对javascript来说更有意义。


### tree-shaking  及其 工作原理

先来简单介绍下 `tree-shaking`。 最早是由Rollup实现，是一种采用删除不需要的额外代码的方式优化代码体积的技术。

**Dead code elimination**


* DCE： 消除不可能执行的代码  (uglify完成了javascript的DCE, uglify目前不会跨文件去做DCE)
    - •代码不会被执行，不可到达

    - •代码执行的结果不会被用到

    - •代码只会影响死变量（只写不读）

    -

* tree-shaking: 消除没有用到的代码

    - 对顶层函数效果较好

ES6 module 特点：

- 只能作为模块顶层的语句出现
- import 的模块名只能是字符串常量
- import binding 是 immutable的


ES6模块依赖关系是确定的，和运行时的状态无关，可以进行可靠的静态分析，这就是tree-shaking的基础。所谓静态分析就是不执行代码，从字面量上对代码进行分析，ES6之前的模块化，比如我们可以动态require一个模块，只有执行后才知道引用的什么模块，这个就不能通过静态分析去做优化。

uglify目前不会跨文件去做DCE  但是 rollup 和 webpack 打包 使用uglify 都会消除

类消除实验中，rollup，webpack 均不能消除

rollup 只处理了函数和import/export变量
javascript 动态语言特定是的分析比较困难
Side Effect 广泛存在








前提： 模块必须是采用ES6Module语法。 tree-shaking依赖ES6静态语法：import 和export。

babel 存在 。 @babel/preset-env 默认将模块转成CommonJS缘分。
因此需要设置module：false。webpack2 后已经支持ESModule。




```javascript
// utils.js
export function a(){
    console.log('打我呀')
}

export function b() {
    console.log('有本事打我呀')
}
// index.js
import {a} from 'utils.js'
console.log(a(), '真的打了。。。。')

```


webpack 对模块打标记   压缩工具 uglifyjs-webpack-plugin

压缩工具的作用
- 混淆
- 压缩
- 最小化
- 删除不可达代码等

tree-shaking 依赖于对模块导出和被导入的分析。

optimization.providedExports ： 确定每个模块的导出， 用于其他优化或代码生成，默认所有模式都开启。

optimization.usedExports: 确定每个模块被使用的导出，。 生产模式下默认开启， 其他模式下不开启


webpack 对代码的标记， 把import和export 标记成3类
- 所有import标记为 /* harmony import */
- 被使用过的export标记为/harmony export([type])/，其中[type]和webpack内部有关，可能是binding，immutable等；
- 没有被使用的export标记为/* unused harmony export [FuncName] */，其中[FuncName]为export的方法名，之后使用Uglifyjs（或者其他类似的工具）进行代码精简，把没用的都删除。


usedExports 未开启

所有export 都被标记 /* harmony export (binding )*/
打包不会删除未被使用的

usedExports 开启
未被使用的export会被标记 /* unused harmony export name */, 不会使用__webpack_require__.d 进行exports 绑定 

 
webpack对于es模块的实现，也是基于自己实现的__webpack_require__ 和__webpack_exports__ ，装换成类似于commonjs的形式。对于es模块和commonjs混用的情况，则需要通过__webpack_require__.n的形式做一层包装来实现。


生产模式 production 内置了  ModuleConcatenationPlugin 插件
实现‘预编译’  模块依赖关系图

concatenated module


涉及到
提升作用域
总结
- 开启 scopeHoisting，所有代码都打包到一个作用域内， 然后使用压缩工具根据变量是否被引用进行处理，删除未被引用的代码
- 未开启ScopeHoisting：每个模块保持自己的作用域，由webpack的treeShaking对export打标记，未被使用的导出不会被webpack链接到exports（即被引用数为0），然后使用压缩工具将被引用数为0的变量清除

 **sideEffects** 

webpack v4 开始新增了一个 sideEffects 特性，通过给 package.json 加入 sideEffects: false 声明该包模块是否包含 sideEffects(副作用)，从而可以为 tree-shaking 提供更大的优化空间。

```javascript
import { a } from 'xx'

--->

import { a } from 'xx/a'

// 作用同 babel-plugin-imoprt
```

treeShaking可以删除未被导出使用的代码，而sideEffects决定了副作用的处理方式，可以进一步提高有效代码的纯粹度；