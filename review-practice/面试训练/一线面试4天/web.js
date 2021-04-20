console.log([] == false) // true
console.log(![] == false) // true

let arr = [10.18, 0, 10, 25, 23]
arr = arr.map(parseInt)
console.log(arr) // 10, NaN, 2, 2, 11

// var a = ?
// if (a == 1 && a == 2 && a == 3) {
//   console.log(1)
// }
var a = {
  i = 0,
  toString() {
    return ++this.i
  }
};
if (a == 1 && a == 2 && a == 3) {
  console.log(1);
}

var x = 1;
function func(x, y = function anonymous1() { x = 2 }) {
  var x = 3;
  y();
  console.log(x);
}
func(5);
console.log(x);
// 3 1

function fun(n, o) {
  console.log(o);
  return {
    fun: function (m) {
      return fun(m, n);
    }
  };
}
var c = fun(1, 2).fun(3, 4);
c.fun(5);
c.fun(6);
// 2 1 3 3



var name = '珠峰培训';
function A(x, y) {
  var res = x + y;
  console.log(res, this.name);
}
function B(x, y) {
  var res = x - y;
  console.log(res, this.name);
}
B.call(A, 40, 30); // 10 'A'
B.call.call.call(A, 20, 10); // NaN undefined
Function.prototype.call(A, 60, 50); // undefined
Function.prototype.call.call.call(A, 80, 70); // NaN undefined

// 所有和为N的连续正数序列

/*
 * 输入一个正数N，输出所有和为N的连续正数序列
 * 例如：输入15
 * 结果：[[1,2,3,4,5],[4,5,6],[7,8]]
 */
function createArr(n, len) {
  let arr = new Array(len).fill(null),
    temp = [];
  arr[0] = n;
  arr = arr.map((item, index) => {
    if (item === null) {
      item = temp[index - 1] + 1;
    }
    temp.push(item);
    return item;
  });
  return arr;
}
function fn(count) {
  let result = [];
  //=>求出中间值
  let middle = Math.ceil(count / 2);
  //从1开始累加
  for (let i = 1; i <= middle; i++) {
    //控制累加多少次
    for (let j = 2; ; j++) {
      //求出累加多次的和
      let total = (i + (i + j - 1)) * (j / 2);
      if (total > count) {
        break;
      } else if (total === count) {
        result.push(createArr(i, j));
        break;
      }
    }
  }
  return result;
}

// 数组中找出和为N的两个整数
/* 
 * 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标
 * nums = [1,6,4,8,7];
 * target = 9
 * => nums[0] + nums[3] = 9
 * => [0,3]
 */

/*方案1：暴力法（遍历每个元素 x，并查找是否存在一个值与 target - x 相等的目标元素）*/
function func(nums, target) {
  for (let i = 0; i < nums.length - 1; i++) {
    let item = nums[i],
      diff = target - item;
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] === diff) {
        return [i, j];
      }
    }
  }
}

/*方案2：对象键值对*/
function func(nums, target) {
  let temp = {};
  for (let i = 0; i < nums.length; i++) {
    let item = nums[i],
      diff = target - item;
    if (temp[diff] !== undefined) {
      return [temp[diff], i];
    }
    temp[item] = i;
  }
}

// 具有最大和的连续子数组
function maxSubArray(nums) {
  let ans = nums[0],
    sum = 0;
  for (let i = 0; i < nums.length; i++) {
    let item = nums[i];
    if (sum > 0) {
      sum += item;
    } else {
      sum = item;
    }
    ans = Math.max(ans, sum);
  }
  return ans;
}
console.log(maxSubArray([-2, 2, -1, 1, -3]));

// 阿里：合并两个有序数组
// O((n+m)*log(n+m))
function merge(nums1, nums2) {
  return nums1.concat(nums2).sort((a, b) => a - b);
}

// O(m+n)
function merge(nums1, nums2) {
  let len1 = nums1.length - 1;
  let len2 = nums2.length - 1;
  let len = nums1.length + nums2.length - 1;
  while (len1 >= 0 && len2 >= 0) {
    let val1 = nums1[len1],
      val2 = nums2[len2];
    if (val1 > val2) {
      nums1[len] = val1;
      len1--;
    } else {
      nums1[len] = val2;
      len2--;
    }
    len--;
  }
  return nums1;
};
console.log(merge([1, 5, 8, 16, 26], [4, 7, 9, 17]));

// 阿里：斐波那契数列

/*
 * 实现一个fibonacci [ˌfɪbəˈnɑːtʃi] 函数，实现以下的功能：
 * 斐波那契数列为：[1,1,2,3,5,8,13,21,…]
 * fibonacci(0) -> 1
 * fibonacci(4) -> 5
 */
function fibonacci(count) {
  if (count <= 1) return 1;
  let arr = [1, 1],
    n = count + 1 - 2; //=>要创建的数量
  while (n > 0) {
    let cur = arr[arr.length - 2],
      next = arr[arr.length - 1];
    arr.push(cur + next);
    n--;
  }
  return arr[arr.length - 1];
}