---
title: "Linux RTOS"
date: 2020-06-05
categories: development
tags: RTOS
---

Written By [KJ Jang](https://github.com/jjangchan), VCANUS

## 1. 리눅스 기반의 Real-time OS
모든 OS는 preemptive한 작업을 수행을 보장한다. preemptive 란 프로세스 간 우선 순위를 정하고, 현재 수행 중인 프로세스가 다른 프로세스로부터 interrupt를 받으면 수행 하던 프로세스를 내려 놓은 뒤 우선순위가 높은 프로세스를 먼저 처리하는 것을 말하는데, 사실 이는 OS의 정말 기본 중의 기본 컨셉이기 때문에 리눅스는 이 기능을 자체적으로 내장하고 있다. 따라서 하드웨어만 어느 정도 받쳐준다면 어느 정도의 RT 기능은 일반 리눅스도 충분히 커버 할 수 있다.

### 1.1 일반 리눅스 와 차이점
차이점은 __"시스템 콜에 대한  Preemptive"__ 이다.
일반 리눅스는 interrupt가 들어왔을 때 현재 수행 중인 시스템을 콜을 끝낸 뒤 Context Swiching이 일어나지만, __RT 커널 기반의 리눅스는 현재 작업 중인 프로세스의 시스템 콜 수행마저도 interrupt를 걸어 작업 Swiching에 대한 Latency를 최소화 한다.__



## 2. 리눅스에서 RT 기능 사용법

### 2.1 리눅스 Scheduling의 종류

__1. SCHED_OTHER(또는 SCHED_NORMAL)__

일반 프로세스가 사용하는 타입의 Policy

__2. SCHED_FIFO, SCHED_RR__

RT를 위한 Scheduling Policy

### 2.2 Priority 제어하기
__1. nice 또는 renice__

* +19 ~ -20 값을 가지며, __-20이 가장 높은 Priority 값__
* 일반 프로세스 레벨인 __SCHED_OTHER__ 에서 동작 가능
* PR(priority) 계산 공식은 __PR = 20 + NI__

__2. renice 명령어__
    
```
$ renice [priority 값] -p [프로세스 번호]
```


__3. chrt__
* +1 ~ +99 값을 가지며, 높은 값일수록 높은 Priority를 의미
* RT 프로세스 레벨, Scheduling Policy를 변경 가능
* PR(priority) 계산 공식은 __PR = -1 -rt_priority__

__4. chrt 명령어__

```
$ chrt [policy] -p [priority 값] [프로세스 번호]
```

__5. C,C++ 로 프로세스 우선순위 및 스케줄링 정책 변경하기__
```
#include <sched.h>
#include <stdint.h>
#include <stdio.h>
#include <string.h>
#include <sys/syscall.h>
#include <unistd.h>
 
struct sched_attr {
   uint32_t size;              /* Size of this structure */
   uint32_t sched_policy;      /* Policy (SCHED_*) */
   uint64_t sched_flags;       /* Flags */
   int32_t  sched_nice;        /* Nice value (SCHED_OTHER,
                                  SCHED_BATCH) */
   uint32_t sched_priority;    /* Static priority (SCHED_FIFO,
                                  SCHED_RR) */
   /* Remaining fields are for SCHED_DEADLINE */
   uint64_t sched_runtime;
   uint64_t sched_deadline;
   uint64_t sched_period;
};
 
// 실제로 스케줄링 속성을 변경하는 sched_setattr 함수
static int sched_setattr(pid_t pid, const struct sched_attr *attr, unsigned int flags)
{
    return syscall(SYS_sched_setattr, pid, attr, flags);
}
 
int main() {
    int result;
 
    struct sched_attr attr;
    // 초기화
    memset(&attr, 0, sizeof(attr));
    attr.size = sizeof(struct sched_attr);
    
    // RT 프로세스 사용 
    attr.sched_priority = 95; // 우선순위 값 : 95 -> 135였나.. 를 의미
    attr.sched_policy = SCHED_FIFO; // SCHED_FIFO는 상수로서 정의되어 있다.
    
    /* 
    
    //일반 프로세스 사용
    attr.sched_nice = 19 // ni(-20 ~ 19)
    attr.sched_policy = SCHED_OTHER
    
    */
 
    // 스케줄링 속성 
    result = sched_setattr(getpid(), &attr, 0);
    if (result == -1) {
        perror("Error calling sched_setattr.");
    }
}
```

## 3. Linux RTOS 와 Timer code 및 실험 결과
### 1. c++ code

```
/
// Created by vcanus on 20. 5. 28..
//
#include <iostream>
#include <string.h>
#include <sys/time.h>
#include <time.h>
#include <chrono>
#include <algorithm>

#include <signal.h>
#include <unistd.h>
#include <mutex>
#include <thread>

#include <sched.h>
#include <sys/syscall.h>
#include <unistd.h>
#include <stdint.h>

using namespace  std;

chrono::steady_clock::time_point start_clock;
chrono::steady_clock::time_point end_clock;
long min_time = 2000000;
long max_time = 0;
double average = 0;
int cnt = 0;
int error_time = 0;

struct sched_attr {
    uint32_t size;              /* Size of this structure */
    uint32_t sched_policy;      /* Policy (SCHED_*) */
    uint64_t sched_flags;       /* Flags */
    int32_t  sched_nice;        /* Nice value (SCHED_OTHER,
                                  SCHED_BATCH) */
    uint32_t sched_priority;    /* Static priority (SCHED_FIFO,
                                  SCHED_RR) */
    /* Remaining fields are for SCHED_DEADLINE */
    uint64_t sched_runtime;
    uint64_t sched_deadline;
    uint64_t sched_period;
};

// 실제로 스케줄링 속성을 변경하는 sched_setattr 함수
static int sched_setattr(pid_t pid, const struct sched_attr *attr, unsigned int flags)
{
    return syscall(SYS_sched_setattr, pid, attr, flags);
}


void timer_handler(int sig,siginfo_t *si,void *uc)
{
    cnt +=1;
    end_clock = chrono::steady_clock::now();
    long elapsed_time = chrono::duration_cast<chrono::microseconds>(end_clock-start_clock).count();
    min_time = min(min_time,elapsed_time);
    max_time = max(max_time ,elapsed_time);
    average += elapsed_time;
    //cout << elapsed_time << endl;

    if(elapsed_time <= 9000 || elapsed_time >= 11000){
        error_time++;
        //cout << "error_time : "  << elapsed_time << endl;
        //cout <<  "error_cnt : "<< error_time << endl;
    }

    for(int i=0; i<=100; i++)
    {

    }

    start_clock = chrono::steady_clock::now();
}

int createTimer(timer_t *timerID, int sec , int msec)
{
    struct sigevent te;
    struct itimerspec its;
    struct sigaction sa;
    int sigNo = SIGRTMIN;

    /* Set up signal handler */
    sa.sa_flags = SA_SIGINFO;
    sa.sa_sigaction = timer_handler; // 타이머 호출 함수
    sigemptyset(&sa.sa_mask);

    if(sigaction(sigNo, &sa , NULL) == -1)
    {
        cout << "sigaction error" << endl;
        return -1;
    }

    /* Set and enable alarm */
    te.sigev_notify = SIGEV_SIGNAL;
    te.sigev_signo = sigNo;
    te.sigev_value.sival_ptr = timerID;
    timer_create(CLOCK_REALTIME, &te , timerID);

    its.it_interval.tv_sec = sec;
    its.it_interval.tv_nsec = msec * 1000000;

    its.it_value.tv_sec = sec;
    its.it_value.tv_nsec = msec * 1000000;

    timer_settime(*timerID,0 ,&its,NULL);
}

int main() {

    int result;

    struct sched_attr attr;
    // 초기화
    memset(&attr, 0, sizeof(attr));
    attr.size = sizeof(struct sched_attr);

    attr.sched_nice = 19;
    attr.sched_policy = SCHED_OTHER; // SCHED_FIFO는 상수로서 정의되어 있다.

    // 스케줄링 속성
    result = sched_setattr(getpid(), &attr, 0);
    if (result == -1) {
        perror("Error calling sched_setattr.");
    }


    timer_t timerID;
    /*
     * parame
     * */
    createTimer(&timerID,0,10);
    start_clock = chrono::steady_clock::now();
    int lv = 0;

    /* Do busy work . */
    thread t1([&](){
        sleep(60);
    });
    t1.join();

    cout << "total cnt : " << cnt << endl;
    cout << "error cnt : " << error_time << endl;
    cout << "min_time : " << min_time << endl;
    cout << "max_time : " << max_time << endl;
    cout << "average : " << average/cnt << endl;
    return 0;
}
```
ß
### 2. cmake 
```
cmake_minimum_required(VERSION 3.16)
project(vcx_linux_timer_example)

set(CMAKE_CXX_STANDARD 17)

link_directories(/usr/lib64) ## librt.so 파일 경로
add_executable(vcx_linux_timer_example main.cpp)


target_link_libraries(${PROJECT_NAME} rt)
```

## 3. Timer 정확성 실험 조건 및 결과

__실험1 : CentOS7 Linux PR 값에 따른 Timer 정확성 테스트__
PR | max | min | average | 상황 | Timer 호출 시간 | 오차범위 | 오차 발생 수 | 오차확률 | 측정시간
:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:
__39(min)__ | 17,528 | 3,172 | 9997.72 | 동영상 | 10ms | 1ms ↕  | 248 | 4.13% | 1분
__20__ | 14,378 | 5,624 | 9997.71 | 동영상 | 10ms | 1ms ↕  | 171 | 2.85% | 1분
__0__ | 11,210 | 8,795 | 9997.93 | 동영상 | 10ms | 1ms ↕ | 4 | 0.07% | 1분 
__-2__ | 10,174 | 9,812 | 9997.96 | 동영상 | 10ms | 1ms ↕ | 0 | 0.00% | 1분
__-51__ | 10,483 | 9,510 | 9998.07 | 동영상 | 10ms | 1ms ↕ | 0 | 0.00% | 1분
__-100(max)__ | __10,174__ | __9,839__ | 9998.1 | 동영상 | 10ms | 1ms ↕ | 0 | 0.00% | 1분

<br>

__실험2 : VMware(ubuntu) Linux PR값에 따른 Timer 정확성  테스트__
PR | max | min | average | 상황 | Timer 호출 시간 | 오차범위 | 오차 발생 수 | 오차확률 | 측정시간
:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:
__20__ | 15,932 | 4,284 | 9999.25 | 동영상 | 10ms | 1ms ↕  | 353 | 5.90% | 1분
__0__ | 17,926 | 2,549 | 9999.3 | 동영상 | 10ms | 1ms ↕ | 52 | 0.86% | 1분 
__-2__ | 11,528 | 8,467 | 9999.24 | 동영상 | 10ms | 1ms ↕ | 4 | 0.06% | 1분
__-51__ | 10,545 | 9,537 | 9999.26 | 동영상 | 10ms | 1ms ↕ | 0 | 0.00% | 1분
__-100(max)__ | __10,612__ | __9,381__ | 9999.35 | 동영상 | 10ms | 1ms ↕ | 0 | 0.00% | 1분

<br>

__실험3 : VMware(ubuntu) Linux  timer,PR 값에 따른 Timer 정확성  테스트__
Timer 호출 시간 | PR | max | min | average | 상황 | 오차범위 | 오차 발생 수 | 오차확률 | 측정시간
:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:
__10ms__ | __-2__ | 11,528 | 8,467 | 9999.24 | 동영상 | 1ms ↕ | 4 | 0.06% | 1분 
10ms | __-51__ | 10,545 | 9,537 | 9999.26 | 동영상 | 1ms ↕ | 0| 0.00% | 1분
10ms | __-100__ | 10,612 | 9,381 | 9999.35 | 동영상 | 1ms ↕ | 0 | 0.00% | 1분
__20ms__ | __-2__ | 27,138 | 19,218 | 20001.7 | 동영상 | 1ms ↕ | 1 | 0.03% | 1분
20ms | __-51__ | 20,485 | 19,516 | 19999.3 | 동영상 | 1ms ↕  | 0 | 0.00% | 1분
20ms | __-100__ | 20,545 | 19,392 | 19999.3 | 동영상 | 1ms ↕ | 0 | 0.00% | 1분 
__30ms__ | __-2__ | 31,028 | 29,041 | 29999.3 | 동영상 | 1ms ↕ | 2 | 0.10% | 1분
30ms | __-51__ | 30,543 | 29,515 | 29999.3 | 동영상 | 1ms ↕ | 0 | 0.00% | 1분
30ms | __-100__ | 30,397 | 29,544 | 29999.3 | 동영상 | 1ms ↕ | 0 | 0.00% | 1분
__40ms__ | __-2__ | 41,007 | 39,067 | 39999.3 | 동영상 | 1ms ↕  | 0 | 0.00% | 1분
40ms | __-51__ | 40,333 | 39,591 | 39999.4 | 동영상 | 1ms ↕ | 0 | 0.00% | 1분 
40ms |__-100__ | 40,547 | 39,314 | 39999.5 | 동영상 | 1ms ↕ | 0 | 0.00% | 1분
__50ms__ | __-2__ | 50,660 | 49,399 | 49999.3 | 동영상 | 1ms ↕ | 0 | 0.00% | 1분
50ms | __-51__ | 50,476 | 49,577 | 49999.4 | 동영상 | 1ms ↕ | 0 | 0.00% | 1분
50ms | __-100__ | 50,516 | 49,338 | 49999.3 | 동영상 | 1ms ↕ | 0 | 0.00% | 1분
