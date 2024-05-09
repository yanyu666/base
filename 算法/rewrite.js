const arr = [3, 5, 7, 1, 4, 56, 12, 78, 25, 0, 9, 8, 42, 37];

const quickSort = (arr, left, right)=>{
  left = left ? left : 0;
  right = right ? right : arr.length - 1;
  const index = partition(arr, left, right);
  if (left < index - 1) {
    quickSort(arr, left, index - 1);
  }
  if (index <= right) {
    quickSort(arr, index, right);
  }
  return arr;
}

const partition = (arr, left, right) => {
  const pivot = arr[Math.floor((right + left) / 2)];
  let i = left, j = right;
  while (i <= j) {
    while (arr[i] < pivot) {
      i++;
    }
    while (arr[j] > pivot) {
      j--;
    }
    if (i <= j) {
      [arr[j],arr[i]] = [arr[i],arr[j]];
      i++;
      j--;
    }
  }
  return i
}
console.log(quickSort(arr))
