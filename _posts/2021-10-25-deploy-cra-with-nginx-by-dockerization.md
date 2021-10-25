---
title: "Deploy CRA with NGINX by Dockerization"
date: 2021-10-25
tags: cra react nginx docker dockerfile
toc: true
toc_sticky: true
comments: true
---

# Deploy CRA with NGINX by Dockerization🥕


Written By [Jun Park](https://github.com/junpark-vcanus), VCANUS

CRA react app을 docker를 통해 NGINX 서버에 배포하기


## 📌 Docker 이미지 생성 준비

### 1. CRA build

```bash
user@app $ yarn build
```

- 만약 `build` 폴더를 개발 서버에 이동시켜 작업하는 경우


```bash
# -r: recursive
user@app $ scp -r ./build {username}@{ip_address}:{target_dir}
```

### 2. NGINX 설정 폴더 conf.d 및 파일 default.conf 생성
- `React-Router`를 사용하지 않는 경우 관련 작업은 생략 가능
- `default.conf` 생성


```bash
user@app $ mkdir conf
user@app $ mkdir conf/conf.d
user@app $ touch conf/conf.d/default.conf
```

- 아래 내용을 `deafult.conf`에 작성


```
server {
  listen 80;
  
  location / {
    root    /usr/share/nginx/html;
    index    index.html index.htm;
    try_files $uri $uri/ /index.html;
  }
  
  error_page  500 502 503 504 /50x.html;
  
  location = /50x.html {
    root    /usr/share/nginx/html;
  }
}
```

### 3. Dockerfile 생성
- `Dockerfile` 생성


```bash
user@app $ touch dockerfile-react-nginx # 이름을 Dockerfile로 하면 Docker Image 생성 시 파일 지정 옵션(-f) 생략 가능
```

- 아래 내용을 `dockerfile-react-nginx`에 작성


```
FROM nginx:latest # NGINX docker 최신 버전 이미지를 활용하여

# >> React-Router 사용 시 >>
RUN rm -rf /etc/nginx/conf.d # 기존 NGINX 설정 파일 삭제
COPY conf /etc/nginx # conf.d 폴더를 컨테이너로 복사
# << React-Router 사용 시 <<

COPY build /usr/share/nginx/html # build 파일을 컨테이너로 복사

EXPOSE 80 # NGINX 포트 개방
CMD ["nginx", "-g", "daemon off;"]
```


## 📌 Docker로 배포

### 1. Docker Image 생성

- `dockerfile-react-nginx`를 사용하여 `docker-react-nginx`(이름 무관)라는 `Docker Image` 생성


```bash
user@app $ docker build -f dockerfile-react-nginx -t docker-react-nginx .
user@app $ docker image list # image 생성 확인
REPOSITORY          TAG     IMAGE ID      CREATED         SIZE
docker-react-nginx  latest  9f2ece875241  10 seconds ago  100MB
...                 ...     ...           ...             ...
```

- 생성 과정에서 \<none\> 이미지가 생성된 경우 원인(주로 이미지 생성 시 오류 발생으로 인함) 확인 후 정리해주면 좋음

### 2. Docker Image를 Container로 생성 및 실행 

- my-new-app이라는 `Container`를 생성 및 실행


```bash
user@app $ docker run -it -d -p 80:80 --name=my-new-app docker-react-nginx
user@app $ docker ps # container 생성 확인
```

## ❗️ CRA Build부터 Dockerfile로 관리하는 경우 

- build 시 `node` 버전을 관리할 수 있는 장점
- 아래 내용으로 `dockerfile-react-nginx`에 작성


```
FROM node:latest as build # node 최신 버전 이미지를 build라는 스테이지로 활용

RUN mkdir /app
ENV PATH /app/node_modules/.bin:$PATH # 스테이지 OS에 환경변수 추가
COPY package.json /app
RUN npm install --silent
RUN npm install react-scripts@latest -g --silent

COPY . /app # 프로젝트 복사
RUN npm run build # CRA build
  
FROM nginx:latest # NGINX docker 최신 버전 이미지를 스테이지로 활용

# >> React-Router 사용 시 >>
RUN rm -rf /etc/nginx/conf.d # 기존 NGINX 설정 파일 삭제
COPY conf /etc/nginx # conf.d 폴더를 컨테이너로 복사
# << React-Router 사용 시 <<

COPY --from=build /app/build /usr/share/nginx/html # builder 스테이지의 build 파일을 NGINX 컨테이너로 복사

EXPOSE 80 # NGINX 포트 개방
CMD ["nginx", "-g", "daemon off;"]
```

## 📚 Reference
- [Michael Herman: Dockerizing a React App](https://mherman.org/blog/dockerizing-a-react-app/)
- [StackExchange: How to copy files from one machine to another using ssh](https://unix.stackexchange.com/questions/106480/how-to-copy-files-from-one-machine-to-another-using-ssh)
