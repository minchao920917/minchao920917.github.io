---
layout: post
title:  "linux服务器端操作命令行"
date:   2018-05-12 23:00:54
categories: Linux
tags:	Linux
excerpt:	linux服务器端操作命令行
mathjax: true
author:	闵超
---

* content
{:toc}


    http://bbs.jeecms.com/azsy/65364_2.jhtml

    linux centos7系统 
    jdk1.7.0_65 
    tomat7 
    mysql5.7 


##      cat default.pass 获取数据库密码

##      登陆mysql:	mysql -uroot -p


##      修改数据库密码  

    use mysql;
    update user set password=passworD("123456") where user='root';
    flush privileges;
    exit;


##      数据库开放权限访问：

        GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'test' WITH GRANT OPTION;
        
        GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '123456' WITH GRANT OPTION;
        
        flush privileges;
        exit;


##      数据库启动，停止，重启:	service mysqld (start|stop|restart)



    chmod -R a+w /yjdata/www/www/ROOT 永久可写
    
    service nginx restart 重启服务器


##      重启服务器

    /yjdata/www/tomcat.sh stop
    /yjdata/www/tomcat.sh start

###     日志查看

    tail -f /var/tomcat/tomcat-7/logs/catalina.out




