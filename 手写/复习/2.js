const arr = [3, 5, 7, 1, 4, 56, 12, 78, 25, 0, 9, 8, 42, 37];
const swap = (arr,i,j)=>{
    [arr[i],arr[j]] = [arr[j],arr[i]];
}
// 快速排序
const quickSort = (arr,left,right) => {
    left = left || 0,right = right || arr.length - 1;
    let index = partition(arr,left,right);
    if(index - 1 > left){
        quickSort(arr,left,index-1);
    }
    if(index < right){
        quickSort(arr,index,right);
    }
    return arr;
}

const partition = (arr,left,right) => {
    let mid = Math.floor((left + right) / 2),pivot = arr[mid],i = left,j = right;
    while(i < j){
        while(arr[i] < pivot){
            i++;
        }
        while(arr[j] > pivot){
            j--;
        }
        if(i <= j){
            swap(arr,i,j)
            i++;
            j--;
        }
    }
    return i;
}
// console.log(quickSort(arr))

// 归并排序
const mergeSort = (arr) => {
    if(arr.length <= 1)return arr;
    let mid = Math.floor(arr.length / 2),mid_val = arr[mid];
    let left = mergeSort(arr.slice(0,mid)),right = mergeSort(arr.slice(mid));
    // mergeSort(left)
    // mergeSort(right)
    console.log(left)
    console.log(right)
   return  arr = merge(left, right);
}

const merge = (left,right) => {
    console.log(left)
    console.log(right)
    let i = 0, j = 0,arr = [];
    while(i < left.length && j < right.length){
        if(left[i] < right[j]){
            arr.push(left[i]);
            i++;
        }else{
            arr.push(right[j]);
            j++;
        }
    }
    return arr.concat(i < left.length ? left.slice(i):right.slice(j))
}


// console.log('111',mergeSort(arr))


const bubbleSort = (arr) => {
    for(let i = 0;i < arr.length-1;i++){
        for(let j = i+1;j < arr.length;j++){
            if(arr[i] > arr[j]){
                swap(arr,i,j)
            }
        }
    }
    return arr;
}

// console.log('111',bubbleSort(arr))

const insertSort = (arr) => {
    for(let i = 1;i < arr.length;i++){
        for(let j = i;j > 0;j--){
            if(arr[j] < arr[j-1]){
                swap(arr,j,j-1);
            }
        }
    }
    return arr;
}

// console.log('111',insertSort(arr))

const selectSort = (arr) => {
    for(let i = 0;i < arr.length;i++){
        let min = arr[i];
        for(let j = i+1;j < arr.length;j++){
            if(arr[j] < min){
                swap(arr,i,j);
                min = arr[j];
            }
        }
    }
    return arr;
}

// console.log('111',selectSort(arr))

const shellSort = (arr) => {
    let gap = Math.floor(arr.length / 2);
    while(gap > 0){
        for(let i = 0;i < arr.length;i++){
            for(let j = i+gap;j < arr.length;j+=gap){
                if(arr[i] > arr[j]){
                    swap(arr,i,j)
                }
            }
        }
        gap = Math.floor(gap / 2);
    }
    return arr;
}

// console.log('111',shellSort(arr))

const binarySearch = (arr) => {
    if(arr.length <= 1)return arr;
    let mid = Math.floor(arr.length / 2),mid_val = arr[mid];
    let left = [],right = [];
    for(let i = 0;i < arr.length;i++){
        if(arr[i] < mid_val){
            left.push(arr[i]);
        }
        if(arr[i] > mid_val){
            right.push(arr[i]);
        }
    }
    return binarySearch(left).concat(mid_val,binarySearch(right))
}

// console.log('111',binarySearch(arr))

// 计数排序
const  countingSort  =(arr) => {
    let max = arr[0],min = arr[0];
    for(let i = 0;i < arr.length;i++){
        if(max < arr[i]) max = arr[i];
        if(min > arr[i]) min = arr[i];
    }
    let count = new Array(max - min + 1);
    for(let i = 0;i < arr.length;i++){
        if(!count[arr[i]]){
            count[arr[i]] = 1;
        }else{
            count[arr[i]]++;
        }
    }
    let res = [];
    for(let i = 0;i < count.length;i++){
        if(count[i]){
            for(let j = 0;j < count[i];i++){
                res.push(i);
            }
        }
    }
    return res;
}

console.log('111',countingSort(arr))


