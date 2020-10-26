
### JS继承
 1、原型链---继承通过创建父类的实例。本质上市重写原型对象
```
function SuperType(){
	this.property = true;
}
SuperType.prototype.getSuperValue = function(){
	return this.property;
}
function SubType(){
	this.subproperty = false;
}
//继承了SuperType
SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function(){
	return this.subproperty;
}

var instance = new SubType();
alert(instance.getSubValue());
```
使用字面量添加的新方法，会使，继承一行的代码无效。constructor指向变了。
```
 SubType.prototype = new SuperType();
 SubType.prototype = {
 	getSubValue：function(){},
	getName:function(){}
 }
```
2、借用构造函数---即在子类型构造函数内部调用超类型构造函数
```
function SuperType(){
	this.colors = ["red","blue","green"];
}
function SubType(){
	//继承了SuperType
	SuperType.call(this);
}
var instance = new SubType();
instance.colors.push("black");
alert(instance.colors);//"red,blue,green,black"
var instance2 = new SubType();
alert(instance2.colors);//"red,blue,green"
```
相对于原型链的优势即可以在子类型构造函数中向超类型构造函数中传递参数call()使用
问题：方法都在构造函数中定义。

3、组合继承---原型链和构造函数技术组合到一起
```
function SuperType(name){
	this.name = name;
	this.colors = ["red","blue","green"];
}
SuperType.prototype.sayName = function (){
	return this.name;
}
function SubType(name,age){
	//继承属性
	SuperType.call(this,name);
	this.age = age;
}

//继承方法
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function(){
	return this.age;
}
var instance1 = new SubType("Nicholas",20);
instance1.colors.push("black");
alert(instance1.colors);//"red,blue,green,black"
instance1.sayName();//"Nicholas"
instance1.sayAge();//20

var instance2 = new SubType("Jemmy",30);
alert(instance2.colors);//"red,blue,green"
instance2.sayName();//"Jemmy"
instance2.sayAge();//30
//避免了原型链和构造函数的缺点。
```
4、原型式继承--借助原型可以基于已有的对象创建新对象
```
function object(o){
	function F(){}
	F.prototype = o;
	return new F();
}
```
在object函数内部先创建一个临时的构造函数，然后将传入的对象作为这个构造函数的原型，最后返回这个临时类型的一个新实例。
从本质上讲，object()对其传入其中的对象执行了一次浅复制
```
var person = {
	name:"Nicholas",
	fridens:["Shelby","Court","Van"]
};

var anotherPerson = object(person);
anotherPerson.name = "Greg";
anotherPerson.fridens.push("Rob");

var yetAnotherPerson = object(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.fridens.push("Barbie");
alert(person.fridens);//""Shelby,Court,Van,Rob,Barbie"
```
ECMAScript5通过熙增Object.create()方法规范了原型式继承与上面的object()行为相同。
```
var person = {
	name:"Nicholas",
	fridens:["Shelby","Court","Van"]
};
var anotherPerson = Object.create(person);
anotherPerson.name = "Greg";
anotherPerson.fridens.push("Rob");

var yetAnotherPerson = Object.create(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.fridens.push("Barbie");
alert(person.fridens);//""Shelby,Court,Van,Rob,Barbie"
```
5、寄生式继承--创建一个仅用于封装继承过程的函数。该函数内部以某种方式来增强对象，最后再像真地是它做了所有工作一样返回对象。
```
function createAnother(original){
	var clone = create(original);
	clone.sayHi = function(){
		alert("HI");
	};
	return clone;
}

var person = {
	name:"Nicholas",
	fridens:["Shelby","Court","Van"]
};
var anotherPerson = createAnother(person);
anotherPerson.sayHi();//"HI"
//create()不是必须的，只要能够返回新对象的函数都适用于此模式。
```
6、寄生组合式继承--组合式继承问题就是无论在什么情况下，都会调用两次超类型构造函数。一次是在创建子类型原型的时候。另一次在子类型内部
寄生组合式继承即通过借用构造函数来继承属性，通过原型链混成形式来继承方法，本质：不必为了指定子类型的原型而调用超类型的构造函数
```
function inheritProrotype(SubType,SuperType){
	var prototype = create(SuperType.prototype);
	prototype.constructor = SubType;
	SubType.prototype = prototype;
}
```

### ajax请求的完整写法及参数
ajax:一种请求数据的方式，不需要刷新整个页面；

ajax的核心技术是XMLHttpRequest对象。

