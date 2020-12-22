---
title: "LattePanda GPIO Programming"
tags: DAC Arduino setup
toc: true
toc_sticky: true
---

Written By [HJ Jang](https://github.com/hei-jung), VCANUS

<br>

## PC 설정

### 1. 개발자 모드 ON

Windows 설정 > 업데이트 및 보안 > 개발자용 > 개발자 모드 `켬`으로 설정

![개발자모드_ON](https://user-images.githubusercontent.com/40985307/102468823-5d075b00-4095-11eb-8fa8-d77c025c8d39.png)


### 2. LattePanda.Firmata 라이브러리 다운로드

[여기서](https://github.com/LattePandaTeam/LattePanda-Development-Support) ZIP 파일 다운로드

### 3. Arduino 로드 

#### (1) LattePanda의 내장 GPIO를 사용할 수 있는 프로그램 로드

File > Examples > Firmata > StandardFirmata<br>
(파일 > 예제 > Firmata > StandardFirmata)

#### (2) 보드 및 포트 설정

- Tools > Board > "Arduino Leonardo" (툴 > 보드 > "Arduino Leonardo")<br>
- Tools > Port > "COMX (Arduino Leonardo)" (툴 > 포트 > "COMX (Arduino Leonardo)")

## `C#` 프로젝트

1. Visual Studio에서 새 프로젝트 생성(콘솔 앱(.NET Framework))
2. 위에서 다운 받은 라이브러리 파일에서 Arduino.cs를 프로젝트에 추가

Program.cs에 라이브러리 불러오기

```cs
using LattePanda.Firmata;
```

클래스 사용

```cs
Arduino arduino = new Arduino();
```

## `C#` 예제

### LED toggle

```cs
private static void Test1()
{
	Console.WriteLine("LED Blink Start!!!");
	arduino.pinMode(13, Arduino.OUTPUT);
	while (true)
	{
		arduino.digitalWrite(13, Arduino.HIGH);
		Thread.Sleep(1000);
		arduino.digitalWrite(13, Arduino.LOW);
		Thread.Sleep(1000);
	}
}
```

성공적으로 실행될 경우, 빨간색 LED가 1초에 한번씩 깜빡거린다.

### I2C 통신(DAC 연결 시)

```cs
private static void Test2()
{
	/*
	 * public void wireBegin(Int16 delay);
	 * : I2C 버스 설정 및 초기화. 한 번만 사용할 것.
	 * public void wireRequest(byte slaveAddress, Int16 slaveRegister, Int16[] data, byte mode);
	 * : I2C 통신 모듈에 데이터 송수신 요청 보낸 후, didI2CDataReveive를 call함
	 *   - slaveAddress: 통신 모듈의 주소(MCP4725의 경우 기본 주소 0x62)
	 *   - slaveRegister: 데이터를 읽고 쓸 레지스터 주소
	 */
	arduino.wireBegin(200);
	// I2C에 데이터 쓰기
	arduino.wireRequest(0x62, Arduino.NONE, new Int16[] { 1, 2, 3 }, Arduino.I2C_MODE_WRITE);
	// I2C 데이터 송수신 확인
	arduino.didI2CDataReveive += Arduino_didI2CDataReveive;

}

private static void Arduino_didI2CDataReveive(byte address, byte register, byte[] data)
{
	// I2C 데이터 수신 이벤트에 대한 핸들러
	Console.WriteLine("I2C request event");
}
```

## LattePanda GPIO 핀 참고

![lattepanda_gpio](https://user-images.githubusercontent.com/40985307/102469060-a788d780-4095-11eb-9314-2ec0a139c8ea.png)

(이미지 출처: https://www.lattepanda.com/lattepanda-docs)


---
참고링크: [LattePanda 페이지](http://docs.lattepanda.com/content/1st_edition/vs_programming/)
