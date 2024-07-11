// 函数防抖
function debounce(fn,delay){
    let timer = null;
    return function(){
        setTimeout(()=>{
            fn.apply(this,arguments)
        },delay)
        }
}