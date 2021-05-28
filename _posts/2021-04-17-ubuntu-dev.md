# Install Development Environment

## Install Nvidia driver (Ubuntu 20.04)
1. install graphic driver (2080Ti driver is already installed on Ubuntu 20.04)
2. install cuda toolkit (https://developer.nvidia.com/cuda-toolkit-archive)
```
$ wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2004/x86_64/cuda-ubuntu2004.pin
$ sudo mv cuda-ubuntu2004.pin /etc/apt/preferences.d/cuda-repository-pin-600
$ wget https://developer.download.nvidia.com/compute/cuda/11.3.1/local_installers/cuda-repo-ubuntu2004-11-3-local_11.3.1-465.19.01-1_amd64.deb
$ sudo dpkg -i cuda-repo-ubuntu2004-11-3-local_11.3.1-465.19.01-1_amd64.deb
$ sudo apt-key add /var/cuda-repo-ubuntu2004-11-3-local/7fa2af80.pub
$ sudo apt-get update
$ sudo apt-get -y install cuda
```
4. install cudnn (https://developer.nvidia.com/cudnn)
(don't use)
```
$ tar xvzf cudnn-11.2-linux-x64-v8.1.0.77.tgz
$ sudo cp cuda/include/cudnn* /usr/local/cuda/include
$ sudo cp cuda/lib64/libcudnn* /usr/local/cuda/lib64
$ sudo chmod a+r /usr/local/cuda/include/cudnn.h /usr/local/cuda/lib64/libcudnn*
```
5. Setup environment
.profile
```
CUDA_HOME=/usr/local/cuda-11.3
export PATH=$CUDA_HOME/bin:$PATH

export LD_LIBRARY_PATH=$CUDA_HOME/lib64:$LD_LIBRARY_PATH
```
7. install cudnn toolkit (don't install nvidia-cuda-toolkit of apt)
```
$ # sudo apt install nvidia-cuda-toolkit (don't install)
```
8. solve link warning
```
$ sudo ln -sf /usr/local/cuda/targets/x86_64-linux/lib/libcudnn_adv_train.so.8.2.0 /usr/local/cuda/targets/x86_64-linux/lib/libcudnn_adv_train.so.8
$ sudo ln -sf /usr/local/cuda/targets/x86_64-linux/lib/libcudnn_ops_infer.so.8.2.0 /usr/local/cuda/targets/x86_64-linux/lib/libcudnn_ops_infer.so.8
$ sudo ln -sf /usr/local/cuda/targets/x86_64-linux/lib/libcudnn_cnn_train.so.8.2.0 /usr/local/cuda/targets/x86_64-linux/lib/libcudnn_cnn_train.so.8
$ sudo ln -sf /usr/local/cuda/targets/x86_64-linux/lib/libcudnn_cnn_train.so.8.2.0 /usr/local/cuda/targets/x86_64-linux/lib/libcudnn_cnn_train.so.8
$ sudo ln -sf /usr/local/cuda/targets/x86_64-linux/lib/libcudnn_cnn_train.so.8.2.0 /usr/local/cuda/targets/x86_64-linux/lib/libcudnn_cnn_train.so.8
$ sudo ln -sf /usr/local/cuda/targets/x86_64-linux/lib/libcudnn_cnn_train.so.8.2.0 /usr/local/cuda/targets/x86_64-linux/lib/libcudnn_cnn_train.so.8
$ sudo ln -sf /usr/local/cuda/targets/x86_64-linux/lib/libcudnn_cnn_train.so.8.2.0 /usr/local/cuda/targets/x86_64-linux/lib/libcudnn_cnn_train.so.8
```

## Build Essential
```
$ sudo apt install build-essential
$ sudo apt install ubuntu-restricted-extras #(to intall extra media codecs)
```

## Install Java
### Install OpenJdk
```
$ sudo apt install openjdk-8-jdk
$ sudo apt install openjdk-11-jdk
```
### change java version
```
$ sudo update-alternatives --config java
```

## Build Essential
```
$ sudo apt install build-essential
$ sudo apt install ubuntu-restricted-extras #(to intall extra media codecs)
```

```
$ sudo apt install curl
$ sudo apt install libcurl4-openssl-dev zlib1g-dev
$ sudo apt install libssl-dev
$ sudo apt install openssl
```

## Install Cmake (to install higher version)
0. install curl-devel zlib-devel (the cmake with Https support is needed for installing opencv) 
https://github.com/opencv/opencv_contrib/issues/1131 (check skvark's comment and ./bootstrap --system-curl. from the version of Cmake-3.12, --system-curls might be not needed for Https support)
    ```
    $ sudo yum -y install curl-devel zlib-devel
    ```
    For Ubuntu,
    ```
    $ sudo apt install libcurl4-openssl-dev zlib1g-dev
    ```
1. goto https://cmake.org/download/, and download the latest stable install file
2. tar -zxvf cmake-xxxversionxxx.tar.gz
3. cd cmake-xxxversionxxx
4. install
    ```
    $ ./bootstrap --system-curl
    $ make
    $ sudo make install
    ```
    
## Install Miscellaneous
```
$ sudo apt install maven
$ sudo apt install ant
$ sudo apt install libhiredis-dev
$ sudo apt install -y libthrift-dev
$ sudo apt install -y libprotobuf-dev libprotobuf-c-dev
```
To install NATS,
```
$ sudo apt install snapd
$ sudo snap install nats
```
To install GTest,
```
$ sudo apt install googletest
$ sudo apt install googletest-tools
```

## Install Boost
```
$ sudo apt install libboost-all-dev
```

## Install OpenCV
### Preparation
```
$ sudo apt install -y libssl-dev
$ sudo apt install -y git pkg-config 
$ sudo apt install -y libcurl4-gnutls-dev
$ sudo apt install -y libcurl4-openssl-dev
$ sudo apt install -y libgtk-3-dev libgtk2.0-dev
$ sudo apt install -y libpng-dev libjpeg-dev libjpeg-turbo8-dev libtiff-dev libwebp-dev
$ sudo apt install -y libdc1394-22-dev libv4l-dev v4l-utils libxine2-dev
$ sudo apt install -y libavcodec-dev libavformat-dev
$ sudo apt install -y libxvidcore-dev libx264-dev
$ sudo apt install -y gstreamer1.0-opencv libgstreamer1.0-dev libgstreamer-plugins-base1.0-dev
$ sudo apt install -y mesa-utils libgl1-mesa-dri
$ sudo apt install -y libatlas-base-dev gfortran
$ sudo apt install -y libtbb-dev libeigen3-dev
$ sudo apt install -y ffmpeg libswscale-dev
$ sudo apt install -y libavcodec-dev libavformat-dev libavutil-dev libavresample-dev
```
### Install OpenCV
```
$ sudo apt install -y libopencv-contrib4.2 (is already installed on Ubuntu 20.04? check!!)
$ sudo apt install -y libopencv-dev
$ sudo apt install -y libopencv-contrib-dev # check please
```

## Install darknet
1. download source
```
$ git clone https://github.com/AlexeyAB/darknet.git
```
3. modify MakeFile
```
$ cd darknet
$ vi Makefile
```
Makefile
```
GPU=1
CUDNN=1
CUDNN_HALF=0
OPENCV=1
AVX=0
OPENMP=0
LIBSO=0
ZED_CAMERA=0
ZED_CAMERA_v2_8=0
```
4. build
```
$ make
```
5. use darknet folder and files

## Install Python3
python3.8 is already installed on Ubutu 20.04
```
$ sudo apt install python3-pip # python3-dev will be installed with python3-pip
$ sudo pip3 install opencv-python
```

## Modify .zshrc
```
$ cd
$ vi .zshrc
...
$ source .zshrc
```

.zshrc
```
JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-amd64
# $ JAVA_HOME=/usr/lib/jvm/java-1.11.0-openjdk
export JAVA_HOME

export CPLUS_INCLUDE_PATH="/usr/local/include"
export LIBRARY_PATH="/usr/local/lib"

CUDA_PATH=/usr/local/cuda-11.3
export CUDAT_PATH

export LD_LIBRARY_PATH=$CUDA_PATH/lib64:$LD_LIBRARY_PATH
export LD_LIBRARY_PATH="$LD_LIBRARY_PATH:/usr/lib/x86_64-linux-gnu/"

export PATH=$JAVA_HOME/bin:$PATH
export PATH=$CUDA_PATH/bin:$PATH
```

## Install Dev. IDE
https://linuxconfig.org/how-to-install-intellij-idea-on-ubuntu-20-04-linux-desktop

## Opencascade
 - download .tar file and unzip
 - install 3rd party first
### Install 3rd party
```
$ sudo apt install ffmpeg
$ sudo apt install libfreeimage-dev
$ sudo apt install libfreetype-dev
$ sudo apt install libvtk6-dev libvtk6-qt-dev
$ sudo apt install libocct-visualization-7.3
$ sudo apt install libvtk7-dev libvtk7-qt-dev
$ sudo apt install tcl-vtk7
install qt creator
$ sudo apt install libtbb-dev
$ sudo apt install tcl
$ sudo apt install libtclcl1-dev
$ sudo apt install libxmu-dev libxmu-headers libxi-dev
$ sudo apt install liblxi-dev lxi-tools # ??
```
https://wiki.qt.io/Install_Qt_5_on_Ubuntu

### Build Opencascade
 - cmake
 - make
 - make install
```
$ mkdir build
$ cd build
$ cmake ..
$ make
$ sudo make install
```
