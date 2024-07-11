// 7.实现 promise 相关方法
//---首先分析官方的promise
 
// const p1 = new Promise((resolve, reject) => {
//     resolve(2222)
//     reject(33333)
// })
// 调用then方法 then 方法接收2个回调函数作为参数
// p1.then(res => { //只会打印222, 因为promise的状态一但由pending的状态改变了 就无法再次改变
//     console.log("res1:", res)
// }, err => {
//     console.log("err:", err)
// })
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class myPro {
    constructor(executor){
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];
        const resolve = (value)=>{
            if(this.status === PENDING){
                this.status = FULFILLED;
                this.value = value;
                this.onResolvedCallbacks.forEach(fn=>fn())
            }
        }
        const reject = (reason)=>{
            if(this.status === PENDING){
                this.status = REJECTED;
                this.reason = reason;
                this.onResolvedCallbacks.forEach(fn=>fn())
            }
        }
        try {
            executor(resolve,reject);
        } catch (error) {
            reject(error)
        }
    }
    then(onFulFilled,onRejected){

     }

}
// console.log("1", Date.now());

// const p = new Promise((resolve, reject) => {
//   console.log("2", Date.now());

//   setTimeout(() => {
//     console.log("3", Date.now());
//     resolve("finished");
//   }, 500);

//   setTimeout(() => {
//     console.log("5", Date.now());
//     resolve("finished");
//   }, 600);
// });

// p.then(
//   (data) => {
//     console.log(data);
//     console.log("4", Date.now());
//   },
//   (err) => {
//     console.log(err);
//     console.log("6", Date.now());
//   }
// );

// 手写 promise.all
/**
 * 接受一个 Promise 可迭代对象作为输入,返回一个 promise
 * 当所有的promise 都被兑现时，返回的 promise 也被兑现（即使传入的是一个空的可迭代对象）
 * 并返回一个包含所有兑现值的数组。如果输入的任何 Promise 被拒绝，则返回的 Promise 将被拒绝，并带有第一个被拒绝的原因。
 */
let p1 = new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve(1000)
    }, 1000);
})
let p2 = new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve(2000)
    }, 2000);
})
let p3 = new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve(3000)
    }, 3000);
})
let p4 = new Promise((resolve,reject)=>{
    setTimeout(() => {
        reject(4000)
    }, 3000);
})
let testArr = [p1,p2,p3,p4];

// console.log(testArr)
Promise.myAll = function (props){
    console.log(props)
    if(typeof props[Symbol.iterator] !== 'function'){
        return new Error('不是迭代器对象')
    }
    let res,rej;
    let p = new Promise((resolve,reject)=>{
        res = resolve;
        rej = reject;
    })
    let count = 0,resArr = [];
    for(let v of props){
        let index = count;
        count++;
        console.log(v)
        Promise.resolve(v).then(data=>{
            resArr[index] = data;
            count--;
            if(count===0){
                console.log(resArr)
                res(resArr)
            }
        },rej)
    }
    if(props.length === 0)res([]);
    console.log(resArr)
    return p;
}
// Promise.all(testArr).then(res=>{
//     console.log('111',res)
// })
// Promise.myAll(testArr).then(res=>{
//     console.log('2222',res)
// },err=>{
//     console.log(err)
// }).catch(err=>{
//     console.log(err)
// })

// promise.allSettled
Promise.myAllSettled = function(props){
    let res,rej,i = 0,resArr = [];
    let p = new Promise((resolve,reject)=>{
        res = resolve;
        rej = reject;
    })
    for(let v of props){
        let index = i;
        i++;
        Promise.resolve(v).then(data=>{
            resArr[index] = {
                status:'fulfilled',
                value: data
            }
            i--;
            if(i === 0){
                res(resArr);
            }
        },err=>{
            resArr[index] = {
                status:'rejected',
                value: err
            }
            i--;
            if(i === 0){
                res(resArr);
            }
        })
    }
    return p;
}
// Promise.allSettled(testArr).then(res=>{
    
//     console.log(res)
// })
// Promise.myAllSettled(testArr).then(res=>{
    
//     console.log(res)
// })
// promise.any
/**
 * 
 * @param {将一个 Promise 可迭代对象作为输入，
 * 并返回一个 Promise。当输入的任何一个 Promise 兑现时，这个返回的 Promise 将会兑现，
 * 并返回第一个兑现的值。当所有输入 Promise 都被拒绝（包括传递了空的可迭代对象）时，
 * 它会以一个包含拒绝原因数组的 AggregateError 拒绝} props 
 * @returns 
 */
Promise.myAny = function(props){
    let res,rej,i = 0,resArr = [];
    let p = new Promise((resolve,reject)=>{
        res = resolve;
        rej = reject;
    })
    for(let v of props){
        let index = i;
        i++;
        Promise.resolve(v).then(data=>{
            resArr.push(data);
            res(resArr[0])
        },err=>{
            resArr[index] = err;
            i--;
            if(i === 0){
                res(resArr)
            }
        })
    }

    return p;
}
// Promise.myAny(testArr).then(res=>{
//     console.log(res)
// })
// promise.race
/**
 * 接受一个 promise 可迭代对象作为输入，
 * 并返回一个 Promise。
 * 这个返回的 promise 会随着第一个 promise 的敲定而敲定。
 */
Promise.myRace = function(props){
    let res,rej,i = 0,resArr = [];
    let p = new Promise((resolve,reject)=>{
        res = resolve;
        rej = reject;
    })
    for(let v of props){
        Promise.resolve(v).then(data=>{
            resArr.push(data);
            res(resArr[0])
        },rej)
    }
    return p;
}
Promise.myRace(testArr).then(res=>{
    console.log(res)
})


// promise 循环
for(let a = 0;a<1000;a++){
	new Promise((resolve,reject)=>{
		resolve(a)
	}).then(res=>{
		console.log("异步任务",res)
	})
	// console.log("同步",a)
	
}

// 带有超时功能的 promise
// class TimeoutPromise extends Promise{
//     constructor(executor,timeout){
//         super(executor);
//         this.timeout = timeout;
//         this.timer = setTimeout(()=>{
//             this.reject(new Error('timeout'))
//         },timeout)
//     }
//     then(onFulFilled,onRejected){
//         return super.then(onFulFilled,onRejected).finally(()=>{
//            clearTimeout(this.timer)
//        })
//    }
//  }
 function timeoutPromise(timeout){
    let timer;
    return new Promise((resolve,reject)=>{
         timer  = setTimeout(()=>{
            reject(timeout)
        },timeout)
    }).catch(()=>{
        clearTimeout(timer)
    })
 }
 timeoutPromise(6000).then(()=>{
    console.log('timeout')
 })
//  let newP = new TimeoutPromise((resolve,reject)=>{
//      setTimeout(()=>{
//          resolve(5000)
//      },5000)
//  },1000)
//  newP.then(res=>{
//      console.log(res)
//  })
//  let  p = new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         resolve(5000)
//     },5000)
// })
// p.then(res=>{
//     console.log(res)
// })