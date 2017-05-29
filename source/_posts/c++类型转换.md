---
title: c++类型转换
date: 2017-05-22 16:57:30
categories: 
tags: c++
---




C/C++是强类型语言,不同类型之间的相互转换是比较麻烦的.但是在编程实践中,不可避免的要用到类型转换.有2中类型转换:
- 隐式类型转换
- 强制类型转换

<!-- more -->

# 隐式类型转换

## 提升精度
此种是编译器自动完成的,安全的.所以编译的时候不会有任何错误或者警告信息提示.

**示例:**
```cpp
int ival = 3;
double dval = 3.14159;

// ival 被提升为 double 类型: 3.0
ival + dval;
```
## 降低精度
也是有编译器自动完成,会造成精度丢失,所以编译时得到一个警告信息提示.

**示例:**
```cpp
double dval = 3.14159;
// dval的值被截取为 int 值3
int ival = dval;
```
# 显式类型转换
## C风格的强制转换(包括旧式C++风格的强制转换)
**格式: **
类型(表达式) ; 　　　　　　　　　*// 旧的C++风格*
或者
(类型)表达式 ;   　　　　　　　　*// C风格*

**示例: **
`int(dval) ;`
或者
`(int)dval ;`

此种强制转换是比较粗暴直接的,有可能导致精度丢失(如从 double 转换为 int)或者一些莫名其妙的错误(如把 int 转换为 函数指针),一旦使用了强制转换,编译器将不提示任何警告.这也往往成为错误的源泉.而且这种错误非常难找.我想这也是C++要使用**新的强制转换操作符**的原因之一吧.

## C++强制转换操作符
C++增加了4个关键字用于强制类型转换:
* const_cast
* dynamic_cast
* static_cast
* reinterpret_cast


### const_cast
用来移除 const,这个没什么好说的.
### dynamic_cast
需要 RTTI 支持, 主要用于把基类指针转换为派生类指针.这里的基类指针其实是指向一个派生类实例,只是类型为基类.
**示例:**
```cpp
// 前提假设: class B 由 class A 派生
A *ptrA = new class B;
B *ptrB = dynamic_cast<B*>(ptrA);
```
### static_cast
static_cast 运算符完成*相关类型* 之间的转换.

所谓"相关类型"指的是从逻辑上来说,多多少少还有那么一点联系的类型。
比如从 double 到 int,我们知道它们之间还是有联系的,只是精度差异而已,使用 static_cast 就是告诉编译器:我知道会引起精度损失,但是我不在乎.
又如从 void* 到 具体类型指针像 char*,从语义上我们知道 void* 可以是任意类型的指针,当然也有可能是 char* 型的指针,这就是所谓的"多多少少还有那么一点联系"的意思.
又如从派生类层次中的上行转换(即从派生类指针到基类指针,因为是安全的,所以可以用隐式类型转换)或者下行转换(不安全,应该用 dynamic_cast 代替).
对于static_cast操作符,如果需要截断,补齐或者指针偏移编译器都会自动完成.注意这一点,是和 reinterpret_cast 的一个根本区别.

### reinterpret_cast
reinterpret_cast 处理*互不相关的类型*之间的转换.

"互不相关的类型"指的是两种完全不同的类型,如从整型到指针类型,或者从一个指针到另一个毫不相干的指针.
**示例:**
```cpp
int ival = 1;
double *dptr = reinterpret_cast<double*>(ival);
```
**或者**
```cpp
int *iptr = NULL;
double *dptr = reinterpret_cast<double*>(iptr);
```
reinterpret_cast 操作执行的是比特位拷贝,就好像用 memcpy() 一样.
```cpp
int *iptr = reinterpret_cast<int*>(1);
double *dptr = reinterpret_cast<double*>(2);
memcpy(&dptr, &iptr, sizeof(double*)); // 等效于 dptr = reinterpret_cast<double*>(iptr); 结果 dptr 的值为1;
```
上面这个示例也说明了 reinterpret_cast 的意思:编译器不会做任何检查,截断,补齐的操作,只是把比特位拷贝过去.
所以 reinterpret_cast 常常被用作不同类型指针间的相互转换,因为所有类型的指针的长度都是一致的(32位系统上都是4字节),按比特位拷贝后不会损失数据.

# 编程实践中几种典型的应用场景

## 数值精度提示或者降低
包括把无符号型转换为带符号型(也是精度损失的一种),用 static_cast 可以消除编译器的警告信息,前面提到好几次了.

## 任意类型指针到 void*
隐式类型转换,自动完成. 看看 memcpy 的原型:
```cpp
void *memcpy(
   void *dest,
   const void *src,
   size_t count 
);
```
参数定义为 void* 是有道理的,不管我们传入什么类型的指针都符合语义,并且不会有编译器警告.

## void* 到任意类型指针
用 static_cast 和 reinterpret_cast 都可以,这是由 void* 是通用指针这个语义决定的.我个人倾向用 reinterpret_cast,表达要"重新解释"指针的语义.

## 不同类型指针间的相互转换
用 reinterpret_cast.

## int 型和指针类型间的相互转换
用 reinterpret_cast.

比如我写代码的时候经常这样做: new 一个 struct,然后把指针返回给外部函数作为一个"句柄",我不希望外部函数知道这是一个指针,只需要外部函数在调用相关函数时把这个"句柄"重新传回来.这时,就可以把指针转换为一个 int 型返回. 这是 reinterpret_cast 存在的绝佳理由.
```cpp
struct car
{
    int doors;
    int height;
    int length;
    float weight; 
};

int create_car()
{
    car *c = new car;
    return reinterpret_cast<int>(c);
}

int get_car_doors(int car_id)
{
    car *c = reinterpret_cast<car*>(car_id);
    return c->doors;
}

void destroy_car(int car_id)
{
    car *c = reinterpret_cast<car*>(car_id);
    delete c;
}
```
如上,外部函数不需要知道 struct car 的具体定义,只需要调用 create_car() 得到一个 car id,然后用此 car_id 调用其他相关函数即可,至于 car_id 是什么,根本没必要关心.

## 派生类指针和基类指针间的相互转换
* 派生类指针到基类指针用隐式类型转换(直接赋值)或者用 static_cast. 显然不应该也没必要用 reinterpret_cast.

* 基类指针到派生类指针用 dynamic_cast (运行期检查)或者 static_cast (运行期不检查,由程序员保证正确性). 考虑到C++对象模型的内存分布可能引起的指针偏移问题,绝对不能用 reinterpret_cast.

# 后记
几乎所有提到 reinterpret_cast 的书籍都要附带说什么"不可移植","危险"之类的词,好像 reinterpret_cast 是洪水猛兽,碰不得摸不得.其实理解了之后就知道没什么神秘的,存在即是理由,该用的时候就要大胆的用,否则C++保留这个关键字干什么? 关键是程序员应该清楚的知道自己要的结果是什么,如此,就是用C风格的强制转换又有何妨?