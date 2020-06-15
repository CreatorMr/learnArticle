# koa+mongodb+vue 博客demo

### 背景：
1、之前项目开发中使用的thinkJs。像通过使用koa学习了解中间件的流程控制(洋葱模型)。
2、mysql 关系型数据库，数据的关联性非常强。mongodb 是文档型 ，没有表的概念，不用设计“表”等数据库。
      使用mysql的时候，设计表关系，画模型图。mongo直接 上JSON 。不想画表模型，没用过想用mongo (ps: 我写我说得算)
3、练手， 自己管理文档的地方，东放西放，写的记不住，也找不到了(复习“书丢了”)。
### 项目简介
这是练手项目，从0-1，从前到后的博客demo，模块，首页，文章、分类、标签、个人中心等。
    服务端使用koa,学习中间件的流程控制，数据库使用mongodb 了解文档型数据库，vue 中使用了部分ts，在项目中没有实际应用过，借此学习使用。

功能点： 

1、首页 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;swiper 功能点入口 。。。
2、文章
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;展示标签云，按标签过滤，按关键字(title, 描述)等搜索，分页。。。。
3、文章详情
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;查看详情，使用markdown形式展示，管理员身份可编辑创建，暂时只支持留言功能。。。
        创建、编辑文章、图片上传服务器
4、分类列表
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 分类展示，按分类过滤。。。。
5、标签列表
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 按标签过滤，新增标签。。。。
6、项目部署
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;使用pm2 部署 
        脚本部署version1 ，version2
    ........
TODO 
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;美化页面、评论回复，登录加密，评论发送邮件。。。

### Let`s Go
先来两个tree
    server:
```
    .
    ├── README.md
    ├── app.js
    ├── build
    │   ├── app.js
    │   ├── ecosystem.config.js
    │   ├── package-lock.json
    │   └── package.json
    ├── deploy.js
    ├── deploy.sh
    ├── deploy_dist.sh
    ├── ecosystem.config.js
    ├── package-lock.json
    ├── package.json
    ├── src
    │   ├── config
    │   │   └── db.js
    │   ├── controllers
    │   │   ├── article.js
    │   │   ├── category.js
    │   │   ├── email.js
    │   │   ├── login_user.js
    │   │   ├── tags.js
    │   │   └── uploadImg.js
    │   ├── middleware
    │   │   └── check_login.js
    │   ├── models
    │   │   ├── article
    │   │   └── user
    │   ├── public
    │   │   ├── img
    │   │   └── q.js
    │   ├── routes
    │   │   ├── admin.js
    │   │   ├── uploadImg.js
    │   │   └── user.js
    │   └── utils
    │       └── sendEmail.js
    └── webpack.config.js
```
fe: 
```
    .
    ├── README.md
    ├── babel.config.js
    ├── deploy.js
    ├── deploy.sh
    ├── deploy_dist.sh
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.js
    ├── public
    │   ├── favicon.ico
    │   └── index.html
    ├── src
    │   ├── App.vue
    │   ├── api
    │   │   ├── article.js
    │   │   ├── http.js
    │   │   ├── uploadImg.js
    │   │   └── user.js
    │   ├── assets
    │   │   ├── bg.jpg
    │   │   ├── github.jpeg
    │   │   ├── logo.jpg
    │   │   ├── logo.png
    │   │   ├── me.jpg
    │   │   ├── timg.jpeg
    │   │   └── timg2.jpeg
    │   ├── components
    │   │   ├── Footer.vue
    │   │   ├── Header.vue
    │   │   ├── Markdown.vue
    │   │   ├── Planet.vue
    │   │   ├── Register_Login.vue
    │   │   ├── Slider.vue
    │   │   ├── swiper-slide.vue
    │   │   └── test.md
    │   ├── main.ts
    │   ├── readme.md
    │   ├── router
    │   │   └── index.ts
    │   ├── shims-tsx.d.ts
    │   ├── shims-vue.d.ts
    │   ├── store
    │   │   └── index.ts
    │   ├── themes
    │   ├── utils
    │   │   ├── rem.js
    │   │   ├── sakura.js
    │   │   └── utils.js
    │   └── views
    │       ├── About.vue
    │       ├── Article.vue
    │       ├── Category.vue
    │       ├── Home.vue
    │       ├── Tags.vue
    │       ├── articleDetail.vue
    │       └── timeline.vue
    ├── tests
    │   └── unit
    │       └── example.spec.ts
    ├── tsconfig.json
    ├── vue.config.js
    ├── yarn-error.log
    └── yarn.lock
```

 一、数据库
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; MongoDB不支持事务操作，所以需要用到事务的应用建议不用MongoDB，另外MongoDB目前不支持join操作，需要复杂查询的应用也不建议使用MongoDB。

