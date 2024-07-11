const arr = [3,5,7,1,4,56,12,78,25,0,9,8,42,37];
// 5.希尔排序
const swap = (arr,i,j)=>{
    [arr[i],arr[j]] = [arr[j],arr[i]];
}
export const shellSort =(arr)=>{
    let nums = arr.length;
    let gap = Math.floor(nums/2);
    while(gap > 0){
        for(let i = 0;i < nums;i++){
            for(let j = gap+i;j < nums;j = j + gap){
                if(arr[i] > arr[j]){
                    swap(arr,i,j);
                }
            }
        }
        gap = Math.floor(gap / 2);
    }
    return arr;
}
console.log(shellSort(arr))