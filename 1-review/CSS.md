### 八种清除浮动学习
* 父级div 定义 height ： **不推荐使用，只建议高度固定的布局时使用**
* 结尾处添加空div标签clear：both ：**添加一个空div，利用css提高的clear:both清除浮动，让父级div能自动获取到高度，不推荐使用，但此方法是以前主要使用的一种清除浮动方法**
* 父级div定义 伪类:after 和 zoom ：**推荐使用，建议定义公共类，以减少CSS代码**
* 父级div定义 overflow:hidden：**只推荐没有使用position或对overflow:hidden理解比较深的朋友使用**
* 父级div定义 overflow:aut：**不推荐使用**
* 父级div 也一起浮动：**不推荐使用**
* 父级div定义 display:table：**不推荐使用**
* 结尾处加 br标签 clear:both：**不推荐使用**

![a](https://upload-images.jianshu.io/upload_images/5696131-cbd99d35bd621bdf.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**1、父级div 定义 height**
* 原理：父级div手动定义height，就解决了父级div无法自动获取到高度的问题。
* 优点：简单、代码少、容易掌握
* 缺点：只适合高度固定的布局，要给出精确的高度，如果高度和父级div不一样时，会产生问题
* 建议：不推荐使用，只建议高度固定的布局时使用
```html
<div calss="div11">
  <div class="left1">left1</div>
  <div class="right1">right</div>
</div>
<div class="div21">div21</div>
<style>
  .div11{
    background: #000080;
    border: 1px solid red;
    /* 清除浮动 */
    height: 200px
  }
  .div21{
    background: #808080;
    border: 1px solid red;
    height: 100px;
    margin-top: 10px
  }
  .left1{
    float: left;
    width: 20%;
    height: 200px;
    background: #DDD;
  }
  .right1{
    float: right;
    width: 30%;
    height: 80px;
    background: #DDD;
  }
</style>
```
**2、结尾处添加空div标签clear：both**
* 原理：添加一个空div，利用css提高的clear:both清除浮动，让父级div能自动获取到高度
* 优点：简单、代码少、浏览器支持好、不容易出现怪问题
* 缺点：不少初学者不理解原理；如果页面浮动布局多，就要增加很多空div，让人感觉很不好
* 建议：不推荐使用，但此方法是以前主要使用的一种清除浮动方法
```html
<div calss="div12">
  <div class="left2">left2</div>
  <div class="right2">right2</div>
  <div class="clearFloat2">right2</div>
</div>
<div class="div22">div22</div>
<style>
  .div12{
    background: #000080;
    border: 1px solid red;
  }
  .div22{
    background: #808080;
    border: 1px solid red;
    height: 100px;
    margin-top: 10px
  }
  .left2{
    float: left;
    width: 20%;
    height: 200px;
    background: #DDD;
  }
  .right2{
    float: right;
    width: 30%;
    height: 80px;
    background: #DDD;
  }
  /* 清除 */
  .clearFloat2{
    clear: both;
  }
</style>
```
**3、父级div定义 伪类:after 和 zoom**
zoom: 1避免元素高度崩塌
* 原理：IE8以上和非IE浏览器才支持:after，原理和方法2有点类似，zoom(IE转有属性)可解决ie6,ie7浮动问题
* 优点：浏览器支持好、不容易出现怪问题（目前：大型网站都有使用，如：腾迅，网易，新浪等等）
* 缺点：代码多、不少初学者不理解原理，要两句代码结合使用才能让主流浏览器都支持。
* 建议：推荐使用，建议定义公共类，以减少CSS代码。
```html
<div calss="div13 clearFloat3">
  <div class="left3">left3</div>
  <div class="right3">right3</div>
</div>
<div class="div23">div23</div>
<style>
  .div13{
    background: #000080;
    border: 1px solid red;
  }
  .div23{
    background: #808080;
    border: 1px solid red;
    height: 100px;
    margin-top: 10px
  }
  .left3{
    float: left;
    width: 20%;
    height: 200px;
    background: #DDD;
  }
  .right3{
    float: right;
    width: 30%;
    height: 80px;
    background: #DDD;
  }
  /* 清除 */
  .clearFloat3{
    zoom: 1
  }
  .clearFloat3:after{
    display: block;
    clear: both;
    content: '';
    visibility: hidden;
    height: 0
  }
</style>
```
**4、父级div定义 overflow:hidden**
* 原理：必须定义width或zoom:1，同时不能定义height，使用overflow:hidden时，浏览器会自动检查浮动区域的高度
* 优点：简单、代码少、浏览器支持好
* 缺点：不能和position配合使用，因为超出的尺寸的会被隐藏。
* 建议：只推荐没有使用position或对overflow:hidden理解比较深的朋友使用。
```html
<div calss="div14">
  <div class="left4">left4</div>
  <div class="right4">right4</div>
</div>
<div class="div24">div24</div>
<style>
  .div14{
    background: #000080;
    border: 1px solid red;
    /* 清除 */
    width: 98%;
    overflow:hidden;
  }
  .div24{
    background: #808080;
    border: 1px solid red;
    height: 100px;
    margin-top: 10px
  }
  .left4{
    float: left;
    width: 20%;
    height: 200px;
    background: #DDD;
  }
  .right4{
    float: right;
    width: 30%;
    height: 80px;
    background: #DDD;
  }
</style>
```
**5、父级div定义 overflow:auto**
* 原理：必须定义width或zoom:1，同时不能定义height，使用overflow:auto时，浏览器会自动检查浮动区域的高度
* 优点：简单、代码少、浏览器支持好
* 缺点：内部宽高超过父级div时，会出现滚动条。
* 建议：不推荐使用，如果你需要出现滚动条或者确保你的代码不会出现滚动条就使用吧。
```html
<div calss="div15">
  <div class="left5">left5</div>
  <div class="right5">right5</div>
</div>
<div class="div25">div25</div>
<style>
  .div15{
    background: #000080;
    border: 1px solid red;
    /* 清除 */
    width: 98%;
    overflow:auto;
  }
  .div25{
    background: #808080;
    border: 1px solid red;
    height: 100px;
    margin-top: 10px
  }
  .left5{
    float: left;
    width: 20%;
    height: 200px;
    background: #DDD;
  }
  .right5{
    float: right;
    width: 30%;
    height: 80px;
    background: #DDD;
  }
</style>
```
**6、父级div 也一起浮动**
* 原理：所有代码一起浮动，就变成了一个整体优点：
* 没有优点
* 缺点：会产生新的浮动问题。
* 建议：不推荐使用，只作了解。
```html
<div calss="div16">
  <div class="left6">left6</div>
  <div class="right6">right6</div>
</div>
<div class="div26">div26</div>
<style>
  .div16{
    background: #000080;
    border: 1px solid red;
    /*  */
    width: 98%;
    margin-bottom: 10px;
    float: left;
  }
  .div26{
    background: #808080;
    border: 1px solid red;
    height: 100px;
    margin-top: 10px
  }
  .left6{
    float: left;
    width: 20%;
    height: 200px;
    background: #DDD;
  }
  .right6{
    float: right;
    width: 30%;
    height: 80px;
    background: #DDD;
  }
</style>
```
**7、父级div定义 display:table**
* 原理：将div属性变成表格
* 优点：没有优点
* 缺点：会产生新的未知问题。
* 建议：不推荐使用，只作了解
```html
<div calss="div17">
  <div class="left7">left7</div>
  <div class="right7">right7</div>
</div>
<div class="div27">div27</div>
<style>
  .div17{
    background: #000080;
    border: 1px solid red;
    /*  */
    width: 98%;
    display: table;
    margin-bottom: 10px;
  }
  .div27{
    background: #808080;
    border: 1px solid red;
    height: 100px;
    margin-top: 10px
  }
  .left7{
    float: left;
    width: 20%;
    height: 200px;
    background: #DDD;
  }
  .right7{
    float: right;
    width: 30%;
    height: 80px;
    background: #DDD;
  }
</style>
```
**8、结尾处加 br标签 clear:both**
* 原理：父级div定义zoom:1来解决IE浮动问题，结尾处加 br标签 clear:both
* 建议：不推荐使用，只作了解。
```html
<div calss="div18">
  <div class="left8">left8</div>
  <div class="right8">right8</div>
  <br class="clearFloat8" />
</div>
<div class="div28">div28</div>
<style>
  .div18{
    background: #000080;
    border: 1px solid red;
    margin-bottom: 10px;
    zoom: 1
  }
  .div28{
    background: #808080;
    border: 1px solid red;
    height: 100px;
    margin-top: 10px
  }
  .left8{
    float: left;
    width: 20%;
    height: 200px;
    background: #DDD;
  }
  .right8{
    float: right;
    width: 30%;
    height: 80px;
    background: #DDD;
  }
  .clearFloat2{
    clear: both;
  }
</style>
```



### 7中两列定宽中间自适应三列布局

```
<!DOCTYPE html>
<html>
<head>
	<title>两列定宽中间自适应布局</title>
	<meta charset="utf-8">
</head>
<body>
<h1>1、流体布局</h1>

<div class="left"></div>
<div class="right"></div>
<div class="center"></div>

<style type="text/css">

	.left{
		width: 200px;
		height: 100px;
		background-color: red;
		float: left;

	}
	.right{
		width: 100px;
		height: 100px;
		background-color: green;
		float: right;
	}
	.center{
		height: 100px;
		background-color: yellow;
		margin-left: 200px;
		margin-right: 100px;
	}
</style>
<h1>2、BFC三栏布局</h1>
<p>BFC规则，BFC区域不会与浮动元素重叠，利用这一点进行三列布局</p>
<p>
	触发条件：
		1、body 根元素
		2、浮动元素：float 除 none 以外的值
		3、绝对定位元素：position (absolute、fixed)
		4、display 为 inline-block、table-cells、flex
		5、overflow 除了 visible 以外的值 (hidden、auto、scroll)
</p>
<div class="BFCleft"></div>
<div class="BFCright"></div>
<div class="BFCcenter"></div>
<style type="text/css">
	.BFCleft{
		width: 300px;
		height: 200px;
		background-color: blue;
		float: left;
		margin-right: 10px;

	}
	.BFCright{
		width: 300px;
		height: 200px;
		float: right;
		background-color: yellow;
		margin-left: 10px;
	}
	.BFCcenter{
		height: 200px;
		background-color: green;
		overflow: hidden;
	}
</style>
<h1>3、双飞翼布局SFY</h1>
<p>利用的是浮动元素 margin 负值的应用</p>
<div class="container">
	<div class="SFYcenter"></div>
</div>
<div class="SFYleft"></div>
<div class="SFYright"></div>
<style type="text/css">
	.container{
		width: 100%;
		float: left;
	}
	.SFYcenter{
		height: 100px;
		background-color: red;
		margin-left: 210px;
		margin-right: 110px;
	}
	.SFYleft{
		float: left;
		width: 200px;
		height: 100px;
		background-color: green;
		margin-left: -100%;

	}
	.SFYright{
		float: right;
		width: 100px;
		height: 100px;
		background-color: blue;
		margin-left: -200px;
	}
</style>
<h1>4、圣杯布局SB</h1>
<p>圣杯布局有包裹div且全部左浮动</p>
<div class="wrap">
	<div class="SBcenter"></div>
	<div class="SBleft"></div>
	<div class="SBright"></div>
</div>
<style type="text/css">
	.wrap{
		margin-left: 120px;
		margin-right: 220px;
	}
	.SBcenter{
		float: left;
		height: 100px;
		background-color: blue;
		width: 100%;/*才会展示出来*/
	}
	.SBleft{
		float: left;
	    width: 100px;
	    height: 100px;
	    background-color: yellow;
	    margin-left: -100%;
	    position: relative;
	    left: -120px;

	}
	.SBright{
		float: left;
		width: 200px;
		height: 100px;
		background-color: red;
		margin-left: -200px;
		position: relative;
		right: -220px;
		
	}
</style>
<div style="clear: both;"></div>
<h1>5、Flex布局</h1>
<div class="FlexWrap">
	<div class="Flexcenter"></div>
	<div class="Flexleft"></div>
	<div class="Flexright"></div>
</div>
<style type="text/css">
	.FlexWrap{
		display: flex;
	}
	.Flexcenter{
		flex-grow: 1;
		height: 100px;
		background-color: blue;
	}
	.Flexleft{
		order: -1;
		flex: 0 1 200px;
		background-color: red;
		height: 100px;
		margin-right: 10px;

	}
	.Flexright{
		flex: 0 1 100px;
		background-color: green;
		height: 100px;
		margin-left: 10px;
	}
</style>
<h1>6、绝对定位布局position: absolute</h1>
<div class="PAWrap">
	<div class="PAcenter"></div>
	<div class="PAleft"></div>
	<div class="PAright"></div>
</div>
<style type="text/css">
	.PAWrap{
		position: relative;
	}
	.PAcenter{
		height: 200px;
		margin: 0 160px 0 210px;
		background-color: red;
	}
	.PAleft{
		width: 200px;
	    height: 200px;
	    background-color: yellow;
	    position: absolute;
	    left: 0;
	    top: 0;
	}
	.PAright{
		width: 150px;
	    height: 200px;
	    background-color: green;
	    position: absolute;
	    top: 0;
	    right: 0;
	}
</style>

<h3>7、table布局</h3>
<div id="tablewrap">
   <div id="left_table"></div>
    <div id="tablexmain"></div>
   <div id="right_table"></div>
</div>
<style type="text/css">
   #tablewrap{
   	display: table;
   	width:100%;
   }
   #tablemain,#left_table,#right_table{
   	display: table-cell;
   }
   #tablexmain{
     background-color: blue;
     height: 300px;
   }
   #left_table{
   	height: 300px;
   	width: 200px;
   	background-color: red;
   }
   #right_table{
   	height: 300px;
   	width: 100px;
   	background-color: green;
   }
   /*缺点无法设置栏间距*/
</style>
</body>
 
</html>
```