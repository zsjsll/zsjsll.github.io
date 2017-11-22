---
title: linux-解压文件
date: 2017-11-22 16:01:02
categories:
tags:
- linux
- 解压
- tar
- zip
- gzip
- bz2
---

本文总结了Linux下解压文件的参数详解和指令。
根据[Linux下的tar压缩解压缩命令详解](https://www.cnblogs.com/qq78292959/archive/2011/07/06/2099427.html)重新整理。
<!--more-->

# 干货

参数 | 解释
---|---
*.tar | 用 tar -xvf 解压
*.gz | 用 gzip -d或者gunzip 解压
\*.tar.gz 和 \*.tgz | 用 tar -xzf 解压
*.bz2 | 用 bzip2 -d或者用bunzip2 解压
*.tar.bz2 | 用tar -xjf 解压
*.Z | 用 uncompress 解压
*.tar.Z | 用tar -xZf 解压
*.rar | 用 unrar 解压
*.zip | 用 unzip 解压

# 参数解释

经常使用的指令为`tar`，主要有以下几个参数：

参数 | 解释
---|---
-t | 查看内容
**-c** | **建立压缩档案**
**-x** | **解压**
-r | 向压缩归档文件末尾追加文件
-u | 更新原压缩包中的文件

这几个参数，只能独立使用，每次都会用到一个，但是不能混合使用。

下面这个几个参数可以联合使用：

参数 | 解释
---|---
-z | 有gzip属性的
-j | 有bz2属性的
-Z | 有compress属性的
-v | 显示所有过程
-O | 将文件解开到标准输出

下面的参数-f是必须的

参数 | 解释
---|---
-f | 使用档案名字，切记，这个参数是最后一个参数，后面只能接档案名

## 解压

```bash
tar -xvf file.tar         //解压 tar包
tar -xzvf file.tar.gz     //解压tar.gz
tar -xjvf file.tar.bz2    //解压 tar.bz2
tar -xZvf file.tar.Z      //解压tar.Z
unrar e file.rar          //解压rar
unzip file.zip            //解压zip
```
## 压缩

```bash
tar -cvf jpg.tar *.jpg      //将目录里所有jpg文件打包成jpg.tar 
tar -czf jpg.tar.gz *.jpg   //将目录里所有jpg文件打包成jpg.tar后，并将其用gzip压缩，命名为jpg.tar.gz
tar -cjf jpg.tar.bz2 *.jpg  //将目录里所有jpg文件打包成jpg.tar后，并将其用bzip2压缩，命名为jpg.tar.bz2
tar -cZf jpg.tar.Z *.jpg    //将目录里所有jpg文件打包成jpg.tar后，并将其用compress压缩，命名为jpg.tar.Z
rar a jpg.rar *.jpg        //rar格式的压缩，需要先下载rar for linux
zip jpg.zip *.jpg          //zip格式的压缩，需要先下载zip for linux
```