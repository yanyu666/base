const arr = [5,2,3,1,6,7,1,3,20];
// 8.计数排序 统计数字每一个值出现的顺序，必须是整数不能是小数，计数排序还是一种分布式排序  
export const countingSort = (arr) => {
    let max = arr[0],min = arr[0];
    for(let i = 1;i < arr.length;i++){
        if(arr[i] > max)max = arr[i];
        if(arr[i] < min)min = arr[i];
    }
    let count = new Array(max-min+1);
    for(let i = 0;i < arr.length;i++){
        if(count[arr[i]]){
            count[arr[i]]++;
        }else{
            count[arr[i]] = 1;
        }
    }
    let res =[];
    for(let i = 0;i < count.length;i++){
        if(count[i]){
            for(let j = 0;j<count[i];j++){
                res.push(i);
            }
        }
    }
    console.log(res)
    return res;
}
countingSort(arr)