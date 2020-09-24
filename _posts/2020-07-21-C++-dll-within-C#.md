---
title: C++ DLL within C#
date: 2020-07-21
categories: development
tags: C++ C# Marshalling DLL
toc: true
toc_sticky: true
comments: true
---

Written By [Nuri Na](https://github.com/nurring), VCANUS

C++ 프로젝트의 함수를 C#에 가져와 사용하도록 환경 설정 하는 법.

1. 외부 C++ API 를 포함시켜
2.  C++ 동적 라이브러리(dll)를 생성하고
3. C# 프로젝트에 Import 한 후
4. C++과 C#간 데이터 타입을 맞춰줌.



예제에서 사용할 파일명은 다음과 같다.

​	외부 API: Somedll.h, Somedll.lib, 

​	C++ 프로젝트: dynamic_example.h, dynamic_example.cpp

​	C# 프로젝트: dynamic_example.cp

## 1. C++ API Import

1. **DLL 동적 라이브러리 프로젝트 생성**

   ![dllproject](/assets/images/2020-07-21.png)

2. **.h (헤더) 파일 디렉터리 추가하기**

   <u>솔루션 탐색기 - 프로젝트명 우클릭 - 속성 - C/C++ - 일반 - 추가 포함 디렉터리</u>

   상대 경로(현재 프로젝트 위치 기준) 혹은 절대 경로를 적어준다.

   *ex) ../include*

3. **.lib (정적 라이브러리) 파일 디렉터리 추가하기**

   <u>솔루션 탐색기 - 프로젝트명 우클릭 - 속성 - 링커 - 입력 - 추가 종속성</u>

   상대 혹은 절대 경로를 포함한 .lib 파일명 전체를 적어준다.

   *ex) ../lib/x86/Somedll.lib*

4. **.dll (동적 라이브러리) 파일 디렉터리 추가하기**

   <u>솔루션 탐색기 - 프로젝트명 우클릭 - 속성 - 구성 속성 - 디버깅 - 환경</u>

   .dll 파일이 포함 된 디렉토리 경로를 다음 형식으로 적어 준다.

   ```PATH=파일 경로1;파일 경로2;%PATH%```

   *ex) PATH=../lib/x86;%PATH%*

5. **컴파일 경로 설정**

   <u>솔루션 탐색기 - 프로젝트명 우클릭 - 속성 - 구성 속성 - 일반 - 출력 디렉토리</u>

   매크로를 참고하여 경로를 설정한다.

   *ex) $(SolutionDir)bin\$(Configuration)\\*

## 2. Make my .DLL file

1에서 포함시킨 dll을 include하여  .h, .cpp파일을 작성한다.

```c++
// C++
// dynamic_example.h
#pragma once
#include "external_api_name.h"
#ifdef DYNAMICEXAMPLELIBRARIES_EXPORTS
#define DYNAMICEXAMPLELIBRARIES_API __declspec(dllexport)
#else
#define DYNAMICEXAMPLELIBRARIES_API __declspec(dllimport)
#endif

extern "C" DYNAMICEXAMPLELIBRARIES_API int test();
```

```cpp
// C++
//dynamic_example.cpp
#include "pch.h"
#include "dynamic_example.h"
int test(){
    return 123;
}
```

참고 링크: [자체 동적 연결 라이브러리 만들기 및 사용(C++)](https://docs.microsoft.com/ko-kr/cpp/build/walkthrough-creating-and-using-a-dynamic-link-library-cpp?view=vs-2019)



## 3. Import to C# project

C# 프로젝트를 생성하고, 

C#에서 C++ 프로젝트를 직접 참조할 수도 있으나, 여러 외부 라이브러리를 사용할 경우 런타임 옵션의 충돌로 컴파일 에러 혹은 실행 중 중단 현상이 발생할 확률이 높다. 

같은 솔루션에 포함시키되 **빌드 후 이벤트**를 설정하여 DLL을 필요한 위치(해당 C++ DLL을 포함해야 하는 프로젝트의 빌드 경로)에 복사하도록 한다.

매크로를 참고하여 경로를 설정한다.

<u>솔루션 탐색기 - 프로젝트(C++)명 우클릭 - 속성 - 빌드 이벤트 - 빌드 후 이벤트 - 명령줄</u>

*ex) copy "$(TargetDir)\dynamic_example.dll"  "$(SolutionDir)dynamic_example_prj\bin\Debug\\"*
*copy "$(TargetDir)\dynamic_example.lib"  "$(SolutionDir)dynamic_example_prj\bin\Debug\\"*



## 4. Marshalling

C++의 함수를  C#에서 사용 가능한 데이터 타입으로 처리하는 것을 Marshalling(마샬링)이라고 한다.

