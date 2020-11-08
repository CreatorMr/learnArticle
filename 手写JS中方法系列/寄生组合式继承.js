function Parent() {
  this.x = 100;
}
Parent.prototype.getX = function getX() {
  return this.x;
};
function Child() {
  Parent.call(this);
  this.y = 200;
}

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

Child.prototype.getY = function getY() {
  return this.y;
};

let c1 = new Child;
console.log(c1);