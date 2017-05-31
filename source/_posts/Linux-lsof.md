---
title: Linux-lsof
date: 2017-05-31 16:00:59
categories:
tags:
- linux
- lsof
---

lsof（list open files）是一个列出当前系统打开文件的工具。在Linux环境下，任何事物都以文件的形式存在，通过文件不仅仅可以访问常规数据，还可以访问网络连接和硬件。所以，lsof的功能很强大。一般root用户才能执行lsof命令，普通用户可以看见/usr/sbin/lsof命令，但是普通用户执行会显示“permission denied”。因此通过lsof工具能够查看这个列表对系统监测以及排错将是很有帮助的。

# lsof输出各列信息的意义
```shell
COMMAND     PID        USER   FD      TYPE             DEVICE SIZE/OFF       NODE NAME
init          1        root  cwd       DIR                8,1     4096          2 /
init          1        root  rtd       DIR                8,1     4096          2 /
init          1        root  txt       REG                8,1   150584     654127 /sbin/init
udevd       415        root    0u      CHR                1,3      0t0       6254 /dev/null
udevd       415        root    1u      CHR                1,3      0t0       6254 /dev/null
udevd       415        root    2u      CHR                1,3      0t0       6254 /dev/null
udevd       690        root  mem       REG                8,1    51736     302589 /lib/x86_64-linux-gnu/libnss_files-2.13.so
syslogd    1246      syslog    2w      REG                8,1    10187     245418 /var/log/auth.log
syslogd    1246      syslog    3w      REG                8,1    10118     245342 /var/log/syslog
dd         1271        root    0r      REG                0,3        0 4026532038 /proc/kmsg
dd         1271        root    1w     FIFO               0,15      0t0        409 /run/klogd/kmsg
dd         1271        root    2u      CHR                1,3      0t0       6254 /dev/null
```

**COMMAND：**进程的名称 

**PID：**进程标识符

**USER：**进程所有者

**FD：**文件描述符，应用程序通过文件描述符识别该文件。如cwd、txt等 

**TYPE：**文件类型，如DIR、REG等

**DEVICE：**指定磁盘的名称

**SIZE：**文件的大小

**NODE：**索引节点（文件在磁盘上的标识）

**NAME：**打开文件的确切名称

## 参数

`lsof abc.txt` 显示开启文件abc.txt的进程

`lsof -i :22` 知道22端口被哪个进程占用

`lsof -c abc` 显示abc进程现在打开的文件

`lsof -g gid` 显示归属gid的进程情况

`lsof -n` 不将IP转换为hostname，缺省是不加上-n参数

`lsof -p 12` 看进程号为12的进程打开了哪些文件

`lsof -u username` 查看用户打开哪些文件

`lsof -i @192.168.1.111` 查看远程已打开的网络连接（连接到192.168.1.111）

## 总结 

我感觉这个lsof有点像`ps`+`netstat`的结合，很多时候我我们知道端口号要去查询PID的时候就要通过`netstat -apn`或者 `netstat -tapn` 进行查找后,在用进程名去进行 `ps -aux |grep 进程名` 进行查找如果通过`lsof -i :端口号` 可以一次进行查找。

