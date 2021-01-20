### webpack 打包原理

##### Babel
  "@babel/core": "^7.9.0",   // babel/core  ES6->ES5
  "@babel/parser": "^7.9.4", //  把import的模块全部转成AST
  "@babel/preset-env": "^7.9.5",   babel.transformFromAstSync 通过ast 把code从es6转换成es5
  "@babel/traverse": "^7.9.5", // 拿到AST节点，拿到依赖dependencies，用数组存储起来
