// 二分查找

// 有序数列
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const binarySearch = (arr,t) => {
  let l = 0, r = arr.length - 1, mid = Math.floor((l + r) / 2);
  while (l <= r) {
    if (t === arr[mid]) {
      return mid;
    } else if(t<arr[mid]) {
       r = mid - 1;
    } else {
      l = mid + 1;
    }
  }
  return -1;
};