创建链接

```
    // mongo 自身的链接方式
    const MongoClient = require('mongodb').MongoClient
    const url = "mongodb://localhost:27017/"
    module.exports = function() {
        MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
            if (err) throw err;
            console.log("数据库已创建!");
            if (err) throw err;
            var dbo = db.db("runoob");
            var myobj = { name: "菜鸟教程", url: "www.runoob" };
            dbo.collection("site").insertOne(myobj, function(err, res) {
                if (err) throw err;
                console.log("文档插入成功");
                db.close();
            });
        });
    }
```

```
    // 使用 mongoose 的链接方式  这里推荐使用  mongoose 操作更加友好。
    const mongoose = require('mongoose')
    const autoIncrement = require('mongoose-auto-increment')
    module.exports = function() {
    mongoose.connect("mongodb://localhost:27017/blog", { keepAlive: 120 })
        // 自增 ID 初始化
        autoIncrement.initialize(mongoose.connection)
    return mongoose.connection
    }
```
<font color=red>这里有个坑，在使用mongoose 使用，schema 是不能重复定义的，在使用设置自增字段的时候只能初始化一次</font>

```
    // 在app中单独定义一个user 的 model挂在全局 在自定义的中间件中使用
    global.dbUser = db.model("users",{
        email: String,
        password: String,
        nick_name:  { type: String, default: "长江7号" },
        avatar: String,
        status: { type: String, default: "normal" },
        createTime: { type: Date, default: Date.now },
        updateTIme: { type: Date, default: Date.now }
    })
```

mongoose 操作model 
    Func：save()、query()、queryById()...
    不用创建表，只要定义好schema就行，创建好数据库，“表” =》 集合(collection) 会根据schema自动以复数形式创建，也可手动创建。
    这里举个例子
```
    // 文章内容
        {
            _id: ObjectId("xxxxx")
            title: '',
            desc: '',
            // 或者这里可能需要多个标签， 在创建文章的时候选择两个标签
            tags:["ObjectId-tags1"],
            category: []
            <!-- ... -->
        }
        //在操作model方法获取文章内容的时候直接可以通过populate 
        return {
            _id: ObjectId("xxxxx")
            title: '',
            desc: '',
            tags:[{
                name: '',
                // ....
            }],
            category: []
        } 
```
```
        // eq:
        query (conditions = {}, fields= {} , options = {}) {
            return this.model.find(conditions, fields, options)
            .populate(
                [{ path: 'tags'},{ path: 'category' },{path: 'comments'}]
            )
            .exec()
        }
```
```

        // tag schema
        {
            // 当创建的时候会自动生成 _id: ObjectId("xxxxx")
            name: { type: String, required: true, validate: /\S+/ },
            desc: String, // 标签描述
            icon: String,
            create_time: { type: Date, default: Date.now },	
        }

```

二  服务端
koa 中间件流程控制 koa 本身没有捆绑任何中间件，一直在使用中间件
```
// eq:
class Koa {
  constructor(options) {
    options = options || {}
    this.middleware = [];
  }
  use(fn) {
    this.middleware.push(fn)
    return this
  }
  listen(...args) {
    http.createServer(function(req, res){
      res.writeHead(200, {'Content-type' : 'text/html'});
      res.write('<h1>Node.js</h1>');
      res.end('<p>Hello World</p>');
      console.log('server start ....')
     }).listen(...args);
  }

  callback() { // 处理具体的请求和相应

  }

  handleRequest() {

  }
  respond() {

  }

  createContext(req, res) {

  }

const app = new Koa();

app.use(middlewareA)
app.use(middlewareB)
app.use(middlewareC)


function middlewareA(ctx, next) {
    return this;
}

```
这里面使用了几个重要的模块
koa-static 静态资源
koa-onerror 错误处理
koa-router/koa-mount 路由
koa-bodyparser post 请求解析参数
koa-logger 日志
coa2-cors 跨域处理
koa-cookie cookie
koa-body  解析上传文件的插件 在markdown中插入图片直接上传到node 服务器上。

