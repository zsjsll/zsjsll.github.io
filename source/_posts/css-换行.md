---
title: css-换行
date: 2017-06-01 13:50:57
categories:
tags:
- css
---

在CSS中，控制换行的有3个属性，分别是：**white-space**、**word-break**、**word-wrap** ，下面我们依次介绍3个属性。

其中**white-space** 的`<pre>`是用的最多的。

<!--more-->

# white-space

值  | 描述
:---|:---
normal  | 默认。空白会被浏览器忽略。
**pre**  | **空白会被浏览器保留。其行为方式类似 HTML 中的 &lt;pre> 标签。**
nowrap  | 文本不会换行，文本会在在同一行上继续，直到遇到 &lt;br> 标签为止。
pre-wrap  | 保留空白符序列，但是正常地进行换行。
pre-line  | 合并空白符序列，但是保留换行符。
inherit  | 规定应该从父元素继承 white-space 属性的值。

_**pre** 保留单词结构，如果单词太长会直接**跳转下一行进行显示，上一行用空白保留**。_

# word-break

值  | 描述
:---|:---
normal  | 使用浏览器默认的换行规则。
break-all  | 允许在单词内换行。
keep-all  | 只能在半角空格或连字符处换行。

_**break-all** 会打破单词结构**强制换行**。_

# word-wrap

值  | 描述
:---|:---
normal  | 只在允许的断字点换行（浏览器保持默认处理）。
break-word  | 在长单词或 URL 地址内部进行换行。

_**break-word** 会打破长单词结构**强制换行**。_


