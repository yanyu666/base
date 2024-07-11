const arr = [-1,0,3,5,9,12]//[0, 1, 3, 4, 5, 7, 8, 9, 12, 25, 37, 42, 56, 78];

// 二分查找
const binarySearch =  (nums, target)=> {
    let left = 0, right = nums.length - 1;
    while(left <= right){
        let mid = Math.floor((left+right)/2);
        if(target === nums[mid]){
            return mid ;
        }else if(target < nums[mid]){
            right = mid - 1;
        }else{
            left = mid +1 ;
            mid = Math.floor((left+right)/2);
        }
    }
    return -1;
};
console.log('search(arr)',search(arr,0))