# OpenCV, Darknet, Yolov4 in Windows10
https://www.youtube.com/watch?v=sUxAVpzZ8hU

## Prerequisition
### 1. install Visual Studio (with English pack!!)
 - C#
 - C, C++
 - Add English in language pack !!!!
### 2. install vcpkg
#### install git
https://git-scm.com/download/win
#### install cmake
https://cmake.org/download/
 - check "for all users"
#### install vcpkg
https://vcpkg.io/en/getting-started.html?platform=windows
```
 $ .bootstrap-vcpkg.bat
 $ .vcpkg integrate install
 $ .vcpkg install <package-name>
```
 
#### setup system environment
 - register name: VCPKG_DEFAULT_TRIPLET , value: x64-windows
 - register name: VCPKG_ROOT, value: C:\vcpkg
![image](https://user-images.githubusercontent.com/33934527/117830782-ed497500-b2ae-11eb-8637-e62ba404063a.png)

### 3. install python3.8
 - checkt "add path" (important!!)
### 4. install CUDA Toolkit
#### install CuDnn
#### copy CuDnn files to CuDA
 - copy cudnn/cuda/bin/cudnn64_8.dll to program files/nvidia toolkit/cuda/v11.3/bin
 - copy cudnn/cuda/include/cudnn.h to program files/nvidia toolkit/cuda/v11.3/include
 - copy cudnn/cuda/lib/x64/cudnn.lib to program files/nvidia toolkit/cuda/v11.3/lib/x64
## install vcpkg
```
$ vcpkg install boost
$ vcpkg install opencv
$ vcpkg install darknet[full]:x64-windows
# $ vcpkg install darknet[full] --triplet x64-windows
```
### install opencv-python
```
$ pip install opencv-python
```
### check opencv in python
 run python in cmd
 ```
 >> import cv2
 >> cv2.__version__
 >> ...
 ```

## install OpenCV (build)
### download and setup for cmake
 - download opencv source, https://opencv.org/releases/
 - download opencv_contrib, https://github.com/opencv/opencv_contrib
 - extract two sources
 - make opencv folder and move the extracted folders to it
 ![image](https://user-images.githubusercontent.com/33934527/117842827-43231a80-b2b9-11eb-8056-d005d5ae2bf1.png)
### generate with Cmake
 - check BUILD_opencv_world
![image](https://user-images.githubusercontent.com/33934527/117842916-5504bd80-b2b9-11eb-8692-f3fe4aac8261.png)
### build with visual studio
 - open ./opencv/build/ALL_BUILD.vcxproj
 - set Release / x64 (if 64bit)
 - build CMakeTargets/ALL_BUILD
 - build CMakeTargets/INSTALL

## install Darknet
### prepare build
 - make folder
 ```
 $ cd c:\
 $ mkdir yolov4
 ```
 - download and decompress (C:\yolo_v4\darknet)
 https://github.com/AlexeyAB/darknet
 - copy opencv files to darknet folder
 ```
 $ cp /opencv/build/bin/Release/opencv_world452.dll C:\yolo_v4\darknet\build\darknet\x64
 $ cp /opencv/build/bin/Release/opencv_videoio_ffmpeg452_64.dll C:\yolo_v4\darknet\build\darknet\x64
 ```
 - copy cudnn file to darknet folder
 ```
 $ cp C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v11.3\bin\cudnn64_8.dll C:\yolo_v4\darknet\build\darknet\x64
 ```
### change CUDA version
 - cd C:\yolo_v4\darknet\build\darknet
 - modify darknet.vcxproj, yolo_cpp_dll.vcxproj
 - change CUDA version darknet-<your installed version>
### open yolo_cpp_dll.vcxproj and build it