ajax请求的过程：创建XMLHttpRequest对象、连接服务器、发送请求、接受相应数据。
```javascript
ajax({
  url: 'xxx',
  type: 'POST',
  data: { name: 'name', age: 22},
  dataType: 'json',
  success: function (response, xml) { },
  error: function (status) { }
})

function ajax(options) {
  options = options || {};
  options.type = (options.type || 'GET').toUpperCase();
  options.dataType = options.dataType || 'json';
  
  let params = formatParams(options.data);
  let xhr;
  if(window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject('Miscrosoft.XMLHttp');
  }

  if(options.type === 'GET') {
    xxhrml.open('GET', `${options.url}?${params}`, true)
    xhrxhr.send(null)
  } else {
    xhr.open('POSt', options.url, true)
    xhr.setRequestHeader("Content-t=Type", "application/x-www-form-urlencoded");
    xhr.send(params)
  }

  if(xhr.readyState === 4) {
    var status  = xhr.status;
    if(status >= 200 && status < 300) {
      options.success && options.success(xhr.responseText, xhr.responseXML)
    } else {
      options.error && options.error(status)
    }
  }

  function formatParams(data) {
    let arr = []
    for (const key in data) {
      arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    }
    arr.push(('v=' + Math.random()).replace('.', ''))
    return arr.join('&')
  }
}
```

### This什么时候用，怎么用
this的用处：
1、一般用处
2、 this.x 与 apply()、call()
3、无意义（诡异）的this用处
4、 事件监听函数中的this
一、一般用处 
    对于this变量最重要的能够理清this所引用的对象到底是哪个？
    分析this所在的函数是当做哪个对象方法所调用的，则该对象就是this所引用的对象。
二、 this.x 与 apply()、call()
通过call和apply可以重新定义函数的执行环境，即this的指向，这对于一些应用当中是十分常用的。
apply的用法和call大致相同，只有一点区别，apply只接受两个参数，第一个参数和call相同，第二个参数必须是一个数组，数组中的元素对应的就是函数的形参。
三、无意义（诡异）的this用处
```javascript
var obj = {
  x: 100,
  y: function () {
    setTimeout(function () {
      console.log(this.x); // 这里的this 指向的是window ，并不是obj
    }, 2000)
  }
}
console.log(obj.y())

var obj = {
  x: 100,
  y: function () {
    var _this = this
    setTimeout(function () {
      console.log(_this.x); // 这里的this 指向的是window ，并不是obj
    }, 2000)
  }
}
console.log(obj.y())
```
四. 事件监听函数中的this
```javascript
var one = document.getElementById('one');
one.click = function() {
  console.log(this.innerHTML) // this 为 one 元素
}
```
### 事件的代理委托原理、优缺点 自定义事件
##### 靠的事件的冒泡机制实现的
##### 优点：
              1、可以大量节省内存的使用，减少注册事件，例如给table中的td事件，就添加到table上
              2、实现新增子对象时无需再次对其绑定事件。对于动态部分尤为适合
#####缺点：
              仅是上述1中类似的需求才会使用，使用场景比较少。
```
  function delegateEvent(interfaceEle,selector,type,fn){
        if(interfaceEle.addEventListener){
            interfaceEle.addEventListener(type.eventfn,false);
        }else{
            interfaceEle.attachEvent(type,eventfn);
        }

        function eventfn(e){
            var e = event || window.event;
            var target = e.target || e.srcElement;
            if(matchSelector(target,selector)){
                if(fn){
                    fn.call(target,e);
                }
            }
        }

        function matchSelector(ele,selector){
            if(selector.charAt(0) == "#"){
                  return ele.id == selector.slice(1);
            }
            if(selector.charAt(0) == "."){
                  return (""+ele.className+"").indexOf(""+ selector.slice(1)+"") != -1;
            }
            return ele.tagName.toLowerCase() == selector.slice(1).toLowerCase();
        }
  }
```
###DOM自定义事件
不是由DOM触发的，它的目的是让开发人员创建自己的事件。
触发事件分别为dispatchEvent()和fireEvent()--IE

调用  createEvent("CustomEvent");
返回对象有一个名为initCustomEvent(),接受四个参数
 ```
        type(字符串)：触发的事件类型，例如“keydown”
        bubbles(布尔值)：表示事件是否应该冒泡
        cancelable(布尔值)：表示事件是否可以取消
        detail（对象）：任意值，保存在event对象的detail属性中。
```
例如：
```
    var div = document.getElementById("myDiv"),event;
    EventUtil.addHandler(div,"myevent",function(event){
        
    })
    
    if(document.implement.hasFeature("CustomEvents","3.0")){
        event = document.createEvent("CustomEvent");
        event.initCustomEvent("myevent",true,false,"Hello world!");
        //触发
        div.dispatchEvent(event);
    }
  
```
IE中模拟事件
document.createEventObject()      不接受参数
fireEvent()接受两个参数，事件处理程序的名称和event对象。在调用fireEvent（）方法的时候回自动为event对象添加SRCElement和type属性。其他属性则手动添加。
```
    var div = document.getElementById("myDiv");
    var event = document.createEventObject();
    event.screenX = 100;
    event.screenY = 100;
    event.clientX = 100;
    event.clientY = 100;
    event.ctrlKey = false;
    event.altKey = false;
    event.shiftKey = false;
    event.button = 0;

//触发
    div.fireEvent("onclick",event);
```
