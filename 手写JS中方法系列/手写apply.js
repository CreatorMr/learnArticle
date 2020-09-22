~function() {
  function newApply(context, arr) {
    context = context === undefined ? context : window

    let type = typeof context;

    if(!/^(object|function)$/.test(type)) {
      if(/^symbol|bigint$/.test(type)) {
        context = Object(context);
      }
      context = new context.constructor(context) // 处理字符串
    }
    let key = Symbol('key'), result;
    context[key] = this;
    if(!arr) {
      result = context[key]()
    } else {
      result = context[key](arr)
    }
    delete context[key];
    return result;
  }
  Function.prototype.apply = newApply
}()