### npm 搭建私服


* 付费购买
* 使用 git+ssh 这种方式直接引用到 GitHub 项目地址 (不能更新即 npm update，不能使用 semver（语义化版本规范）)
* 使用Sinopia/Verdaccio
* 使用cnpmjs.org


### 使用Sinopia

```javascript
npm install -g sinopia
// 启动  // 默认4873
sinopia
```

设置从别的机器上也能访问sinopia仓库
```javascript
// 修改启动sinopia 时候  config file 添加 
listen: 0.0.0.0:4873
```

添加私有仓库
```javascript
nrm add mynpm http://地址:端口
//add registry mynpm success

```

使用私有仓库
```javascript
nrm use mynpm

//Registry has been set to: http://地址
```


本地配置

创建好私有库，将源设置到本地
```javascript
nrm ls
nrm add sinopia http://地址
nrm ls
nrm use sinopia
```


添加用户
```javascript
npm adduser
```
登录
```javascript
npm login
```

设置@xxx 源地址

```javascript
npm config set @xxx:registry npm源库地址
```

发布包

在本地创建项目初始化
```javascript
mkdir scaffold
cd scaffold

```

npm发布scope库
* 直接修改package.json 中的name属性 @xxx/your-name   或者使用 以下 npm init 
```javascript
npm init --scope=xxx

//编写项目发布
npm publish

// 撤销回到上一个版本
npm unpublish your-name

// 撤销npm库中的包
npm unpublish your-name --force

```

使用


全局安装
```javascript
npm install your-name -g
```

eq:  安装完成使用 myscaff
myscaff init // 创建工程项目
muyscff dev // 通过脚手架  webpack服务端启动
```javascript
{
  "name": "@xxx/my-scaffold",
  "version": "1.0.5",
  "description": "",
  "main": "index.js",
  "bin": {
    "myscaff": "./bin/scaffold.js"
  }
  ...
}
```



注：使用verdaccio替换sinopia
sinopia 10月4号 已经停止更新了
verdaccio 是sinopia 的一种web(react实现的)，sinopia的一个分支

使用verdaccio搭建

* Linux服务器 
* 配置环境
  * yum install -y wget
  * wget node...
  * npm i verdaccio -g
  * npm i pm2 -g
  * 安装nginx并配置
```javascript
server {
  listen       80;
  server_name  registry.npm.your.server;
  location / {
    proxy_pass    http://127.0.0.1:4873/;
    proxy_set_header        Host $host;
  }
}
```
使用基本相同