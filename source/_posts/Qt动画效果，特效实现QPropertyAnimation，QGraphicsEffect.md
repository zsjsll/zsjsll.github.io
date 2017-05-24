---
title: Qt动画效果，特效实现QPropertyAnimation，QGraphicsEffect
date: 2017-05-23 13:32:28
tags:
- qt
- c++
- 动画
- 特效
---

主要讲了qt的动画和特效，主要应用在弹窗动画上，很多时候都会用到，主要用到2个类，`QPropertyAnimation`和`QGraphicsEffect`，
下面分开介绍这2个类。

# QGraphicsEffect(特效)
QGraphicsEffect的4个子类
* QGraphicsBlurEffect
* QGraphicsColorizeEffect
* QGraphicsDropShadowEffect
* QGraphicsOpacityEffect

## QGraphicsBlurEffect
该类用应产生模糊效果。
>主要函数：
* **setBlurRadius(qreal blurRadius)** *//用于控制图形元素的模糊度，数值越大越模糊。*
使用该类例子如下：
```cpp
QGraphicsBlurEffect *e0 = new QGraphicsBlurEffect(this);
e0->setBlurRadius(0.2);
item[0]->setGraphicsEffect(e1); //item[0]为QGraphicsItem指针
```
<!--more-->
## QGraphicsColorizeEffect
该类提供了使用另外一种颜色对当前图形的一种着色功能。
>主要函数：
* **setColor(QColor)** *//指定了着色。*
* **setStrength (qreal strength)** *//指定了着色和着色强度。*
使用该类例子如下:
```cpp
QGraphicsColorizeEffect *e1 = new QGraphicsColorizeEffect(this);
e1->setColor(QColor(0,0,192));
item[1]->setGraphicsEffect(e1);
```

## QGraphicsDropShadowEffect
该类提供了图形元素的阴影效果。用于增加立体感。
>主要设置函数有3个：
* **setColor()** *//用于设定阴影的颜色。*
* **setBlurRadius()** *//用于设定阴影的模糊度。*
* **setOffset (qreal dx,qreal dy)** *//用于设定在哪个方向产生阴影效果，如果dx为负数，则阴影在图形元素的左边。*
使用该类例子如下:
```cpp
QGraphicsDropShadowEffect *e2 = new QGraphicsDropShadowEffect(this);
e2->setOffset(8,8);
item[2]->setGraphicsEffect(e2);
```

## QGraphicsOpacityEffect
该类用于图形元素的透明效果。
>主要函数是：
* **setOpacity(qreal opacity)** *//用于设置透明度，参数值在0和1.0之间。*
* **setOpacityMask (QBrush mask)** *//设置部分透明效果*
使用该类例子如下:
```
QGraphicsOpacityEffect *e3 = new QGraphicsOpacityEffect(this);
e3->setOpacity(0.7);
item[3]->setGraphicsEffect(e3);
```
--------

# QAbstractAnimation(动画)

![](Qt动画效果，特效实现QPropertyAnimation，QGraphicsEffect\2017-05-23-13-59-27.png)

动画框架由基类**QAbstractAnimation**和它的两个儿子*QVariantAnimation*和*QAnimationGroup*组成。**QAbstractAnimation**是所有动画类的祖宗。它包含了所有动画的基本属性。比如开始，停止和暂停一个动画的能力。它也可以接收时间改变通知。

动画框架又进一步提供了***QProertyAnimation***类。它继承自**QVariantAnimation**并对某个Qt属性（它须是Qt的”元数据对象系统”的一部分）执行动画。此类对属性执行一个宽松曲线插值。所以当你想去动画一个值时，你可以把它声明为一个属性，并且让你的类成为一个QObject。这给予我们极大的自由度来动画那些已存在的widget和其它QObject。

复杂的动画可以通过建立一个**QAbstractAnimation**的树来构建。这个树通过使用QAnimationGroups来创建，QAnimationGroups作为其它动画的容器。注意动画组也是从QAbstractAnimation派生的，所以动画组可以再包含其它动画组。

