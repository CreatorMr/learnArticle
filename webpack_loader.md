### webpack loader


xxx-loader 命名
loader 模块需要导出为一个函数的node模块
该函数在loader转换资源的时候调用，。给定的函数将调用loader API，并通过this上下文访问

编写本地loader开发测试
* resolveLoader.modules 配置 ，henpeck会从该目录中搜索loaders。

export出来的function，只接收一个参数(包含资源文件内容的字符串)
loader 分为
* 同步loader
```
this.callback(null, 同步操作(content), sourceMaps , ast)
return; // return undefined
```
* 异步loader  
```
var callback = this.async()
异步操作。then( r=> {
  if(err) return callback(err)
  callback(null, source)
})
```


loader工具库
* loader-utils  常用eq: 获取传递给loader的选项 
* schema-utils  配合loader-utils 使用，保证loader选项

```
import { getOptions } from 'loader-utils';
import validateOptions from 'schema-utils';

const schema = {
  type: 'object',
  properties: {
    test: {
      type: 'string'
    }
  }
}

export default function(source) {
  const options = getOptions(this);

  validateOptions(schema, options, 'Example Loader');

  // 对资源应用一些转换……

  // 这里为什么要这么写？因为直接返回转换后的字符串会报语法错误，
  // 这么写import后转换成可以使用的字符串
  return `export default ${ JSON.stringify(source) }`;
};
```

简单的demo 
```
modules.exports = function(src) {
  if(src) { // 处理反转字符串
    src = src.split('').reverse().join('')
  }
  return src;
}
```


