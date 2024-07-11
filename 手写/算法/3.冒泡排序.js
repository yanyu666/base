const arr = [3,5,7,1,4,56,12,78,25,0,9,8,42,37];

// 冒泡排序
export const bubbleSort = (arr)=>{
    for(let i = 0;i < arr.length-1;i++){
        for(let j = 0;j < arr.length - 1 - i;j++){
            if(arr[j] > arr[j+1]){
                swap(arr,j,j+1);
            }
        }
    }
    console.log(arr)
}

const swap = (arr,i,j)=>{
    [arr[i],arr[j]] = [arr[j],arr[i]];
}
// 一重优化：增加交换过的状态值，当循环一趟，没有交换过，说明数组已经是有序了，下次不需要再次循环了
// 记录最后一次交互元素时的位置，下一次内循环循环到上一次的结束位置
// bubbleSort(arr);

var maxProfit = function(prices) {
    let l = prices.length,maxArr = [];
    for(let i = 0;i < l;i++){
        let arr = [];
        for(let j = i+1;j < l;j++){
            if(prices[j] - prices[i] > 0){
                arr.push(prices[j] - prices[i]);
            }
        }
        if(arr.length){
            maxArr.push(Math.max(...arr));
        }
    }
    console.log(maxArr)
    return maxArr.length ?  Math.max(...maxArr) : 0;
};
maxProfit([7,1,5,3,6,4])