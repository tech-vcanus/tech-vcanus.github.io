---
title: "Fast Fourier Transform"
data: 2020-03-25 00:00:00 -0000
categories: development 
tags: FFT
use_math: true
---

Written By Park SunHong, VCANUS

## 차례
1. 이론적 배경   
    1-1. Fourier Transform의 개념   
    1-2. DFT란?  
    1-3. FFT란?

2. 파이썬으로 FFT 수행하기   
    2-1. 사용할 패키지 소개   
    2-2. numpy.fft.fft 함수   
    2-3. 예제 코드 및 설명


      
## **1. 이론적 배경**
### **1-1. Fourier Transform의 개념**
![fftconcept](https://user-images.githubusercontent.com/58065100/77515440-e2b9f980-6ebb-11ea-9d51-de281b91c57e.png)  

$$
X(w)=\int_{-\infty}^{\infty}x(t)e^{-jwt}dt
$$

1. Time domain의 신호를 frequency domain으로 변환  
2. 신호의 주파수 성분을 분석할 때 이용  
3. Exponential 성분은 vector space의 basis vector로, 각각 특정 주파수를 대변  
4. 원신호와 주파수 basis의 inner product 결과물로서, 어떤 주파수가 얼마나 기여하고 있는지 의미

 
### **1-2. DFT란?**

$$
X(k)=\sum_{n=0}^{N-1}x[n]e^{-j2\pi k{n \over N}}
  (N : 샘플 개수) 
$$

1. 이산 신호의 푸리에 변환  
2. 디지털 시스템에서는 배열을 활용  
3. Fourier Transform에서의 f가 n/N에, t가 n에 대응  
4. $O(n^2)$ : 연산량이 많음 -> 컴퓨터에서의 처리속도 느림
  
### **1-3. FFT란?**

1. DFT의 연산 속도를 높이는 알고리즘  
2. Cooley-Tukey 알고리즘을 가장 많이 이용  
3. $O(n^2)$ 의 연산량을 O(nlogn)으로 줄여줌  
4. DFT의 부분유사성 이용
    - N-DFT를 a(=짝수 N/2-DFT)와 b(=홀수 N/2-DFT)로 나눔
    - N-DFT의 앞 절반값은 a+b, 뒤 절반값은 a-b  
5. 재귀적으로 연산 가능  
6. 샘플 수(N)가 $2^n$ 꼴이어야 사용 가능  



## **2. 파이썬으로 FFT 수행하기**
### **2-1. 사용할 패키지 소개**
```
$ import matplotlib.pyplot as plt
$ import numpy as np
```
1. numpy : 수학 및 과학 연산을 위한 패키지.    
2. matplotlib.pyplot : 그래프 그릴 때 이용.  

### **2-2. numpy.fft.fft 함수**  

```
numpy.fft.fft(a, n=None, axis=-1, norm=None)
```
1. Parameters  
    - a (array_like) : input 배열. Complex 원소도 가능.  
    - n (optional, int) : output의 길이. Input 길이보다 작으면 input이 crop되고, input 길이보다 크면 input이 zero padding 된다.  
    - axis (optional, int) : FFT를 수행할 axis. 미입력시 마지막 axis가 이용됨.  
    - norm (optional, {None, “ortho”}) : normalize 여부. 기본은 None.
2. Returns : input array의 DFT 연산 결과물인 Complex 원소를 가진 배열이 반환됨.


### **2-3. 예제 코드 및 설명**

이 예제에서는 세 종류의 sinusoid 파를 임의로 설정해 이 세 파동을 합치고, fft 함수를 이용해 주파수별 진폭을 추출한 후 그래프로 그려 볼 것이다.   

**1. 필요한 라이브러리들을 import하고, FFT 분석을 위한 합성 신호를 생성**   
```
import matplotlib.pyplot as plt  	# plot을 그려주는 라이브러리 import 
import numpy as np  	# 수학 및 과학 연산을 위한 라이브러리 import

freq_sampling1 = 10
amplitude1 = 5 	# 첫 번째 신호 : 주파수 10, 진폭 5
freq_sampling2 = 20
amplitude2 = 4 	# 두 번째 신호 : 주파수 20, 진폭 4
freq_sampling3 = 30
amplitude3 = 2 	# 세 번째 신호 : 주파수 30, 진폭 2
time = np.linspace(0, 6, 500)     # time 축 배열 생성. 0~6초 사이에 500개의 sample을 딴다는 의미.
y = amplitude1*np.sin(2*np.pi*freq_sampling1*time) +
amplitude2*np.sin(2*np.pi*freq_sampling2*time) +
amplitude3*np.sin(2*np.pi*freq_sampling3*time)     # 위에서 만든 세 개의 신호를 합성해 y축 배열 생성.
```   
* linspace(start, end, num) : 첫 번째 원소가 start, 마지막 원소가 end, length가 num인, 등차수열 배열을 만들어주는 함수  

**2. 생성한 합성 신호를 그래프로 그려보기**  

```
plt.figure(figsize=(10, 4))      # 그래프 크기 설정
plt.plot(time, y, 'g', lw=0.5)      # matplotlib.plot(x축 배열, y축 배열, 선 색깔, 선 굵기)
plt.xlim(0,6)      # matplotlib. xlim(x축 시작점, x축 끝점)
plt.show()      # matplotlib.show() : 그래프 표시

```
![signal-graph](https://user-images.githubusercontent.com/58065100/77515495-f49b9c80-6ebb-11ea-938f-c755661bed9b.png)  


**3. fft 함수 적용하고 후처리하기** 

```
yf = np.fft.fft(y, time.size)     # numpy.fft.fft(input 배열, output 길이) 
amp = np.abs(yf)     # output 배열의 각각의 원소의 크기 배열 생성
freq = np.linspace(0.0, (0.5)*(500/6), (time.size//2))     # fft 그래프의 x축 배열 생성
```
1. fft는 complex 배열을 반환하지만, 그래프 y축은 amplitude이므로 실숫값.
    - complex의 크기를 구하는 abs 함수를 써 크기를 원소로 갖는 배열 생성 후 y축 배열로 설정. 
2. fft 함수 적용 후 반환된 배열의 domain은 frequency
    - 0부터 sampling frequency인 500/6 까지 x축에 해당
    - 그런데, DFT 식의 특성상 sampling 표본의 처음부터 절반까지만 유효
    - 절반부터 끝까지는 앞 절반의 대칭인 쓰레기 값
    - 그러므로, frequency 배열을 반으로 잘라야 한다.
    - 즉, fft 적용 후 frequency domain의 범위는 (0, fs/2)가 된다.
    - fft 결과 주파수 A까지의 결과를 보고 싶다면 sampling frequency는 2A 이상이어야 함.


**4. fft 적용 결과를 그래프로 그려보기** 

```
plt.figure(figsize=(10,6))    # 그래프 크기 설정
plt.plot(freq, (2/amp.size)*amp[0:amp.size//2])    # matplotlib.plot(x축 배열, y축 배열)
```

* (2/amp.size)*amp[0:amp.size//2]에 대해 :  
   1. ((진폭값)*2)/(배열의 크기) 를 amp 배열의 앞 절반 각각의 원소에 적용.  
   2. frequency 배열을 절반 잘랐으므로 amp 배열도 앞 절반만 이용하게 된다.
   3. 표본의 크기가 커지면 복수 주기의 값이 여러 번 쌓이므로 진폭의 상대적 비율은 유지되지만 진폭의 절대적 크기가 커짐.
   4. 따라서 진폭의 크기를 표준화 해주어야 하므로 배열 크기로 나눔.
   5. amp 배열을 절반만 이용하는데 배열 크기로 나누어줬으므로 2를 곱해준다.

```
plt.show()       # matplotlib.show() : 그래프 표시
```  
![fft-graph](https://user-images.githubusercontent.com/58065100/77515530-05e4a900-6ebc-11ea-9035-54495493c96c.png)  

<fft 결과 그래프>

주파수 10, 진폭 5  
주파수 20, 진폭 4  
주파수 30, 진폭 2  

인 신호가 섞여 있음을 나타낸다.       

**5. 표본 숫자에 따른 fft 적용 결과 비교**     
    
![fft-graph](https://user-images.githubusercontent.com/58065100/77515530-05e4a900-6ebc-11ea-9035-54495493c96c.png)   
N = 500 일 때  

     
![fft-graph](https://user-images.githubusercontent.com/58065100/77515551-1006a780-6ebc-11ea-85a1-7d7df62e3968.png)   
N = 5000 일 때        

Sampling frequency가 높을수록 결과가 정확해진다.
