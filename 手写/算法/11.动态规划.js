
// 动态规划 核心是找到状态转移方程：相同问题在不同规模下的关系
// 斐波那契数列
function fn(n) {
    if(n===1||n===2){
        return 1;
    }else{
        return fn(n-1) + fn(n-2)
    }
}
console.log(fn(10))


// 青蛙跳台阶,一次只能跳一级或两级台阶，问跳到第 n 个台阶需要跳几次
// dp(n) = dp(n-1)+dp(n-2)

function wn(n){
   if(n===1||n===2){
    return n
   }else{
    return wn(n-1)+wn(n-2)
   }
}
// console.log(wn(3))
// console.log(wn(4))
// 62. 不同路径
// dp(m,n) = dp(m-1,n) + dp(m,n-1)
function pn(m,n){
    let cache = {};
    const dp = (i,j) => {
        if(i===1||j===1){
            return 1;
        }
        const key = `${i}-${j}`;
        if(cache[key]){
            return cache[key]
        }else{
            cache[key] = dp(i-1,j) + dp(i,j-1)
        }
    }
    return dp(m-1,n-1);
}
const uniquePaths=  (m,n)=>{
    let f = new Array(m).fill(0).map(()=>new Array(n).fill(0));
    for(let i = 0;i < m;i++){
        f[i][0] = 1;
    }
    for(let i = 0;i < n;i++){
        f[0][i] = 1;
    }
    for(let i = 1;i < m;i++){
        for(let j = 1;j < n;j++){
            f[i][j] = f[i-1][j] + f[i][j-1]
        }
    }
    console.log(f)
    return f[m-1][n-1]
    
}
// console.log(pn(3,2))//3
// console.log(uniquePaths(3,7))//28

// LCR 099. 最小路径和
// 给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
// 说明：一个机器人每次只能向下或者向右移动一步。

// 输入：grid = [[1,3,1],[1,5,1],[4,2,1]]
// 输出：7
// 解释：因为路径 1→3→1→1→1 的总和最小。
// dp(m,n) = Math.min(dp(m-1,n),dp(m,n-1))
let grid = [[1,3,1],[1,5,1],[4,2,1]]
function minPath (grid){
    let m = grid.length;
    let n = grid[0].length;
    let dp =  new Array(m).fill(0).map(()=>new Array(n).fill(0));
    dp[0][0] = grid[0][0];
    // for(let i = 0;i < m;i++){
    //     for(let j = 0;j < n;j++){
    //         if(i === 0){
    //             dp[0][j] += grid[0][j];
    //         }
    //     }
    // }
    console.log(dp)
    // return 
} 
// minPath(grid)

// 174. 地下城游戏
// 
let dungeon = [[-2,-3,3],[-5,-10,1],[10,30,-5]];
function calculateMinimumHP(dungeon){
    let m = dungeon.length,n = dungeon[0].length;
    let dp = new Array(m).fill(0).map(()=>new Array(n).fill(0))
    for(let i = 0;i < m;i++){
        dp[i][0] = dungeon[i][0];
    }
    for(let i = 0;i < n;i++){
        dp[0][i] = dungeon[0][i];
    }
    for(let i = 0;i < m;i++){
        for(let j = 0;j < n;j++){
            if(i === 0 ){
                dp[0][j] = j === 0 ? dp[0][0] : dp[0][j-1]+dp[0][j];
            }else if(j === 0){
                dp[i][0] = i === 0 ? dp[0][0] : dp[i-1][j]+dp[i][0];
            }else{
                dp[i][j] = Math.max(dp([]))
            }
        }
    }
}
let nums =[-13,5,13,12,-2,-11,-1,12,-3,0,-3,-7,-7,-5,-3,-15,-2,14,14,13,6,-11,-11,5,-15,-14,5,-5,-2,0,3,-8,-10,-7,11,-5,-10,-5,-7,-6,2,5,3,2,7,7,3,-10,-2,2,-12,-11,-1,14,10,-9,-15,-8,-7,-9,7,3,-2,5,11,-13,-15,8,-3,-7,-12,7,5,-2,-6,-3,-10,4,2,-5,14,-3,-1,-10,-3,-14,-4,-3,-7,-4,3,8,14,9,-2,10,11,-10,-4,-15,-9,-1,-1,3,4,1,8,1]
// [-13,5,13,12,-2,-11,-1,12,-3,0,-3,-7,-7,-5,-3,-15,-2,14,14,13,6,-11,-11,5,-15,-14,5,-5,-2,0,3,-8,-10,-7,11,-5,-10,-5,-7,-6,2,5,3,2,7,7,3,-10,-2,2,-12,-11,-1,14,10,-9,-15,-8,-7,-9,7,3,-2,5,11,-13,-15,8,-3,-7,-12,7,5,-2,-6,-3,-10,4,2,-5,14,-3,-1,-10,-3,-14,-4,-3,-7,-4,3,8,14,9,-2,10,11,-10,-4,-15,-9,-1,-1,3,4,1,8,1]
var threeSum = function(nums) {
    let arr = [];
    nums.sort((a,b)=>a-b);
    console.log(nums)
    for(let k = 0;k < nums.length;k++){
        if(nums[k] > 0)return arr;
        if(k > 0 && nums[k] === nums[k-1])continue;
        let i  = k+1,j = nums.length-1;
    while(i < j){
        let s = nums[k] + nums[i] + nums[j];
        if(s < 0){
            i++;
            while(i < j && nums[i] === nums[i-1]){
                i++;
            }
        }else if(s > 0){
            j--;
            while(i < j && nums[j] === nums[j+1]){
                j--;
            }
        }else{
            arr.push([nums[k],nums[i],nums[j]]);
            i++;
            while(i < j && nums[i] === nums[i-1]){
                i++;
            }
            j--;
            while(i < j && nums[j] === nums[j+1]){
                j--;
            }

        }
    }
   }
    return arr
};

// console.log(threeSum(nums))


var lengthOfLongestSubstring = function(s) {
    let len = s.length,i = 0,j = i + 1,arr = [];
    while(j <= len){
        if(s.substring(i,j).includes(s[j])){
            arr.push(s.substring(i,j).length);
            i++;
            j = i+1;
        }else{
            j++;
            console.log('164',j)
            console.log('arr',arr)
        }
    }
    return Math.max(...arr)
};
// console.log(lengthOfLongestSubstring('au'))

var LRUCache = function(capacity) {
    this.capArr = new Array(capacity).fill([]);
    this.get = (i)=>{
        let 
        for(let i = 0;i < this.capArr.length;i++){
            if()
        }
    }
    this.put = (i,j)=>{}
};

let a = new LRUCache(2);
console.log(a)