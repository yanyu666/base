const arr = [3, 5, 7, 1, 4, 56, 12, 78, 25, 0, 9, 8,12, 42, 37];
// const arr = [8,4,5,7,1,3,6,2];
// 快速排序
const quickSort = (arr,left,right)=>{
    left = left||0;
    right = right || arr.length-1;
    let index = partition(arr,left,right);
    if(index-1 > left){
        quickSort(arr,left,index-1);
    }
    if(index < right){
        quickSort(arr,index,right);
    }
    return arr;
}

const partition =  (arr,left,right)=>{
    let pivot = arr[Math.floor((left+right)/2)],i = left,j = right;
    while(i<j){
        while(arr[i] < pivot){
            i++;
        }
        while(arr[j] > pivot){
            j--;
        }
        if(i<=j){
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            i++;
            j--;
        }
    }
    return i;
}
// console.log(quickSort(arr));


// 归并排序
var l_i = 0;
var r_i = 0;
const mergeSort = (arr)=>{
    if(arr.length<=1){
        return arr;
    }
    let mid = Math.floor((arr.length)/2);
    let left_arr = mergeSort(arr.slice(0, mid));
    let right_arr  = mergeSort(arr.slice(mid));
    return arr = merge(left_arr,right_arr);
};
const merge = (left,right)=>{
    console.log(left,right)
    let temp = [],i = 0,j = 0;
    while(i < left.length && j < right.length){
        if(left[i] < right[j]){
            temp.push(left[i]);
            i++;
        }else{
            temp.push(right[j]);
            j++;
        }
        // if(j < right.length){
        //     temp.push(right[j]);
        // }
    }
    console.log('temp',temp)
    return temp.concat(i < left.length?left.slice(i):right.slice(j));
}
mergeSort(arr,[]);