int 등 변환이 필요하지 않은 경우 그대로 사용한다.

아래는 **구조체**와 **배열**의 사용 예제.  데이터 타입과 포인터, 참조자의 문법적 변화에 주목할 것.

```c++
// C++
// dynamic_example.h (헤더 파일)
#include <Somedll.h> //외부 API
...
// 구조체 선언
typedef struct DYNAMICEXAMPLELIBRARIES_API _exampleStruct
{
	int a;
	float b;	
} exampleStruct;
...

extern "C" DYNAMICEXAMPLELIBRARIES_API void test_external(exampleStruct* exam);//구조체, 포인터
extern "C" DYNAMICEXAMPLELIBRARIES_API void test_array(int16_t(&array)[10]);//배열, 참조자
```

``` c++
// C++
// dynamic_example.cpp (소스 파일)
...
someStruct someStr; //외부 API 구조체
int16_t newarray[10] = { 0 };

/*외부 함수가 만들어내는 someStr 구조체를 shallow copy하는 예제*/
void test_external(exampleStruct* exam){
    external_func1(&someStr);//외부 API 함수 external_func1
    exam->a = external.a;
    exam->b = external.b;
}

/*외부 함수가 만들어내는 newarray를 deep copy하는 예제*/
void test_array(int16_t(&array)[10]){
    int result = external_func2(newarray);//외부 API 함수 external_func2
	std::copy(std::begin(newarray), std::end(newarray), std::begin(array));//deep copy
}
```

``` csharp
// C#
// dynamic_example.cs
using System.Runtime.InteropServices;
...
[StructLayout(LayoutKind.Sequential, CharSet=CharSet.Unicode)]
public struct exampleStruct
{
    public int a;
    public float b;
};
...
    
//Dll Import
[DllImport("dynamic_example.dll", CallingConvention = CallingConvention.Cdecl)]
extern public static void test_external(ref exampleStruct es);
[DllImport("dynamic_example.dll", CallingConvention = CallingConvention.Cdecl)]
extern public static void test_array(
    [MarshalAs(UnmanagedType.LPArray, SizeConst = 10)] short[] array);

//함수 사용
exampleStruct example = new exampleStruct();
short[] array = new short[10];
test_external(ref example);
test_array(array);
```



## 5. Marshalling(동적 배열)

*마샬링(marshalling) : 하나 이상의 프로그램 또는 연속적이지 않은 저장공간으로부터 데이터를 모은 다음, 이들을 메시지 버퍼에 집어넣고 특정 수신기나 프로그래밍 인터페이스에 맞도록 그 데이터를 조직화하거나, 미래 정해진 다른 형식으로 변환하는 과정. 

주로 한 언어로 작성된 프로그램의 출력 매개변수를 다른 언어로 작성된 프로그램의 입력으로 전달해야 하는 경우 필요하다



__동적 배열 예제__

__C++ code__

```c++
// c++
// arrayTest.h


#ifndef ARRAYTEST_H
#define ARRAYTEST_H

#include <vector>
#include <iostream>
#include <string>

class arrayTest
{
public:
	static arrayTest* get_instance();
				
	// double 배열 c++에서 set 해주는 예제
	void double_set_array(double** datas, int* length);
				
	// string 배열 get 예제
	void string_get_array(char** datas, int length);
				
	// double 배열 get 하고 std::copy 해주는 예제
	void double_get_array(double* datas, int length);
  
  	// string return 해주는 예제
  	char* string_return();
	
	// bool 배열 get 예제
	void bool_get_array(bool* IEPE,int length);
private:
  	double* double_array;
	bool* bool_array;
  	int double_length;
	std::vector<double> vector_data;
  	string str_data;
};

extern "C"{
	__declspec(dllexport) void double_set_array(double** datas, int* length);
	__declspec(dllexport) void string_get_array(char** datas, int length);
	__declspec(dllexport) void double_get_array(double* datas, int length);
  	__declspec(dllexport) char* string_return();
	__declspec(dllexport) void bool_get_array(boo* IEPE, int length);
}

#endlf
```



