~function () {
  function newCall(context, ...args) {
    context = context === undefined ? window : context
    let type = typeof context;
    if (!/^(object|function)$/.test(type)) {
      if (/^symbol|bigint$/.test(type)) {
        context = Object(context);
      }
      context = new context.constructor(context) // 处理字符串
    }
    let key = Symbol('key'), result;
    context[key] = this;
    result = context[key](...args)
    delete context[key];
    return result;
  }
  Function.prototype.call = newCall
}()

func.call(obj, ...args)

