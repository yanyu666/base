/**
 * 根据数字按键得到所有字母排列组合
 * @param {string} digits 数字按键，例如'23'
 * @return {string[]} 按键所有的排列组合
 */
const map = [, , 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];

function keyboardMap(digits) {
  let nums = digits.split('');
  let keys=  []
  nums.forEach(v => {
    console.log(map[v].split(''))
    keys.push(map[v].split(''));
  })
  let originI = 0;
  let origin = keys[originI].map(v => v);
  let originCopy = keys[originI].map(v => v);
  while (originI < keys.length-1) {
    originI++;
    for (let i = 0; i < origin.length; i++){
        for (let j = 0; j < keys[originI].length; j++){
          if (Array.isArray(originCopy[i])) {
            originCopy[i].push(origin[i] + keys[originI][j]);
          } else {
            originCopy[i] = [origin[i] + keys[originI][j]];
           }
        }
    }
    origin = originCopy.reduce((p, c) => p.concat(c), []);
    originCopy = origin.map(v => v);
    // origin = keys[originI].map(v => v);
 }
  return nums;
}
console.log(keyboardMap('2349'))

// 递归
let arr = [
  { name: '王1', age:31,children:[{name: '王11', age:11},{name: '王12', age:10}]},
  { name: '李1', age:31,children:[{name: '李11', age:11},{name: '李12', age:10}]},
]

// 斐波那契数 （通常用 F(n) 表示）形成的序列称为 斐波那契数列 。该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和。也就是：

// F(0) = 0，F(1) = 1
// F(n) = F(n - 1) + F(n - 2)，其中 n > 1
// 给定 n ，请计算 F(n) 。
// 0 <= n <= 100

// 答案需要取模 1e9+7(1000000007) ，如计算初始结果为：1000000008，请返回 1。
function fib(n) {
  if (n === 0) {
    return
  }

  return
}
