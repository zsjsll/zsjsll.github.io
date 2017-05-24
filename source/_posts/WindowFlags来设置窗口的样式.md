---
title: WindowFlags来设置窗口的样式
date: 2017-05-23 14:33:02
tags:
- qt
- c++
- windowflags
- 窗口
---

在qt中可以用WindowFlags来设置窗口的样式，用flags的值来进行窗口的设置，如果某一窗口设置为无状态栏且无标题，在退出时：
1. 重新退出按钮。
2. 父窗口关闭时，子窗口自动退出进程。

***exit(0)可以直接终止程序***
***close()只能关闭窗口***

下面我们主要讲解**父窗口关闭时，子窗口自动退出进程**。
<!--more-->
# Qt窗体关闭时,如何自动销毁窗体类对象

代码实例：
```cpp
//标题
Qt::WindowFlags flags = Qt::Dialog;
//flags |= Qt::WindowCloseButtonHint;
//flags |= Qt::WindowMinimizeButtonHint;
//flags |= Qt::WindowStaysOnTopHint;    //窗口顶置
//flags |= Qt::WindowCloseButtonHint;
flags |= Qt::FramelessWindowHint;   //窗口无标题
flags |= Qt::Tool;  //转成后台程序,在状态栏无显示
//flags |= Qt::X11BypassWindowManagerHint;
setWindowFlags(flags);   //把所选择的flags加载
//QApplication::setQuitOnLastWindowClosed(false);
//setAttribute(Qt::WA_DeleteOnClose, false);
//this->setAttribute(Qt::WA_TranslucentBackground);
this->setAttribute(Qt::WA_QuitOnClose, true);
```

当我们创建一个窗口时，如果这个窗口是一个顶级窗口，准确地说是w.windowFlags().testFlag(Qt.Window) is True的窗口，Qt会自动附加一个`Qt::WA_QuitOnClose`属性。它的意思是，窗口被关闭了，qApp.lastWindowClose信号会被触发。

默认情况下，qApp接收到此信号后会退出程序，这个行为相当于在初始化程序时：

**qApp.lastWindowClosed.connect(qApp.quit)**

要修改这个默认行为，可以设置QApplication的quitOnLastWindowClosed属性，比如：

`QApplication::setQuitOnLastWindowClosed(False)`//拒绝发送

比如这样设置
```cpp
setAttribute(Qt::WA_QuitOnClose,true);
QApplication::setQuitOnLastWindowClosed(false);
```

在关闭时，窗口关闭的信号还是无法发送。。。相当于允许发送信号，但是信号本身却拒绝发送。

Qt提供了一个简便的办法，只要将窗口的`Qt::WA_DeleteOnClose`属性设置为true，Qt会自动帮我们销毁这个窗口。

如果`setAttribute(Qt::WA_DeleteOnClose, false)`，那么窗口只是`hide()`，意味着还是在进程里面霸占着资源，并没有释放。

# Qt::WA_DeleteOnClose

如果我们在程序中通过 new 的方式创建一个窗口，可以给该窗口设置Qt::WA_DeleteOnClose属性。这样在关闭这个窗口时Qt能够自动回收该窗口所占用的资源，这样能够及时回收无效的资源，有用利于节约内存空间。

通过不断打开窗口，再关闭所有打开的窗口。在任务管理器中对比该应用程序所占用的资源大小。

* **设置了Qt::WA_DeleteOnClose属性**

    ![](WindowFlags来设置窗口的样式\1.gif)

* **未设置 Qt::WA_DeleteOnClose属性**

    ![](WindowFlags来设置窗口的样式\2.gif)

-----

从上两幅图中可以看到，在不停地打开窗口，程序占用内存不断增加，而在所有窗口关闭的过程中，设置了Qt::WA_DeleteOnClose属性的情况下我们发现关闭的窗口所占用的内存资源在不断回收，全部关闭后恢复到之前的状态。而没有设置Qt::WA_DeleteOnClose属性的情况下我们发现关闭的窗口所占用的内存资源并没有减少。这就说明，关闭的窗口内存未被回收。

由此看来Qt::WA_DeleteOnClose属性的重要性了。

参考：

http://blog.163.com/qimo601@126/blog/static/1582209320130105113647/
http://www.cnblogs.com/findumars/p/6201221.html