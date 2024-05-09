/**
 一、术语
1. promise 有 then 方法的对象或者函数;
2. thenable 是一个有 then 方法的对象或者是函数;
3. value promise 状态成功时的值, resolve(value),可以是任何数据类型(String Number Boolean undefined thenable promise);
4. reason promise 状态失败时的值, reject(reason);
二、Promise Status(三种状态及其关系)
   1. pending
        1.1 初始状态,可以改变.
        1.2 在 resolve 和 reject 之前都处于这个状态.
        1.3 通过resolve -->  fulfilled 状态.
        1.4 通过reject --> rejected 状态.
   2. fulfilled
        2.1 最终态,不可改变.
        2.2 一个 promise 被 resolve 改变成这个状态.
        2.3 必须通过一个 value 值,成功以后的值.
   3. rejected
        3.1 最终态,不可改变;
        3.2 一个promise 被 reject 改变成这个状态;
        3.3 必须拥有一个 reason ,也就是失败的原因;
   总结:
         pending --> resolve(value)  -->  fulfilled
         pending --> reject(reason)  --> rejected
三、Promise then 方法 及其返回值
promise 应该(promiseA+规范,规范提出了,所以用的应该)提供一个 then 方法, 用来访问最终结果, 无论 value 还是 reason.
promise.then(onFuilled,onRejected)
四、规范
  1.参数的规范
        1.1 onFulfilled 必须是函数类型, 如果不是函数类型 ,应该被忽略(这里的忽略是指给一个默认值,并不是真正意义上的忽略);
        1.2 onRejected  必须是函数类型, 如果不是函数类型 ,应该被忽略(同上);
  2. onFulfilled 特性
        2.1 在 promise 变成 fulfilled 时, 应该调用 onFulfilled ,参数是 value;(onFulfilled 的执行时机?)
        2.2 在 promise 变成 fulfilled 之前, 不应该调用 onFulfilled;
        2.3 只能被调用一次,可以注册若干个回调函数(promise.then().then().then()....);(怎么实现只调用一次?)
  3. onRejected 特性
        3.1 在 promise 变成 rejected 时, 调用 onRejected ,参数是reason;
        3.2 在 promise 变成 rejected 之前,不应该调用 onRejected.
        3.3 只能调用一次
  4. onFulfilled 和 onRejected 应该是在微任务阶段执行
        为什么微任务阶段执行?
        一定要等前面的任务执行完,才进行调用. 微任务是在一轮宏任务执行完之后执行;
  5. then方法可以被调用多次
        5.1 promise 变成 fulfilled 之后 , 所有的 onFulfilled 回调都应该按照注册的顺序执行,也可以理解为按照 .then() 的顺序执行;
          例:
          promise.then(onFulfilled , onRejected).then(onFulfilled1 => ( )).then(....)
        5.2 promise 变成 rejected 之后 , 所有的 onRejected 回调都应该按照注册的顺序执行,也可以理解为按照 .then() 的顺序执行;
  6. 返回值
        规范里定义 then 应该返回一个promise
const promise2 = promise( onFulfilled , onRejected );
        6.1 onFulfilled 或 onRejected 执行结果 为 x(任何东西：值或者 promise)，调用resolvePromise;
        6.2 onFulfilled 或 onRejected 执行过程中抛出了异常，promise2需要被 reject;
        6.3 如果 onFulfilled 不是一个函数，promise2 应该以 promise1 的value 触发 fulfilled;
        6.4. 如果 onRejected 不是一个函数，promise2 应该以 promise1 的reason 触发 fulfilled
  7. resolvePromise
        promise2：当前第一个promise 的返回值；
        X：无论是 onFulfilled 还是 onRejected 的执行结果
        resolve、reject ：变更方法
resolvePromise(promise2, x, resolve, reject)
        7.1 如果promise2 和 x 相等 reject typeError；
        7.2 如果 x 是一个 promise
                如果 x 是pending 状态 ，promise 必须要在pending 状态，直到 x 的状态变更。
                如果 x 是 fulfilled ，value -->  fulfilled
                如果 x 是 rejected ，reason -->  rejected
        7.3 如果 x 是一个 Object 或者 Function
                去获取 x.then()，如果报错，reject reason
                如果 then 是一个函数，then.call(x, resolvePromiseFn, rejectPromiseFn)
                为什么用 call 改变 this 指针，或者then的时候可能会导致 指针指向改变，所以用 call 继续执行之前的逻辑
 */
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class PromiseClass {
  FULFILLED_CALLBACK_LIST = [];
  REJECTED_CALLBACK_LIST = [];
  _status = PENDING;
  constructor(fn) {
    this.status = PENDING;
    this.value = null;
    this.reason = null;
    try {
        fn(this.resolve.bind(this),this.reject.bind(this))
    } catch (e) {
      this.reject(e)
    }
  }

  get status() {
    return this._status;
  }

  set status(newStatus) {
    this._status = newStatus;
    switch (newStatus) {
      case FULFILLED: {
        this.FULFILLED_CALLBACK_LIST.forEach(callback => {
          callback(this.value);
        })
      }
      case REJECTED: {
        this.REJECTED_CALLBACK_LIST.forEach(callback=> {
          callback(this.reason)
        })
      }
    }
  }

  resolve(value) {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
    }
   }
  reject(reason) {
     if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;
    }
  }
  then(onFulfilled, onRejected) {
    const fulfilledFn = this.isFunction(onFulfilled) ? onFulfilled : (value) => value;
    const rejectedFn = this.isFunction(onRejected) ? onRejected : (reason) => { throw reason };

    const fulFilledFnWitchCatch = (resolve, reject, newPromise) => {
      queueMicrotask(() => {
        try {
          if (!this.isFunction(onFulfilled)) {
            resolve(this.value)
          } else {
            const x = fulfilledFn(this.value)
            this.resolvePromise(newPromise,x,resolve,reject)
          }
        } catch (error) {
          reject(error)
        }
      })
    }

    const rejectedFnWitchCatch = (resolve, reject, newPromise) => {
      queueMicrotask(() => {
        try {
          if (!this.isFunction(onRejected)) {
            reject(this.reason)
          } else {
            const x = rejectedFn(this.reason);
            this.resolvePromise(newPromise, x, resolve, reject);
          }
        } catch (e) {
          reject(e);
        }
      })
    }

    switch (this.status) {
      case FULFILLED: {
        const newPromise = new PromiseClass((resolve,reject)=>fulFilledFnWitchCatch(resolve, reject, newPromise))
        return newPromise;
      }
      case REJECTED: {
        const newPromise = new PromiseClass((resolve, reject) => rejectedFnWitchCatch(resolve, reject, newPromise))
        return newPromise
      }
      case PENDING: {
        const newPromise = new PromiseClass((resolve, reject) => {
          this.FULFILLED_CALLBACK_LIST.push(() => fulFilledFnWitchCatch(resolve, reject, newPromise));
          this.REJECTED_CALLBACK_LIST.push(() => rejectedFnWitchCatch(resolve, reject, newPromise));
        })
        return newPromise;
      }
    }

  }
  catch(onRejected) {
    return this.then(null,onRejected)
  }
   // 规范里定义resolvePromise 需要接受一个 newPromise
    // resolvePromise 函数的意义，就是对promise 各种值的处理
    // 让 promise 可以返回一个结果，无论是 resolve 还是 reject
  resolvePromise(newPromise,x,resolve,reject) {
    if (newPromise === x) {
      return  reject(new Error('xxxx'))
    }
    if (x instanceof newPromise) {
      //如果是promise 肯定有then 方法
      x.then(y => this.resolvePromise(newPromise, y, resolve, reject),reject);
    } else if (typeof x === 'object' || this.isFunction(x)) {
      // typeof null 也是 object，所以需要加判断
      if (typeof x === null) {
        return resolve(x);
      }

      let then = null;
      try {
        then = x.then;
      } catch (e) {
        return reject(e)
      }
      if (this.isFunction(then)) {
        // 规范中要求 then 方法 只能被调用一次
        // 定义一个 called 变量，标识是否被调用
        let called = false;
        try {
          then.call(x, (y) => {
            if (called) return;
            called = true;
            this.resolvePromise(newPromise, y, resolve, reject);
          }, (z) => {
             if (called) return;
            called = true;
            reject(z);
          })
        } catch (e) {
          if (called) return;
          reject(x)
        }
      } else {
        resolve(x);
      }
    } else {
      resolve(x)
    }
  }
  isFunction(param) {
    return typeof param === 'function'
  }
}

export default PromiseClass;
