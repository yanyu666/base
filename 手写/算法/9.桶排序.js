// 9.桶排序
const arr = [35,32,49,45,47,42,21,23,12,11,0,5,4];
const bubbleSort = (arr)=>{
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
const bucketSort = (arr) => {
    // 桶数，也叫组数，要把数据分成几组
    let bucketNum = Math.ceil(arr.length / 2);
    let max = arr[0],min = arr[0];
    for(let i = 1;i < arr.length;i++){
        if(arr[i] > max)max = arr[i];
        if(arr[i] < min)min = arr[i];
    }
    // 每个桶最多存放的数据量，组距
    let bucketLen = Math.floor((max - min) / bucketNum) + 1;
    let buckets = new Array(bucketLen);
    // 创建桶s
    for(let i = 0;i < buckets.length;i++){
        buckets[i] = [];
    }
    console.log(buckets)
    // 将数据放到对应的区间的桶中
    for(let i = 0;i < arr.length;i++){
        console.log(Math.floor((arr[i]-min)/bucketLen))
        buckets[Math.floor((arr[i]-min)/bucketLen)].push(arr[i]);
    }
    let res = []
    for(let i = 0;i < buckets.length;i++){
        bubbleSort(buckets[i]);
        res = res.concat(buckets[i])
    }
    return res
}
console.log(bucketSort(arr))