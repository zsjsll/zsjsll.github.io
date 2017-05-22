---
title: git命令手册
date: 2017-05-22 16:00:55
tags: [git]
---
git 代码常用命令


# 创建新仓库(init)
## 仓库
创建新文件夹，打开，然后执行 
`git init`
以创建新的 git 仓库。
## 裸仓库
自己搭git server 我们基本都是创建裸仓库:
```
cd ~
mkdir init.git
cd init.git
git init --bare
```
<!-- more -->

# 检出仓库(clone)
执行如下命令以创建一个本地仓库的克隆版本：
`git clone /path/to/repository` 
如果是远端服务器上的仓库，你的命令会是这个样子：
`git clone username@host:/path/to/repository`

# 工作流

你的本地仓库由 git 维护的三棵“树”组成。第一个是你的 `工作目录`，它持有实际文件；第二个是 `缓存区（Index）`，它像个缓存区域，临时保存你的改动；最后是 `HEAD`，指向你最近一次提交后的结果。

![](git命令手册/trees_2.png)


# 添加与提交(add | commit)

你可以计划改动（把它们添加到缓存区），使用如下命令：
`git add <filename>`
`git add *`
这是 git 基本工作流程的第一步；使用如下命令以实际提交改动：
`git commit -m "代码提交信息"`
现在，你的改动已经提交到了 **HEAD**，但是还没到你的远端仓库。

# 推送改动(push | remote)

## 上传
你的改动现在已经在本地仓库的 **HEAD** 中了。执行如下命令以将这些改动提交到远端仓库：
`git push origin master`
可以把 _master_ 换成你想要推送的任何分支。

## 查看，添加，删除，重命名上传地址
查看当前的远程服务器地址：
`git remote -v`

如果你还没有克隆现有仓库，并欲将你的仓库连接到某个远程服务器，你可以使用如下命令添加：
`git remote add origin <server>`  　　 *origin是上传的主机名，可以自定义*

当上传地址需要删除的时候，我们运行：
`git remote rm <主机名>`

当上传地址需要重命名的时候，我们运行：
`git remote rename <原主机名> <新主机名>`

# 分支(branch | checkout | push)

分支是用来将特性开发绝缘开来的。在你创建仓库的时候，_master_ 是“默认的”。在其他分支上进行开发，完成后再将它们合并到主分支上。

![](git命令手册\branches.png)

创建一个叫做“feature_x”的分支：
`git branch -b feature_x`
创建一个叫做“feature_x”的分支，并切换过去：
`git checkout -b feature_x`
切换回主分支：
`git checkout master`
再把新建的分支删掉：
`git branch -d feature_x`
除非你将分支推送到远端仓库，不然该分支就是 _不为他人所见的_：
`git push origin <branch>`
***每次push都只能上传你仓库中的一个branch***

# 更新与合并(pull | mrege | diff)

要更新你的本地仓库至最新改动，执行：
`git pull`
等价于：
`git fetch`+`git merge`
以在你的工作目录中 _获取（fetch）_ 并 _合并（merge）_ 远端的改动。
要合并其他分支到你的当前分支（例如 master），执行：
`git merge <branch>`
两种情况下，git 都会尝试去自动合并改动。不幸的是，自动合并并非次次都能成功，并可能导致 _冲突（conflicts）_。 这时候就需要你修改这些文件来人肉合并这些 _冲突（conflicts）_ 了。改完之后，你需要执行如下命令以将它们标记为合并成功：
`git add <filename>`
在合并改动之前，也可以使用如下命令查看：
`git diff <source_branch> <target_branch>`

# 标签(tag)

在软件发布时创建标签，是被推荐的。这是个旧有概念，在 SVN 中也有。可以执行如下命令以创建一个叫做 _1.0.0_ 的标签：
`git tag 1.0.0 1b2e1d63ff`
_1b2e1d63ff_ 是你想要标记的提交 ID 的前 10 位字符。使用如下命令获取提交 ID：
`git log`
你也可以用该提交 ID 的少一些的前几位，只要它是唯一的。

