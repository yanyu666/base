// 10.基数排序
const arr = [2, 343, 342, 1, 123, 43, 4343, 433, 687, 654, 3];


const findMaxNum = (arr) => {
    let max = arr[0]
    for(let i = 1;i < arr.length;i++){
        if(arr[i] > max)max = arr[i];
    }
    return max;
}

const bubbleSort = (arr,index)=>{
    for(let i = 0;i < arr.length-1;i++){
        for(let j = 0;j < arr.length - 1 - i;j++){
            if(arr[j][index] > arr[j+1][index]){
                swap(arr,j,j+1);
            }
        }
    }
}

const swap = (arr,i,j)=>{
    [arr[i],arr[j]] = [arr[j],arr[i]];
}

const addSites = (num,times) => {
    for(let i = 0;i < times;i++){
        num = '0' + num;
    }
    return num;
}

const baseSort = (arr) => {
    // 创建桶
    let buckets = new Array(10);
    let max = findMaxNum(arr);
    let times = String(Number(max)).length;
    for(let i = 0;i < arr.length;i++){
        if(String(arr[i]).length < times){
            arr[i] = addSites(arr[i],times - String(arr[i]).length);
        }else{
            arr[i] = String(arr[i]);
        }
    }
    for(let i = times-1;i >= 0 ;i--){
        for(let j = 0;j < buckets.length;j++){
            buckets[j] = [];
        }
        for(let j = 0;j < arr.length;j++){
            buckets[arr[j][i]].push(arr[j]);
        }
        let res = [];
        // console.log('i',i)
        // console.log('arr',arr)
        for(let j = 0;j < buckets.length;j++){
            bubbleSort(buckets[j],i)
            // console.log('buckets',buckets)
            
            // console.log('arr',arr)
        }
        arr = [].concat(...buckets);
    }
    return arr;
}

console.log(baseSort(arr))