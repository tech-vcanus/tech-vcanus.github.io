---
title: "JetsonTX2 SSD , Jetpack install"
date: 2020-06-10
categories: development
tags: RTOS
---


Written By [KJ Jang](https://github.com/jjangchan), VCANUS

# jatPack install 및 SSD 부팅 경로 설정

### 필요사항

* Host PC (ubuntu 18.04 or 16.04)
* Target PC (JetsonTX2)
* usb 케이블(5핀)
* 라우터 환경(TX2 와 Host PC가 같은 네트워크에 있어야 함)
* 모니터 및 HDMI 케이블
* 커피 한잔 및 인내심
* 예상 작업 시간 : 5시간



## Host PC에 L4T 및 JatPack 설치

[NVIDIA](https://developer.nvidia.com/embedded/linux-tegra) 홈페이지에서 __L4T Driver Package[BSP] , Sample Root Filesystem__ 다운로드

[NVIDIA](https://developer.nvidia.com/embedded/jetpack) 홈페이지에서 __SDK Manager__ 다운로드(회원가입 필요)



## Host PC에 JatPack 진행 과정

### Step 1: 환경 세팅

1. Host Machine 체크 해제 
2. Target Hardware Jetson TX2 선택 
3. JetPack 버전 선택

### Step 2: OS 및 SDK 설정

OS 및 라이브러리 선택 후 설치 , 다 선택 하면 아래 항목이 깔리게 된다. 

* Jetson OS
* CUDA
* cuDNN
* TensorRT
* OpenCV
* VisionWorks
* NVIDIA Container Runtime
* Multimedia (GStreamer)
* DeepStream
* TensorFlow

### Step 3: Flash 작업

중간에 설치 하다보면 Flash 작업을 실시 한다는 알람창이 뜬다.
Manual SetUp으로 바꿔 주고 a~f처럼 진행 해야 한다. 이떄부터 TX2를 micro usb로 Host PC 랑 연결해준다.

### Step 4: TX2 Recovery Mode 진입

__TX2 Recovery Mode 진입 과정__

1. Connect the OTG cable to the USB 2.0 port.
2. Press the reset and recovery buttons at the same time. 
3. Press the power switch.
4. Release the reset button.
5. Release the recovery button.

__연결 확인 방법__

Host PC 에서 터미널을 열고 명령어로 확인한다.
```
& lsusb
Bus 001 Device 001 : ID 0955:7020 NVidia Corp.
```
이처럼 NVidia Corp 가 뜨면 연결이 됨

### Step 5 : TX2에 우분투 설치 과정

TX2에 우분투 설치 과정이 뜬다. 차례 대로 언어,지역,시간 을 설정 해주고 설치 해주면 된다.

### Step 6 : TX2 gdisk 설정

sda 기준 gdisk 설정
```
$ gdisk /dev/sda
```
명령어 확인 목록
```
Command (? for help): ?
b back up GPT data to a file
c change a partition's name
d delete a partition
i show detailed information on a partition
l list known partition types
n add a new partition
o create a new empty GUID partition table (GPT)
p print the partition table
q quit without saving changes
r recovery and transformation options (experts only)
s sort partitions
t change a partition's type code
v verify disk
w write table to disk and exit
x extra functionality (experts only)
? print this menu
```
o 선택 해준다.(남아 있는 자료 복구 못합니다.)
```
This option deletes all partitions and creates a new protective MBR.
Proceed? (Y/N)
```
p 명령어로 확인
```
Command (? for help): p
Disk /dev/sdc: 5860533168 sectors, 2.7 TiB
Logical sector size: 512 bytes
Disk identifier (GUID): 360EBE13-9CBA-4F0C-B863-B3872392EC87
Partition table holds up to 128 entries
First usable sector is 34, last usable sector is 5860533134
Partitions will be aligned on 2048-sector boundaries
Total free space is 5860533101 sectors (2.7 TiB)

Number Start (sector) End (sector) Size Code Name
```
n 명령어 입력
```
Command (? for help): n
Partition number (1-128, default 1):
First sector (34-5860533134, default = 2048) or {+-}size{KMGTP}:
Last sector (2048-5860533134, default = 5860533134) or {+-}size{KMGTP}:
Current type is 'Linux filesystem'
Hex code or GUID (L to show codes, Enter = 8300):
Changed type of partition to 'Linux filesystem
```
마지막으로 확인
```
Command (? for help): p
Disk /dev/sdc: 5860533168 sectors, 2.7 TiB
Logical sector size: 512 bytes
Disk identifier (GUID): 360EBE13-9CBA-4F0C-B863-B3872392EC87
Partition table holds up to 128 entries
First usable sector is 34, last usable sector is 5860533134
Partitions will be aligned on 2048-sector boundaries
Total free space is 2014 sectors (1007.0 KiB)

Number Start (sector) End (sector) Size Code Nameß
1 2048 5860533134 2.7 TiB 8300 Linux filesystem
```
최종적으로 포맷 
```
$ sudo mkfs.ex4 /dev/sda1
```

sda에 root 파일 복사
```
$ sudo cp -ax / <sda1경로> && sync
```

### ! IP, ID, PW 를 물어보는 알림창 이 뜨면 진행 하지말고, TX2를 sda로 부팅하는 설정 부터 하자 !



## Host PC에 L4T 진행 과정 및 TX2 sda로 부팅 설정

### Step 1: 다운로드 파일 압축 해제 
Host PC 에 다운 받은 tar 압축 해제
```
sudo tar xpf ${L4T_RELEASE_PACKAGE 경로}
cd Linux_for_Tegra/rootfs/
sudo tar xpf ../../${SAMPLE_FS_PACKAGE 경로}
cd ..
sudo ./apply_binaries.sh
```
TX2 터미널 열고 sda1 PARTUUID 확인
```
$ sudo blkid /dev/sda1
/dev/sda1: UUID="93A6-26BA" TYPE="vfat" PARTLABEL="Linux filesystem" PARTUUID="018eff62-2d07-4ca5-8619-c30c18b0a181"
```
__TX2 Recovery Mode 진입 하면 모니터가 꺼지므로 PARTUUID 를 기록해 두자.__


### Step 2: TX2 Recovery Mode 진입

__TX2 Recovery Mode 진입 과정__

1. Connect the OTG cable to the USB 2.0 port.
2. Press the reset and recovery buttons at the same time. 
3. Press the power switch.
4. Release the reset button.
5. Release the recovery button.

__연결 확인 방법__

Host PC 에서 터미널을 열고 명령어로 확인한다.
```
& lsusb
Bus 001 Device 001 : ID 0955:7020 NVidia Corp.
```
이처럼 NVidia Corp 가 뜨면 연결이 됨

### Step 3: image 파일 sda1에 Flash
Host PC 터미널 열고
```
# cd ${L4T_RELEASE_PACKAGE 경로}
$ echo '${적어둔 PARTUUID}' > bootloader/l4t-rootfs-uuid.txt
$ cd ..
$ sudo ./flash.sh jetson-tx2 sda1
```


### Step 4: SSH로 파일 전송 (Host to TX2)

잠시 중단 했던 SDK Manager 알림창에 TX2의 IP,ID,PW 
다 적고 install 버튼을 눌리면 전송 과정에 들어가니깐 SDK Manager 가 Finish 버튼이 나올 때 까지 기다린다.

설치가 완료 되면 잘 설치 되었는지 보기 위해서 TX2 보드에 터미널창 열고 명령어를 친다
```
$ nvcc --version
```
CUDA 버전 나오면 성공 ~~

마지막으로 업데이트 진행
```
$ sudo apt update && sudo apt upgrade -y
```