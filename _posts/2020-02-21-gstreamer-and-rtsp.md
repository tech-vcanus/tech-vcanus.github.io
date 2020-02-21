---

title: "GStreamer and RTSP"
data: 2020-02-21
categories: development
tags: Server, GStreamer, RTSP

---

Written By [Nuri Na](https://github.com/nurring), [KJ Jang](https://github.com/jjangchan), VCANUS

`GStreamer` is a pipeline-based multimedia framework, can build a system that reads files in one format, processes them, and exports them in another.   

In this project, we use `RTSP` as networking protocol, a network control protocol used for streaming media servers.



## Installation

#### GStreamer

```shell
sudo apt update && apt install -y gstreamer1.0-tools \
gstreamer1.0-plugins-base \
gstreamer1.0-plugins-good \
gstreamer1.0-plugins-bad \
gstreamer1.0-plugins-ugly \
gstreamer1.0-libav \
python-gst-1.0
```

#### RTSP Server

```shell
sudo apt-get install gir1.2-gst-rtsp-server-1.0
```



## Architecture

![architecture](/assets/images/gstreamer_rtsp.png)



## GStreamer Basic

#### Foundations

- Elements

  Every Plugin can be _element_. One element has one specific function.

- Pads

  A _pad_ is an Element's input and output, it can connect other elements(_like plug or port_).   A pad for input called _sink_ and a pad for output called 

- Bins, Pipelines

  A *bin* is a container for a collection of elements.

- Pipelines

  A *pipeline* is a top-level bin. you set it to `PAUSED` or `PLAYING` state, data flow will start and media processing will take place.

#### Command line tools

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

#### Code with C, Java Script, Python

Without above CLI Commands, You can build application using GStreamer Plug-ins with C, Java Script, Python.  Check out the API refernece [here](https://gstreamer.freedesktop.org/documentation/gstreamer/running.html?gi-language=c).

