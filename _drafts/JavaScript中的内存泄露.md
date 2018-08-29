#  JavaScript内存泄露


## 	介绍——什么是内存泄漏

内存泄露是每一个开发者都必须面对的问题，即使拥有内存管理的语言，也有内存可能会泄露的情况。
程序的运行需要内存，只要程序程序需要使用内存，操作系统或者runtime（运行时）就必须提供内存。
引起内存泄露的原因有很多，变慢、崩溃、高延迟。甚至是一些和其他应用一起用所出现的问题。

内存泄露本质上是：由于某些原因不再需要的内存没有被操作系统或者空闲内存池回收。通俗一点讲，就是不再用到的内存，没有及时释放，就叫做内存泄露(memory leak)。

[阮一峰](http://www.ruanyifeng.com/blog/2017/04/memory-leak.html)

[内存泄露的4中避免方法](http://mp.weixin.qq.com/s?__biz=MzAwNjI5MTYyMw==&mid=2651494298&idx=1&sn=c1b0f2159311a09a70152de54e07d607&chksm=80f19e52b7861744836684a3b3e2adb7c5dd7d540a6fc094ec0caf317589d883fc131df5e4dd&mpshare=1&scene=23&srcid=0609ILYwIAPnUzVTdEPo3xHg#rd)