<!--
 * @@author: Creator
 * @LastEditTime: 2022-03-31 23:27:53
 * @Description: 
-->
### 配置 husky

基于 husky 6.0.0+版本 (以前的版本 仍然使用 .git/hooks/ 自动生成执行文件的方式。)
在 packgae.json 中添加 prepare 脚本

```javascript
{
 "scripts": {
 "prepare": "husky install"
  }
}
```

添加 git hooks，运行一下命令创建 git hooks

```javascript
npx husky add .husky/pre-commit "npm run test"
```

添加 commit-msg

```javascript
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

###
