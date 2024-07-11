// 柯里化
/**
 * 如果一个函数有多个参数，
 * 那么可以通过先传入一部分参数来调用它，
 * 得到一个新函数去处理剩余的参数，
 * 直到所有参数都被提供并执行原函数
 */
// 请实现一个add函数实现以下功能 ：
// add(1) // 1
// add(1)(2) // 3
// add(1)(2)(3) // 6
// add(1)(2)(3)(4) // 10
// add(1)(2,3) // 6
// add(1,2)(3) // 6
// add(1,2,3) // 6
const curryFn = function () {
    let outerArgs = [...arguments],lastArgs;
    function add (){
        console.log(arguments)
        return [...arguments].reduce((p,c)=>p+c,0);
    }
    function fn(){
        let innerArgs = [...arguments];
        outerArgs = [...outerArgs,...innerArgs]
        console.log(outerArgs)
        return fn
    }
    return fn;
    
}
let a = curryFn(1)(2,3)(3)(6,7)
console.log(a)