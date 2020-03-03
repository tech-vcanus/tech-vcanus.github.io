---

title: "GStreamer and RTSP"
data: 2020-02-21
categories: development
tags: Server GStreamer RTSP

---

Written By [Nuri Na](https://github.com/nurring), [KJ Jang](https://github.com/jjangchan), VCANUS

`GStreamer` is a pipeline-based multimedia framework, can build a system that reads files in one format, processes them, and exports them in another.   

In this project, we use `RTSP` as networking protocol, a network control protocol used for streaming media servers.



## Installation

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



## Architecture

![architecture](/assets/images/gstreamer_rtsp.png)



## GStreamer Basic

### Foundations

- Elements

  Every Plugin can be _element_. One element has one specific function.

- Pads

  A _pad_ is an Element's input and output, it can connect other elements(_like plug or port_).   A pad for input called _sink_ and a pad for output called 

- Bins, Pipelines

  A *bin* is a container for a collection of elements.

- Pipelines

  A *pipeline* is a top-level bin. you set it to `PAUSED` or `PLAYING` state, data flow will start and media processing will take place.

### Command line tools

- gst-launch-1.0

  Build and run a GStreamer pipelines

  ```bash
  # Format
  gst-launch-1.0 [OPTIONS] PIPELINE-DESCRIPTION
  # Example ~ Display only MPEG-1 video file, outputting to an X display window
  gst-launch-1.0 filesrc location=videofile.mpg ! dvddemux ! mpeg2dec ! xvimagesink
  ```

  More Information about gst-launch-1.0 [here](https://gstreamer.freedesktop.org/documentation/tools/gst-launch.html?gi-language=c).

- gst-inspect-1.0

  Print information about a GStreamer plugin or element

  ```bash
  # Example
  gst-inspect-1.0 audiotestsrc
  
  # and results
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

### v4l2 

1. v4l-utils 설치
    ```bash
    $ sudo apt-get install v4l-utils
    ```
2. 지원 이미지 포맷
   ```bash
    $ v4l2-ctl --list-formats
   ```
3. 지원 이미지 포맷 & 해상도
    ```bash
    $ v4l2-ctl --list-formats-ext
   ```
4. 특정 디바이스 정보
    ```bash
    $ v4l2-ctl -d /dev/video1 --list-formats
   ```
5. 카메라 모든 정보 확인
    ```bash
    $ v4l2-ctl --all
   ```

### Gstreamer-RTSP-Server-Build

1. Download
    - gst-rtsp-server https://gstreamer.freedesktop.org/src/gst-rtsp-server/ .Focus on version 1.14.2 tar.xz.asc

2. Unpack tar.xz files
    ```bash
   tar -xf <filename>
   ```

3. Change into each of the unpacked dirs

4. Execute these commands in each directory 
    ```bash
   cd gst-rtsp-server-1.14.2
   ./configure
   make
   sudo make install
   ```
./autogen.sh 오류 : You need to have gtk-doc >= 1.12 installed to build Gstreamer RTSP server Library configure failed
  
   ```bash
    해결 : sudo apt-get install gtk-doc-tool
   ```

### Run Gstreamer-RTSP-Server
example) dev/video0에 연결 된 MJPEG 코덱 카메라 Gstreamer 파이프 라인
```bash
./test-launch  --gst-debug=3 '( v4l2src device=/dev/video0 ! jpegdec ! videoconvert ! queue max-size-buffers=0 max-size-time=0 max-size-bytes=0 min-threshold-time=0 ! x264enc ! video/x-h264,width=1024,height=576,framerate=30/1 ! h264parse ! rtph264pay name=pay0 pt=96 )'
```
- jpegdec : Decodes jpeg images.
- videoconvert : Convert video frames between a great variety of video formats.
- x264enc : This element encodes raw video into H264 compressed data, also otherwise known as MPEG-4 AVC (Advanced Video Codec).
- h264parse : Parses H.264 streams
- rtph264pay : Payload-encode H264 video into RTP packets (RFC 3984)

### Code with C, Java Script, Python

Without above CLI Commands, You can build application using GStreamer Plug-ins with C, Java Script, Python.  Check out the API refernece [here](https://gstreamer.freedesktop.org/documentation/gstreamer/running.html?gi-language=c).

