---
title: "Grafana Customed React Plugin Install Tutorial"
data: 2020-03-25 00:00:00 -0000
categories: development 
tags: Grafana, react
toc: true
toc_sticky: true
---

Written By Park SunHong, VCANUS

※ 해당 튜토리얼은 grafana v6.7.1을 기준으로 작성되었음
## 순서 요약
1. docker에서 grafana image 생성
2. docker container 내부에 customed plugin 설치
3. plugin의 node_modules에 git package 설치   
4. 기타 유의사항
  
  
   
### 1. docker에서 grafana image 생성
```
$ docker pull grafana/grafana:6.7.1  // 그라파나 image 생성(버전을 적어주지 않으면 latest 버전이 다운됨)
$ sudo docker run -d --name=(컨테이너 이름) -p 3000:3000 -v (컨테이너와 연결할 폴더 경로):(외부와 연결할 컨테이너 내부 폴더 경로) grafana/grafana 
```
* 볼륨 지정(-v 옵션)은 컨테이너 생성시 수행해주어야 한다. (볼륨 지정은 필수는 아니나 편의상 권장함)  
* 윈도우의 wsl을 이용할 경우, 컨테이너와 연결할 폴더 경로는 C:\\\로 시작하는 형식이 아닌 /mnt/c/로 시작하는 형식임을 주의
* 외부와 연결할 컨테이너 내부 폴더 경로는 /var/lib/grafana/plugins 를 권장한다.

### 2. docker container 내부에 customed react plugin 설치
plugin 코드를 컨테이너의 /var/lib/grafana/plugins 에 저장하거나, 컨테이너와 연결된 외부 디렉토리에 저장한다. (각 플러그인 폴더 단위로 저장)   
컨테이너 내부 경로에 직접 들어가 코드를 이식해도 되지만 볼륨 
연결된 외부 디렉토리에서 수행하는 것이 여러모로 편리하다.  
컨테이너 내부 경로에 직접 들어갈 경우는 터미널에 다음을 입력 :  
```
$ docker exec -it -u 0 (컨테이너 이름) bash  // 컨테이너 내부에 관리자 권한을 갖고 들어감
$ cd /var/lib/grafana/plugins   // 플러그인 폴더가 위치하는 경로
```


### 3. plugin의 node_modules에 git package 설치
git package를 이용할 시 personal key를 필요로 하므로 해당 프로그램을 설치할 컴퓨터의 global에 .npmrc 파일을 만든 후 github에서 발급하는 personal key를 적어 저장해 두어야 한다.  
* github personal access token을 발급받는 방법 : 
1. token을 발급받을 github 계정 메뉴에서 Settings -> Developer settings -> Personal access tokens  
2. Generate new token 클릭
3. repo 콤보 박스에 체크
4. write:packages, read:packages, delete:packages 중 필요한 사항에 체크  
5. Generate token 클릭

token을 발급받았다면 터미널을 열고  
```
$ vi ~/.npmrc
```
.npmrc 파일이 열리면 다음과 같은 형식으로 작성한다 : 
```
//npm.pkg.github.com/:_authToken=(github 계정에서 발급한 token)
```
이를 저장하면 해당 컴퓨터에서 token을 발급한 github 계정에서 이용할 수 있는 repository에 대해 token generate 시 설정했던 권한이 생긴다.   

또한 컨테이너 안 /var/lib/grafana/plugins 경로 안의 플러그인들 중 github package을 이용할 플러그인의 폴더 내부에 .npmrc 파일을 만들어 다음과 같이 적어 저장해야 한다.
```
@(github package가 존재하는 repository name):registry=https://npm.pkg.github.com/
```

### 4. 기타 유의사항
* react plugin 코드를 심은 후 dependency를 다운받으려면 컨테이너 안에 yarn이 설치되어 있어야 한다.  
* yarn을 설치하기 위해서는 nodejs가 설치되어 있어야 한다.
* wsl을 쓰거나 우분투를 쓰는 경우 다음 주소의 설명대로 nodejs를 설치하면 된다.
https://github.com/nodejs/help/wiki/Installation
* dependency를 다운받으려면 plugin 폴더에 들어가서 터미널에 yarn install을 쳐준다.
* dependency가 모두 설치되면 yarn build를 수행해준다.