# 替换本地改动（签出checkout | 重置reset | 撤消revert）

## checkout

假如你代码写错，但只是想恢复1个文件时，你可以使用如下命令替换掉本地改动：
`git checkout -- <filename>`
`git checkout -- hello.rb`
这条命令把hello.rb从HEAD中签出并且把它恢复成未修改时的样子.
***这个只是恢复一个文件，如果全部要恢复就要使用`git reset` 或者是`git revert`。***

## reset
这种情况发生在你的本地代码仓库,可能你add ,commit 以后发现代码有点问题,准备取消提交,用到下面命令：

 `git reset [--soft | --mixed | --hard ]`

上面常见三种类型：

 + *--mixed*
 工作区不变,只是将commit 和index 信息回退到了某个版本。
 
 `git reset` *默认是 --mixed 模式 *
 
 `git reset --mixed`  *等价于 git reset*
 
 **工作区不回退，但是index又回退了，这个要重新提交commit还要`git add . `之后才能提交，没--soft来得方便**
 + *--soft*
 工作区不变,只回退到commit 信息到某个版本.不涉及index的回退,如果还需要提交,直接commit即可。
  **这个有点像是删除commit节点，自己再重新提交commit。**
 
 + *--hard*
 工作区回退到某个版本,commit 和index 都回回退到某个版本。(注意,这种方式是改变本地代  码仓库源码)
 **这个是最常用的**
 
**worning:** ***reset只是改变本地的仓库，但使用时还是要谨慎，他会把你要恢复的commit之后的所有节点全部清除！如果节点删除错误可以使用`git pull`进行恢复！***


| 类型  | 工作区   |  index  |  commit(节点)  |
|:-----:|:-------:|:-------:|:--------------:|
| mixed |   X     |&radic;  |      &radic;   |
|  soft | X       |    X    |     &radic;    |
|  hard | &radic; |&radic;  |     &radic;    |
　回退：&radic;　　　　　　　　　　　　　不回退：X


## revert

git revert用一个新提交来消除一个历史提交所做的任何修改。
revert 之后你的本地代码会回滚到指定的历史版本,这时你再 `git push` 既可以把线上的代码更新。(这里不会像reset造成冲突的问题)
git revert 版本会递增，不影响之前提交的内容。

***git revert是用一次新的commit来回滚之前的commit，git reset是直接删除指定的commit看似达到的效果是一样的,其实完全不同。***

## little tips
### git revert 和 git reset的区别

1. git revert是用一次新的commit来回滚之前的commit，git reset是直接删除指定的commit。

2. 在回滚这一操作上看，效果差不多。但是在日后继续merge以前的老版本时有区别。因为git revert是用一次逆向的commit“中和”之前的提交，因此日后合并老的branch时，导致这部分改变不会再次出现，但是git reset是之间把某些commit在某个branch上删除，因而和老的branch再次merge时，这些被回滚的commit应该还会被引入。

3. git reset 是把HEAD向后移动了一下，而git revert是HEAD继续前进，只是新的commit的内容和要revert的内容正好相反，能够抵消要被revert的内容。

### git revert 和 git reset回滚方法

` git reset --hard HEAD`　　　　　　　*重置到当前的 commit*
` git reset --hard HEAD~1`　　　　　　*重置到当前指向的前一次 commit*
` git reset --hard <commit>`　　　　 *（比如：fa042ce57ebbe5bb9c8db709f719cec2c58ee7ff）重置到指定的版本*
***

` git revert HEAD`　　　　　　　*撤销当前的 commit(工作区回到上一次的 commit)*
` git revert HEAD~1`　　　　　　*撤销当前的前一次 commit(工作区回到上上次的 commit)*
` git revert <commit>`　　　　 *撤销指定版本(工作区回到指定版本上一次的 commit)*
