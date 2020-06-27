### 正则表达式
regular expression

用来处理字符串的规则
>- 只能处理字符串
>- 它是一个规则： 可以验证字符串是否符合某个规则（test），也可以把字符串中符合规则的内容捕获到(exec/match...)

```javascript
let str = 'good good study, day day up!';
// 学正则就是用来指定规则的
let reg = /\d+/; // 是否包含数字
reg.test(str); // false

str = "2020-08-22"
reg.exec(str) //=> 返回的数组 【2020,index:0, inputs: '原始字符串'】
``` 

**编写正则表达式**

1、创建方式两种
```javascript
// => 字面量创建方式(两个斜杆之间抱起来的，都是用来描述规则的元字符)
let reg2 = /\d+/;
// => 构造函数模式创建   两个参数： 元字符字符串，修饰符字符串
let reg2 = new RegExp("\\d+")
```
正则表达式由两部分组成
>- 元字符
>- 修饰符

```javascript
/*常用的元字符*/
//=> 1、量词元字符： 设置出现的次数
*       0 到 多次
+       1 到 多次
?       0 或 1次
{n}     出现n次  n  0 或 正整数
{n, }   出现n到多次
{n, m}  出现n到m次


//=> 2、特殊元字符：单个或者组合在一起代表特殊的含义
\       转移字符（普通-> 特殊-> 普通）
.       除\n(换行符)以外的任意字符
^       以哪一个元字符作为开始
$       以哪一个元字符作为结束

\n      换行符 
\d      0-9 之间的一个数字
\D      非0-9之间的一个数字
\w      数字、字母、下划线中的任意一个字符
\W      非 数字、字母、下划线中的任意一个字符
\s      一个空白字符（包括 空格，制表符、换页符等）
\t      一个制表符 （一个tab键，四个空格）
\b      匹配一个单词的边界
x|y     x或者y 中的一个字符
[xyz]   x或者y或者z中的一个字符
[^xyz]  除了x或者y或者z以外的一个字符
[a-z]   指定a-z这个范围中的任意字符  [0-9a-zA-Z_] === \w
[^a-z]  上一个的取反"非"
()      正则中的分组符号
(?:)    只匹配不捕获
(?=)    正向肯定预查
(?!)    正向否定预查
(?<=)   反向肯定预查
(?<!)   反向否定预查

//=> 3、普通元字符： 代表本身含义的
/zhengze/ 此正则匹配的就是 ”zhengze“
```

```javascript
/*正则表达式中的修饰符i: mg*/
i => ignoreCase 忽略单词的大小写匹配
m => multiline 可以进行多行匹配
g => global 全局匹配

/A/i.test('abc')
```
**元字符详细解析**
`^ $`

```javascript
let reg = /^\d/;
res.test('zhengze') // => false
res.test('2020zhengze') // => true
res.test('zhengze2020') // => false
```

```javascript
let reg = /\d$/;
res.test('zhengze') // => false
res.test('2020zhengze') // => false
res.test('zhengze2020') // => true

// => 举个例子： 验证手机号码 (11位， 第一个数字是1即可)
let reg = /^1\d{10}$/
```
`\`
```javascript
// => .不是小数点，是除\n 以外的任意字符
let reg = /^2.3$/
console.log(reg.test("2.3")) // => true
console.log(reg.test("2@3"))// => true
console.log(reg.test("23"))// => false


let str = '\d'
/^\\d$/.test(str) // false
/^\d$/.test(str) // false
/^\\d$/.test("\\d") // =>true
```

`x|y`
```javascript
let reg = /^18|29$/

