Object.create = function(obj) {
  var F = function(){};
  Fn.prototype = new obj;
  return Fn;
}