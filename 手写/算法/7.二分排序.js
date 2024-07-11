const arr = [3,5,7,1,4,56,12,78,25,0,9,8,42,37];
// 7.二分排序
export const binarySort = (arr) => {
    if(arr.length<1)return arr;
    let mid = Math.floor(arr.length/2);
    let mid_val = arr.splice(mid,1)[0];
    let left =[];
    let right =[];
    for(let i = 0;i < arr.length;i++){
        if(arr[i] < mid_val){
            left.push(arr[i]);
        }else{
            right.push(arr[i]);
        }
    }
    return binarySort(left).concat(mid_val,binarySort(right));
}
console.log(binarySort(arr))