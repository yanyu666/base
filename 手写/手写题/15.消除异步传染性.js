async function getUser(){
    return await fetch('./1.json')
}

async function m1(){
    const user =  await getUser();
    // other work
    return user;
}

async function m2(){
    const user =  await m1();
    // other work
    return user;
}

async function m3(){
    const user =  await m2();
    // other work
    return user;
}

async function main(){
    const user =  await m3();
    // other work
    console.log(user)
}

function run (fn){
    // 1.改动 fetch
    // 2.运行 fn
    // 3.改回 fetch
}
run(main);