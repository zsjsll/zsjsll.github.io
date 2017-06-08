---
title: js-页面跳转
date: 2017-06-08 14:33:55
categories:
tags:
- js
---

在使用html的frame框架搭建网页时，会出现需要框架页顶层窗口跳转，这个时候我们使用的是**window.location.href**

<!--more-->

# 介绍

```js
self.location.href="/url"       //当前页面打开URL页面
location.href="/url"            //当前页面打开URL页面
windows.location.href="/url"    //当前页面打开URL页面，前面三个用法相同。
this.location.href="/url"       //当前页面打开URL页面
parent.location.href="/url"     //在父页面打开新页面
top.location.href="/url"        //在顶层页面打开新页面
```
# frame

如果页面中自定义了frame，那么可将parent，self， top 换为自定义frame的名称,效果是在frame窗口打开url地址。

此外，window.location.href=window.location.href;和window.location.Reload()都是刷新当前页面。区别在于是否有提交数据。

当有提交数据时：
* `window.location.Reload()` 会提示是否提交
* `window.location.href=window.location.href;` 则是向指定的url提交数据