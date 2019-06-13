---
title: linux安装shadowsocks、shadowsocksR客户端 + polipo
date: 2019-06-13 10:51:53
categories:
tags:
- ssr
- linux
- shadowsocksR
- polipo
---

liunx 系统部署SSR的服务端有很多脚本，但是部署客户端的不多。如果是有图形界面的话可以用shadowsocksQT 来配置。纯终端可以可以用apt来安装shadowsocks，这个安装的是python2.7版本的，也可以用pip3安装pyton3版本的，但都不支持SSR的服务。安装shadowsocksR客户端可以用现成的脚本。
<!--more-->

参考内容： 
[Ubuntu Server 18.04 LTS 使用Shadowsocks-ShadowsocksR访问互联网](https://mystery0.vip/2018/08/23/Ubuntu%20Server%2018.04%20LTS%20%E4%BD%BF%E7%94%A8Shadowsocks-ShadowsocksR%E8%AE%BF%E9%97%AE%E4%BA%92%E8%81%94%E7%BD%91/)
[为终端设置Shadowsocks代理](https://droidyue.com/blog/2016/04/04/set-shadowsocks-proxy-for-terminal/index.html)

# 安装Shadowsocks/ShadowsocksR

根据你的节点是 SS 还是 SSR 选择安装。

## Shadowsocks安装

由于是 server ，所以在这里我只介绍命令行的安装。

shadowsocks 运行的时候通过 python ，所以需要先安装 python。
`sudo apt-get install python3`

接着安装 python 的包管理器 pip。
`sudo apt-get install python3-pip`

之后我们通过 pip 直接安装 shadowsocks。
`sudo pip3 install shadowsocks`

### 配置Shadowsocks

在任意地方新建一个配置文件shadowsocks.json。
也可以直接打开 `/etc/shadowsocks/config.json` 配置相关参数。

##### 注意替换配置中的相关节点信息
```json
{
  "server": "{your-server}",
  "server_port": 12345,
  "local_port": 1080,
  "password": "{your-password}",
  "timeout": 600,
  "method": "aes-256-cfb"
}
```

### 启动shadowsocks服务

`sslocal` 和 `ssserver` 都可以执行命令。

如果是在默认位置配置相关参数，可以直接运行：
`sudo sslocal -d start`

反之则带参数 -c 运行:
`sudo sslocal -c ~/shadowsocks.json -d start`

至此， Shadowsocks 的安装和配置完成。

## ShadowsocksR安装

在客户端安装 SSR 按理说也很简单，但是我当初找了很久才找到一个脚本，其他的基本上都是服务端的安装。
http://ss.pythonic.life
http://ssr.pythonic.life （备用）
有大量免费的SSR账号。

这个 SSR 脚本会使用git自动将SSR下载到本地，所以在这里我们先安装git。
`sudo apt install git`

运行SSR 脚本：
`wget https://github.com/the0demiurge/CharlesScripts/raw/master/charles/bin/ssr`
这个脚本算是写的比较完善了，里面封装了 SSR 的安装、配置、启动、关闭等功能。

为了方便操作，我们将脚本放进/usr/bin 中。
`sudo mv ssr /usr/bin`
`sudo chmod 766 /usr/bin/ssr`

接下来我们通过脚本安装SSR。
`ssr install`

### 配置ShadowsocksR

第一次安装完成之后会自动打开配置文件。
`ssr config`可以打开配置文件。

##### 注意替换配置中的相关节点信息

```json
{
    "server": "{your-server}",
    "server_ipv6": "::",
    "server_port": 12345,
    "local_address": "127.0.0.1",
    "local_port": 1080,

    "password": "{your-password}",
    "method": "aes-256-cfb",
    "protocol": "origin",
    "protocol_param": "",
    "obfs": "plain",
    "obfs_param": "",
    "speed_limit_per_con": 0,
    "speed_limit_per_user": 0,

    "additional_ports" : {}, // only works under multi-user mode
    "additional_ports_only" : false, // only works under multi-user mode
    "timeout": 120,
    "udp_timeout": 60,
    "dns_ipv6": false,
    "connect_verbose_info": 0,
    "redirect": "",
    "fast_open": false
}
```

### 启动shadowsocksR服务

配置好之后会自动启动SSR，如果输出的日志没有提示错误的话，那么 ShadowsocksR 的配置就完成了。
`ssr start`可启动SSR服务。

# polipo 代理

Shadowsocks/ShadowsocksR是我们常用的代理工具，它使用socks5协议，而终端很多工具目前只支持http和https等协议，对socks5协议支持不够好，所以我们为终端设置Shadowsocks/ShadowsocksR的思路就是将socks5协议转换成http协议，然后为终端设置即可。
想要进行转换，需要借助工具，我们采用比较知名的polipo来实现。polipo是一个轻量级的缓存web代理程序。

## 安装polipo

运行`sudo apt install polipo`安装polipo代理。

## 配置polipo

安装完成后，设置ParentProxy为Shadowsocks/ShadowsocksR。
`sudo vim /etc/polipo/config`

##### 配置文件修改：

```bash
# This file only needs to list configuration variables that deviate
# from the default values.  See /usr/share/doc/polipo/examples/config.sample
# and "polipo -v" for variables you can tweak and further information.

logSyslog = true
logFile = /var/log/polipo/polipo.log

# Uncomment this if you want to use a parent SOCKS proxy:
socksParentProxy = "localhost:1080"
socksProxyType = socks5
```

## 重启polipo

`sudo service polipo restart`

## 验证及使用

安装完成就需要进行验证是否work。这里展示一个最简单的验证方法，打开终端，如下执行:
`curl ip.gs`
`http_proxy=http://localhost:8123 curl ip.gs` 

```bash
# loa @ JM-KM-LONGCHANG in /etc/shadowsocks [14:15:13]
curl ip.gs

Current IP / 当前 IP: 221.213.80.209
ISP / 运营商:  ChinaUnicom
City / 城市: Kunming Yunnan
Country / 国家: China

# loa @ JM-KM-LONGCHANG in /etc/shadowsocks [14:14:57]
http_proxy=http://localhost:8123 curl ip.gs

Current IP / 当前 IP: 42.200.113.196
ISP / 运营商:  pccw.com
City / 城市:  Hong Kong
Country / 国家: China
```

*注：polipo默认的HTTP代理端口是8123。*

## 设置别名

bash中有一个很好的东西，就是别名alias. Linux用户修改~/.bashrc，增加如下设置:
`alias hp="http_proxy=http://localhost:8123"`

然后执行`source ~/.bashrc`
就可以用*hp* 来代替 *http_proxy=http: //localhost:8123*
`hp curl ip.gs`

## 全局代理设置

如果嫌每次为每一个命令设置代理比较麻烦，可以为当前会话设置全局的代理。

`export http_proxy="http://localhost:8118"`
`export https_proxy="http://localhost:8118"`

如果想要更长久的设置代理，可以将`export http_proxy="http://localhost:8123"`加入.bashrc或者.bash_profile文件。

### 取消代理

`unset http_proxy`
`unset https_proxy`
