---
title: CMake Guide
date: 2020-03-12
categories: development
tags: HLS Server Streaming
toc: true
toc_sticky: true

---

Written By [Nuri Na](https://github.com/nurring), VCANUS

## Makefile

리눅스 환경에서 소스 코드를 빌드하는데 다음 명령어를 사용한다.

```bash
make
```

이 때 `make`는 소스 코드 디렉토리에 포함된 `Makefile`이라는 이름의 스크립트를 읽어 순서대로 수행한다.   

`Makefile`의 기본 구조는 다음과 같다.

```makefile
#환경 변수
CC=gcc
CFLAGS=-g -Wall
OBJS=main.o foo.o bar.o
TARGET=app.out

#규칙 블록 구조
$(TARGET): $(OBJS)
    $(CC) -o $@ $(OBJS)

#파일 의존성
main.o: foo.h bar.h main.c
	foo.o: foo.h foo.c
	bar.o: bar.h bar.c
	
#클린 빌드 : 기존 중간 산출물(*.o)들 삭제 - make clean
clean:
    rm -f *.o
    rm -f $(TARGET)
```

- CC: 컴파일러
- CFLAGS: 컴파일 옵션
- OBJS: 중간 산출물인 Object파일 목록
- TARGET: 빌드 대상(실행 파일) 이름
- $@: 현재 Target 이름(자동변수 [_자세한 설명 링크_](http://www.gnu.org/software/make/manual/html_node/Automatic-Variables.html) )

`Makefile`은 의존성 등 다양한 문제로 프로젝트가 복잡해질수록 직접 작성하기 어렵고 생산성이 떨어진다. 이를 위해 의존성 정보를 일일이 기술하지 않아도 `Makefile`을 자동으로 생성하는 **cmake**를 사용한다.

## CMakeLists.txt

cmake는 Makefile을 빌드하기 위해 CMakeLists.txt를 작성한다. 위 Makefile을 빌드하는 CMakeLists.txt는 다음과 같이 작성한다.

```cmake
ADD_EXECUTABLE ( app.out main.c foo.c bar.c)
```

그리고 다음 명령어로 빌드한다.

```bash
cmake CMakeLists.txt
```

결과물로 Makefile 및 cache파일 등이 생긴다. cmake -> make 두 번의 명령어로 빌드해야 하지만, 환경 설정에 변경이 없는 경우  처음 한 번만 cmake하고 그 뒤로는 make로만 빌드하면 된다. 

## CMakeLists.txt 기본 패턴

`pkg-config` 는 소스 코드를 컴파일하기 위하여 시스템에 설치된 라이브러리를 조회할 수 있는 소프트웨어이다. CMakeLists.txt에 포함하기 위해 콘솔에서 다음과 같이 사용한다.

```bash
pkg-config --list-all | grep <패키지명>
```

```bash
#결과 예시
~ pkg-config --list-all | grep py
pygobject-3.0                       PyGObject - Python bindings for GObject
python-3.7m                         Python - Python library
py3cairo                            Pycairo - Python 3 bindings for cairo
python3                             Python - Python library
python-3.7                          Python - Python library
```

조회되는 패키지명을 CMakeLists.txt의 pkg_check_modules에 기입한다.   

CMakesListx.txt의 기본 패턴은 다음과 같다.

```cmake
# 요구 CMake 최소 버전
cmake_minimum_required(VERSION <버전>)
# 프로젝트 이름 및 버전
project(<프로젝트_이름>)

#pkg-config를 이용함
find_package(PkgConfig REQUIRED)
#pkg-config에서 조회된 패키지를 포함
pkg_check_modules(<변수명> REQUIRED <패키지명>)
    # cf. pkg-config로 조회되지 않는 경우 직접 *.cmake 파일 경로를 명시한다.
    # -> pkg_check_modules(<변수명> REQUIRED PATHS "<파일_경로>")
#공통 헤더 파일 디렉토리
include_directories(${<변수명>_INCLUDE_DIRS})
#공통 링크 라이브러리 디렉토리
link_directories(${<변수명>_LIBRARY_DIRS})
#빌드 대상 바이너리
add_executable(${PROJECT_NAME} <파일명>)
#빌드 대상에 링크할 라이브러리 - add_executable 아래에 위치
target_link_libraries(${PROJECT_NAME} ${<변수명>_LIBRARIES})
```

pkg_check_modules()로 패키지를 불러오면, <변수명>_INCLUDE_DIRS 와 같은 형태의 환경 변수로 해당 파일 경로가 자동 매핑된다.

```bash
# CMakeLists.txt 예시
cmake_minimum_required(VERSION 3.15)
project(example)

# pkg-config 이용
find_package(PkgConfig REQUIRED)
pkg_check_modules(GST REQUIRED gstreamer-1.0)
include_directories(${GST_INCLUDE_DIRS}) #header dir
link_directories(${GST_LIBRARY_DIRS}) #library dir

# *.cmake 경로 직접 지정
find_package(OpenCV REQUIRED  PATHS "/usr/local/Cellar/opencv/4.2.0_3/lib/cmake/opencv4")
include_directories(${OpenCV_INCLUDE_DIR})
link_directories(${OpenCV_LIBRARY_DIRS})

add_executable(${PROJECT_NAME} main.cpp)

target_link_libraries(${PROJECT_NAME} ${GST_LIBRARIES})
target_link_libraries(${PROJECT_NAME} ${OpenCV_LIBRARIES})
```

