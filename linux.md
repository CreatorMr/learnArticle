<!--
 * @@author: Creator
 * @LastEditTime: 2022-04-01 00:27:42
 * @Description:
-->

### 命令

##### 压缩命令

-   zip 格式

压缩文件或目录，
zip 压缩文件名.zip 源文件---压缩文件
zip -r 压缩文件名.zip 源文件----压缩目录

upzip 压缩文件名.zip 解压

-   gzip 高压

| 命令                      | 示例                       | 含义                                                              |
| ------------------------- | -------------------------- | ----------------------------------------------------------------- |
| gzip 源文件               | gzip a.txt                 | 压缩为.gz 格式的压缩文件，源文件会消失                            |
| gzip -c 源文件 > 压缩文件 | gzip -c a.txt > yun.txt.gz | 压缩为.gz 格式的压缩文件，源文件不会消失                          |
| gzip -r 目录              | gzip -r xx                 | 把目录下的每个子文件都变成压缩文件， 并删除源文件，当前目录无变化 |
| gzip -d 压缩文件名        | gzip -d yum.txt.gz         | 解压缩文件，不保留压缩包                                          |
| gunzip 压缩文件           | gunzip yum.txt.gz          | 解压缩文件，也不保留压缩包                                        |

-   .bz 压缩

| 命令                  | 示例               | 含义                                 |
| --------------------- | ------------------ | ------------------------------------ |
| bzip2 源文件          | bzip2 1.txt        | 压缩为.bz2 各式的文件， 不保留源文件 |
| bzip2 -k 源文件       | bzip2 -k 1.txt     | 压缩为.bz2 各式的文件， 保留源文件   |
| bzip2 -d 压缩源文件名 | bzip2 -d 1.txt.bz2 | 解压压缩包，不保留压缩包             |
| bunzip2 压缩源文件名  | bunzip2 1.txt.bz2  | 解压压缩包，不保留压缩包             |

-   tar 压缩

*   打包命令，只打包并不压缩
*   tar -cvf 打包文件名 源文件
    -   -c 打包
    -   -v 显示过程
    -   -f 指定打包后的文件名

```
tar -cvf book.tar book
```

-   x 解打包

```
tar -xcf book.tar
```

-   tar.gz

*   zip 可以压缩目录但压缩压缩效率不高， gzip 和 bzip2 压缩效率高但不支持目录
*   可以先打包问 .tar 格式，再压缩.gz 格式 -z 压缩为 .tar.gz 格式 -x 解压缩 .tar.gz 格式

| 命令                               | 示例                        | 含义                                   |
| ---------------------------------- | --------------------------- | -------------------------------------- |
| tar -zcvf 压缩包名.tar.gz 源文件   | tar -zcvf book.tar.gz book  | 可以先报为.tar 格式，再压缩为.gz 格式  |
| tar -zxvf 压缩包名.tar.gz          | tar -zxvf book.tar.gz       | 解压缩为.gz 格式                       |
| tar -jcvf 压缩包名 .tar.bz2 源文件 | tar -jcvf book.tar.bz2 book | 可以先报为.tar 格式，再压缩为.bz2 格式 |
| tar -jxvf 压缩包名.tar.bz2         | tar -jxvf book.tar.bz2      | 解压缩为.bz2 格式                      |

##### 关机和重启命令

-   shutdown

    -   -c 取消前一个关机命令
    -   -h 关机
    -   -r 重启

-   init
    init 0 关机
    init 6 重启

-   logout 退出登录

##### 查看用户信息

- w
 查看登录用户信息
 * USER 登录的用户名
 * TTY 登录的中断tty1 本地中断 pts/0 远程中断
 * FROM 登录的IP
 * LOGIN 登录时间
 * IDLE 用户闲置时间
 * JCPU 该中断所有进程占用的时间
 * PCPU 当前进程所占用的时间
 * WHAT 正在执行的命令

- who
查看登录用户信息
 * USER 登录的用户名
 * TTY 登录的中断tty1 本地中断 pts/0 远程中断
 * LOGIN 登录时间 登录的IP


- last 
  查看当前登录和过去登录的用户信息  默认读取 /var/log/wtmp 文件
  * 用户名
  * 登录终端
  * ip
  * 登录时间
  * 退出时间

- lastlog
  查看所有用户最后一次登录时间

##### 磁盘管理

- do
- du 文件大小
- GPT
- 格式化
- 挂在
- 添加swap交换分区

##### 文件查看
- cat
    * cat 用于连接文件并打印到标准输出设备上
    * cat [-AbeEnstTuv][--help][--version][fileName]
    * 参数
      * -n 或 --number : 由 1 开始对所有输出的行数标号
- more
    * 类似cat 会翻页
- head
  * 用来显示开头某个数量的文字区块
- tail
  * 查看文件的内容
  * -f 常用于查阅正在改变的数据
  * tail [参数][文件]
  * 参数
    * -f 循环读取
    * -n<行数> 显示文件的尾部n行的内容
    * 
- 第二页
   *  head -10 file | tail -5