https://www.cnblogs.com/unclekeith/p/7137047.html
## export
export用于输出模块的对外接口。export命令只要处于模块顶层就可以使用，也就是说，如果处于某个函数作用域、判断语句、条件语句内，就会报错。export命令有几种输出形式。

```javascript
PS: export命令可用于输出任何数据类型，可以是Number, String, Boolean, Null, Undefined, Array, Object, Function .... 以输出函数与对象举例

1. export var obj = { name: 'keith' } // 直接输出

2. var obj = { name: 'keith' }
   export { obj }  // 使用该种形式输出时需要添加大括号
   export obj   // 不添加大括号时会报错，因为我们要输出的是该对象的引用。注意是对该对象的引用，而不是拷贝。这也意味着在该模块改变name属性，会导致另一个模块下name属性的变化，这点与CommonJS不同，CommonJS只是对某个对象的拷贝
   var num = function () { return 123 }
   export { num }  // 正确
   export num // 报错，输出对num的引用，而不是直接输出函数num

3. var obj = { name: 'keith' }
   export { obj as person }  // export命令支持接口的重命名

4  var obj = { name: 'keith' }
   export default obj
   // 输出默认值时不需要添加大括号, export default在一个模块中只能使用一次，但export命令可以使用多次

   // export default的本质：就是将某个变量命名为default
   // export default num
   // 等同于 export { num as default }
   // import Num from './module.js'
   // 等同于 import { defualt as Num } from './module.js'

5  export { num, obj }
   // export命令处于模块顶层的任何位置，都可以将变量输出
   // 不管是用var声明的变量，还是let声明的变量
   // 在执行过程中export命令会被默认放置在整个模块的最底层。
   var num = function () { return 123 };
   let obj = { name: 'keith' }
   // 相当于
   var num = function () { return 123 };
   var obj = { name: 'keith' }
   // ..函数、对象等其他数据类型
   // 被放置在模块最底层
   export { name, obj }
```

## import
export命令用于输出模块的对外接口，import命令用于引入其他模块提供的功能接口。与export命令一样，import命令只能用于模块顶层，不能用于函数作用域、条件语句、判断语句内。import命令有以下几种形式。

```javascript
1. import { num, obj } from './export.js'  // 模块名，可以不添加.js后缀，但需要写配置文件，与Node知识相关
   // import入的接口名字，要与export出的名字对应
   console.log(num()) // 123
   console.log(obj.name) // 'keith'

2. import { obj as person } from './export.js'
   // 可以修改import进来的变量名
   console.log(person.name) // 'keith'

3. import * as $ from './export.js'
   // 使用*用于模块的整体加载，并重命名为$对象.此时可以通过$对象取到export的对外接口
   console.log($.num()) // 123
   console.log($.obj.name) // 'keith'

4. import 'normalize.css'
   // 用于加载整个模块，此时不需要添加变量名

5. let obj = { name: 'keith' }
   export default obj

   import person from './module.js'
   import boy from './module.js'
   // 对应于export default 命令
   // 此时import进来的接口不需要添加大括号
   // 且支持import时的任意命名
   console.log(person.name) // 'keith'
   console.log(boy.name) // 'keith'

6. console.log(obj.name)  // 'keith'
   import { obj } from './export.js'
   // 与export相反，import默认会被提升到模块最顶层
   // 即
   import { obj } from './export.js'
   console.log(obj)
```

## export与import的复合写法

```javascript
1. 使用{}导出模块
export { Hello, World } from './modules'
// 相当于
import { Hello, World } from './moudles'
export { Hello, World }

2. 改写模块的名字
export { Hello as Person } from './modules'
// 相当于
import { Hello as Person } from './modules'
export { Person }

3. 改写默认export default模块的名字
export { default as Person } from './modules'
// 相当于
import Person from './modoules'  // ./modules里的模块是通过export default导出的
export { Person }
```