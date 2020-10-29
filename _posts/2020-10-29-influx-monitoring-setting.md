---
title: C# Influx Monitoring Setting
tags: setup
toc: true
toc_sticky: true
---

Written By [HJ Jang](https://github.com/hei-jung), VCANUS


## 1. Equipments

- LattePanda Alpha 800s 2개
  - Ubuntu
    - 서버로 사용: NATS Server 설치
  - Windows
    - 모니터링 용도
  - **참고.** 혼동을 피하려고 Windows가 설치된 보드에는 `W`라고 표기해뒀습니다.
- ipTIME T5004 유선공유기
  - LAN 포트 두 개에 각각 서버용과 모니터링용 라떼판다 연결

	
## 2. Ubuntu 환경

우분투가 설치된 서버용 보드의 전원을 켠다.

### 참고: 라떼판다 전원 켜는 방법

```
i) 팬 전선이 연결된 커넥터 옆의 하얀색 스위치를 5초 이상 누른다.
ii) 보드에 파란색 불이 들어와 멈춰 있으면 전원이 켜진 것.
파란색 불이 깜빡거릴 경우 스위치에서 손을 떼고 다시 5초 이상 눌러본다.
```

터미널 실행

### (1) IP 확인

보통 `192.168.0.4`로 고정되어 있지만 혹시 모를 상황에 대비하여 확인

### (2) NATS server 실행

```
$ docker run nats
```

![run_nats](https://user-images.githubusercontent.com/40985307/97509890-cbe60300-19c6-11eb-9ce3-7367750217a9.png)

### (3) NATS server 동작 확인

```
$ docker ps
```

![ps](https://user-images.githubusercontent.com/40985307/97509889-ca1c3f80-19c6-11eb-93ad-d14f7f86fe8c.png)

## 3. Windows 환경

윈도우즈가 설치된 모니터링용 보드의 전원을 켠다.

### (1) Visual Studio에서 vcs-nats-exam 열기

위의 과정에서 IP주소가 `192.168.0.4`가 아닐 경우, 코드 상의 IP주소 수정

### (2) vcs-nats-exam 배포파일 실행

아래와 같이 True 뜨면 정상 동작

![true](https://user-images.githubusercontent.com/40985307/97509886-c7b9e580-19c6-11eb-9bf4-6efb807bb6d4.png)

### (3) vcs_influx_monitoring 배포파일 실행
