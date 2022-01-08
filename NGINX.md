
### Nginx 

### 安装配置命令
```
wget -c https://nginx.org/download/nginx-1.11.6.tar.gz
tar -zxvf nginx-1.11.6.tar.gz
cd nginx-1.11.6


yum install gcc-c++
yum install -y pcre pcre-devel zlib  zlib-devel openssl openssl-devel


./configure
make
make install
whereis nginx


cd /usr/local/nginx/conf
cp nginx.conf nginx.conf.back
vi nginx.conf


cd /usr/local/nginx/sbin/
./nginx 
./nginx -s stop
./nginx -s quit
./nginx -s reload


ps aux|grep nginx
```

### 使用场景

- 静态资源服务
    * 通过本地文件系统提供服务

- 反向代理服务
    * NGINX强大的性能
    * 缓存
    * 负载均衡

- API服务
    * OpenResty



Nginx ---> 应用服务-----> 数据库/ 缓存服务

应用服务：要求开发效率高，运行效率很低、qps、tps、并发都受限制的。---> 需要将很多应用服务组成一个集群提供高可用性，需要NGINX 反向代理功能可以把动态请求传导给应用服务
上述产生的集群需要
- 动态扩容
- 容灾处理
所以反向代理必须具有负载均衡功能


反向代理--缓存，缓存加速


NGINX 直接访问数据库等 利用NGINX强大的并发，业务防火墙--api服务