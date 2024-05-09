// 实现睡眠函数sleep
// 1.promise实现
const sleep = (time) => {
  return new Promise((resolve, reject) =>setTimeout(resolve, time))
}
console.time('runTime:')
console.log(1)
// sleep(2000).then(() => {
//   console.timeEnd('runTime:')
//   console.time('runTime:')
//   console.log(2)
//   sleep(1000).then(() => {
//     console.timeEnd('runTime:')
//     console.log(3)
//   })
// })

// 2.基于Generator函数的sleep
// import co from "co"

// const run = function* () {
//   yield sleep(1000)
//   console.log(2)
//   console.timeEnd('runTime:')
//   console.time('runTime:')
//   yield sleep(2000)
//   console.log(3)
//   console.timeEnd('runTime:')
// }
// co(run)

// 3.基于async await 的sleep

const run =  async()=> {
  await sleep(1000)
  console.log(2)
  console.timeEnd('runTime:')
  console.time('runTime:')
  await sleep(2000)
  console.log(3)
  console.timeEnd('runTime:')
}
run()