动画框架可以单独使用，同时也被设计为状态机框架的一部分。状态机提供了一个特定的状态可以用来播放动画。在进入或退出某个状态时QState也可以设置属性们，并且这个特定的动画状态将在指定QPropertyAnimation时给予的值之间做插值运算。后面我们要进一步介绍此问题。

在场景的背后，动画被一个全局定时器收集，这个定时器发送update到所有的正在播放的动画中。

* QAbstractAnimation 所有动画类的基类   
* QAnimationGroup 动画组的基类   
* QEasingCurve 控制动画的宽松曲线类   
* QParallelAnimationGroup 并行动画组类  
* QPauseAnimation 串行动画组类的暂停类  
* QPropertyAnimation 动画Qt属性的类 
* QSequentialAnimationGroup 串行动画组类   
* QTimeLine 控制动画的时间线类   
* QVariantAnimation 各动画类的虚基类

## QPropertyAnimation

如前面所讲，QPropertyAnimation类可以修改Qt属性们。要动画一个值，就需要使用此类。实际上，它的父类，QVariantAnimation，是一个虚拟类，不能被直接使用。

1. 我们选择动画Qt属性的一个主要理由是Qt属性为我们提供了自己动画已存在的类的自由度。尤其是QWidget类（我们也可以把它嵌入到一个QGraphicsView中）具有很多属性表示其bounds,colors等等。让我们看一个小例子：
```cpp
QPushButton button("Animated Button");  
button.show();  
QPropertyAnimation animation(&button, "geometry");  
animation.setDuration(10000);  
animation.setStartValue(QRect(0, 0, 0, 0));  
animation.setEndValue(QRect(250, 250, 100, 30));  
animation.start();  
```
    这段代码将把按钮在10秒种内从屏幕的左上角移动到(250,250)处，而且是逐渐变大。见下图效果：
    ![](Qt动画效果，特效实现QPropertyAnimation，QGraphicsEffect\1.gif)

2. 上面的例子举在开始值和结束值之间做线性插值。还可以在开始和结束值之间设置值，插值运算就会经过这些点。
```cpp
animation1 = new QPropertyAnimation(ui.pushButton, "geometry");   
animation1->setDuration(10000);  
animation1->setKeyValueAt(0, QRect(0, 0, 00, 00));  
animation1->setKeyValueAt(0.4, QRect(20, 250, 20, 30));  
animation1->setKeyValueAt(0.8, QRect(100, 250, 20, 30));  
animation1->setKeyValueAt(1, QRect(250, 250, 100, 30));  
animation1->setEndValue(QRect(250, 250, 100, 30));  
```
    在此例中，动画将按钮在8秒中内弄到(250,250)处，然后在2秒种内又弄回原位。移位是在这些点中间以线性插值进行的。

    ![](Qt动画效果，特效实现QPropertyAnimation，QGraphicsEffect\2.gif)

3. 你也有可能动画一个QObject的值，虽然这些值并没有被声明为Qt属性。唯一的要求就是这个值具有一个setter。之后你可以从这个类派生子类从而包含这些值并且声明一个使用这个setter的属性。注意每个Qt属性都需要有一个getter，所以你需要提供一个getter，如果它不存在的话。
```cpp
class MyGraphicsRectItem : public QObject, public QGraphicsRectItem{
    Q_OBJECT
    Q_PROPERTY(QRectF geometry READ geometry WRITE setGeometry)
};
```
    在上例中，我们派生了QGraphicsRectItem并定义了一个geometry属性。我们现在可以动画这个widget的geometry了，即使QGraphicsRectItem没有提供geometry属性。

## QEasingCurve

QPropertyAnimation在属性的开始值和结束值之间执行一个插值运算。除了向动画添加更多的关键值外，你还可以使用一个宽松曲线。宽松曲线描述了一个在0和1之间插值的速度变化的函数，如果你想控制一个动画的速度而不改变插值的路径时，就非常有用。