a
 入口app.js，初始化数据，数据库建立链接，初始化路由等 

 model 下 定义操作数据的方法和 schema
    ├── models
    │   │   ├── article
    │   │   └── user
                ├── index.js
                └── schema.js
   
 controllers 下 处理逻辑
 ```
    // 获取所有文章
    const getAll = async (ctx, next) => {
    // const param = ctx.request.query.param
    // const query = typeof param === 'string' ? JSON.parse(param) : param
    const query = ctx.request.query

    const pageNum = query && query.pageNum,
            pageSize = query && query.pageSize || 20,
            articleId = query && query.articleId,
            tag_id = query && query.tag_id,
            category_id = query && query.category_id,
            keyword = query && query.keyword || null,
            state = query && query.state;
    const token = ctx.request.headers.token || '';

    

    const fields = {
        title: 1,
        author: 1,
        keyword: 1,
        desc: 1,
        img_url: 1,
        tags: 1,
        category: 1,
        comments: 1,
        like_users: 1,
        meta: 1,
        createTime: 1,
        updateTime: 1,
    };
    let conditions = {};
    let options = {};
    let skip =0 ;
    if (keyword) {
        const reg = new RegExp(keyword, 'i');
        conditions = {
        $and: [
            { $or: [{ state: state }] },
            {
            $or: [
                { title: { $regex: reg } },
                { desc: { $regex: reg } }
            ],
            }
        ],
        };
    }
    if(pageNum){
        skip = pageNum - 1 < 0 ? 0 : (pageNum - 1) * pageSize;
    }
    options = {
        skip,
        limit: pageSize - 0,//,
        sort: { createTime: -1 }
    }
    let res
    let count = 0
    if(articleId) {
        res = await article.queryById({_id:articleId})
    } else {
        if(tag_id) {
        conditions =  { ...conditions, tags: {_id: tag_id}}
        }
        if(category_id) {
        conditions =  { ...conditions, category: {_id: category_id}}

        }
        count = await article.query(conditions, fields, {  sort: { createTime: -1 } })
        res = await article.query(conditions, fields, options)
    }
    ctx.body = {
        data: res,
        count: count.length
    }
    }
 ```

utils 中第三方方法  
使用 nodemailer 用来发送邮件 当留言，评论等 使用邮件统计，已经调通，配置授权码即可

部署
使用pm2 部署服务端 启动 。(pm2 直接部署的文件自动生成三个文件 current share source 源码部署到服务器上)

使用shell部署，将打包好的文件推送服务器上并重启

在使用webpack 对node进行打包的时候设置target:node 
同时注意设置以下部分，否则静态资源无法访问 
```
node: {
    __dirname: false
}
// options
// true: The dirname of the input file relative to the context option.
// false: The regular Node.js __dirname behavior. The dirname of the output file when run in a Node.js environment.
//'mock': The fixed value '/'.
```

```
#!/bin/bash
echo "开始部署!"

user=$1
host=$2
pwd=$3

# -e 开启转义 -c 不换行
# echo "It is a test" > myfile

for i in "$*"; do
    echo "参数列表 $i"
done


:<<EOF
1、spawn：启动命令
2、expect：等待来自进程的特定的字符串
3、send：发送字符串到进程
4、interact：允许用户交互
EOF

if [ -n "$3" ]; then

commit=$(git status | grep -e "nothing to commit, working tree clean" -e "nothing added to commit")

if [ ! "$commit" ]; 
then
 echo "本地还有未提交的代码，请先提交"
 exit;
fi

push=$(git status | grep -e "Your branch is up")
echo "$push"
if [ ! "$push" ]; then
 echo "本地还有未push的代码，请先push"
 exit;
fi


npm run build

# 登录服务器
expect -c "
  spawn rsync -raqpPLv build $1@$2:/data/app/koa_mongo_vue_server/
  expect {
          \"*assword\" {send \"$3\r\";}
          \"yes/no\" {send \"yes\r\"; exp_continue;}
  }
  expect \"EOF\"
  spawn ssh -p 22 $1@$2
  expect {
    \"yes/no\" { send \"yes\r\"; exp_continue }
    \"assword\" { send \"$3\r\" }
  }
  expect \"*]\#*\" { send \"cd /data/app/koa_mongo_vue_server/build/\r\" }
  expect \"*]\#*\" { send \"npm install\r\" }
  expect \"*]\#*\" { send \"pm2 start ecosystem.config.js\r\" }
  
  interact"
  
echo "部署成功"
exit;
else 
 echo "缺少密码"
 exit;
fi
```   


