---
title: Github项目fork后同步更新
date: 2017-06-14 22:26:51
categories:
tags:
- git
- fork
---

fork 了别人的仓库后，原作者又更新了仓库，如何将自己的代码和原仓库保持一致？
github上有个fork的选项，它会把你想参与的项目copy一份在你自己的仓库，但是要怎么进行和源的更新呢，下面将介绍fork项目后的更新。

一般我们fork项目后默认分支是master，为了方便代码管理我们会在自己的仓库里面创建一个分支branch，把这个分支branch设置成默认分支，再对这个分支进行修改。
如果要贡献代码可以点击pull request，当原作者认可你的代码，他会把你的代码和项目代码进行merge，这样你就对项目进行了代码贡献。

但是如果在参与项目中，源项目已经进行了更新，我们可以先把master分支和源项目进行同步更新，然后再跳转到自己的分支branch上和master进行merge，这样自己fork的项目就可以保证是最新的。

<!--more-->

# 步骤

## 给 fork 配置一个 remote

* 主要使用 `git remote -v` 查看远程状态。
```bash
git remote -v
> origin  https://github.com/YOUR_USERNAME/YOUR_FORK.git (fetch)
> origin  https://github.com/YOUR_USERNAME/YOUR_FORK.git (push)
```

* 添加一个将被同步给 fork 远程的上游仓库
```bash
git remote add upstream https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git
```

* 再次查看状态确认是否配置成功。
```bash
git remote -v
> origin    https://github.com/YOUR_USERNAME/YOUR_FORK.git (fetch)
> origin    https://github.com/YOUR_USERNAME/YOUR_FORK.git (push)
> upstream  https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git (fetch)
> upstream  https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git (push)
```

## Syncing a fork

* 从上游仓库 fetch 分支和提交点，传送到本地，并会被存储在一个本地分支 upstream/master 
`git fetch upstream` 可以把上游库的全部分支拉到本地来，但是无法打开或者查看，因为本地没有分支（容器）装载它们。
```bash
git fetch upstream
> remote: Counting objects: 75, done.
> remote: Compressing objects: 100% (53/53), done.
> remote: Total 62 (delta 27), reused 44 (delta 9)
> Unpacking objects: 100% (62/62), done.
> From https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY
>  * [new branch]      master     -> upstream/master
```

* 切换到本地主分支(如果不在的话) 
`git checkout master`
```bash
git checkout master
> Switched to branch 'master'
```

* 把 upstream/master 分支合并到本地 master 上，这样就完成了同步，并且不会丢掉本地修改的内容。
`git merge upstream/master`
```bash
git merge upstream/master
> Updating a422352..5fdff0f
> Fast-forward
>  README                    |    9 -------
>  README.md                 |    7 ++++++
>  2 files changed, 7 insertions(+), 9 deletions(-)
>  delete mode 100644 README
>  create mode 100644 README.md
```

* 如果想更新到 GitHub 的 fork 上，直接 `git push origin master` 就好了。

# 备注：关于拉取某个分支到本地 

* 先通过 git branch 来查看分支
`git branch -a` 查看**所有**分支
`git branch -l` 查看**本地**分支

* 把远程分支信息拉取到本地
`git fetch origin` 把远程分支拉到本地

* 关联本地和远程分支
`git checkout -b dev origin/dev` 在本地创建分支dev并切换到该分支**且把本地分支和远程分支关联起来**

* 最后使用：`git pull origin dev` 就可以把某个分支上的内容都拉取到本地了

## 参考
>`git checkout -b 本地分支名 origin/远程分支名`
使用该方式会在本地新建分支，并自动切换到该本地分支。

>`git fetch origin 远程分支名:本地分支名`
使用该方式会在本地新建分支x，但是不会自动切换到该本地分支，需要手动checkout。