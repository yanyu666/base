var notifyFn;
    function fn1(){
        notifyFn();
        console.log(1);
        console.log(2);
    }
    function fn2(){
        console.log(3);
        notifyFn();
        console.log(4);
    }
    function fn3(){
        console.log(5);
        console.log(6);
        notifyFn();
    }
    async function onMount(){
        notifyFn = () => {
            //在statement6执行完之后执行
            const stack = getCallStack()
            console.log('1111',stack)
        }
        fn1();
        await Promise.resolve();
        fn2();
        await Promise.resolve();
        fn3();
    }
    const getCallStack = () => {
        try {
            const error = new Error()
            Error.captureStackTrace(error, getCallStack)
            throw error
        } catch (e) {
            return Array.from(e.stack.matchAll(/at (.*?) \(/g)).map(v => v[1])
        }
    };
    // onMount();
    
/**
 * 实现对 Promise 的并发控制：需要将提供的 Promise 数组按照限制的并发数量执行，并确保按照数组中的顺序输出结果。函数需要具备以下功能：
1.接受一个数字参数 limit，表示最多同时执行的 Promise 数量。
2.实现一个队列，用于存储待执行的 Promise 任务。
3.实现一个 enqueue 方法，用于将 Promise 任务加入队列，并根据并发限制进行调度。
4.实现一个 _next 方法，用于执行下一个任务，并在任务完成后继续调度下一个任务。
5.在 enqueue 方法中，根据并发限制和队列的状态，决定是否执行下一个任务。
6.在执行任务时，使用 Promise 的方法（如then、catch、finally）来跟踪任务的完成状态，在任务完成后进行必要的清理操作。
 */

    class PromiseLimit {
    constructor(limit){
        this.limit = limit;
        this.queue = [];
        this.root = null;
        this.running = [];
    }
    enqueue(p){
        let newP;
        if(!p().then && !p.then instanceof Function){
             newP = new Promise(p);
        }else{
            newP = p();
        }
        this.queue.push(newP);
        this.toTree(this.queue);
        if(!this.running.length){
            for(let i = 0;i < (this.limit >  this.queue.length ? this.queue.length: this.limit);i++){
                let task = this.findTask(i);
                console.log('task',task)
                console.log('i',i)
                if(task){
                    task.status = 'running';
                    this.running.push(task);
                }else{
                    break;
                }
            }
        }else{
            let len = this.running.length;
            while(len < this.limit){
                let task = this.findTask(len);
                if(task){
                    task.status = 'running';
                    this.running.push(task);
                    len++;
                }
            }
        }
        for(let i = 0;i < this.running.length;i++){
            if(this.running[i].status !== 'pending'){
                return this.running[i].task.then(data => {
                    let task = {...this.running[i],task:data,status:'fulfilled'};
                    this.queue.splice(this.running[i].index,1,task);
                    this.running.splice(i,1,task);
                    this._next();
                },err=>{
                    let task = {...this.running[i].task,task:data,status:'rejected'};
                    this.queue.splice(this.running[i].index,1,task);
                    this.running.splice(i,1,task);
                    this._next();
                })
            }
        }
    }
    _next(){
        let len = this.running.length;
        this.running.filter(v=>v.status !== 'fulfilled')
        // for(let i = 0;i < len;i++){
        //     console.log(this.running[i])
        //     if(this.running[i].status !== 'running'){
        //         this.running.splice(i,1);
        //     }
        // }
        len = this.running.length;
        while(len < this.limit && this.running[len - 1]&&this.running[len - 1].next){
            this.running.push(this.running[len - 1].next);
            len = this.running.length;
        }
    }
    toTree(arr){
        // status pending rejected fulfilled running
        for(let i = 0;i < arr.length;i++){
            let task = {
                index: i,
                task: arr[i],
                status: 'pending',
                next: null,
            }
            if(!this.root || i === 0){
                this.root = task;
            }else{
                let preTask = this.findTask(i - 1);
                preTask.next = task;
            }
        }
    }
    findTask(index,root){
        // console.log('findTask',this.root)
        // console.log('findTask',index)
        let task = this.root;
        // console.log('findTask',task)
        if(index === 0){
            return task;
        }
        // console.log('findTask',task)
        while(task.next && task.next.index < index){
            task = task.next;
        }
        return task;
        // if(task.index < index){
        //     task = this.findTask(index,task.next);
        // }if(task.index === index){
        //     return task;
        // }else{
        //     return null;
        // }
    }
}
function timeout (time){
    return new Promise(resolve=>{
        setTimeout(() => {
            console.log('timeout',time)
            resolve(1);
        }, time);
    })
}
const limit = new PromiseLimit(2);
function addTask(time,name){
    // console.log('111111',limit.enqueue(()=>timeout(time)))
    limit.enqueue(()=>timeout(time)).then(()=>{
        console.log(`任务${name}执行完成`);
    })
}

addTask(10000,'1');
addTask(5000,'2');
addTask(3000,'3');
addTask(4000,'4');

// function a(){
//     let i = 0;
//     while(i < 100){
//         i++;
//         console.log(i)
//         if(i === 50){
//             break;
//         }
//     }
// }
// a()

/**
 * React基于单向数据流。对于组件间的通信支持不够好。
 * 现需要模拟一个全局的EventStore。使得可以满足以下条件，以支持组件间的通信
 */
class MyEvent {
    constructor(){
        this.events = {};
    }
    bind(event,fn){
        if(!this.events[event]){
            this.events[event] = [];
            this.events[event].push(fn);
        }else{
            this.events[event].push(fn);
        }
        console.log(this.events)
    }
    trigger(event,...opts){
        if(this.events[event]){
            this.events[event].forEach(fn => fn(...opts));
        }
    }
    unbind(event){
        delete this.events[event];
        console.log(this.events)
    }
}
// 用法
// const loader = new MyEvent();
// loader.bind("loaded",event => console.log(event));//注册事件
// loader.trigger("loaded",{ data:"data" });//触发事件
// loader.unbind("loaded");//注销事件
