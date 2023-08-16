// this algorithm retunrs
// non matching entries from two array

// example oldArr = [1,2,3,4], newArr = [1,2,3,4,5,6,7,8] and the ans sholud be [5,6,7,8]

// end cases
// 1. handle old empty array
// 2. if both array are same return empty arrays

const uncommonEntries = (oldArr = [], newArr = []) => {
  let oldArrLength = oldArr.length;
  let newArrLength = newArr.length;

  let ans = newArr.slice(oldArrLength, newArrLength);
  return ans;
};

console.log(uncommonEntries([1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9]));
export default uncommonEntries;