```cpp
animation1 = new QPropertyAnimation(ui.pushButton, "geometry");
animation1->setDuration(10000);  
animation1->setStartValue(QRect(0, 0, 0, 0));
animation1->setEndValue(QRect(250, 250, 100, 30));
animation1->setEasingCurve(QEasingCurve::OutBounce);
```
这里，动画将按照一个曲线进行，这个曲线使得动画像一个跳动的皮球从开始位置跳到结束位置。QEasingCurve具有一个大曲线集合，你可以从里面选择一个。它们被定义为QEasingCurve::Type枚举。如果你需要不一样的曲线，你也可以自己实现一个，然后注册到QEasingCurve。

## QAnimationGroup

一个应用通常将包含不止一个动画。例如，你可能想同时移动多个图形item也可能顺序的一个接一个的移动。
**QanimationGroup**的子类们(*QSequentialAnimationGroup*和*QParallelAnimationGroup*)是其它动画的容器，所以这些动画既可以并行也可以串行。QAnimationGroup是一个非属性动画的例子，但是它定期的收到时间改变的通知。这使得它可以把时间改变传输给所包含的动画们，从而控制何时播放那些动画们。

让我们看一下使用QParallelAnimationGroup和QSequentialAnimatoinGroup的代码示例。

* **QParallelAnimationGroup**
```cpp
QPushButton *bonnie = new QPushButton("Bonnie");
bonnie->show();
QPushButton *clyde = new QPushButton("Clyde");
clyde->show();
QPropertyAnimation *anim1 = new QPropertyAnimation(bonnie, "geometry");
// Set up anim1
QPropertyAnimation *anim2 = new QPropertyAnimation(clyde, "geometry");
// Set up anim2
QParallelAnimationGroup *group = new QParallelAnimationGroup;
group->addAnimation(anim1);
group->addAnimation(anim2);
group->start();
```
***QParallelAnimationGroup*** **并行在同一时刻播放group中的动画。对start()的调用将启动它所统治的所有的动画。**

* **QsequentialAnimationGroup**
```cpp
QPushButton button("Animated Button");
button.show();
QPropertyAnimation anim1(&button, "geometry");
anim1.setDuration(3000);
anim1.setStartValue(QRect(0, 0, 100, 30));
anim1.setEndValue(QRect(500, 500, 100, 30));
QPropertyAnimation anim2(&button, "geometry");
anim2.setDuration(3000);
anim2.setStartValue(QRect(500, 500, 100, 30));
anim2.setEndValue(QRect(1000, 500, 100, 30));
QSequentialAnimationGroup group;
group.addAnimation(&anim1);
group.addAnimation(&anim2);
group.start();
```
**QsequentialAnimationGroup*** **顺序的播放它的动画们。它在上一个完成时按顺序播放下一个。**

既然一个动画组本就是一个动画类，你可以把它添加到其它组中。如此，你可以建立起一个动画树。

**动画和状态**

当使用状态机，我们可以使用一个QSignalTransition或QEventTransition类在状态转换时连接一个或多个动画。这些类都是从QAbstractTransition派生的，它们定义了简易的函数addAnimation()，使得能够添加一个或多个动画，在状态转换时启动这些动画。

我们还可能连接属性与状态，而不是手动设置开始与结束值。下面是完整的代码，演示了动画一个QPushButton的geometry属性。
```cpp
QPushButton *button = new QPushButton("Animated Button");
button->show();
QStateMachine *machine = new QStateMachine;
QState *state1 = new QState(machine);
state1->assignProperty(button, "geometry", QRect(0, 0, 100, 30));
machine->setInitialState(state1);
QState *state2 = new QState(machine);
state2->assignProperty(button, "geometry", QRect(250, 250, 100, 30));
QSignalTransition *transition1 = state1->addTransition(button,
SIGNAL(clicked()), state2);
transition1->addAnimation(new QPropertyAnimation(button, "geometry"));
QSignalTransition *transition2 = state2->addTransition(button,
SIGNAL(clicked()), state1);
transition2->addAnimation(new QPropertyAnimation(button, "geometry"));
machine->start();
```