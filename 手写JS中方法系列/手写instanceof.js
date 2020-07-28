function  instanceOfDemo(example,classFunc){
  example = example.__proto__;
  classFunc = classFunc.prototype;
  while(true) {
    if(example === null) {
      return false;
    }
    if(example === classFunc) {
      return true;
    }
    example = example.__proto__;
  }
}