三 前端

使用vue-cli选择ts 生成项目，默认没有vue.config.js。。。
将md-text-loader 配置进去在本地编写或者引入使用/
文章列表页面，根据标签过滤，关键字搜索，分页，详情功能。
![1591605651585.jpg](http://106.53.236.144:3000/img/1591605651585.jpg)

详情页面，点击留言判断登录，管理员身份可编辑当前文章，或者创建新文章。

分类列表和标签列表，点击过滤，标签可以新增。、、
```
<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  Watch
} from 'vue-property-decorator';
import {
  Route
} from "vue-router";

import {
  getList
} from "../api/article.js"
@Component
export default class Article extends Vue {
  articleList: Array < [] > = []
  private tag_name = '';
  private total = 0
  private params = {
    keyword: "",
    likes: "", // 是否是热门文章
    state: 1, // 文章发布状态 => 0 草稿，1 已发布,'' 代表所有文章
    tag_id: '',
    category_id: '',
    pageNum: 1,
    pageSize: 10
  };
  async getArticleList() {
    const res = await getList(this.params)
    this.articleList = res.data
    this.total = res.count
  }
  mounted() {
    // this.$route.query
    this.routeChange(this.$route, this.$route);
    this.getArticleList()
  }

  @Watch("$route")
  routeChange(val: Route): void {
    // 处理 获取链接上的tag_name tag_id category_id 等
    const {
      tag_id = '', tag_name = '', category_id = ''
    } = val.query
    this.tag_name = tag_name;
    this.params.tag_id = tag_id;
    this.params.category_id = category_id;
    this.articleList = [];
    this.params.pageNum = 1;
    this.getArticleList();
  }
}
</script>
```

四 部署服务

1、使用体验版的腾讯元，机器时间不足3个月域名不能备案

2、安装基本工具
安装git node pm2 】
```
mkdir /data/app -p 
yum install wget
yum install git
```
安装node 
```
wegt https://nodejs.org/dist/v12.17.0/node-v12.17.0-linux-x64.tar.xz
tar -zvf node-v12.17.0-linux-x64.tar.xz
mv node-v12.17.0-linux-x64 nodejs
```
配置环境变量 /etc/profile

安装数据库
```
curl -O https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.0.6.tgz
tar -zxvf mongodb-linux-x86_64-3.0.6.tgz
mv  mongodb-linux-x86_64-3.0.6/ /usr/local/mongodb
```
配置环境变量 /etc/profile
```
./mongo  //执行操作数据库命令
./mongod // 启动数据库
```

安装nginx
```
wget -c https://nginx.org/download/nginx-1.11.6.tar.gz
yum install gcc-c++
yum install -y pcre pcre-devel
yum install -y zlib zlib-devel
yum install -y openssl openssl-devel

```
配置nginx
```
        listen       80;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   /data/app/koa_mongo_vue_fe/dist;
            index  index.html index.htm;
            try_files $uri $uri/ /index.html;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

       
        location /api/ {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-Nginx-Proxy true;
        proxy_set_header Connection "";
        proxy_pass http://127.0.0.1:3000/;
        proxy_redirect default;
    }
```
使用nohup ./mongod &  守护进程启动

博客地址 [传送门](http://106.53.236.144/)
server地址 [传送门](https://github.com/CreatorMr/koa_mongo_vue_server)
client地址 [传送门](https://github.com/CreatorMr/koa_mongo_vue_fe)

koa [文档](https://koa.bootcss.com/)
koa [中文文档](https://www.itying.com/koa/article-index-id-82.html)
mongoose [文档](http://www.mongoosejs.net/docs/queries.html)
Node.js MongoDB Driver API [链接](http://mongodb.github.io/node-mongodb-native/2.2/api/MongoClient.html#connect)