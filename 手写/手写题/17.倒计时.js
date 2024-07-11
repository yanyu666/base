// // const [time,setTime] = useState('2024-7-3 12:30:00')
//   const CountNum = (time) => {


//     return function (){
//       console.log(time)
//     }
//   }

// type Original = {a:string}
// type Result = AddTo<Original,'b',2> //expected: type Result = {a:string,b:2}
// // 请实现 AddTo
// type AddTo = ?

//   有一应用程序，在用户登录时需要本机macAddr、diskSerialNum、systemUUID等信息，这些信息被封装在一个异步函数中获取
// type AddTo = Pick<Original,'b'>

```typescript
async funciton getRequiredInfo():Promise<{macAddr:string,diskSerialNum:string,systemUUID:string}>{
 const info = await system.getInfo()
   return info
} 
```
// 假设此函数是调用本机系统api，不产生网络请求，对本机资源占用很少，但是耗时较长，大约10秒。
// 该函数可以在应用启动时调用，也可以在登录之前调用。请简述如何调用该函数才能尽可能的减少耗时影响。
```javascript
//伪代码
//启动应用时调用
async function init() {
  //Todo
}
init()
// 登录函数
const handleLogin = async ()=>{
   //Todo
   //获取requiredInfo
   await fetch('/login',requiredInfo)
}




```


// 3.我们从服务端一次性拿到了大约包含10万个游戏的数据，每个游戏数据格式如下`type Game = {id:number,name:string,image_url:string}`，
// 现在我们需要将这些数据以列表的形式纵向渲染出来（无法分页），
// 列表中的每一项需要展示游戏图片和名称，同时包含一个搜索框可以搜索name。
// 请描述一个方案处理此场景，并描述该方案用到技术的大致实现方案。

// 3、使用虚拟列表，同一时间内页面渲染一定数量的数据，当滚动到一定位置时，再加载更多数据以减少浏览器开销。
// 虚拟列表的实现原理：
// 1. 创建一个列表容器，设置高度和宽度。
// 2.设置列表每一项的高度
// 3.根据滚动条的位置，计算出需要继续加载的下一部分数据的索引，并从原数组中取出数据，渲染到列表中。
// 4、存在队头阻塞
// 主要原因 有多个 http 请求共用一个 tcp 链接，一单丢包会导致所有请求返回的数据等待丢包的数据重新请求，造成阻塞


// 4. http2是否存在队头阻塞，如存在，什么原因造成了队头阻塞？
// 存在队头阻塞
// 主要原因 有多个 http 请求共用一个 tcp 链接，一单丢包会导致所有请求返回的数据等待丢包的数据重新请求，造成阻塞