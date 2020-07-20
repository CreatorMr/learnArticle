
/* 
 * https://promisesaplus.com/ promiseA+
 *构造函数的参数为一个名为 executor 的执行器， 即函数， 在创建实例时该函数内部逻辑为同步， 即立即执行
 *执行器的参数为resolve、reject
 *在 executor 执行时，一旦出现错误立即调用 reject 函数，并设置错误信息给 reason 属性
 *每个promise都有三种状态，pending、fulfilled、rejected默认状态为 pending
 *状态只能从 pending 到 fulfilled 或从 pending 到 rejected，且不可逆
 *执行 resolve 函数会使状态从 pending 变化到 fulfilled 并将参数存入实例的 value 属性中；
 *执行 reject 函数会使状态从 pending 变化到 rejected 并将错误信息存入实例的 reason 属性中
 */

function Promise(executor) {
	var self = this;
	self.status = "pending"; // 当前 Promise 实例的状态
	self.value = undefined; // 当前 Promise 实例成功状态下的值
	self.reason = undefined; // 当前 Promise 实例失败状态的错误信息
	self.onFulfilledCallbacks = []; // 存储成功的回调函数的数组
	self.onRejectedCallbacks = []; // 存储失败的回调函数的数组

	function resolve(value) {
		if (self.status == "pending") {
			self.status = "fulfilled";
			self.value = value;

			// 每次调用 resolve 时，执行 onFulfilledCallbacks 内部存储的所有的函数（在实现 then 方法中详细说明
			self.onFulfilledCallbacks.forEach((fn) => {
				fn();
			})
		}
	}

	function reject(reason) {
		if (self.status === "pending") {
			self.status = "rejected";
			self.reason = reason;
			// 每次调用 reject 时，执行 onRejectedCallbacks 内部存储的所有的函数（在实现 then 方法中详细说明）
			self.onRejectedCallbacks.forEach(function(fn) {
				fn();
			});
		}
	}

	try {
		executor(resolve, reject); // 默认执行器会立刻执行
	} catch (e) {
		// 如果执行器执行时出现错误，直接调用失败的函数
		reject(e)
	}

}
module.exports = Promise

//实例上的方法的实现

