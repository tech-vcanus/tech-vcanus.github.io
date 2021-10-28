---
title: ClickOnce Publishing .NET Framework
date: 2021-10-28
tags: clickonce .net
toc: true
toc_sticky: true
comments: true
---

Written By [David Roh](https://github.com/tsedek), VCANUS

# ClickOnce Publishing .NET Framework

## Requirements

- 배포 파일 다운로드 서버

## Make clickOnce

1. 배포하고자하는 Project - properties
2. 좌측 메뉴 항목중 Publish
![publish_menu](https://user-images.githubusercontent.com/51553425/139192951-7e5542e0-c278-4648-a6ee-169afc0a33b5.png)
3. Publishing Folder Location : clickOnce 배포파일을 만들고자 하는 경로 설정
	- FTP경로 또는 파일 경로만 가능
4. Installation Folder URL : 배포파일을 다운받을 URL(Server) 주소
5. Install Mode 선택 : Online only or Offline install
6. Prerequisites 설정  
![prerequisites](https://user-images.githubusercontent.com/51553425/139197210-2c5f1d35-a16b-45f4-917c-0a37cf4c2112.png)
	1. Create setup program to install prerequisite components를 체크
	2. 필요한 구성 요소 선택
7. Update 설정  
![update](https://user-images.githubusercontent.com/51553425/139193041-894d50dd-5188-4e21-83c5-a4995dfba217.png)
	1. The applicatino sholud check for updates 체크
	2. 세부 업데이트 옵션 설가
8. 기타 옵션 설정  
![option1](https://user-images.githubusercontent.com/51553425/139193101-61c9cb46-076f-4dae-b0dd-70924f015947.png)
![option2](https://user-images.githubusercontent.com/51553425/139193198-f65013da-cca2-4bde-bccf-926417f72200.png)
9. Publish Now 클릭
	- Publish Wizard 클릭시 publish location경로 설정과 Install Mode선택을 다시 하고 배포가능. 다른 설정을 변경 불가

- Publish Version
Automatically increment revision with each publish 클릭시 배포시마다 버젼 증가.
