function Parent() {
  this.x = 100;
}

function Child() {
  this.y = 200;
}
//=> 让子类的原型等于父类的实例
Child.prototype = new Parent; //=>原型继承

Child.prototype.getY = function getY() {
  return this.y;
};

let c1 = new Child;
console.log(c1);