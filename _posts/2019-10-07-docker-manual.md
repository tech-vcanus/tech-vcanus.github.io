---
title: "Docker Manual"
data: 2019-10-07 00:00:00 -0000
categories: development 
tags: development environment docker manual
---

Written by SGLee, VCANUS

# Setup

## Installation
CentOS
```
$ sudo yum install -y yum-utils \
  device-mapper-persistent-data \
  lvm2
$ sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
```
__특정 버전 설치__
```    
$ yum list docker-ce --showduplicates | sort -r
$ sudo yum install docker-ce-<VERSION_STRING> docker-ce-cli-<VERSION_STRING> containerd.io -nobest
```
__최신 버전 설치__
```    
$ sudo yum install docker-ce docker-ce-cli containerd.io nobest
```

Ubuntu
```
$ sudo apt update
$ sudo apt install apt-transport-https ca-certificates curl software-properties-common
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
$ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
$ sudo apt update
$ apt-cache policy docker-ce
docker-ce:
  Installed: (none)
  Candidate: 18.06.1~ce~3-0~ubuntu
  Version table:
     18.06.1~ce~3-0~ubuntu 500
        500 https://download.docker.com/linux/ubuntu bionic/stable amd64 Packages
     18.06.0~ce~3-0~ubuntu 500
        500 https://download.docker.com/linux/ubuntu bionic/stable amd64 Packages
     18.03.1~ce~3-0~ubuntu 500
        500 https://download.docker.com/linux/ubuntu bionic/stable amd64 Packages
	
# Installed: (none) 이면 docker 설치
$ sudo apt install docker-ce
```

## Start docker on boot 
A file of docker.service is already installed on /usr/lib/systemd/system. 
```
$ sudo systemctl enable docker.service
$ sudo systemctl start docker.service
$ sudo systemctl status docker.service
$ sudo usermod -aG docker $USER
```

### Start docker container on boot 
Refer some documents about service registration. 
The below make a docker container to be run automatically on boot.
```
$ sudo vi /etc/systemd/system/docker-container.service
```
__docker-container__
```
[Unit]
Description=Docker Container Service
Requires=docker.service
After=docker.service

[Service]
#Type=alyways
RemainAfterExit=yes
ExecStart=/usr/bin/docker start docker_container_name # <- modify here
ExecStop=/usr/bin/docker stop docker_container_name # <- modify here

[Install]
#WantedBy=default.target
WantedBy=multi-user.target
```

```
$ sudo systemctl start docker_container_name.service
$ sudo systemctl enable docker_container_name.service
```

__docker-compose__ 

1. add option
restart: always

2. example file(nats-node-1.yaml)
```
version: "3.5"
services:
  nats-node-1:
    network_mode: host
    image: nats
    restart: always
```
### Run services inside docker container on boot
make entry-point script (docker-entrypoint.sh). 
 - sleep prevents docker service from stopping after exit of script.
 - You have to use 'exec' instead of 'attach' because of sleep.
```
#!/bin/bash
service service-name start
while true;
do sleep 1d;
done
```

run entry-point script
```
$ docker run -itd --name docker-container-name -p ##:## -v /opt/service/data: /data/ /bin/bash/ -c 'docker-entrypoint.sh'
```

execute bash with root
```
$ docker exec -it -u root docker-container-name /bin/bash 
``` 

good example of docker-entrypoint.sh
```
# first arg is `-f` or `--some-option`
# or first arg is `something.conf`
if [ "${1#-}" != "$1" ] || [ "${1%.conf}" != "$1" ]; then
	set -- redis-server "$@"
fi

# allow the container to be started with `--user`
if [ "$1" = 'redis-server' -a "$(id -u)" = '0' ]; then
	find . \! -user redis -exec chown redis '{}' +
	exec gosu redis "$0" "$@"
fi

exec "$@"
```

