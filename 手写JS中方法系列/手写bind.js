~function() {
  function newBind(context, ...args) {
    var _this = this;
    context = context === undefined ? context : window;
    let type = typeof context
    if(!/^(object|function)$/.test(type)) {
      if(/^symbol|bigint$/.test(type)) {
        context = Object(context)
      }
      context = new context.constructor(context);
    }

    return function anonymous(...innerArgs) {
      _this.call(context, ...args.concat(innerArgs))
    }

  }
  Function.prototype.bind = newBind;
}()