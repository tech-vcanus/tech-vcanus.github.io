---
title: "Setting for Flutter-based Development Environment"
data: 2022-05-04 00:00:00 -0000
categories: development 
tags: development environment setup installation flutter
---

Written by SGLee, VCANUS
# 참고
- https://velog.io/@okxooxoo/Flutter-Mac%EC%97%90-%EA%B0%9C%EB%B0%9C-%ED%99%98%EA%B2%BD-%EC%84%B8%ED%8C%85%ED%95%98%EA%B8%B0
  
# IOS 개발 환경
## Java, Python 등 기본 환경 설치
## XCode 설치
- 앱 다운로드 및 설치
- Command Line Tool 설치
```
$ xcode-select --install
```
## Rosetta 2 설치
```
$ sudo softwareupdate --install-rosetta --agree-to-license
```
## CocoaPods 설치
- Arm Chip 노트북인 경우 gem install cocoapods에 문제가 있음
- brew로 설치할 것을 권장
```
$ brew update
$ brew install cocoapods
```

# Android 스튜디오 설치
https://developer.android.com/studio
<img width="414" alt="image" src="https://github.com/user-attachments/assets/ae718ee3-c3eb-482b-8b4d-7d04fe1230ab" />


# Flutter 설치
## Homebrew 기반 설치
```
$ brew install --cask flutter
```
## Flutter Doctor로 개발환경 세팅 확인
```
$ flutter doctor
```
<img width="731" alt="image" src="https://github.com/user-attachments/assets/3f114049-b3b1-4fe0-b38b-d30995eb541f" />

## 추가 해결
- android 툴체인: 안드로이드 설치 참고
- android 라이센스
```
flutter doctor --android-licenses
```

