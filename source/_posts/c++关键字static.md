---
title: c++关键字static
date: 2017-05-22 16:49:40
categories: 
tags: c++
---


这个概念对于我来说实在是太太抽象了，主要是实在找不到它和**全局变量**在使用上的区别，
反正就是带全局的不要用，感觉编程上也用不到什么全局的东西，特别是面对对象的，只需要在class中去“全局”就可以了。

<!-- more -->
# 面向过程

## 静态全局变量VS全局变量


|              | 静态全局变量  |        全局变量 |
| :-----: |    :------------: |:------------:   |
|  分配内存地址 |   全局数据区| 全局数据区   |
|  初始化 | 如果不显式初始化，将被隐式初始化为0  | 随机，除非显式地初始化    |
|  作用域 |    本源文件,<br/>不能被其它文件所用,<br/>其它文件中可定义相同名字的变量且不会发生冲突  |   可以跨文件使用，<br/>但是要用*extern* 修饰  |
|生命周期  |   始终驻留在全局数据区，<br/>直到程序运行结束   |  始终驻留在全局数据区，<br/>直到程序运行结束 |

## 静态局部变量VS局部变量

**定义**：在 **局部变量** 前加上 *static[关键字]* 时，就定义了静态局部变量。

|              | 静态局部变量  |  局部变量    |
| :-----: |    :------------: |:------------:   |
|  分配内存地址 |   全局数据区  | 栈内存   |
|  初始化 | 如果不显式初始化，<br/>将会被隐式初始化为0，<br/>以后的函数调用不再进行初始化  | 随机，除非显式地初始化    |
|  作用域 |    局部作用域，<br/>当定义它的**函数**或**语句块**结束时，<br/>其作用域随之结束  |   局部作用域，<br/>当定义它的**函数**或**语句块**结束时，<br/>其作用域随之结束  |
|生命周期  |  始终驻留在全局数据区，<br/>直到程序运行结束    | 退出函数体，<br/>系统收回栈内存，<br/>局部变量失效 |

# 面向对象

## 静态成员变量

**特点：**

*作用范围：*
* 静态成员变量被当作是类的成员，所有类的对象共享访问。
* 静态成员变量只有一份，无论有多少个类对象。
* 静态成员变量不属于特定的类对象，在没有产生类对象时其作用域就可见，我们就可以操作它。


*分配内存地址：*
* 静态成员变量存储在全局数据区。
* 静态成员变量定义时要分配空间，所以不能在类中声明定义。
在类外使用语句`<数据类型> <类名>::<静态成员变量名>=<值>`


*权限：*
* 静态成员变量和普通数据成员一样遵从public,protected,private访问规则。
* 如果静态成员变量的访问权限允许的话（即public的成员），可在程序中，引用静态数据成员 。
语句`<类名>::<静态成员变量名>`或者`<类对象名>::<静态成员变量名>`


## 静态成员函数

*特点：*
* 静态成员函数为类的全部而服务，不是为某一个类的具体对象服务。
* 静态成员函数与静态数据成员一样，都是类的内部实现，属于类定义的一部分。
* 静态成员函数不具有this指针。从这个意义上讲，它无法访问属于类对象的非静态成员，它只能调用其余的静态成员。
* 静态成员函数可以在类中被任何成员函数调用。简单地说静态成员函数很被动。

*总结：*
* 出现在类体外的函数定义不能指定关键字static；
* **静态成员之间可以相互访问**，包括静态成员函数访问静态数据成员和访问静态成员函数；
* 非静态成员函数可以任意地访问静态成员函数和静态数据成员；
* **静态成员函数不能访问非静态成员函数和非静态数据成员**；
* 由于没有this指针的额外开销，因此静态成员函数与类的非静态成员函数相比**速度上会有少许的增长**；
* 调用静态成员函数，可以用成员访问操作符（.）和（->；）为一个类的对象或指向类对象的指针调用静态成员函数.


# 小贴士

## 初始化和赋值

在c++中 初始化和赋值在代码表现上是截然不同的。

### 初始化
```cpp
int a = 10;
```
>初始化指的是把a最开始的那个值确定下来。

### 赋值
```cpp
int a;
a = 10;
```
>赋值指的是先把a声明出来，系统随便指定了一个值给a，然后再人为的去改变那个初始值。