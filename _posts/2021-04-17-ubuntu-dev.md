# Install Development Environment

## Java
### Install OpenJDK
```
$ apt search openjdk
$ sudo apt install openjdk-8-jdk
$ sudo apt install openjdk-11-jdk
```

### Change Java version
```
$ sudo update-alternatives --config java
```

## Build Tools

### Maven
```
$ sudo apt install maven
```

### Ant
```
$ sudo apt install ant
```

### CMake
```
$ sudo apt install cmake
```

### Python
check python version
```
$ python3 --version
```
if python3 is installed (python3.8 is installed on Ubutu 20.04), install python3-pip
```
$ sudo apt install python3-pip # python3-dev will be installed with python3-pip
```

## Test Tools

### Unit Test for C/C++ (GTest)
```
$ sudo apt install googletest
```

## Libraries

### OpenSSL
check whether openssl is installed or not
(maybe installed)
```
$ sudo apt install openssl
$ sudo apt install libcurl4-openssl-dev
```

### Redis
```
$ sudo apt install libhiredis-dev
```

### Protobuf
```
$ sudo apt install libprotobuf-dev
$ sudo apt install libprotobuf-c-dev
```

### Thrift
```
$ sudo apt install libthrift-dev
```

### NATS
install snap
```
$ sudo apt install snapd
```
install nats by using snap
```
$ sudo snap install nats
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

export LD_LIBRARY_PATH="$LD_LIBRARY_PATH:/usr/lib/x86_64-linux-gnu/"

CUDA_HOME=/usr/lib/cuda
export PATH=$CUDA_HOME/bin:$PATH
```

## Install Cuda
```
$ nvcc --version
$ sudo apt install nvidia-cuda-toolkit
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
$ cmake CMakeList.txt -DBUILD_MODULE_Draw:BOOL=FALSE
```
