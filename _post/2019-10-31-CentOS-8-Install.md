---
title: "CentOS 8 Install"
data: 2019-10-30 00:00:00 -0000
categories: development
tags: install CentOS 8 and graphic driver
---

Written by BGKim, VCANUS

# Install CentOS 8

## Make install USB
1. centos 홈페이지에서 파일을 다운을 받는다.(https://www.centos.org/)
2. 8GB이상의 USB를 준비한다.
3. USB를 연결하고, Rufus 홈페이지에서 Rufus를 다운받은 뒤 실행(https://rufus.ie/)
4. 실행 화면에서 기본사항들을 적절히 세팅 후 파티션 방식을 GPT로 설정 후 시작

## Install OS
1. USB를 연결 후 부팅. (cent os 화면이 안나올 시, 바이오스 부팅 설정)
2. 화면이 나오면 Install 클릭. 키보드, 언어, 시간 설정 
3. install destination(설치 목적지)에서 OS설치 디스크를 선택하고, 저장소 구성이 필요시 Custom을 통하여 진행, 그렇지 않을시 automatic을 통한 진행

# Install Nvidia Graphic driver
1. nvidia 홈페이지에서 Long Lived Branch Version 다운, 권한 변경(https://www.nvidia.com/en-us/drivers/unix/)
```
$ chmod +x NVIDIA-Linux-x86_64-4xx.run
```
2. nvidia 홈페이지에서 CUDA Toolkit 버전 확인 후 설치 명령어 확인 후 terminal에 입력(https://developer.nvidia.com/cuda-downloads?target_os=Linux&target_arch=x86_64&target_distro=CentOS&target_version=8&target_type=runfilelocal)
```
$ wget http://developer.download.nvidia.com/compute/cuda/10.1/Prod/local_installers/cuda_10.1.243_418.87.00_linux.run
$ sudo sh cuda_10.1.243_418.87.00_linux.run
```

3. 루트로 변경 후 기본 dev tools 다운
```
$ sudo su
# dnf groupinstall "Development Tools"
# dnf install libglvnd-devel elfutils-libelf-devel "kernel-devel-uname-r == $(uname -r)"
```

4. Nouveau driver를 Grub부트메뉴에서 사용안하도록 변경
```
# grub2-editenv - set "$(grub2-editenv - list | grep kernelopts) nouveau.modeset=0"
```

5. cli화면에서만 설치가 가능하기에 설정 후 reboot
```
# systemctl set-default multi-user.target
# reboot
```

6. 설치를 진행
```
# bash NVIDIA-Linux-x86_64-4xx.run
```

7. Gui로 변경 후 reboot
```
# systemctl set-default graphical.target
# reboot
```