# Docker Command
https://docs.docker.com/reference/
## Basic command
 - pull
 - images
 - rmi
 - rm
 - ps
 - build (important)
    * https://docs.docker.com/engine/reference/commandline/build/ 
    * refer how to make Dockerfile on the web
 - run
    * https://docs.docker.com/engine/reference/commandline/run/  
    * options
        ```
        --interactive, -i
        --detach, -d
        --tty, -t
        --user, -u
        --volumn, -v
        ```
 - attach
    * https://docs.docker.com/engine/reference/commandline/attach/ 
    * Description: Attach local standard input, output, and error streams to a running container  
    To stop a container, use CTRL-c. This key sequence sends SIGKILL to the container. If --sig-proxy is true (the default),CTRL-c sends a SIGINT to the container. If the container was run with -i and -t, you can detach from a container and leave it running using the CTRL-p CTRL-q key sequence. 
 - exec
    * https://docs.docker.com/engine/reference/commandline/exec/ 
    * options
        ```
        --detach , -d
        --env , -e 
        --interactive , -i 
        --tty , -t
        --user , -u
        --workdir , -w
        ``` 
## Reference 
 - http://pyrasis.com/Docker/Docker-HOWTO
 - http://raccoonyy.github.io/docker-usages-for-dev-environment-setup/

# Dockerfile command
https://docs.docker.com/engine/reference/builder/
## Basic command
 - FROM
    ```
    FROM <image>[:<tag>] [AS <name>]
    ```
 - MAINTAINER
 - COPY
 - RUN
    ```
    RUN ["executable", "param1", "param2"]
    ```
 - CMD
    ```
    CMD ["executable","param1","param2"]
    ```
 - ENV
 - ADD
    ```
    ADD [--chown=<user>:<group>] ["<src>",... "<dest>"]
    ```
    ```
    ADD test relativeDir/          # adds "test" to `WORKDIR`/relativeDir/
    ADD test /absoluteDir/         # adds "test" to /absoluteDir/ 
    ```
 - ENTRYPOINT
    * An ENTRYPOINT allows you to configure a container that will run as an executable. 
    ```
    ENTRYPOINT ["executable", "param1", "param2"]
    ``` 
    * 'List' type is much more preferred than 'Shell' type
    * CMD is used to set argument of ENTRYPOINT
    ```
    #!/bin/bash 
    INTERVAL=$1 
    while true; 
     do ps x; 
     sleep $INTERVAL; 
    done
    ```
    ```
    FROM ubuntu 
    Add loop.sh /usr/local/bin/loop.sh 
    ENTRYPOINT ["/usr/local/bin/loop.sh"] # exec form CMD ["1"]
    ```
 - VOLUME
## Reference
 - http://pyrasis.com/book/DockerForTheReallyImpatient/Chapter07/06
 - https://bluese05.tistory.com/77
 - https://joont92.github.io/docker/volume-container-%EC%B6%94%EA%B0%80%ED%95%98%EA%B8%B0/

# Docker compose
## Preparation
- docker-compose.yml
- Dockerfile
- docker-entrypoint.sh (shoulb be executable)
- xxx.conf
## Run
```
$ chmod 755 docker-entrypoint.sh
$ sudo docker-compose up --build -d
```
## example: docker-compose.yml 
```
version: '3'
services: 
  redis1: 
    image: redis:5.0.6 
    build: 
      context: .  
      dockerfile: Dockerfile 
      args: 
        - EXPOSEPORT=7001 # this will be used in Dockerfile
    network_mode: "host" 
    environment: 
      - CLIENTHOST=192.168.XX.XX 
      - CLIENTPORT=XXXX 
    volumes: 
      - ./data/1:/data 
    restart: always
```
## Docker-based Redis Cluster
https://github.com/sglee-net/docker-redis-cluster

## Reference
 - http://raccoonyy.github.io/docker-usages-for-dev-environment-setup/
 - https://success.docker.com/article/use-a-script-to-initialize-stateful-container-data

# Docker Swarm
## Reference
 - https://tech.osci.kr/2019/02/13/59736201/

