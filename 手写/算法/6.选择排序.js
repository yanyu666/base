const arr = [3,5,7,1,4,56,12,78,25,0,9,8,42,37];
// 6.选择排序

const swap = (arr,i,j)=>{
    [arr[i],arr[j]] = [arr[j],arr[i]];
}
export const selectSort = (arr) => {
    for(let i = 0;i < arr.length;i++){
        let min = arr[i];
        for(let j = 0;j < arr.length;j++){
            if(min < arr[j]){
                min = arr[j];
                swap(arr,i,j)
            }
        }
    }
    return arr;
}
console.log(selectSort(arr))