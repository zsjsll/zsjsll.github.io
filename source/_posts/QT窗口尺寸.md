---
title: QT窗口尺寸
date: 2017-05-23 11:41:07
categories: 
tags: 
- qt
- c++
---

这一幅图可以清晰的展示qt窗口函数的关系

来源：http://blog.csdn.net/dbzhang800/article/details/6741344?reload

![](QT窗口尺寸\2017-05-23-11-41-38.png)


# 详解

* frameGeometry()几何尺寸(位置+大小)对于窗口，包含窗口装饰器x()、y()
* pos()只包含位置信息(左上角坐标)
* move()只移动位置geometry()
* 几何尺寸(位置+大小)不包含窗口装饰器width()、height()
* rect()、size()只包含大小信息
* setGeometry()改变位置+大小
* resize()只改变大小
