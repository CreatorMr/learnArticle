### webpack plugin

webpack plugin 简单来说做loader做不了的事

webpack插件具有apply属性的javascript对象。

```
class MyPlugin {
  constructor(opt) {
    this.options = Object.assign({}, opt || {})
  }
  apply() {
    console.log('apply 函数执行了')
  }
}
module.exports = MyPlugin
```