```c++
// c++
// arrayTest.cpp

// 무조건 pch.h 헤더파일이 맨 앞으로 오게 한다!
#include "pch.h"
#include "arrayTest.h"

arrayTest* arrayTest::get_instance()
{
	static arrayTest instance;
	return &instance;
}

void double_set_array(double** datas, int* length)
{
	// 역참조 사용, 주소로 참조해서 값을 넣어줘야 하기 떄문에
	*length =(int)this->length;
			
	// CoTaskMemAlloc() : 마샬링하는데 사용하는 메모리 할당 함수, COM 기반 애플리케이션에서 메모리를 공유하는 유일한 방법
	*datas = (double*)::CoTaskMemAlloc(sizeof(double) * this->length);
			
	// vector->double[] 복사.
	std::copy(vector_data.begin(), vector_data.end(), *datas);
}

void string_get_array(char** datas, int length)
{
			
}

char* string_return()
{
	int size = this->str_data.size();
  	char* data = new char[size];
  	strcpy(data,this->str_data.c_str());
  	return data;
}

void double_get_array(double* datas, int length)
{
  	// 담아주는 c++ 배열 동적 메모리 할당
	this->double_array = new double[length];
  		
  	// std::copy
  	std::copy(datas, datas + length, this->double_array)
}

void bool_get_array(bool* IEPE, int length)
{
  	// 담아주는 c++ 배열 동적 메모리 할당
	this->bool_array = new bool[length];
  		
  	// std::copy
  	std::copy(IEPE, IEPE + length, this->bool_array)
}


/** DLL - Function **/

void double_set_array(double** datas, int* length)
{
	return arrayTest::get_instance()->double_set_array(datas, length);  	
}

void string_get_array(char** datas, int length)
{
	return arrayTest::get_instance()->string_get_array(datas, length);  	
}

char* string_return()
{
	return arrayTest::get_instance()->string_return();  	
}

void double_get_array(double** datas, int* length)
{
	return arrayTest::get_instance()->double_get_array(datas, length);  	
}

void bool_get_array(bool IEPE, int length)
{
	return arrayTest::get_instance()->bool_get_array(IEPE, length);  	
}
```



__c# code__

```c++
// C#
// arrayTest.cs
using System.Runtime.InteropServices;
...
  
// double 배열 정보 c++에서 set 해주는 예제  
[DllImport("arrayTest.dll", CallingConvention = CallingConvention.Cdecl)]
extern public static void double_set_array([Out] out IntPtr datas, [Out] out int length);

// string 배열 정보 c++로 보내는 예제 
[DllImport("arrayTest.dll", CallingConvention = CallingConvention.Cdecl)]
extern public static void string_get_array(string[] data, int length);

// double 배열 정보 c++로 보내는 예제
[DllImport("arrayTest.dll", CallingConvention = CallingConvention.Cdecl)]
extern public static void double_get_array(double[] datas,int length);

// string 정보 c++ 에서 return 하는 예제 
[DllImport("arrayTest.dll", CallingConvention = CallingConvention.Cdecl)]
extern public static Intptr string_return();

//bool array c# -> c++ 로 보내는 예제
[DllImport("arrayTest.dll", CallingConvention = CallingConvention.Cdecl)]
extern public static void bool_get_array (
            [MarshalAs(UnmanagedType.LPArray, ArraySubType = UnmanagedType.I1)]
            bool[] isIEPE,
	    int Length);

//ex1) double 배열 정보 c++에서 set 해주는 예제  
void double_set_array()
{
  	// 포인터 초기화
	Intptr IntPtrData = IntPtr.Zero;
  	
  	// c++에서 배열 길이 가져오는 int 변수 초기화
  	int length = 0;
  	
  	//dll 함수 호출
  	double_set_array(out IntPtrData, out length);
  	
  	// c# 에서 copy 할 double array 생성
  	double[] data = new double[length];
  	
  	// 마샬링 copy
  	Marshal.Copy(IntPtrData, data, 0, length);
  
  	// 동적 메모리 해제
  	Marshal.FreeCoTaskMem(IntPtrData);
  	
}

//ex2) string 배열 정보 c++로 보내는 예제 
void string_get_array()
{
  	// 보낼 배열 과 배열 사이즈
  	int length = 3;
  	string[] data = new string[length]{"info1", "info2", "info3"};
  	
  	// dll 함수 호출
	string_get_array(data, length);
}

//ex3) double 배열 정보 c++로 보내는 예제
void double_get_array()
{
  	// 보낼 배열 과 배열 사이즈
  	int length = 3;
  	double[] data = new double[length]{1.0, 2.0, 3.0};
  	
  	// dll 함수 호출
  	double_get_array(data, length);
}

//ex4)
void string_return()
{
  	//포인터 return
	Intptr ptr = string_return();
  	
  	//포인터 -> string 변환
  	string strData = Marshal.PtrToStringAnsi(ptr);
  
  	// 메모리 할당 해제
  	Marshal.FreeHGlobal(ptr);
}

//ex5)
void bool_get_array()
{
  	bool[] boolArray = new bool[4];
	for(int i=0; i<boolArray.Length; i++)
	{
	    boolArray[i] = true;
	}
	bool_get_array(boolArray,boolArray.Length);
}
```



































