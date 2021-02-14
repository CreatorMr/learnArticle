export let aImport = 1;
export let objImport = {
  name: 'Creator_import'
}
let obj = {
  name: 'import export obj'
}
export { obj };
//  export { obj }  // 使用该种形式输出时需要添加大括号
//  export obj   // 不添加大括号时会报错，因为我们要输出的是该对象的引用。注意是对该对象的引用，而不是拷贝。这也意味着在该模块改变name属性，会导致另一个模块下name属性的变化，这点与CommonJS不同，CommonJS只是对某个对象的拷贝

export default {
  name: 'export default'
}