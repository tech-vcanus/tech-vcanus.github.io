# Yolov4 in Windows10

## Prerequisition
### 1. install Visual Studio
 - C#
 - C, C++
 - Add English in language pack
### 2. install vcpkg
### 3. install python3.8
 - checkt "add path" (important!!)
### 4. install cmake
 - check "for all users"
### 5. install git
### 6. install CUDA Toolkit
### 7. install CuDnn
### 8. copy CuDnn files to CuDA
 - copy cudnn/cuda/bin/cudnn64_8.dll to program files/nvidia toolkit/cuda/v11.3/bin
 - copy cudnn/cuda/include/cudnn.h to program files/nvidia toolkit/cuda/v11.3/include
 - copy cudnn/cuda/lib/x64/cudnn.lib to program files/nvidia toolkit/cuda/v11.3/lib/x64
## install vcpkg
```
$ vcpkg install boost
$ vcpkg install opencv
$ vcpkg darknet
```
