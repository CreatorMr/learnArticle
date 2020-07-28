const numbers = [10, 20, 30, 40];
const doubledOver50 = numbers.reduce((finalList, num) => {
  num = num * 2;
  if (num > 50) {
   finalList.push(num);
  }
  return finalList;
}, []);
doubledOver50; // [60, 80]