function Parent() {
  this.x = 100;
}
Parent.prototype.getX = function getX() {
  return this.x;
};

function Child() {
  // 在子类构造函数中，把父类当做普通方法执行（没有父类实例，父类原型上的那些东西也就和它没关系了）
  // this -> Child的实例c1
  Parent.call(this); // this.x=100 相当于强制给c1这个实例设置一个私有的属性x，属性值100，相当于让子类的实例继承了父类的私有的属性，并且也变为了子类私有的属性 “拷贝式”
  this.y = 200;
}
Child.prototype.getY = function getY() {
  return this.y;
};

let c1 = new Child;
console.log(c1);