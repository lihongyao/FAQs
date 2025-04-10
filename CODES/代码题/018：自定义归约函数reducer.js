function reducer(nums, fn, init) {
  let result = init;
  for (let i = 0; i < nums.length; i++) {
    result = fn(result, nums[i]);
  }
  return result;
}

const nums = [1, 2, 3, 4, 5];
console.log(reducer(nums, (total, num) => total + num, 0));
