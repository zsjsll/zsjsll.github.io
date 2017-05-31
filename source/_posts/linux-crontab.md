---
title: linux-crontab 添加计划任务
date: 2017-05-31 23:23:30
categories:
tags:
- linux
- crontab
---

很多linux程序需要周期性的执行，比如备份，重启服务等等。我们可以使用`crontab`命令来进行linux系统的计划任务。

<!--more-->

# crontab 介绍

在/etc 文件夹下面有 4个文件夹1个文件 分别是：**cron.d/**、**cron.daily/**、**cron.hourly/**、**cron.monthly/**、**cron.weekly/**、**crontab** 。

**cron.daily**是每天执行一次的job.
**cron.weekly**是每个星期执行一次的job.
**cron.monthly**是每月执行一次的job.
**cron.hourly**是每个小时执行一次的job.

cron.d是系统自动定期需要做的任务，但是又不是按小时，按天，按星期，按月来执行的，那么就放在这个目录下面。
如果是按小时，按天，按星期，按月的来执行的话，则可以放到前面相应的目录下面去。
linux的cron服务是每隔一分钟去读取一次/var/spool/cron，/etc/crontab,/etc/cron.d下面所有的内容。

## crontab 主配置文件

cron 的主配置文件是 **/etc/crontab**，它包括下面几行：

```bash
SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

# m h dom mon dow user  command
17 *  * * *   root   cd / && run-parts --report /etc/cron.hourly
25 6  * * *   root   test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.daily )
47 6  * * 7   root   test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.weekly )
52 6  1 * *   root   test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.monthly )
```

>前两行是用来配置 cron 任务运行环境的变量。SHELL 变量的值告诉系统要使用哪个 shell 环境（在这个例子里是 bash shell）；PATH 变量定义用来执行命令的路径。cron 任务的输出被邮寄给MAILTO 变量定义的用户名。如果 MAILTO 变量被定义为空白字符串（MAILTO=""），电子邮件就不会被寄出。HOME 变量可以用来设置在执行命令或脚本时使用的主目录。

# crontab 使用

`crontab -h` 可以查看crontab的参数说明。

`crontab -e` 编辑用户的计划任务。

`crontab -l` 列出用户的计划任务。

## crontab 命令格式

### 基本格式
```bash
# m    h   day mon  dow   user command
  *　　*　　*　　*　　*　　command
  分　 时　日　 月 　周　  命令 
```

| minute | hour | day | month | dayofweek | command |

* **minute** — 分钟，从 0 到 59 之间的任何整数
* **hour** — 小时，从 0 到 23 之间的任何整数
* **day** — 日期，从 1 到 31 之间的任何整数（如果指定了月份，必须是该月份的有效日期）
* **month** — 月份，从 1 到 12 之间的任何整数（或使用月份的英文简写如 jan、feb 等等）
* **dayofweek** — 星期，从 0 到 7 之间的任何整数，这里的 0 或 7 代表星期日（或使用星期的英文简写如 sun、mon 等等）
* **command** — 要执行的命令（命令可以是ls /proc >> /tmp/proc 之类的命令，也可以是执行你自行编写的脚本的命令。）


**星号（*）代表取值范围内的数字。**譬如，月份值中的星号意味着在满足其它制约条件后每月都执行。
**整数间的短线（-）代表从某个数字到某个数字。**譬如，1-4 意味着整数 1、2、3、4。
**用逗号（,）代表分开几个离散的数字。**譬如，3, 4, 6, 8 标明这四个指定的整数。
**正斜线（/）代表”每”，可以用来指定间隔频率。**在范围后加上 /&lt;integer> 意味着在范围内可以跳过 integer。譬如，0-59/2 可以用来在分钟字段定义每两分钟。间隔频率值还可以和星号一起使用。例如，*/3 的值可以用在月份字段中表示每三个月运行一次任务。 

### 例子

```bash
5     *      *      *    *     ls   #指定每小时的第5分钟执行一次ls命令
30    5      *      *    *     ls   #指定每天的 5:30 执行ls命令
30    7      8      *    *     ls   #指定每月8号的7：30分执行ls命令
30    5      8      6    *     ls   #指定每年的6月8日5：30执行ls命令
30    6      *      *    0     ls   #指定每星期日的6:30执行ls命令
                                    #[注：0表示星期天，1表示星期1，以此类推，
                                    #也可以用英文来表示，sun表示星期天，mon表示星期一等。]

30    3      10,20  *    *     ls   #每月10号及20号的3：30执行ls命令
                                    #[注：“，”用来连接多个不连续的时段]
25    8-11   *      *    *     ls   #每天8-11点的第25分钟执行ls命令
                                    #[注：“-”用来连接连续的时段]
*/15  *      *      *    *     ls   #每15分钟执行一次ls命令
                                    #[即每个小时的第0 15 30 45 60分钟执行ls命令]
30    6      */10   *    *     ls   #每个月中，每隔10天6:30执行一次ls命令
                                    #[即每月的1、11、21、31日是的6：30执行一次ls 命令。]

50    7      *      *    *     root run-parts /etc/cron.daily  
                                    #每天7：50以root 身份执行/etc/cron.daily目录中的所有可执行文件 
                                    #[注：run-parts参数表示，执行后面目录中的所有可执行文件。]
```

## 控制对 cron 的使用

**/etc/cron.allow** 和**/etc/cron.deny** 文件被用来限制对 cron 的使用。这两个使用控制文件的格式都是每行一个用户。两个文件都不允许空格。如果使用控制文件被修改了，cron 守护进程（crond）不必被重启。使用控制文件在每次用户添加或删除一项 cron 任务时都会被读取。

无论使用控制文件中的规定如何，根用户都总是可以使用 cron。

* 如果 cron.allow 文件存在，只有其中列出的用户才被允许使用 cron，并且cron.deny 文件会被忽略。
* 如果 cron.allow 文件不存在，所有在cron.deny 中列出的用户都被禁止使用 cron。     