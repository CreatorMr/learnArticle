
### 从URL地址到页面渲染完成，发生了什么.js
 

1、DNS解析： 将域名地址解为IP地址

 - 浏览器DNS缓存 
 - 系统DNS缓存
 - 路由DNS缓存
 - 网路运营商DNS缓存
 - 递归搜索： www.baidu.com 
   - .
   - .com
   - .baidu
   - .www
  
2、TCP 连接，三次握手
- 第一次握手，有浏览器泛起，告诉服务器我要发送请求了
- 第二次握手，有服务器发起，告诉浏览器我准备接受了，你赶紧发吧
- 第三次握手， 由浏览器发送，告诉服务器，我马上就发了，准备接受吧


3、发送请求
- 请求报文： HTTP协议的通信

4、 接受响应
- 响应报文
5、渲染页面
-  遇见HTML标记，浏览器调用HTML解析器解析  ， 构建DOM树等
- 遇到 style/link 标记，浏览器调用CSS 解析器，cssom 树
- 遇到script标记，JavaScript解析器
- DOM树和CSSOM树合并一个渲染树
- 计算布局
- 绘制


6、断开连接， 四次挥手
