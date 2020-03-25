---
title: "Fast Fourier Transform"
data: 2020-03-25 00:00:00 -0000
categories: development 
tags: FFT
use_math: true
---

Written By Park SunHong

## 차례
1. 이론적 배경   
    1-1. Fourier Series (푸리에 급수)   
    1-2. Fourier Transform (푸리에 변환)  
    1-3. Fast Fourier Transform (고속 푸리에 변환)

2. 파이썬으로 FFT 수행하기   
    2-1. 사용할 패키지 소개   
    2-2. fft 함수  
    2-3. 예제 코드 및 설명


      
## **1. 이론적 배경**
### **1-1. Fourier Series (푸리에 급수)**

periodic function을 sinusoid의 linear combination 형태로 표현할 수 있다.   
그 급수를 *Fourier Series*라고 한다.    
Euler's formula에 의해 $e^{jx}=cosx+jsinx$ 이므로 exponential의 결합 형태로 나타낼 수 있다.   
*cf) 전자공학에서는 전류와 기호가 겹치므로 허수를 j로 쓴다.*

> $$ x_{T_0}(t) = ... + a_(k-1)e^{j(k-1)w_ot}+ a_ke^{jkw_ot}+a_{k+1}e^{j(k+1)w_ot}+ ... \\ = \sum_{k=-\infty}^{\infty} a_k e^{jkw_0 t}$$
>(단, $T_o$는 주기, $\,k \in \mathbb{R},\,w_{0}\triangleq 2\pi f_{0})$

또한 $a_k$를 구할 수도 있다.  
$a_k$를 구하기 위해 inner product 개념이 이용된다.

>function의 inner product를 다음과 같이 정의한다.  
>
>$$<a(t), b(t)>\triangleq\int_{T_o}a(t)b^{*}(t)dt \,\,\, (* : conjugate)$$    
>그러므로   
>
>$$<e^{jkw_ot}, e^{jrw_ot}> = \int_{T_o}e^{j(k-r)w_ot}dt$$  
>Euler's formula에 의해 
>
>$$\int_{T_o}e^{j(k-r)w_ot}dt=\int_{T_o}cos(k-r)w_ot+jsin(k-r)w_otdt$$   
>$T_o$의 크기를 갖는 구간에서 sin과 cos의 정적분 값은 $k\ne r$일 때 0이 되므로 위 식은 0이 된다.  
>$k=r$일 때는 cos값이 1이 되므로 위 식은 $T_o$가 된다. 그러므로,  
>
>$$\int_{T_o}e^{j(k-r)w_ot}dt= \begin{cases} T_o, & (k=r) \\ 0 & (k\ne r) \end{cases}$$ 

이를 이용해 $a_k$를 구할 수 있다.

>1. $x_{T_0}(t) = \sum_{k=-\infty}^{\infty}a_k e^{jkw_ot}$ 에서 양변에 $e^{jrw_ot}$를 내적한다.  
>2. $\int_{T_o}x_{T_o}(t)e^{-jrw_ot}dt=\int_{T_o}\sum_{k=-\infty}^{\infty}a_ke^{j(k-r)w_ot}dt$
>3. $\int_{T_o}e^{j(k-r)w_ot}dt= \begin{cases} T_o, & (k=r) \\ 0 & (k\ne r) \end{cases}$ 이므로,    
$\int_{T_o}x_{T_o}(t)e^{-jrw_ot}dt=a_rT_o$
>4. 정리하면,  $a_k ={1 \over T_o}\int_{T_o}x_{T_o}(t)e^{-jkw_ot}dt$

inner product의 정의에 의하면   

$$a_k ={1 \over T_o}\int_{T_o}x_{T_o}(t)e^{-jkw_ot}dt={1 \over T_o}<x_{T_o}(t),e^{jkw_ot}>$$   
이다.   
이는 원 함수인 $x_{T_o}(t)$와 vector space의 basis 벡터인 k번째 exponential 성분과의 inner product를 의미한다.   
즉, 원 함수와 해당 basis 벡터와의 방향 일치도를 나타낸다고 볼 수 있다. 방향 일치도가 높을수록 해당 basis 벡터에 해당하는 sinusoid 파의 영향력이 크다고 할 수 있다.
 
### **1-2. Fourier Transform (푸리에 변환)**