/*
*在 then 方法中涉及到的 Promise/A+ 规范：
*Promise 实例的 then 方法中有两个参数，都为函数，第一个参数为成功的回调 onFulfilled，第二个参数为失败的回调 onRejected
*当 Promise 内部执行 resolve 时，调用实例的 then 方法执行成功的回调 onFulfilled，当 Promise 内部执行 reject 或执行
 出错时，调用实例的 then 方法执行错误的回调 onRejected；
*then 方法需要支持异步，即如果 resovle 或 reject 执行为异步时，then 方法的回调 onFulfilled 或 onRejected 需要在后面
 执行
*Promise 需要支持链式调用，Promise 实例调用 then 方法后需要返回一个新的 Promise 实例。如果 then 的回调中有返回值且是一
 个Promise 实例，则该 Promise 实例执行后成功或失败的结果传递给下一个 Promise 实例的 then 方法 onFulfilled （成功的回调）
 或 onRejected（失败的回调）的参数，如果返回值不是 Promise 实例，直接将这个值传递给下一个 Promise 实例 then 方法回调的
 参数，then 的回调如果没有返回值相当于返回 undefined
*Promise 实例链式调用 then 时，当任何一个 then 执行出错，链式调用下一个 then 时会执行错误的回调，错误的回调没有返回值相
 当于返回了 undefined，再次链式调用 then 时会执行成功的回调
*Promise 实例的链式调用支持参数穿透，即当上一个 then 没有传递回调函数，或参数为 null 时，需要后面调用的 then 的回调函数
 来接收
*executor 在 Promise 构造函数中执行时使用 try...catch... 捕获异常，但是内部执行的代码有可能是异步的，所以需要在 then
 方法中 使用 try...catch... 再次捕获；
*Promise 实例的 then 方法中的回调为 micro-tasks（微任务），回调内的代码应晚于同步代码执行，在浏览器内部调用微任务接口，
 我们这里模拟使用宏任务代替。
*/
Promise.prototype.then = function(onFulfilled, onRejected) {
	//实现参数穿透---Promise 实例的链式调用支持参数穿透，即当上一个 then 没有传递回调函数，或参数为 null 时，需要后面调用的 then 的回调函数来接收；
	if (typeof onFulfilled !== 'function') {
		onFulfilled = function(data) {
			return data;
		}
	}

	if (typeof onRejected !== "function") {
		onRejected = function(err) {
			throw err;
		}
	}


	 // 返回新的 Promise，规范中规定这个 Promise 实例叫 promise2
    var promise2 = new Promise(function (resolve, reject) {
        if (this.status === "fulfilled") {
            // 用宏任务替代模拟微任务，目的是使 `then` 的回调晚于同步代码执行
            setTimeout(function () {
                try {  // 捕获异步的异常
                    // onFulfilled 执行完返回值的处理，x 为成功回调的返回值
                    // x 可能是普通值 ，可能是promise
                    var x = onFulfilled(this.value);

                    // 处理返回值单独封装一个方法
                    /**
                     * 判断x 值 => promise2 的状态
                     */
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            }.bind(this), 0);
        }

        if (this.status === "rejected") {
            setTimeout(function () {
                try {
                    // onRejected 执行完返回值的处理，x 为失败回调的返回值
                    var x = onRejected(this.reason);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            }.bind(this), 0);
        }

        // 如果在 Promise 执行 resolve 或 renject 为异步
        // 将 then 的执行程序存储在实例对应的 onFulfilledCallbacks 或 onRejectedCallbacks 中
        if (this.status === "pending") {
            this.onFulfilledCallbacks.push(function() {
                setTimeout(function () {
                    try {
                        var x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }.bind(this), 0);
            });

            this.onRejectedCallbacks.push(function() {
                setTimeout(function () {
                    try {
                        var x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }.bind(this), 0);
            });
        }
    });

    return promise2;
}


/*
resolvePromise 函数有四个参数：
	promise2：then 执行后返回的 Promise 实例；
	x：then 的回调返回的结果；
	resolve：promise2 的 resolve 函数；
	reject：promise2 的 reject 函数。
在 resolvePromise 函数中涉及到的 Promise/A+ 规范：
	1、将每个 Promise 实例调用 then 后返回的新 Promise 实例称为 promise2，将 then 回调返回的值称为 x；
	如果 promise2 和 x 为同一个对象，由于 x 要将执行成功或失败的结果传递 promise2 的 then 方法回调的参数，
	因为是同一个 Promise 实例，此时既不能成功也不能失败（自己不能等待自己完成），造成循环引用，这种情况下规定应该抛出一个
	类型错误来回绝；
	2、如果 x 是一个对象或者函数且不是 null，就去取 x 的 then 方法，如果 x 是对象，防止 x 是通过 Object.defineProperty 
	添加 then 属性，并添加 get 和 set 监听，如果在监听中抛出异常，需要被捕获到，x.then 是一个函数，
	就当作 x 是一个 Promise 实例，直接执行x 的 then 方法，执行成功就让 promise2 成功，执行失败就让 promise2 失败，
	如果 x.then 不是函数，则说明 x 为普通值，直接调用 promise2 的 resolve 方法将 x 传入，不满足条件说明该返回值就是一
	个普通值，直接执行 promise2 的 resolve 并将 x 作为参数传入；
	3、如果每次执行 x 的 then 方法，回调中传入的参数还是一个 Promise 实例，循环往复，需要递归 resolvePromise 进行解析；
	4、在递归的过程中存在内、外层同时调用了 resolve 和 reject 的情况，应该声明一个标识变量 called 做判断来避免这种情况。
*/

// promise.js -- resolvePromise 方法
function resolvePromise(promise2, x, resolve, reject) {
    // 判断 x 和 promise2 是不是同一个函数
    if (promise2 === x) {
        reject(new TypeError("循环引用"));
    }

    // x 是对象或者函数并且不是 null，如果不满足该条件说明 x 只是一个普通的值
    if (x !== null && (typeof x === "object" || typeof x === "function")) {
        // 标识变量，防止递归内外层 resolve 和 reject 同时调用
        // 针对 Promise，x 为普通值的时候可以放行
        var called;

        // 为了捕获 Object.defineProperty 创建的 then 属性时添加监听所抛出的异常
        try {
            var then = x.then;

            if (typeof then === "function") { // then 为一个方法，就当作 x 为一个 promise
                // 执行 then，第一个参数为 this（即 x），第二个参数为成功的回调，第三个参数为失败的回调
                // call能保证不用再次取then的结果
                then.call(x, function (y) {
                    if (called) return;
                    called = true;

                    // 如果 y 是 Promise 就继续递归解析
                    resolvePromise(promise2, y, resolve, reject);
                }, function (err) {
                    if (called) return;
                    called = true;
                    reject(err);
                });
            } else { // x 是一个普通对象，直接成功即可
                resolve(x);
            }
        } catch(e) {
            if (called) return;
            called = true;
            reject(e);
        }
    } else {
        resolve(x);
    }
}

//Catch方法
// promise.js -- catch 方法
Promise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected);
}

//静态方法的实现
// 1、Promise.resolve 方法的实现
Promise.resolve = function(val){
	return new Promise(function (resolve, reject) {
        resolve(val);
    });
}
//2、Promise.reject 方法的实现

// promise.js -- Promise.reject 方法
Promise.reject = function (reason) {
    return new Promise(function (resolve, reject) {
        reject(reason);
    });
}

//3、Promise.all 方法实现
// promise.js -- Promise.all 方法
Promise.all = function (promises) {
    return new Promise(function (resolve, reject) {
        // 存储返回值
        var result = [];
        // 代表存入的个数，因为 Promise 为异步，不知道哪个 Promise 先成功，不能用数组的长度来判断
        var idx = 0;

        // 用来构建全部成功的返回值
        function processData(index, data) {
            result[index] = data; // 将返回值存入数组
            idx++;

            if (idx === promises.length) {
                resolve(result);
            }
        }

        for(var i = 0; i < promises.length; i++) {
            // 因为 Primise 为异步，保证 i 值是顺序传入
            (function (i) {
                promises[i].then(function (data) {
                    processData(i, data);
                }, reject);
            })(i);
        }
    });
}
//4、Promise.race 方法的实现
// /Promise.race 方法与 Promise.all 类似，同样可以实现多个 Promise 实例的并行，同样返回值为一个新的 Promise 实例，
// 参数同样为一个存储多个 Promise 实例的数组，区别是只要有一个 Promise 实例返回结果，无论成功或失败，则直接返回这个结果，
// 并作为新 Promise 实例 then 方法中成功或失败的回调函数的参数
// promise.js -- Promise.race 方法
Promise.race = function (promises) {
    return new Promise(function (resolve, reject) {
        for(var i = 0; i < promises.length; i++) {
            promises[i].then(resolve, reject);
        }
    });
}

Promise.prototype.finally = function (callback) {
    let P = this.constructor;
    return this.then(
      value  => P.resolve(callback()).then(() => value),
      reason => P.resolve(callback()).then(() => { throw reason })
    );
  };

// 使用 promises-aplus-test 测试 Promise 是否符合 Promise/A+ 规范