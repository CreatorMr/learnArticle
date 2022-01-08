### 装饰器

若要启用实验性的装饰器特性，你必须在命令行或tsconfig.json里启用experimentalDecorators编译器选项：
```
tsc --target ES5 --experimentalDecorators
```
or
```
{
    "compilerOptions": {
        "target": "ES5",
        "experimentalDecorators": true
    }
}
```


### 
装饰器是一种特殊类型的声明，它能够被附加到**类声明，方法， 访问符，属性或参数**上。 装饰器使用 @expression这种形式，expression求值后必须为一个函数，它会在运行时被调用，被装饰的声明信息做为参数传入。

function setProp(target) {
    //...
}

@setProp


装饰器工厂

```
function setProp() {
   return function(target) {

   }
}

@setProp()
```

etc
```

function setName() {
    console.log('get setName')
    return (target) => {
        console.log('setName')
    }
}
function setAge() {
    console.log('get setAge')
    return (target) => {
        console.log('setAge')
    }
}


@setName()
@setAge()
class ClassDec {

}
```

#### 装饰器 取值 

类中不同声明上的装饰器将按以下规定的顺序应用

- 1、参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个实例成员。
- 2、参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个静态成员。
- 3、参数装饰器应用到构造函数。
- 4、类装饰器应用到类。


