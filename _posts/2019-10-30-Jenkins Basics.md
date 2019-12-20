---
title: "How to use Jenkins - Basic"
data: 2019-10-30 08:00:00 -0000
categories: development 
tags: Jenkins Build
---

Written By Young-rae Shin([https://github.com/lived1024](https://github.com/lived1024))  

# Jenkins  
## 정의  
소프트웨어 개발 시 지속적으로 통합 서비스를 제공하는 툴.  
일명 Continuous Intergration (CI)라고 표현한다.  
예를 들어 Git을 사용할 때, Git의 Repository에 Push가 감지되면, Jenkins에서 자동으로 Build, Deploy한다.  

## 설치
### Requirements  
- JAVA(openJDK도 가능)
- MAVEN
- Git  
### 설치 순서
- 설치 파일 다운로드 : [공식 홈페이지](https://jenkins.io/) 다운로드  
    ![install1](https://user-images.githubusercontent.com/41990925/67818875-3e8f7a80-faf6-11e9-9d6c-ac4d33fbd1d8.png)    
    아래 화면에서 LTS버전으로 OS에 맞게 다운받는다!  
    ![install2](https://user-images.githubusercontent.com/41990925/67818877-418a6b00-faf6-11e9-9997-1c225155714f.png)  
    1. Window : 파일 압축해제 이후 설치파일 실행  
    2. Ubuntu : 설치 방법은 해당 [링크](https://fun25.co.kr/blog/jenkins-ubuntu-16-04-install/) 참조  
- 초기 설정 포트
    Jenkins default port : 8080 -> ex) 8000  
    Windows : 설치폴더 내 jenkins.xml
    Ubuntu
    ```
    $vi /etc/default/jenkins
    ```
    Mac
    ```
    $vi /usr/local/Cellar/jenkins/2.x.x/homebrew.mxcl.jenkins.plist
    ```
    
### 실행  
#### 첫 실행
- 주소창에 http://본인IP:8000 입력 (Window는 브라우저 자동 실행)  
    ![run1](https://user-images.githubusercontent.com/41990925/67833073-ee7cdc00-fb26-11e9-98ef-59d469dec6cb.png)  
- 위 화면 이후 아래와 같은 화면이 나온다.  
    ![run2](https://user-images.githubusercontent.com/41990925/67833072-ee7cdc00-fb26-11e9-9ee7-b9ee97fbd8b6.png)  
- 빨간색으로 강조된 경로에 있는 파일을 열어 해당 내용을 빈 칸에 넣는다.(스크린샷의 경로는 윈도우)  
    ![run3](https://user-images.githubusercontent.com/41990925/67833447-f9843c00-fb27-11e9-96d9-1078c30fa5a4.png)  
- 플러그인은 추천받은 그대로 이용  
    ![run4](https://user-images.githubusercontent.com/41990925/67833444-f9843c00-fb27-11e9-848f-fd9688f54aef.png)  
- 플러그인 설치화면을 넘어가면 admin 계정을 설정할 수 있다.  
    ![run5](https://user-images.githubusercontent.com/41990925/67833442-f9843c00-fb27-11e9-87b7-92b7edb302af.png)  
- admin 계정을 추가하지 않는다면 Save and Continue  
    ![run6](https://user-images.githubusercontent.com/41990925/67833440-f8eba580-fb27-11e9-8b5d-dfe4d4b7810b.png)  
- Jenkins에서 사용할 URL을 설정할 수 있다. 여기에서 Port를 다르게 적더라도 Jenkins 내부 설정파일에서 별도로 Port를 바꿔줘야 적용된다.  
    Jenkins 설치 폴더의 jenkins.xml에서 변경할 수 있다.  
    ![run7](https://user-images.githubusercontent.com/41990925/67833438-f8eba580-fb27-11e9-935c-3c643704ace1.png)  
-위와 같은 화면이 나온다면 첫 실행은 성공적으로 진행된 것이다.  
#### Jenkins Settings : Jenkins 관리
1. 시스템 설정 : Github Server 연동 설정  
    ![Setting1](https://user-images.githubusercontent.com/41990925/67833946-66e49c80-fb29-11e9-8a2d-56d0e634e8d7.png)  
    Github Server의 Name은 알아서 넣고, URL은 그대로 놔둔다.  
    그리고 Credentioal를 추가해야하는데 Github에서 토큰을 발급받아야한다.  
    ![Setting2](https://user-images.githubusercontent.com/41990925/67833945-66e49c80-fb29-11e9-9238-d55ab421ff53.png)  
    ![Setting3](https://user-images.githubusercontent.com/41990925/67834191-1c175480-fb2a-11e9-9715-b88049a8dec4.png)  
    해당 페이지에서 발급!  
    ![Setting4](https://user-images.githubusercontent.com/41990925/67834190-1c175480-fb2a-11e9-886a-7cf265ce36ef.png)  
    발급받은 Token을 아래 화면처럼 등록!  
    ![Setting5](https://user-images.githubusercontent.com/41990925/67834187-1c175480-fb2a-11e9-8070-cd7d01813cea.png)  
    Test 버튼을 누르면 정상적인 접속을 확인할 수 있다.  
    ![Setting6](https://user-images.githubusercontent.com/41990925/67834185-1b7ebe00-fb2a-11e9-9de9-20dc49fece66.png)  
2. Global Tool Configuration  
    Maven, Java, Git에 대한 설정을 한다.  
    ![Setting7](https://user-images.githubusercontent.com/41990925/67834403-a9f33f80-fb2a-11e9-9e0a-e46511250cc7.png)  
    Maven, Java는 설치폴더를, Git은 실행파일까지 Path를 잡아준다. (bin 폴더 내부의 git.exe)  
    ![Setting8](https://user-images.githubusercontent.com/41990925/67834405-ac559980-fb2a-11e9-8881-452ee90c8d04.png)  
3. 플러그인 관리  
    Build까지만 이용하려면 Git, Github 두 가지가 필요하지만 추천 플러그인에 포함되어있다.  
    단순히 Build까지 활용한다면 추가로 설정할 내용은 없다.  
    
### Job 생성 및 설정
1. 생성  
    ![run1](https://user-images.githubusercontent.com/41990925/67834758-9399b380-fb2b-11e9-9363-0c1ba0f37ca7.png)  
    Freestyle project로 생성!  
    ![run2](https://user-images.githubusercontent.com/41990925/67834757-93011d00-fb2b-11e9-9b69-1454ac9aaa48.png)  
2. 설정  
    Github의 레파지토리를 아래 두 곳에 붙여넣는다.  
    일반적인 http 프로토콜을 이용할 경우 에러가 발생하는 경우도 있다고 하니 git 프로토콜을 추천!  
    ![run3](https://user-images.githubusercontent.com/41990925/67835041-4f5ae300-fb2c-11e9-9587-fe5b9f783101.png)  
    깃 프로토콜은 아래에서 볼 수 있다.  
    ![run4](https://user-images.githubusercontent.com/41990925/67835040-4f5ae300-fb2c-11e9-9ae1-ff48bf3c779d.png)  
    SSH를 이용하여 연동을 완료해야 정상적으로 연결된다.  
    SSH 인증을 통과하지 못한다면 이전 스크린샷처럼 Repositories에 빨간 글씨로 표시된다.  
    SSH키 생성은 아래 코드를 이용하면 된다
    ```
    $ssh-keygen -t rsa
    ```
    SSH키 발급은 아래의 절차대로 따르자  
    ![run5-ssh1](https://user-images.githubusercontent.com/41990925/67834756-93011d00-fb2b-11e9-835f-6fb3ced7b27b.png)  
    엔터만 눌러 발급할 경우 경로, 파일명은 default로 생성된다.  
    스크린샷처럼 경로와 이름을 입력하면 그대로 생성.  
    ![run5-ssh2](https://user-images.githubusercontent.com/41990925/67834755-93011d00-fb2b-11e9-92f8-99679922a623.png)  
    pub확장자를 가진 파일은 아래처럼 등록!  
    ![run6](https://user-images.githubusercontent.com/41990925/67835384-2c7cfe80-fb2d-11e9-8705-31fdfebb5253.png)  
    대상이 되는 Github Repository의 Settings - Deploy Keys  
    ![run7](https://user-images.githubusercontent.com/41990925/67835393-3141b280-fb2d-11e9-8e9e-ec6958e4c0dd.png)  
    pub확장자로 생성된 파일을 메모장 또는 vi로 열어 해당 내용을 Key에 입력하고, 다른 파일은 Jenkins에 사용  
    ![run3](https://user-images.githubusercontent.com/41990925/67835041-4f5ae300-fb2c-11e9-9587-fe5b9f783101.png)  
    위 스크린샷에서 빨간 글씨 밑의 Credentials에 추가!  
    ![run8](https://user-images.githubusercontent.com/41990925/67835588-b5943580-fb2d-11e9-8f00-a7a9b1cd3aa0.png)  
    남은 파일 또한 메모장 또는 vi로 열어 해당 내용을 Credentials에 등록한다.  
    문제없이 등록되면 아래 화면처럼 빨간 글씨가 사라진다.  
    ![run9](https://user-images.githubusercontent.com/41990925/67835586-b5943580-fb2d-11e9-948e-075863eec31c.png)  
    Branch 입력 부분은 입력하지 않으면 모든 브랜치에 해당되고, 특정 브랜치만 할 경우에 입력하면 된다.  
3. Build  
    Build 탭에서는 아래처럼 Invoke top-level Maven targets를 추가하고 등록된 Maven을 이용한다.  
    ![build1](https://user-images.githubusercontent.com/41990925/67835828-584cb400-fb2e-11e9-832a-9fab1d8ad06f.png)  
    스크린샷과는 다르게 Goals에는 package -D maven.test.skip=true를 입력한다.  
    -D maven.test.skip=true는 test코드를 실행해보지 않고 Build하는 옵션.
    
### Build test
![run-build](https://user-images.githubusercontent.com/41990925/67836296-95657600-fb2f-11e9-9e90-a1d5db9b262e.png)  
우측의 Console Output을 클릭하면 Build 상황에 대한 로그화면이 뜬다.  
성공한 경우 아래처럼 뜬다.  
![run-success](https://user-images.githubusercontent.com/41990925/67836311-9e564780-fb2f-11e9-80a8-492b42c65a46.png)  
스크린샷에는 war파일로 packaging이 설정되어있너 war로 build가 된 상황이고, 이것은 pom.xml에서 <packaging>태그를 이용하면 간단하다.
    
### Github Webhook setting (push -> auto build)
해당 Job의 구성에서 아래처럼 체크  
![webhook setting1](https://user-images.githubusercontent.com/41990925/67837053-8384d280-fb31-11e9-9ff1-ba8395aee451.png)  
이후 대상이 되는 Github Repository - settings - Webhooks로 이동하고 추가!  
![webhook setting2](https://user-images.githubusercontent.com/41990925/67837371-3bb27b00-fb32-11e9-87ae-5e83ca2165c2.png)  
Payload URL에는 포트포워딩된 IP와 Port를 입력하고 /github-webhook/를 꼭 붙여준다!  
Ex) http://127.0.0.1:9999/github-webhook/  
Content type은 application/json 선택!  
연결에 성공한 경우 아래 화면처럼 초록색 체크 표시가 생긴다.  
![hook status](https://user-images.githubusercontent.com/41990925/67837721-0a867a80-fb33-11e9-8c80-6adeb950f086.png)  
  
이후 github에 push를 한다면 자동으로 build!

### OS에 따른 settings
 - Mac에서 jenkins 설치시 localhost, 127.0.0.1만 허용되고 192.168.0.xx는 접속이 안되는 경우가 있었다.  
 이 경우 아래 화면처럼 httpListenAddress를 삭제(or 주석)하면 정상적인 이용이 가능하다.  
 Port도 해당 이 파일에서 수정가능
 ![Mac default setting](https://user-images.githubusercontent.com/41990925/71219577-ebbd8c80-2308-11ea-8338-12a2b9727fcc.png)    
 - Mac에서 jenkins 설정 시 default path (git의 경로는 "which git"으로 경로를 찾을 수 있다.)
 ![Mac default path](https://user-images.githubusercontent.com/41990925/71220206-1f99b180-230b-11ea-8fb7-a4d57c57d4e5.png)  
 - Ubuntu의 기본 설정 파일 : /etc/default/jenkins  
 해당 위치에서 jenkins에서 사용할 port번호를 변경
