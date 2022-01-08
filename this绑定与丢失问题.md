
###  this js中的this绑定与丢失

#### this 的 获取

浏览器  web ： window, this ,self,frames
node : global
worker: self
通用： globalThis
##### this指向调用的对象与函数声明的位置无关，只与调用位置有关

this 四种绑定

1、new绑定：new方式是优先级最高的一种调用方式，构造函数只是一些使用new操作符时被调用的函数。
       只要使用new方式调用一个构造函数，this一定指向new调用函数新创建的对象。

       function thisTo(a){
       		this.a = a;
       }
       var data = new thisTo(2);//在这里进行了new绑定

  使用new来调用函数的时候会自动执行下面的操作：
       ①、创建（或这说构造）一个全新的对象
       ②、这个新的对象会被执行[[Prototype]]连接
       ③、这个新对象会绑定到函数调用的this。
       ④、如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象

2、显式绑定：显式绑定是通过call()和apply()方法强制制定某些对象对函数进行调用，this则强制指向 调用函数的对象。

      function thisTo(a){
         console.log(this.a);
       }
       var data = {a:2};
       thisTo.call(data);//2
       
 显式绑定中强制绑定---硬绑定（解决隐式绑定丢失问题）

          function foo(a){
            console.log(this.a);
          }
          var obj = {
          	a:2
          }
          var bar = function(){
          	foo.call(obj);
          };
          bar();//2
          setTimeout(bar,100);//2
          
          bar.call(window);//2
          
创建了函数bar()并在内部手动调用了foo.call(obj),因此强制把foo的this绑定到了obj上。无论之后如何调用bar，总会手动在obj上调用foo。 硬绑定的典型应用场景就是创建一个包裹函数，负责接收参数并返回值

                         function foo(something){
                            console.log(this.a,something);
                            return this.a +　something;
                         }
                         var obj = {
                           a:2
                         };
                         var bar = function(){
                            return foo.apply(obj,arguments);
                         };
                         
                         var b = bar(3);//2 3
                         console.log(b);//5
          
 另一种 使用方法是创建一个可以重复的辅助函数

        				 function foo(something){
        				 	console.log(this.a,something);
        				 	return this.a + something;
        				 }
        				 
        				 //简单的辅助绑定函数
        				 function bind(fn,obj){
        				 	return function(){
        				 		fn.call(obj,arguments);
        				 	};
        				 }
        				 
        				 var obj = {
        				 	a:2
        				 }
        				 
        				 var bar = bind(foo,obj);
        				 var b = bar(3);//2 3
        				 console.log(b);//5
 由于硬绑定的使用很多，在ES5中提供了内置的方法Function.prototype.bind

        				 function foo(something){
        				 	console.log(this.a,something);
        				 	return this.a + something;
        				 }
        				 var bar =foo.bind(obj);
        				 var b = bar(3);//2 3
        				 console.log(b);//5
  bind(...)会返回一个硬编码的新函数，它会把你指定的参数设置为this的上下文并调用原始函数。
        				 
3、隐式绑定：指通过为对象添加属性，该属性的值即为要调用的函数，进而使用该对象调用函数
		
		function thisTo(){
			console.log(this.a);
		}
		var data = {
			a:2,
			foo:thisTo
		}
		data.foo();//2
4、默认绑定：其他规则无法应用的时候

		function foo (){
			console.log(this.a);
		}
		var a = 2;
		foo();//2


##### 丢失问题
1、隐式丢失：在隐式绑定时，使用了依次引用赋值或者传参操作。丢失之后会使用默认绑定，把this绑定到全局对象或者undefined上，取决于是否是严格模式。
	 
①、引用赋值

			function foo(){
				console.log(this.a);
			}
			var data = {
				a:2,
				foo:foo
			};
			var a = 3;
			var newData = data.foo;
			newData();//3
newData实际上引用的是foo本身，相当于var newData = foo;
			data对象作为中间桥，data.foo起传递作用，newData与data没有关系，newData本身没有a属性
			newData()输入的是window下的属性a的值。
②、参数传递

			function foo(){
				console.log(this.a);
			}
			
			function doFoo(fn){
				//fn其实引用的是foo
				fn();//调用位置
			}
			var obj = {
				a:2,
				foo:foo
			};
			
			var a = "oops,global";//a是全局对象的属性
			
			doFoo(obj.foo);//oops,global
参数传递其实就是一种隐式赋值，因此我们传入的函数也会被隐式赋值。
如果把函数传入内置的函数中结果是一样的

			function foo(){
				console.log(this.a);
			}
			var obj = {
				a:2,
				foo:foo
			};
			var a = "oops,global";//a是全局对象的属性
			setTimeout(obj.foo,100);//oops,global
回调函数丢失this绑定是非常常见的。也有可能存在调用回调函数的函数可能会修改this。
	在一些流行的JavaScript库中事件处理器常会把回调函数的this强制绑定到触发事件的DOM元素上

2、间接引用：指一个对象的方法引用了另一个对象存在的方法。此时的this指向window或者undefined
			
			function foo(){
				console.log(this.a);
			}
			var obj = {
				a:2,
				foo:foo
			};
			var newData = {
				a:3
			};
			var a = 4;
			(newData.foo = obj.foo)();//4
			newData.foo();//3
判断使用默认规则不是调用函数位置是否处于严格模式下，而是整个函数体是否处于严格模式，

3、=>  使用词法作用域取代传统的this机制，无法使用上述所说的this的优先级原则
	注：=>函数中，根据外层父亲作用域来决定this的指向问题。

			function foo(){
				return (a)=>{
					//this继承自foo()
					console.log(this.a);
				};
			}
			var obj1 = {
				a:2
			};
			var obj2 = {
				a:3
			};
			var bar = foo.call(obj1);  // function (obj1){console.log(obj1.a);}绑定到了obj1上
			bar.call(obj2);//2 不是3！
			
foo()内部创建的箭头函数会捕获调用foo()时的this，由于foo()的this绑定到obj1上，bar(引用箭头函数)的this
			也会绑定到obj1上，箭头函数的绑定无法被修改。(new 也不行！)