console.log(reg.test("18")）
console.log(reg.test("29")）
console.log(reg.test("129")）
console.log(reg.test("189")）
console.log(reg.test("1829")）
console.log(reg.test("829")）
console.log(reg.test("182")）
// 都是true

// ---- 直接x|y 会存在很乱的优先级问题，一般我们写的时候都伴随这个小括号进行分组，因为小括号改变处理的优先级 => 小括号： 分组
let reg = /^(18|29)$/

console.log(reg.test("18")） // true
console.log(reg.test("29")） // true
console.log(reg.test("129")） // false
console.log(reg.test("189")）// false
console.log(reg.test("1829")）// false
console.log(reg.test("829")）// false
console.log(reg.test("182")）// false
// 只能是18 或29 其中的一个
```

`[]`
```javascript
//1、 中括号中出现的字符一般都代表本身的含义
let reg = /^[@+]+$/

reg.test("@@") 
reg.test("@+") 

let reg = /^[\d]$/ // 特殊的\d 在中括号还是0-9
let reg = /^[\\d]$/  // \ 或者 d 中的一个

// 2、中括号中不存在多位数
reg = /^[18]$/
console.log(reg.test("1")）// true
console.log(reg.test("8")）// true
console.log(reg.test("18")）// false

```

**常用的正则表达式**

1、验证是否为有效数字
```javascript
/**
*规则分析
* 1、可能出现 + - 号， 也可能不出现
* 2、以为0-9 都可以，多为首位不能为0
* 3、小数部分可能有可能没有，一旦有后面必须小数点加数字
*/

// 0 
// 1
// 12
// 12.5
// 12.0
// -1
// -12.4
// 09 > - 不是有效数字
// +9

let reg = /^[+-]?(\d|([1-9]\d+))(\.\d+)?$/;
```

2、验证密码
```javascript
/**
*规则分析
* 1、数字字母下划线
* 2、6-16位
*/


let val = userPassInp,value;
function checkPass(val) {
  if(val.length< 6 || val.length > 16) {
    alert('');
    return ;
  }
  let area = ['a,', 'b', .... ,'_'];
  for (var i =0;i<val.length;i++){
    let char = val[i]
    if(!area.includes(char)) {
      alert('')
    }
  }

  reg = /^\w{6, 16}$/
  reg.test(val)
```
3、验证真是姓名
```javascript
/**
*规则分析
* 1、汉字 /^[\u4e00-\u9FA5]$/
* 2、名字长度2-10位
* 3、可能有译名 ·汉字
*/
"尼古拉斯·赵四"
let reg = /^[\u4e00-\u9FA5]{2, 10}(·[\u4e00-\u9FA5]{2,10}){0,2}$/
```

4、验证邮箱
```javascript
/**
*规则分析
* 1、开头数字、字母、下划线一到多位
* 2、开可以是-数字字母下划线  或者.数字字母下划线 ，整体0到多位，但是-/. 不能是连续出现也不能作为开始
* 邮箱的名字由：数字、字母、下划线、‘-’、. 几部分组成
=> @[A-Za-z0-9]+
// 1、@后面紧跟着： 数字、字母（1-多位）

//=> ((\.|-)[A-Za-z0-9]+)*
// 1、 @xxx.com
对@ 后面名字的补充
[@qq.com].cn
// 企业域名 @xxx-xxxx-xxx.com

//=> \.[A-Za-z0-9]+
*/ 1、xxx.com  xxx.cn 这个才是匹配的是最后的域名(.com/.cn/.org/.edu/.net/.vip/.top...)
let reg = /^\w+((\-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
```

5.身份证号码
```javascript
/**
*规则分析
* 1、一共18位
* 2、最后一个可能是X


* 身份证前6位： 省市县 
* 中间8位是年月日
* 最后四位： 
    最后一位 X或者数字
    倒数第二位 偶数是女基数是男
    其余的是经过算法算出来的
*/
// let reg = /^\d{17}(\d|X)$/
//=> 小括号分组的第二个作用： 分组捕获，不仅可以把大正则匹配的信息捕获到，还可以单独捕获到每个小分组的内容
let reg = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{2})(\d)(\d|X)$/
reg.exec('')

```

**正则表达式两种创建方式的区别**
```javascript
let reg = /\\/
reg.test('\\')
// 构造函数因为传递的是字符串，\需要写两个才代表斜杠
let reg2 = /\d+/g,
reg3 = new RegExp('\\d+','g')

// => 把正则表达式中部分内容是变量存储的值
// 1、两斜杠中间包起来的都是元字符(如果正则中要包含某个变量的值，则不能使用字面量方式创建)
let type = 'zhengze';
reg = /^@"+type+"@$/
console.log(reg.test('@zhengze@')) // false
console.log(reg.test('@"""""typeeeee"@')) // true
// 2、这种情况只能使用构造函数的方式（因为它传递的规则是字符串，只有这样才能进行字符串拼接）
reg3 = new RegExp("^@"+type+"@$")
console.log(reg3.test('@zhengze@')) // true

```

**正则捕获**

> 实现正则捕获的办法
- 正则RegExp.prototype上的方法
  - exec
  - test
- 字符串String。prototype上支持正则表达式处理的方法
  - replace
  - match
  - split
....

```javascript
let str = 'zhe2019ngze2020test2021';
let reg = /\d+/;

// => 实现正则捕获的前提是，当前正则要和字符串匹配，如果不匹配捕获的结果是null
/*
* 基于exec实现正则的捕获
* 1、捕获到结果是null或者一个数字
*    数组的第一项本次捕获到的内容
*    其余项： 对应小分组本次单独捕获的内容
*    index： 当前捕获内容在字符串中的起始索引
*    input： 原始字符串
* 2、每执行一次exec只能捕获到一个符合正则规则的，但是默认情况下， 我们执行100遍，获取的结果永远都是第一个匹配到的，其余的捕获不到
*    => “正则捕获的懒惰性”: 默认只捕获第一个
*/
reg.exec(str) // 获取的结果是 数组
```

```javascript
let reg = /\d+/;
/*
* reg.lastIndex : 当前正则下一次匹配的起始索引位置
* 懒惰性捕获的原因： 默认情况下lastIndex的值不会被修改，每一次都是从字符串开始位置查找，所以找到的永远只是第一个

解决办法： 全局修饰符 g
*/
// console.log(reg.lastIndex); // => 0 下面匹配不会的是从str索引0 的位置开始找
// console.log(reg.exec(str))
// console.log(reg.lastIndex); // => 0 第一次捕获完成，lastIndex没有改变，所以下次exec依然是从字符串最开始找，找到的永远都是第一个匹配到的

// console.log(reg.exec(str))
// reg.lastIndex = 11 // 这么改不会生效  手动更改不行
// console.log(reg.lastIndex)
// console.log(reg.exec(str))

let reg = /\d+/g;
 console.log(reg.exec(str))
console.log(reg.lastIndex) //=> 设置全局匹配修饰符g后。lastIndex 会自己修改

null  lastIndex->0 循环


!!!注意  lastIndex  和  g   机制
let reg = /\d+/g;
if(reg.test(str)) {
  // => 验证一下： 只有正则和字符串匹配再捕获
  console.log(reg.lastIndex) // => 11 基于test匹配验证后，lastIndex已经被修改为第一次匹配后的结果，所以下一次捕获不再从头开始了
  // =>
  console.log(reg.exec(stc)) //=> [2020,...]
}

// => 需求： 编写一个方法execAll， 执行一次可以把所有匹配的结果捕获（前提正则一定要设置全局修饰符g）

~function(){
  function execAll(str='') {
    //进来后的第一件事，是验证当前正则是否设置了g，不设置则不能进行循环捕获了
    if(!this.global) return this.exec(str);
    //=> str： 要匹配的字符串
    //=> this： RegExp的实例（当前要操作的正则）
    let arr = [],
    res = this.exec(str) // 存储每一次捕获的内容
    while(res) {
      arr.push(res[0])
      res = this.exec(str)
    }
    return arr.length === 0 ? null : arr;
  }
  RegExp.prototype.execAll = execAll;
}()

let reg = /\d+/g
console.log(reg.execAll(str))
// 字符串中的match 方法，可以在执行一次的情况下，捕获到所有匹配的数据（前提： 正则也是设置g才可以）
"zhe2019ngze2020test2021".match(reg)
```
<font color="red">match 在分组捕获的时候存在问题 ！！！</font>

**正则的分组捕获**
```javascript
// => 身份证号
let str = '123789199101010112'
let reg = /^(\d{6})(\d{4})(\d{2})(\d{2})\d{2}(\d)(?:\d|X)$/;
console.log(reg.exec(str));
console.log(str.match(reg));
// ["123789199101010111", "123789", "1991", "01", "01", "1", index: 0, input: "123789199101010111", groups: undefined]
// => 数组第一项： 大正则匹配的结果
// => 其余项： 每个小分组单独匹配捕获的结果
// => 如果设置了分组(改变优先级)， 但是捕获的时候不需要单独捕获，可以基于?:来处理
```
<font color="red">多次匹配的情况下，match只能把大正则匹配的内容获取到，小分组匹配的信息无法获取</font>

```javascript
// =>既要捕获到{数字}， 也想单独的把数字也获取到, 例如： 第一次找到{0} 还需要单独捕获到 0

// => 不设置g只匹配一次
let str = '{0}年{1}月{2}日'
let reg = /\{(\d+)\}/
console.log(reg.exec(str)) 
console.log(str.match(reg)) 
// ["{0}", "0", ...]
let reg2 = /\{(\d+)\}/g
console.log(reg2.exec(str)) 
console.log(str.match(reg2)) // ["{0}","{1}","{2}"] 多次匹配的情况下，match只能把大正则匹配的内容获取到，小分组匹配的信息无法获取

let aryBig = [],
arySmall = [];
res = reg.exec(str)

while(res) {
  let [big, small] = res
  aryBig.push(big)
  arySmall.push(small)
  res = reg.exec(str)
}
console.log(aryBig, arySmall)
```

```javascript
// =>分组的第三个作用： “分组引用”
let str = "book" ;// => “good" "book" "moon" " foot"

let reg = /^[a-zA-Z]([a-zA-Z])\1[a-zA-Z]$/
// 分组引用就是通过“\数字”让其代表和对应分组出现一模一样的内容
```

正则小括号分组的作用总结：
> - 分组(改变优先级)
> - 分组捕获，不仅可以把大正则匹配的信息捕获到，还可以单独捕获到每个小分组的内容
> - 分组的第三个作用： “分组引用” ： 通过“\数字”让其代表和对应分组出现一模一样的内容

**正则捕获的贪婪性**

<font color="red">取消贪婪性</font>

```javascript
let str = "zhengze2019@2020zhengze";
// => 正则捕获的贪婪性：默认情况下，正则捕获的时候，是按照当前正则所匹配的最长结果来捕获的
let reg = /\d+/g
console.log(str.match(reg));// ["2019", "2020"]
// => 在量词元字符后面设置?  取消捕获的时候贪婪性（按照正则匹配的最短结果来捕获）
reg = /\d+?/g; // 取消贪婪性
console.log(str.match(reg)); ["2","0".....]
```
问号在正则中的五大作用：
- 问号左边是非量词元字符： 本身代表量词元字符，出现零到一次
- 问号左边是量词元字符： 取消捕获时候的贪婪性
- (?: ) 只匹配不捕获
- (?=) 正向预查
- (?!) 负向预查

**其它正则捕获的方法**
1、test也能捕获（test本意是匹配）--> 只是9个分组中的东西
  ```javascript
  let str = "{0}年{1}月{2}日"
  let reg = /\{(\d+)\}/g

  console.log(reg.test(str)) // true
  console.log(RegExp.$1); // "0"

  console.log(reg.test(str)) // true
  console.log(RegExp.$1); // "1"

  console.log(reg.test(str)) // true
  console.log(RegExp.$1); // "2"

  console.log(reg.test(str)) // false
  console.log(RegExp.$1); // "2" 存储的是上一次捕获的结果

  RegExp.$1 ~ RegExp.$9 获取当前本次正则匹配后，第一个到第九个分组的信息
  ``` 

2、replace 字符串中实现替换的方法（一般都是伴随正则一起使用的）
```javascript
let str = "zhengze@2019|zhengze@2020"
// => 把字符串 替换成汉字 正则
// 1、 不用正则，执行一次只能替换一个
str = str.replace('zhengze', "正则")

str = str.replace(/zhengze/g, "正则")

``` 

```javascript
let str = "zhengze@2019|zhengze@2020"
// => 把zhengze 替换 zhengzetest
str = str.replace('zhengze', 'zhengzetest').replace('zhengze', 'zhengzetest')
// zhengzetesttest@2019|zhengze@2020  每一次替换都是从字符串的第一位开始找，（类似正则捕获的懒惰性）

// => 基于正则g 可以实现
str = str.replace(/zhengze/g, 'zhengzetest')

``` 

案例： 把时间字符串进行处理
```javascript
let time = "2020-06-27"
// => “2020年06月27日”

let reg = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
time = time.replace(reg, "$1年$2月$3日")
// 实现原理
// => [str].replace([reg], [function])
// 1、首先拿reg和time 进行匹配捕获，能匹配到几次就会把传递的函数执行几次（而且是匹配一次就执行一次）
// 2、不仅把方法执行，而且，replace还给方法传递了实参信息(和exec捕获的内容一致的信息: 大正则匹配的内容，小分组匹配的信息....)
// 3、在函数中我们返回的是啥就把当前大正则匹配的内容替换成啥
time = time.replace(reg, (big, $1, $2, $3) => {
  return   $1 + "年" + $2 + "月" + $3 + "日"
})

time = time.replace(reg, (...args) => {
  let [, $1, $2, $3] = args;
  $2.length < 2? $2 = "0" + $2:null
  $3.length < 2? $3 = "0" + $3:null
  return   $1 + "年" + $2 + "月" + $3 + "日"
})
```

单词首字母大写
```javascript
let str = 'good book study, day day up!';

let reg = /\b([a-zA-Z])[a-zA-Z]*\b/g;
//  函数被执行了6次
// 每一次的args ['good', 'g'] ....
str = str.replace(reg, (...args)=> {
   let [content, $1] = args
   $1 = $1.toUpperCase()
   content = content.slice(1)
   return $1 + content;
})
```


```javascript
let str = '这是个测试的文本';
// 把文本“测试” ---> 123测试123

str = str.replace(/测试/, "123$&123")
console.log(str)
```

**断言**
- (?= 正向预查）
正则匹配的后边是什么

```javascript
let str = '这是个测试的文本';
let reg = /是个(?=测试)/g;
str = str.replace(reg, '123') // 对当前匹配到的是个  进行操作
```

```javascript
// 把金额都转成xxx.00 格式
let lessons = `
  js, 200元, 300次
  php, 300.00元，100次
  node.js, 180元， 290次
`
let reg = /(\d+)(.00)?(?=元)/gi;
lessons = lessons.replace(reg, (v, args) => {
  args[1] = args[1] || '.00'
  return args.splice(0,2).join("")
})
```

- (?<= 反向肯定预查)
正则匹配的前边是什么 

```html
<main>
  <a href="https://baidu.com"> 百度 </a>
  <a href="https://Google.com"> 谷歌</a>
<main>
<script>
const main = document.querySelect('main')
let reg = /(?<=href['"]).+(?=\1)/gi
console.log(main.match(reg)) // ['https://baidu.com', '"'....]
</script>
```

- (?! 正向否定预查)
```javascript
let str = 'zhengze2020test'
let reg = /[a-z]+(?!\d+)$/i
str.match(reg) ['test', .....]
```

- (?<! 反向否定预查)
```javascript
let str = 'zhengze2020test'
let reg = /(?<!\d+)[a-z]+/i;
let reg2 = /(?<!\d+).+/i;
str.match(reg) ['zhengze', .....]
str.match(reg2) ["zhengze2020test", ....]
```

命名
```javascript
// 反向引用的命名
let str = 'taobao taobao, home home'
let reg = /\b(\w+)\b\s+\1\b/; // \1 -> (\w+)
let reg2 = /\b(?<Word>\w+)\b\s+\k<Word>\b/ // \k<Word> -> (\w+)

```
