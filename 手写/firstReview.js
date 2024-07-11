const arr = [3, 5, 7, 1, 4, 56, 12, 78, 25, 0, 9, 8, 42, 37];
let left = 0, right = arr.length - 1, temp = [];
// 快速排序
const quickSort = (arr, left, right) => {
  let pivotIndex = partition(arr, left, right);
  if (left < right) {
    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex, right);
  }
  return arr
}

const partition = (arr, left, right) => {
  let i = left, j = right, mid = Math.floor((left + right) / 2), pivot = arr[mid];
  while (i <= j) {
    while (arr[i] < pivot) {
      i++;
    }
    while (arr[j] > pivot) {
      j--;
    }
    if (i <= j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
      j--;
    }
    console.log(i, j);
    console.log(arr);
  }
  return i;

}
// console.log(arr.length)
// console.log(quickSort(arr, left, right))


// 合并排序
const mergeSort = (arr, left, right, temp) => {
  if (left === right) {
    return arr;
  }

  let mid = Math.floor((left + right) / 2);
  mergeSort(arr, left, mid, temp);
  mergeSort(arr, mid + 1, right, temp);
  merge(arr, left, right, temp);
  return arr;
}
const merge = (arr, left, right, temp) => {
  let mid = Math.floor((left + right) / 2), b1 = left, e1 = mid, b2 = mid + 1, e2 = right,i = 0;
  while (b1 <= e1 && b2 <= e2) {
    if (arr[b1] < arr[b2]) {
      temp[i] = arr[b1];
      b1++;
    } else {
      temp[i] = arr[b2];
       b2++;
    }
    i++;
  }
  console.log(temp)
  while (b1 <= e1) {
    temp[i] = arr[b1];
    i++;
    b1++;
  }
  while (b2 <= e2) {
    temp[i] = arr[b2];
    i++;
    b2++;
  }
  let k = left;
  i = 0;
  while (k <= right) {
    arr[k] = temp[i];
    k++;
    i++;
  }
  console.log(temp)
}
console.log(mergeSort(arr, left, right,temp))
