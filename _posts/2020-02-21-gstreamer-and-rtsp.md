---

title: "GStreamer and RTSP"
data: 2020-02-21
categories: development
tags: Server GStreamer RTSP

---

Written By [Nuri Na](https://github.com/nurring), [KJ Jang](https://github.com/jjangchan), VCANUS

`GStreamer` 는 파이프라인 기반의 멀티미디어 프레임워크이다. 특정 포맷의 파일을 읽고, 처리하여, 다른 포맷으로 전달하는 시스템을 빌드할 수 있다. 

 `RTSP` 는 미디어 서버 스트리밍에 이용되는 네트워크 프로토콜이다.

## Installation

_Ubuntu18.04 기준_

### GStreamer

```shell
sudo apt update && apt install -y gstreamer1.0-tools \
gstreamer1.0-plugins-base \
gstreamer1.0-plugins-good \
gstreamer1.0-plugins-bad \
gstreamer1.0-plugins-ugly \
gstreamer1.0-libav \
python-gst-1.0 
```

### RTSP Server

```shell
sudo apt-get install gir1.2-gst-rtsp-server-1.0
```

### v4l2 

```bash
sudo apt-get install v4l-utils
```

   

## Real Time Streaming Architecture

![architecture](/assets/images/gstreamer_rtsp.png)

   

## V4L2 Basic

Video for Linux ~ 리눅스에서 카메라 입력을 받기 위한 표준 인터페이스   

dev 디렉토리 내 video* 장치 파일이 생성 되고, 사용자 프로그램이 커널을 통해 시스템 하드웨어에 접근할 수 있다.

1. 지원 이미지 포맷

   ```bash
    v4l2-ctl --list-formats
   ```

2. 지원 이미지 포맷 & 해상도

   ```bash
   v4l2-ctl --list-formats-ext
   ```

3. 특정 디바이스 정보

   ```bash
   v4l2-ctl -d /dev/video0 --list-formats
   ```

4. 카메라 모든 정보 확인

   ```bash
   v4l2-ctl --all
   ```

   

## GStreamer Basic

### Foundations

- Elements

  모든 플러그인은 `element`가 될 수 있다. 하나의 element는 하나의 특정한 기능을 한다.

- Pads

  `pad`는 element의 인풋과 아웃풋으로 element를 연결한다(플러그나 포트처럼). 인풋쪽을 sink, 아웃풋 쪽을 source라고 한다.

- Bins, Pipelines

  `bin`은 element들을 담는 컨테이너이다.

- Pipelines

  `pipeline`은 최상위 레벨의 bin이다.  `PAUSED` / `PLAYING` 등 상태를 지정하여 데이터 흐름을 제어할 수 있다.

### Command line tools

- gst-launch-1.0

  GStreamer 파이프라인을 빌드, 실행

  ```bash
  # Format
  gst-launch-1.0 [OPTIONS] PIPELINE-DESCRIPTION
  # Example ~ Display only MPEG-1 video file, outputting to an X display window
  gst-launch-1.0 filesrc location=videofile.mpg ! dvddemux ! mpeg2dec ! xvimagesink
  ```

  More Information about gst-launch-1.0 [here](https://gstreamer.freedesktop.org/documentation/tools/gst-launch.html?gi-language=c).

- gst-inspect-1.0

  GStreamer의 플러그인/엘리먼트 정보 확인

  ```bash
  # Example
  gst-inspect-1.0 audiotestsrc
  
  # ...and results
  Factory Details:
    Rank                     none (0)
    Long-name                Audio test source
    Klass                    Source/Audio
    Description              Creates audio test signals of given frequency and volume
    Author                   Stefan Kost <ensonic@users.sf.net>
  
  Plugin Details:
    Name                     audiotestsrc
    Description              Creates audio test signals of given frequency and volume
    Filename                 /usr/lib/gstreamer-1.0/libgstaudiotestsrc.so
    Version                  1.8.1
    License                  LGPL
  ```



### Gstreamer-RTSP-Server-Build

파이프라인을 빌드하도록 컴파일, element를 구성할 변수들을 잡아 실행하면 실시간 스트리밍이 시작된다. 

1. 다운로드 gst-rtsp-servr-1.14.2.tar.xz 

    [Download Link](https://gstreamer.freedesktop.org/src/gst-rtsp-server/gst-rtsp-server-1.14.2.tar.xz)

2. 압축 해제
   ```bash
   tar -xf gst-rtsp-server-1.14.2.tar.xz
   ```

3. 디렉토리 이동

    ```bash
    cd gst-rtsp-server-1.14.2
    ```

4. GStreamer 컴파일
   ```bash
   ./configure # Makefile을 만들어줌
   make # Makefile을 컴파일
   sudo make install #실행 
   ```
   **_./configure 오류 발생 시_**

   ```bash
    sudo apt-get install gtk-doc-tool
   ```

5. 실행

   example) dev/video0에 연결 된 MJPEG 코덱 카메라 Gstreamer 파이프 라인

   ```bash
   ./test-launch  --gst-debug=3 '( v4l2src device=/dev/video0 ! jpegdec ! videoconvert ! queue max-size-buffers=0 max-size-time=0 max-size-bytes=0 min-threshold-time=0 ! x264enc ! video/x-h264,width=1024,height=576,framerate=30/1 ! h264parse ! rtph264pay name=pay0 pt=96 )'
   ```

   - jpegdec : jpeg 이미지 디코딩
   - videoconvert : 비디오 프레임 간 포맷 컨버팅
   - x264enc : Raw video를 h264 데이터로 압축(a.k.a MPEG-4 AVC)
   - h264parse : Parses H.264 streams
   - rtph264pay : Payload-encode H264 video into RTP packets (RFC 3984)

   

## OpenCV를 이용한 Client쪽 처리

RTSP로 들어오는 영상을 받아 처리, PyQt로 GUI를 구성하여 실시간 영상을 재생/정지한다.

```python
## Example
import cv2
import threading
import sys
from PyQt5 import QtWidgets
from PyQt5 import QtGui
from PyQt5 import QtCore

running = False

def run():
    global running
    gst = "rtsp://ip주소:8554/test" # 현재 rtsp 서버 주소
    cap = cv2.VideoCapture(gst) # cv2로 비디오 캡처
    width = cap.get(cv2.CAP_PROP_FRAME_WIDTH) # 비디오 너비 값 가져오기
    height = cap.get(cv2.CAP_PROP_FRAME_HEIGHT) # 비디오 높이 값 가져오기
    label.resize(width, height) # pyQt5 라벨에 사이즈 지정
    while running:
        ret, img = cap.read() # stream 읽어오기
        if ret:
            img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB) # 비디오 컬러값 지정

            h, w, c = img.shape # 높이 , 너비 , R(ed), G(reen), B(lue)
            qImg = QtGui.QImage(img.data, w, h, w * c, QtGui.QImage.Format_RGB888) # 스트림 이미지 가져오기
            pixmap = QtGui.QPixmap.fromImage(qImg) #img 포맷을 지원 해주는 객체
            label.setPixmap(pixmap) # 라벨에 set
        else:
            QtWidgets.QMessageBox.about(win, "ERROR", "Cannot read frame.")
            print("cannot read frame.")
            break
    cap.release() # 비디오 캡쳐 종료
    print("Thread end.")


def stop():
    global running
    running = False
    print("stoped ..")


def start():
    global running
    running = True
    th = threading.Thread(target=run) #쓰레드
    th.start()
    print("started ..")


def onExit():
    print("exit")
    stop()


# GUI 구성
app = QtWidgets.QApplication([])
win = QtWidgets.QWidget()
vbox = QtWidgets.QVBoxLayout()
label = QtWidgets.QLabel()
btn_start = QtWidgets.QPushButton("Camera On")
btn_stop = QtWidgets.QPushButton("Camera Off")
vbox.addWidget(label)
vbox.addWidget(btn_start)
vbox.addWidget(btn_stop)
win.setLayout(vbox)
win.show()

# GUI 버튼 액션 설정
btn_start.clicked.connect(start)
btn_stop.clicked.connect(stop)
app.aboutToQuit.connect(onExit)

sys.exit(app.exec_())

```



