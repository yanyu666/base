const arr = [3, 5, 7, 1, 4, 56, 12, 78, 25, 0, 9, 8, 42, 37];

const mergeSort = (arr, temp, left, right) => {
  console.log(1,arr)
   if(arr.length<2){
        return arr;
    }
  let mid = Math.floor((left + right) / 2);
  if (left < right) {
    mergeSort(arr, temp, left, mid);
    mergeSort(arr, temp, mid+1, right);
  }
  merge(arr, temp, left, right);
  return arr;
};

const merge = (arr, temp, left, right) => {
  // console.log(arr, temp, left, right);
  let mid = Math.floor((left + right) / 2)
  let i1 = left, j1 = mid,i2=mid+1,j2=right,i=0;
  while (i1 <= j1 && i2 <= j2) {
    // console.log(i, j);
    if (arr[i1] > arr[i2]) {
      temp[i] = arr[i2];
      i++;
      i2++;
    } else {
      temp[i] = arr[i1];
      i++;
      i1++;
    }
  }
   while (i1 <= j1) {
      temp[i] = arr[i1];
      i++;
      i1++;
    }
    while (i2 <= j2) {
      temp[i] = arr[i2];
      i++;
      i2++;
    }
    var k = left;
    i = 0;
    while (k <= right) {
      arr[k] = temp[i];
      k++;
      i++;
    }
  console.log(arr, temp, left, right);
}
let left = 0;
let temp = [];
let right = arr.length - 1
mergeSort(arr,temp,left,right);
console.log(mergeSort(arr))
