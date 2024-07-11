// 手写 call/apply

Function.prototype.myCall = function(obj,...args){
    obj = obj || globalThis;
    let key = Symbol("key")
    obj[key] = this;
    let res = obj[key](...args);
    delete obj[key];
    return res
}
let a = {name:'yy',age:18,say:function(word){
    console.log('say',this.name)
}}
let b = {name:'ll'}
// a.myCall()
const foo = {
    name: 'hello',
    logName: function(...args) {
        console.log(args, 111);
        console.log(this.name, 333);
    }
}
const bar = {
    name: 'world'
}
// console.log(foo.logName.call(bar, '1', '2'), 'res');
// 打印结果
// world 333
// [1, 2] 111
// a.say()
// a.say.myCall(b,'haha')

Function.prototype.myBind = function (ctx){
    let args = Array.prototype.slice.call(arguments,1)
    let  fn = this;
    return function F(...args2){
        // 使用 new的方式调用这个函数 
        // 检测是否是被 new 调用  new.target !== undefined Object.getPrototypeOf(this) === F.prototype
        if(this.constructor === F){
            let obj = Object.create(null)
            obj.__proto__ = this.prototype;
            fn.call(ctx,...args,...args2)
        }else{
            return fn.call(ctx,...args,...args2)
        }
    }
}
function fn  (a,b,c,d) {
    console.log(a,b,c,d)
    console.log(this)
}
const newFn = fn.myBind('ctx',1,2)
new newFn(3,4)
const test=()=>{
    console.log(this)
}
test()