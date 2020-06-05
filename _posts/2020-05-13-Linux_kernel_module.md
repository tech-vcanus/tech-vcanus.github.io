---
title: "Linux_kernel"
date: 2020-05-13
categories: development
tags: Linux kernel RTLinux 
---

Written By [KJ Jang](https://github.com/jjangchan), VCANUS

## Kernel

커널은 운영 체제의 핵심 부분이므로, 커널의 역할 역시 운영체제의 핵심 역할이라 할 수 있다.

## 모듈 이란?
커널에서 작업해야 하는 기능이 있는데 이를 추가하기 위해서는 커널을 수정해서 재 컴파일 해야 한다. 하지만 이는 너무 번거우므로 리눅스와 같은 운영체제에는 모듈이라는 기능을 제공하여 특정 커널의 기능을 사용하고자 할 때 실시간(동적)으로 추가 할 수 있게 하고 있다.

- Monolithic 커널 : 시스템에 관련된 모든 기능을 커널에 때려 박은 형태이다. 모든 기능이 커널에서 동작하기 때문에 기능도 많고 Ring 레벨을 변경할 필요가 없기 때문에 빠르지만 기능을 추가하려면 커널을 수정해서 재컴파일해야 한다는 단점 존재(Linux는 Monolithic 커널이며, 단점을 해결하기 위해 실시간으로 모듈을 추가할 수 있는 기능을 제공[insmod 명령어])
### 모듈 관련 명령어

uname
```
uname [옵션]
UNIX name의 줄임말, 시스템의 기본 정보를 보는 명령어
```
insmod
```
insmod [옵션] [모듈명] 
해당 모듈을 적재 , 의존성이 존재하는 모듈인 경우에는 적재하지 못함
```
remod
```
rmmod [옵션] [모듈명] 
적재된 모듈 제거한다. 의존성이 존재하는 모듈은 제거하지 못함
```
lsmod
```
lsmod 
현재 적재된 모듈을 출력한다.
```
demod
```
demod [옵션] 
의존성을 검사한 뒤 modules.dep 파일을 갱신한다. 
kernel 이나 modprobe를 실행하기 전 사용하는 버릇을 들인다.
```
modprode
```
modprode [옵션] [모듈명] 
depmod의 의해 갱신된 modules.dep에서 찾아 적재한다. 
insmod와 달리 해당 모듈 디렉터리로 이동 할 필요 없이 아무 위치에서나 적재 가능. 
또한 의존성이 필요한 모듈이나 먼저 실행되어야 하는 모듈이 있다면 그 모듈부터 적재하고 해당 모듈을 적재한다.
```

### kernel install , remove , hold(ubuntu 18.04.4)

#### 1. install
```
$ sudo apt install aptitude
$ sudo aptitude search linux-image

# linux kernel version을 search 할 수 있다. 만일 원하는 version이 존재한다면 다운로드 가능

$ sudo apt-cache policy linux-image-[version]

# installed에 (uninstalled)와 같이 설치가 안되어 있다면 아래 명령어를 실행

$ sudo aptitude install linux-image-[version]

$ sudo dpkg -l | greo linux-

## linux-header-[version] 없으면 설치
$ sudo aptitude install linux-header-[version]

## linux-header-[version]-generic 없으면 설치
$ sudo aptitude install linux-header-[version]-generic

## linux-modules-[version]-generic 없으면 설치
$ sudo aptitude install linux-modules-[version]-generic

## linux-modules-extra-[version]-generic 없으면 설치
$ sudo aptitude install linux-modules-extra-[version]-generic
```

#### 2. remove
```
$ sudo apt purge linux-headers-[version] linux-headers-[version]-generic
$ sudo apt purge linux-image-[version] 
$ sudo apt purge linux-modules-[version]-generic linux-modules-extra-[version]-generic
$ reboot

## Removeing linux-image-[version] 알림창 뜨면 No 버튼 클릭.
```

#### 3. hold
```
$ sudo apt-mark hold linux-image-generic linux-headers-generic
```

### insert ADLINK mcm-100 module(ubuntu 18.04 must kernuel 4.15.0-20-gnerric)

ubuntu 18.04 버전이 아니면 ADLINK 홈페이지에서 드라이버 설치 목록에 필요한 ubuntu 버전 및 kernel 버전이 명시 되어 있음.

1. [adlink](https://www.adlinktech.com/en/index) 홈페이지 에서 mcm-100 드라이버 설치
* 다운 받은 디렉토리에 README 참조
2. ud-dask_xxx/util/usbdask_conf64 실행
    ```
    $ cd <InstallDir>/ud-dask_xxx/util
    $ ./usbdask_conf64
    ```
3. usbdask_conf64 설정
4. ud-dask_xxx/drivers/usbdask_inst_x86_64.pl 실행
    ```
    $ sudo cp <InstallDir>/ud-dask_xxx/drivers/4.15.0-20-generic/u2405.ko 다운받은경로/ud-dask_xxx/drivers
    $ sudo perl <InstallDir>/ud-dask_xxx/drivers/usbdask_inst_x86_64.pl
    $ cp <InstallDir>/ud-dask_xxx/lib/libusb_dask64.so /usr/lib64 or 
   cp <InstallDir>/ud-dask_xxx/lib/libpci_dask64.so /usr/lib/x86_64-linux-gnu
    ## module 확인
    $ lsmod u2405
    ```
5. 부팅시 자동적으로 insmod 설정
 * teams Linux 채널 에 ADLINK mcm-100 autoload.zip(비번 1234) 다운 후 참조
    ```
    $ sudo cp <InstallDir>/autoload/u2405.conf /etc/modprode.d
    $ sudo vi /etc/modules
    ## add string "u2405"
    $ sudo cp <InstallDir(ud-dask_xxx)>/ud-dask_xxx/drivers/u2405.bin /etc/udask/fw
    $ sudo cp <InstallDir(ud-dask_xxx)>/ud-dask_xxx/drivers/u2405.ko /lib/modules/4.15.0-20-gnerric/kernel/drivers/usb
    $ sudo depmod -a
    $ reboot
    ## 4.15.0-20-generic로 load 후 module 적재 되어 있는지 확인
    $ lsmod u2405
    ```
### RTLinux (centOS7)

* HZ : 1 초당 발생되는 타이머 인터럽트 횟수
* jiffies : 초당 HZ 값 만큼 증가하는 전역 변수

#### Linux Kenel module Makefile 
```
obj-m += <c file>.o

all:
        make -C /lib/modules/$(shell uname -r)/build M=$(PWD) modules
clean:
        make -C /lib/modules/$(shell uname -r)/build M=$(PWD) clean
```
#### Linux Kenel module example Code
```
#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/hrtimer.h>
#include <linux/ktime.h>

MODULE_LICENSE("GPL");
MODULE_AUTHOR("kjh");
MODULE_DESCRIPTION("A simple hello world module");

#define MS_TO_NS(x) (x * 1E6L)

static struct hrtimer hr_timer;
ktime_t ktime;

enum hrtimer_restart my_hrtimer_callback(struct hrtimer *timer)
{
	printk(KERN_INFO "my_hrtimer_callback called (%ld).\n", jiffies);
	hrtimer_forward(&hr_timer, hr_timer._softexpires, ktime);
	return HRTIMER_RESTART;
}

int init_module(void)
{
	unsigned long delay_in_ms = 100L;

	printk(KERN_INFO "HR Timer module installing...\n");
	ktime = ktime_set(0, MS_TO_NS(delay_in_ms));

	hrtimer_init(&hr_timer, CLOCK_MONOTONIC, HRTIMER_MODE_REL);

	hr_timer.function = &my_hrtimer_callback;

	printk(KERN_INFO "Starting timer (%ld)\n", jiffies);
	hrtimer_start(&hr_timer, ktime, HRTIMER_MODE_REL);

	return 0;
}

void cleanup_module(void)
{
	int rt;

	printk(KERN_INFO "Cleaning up module.\n");
	rt = hrtimer_cancel(&hr_timer);
	if(rt) printk(KERN_INFO "The timer is still in use..\n");
}
```