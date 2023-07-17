# 背景

由于近期要开始"移动运营助手" 小程序与兜便利小程序打通需求，需要快速搭建小程序项目。taro-cli 本身已经能快速建立一个小程序项目，但是还不能完全满足我们的需求；没有一直在使用的工具方法、组件库等。为了更好的快速实施，创建一个包含基本的工具函数的封装，请求封装、依赖组件库等都包含在内；搭建完成配置 APPID 可直接开发需求。故而，saas-taro 就诞生了。

### 先来提下用了哪些包

-   [commander](https://www.npmjs.com/package/commander) - 命令行解决方案
-   [inquirer](https://www.npmjs.com/package/inquirer) - 一组常见的交互式命令行用户界面
-   [ora](https://www.npmjs.com/package/ora) - 优雅的终端旋转器
-   [chalk](https://www.npmjs.com/package/chalk) - 修改控制台中字符串的样式
-   [child_process](https://www.npmjs.com/package/child_process) - 执行命令行命令
-   [shelljs](https://www.npmjs.com/package/shelljs) - Shelljs 是 Node.js 下的脚本语言解析器
-   [log-symbols](https://www.npmjs.com/package/log-symbols) 各种日志级别的彩色符号
-   [download-git-repo](https://www.npmjs.com/package/download-git-repo) - 从远程下载一个资源库
-   [Handlebars](https://www.npmjs.com/package/Handlebars) - 是一种简单的 模板语言。
-   [package-json](https://www.npmjs.com/package/package-json) - 从 npm 注册表中获取包的元数据
-   [semver](https://www.npmjs.com/package/semver) - npm 的语义版本器
-   [validate-npm-package-name](https://www.npmjs.com/package/validate-npm-package-name) - 判断是否是一个有效的包名

### 结构

```
.
├── README.md
├── bin
│   └── saas-taro.js
├── lib
│   ├── cmd
│   │   ├── add.js
│   │   ├── create.js
│   │   └── index.js
│   ├── config
│   │   └── index.js
│   ├── help
│   │   └── index.js
│   ├── prompt
│   │   └── index.js
│   └── utils
│       ├── index.js
│       ├── logger.js
│       └── spinner.js
├── package-lock.json
├── package.json
├── publish.js
├── template
│   ├── component-template
│   │   ├── index.jsx
│   │   └── index.scss
│   ├── page-template
│   │   ├── index.config.js
│   │   ├── index.jsx
│   │   └── index.scss
│   └── taro-template
│       ├── babel.config.js
│       ├── config
│       ├── package.json
│       ├── project.config.json
│       ├── project.tt.json
│       ├── sitemap.json
│       ├── src
│       └── yarn.lock
└── yarn.lock
```

### 入口

第一步： 实现 node 和 shell 的交互

**[Shebang or HashBang](https://zh.wikipedia.org/wiki/Shebang)**

###### bin/index.js

```javascript
#!/usr/bin/env node
console.log('命令已经执行了’)
```

    #!/bin/sh—使用sh，即Bourne shell或其它兼容shell执行脚本
    #!/bin/csh—使用csh，即C shell执行
    #!/usr/bin/perl -w—使用带警告的Perl执行
    #!/usr/bin/python -O—使用具有代码优化的Python执行
    #!/usr/bin/php—使用PHP的命令行解释器执行

### 命令

saas-taro -v
saas-taro create my-project-name~~~~
saas-taro add page/component/package page-name/component-name

### 项目分析与实现

##### 初始化命令

-   saas-taro
    初始默认名称，即为 入口 定义的名称

```javascript
"bin": {
    "saas-taro": "./bin/saas-taro.js"
}
```

像我们以往使用 vue react 或者一些工具库或者组件库在使用时候，在不输入参数的情况下，都会展示详细信息。如下：

```javascript

Usage: saas-taro <command> [options]

Options:
  -v --version                      output the version number
  -h, --help                        output usage information

Commands:
  create <app-name>                 create a new wxapp project
  add [options] <type> <file-name>  add a page, component, or package in an already created project

Examples:
  $ saas-taro create taro-wxapp
  $ saas-taro add page home --class-name home
  $ saas-taro add component product-item --class-name demoComponent
  $ saas-taro add package mypkg --package-name mypkg

```

由于使用 commander 自动收集配置信息进行陈列，会展示 用法、 配置哪些选项、支持哪些命令以及每个命令的描述、使用示例等。

program 为 commander 提供的全局变量

-   version 获取版本
-   command 定义命令行指令
-   alias -- 定义一个更短的命令行指令 ，如执行命令$ app m 与之是等价的
-   description -- 描述，它会在 help 里面展示
-   option -- 定义参数。它接受四个参数，在第一个参数中，它可输入短名字 -a 和长名字--app ,使用 | 或者,分隔，在命令行里使用时，这两个是等价的，区别是后者可以在程序里通过回调获取到；第二个为描述, 会在 help 信息里展示出来；第三个参数为回调函数，他接收的参数为一个 string，有时候我们需要一个命令行创建多个模块，就需要一个回调来处理；第四个参数为默认值
-   on 监听命令和选项可以执行自定义函数

-   action -- 注册一个 callback 函数,这里需注意目前回调不支持 let 声明变量
-   parse -- 解析命令行
    ...

##### 命令与工具方法的 Lib

-   cmd
-   config
-   help
-   prompt
-   utils

在 cmd 目录中存放 每种命令所执行的文件
config 中存放配置当前执行 cliRoot 命令集合 可能使用的 templates 本次未使用远程的模板
在 help 中提供了一些帮助描述信息。集中管理。在 saas-taro --help 可以直接展示 examples
prompt 里存放在总端交互的命令
而在 utils 中封住了 ora 了 chalk 提供几种美化的命令行输出格式

下面只拿一个 cmd 中 create 举例说明

```javascript
module.exports = (...args) => {
    return create(...args).catch(err => {
        stopSpinner(false)
        error(err)
        process.exit(1)
    })
}
```

create 命令执行 在看 create 方法做了什么？

```javascript
function create(appName, ...args) {
    // 判断包名是否有效
    const result = validateProjectName(name)
    ...
    // 判断创建工程文件目录是否存在，如果存在是否为空目录
    if (fs.existsSync(rootDir) && !(await isDirEmpty(rootDir))) {}
    ...
    // 判断创建工程时候是否指定初始化git
     if (isGitInit) {
        logWithSpinner(`git init 初始化`)
        run('git init', { cwd: rootDir + '/' })
    }

    ...
    // 实际使用模板创建工程
    copyFile(template, appName, (content) => {
        return content
    })
    ...
    // 创建完成类似vue 打印引导
    log(
        `👉  Get started with the following commands:\n\n` +
        chalk.cyan(` ${chalk.gray('$')} cd ${name}\n`) +
        chalk.cyan(` ${chalk.gray('$')} yarn install\n`) +
        chalk.cyan(` ${chalk.gray('$')} npm run dev:weapp`)
    )
}

```

### 测试

脚手架如何在本地测试呢？

```javascript
npm link
npm unlink
```

执行 npm link。它将会把 app 这个字段复制到 npm 的全局模块安装文件夹 node_modules 内，并创建符号链接（symbolic link，软链接），也就是将 app 的路径加入环境变量 PATH

```javascript
/usr/local/bin/saas-taro -> /usr/local/lib/node_modules/@jd/saas-taro/bin/saas-taro.js
/usr/local/lib/node_modules/@jd/saas-taro -> /Users/miaoqi8/Desktop/Project/saas-taro-scaffold-template
```

将 usr 的 命令 指向 本地安装的模块包文件 上，同时将这个文件在指向你的脚手架本地的项目路径。
此时在本地项目中修改的会实时生效。

解除绑定 npm unlink

### 部署

发布到 http://npm.m.jd.com/
**设置源**

```javascript
# 1. 安装nrm管理多个源
npm install -g nrm --registry=http://registry.m.jd.com

# 2. 添加京东私源
nrm add jd http://registry.m.jd.com

# 3. 切换到jd源
nrm use jd
```

**登录账号**

```javascript
# 先查看当前是否有登录的账号
npm whoami
# 如果不是自己的erp账号，退出登录erp
npm logout
npm login
#添加管理员
npm owner add erpxxx

```

**包的发布**
但是本项目后续不使用该命令直接发布。通过下面的脚本发布

```javascript
npm publish
```

**脚手架发布**

<font color="red" size="2">在这里通过脚本控制版本进行发布 </font>

在 package.json scripts 中配置 release 命令，发布执行 npm run release 即可。

```javascript
"release": "node ./publish.js"
```

-   如何控制版本？
    这里就用到了[semver](https://www.npmjs.com/package/semver)npm 的版本管理器。
    先获取下一个将要发布的版本 \* package-json 用来获取远程 npm 的包数据。

            ```javascript
            let { version } = await packageJson(pkg.name，{
                registryUrl: 'http://registry.m.jd.com'
            })
            ```

    -   询问选择将要发布的版本

        ```javascript
        const getNextVersions = currentVersion => ({
            major: semverInc(currentVersion, 'major'),
            minor: semverInc(currentVersion, 'minor'),
            patch: semverInc(currentVersion, 'patch'),
            premajor: semverInc(currentVersion, 'premajor'),
            preminor: semverInc(currentVersion, 'preminor'),
            prepatch: semverInc(currentVersion, 'prepatch'),
            prerelease: semverInc(currentVersion, 'prerelease')
        })
        ```

    -   更新项目 package.json 为 将要发布的版本

        拿到最新的发布版本写入到 package.json 文件中

        改写完成后进行一次格式化操作。

        ```javascript
        runCommand('npx prettier ./package.json --write')
        ```

    -   执行发布

        ```javascript
        runCommand('npm publish')
        ```
