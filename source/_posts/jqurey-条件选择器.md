---
title: jqurey-条件选择器
date: 2017-06-08 10:43:00
categories:
tags:
- js
- jquery
---

jquery的条件选择器是用来对html标签进行选择，从而获取属性值，改变css样式，标签内的文本等等。。。
大多时候用`jqurey()...{}`来进行条件筛选，为了方便使用也可以用简写`$()...{}`。

<!--more-->

# jqurey选择器

选择器  | 实例  | 选取
-----|-----|---
*  | $("*")  | 所有元素
#id  | $("#lastname")  | id="lastname" 的元素
.class  | $(".intro")  | 所有 class="intro" 的元素
element  | $("p")  | 所有 &lt;p> 元素
.class.class  | $(".intro.demo")  | 所有 class="intro" 且 class="demo" 的元素
&nbsp; |  |  
**:first**  | $("p:first")  | 第一个 &lt;p> 元素
**:last**  | $("p:last")  | 最后一个 &lt;p> 元素
**:even**  | $("tr:even")  | 所有偶数 &lt;tr> 元素
**:odd**  | $("tr:odd")  | 所有奇数 &lt;tr> 元素
&nbsp; |  |   
**:eq(index)**  | $("ul li:eq(3)")  | 列表中的第四个元素（index 从 0 开始）
:gt(no)  | $("ul li:gt(3)")  | 列出 index 大于 3 的元素
:lt(no)  | $("ul li:lt(3)")  | 列出 index 小于 3 的元素
**:not(selector)**  | $("input:not(:empty)")  | 所有不为空的 input 元素
 &nbsp;|  |    
:header  | $(":header")  | 所有标题元素 &lt;h1> - &lt;h6>
:animated  | $(":animated")  | 所有动画元素
 &nbsp;|  |   
:contains(text)  | $(":contains('W3School')")  | 包含指定字符串的所有元素
:empty  | $(":empty")  | 无子（元素）节点的所有元素
:hidden  | $("p:hidden")  | 所有隐藏的 &lt;p> 元素
:visible  | $("table:visible")  | 所有可见的表格
 &nbsp;|  |    
s1,s2,s3  | $("th,td,.intro")  | 所有带有匹配选择的元素
 &nbsp;|  |    
[attribute]  | $("[href]")  | 所有带有 href 属性的元素
[attribute=value]  | $("[href='#']")  | 所有 href 属性的值等于 "#" 的元素
[attribute!=value]  | $("[href!='#']")  | 所有 href 属性的值不等于 "#" 的元素
[attribute$=value]  | $("[href$='.jpg']")  | 所有 href 属性的值包含以 ".jpg" 结尾的元素
 &nbsp;|  |    
:input  | $(":input")  | 所有 &lt;input> 元素
:text  | $(":text")  | 所有 type="text" 的 &lt;input> 元素
:password  | $(":password")  | 所有 type="password" 的 &lt;input> 元素
:radio  | $(":radio")  | 所有 type="radio" 的 &lt;input> 元素
:checkbox  | $(":checkbox")  | 所有 type="checkbox" 的 &lt;input> 元素
:submit  | $(":submit")  | 所有 type="submit" 的 &lt;input> 元素
:reset  | $(":reset")  | 所有 type="reset" 的 &lt;input> 元素
:button  | $(":button")  | 所有 type="button" 的 &lt;input> 元素
:image  | $(":image")  | 所有 type="image" 的 &lt;input> 元素
:file  | $(":file")  | 所有 type="file" 的 &lt;input> 元素
 &nbsp;|  |    
:enabled  | $(":enabled")  | 所有激活的 input 元素
:disabled  | $(":disabled")  | 所有禁用的 input 元素
:selected  | $(":selected")  | 所有被选取的 input 元素
:checked  | $(":checked")  | 所有被选中的 input 元素

* 有的还可以写成成员调用的样式，比如$`(“ul li:eq(3)”)` 可以写成 `$(“ul li”).eq(3)`。
* 过滤选择器的混合使用时要记住后面的过滤条件是以前面的过滤选择器过滤后的重新序号为基础，即过滤的逐级性，比如
`$("#t1 tr:gt(0):lt(3)").css("fontSize", "28");` //lt(3)是从gt(0)出的新序列中的序号，不要写成lt(4) 

## 条件选择器

### 多条件选择器

`$("p,div,span menuitem")`，同时选择p元素，div元素，和span元素下的所以后代元素menuitem

**_注意_**：_选择器表达式中的空格不能多不能少，易错！_

### 同条件选择器

`$(".button.color.ttt")`选中一个具有多个class的元素，即class="button color ttt"。

## 相对选择器

```html
<table id="table1">
<tr><td>dsds</td><td>dsfdef</td></tr>
<tr><td>dsds</td><td>dsfdef</td></tr>
<tr><td>dsds</td><td>dsfdef</td></tr>
<tr><td>dsds</td><td>dsfdef</td></tr>
<tr><td>dsds</td><td>dsfdef</td></tr>
</table> 
```

那么可以用如下的js代码操作td的背景色
```js
$("#table1 tr").click(function () {
    $("td", $(this)).css("background", "red");
    //不使用$(this)，直接用this也是可以的
    //如果直接使用"#table1 tr"全部的"#table1 tr"都将改变
});
```
这句代码用的就是相对选择器，选择的td元素是当前的tr元素下的所有td元素，没有涉及到其他行的td元素，`$(this)`指的是被选中的`"#table1 tr"`，要改变的元素是被点击的`"#table1 tr"`中的td。

## 层次选择器

 * `$("#div li")`获取div下的所有后代（descendants）li元素（后代，子，子的子....）
 * `$("#div > li")`获取div下的直接子元素li（children）//注意空格
 * `$(".menuitem + div")`获取class名为menuitem之后的第一个div元素，不常用。
 * `$(".menuitem ~ div")`获取class名为menuitem之后的所有的div元素，不常用。



