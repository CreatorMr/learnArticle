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

### 源码分析

在compilation中链路找到 NormalModule.js文件

```
// 执行
runLoaders({
  resource,
  loaders,
  context,
  readResource
}, (err, result)=> {
  // for of loaders
})
```

runLoaders 方法 来自 loader-runner npm包中

从build-module 开始构建的module的时候，将使用文件对应的loader加载.所以就到了doBuild 方法 也就是上面我们提到的runLoaders 
这里使用loader加载完成处理文件生成js。再将js 解析成AST语法树
![image.png](http://106.52.111.158:3000/img/image.png)

后面 解析 webpack进入打包，打包原理这里几不在深入了
最后放一个图吧
![webpack.jpg](http://106.52.111.158:3000/img/webpack.jpg)
参考： 
文章 [地址](https://segmentfault.com/a/1190000008060440)
文章2 [地址](https://lihuanghe.github.io/2016/05/30/webpack-source-analyse.html)




