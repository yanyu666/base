// 分治算法
// 二分搜索、大整数乘法、棋盘覆盖、合并排序、快速排序、线性时间选择、最接近点对问题、循环赛日程表、汉诺塔

// 一、快速排序
// 时间复杂度：O(nlogn)
// 基本思路：
// 先在数组中确定一个“支点”（或称“基准”）（pivot），将所有小于这个“支点”的值都放在该点的左侧（右侧），
// 大于这个“支点”的值都放在该点的右侧（左侧），与“支点”相同的数可以放在任一边，然后对左右两侧不断重复这个过程，直到所有排序完成。
// 支点左右侧的值根据排序规则来决定，如果从小到大排列，支点左侧就是比它小的值，右侧就是比它大的值。
// 例：对数组[38,26,89,56,17,44]所有元素进行从小到大排序。[3,5,7,1,4,56,12,78,25,0,9,8,42,37]
const arr1 = [38, 26, 89, 56, 17, 44];
const arr2 = [3,5,7,1,4,56,12,78,25,0,9,8,42,37];

// function quickSort(arr,left,right) {
//   left = (typeof left !== 'number') ? 0 : left;
//   right = (typeof right !== 'number') ? arr.length - 1 : right;
//   let index = partition(arr, left, right);
//   if (index-1 > left) {
//     quickSort(arr,left,index-1)
//   }
//   if (index <= right) {
//     quickSort(arr,index,right)
//   }
//   return arr;
// }

// function partition(arr, left, right) {
//   let pivot = arr[Math.floor((left + right) / 2)];
//   let i = left;
//   let j = right;
//   while (i <= j) {
//     while (arr[i] < pivot) {
//       i++;
//     }
//     while (arr[j] > pivot) {
//       j--;
//     }
//     if (i <= j) {
//       let temp = arr[i];
//       arr[i] = arr[j];
//       arr[j] = temp;
//       i++;
//       j--;
//     }
//   }
//   return i;
// }

// console.log(quickSort(arr2))

// 二、归并排序
// 基本思路：
//  归并排序的思想是：将已有序的子序列合并，得到完全有序的序列；即先使每个子序列有序，再试子序列段间有序，最终合并成一个有序表。
// 采用归并方法对数组进行排序的基本方法是：将数组不断拆成两半，直到每一半只包含零个元素或一个元素为止，
// 然后就用merge函数，将拆成两半的数组不断合并，直到合并成一整个排序完成的数组。
// function mergeSort(arr, total,left,right) {
//   total = Array.isArray(total) ? total : [];
//   let mid = Math.floor(arr.length / 2);
//   if (left < right) {
//     mergeSort(left,total,left,mid);
//     mergeSort(right, total,mid+1);
//   }
//   merge(arr, total, left, right);
//   return arr;
// }

// function merge(arr, total, left, right) {
//   let mid = Math.floor((left + right) / 2);
//   let i = 0;
//   while(){

//   }
// }


function mergeSort(arr,left,right,temp){
    if(arr.length<2){
        return arr;
    }
    var mid = Math.floor((left+right)/2);
    if(left<right){
      mergeSort(arr,left,mid,temp);
        mergeSort(arr,mid+1,right,temp);
    }
    merge(arr,left,right,temp);
    return arr;
}

// 合并过程

function merge(arr,left,right,temp){
    var i = left;
    var mid = Math.floor((left+right)/2);
    var j = mid+1;
    var t = 0;
    while(i<=mid && j<=right){
        if(arr[i]<arr[j]){
            temp[t] = arr[i];
            i++;
            t++;
        }else{
            temp[t] = arr[j];
            j++;
            t++;
        }
    }
    while(i<=mid){
        temp[t] = arr[i];
        i++;
        t++;
    }
    while(j<=right){
        temp[t] = arr[j];
        j++;
        t++;
    }
    t = 0;
    var k = left;
    while(k<=right){
        arr[k] = temp[t];
        k++;
        t++;
    }
}
var arr = [4, 2, 7, 1, 5, 2, 4];
var temp = [];
var left = 0;
var right = arr.length-1;
console.log("归并排序前的数组是：",arr);
arr = mergeSort(arr,left,right,temp);
console.log("归并排序后的数组是：",arr);

// describe('mergeSort', () => {
//   test('should sort an array of numbers', () => {
//     const arr = [4, 2, 7, 1, 5];
//     const sortedArr = mergeSort(arr, 0, arr.length - 1, []);
//     expect(sortedArr).toEqual([1, 2, 4, 5, 7]);
//   });

//   test('should sort an array with negative numbers', () => {
//     const arr = [-4, -2, -7, -1, -5];
//     const sortedArr = mergeSort(arr, 0, arr.length - 1, []);
//     expect(sortedArr).toEqual([-7, -5, -4, -2, -1]);
//   });

//   test('should sort an empty array', () => {
//     const arr = [];
//     const sortedArr = mergeSort(arr, 0, arr.length - 1, []);
//     expect(sortedArr).toEqual([]);
//   });

//   test('should sort an array with only one element', () => {
//     const arr = [4];
//     const sortedArr = mergeSort(arr, 0, arr.length - 1, []);
//     expect(sortedArr).toEqual([4]);
//   });

//   test('should sort an array with duplicate elements', () => {
//     const arr = [4, 2, 7, 1, 5, 2, 4];
//     const sortedArr = mergeSort(arr, 0, arr.length - 1, []);
//     expect(sortedArr).toEqual([1, 2, 2, 4, 4, 5, 7]);
//   });
// });