주기 함수에만 적용되었던 푸리에 급수를 비주기 함수로 확장하기 위해, 주기 $T_o$를 무한대로 발산시킨다.  
$T_o$가 $\infty$라면 비주기 함수라고 할 수 있기 때문이다.   
$T_o \longrightarrow \infty$일 때 푸리에 급수의 계수 $a_k$는 0으로 수렴하지만 $a_kT_o$는 특정 값으로 수렴할 수 있다.   
$a_kT_o$값을 관찰하기 위해 $a_kT_o =\int_{T_o}x_{T_o}(t)e^{-jkw_ot}dt$에서 양변에 $lim_{T_o \to \infty}$를 취하면,  

>1. $T_o$가 무한대로 확장되므로 주기 내에서만 적용되던 함수 $x_{T_o}(t)$가 $x(t)$로 일반화된다.
>2. $kw_o$에서 $w_o\longrightarrow \infty$이고 $k$의 범위는 $-\infty \sim \infty$이므로 $k$의 값을 조정해 $kw_o$를 특정 실수값으로 만들 수 있다.   
>$\therefore kw_o \triangleq w \ (w$는 실수)  
>3. 2번에 의해 $kw_o$에 대한 함수였던 $a_kT_o$가 $w$에 대한 함수가 된다.   

위 세 가지 현상에 의해 $lim_{T_o \to \infty}a_kT_o =lim_{T_o \to \infty}\int_{T_o}x_{T_o}(t)e^{-jkw_ot}dt$는    

>$$X(w) = \int_{-\infty}^{\infty}x(t)e^{-jwt}dt$$

가 된다.   

이는 분석하고자 하는 파동 $x(t)$에 $e^{jwt}$를 inner product하면 주파수에 대한 함수로 변환된다는 것을 의미한다.   
그리하여 위 식을 푸리에 변환이라고 한다.
$a_k$는 0으로 수렴하지만 $a_kT_o$는 특정 값으로 수렴하는 분포를 이루므로, $X(w)$는 확률밀도함수와 유사한 기여밀도함수 개념이라고 이해할 수 있다.

***\* Discrete Fourier Transform(DFT)***   
Fourier Transform은 기본적으로 연속 함수에서 정의되었지만, 실제 디지털 시스템에서 분석해야 하는 신호는 이산 신호이다.   
따라서 디지털 시스템에선 배열을 활용한다. 적분을 $\sum$로 바꿔주면 Discrete Fourier Transform(DFT)이 된다.   
주기가 N인 수열 $\{x[n]\}_{n=0}^{N-1}$의 DFT $\{X[k]\}_{n=0}^{N-1}$는 다음과 같이 정의된다.  

>$$X[k]=\sum_{n=0}^{N-1}x[n]e^{-j2\pi k{n \over N}}$$

이는 연속 FT $X(w) = \int_{-\infty}^{\infty}x(t)e^{-jwt}dt$에서    
$\int \longrightarrow \sum$, $f \longrightarrow {n \over N}$, $t \longrightarrow n$, $dt \longrightarrow 1$ 의 변화가 일어난 것과 같다.  


### **1-3. Fast Fourier Transform (고속 푸리에 변환)**

DFT의 연산 속도를 높이는 알고리즘을 FFT라고 한다.   
그 중 가장 잘 알려져 있고 구현이 편한 것은 Cooley-Tukey 알고리즘이다.   
이 방법은 N을 2의 거듭제곱으로 설정한 후에 사용 가능하다.
이 방법의 개요는 다음과 같다.   
1. 급수의 앞 절반과 뒷 절반은 수식적으로 유사하다.   
2. 급수는 짝수 부분 a와 홀수 부분 b로 나눌 수 있다.  
3. 급수의 앞 절반은 a+b, 뒷 절반은 a-b이다.  
4. a와 b를 미리 구해놓으면 앞 절반과 뒷 절반을 쉽게 구할 수 있다.  
5. 이 과정은 재귀적으로 연산 가능하다.   


## **2. 파이썬으로 FFT 수행하기**
### **2-1. 사용할 패키지 소개**
```
$ from scipy import fftpack
$ import matplotlib.pyplot as plt
$ import numpy as np
```
1. numpy : 수학 및 과학 연산을 위한 패키지.    
2. matplotlib.pyplot : 그래프 그릴 때 이용.  
3. scipy : 과학, 분석, 엔지니어링에 필요한 과학적 컴퓨팅 영역을 위한 패키지  
    - numpy에도 fft 함수가 있다.

