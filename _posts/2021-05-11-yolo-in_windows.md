# Yolov4 in Windows10

## Prerequisition
### 1. install Visual Studio
 - C#
 - C, C++
 - Add English in language pack
### 2. install vcpkg
```
 $ .bootstrap-vcpkg.bat
 $ .vcpkg integrate install
```
 
#### setup system environment
 - register name: VCPKG_DEFAULT_TRIPLET , value: x64-windows
 - register name: VCPKG_ROOT, value: C:\vcpkg
![image](https://user-images.githubusercontent.com/33934527/117830782-ed497500-b2ae-11eb-8637-e62ba404063a.png)

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
