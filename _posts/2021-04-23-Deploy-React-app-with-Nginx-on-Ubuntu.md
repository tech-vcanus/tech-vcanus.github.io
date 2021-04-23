---
title: "Deploy React app with Nginx on Ubuntu"
tags: cra react nginx nvm ubuntu
toc: true
toc_sticky: true
---

# Deploy React app with Nginx on Ubuntu🥕


Written By [Jun Park](https://github.com/junpark-vcanus), VCANUS

Ubuntu 환경에 Nginx를 활용하여 React App 배포하기

## 📌 Build React App

### 1. Build

```zsh
$ npm run build # build 폴더 생성
$ cd build # 결과물 확인
$ pwd
/home/vcanus/react-app/build
```

## 📌 [Ngnix](https://nginx.org/en/)에 React App 배포

### 1. Nginx 설치

- 설치

```zsh
$ sudo apt-get install nginx
```

- 설치 확인

```zsh
$ nginx -v
nginx version: nginx/1.18.0 (Ubuntu)
```

### 2. React App 배포(build 경로 등록)
- 기존 conf 파일 백업

```zsh
$ sudo cp -r /etc/nginx/sites-available/ /etc/nginx/sites-available-default
$ sudo cp -r /etc/nginx/sites-enabled/ /etc/nginx/sites-enabled-default
$ sudo rm /etc/nginx/sites-available/default
$ sudo rm /etc/nginx/sites-enabled/default
```

- conf 파일 생성

```
$ sudo vi /etc/nginx/sites-available/app.conf
```

- conf에 작성
  - listen: 포트 설정
  - root: React App build 폴더 경로
  - index: redirect 대상
  - try_files: 모든 주소에 대한 요청을 react 내부 router에서 처리하기 위해 index.html로 모든 요청을 redirect

```text
server {
	listen 8089;
	location / {
		root	/home/vcanus/react-app/build;
		index	index.html index.htm;
		try_files $uri $uri/ /index.html; 
	}
}
```

- 심볼릭 링크 생성

```zsh
$ sudo ln -s /etc/nginx/sites-available/app.conf /etc/nginx/sites-enabled/app.conf
```

### 3. Nginx 실행

```zsh
sudo systemctl stop nginx
sudo systemctl start nginx
sudo systemctl status nginx
```

## ❗️ Ubuntu에 Node.js, NPM 설치

### 1. NVM 설치
- [NVM](https://github.com/nvm-sh/nvm): Version manager for Node.js
- 다른 버전의 node.js를 사용할 때 편리
- 설치: NVM 최신 버전 확인 후 설치

```zsh
# 작성일 기준 0.37.2
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh
```

- 확인

```zsh
$ nvm --version
```

- 확인 오류 시(nvm: command not found)

```zsh
$ source ~/.zshrc # zsh
$ source ~/.bashrc # bash
$ . ~/.profile # ksh
```

### 2. NVM로 Node.js 설치
- NVM에 등록된 모든 Node.js 버전 확인

```zsh
$ nvm ls-remote
```

- 마지막 LTS 버전 확인 및 설치

```zsh
$ nvm version-remote --lts 
v14.16.0
$ nvm install 14.16.0 
```

```zsh
# 알아서 마지막 LTS 버전 설치
$ nvm install --lts
```

- 설치 확인

```zsh
$ node -v
v14.16.0
$ npm -v
6.14.11
```

## 📚 References
- [React를 Nginx웹 서버에 배포하기](https://www.hanumoka.net/2019/12/29/react-20191229-react-nginx-deploy/)
- [ubuntu 16.04 nvm 설치 및 nodejs 설정하기](https://trustyoo86.github.io/nodejs/2019/02/18/ubuntu-nvm.html)