### **2-2. fft 함수**  

scipy 및 numpy에서 FFT를 할 때 이용되는 fft 함수는 원 신호의 y값을 배열로 받아,    
각 원소가 length 2인 배열의 배열을 반환한다.   
즉, $[[a[0],a[1]], [b[0],b[1]], ..., [z[0],z[1]]]$ 꼴인 배열을 반환한다.  
FFT는 DFT를 빠르게 하기 위한 방법일 뿐이므로, FFT의 본질은 DFT의 수행이다.  
그런데 위의 DFT 식인 $X[k]=\sum_{n=0}^{N-1}x[n]e^{-j2\pi k{n \over N}}$를 살펴보면 입력값에 $e^{-j2\pi k{n \over N}}$가 곱해져있다.   
$e^{-j2\pi k{n \over N}}$은 Euler's formula $e^{jx}=cosx+jsinx$에 의해 실수부와 허수부를 갖게 되는데,  
fft 함수가 반환하는 배열의 원소 배열은 차례대로 이 실수부와 허수부의 계수(실수) 값이다.   
즉, $[[a[0],a[1]], [b[0],b[1]], ..., [z[0],z[1]]]$에서 $a[0],a[1]$은 각각 특정 시점 샘플에서 fft를 수행한 결과물의 실수부 실숫값과 허수부 계숫값이다.  
fft 함수는 또한 cos의 대칭성에 의해 대칭적인 값을 반환하게 되는데 이는 $x=0$ 축에 대칭인 양의 주파수와 음의 주파수의 분포값이다.   
공학에서 분석할 원 신호는 real이므로 음의 주파수는 amplitude 계산에만 반영되고 주파수 도메인 그래프를 그릴 때는 양의 주파수 파트, 즉 절반만 그린다.


### **2-3. 예제 코드 및 설명**

이 예제에서는 세 종류의 sinusoid 파를 임의로 설정해 이 세 파동을 합치고, fft 함수를 이용해 주파수별 진폭을 추출한 후 그래프로 그려 볼 것이다.   

**1. 데이터 Sampling**   
```
$ freq_sampling1 = 10
$ amplitude1 = 2

$ freq_sampling2 = 20
$ amplitude2 = 20

$ freq_sampling3 = 30
$ amplitude3 = 9
```
1번 파동 : 주파수 10, 진폭 2  
2번 파동 : 주파수 20, 진폭 20  
3번 파동 : 주파수 30, 진폭 9  

```
$ time = np.linspace(0, 6, 500) 
```
np.linspace(그래프 시작점, 그래프 끝점, 샘플 개수)

```
y = amplitude1*np.sin(2*np.pi*freq_sampling1*time) + amplitude2*np.sin(2*np.pi*freq_sampling2*time) + amplitude3*np.sin(2*np.pi*freq_sampling3*time)
```
생성한 세 파동을 합쳐주는 코드.

```
plt.figure(figsize=(10, 4)) # 그래프 크기 설정
plt.plot(time,y, 'k', lw=0.8) # x축, y축, 색깔 설정, 선 굵기 설정
plt.xlim(0,6)  # x축의 최솟값과 최댓값 설정 
plt.show()  # 그래프 그리기
```

**2. FFT 수행**

```
yf = fftpack.fft(y, time.size)
```
fftpack.fft(y값, 표본의 크기)  
fft 함수를 적용한다. 

```
amp = np.abs(yf) # y값에 절댓값을 취한다.
freq = np.linspace(0.0, 1.0/(2.0*(6/500)), time.size//2) # x값 설정
```
기본적으로 FT는 연속 함수라는 것을 전제로 만들어진 방법이다.  
그런데 FFT에서는 DFT를 이용하므로 값이 튈 수가 있어 절댓값을 씌워줘야 한다.
그리고 FFT는 0에 대해 대칭적으로 나오므로 시간축을 반으로 나눠줘야 한다.

```
plt.figure(figsize=(10,6))  # 그래프 크기 결정
plt.plot(freq, (2/amp.size)*amp[0:amp.size//2])  # x값, y값 설정
plt.show() # 그래프 그리기
```
