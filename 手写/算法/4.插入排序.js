const arr = [3,5,7,1,4,56,12,78,25,0,9,8,42,37];

// 插入排序
const swap = (arr,i,j)=>{
    [arr[i],arr[j]] = [arr[j],arr[i]];
}
export const insertSort = (arr)=>{
    for(let i = 1;i < arr.length;i++){
        let key = arr[i]
        for(let j = i;j > 0;j--){
            if(arr[j]  < arr[j-1]){
                swap(arr,j,j-1)
            }
        }
    }
    return arr;
}
let a = b = 1;
console.log(a,b)
console.log(insertSort(arr))
// 优化
// 二分插入
// 二分查找
const binarySearch =  (nums, i,target)=> {
    let left = 0, right = nums.length - 1;
    while(left <= right){
        let mid = Math.floor((left+right)/2);
        if(target === nums[mid]){
            return mid ;
        }else if(target < nums[mid]){
            right = mid - 1;
        }else{
            left = mid +1 ;
            mid = Math.floor((left+right)/2);
        }
    }
    return -1;
};