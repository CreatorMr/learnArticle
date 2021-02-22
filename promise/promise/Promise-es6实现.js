const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECT'

const resolvePromise = function (promise, x, resolve, reject) {
  if (promise === x) {
    throw new Error("循环引用")
  }

  if (x !== null && (typeof x === "object" || typeof x === "function")) {
    // 标识变量，防止递归内外层 resolve 和 reject 同时调用
    // 针对 Promise，x 为普通值的时候可以放行
    var called;
    try {
      var then = x.then // 取then 有可能会出错
      if (typeof then === 'function') {
        then.call(x, y => {
          if (called) return;
          called = true;
          // 如果 y 是 Promise 就继续递归解析
          resolvePromise(promise2, y, resolve, reject);
        }, r => {
          if (called) return;
          called = true;
          reject(r)
        })
      } else { // x 普通对象或者 普通值
        resolve(x);
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error)
    }
  } else {
    resolve(x)
  }

}
class Promise {
  constructor(executor) {
    this.status = 'PENDING'

    this.value = undefined;
    this.reason = undefined;

    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = []

    let resolve = (value) => {
      if (this.status === PENDING) {
        this.value = value
        this.status = RESOLVED

        this.onFulfilledCallbacks.forEach(fn => fn())
      }
    }
    let reject = (reason) => {
      if (this.status === PENDING) {
        this.reason = reason
        this.status = REJECTED
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  then(onFulfilled, onRejected) {
    if (typeof onFulfilled !== 'function') {
      onFulfilled = function (data) {
        return data;
      }
    }
    if (typeof onRejected !== 'function') {
      onRejected = function (error) {
        throw error;
      }
    }

    let promise2 = new Promise((resolve, reject) => {
      if (this.status === RESOLVED) {
        setTimeout(() => {
          // x 可能是普通值 业可能是 promise
          // 判断x 得 值 =》 promise2 的状态
          //  resolve(x)
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
        }, 0)
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }

        }, 0)
      }
      // 异步情况
      if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
      }
    })
    return promise2;

    // if(this.status === RESOLVED) {
    //   onFulfilled(this.value)
    // }
    // if(this.status === REJECTED) {
    //   onRejected(this.reason)
    // }

    // if(this.status === PENDING) {
    //   this.onFulfilledCallbacks.push(() => {
    //     onFulfilled(this.value)
    //   })

    //   this.onRejectedCallbacks.push( ()=> {
    //     onRejected(this.reason)
    //   })
    // }
  }

  catch(onRejected) {
    return this.then(null, onRejected)
  }

  static resolve(val) {
    return new Promise(resolve => {
      resolve(val)
    })
  }
  static reject(reason) {
    return new Promise(function (resolve, reject) {
      reject(reason);
    });
  }

  static all(promises) {
    return new Promise((resolve, reject) => {
      // 存储返回值
      var result = [];
      // 代表存入的个数，因为 Promise 为异步，不知道哪个 Promise 先成功，不能用数组的长度来判断
      var idx = 0;

      function promiseData(index, data) {
        result[index] = data;
        idx++

        if (promises.length === idx) {
          resolve(result)
        }
      }

      for (var i = 0; i < promises.length; i++) {
        (function (i) {
          promises[i].then(function (data) {
            promiseData(i, data);
          }, reject);
        })(i);
      }

    })

  }

  static race(promises) {
    return new Promise(function (resolve, reject) {
      for (var i = 0; i < promises.length; i++) {
        promises[i].then(resolve, reject);
      }
    });
  }

  finally(callback) {
    let P = this.constructor;
    return this.then(
      value => P.resolve(callback()).then(() => value),
      reason => P.resolve(callback()).then(() => { throw reason })
    );
  }
}

module.exports = Promise;