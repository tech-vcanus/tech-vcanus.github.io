---
title: Arduino Basics
categories: development
tags: Arduino Basics
toc: true
toc_sticky: true
---


Written By [HJ Jang](https://github.com/hei-jung), VCANUS

아두이노는 누구나 쉽게 동작시킬 수 있도록 설계된 단일 보드 마이크로컨트롤러(microcontroller)의 일종으로,
아두이노 프로그래밍 언어를 사용하여 보드의 동작을 제어할 수 있다.<br>
아두이노 언어는 C/C++과 거의 비슷한 형태를 띠고 있어 대부분의 C언어 표준라이브러리 함수를 사용할 수는 있지만, 조금 다른 특징을 가지고 있다.<br>


## Arduino 기본 구조

### setup()

setup() 함수는 보드 전원을 켜거나 보드에 프로그램을 로딩했을 때 맨 처음 한 번만 실행되는 함수로,
loop() 함수 실행 전 프로그램에서 사용할 변수와 핀 모드 등을 초기화한다.

```cpp
int btnPin = 4;
int ledPin = 5;

void setup() {
  Serial.begin(9600);
  pinMode(btnPin, INPUT);
  pinMode(ledPin, OUTPUT);
}
```

### loop()

loop() 함수에서는 보드의 상태 변화에 따른 반응을 제어한다.<br>
실시간/반복적으로 보드의 상태를 읽어 loop() 함수 내에 구현한 동작을 실행한다.<br>
예를 들어, 위의 setup() 예제에서 4번 핀에 연결된 버튼을 통해 5번 핀에 연결된 LED를 제어할 수 있다.

```cpp
void loop(){
  if (digitalRead(btnPin) == HIGH){
    digitalWrite(ledPin, HIGH);
  }
  else{
    digitalWrite(ledPin, LOW); 
  }
  delay(1000);
}
```


## Arduino 자료형 변환

아두이노의 자료형은 C/C++과 거의 다르지 않지만, 자료형의 변환에는 차이가 있다.

### char()

`char(x)`는 x를 char 타입으로 바꿔 반환한다.

### float()

`float(x)`는 x를 float 타입으로 바꿔 반환한다.

### int()

`int(x)`는 x를 int 타입으로 바꿔 반환한다.

### long()

`long(x)`는 x를 long 타입으로 바꿔 반환한다.

### String()

string 타입으로 변환하는 String()에는 세 가지 문법이 있다.<br>
String()의 첫 번째 인자 val에 사용할 수 있는 자료형은 string, char, byte, int, long, unsigned int, unsigned long, float, double이다.<br>

(1) String(val)

val을 string 타입으로 변환


(2) String(val, base)

val을 HEX(hexadecimal), BIN(binary), DEC(deciamal) 등의 base로 변환


(3) String(val, decimalPlaces)

val의 float 또는 double 타입일 경우, 소수점 지정<br>


이 외에도 괄호 안의 값을 byte, word 타입으로 변환하는 byte(), word()도 있다.

### (참고) 변수명, 함수명 설정 시 참고사항

아두이노 언어에서는 변수나 함수를 선언할 때 주로 `camelCase`를 사용한다.


## Arduino 자주 쓰이는 기본 함수

### 1. delay()

지연을 발생시킨다. 단위는 밀리초(ms).

### 2. Serial 함수

보드와 컴퓨터 간의 통신에 쓰이는 함수이다.
시리얼 모니터 또는 시리얼 플로터를 통해 신호를 송수신할 수 있다.

- Serial.begin(): 괄호 안의 baud rate에 맞춰 통신 시작
- Serial.print() / Serial.println(): 시리얼 모니터 또는 시리얼 플로터 창에 데이터를 출력한다.
- Serial.read(): 들어오는 시리얼 데이터를 읽는다.
- Serial.write(): 시리얼 포트 상에 binary 데이터를 쓴다.

### 3. Digital I/O 함수

HIGH 또는 LOW의 값을 읽거나 쓰거나 한다. 

- digitalRead()
- digitalWrite()
- pinMode()

### 4. Analog I/O

입력 전압을 비트 단위의 정수 값으로 읽거나 쓰거나 한다.

- analogRead()
- analogWrite()

