# git 操作使用

除了基础使用git status  git add . git commit -m 等就不记了，记录写使用频率不高但是不可或缺，又不好记的(有些不用真记不住，脑子不好)
```
 git pull origin master --allow-unrelated-histori 
```

Git 操作一般会以git flow 的形式进行考察。

### reset & rebase & revert

### 使用过git merge和git rebase吗？它们之间有什么区别？
简单的说，git merge和git rebase都是合并分支的命令。
git merge branch会把branch分支的差异内容pull到本地，然后与本地分支的内容一并形成一个committer对象提交到主分支上，合并后的分支与主分支一致；
git rebase branch会把branch分支优先合并到主分支，然后把本地分支的commit放到主分支后面，合并后的分支就好像从合并后主分支又拉了一个分支一样，本地分支本身不会保留提交历史