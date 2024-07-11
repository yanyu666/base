const arr = [3, 5, 7, 1, 4, 56, 12, 78, 25, 0, 9, 8, 42, 37];

const quickSort = (arr,left,right)=>{
  left = left||0;
  right = right || arr.length-1;
  let index =  partition(arr,left,right);
  if(index-1 > left){
    quickSort(arr,left,index-1);
  }
  if(index < right){
    quickSort(arr,index,right);
  }

}

const partition = (arr,left,right,)=>{
  let pivot = arr[Math.floor((left + right)/2)];
  let i = left;
  let j = right;
  while(i < j){
    while(pivot > arr[i]){
      i++;
    }
    while(pivot < arr[j]){
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
quickSort(arr);
console.log(arr)

// 归并排序
// 表达式
// 
// const mergeSort = (arr,left,right,)