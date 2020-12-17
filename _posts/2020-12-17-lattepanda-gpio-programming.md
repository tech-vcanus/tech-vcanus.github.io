---
title: "LattePanda GPIO"
tags: DAC Arduino setup
toc: true
toc_sticky: true
---

Written By [HJ Jang](https://github.com/hei-jung), VCANUS

[참고링크: LattePanda 페이지](http://docs.lattepanda.com/content/1st_edition/vs_programming/)

## PC 설정

### 1. 개발자 모드 ON

Windows 설정 > 업데이트 및 보안 > 개발자용 > 개발자 모드 `켬`으로 설정

..이미지..

### 2. LattePanda.Firmata 라이브러리 다운로드

[여기서](https://github.com/LattePandaTeam/LattePanda-Development-Support) ZIP 파일 다운로드

### 3. Arduino 로드 

#### (1) LattePanda의 GPIO를 쓸 수 있는 프로그램 로드

File > Examples > Firmata > StandardFirmata<br>
(파일 > 예제 > Firmata > StandardFirmata)

#### (2) 보드 및 포트 설정

- Tools > Board > "Arduino Leonardo" (툴 > 보드 > "Arduino Leonardo")<br>
- Tools > Port > "COMX (Arduino Leonardo)" (툴 > 포트 > "COMX (Arduino Leonardo)")

## `C#` 프로젝트

1. Visual Studio에서 새 프로젝트 생성(콘솔 앱(.NET Framework))
2. 위에서 다운 받은 라이브러리 파일에서 Arduino.cs를 프로젝트에 추가

Program.cs에 라이브러리 불러오기

```cs
using LattePanda.Firmata;
```

클래스 사용

```cs
Arduino arduino = new Arduino();
```

## `C#` 예제



