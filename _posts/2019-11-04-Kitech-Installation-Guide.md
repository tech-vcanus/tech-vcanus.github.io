---
title: "Kitech Project Installation Guide"
data: 2019-11-04 00:00:00 -0000
categories: development
tags: Kitech project installation guide
---

Written by BGKim, VCANUS

# Docker Setting

## Redis
search and pull redis image
```
$ docker search redis
$ docker pull redis:latest
```
run container
```
$ docker run --name some-redis \ 
-d -p 6379:6379 \ 
redis
```

if you want access redis command line
```
$ docker run -it --link some-redis:redis --rm redis redis-cli -h redis -p 6379
```

## Maria DB
search and pull mariadb image
```
$ docker search mariadb
$ docker pull mariadb:latest
```
run container
```
$ docker container run -d -p 3306:3306 \
-v /volume/mariadb:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=1234 \
--name some-mariadb \
mariadb \
--max-allowed-packet=67108864
```

access mariadb command line
```
$ docker exec -it some-mariadb /bin/bash
# mysql -u root -p
Enter password: 1234
```

create database, user
```
> create database kitech;
> create user 'kitechUser'@'%' identified by 'password';
> grant all privileges on kitech.* to 'kitechUser'@'%';
> flush privileges;
> exit
```

create table and set base configuration.
```
# mysql -u kitechUser -p
> use kitech
> create table ... (see the Query document)
> set sql_safe_updates = 0;
```

# Project Module Setting

## module
sort
> pithos-nosql, talaria, kitech-collector, kitech-was, kitech-binder, pandora

hierarchy
> kitech-collector > pithos-nosql, pandora

> kitech-was

> kitech-binder > pithos-nosql, talaria


## setting
pithos-nosql
> src/main/resources/properties/redis.properties
```
redis.host=192.168.0.xx
redis.port=6379
```

talaria
>src/main/resources/properties/thrift_client.properties
```
thrift.client.ip=192.168.0.xx #thrift server ip
thrift.client.port=9091 #thrift server port
```

kitech-collector
>src/main/resources/properties/db.properties
```
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://192.168.0.xx:3306/kitech?useSSL=false&allowMultiQueries=true&characterEncoding=UTF-8&autoReconnection=true
spring.datasource.username=kitechUser
spring.datasource.password=password
```
>src/main/resources/application.properties
```
server.port=8081

kitech.was.host=192.168.0.xx
kitech.was.port=8080

kitech.binder.host=192.168.0.xx
kitech.binder.port=8082
```

kitech-was
>src/main/resources/properties/db.properties
```
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://192.168.0.xx:3306/kitech?useSSL=false&allowMultiQueries=true&characterEncoding=UTF-8&autoReconnection=true
spring.datasource.username=kitechUser
spring.datasource.password=password
```
>src/main/resources/application.properties
```
server.port=8080
```

kitech-binder
>src/main/resources/properties/db.properties
```
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://192.168.0.xx:3306/kitech?useSSL=false&allowMultiQueries=true&characterEncoding=UTF-8&autoReconnection=true
spring.datasource.username=kitechUser
spring.datasource.password=password
```
>src/main/resources/application.properties
```
server.port=8082

kitech.was.host=192.168.0.42
kitech.was.port=8080
```

# Run

1. kitech-was
> Run : src/main/java/com/vcanus/kitechwas/KitechWasApplication.class

2. kitech-binder
> Run : src/main/java/com/vcanus/kitechbinder/KitechBinderApplication.class

3. kitech-collector
> Run : src/main/java/com/vcanus/kitechcollector/KitechCollectorApplication.class
