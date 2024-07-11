const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';


class MPromise{
    //直接生命两个数组即可，这里的数组不会被修改 只会被push进来
    // 状态完成的 list
    FULFILLED_CALLBACK_LIST = [];
    // 状态失败的 list
    REJECTED_CALLBACK_LIST = [];
    // 存储初始化 status
    _status = PENDING;

    constructor(fn){
        this.status = PENDING;
        this.value = null;
        this.reason = null;

        //需要里面调用，有报错需要立马抛出
        try{
            // 考虑严谨性，更改 this 指向为当前环境
            fn(this.resolve.bind(this), this.reject.bind(this));
        } catch(e){
            this.reject(e)
        }
    }


    get status(){
        // 所有真实的 status
        return this._status;
    }

    set status(newStatus){
        this._status = newStatus;

        // 判断不同的状态 执行不同的逻辑
        switch(newStatus){
            case FULFILLED: {
                // then 方法已经判断过是不是function 所以这里不需要判断
                // 在 status 发生变化的时候，执行对应的回调。
                this.FULFILLED_CALLBACK_LIST.forEach(callback=>{
                     callback(this.value)
                });
                break;
            }
            case REJECTED: {
                this.REJECTED_CALLBACK_LIST.forEach(callback=>{
                     callback(this.reason)
                });
                break;
            }
        }
    }


    resolve(value){
        // 最终态不可被改变，所以需要加一个判断
        // 只有当 status 为初始态的时候才可以改变
        if(this.status === PENDING){
            this.value = value;
            this.status = FULFILLED;

        }

    }

    reject(reason){
        if(this.status === PENDING){
            this.reason= reason;
            this.status = REJECTED;

        }

    }

    then(onFulfilled, onRejected){
        const fulFilledFn = this.isFunction(onFulfilled) ? onFulfilled : (value) => value
        const rejectedFn = this.isFunction(onRejected) ? onRejected : (reason) => {throw(reason)}

        //如果 onFulfilled 或者 onRejected 抛出一个异常 e ，那么新的 promise 必须 reject e；
        const fulFilledFnWitchCatch = (resolve, reject, newPromise) => {
            queueMicrotask(() => {
                try{
                    // 不是一个函数 就直接resolve ,因为有返回值了，所以需要判断
                    if(!this.isFunction(onFulfilled)){
                        resolve(this.value)
                    }else{
                        const x = fulFilledFn(this.value);
                        this.resolvePromise(newPromise, x, resolve, reject);
                    }
                }catch(e) {
                    reject(e)
                }
            });
        }


        const rejectedFnWitchCatch = (resolve, reject, newPromise) => {
            queueMicrotask(() => {
                try{
                    if(!this.isFunction(onRejected)){
                        reject(this.reason);
                    }else{
                        const x =  rejectedFn(this.reason);
                        this.resolvePromise(newPromise, x, resolve, reject);
                    }
                }catch(e) {
                    reject(e)
                }
            });
        }

        switch(this.status){
            // then 的返回值是一个promise
            case FULFILLED: {
                const newPromise = new MPromise((resolve, reject) => fulFilledFnWitchCatch(resolve, reject, newPromise));
                return newPromise;
            }
            case REJECTED: {
                const newPromise = new MPromise((resolve, reject) => rejectedFnWitchCatch(resolve, reject, newPromise));
                return newPromise;
            }
            case PENDING: {
                const newPromise = new MPromise((resolve, reject) => {
                    this.FULFILLED_CALLBACK_LIST.push(() => fulFilledFnWitchCatch(resolve, reject, newPromise));
                    this.REJECTED_CALLBACK_LIST.push(() => rejectedFnWitchCatch(resolve, reject, newPromise));
                });
                return newPromise;
            }
        }

    }


    catch(onRejected){
        return this.then(null, onRejected)
    }


    // 规范里定义resolvePromise 需要接受一个 newPromise
    // resolvePromise 函数的意义，就是对promise 各种值的处理
    // 让 promise 可以返回一个结果，无论是 resolve 还是 reject
    resolvePromise(newPromise, x, resolve, reject){
        if(newPromise === x){
            // 返回一个错误信息，信息无所谓什么都可以
            // 为什么要 reject 一个错误信息，因为如果 newPromise 和 x 相等会相互调用，形成一个死循环
            return reject(new TypeError('Type Error,Please....'))
        }

        if(x instanceof MPromise){
        //如果是promise 肯定有then 方法

            x.then(y =>{
                this.resolvePromise(newPromise, y, resolve, reject)
            }, reject);

        } else if(typeof x === 'object' || this.isFunction(x)){
            // typeof null 也是 object，所以需要加判断
            if(x === null){
                return resolve(x)
            }

            // 按照规范的语义化写法
            let then = null;
            try{
                then = x.then;
            }catch(error){
                return reject(error);
            }

            if(this.isFunction(then)){
                // 规范中要求 then 方法 只能被调用一次
                // 定义一个 called 变量，标识是否被调用

                let called = false;
                try{
                    // 为了不发生异常错误，更换then 的 this 指向 为x
                    then.call(
                        x,
                        (y) =>{
                            if(called){
                                return;
                            }
                            called = true;
                            // 简单的递归，目的就是找到所有的 x
                            this.resolvePromise(newPromise, y, resolve, reject);
                        },
                        (r) =>{
                            if(called){
                                return;
                            }
                            called = true;
                            reject(r);
                        }

                    )
                }catch(error){
                    if(called){
                        return;
                    }
                    reject(error);
                }
            }else{
                resolve(x);
            }

        } else {
            resolve(x)
        }
    }


    isFunction(param){
        return typeof param === 'function';
    }
}
export default MPromise;
