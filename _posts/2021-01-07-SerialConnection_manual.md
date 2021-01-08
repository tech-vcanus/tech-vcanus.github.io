---
title: "SerialConnection_manual"
tags: SerialPort modbus DASUtil SDK
toc: true
toc_sticky: true
---

Written By [mskoo](https://github.com/mskoo-vcanus), VCANUS

M-7024 모델을 이용한 SerialPort Connection(ModBusRTU)에 대한 내용이다
<br>
DASUtill, SDK 프로그램 이용 방법과 Master write 프로그래밍 방법 및 사용 법 정리

# DASUtil 이용 방법

### 1. 프로그램 다운 경로
[다운로드 링크](https://www.icpdas.com/en/download/show.php?num=1046&root=&model=&kw=DCON%20Utility) 에서 DCON_Utility_Pro_PC_V4 다운

### 2. 프로그램 설치 경로
zip해제 후 > DCON_Utility_Pro_PC > DCON_Utility_Pro.exe 설치

### 3. 프로그램 실행 및 설정 방법
(1) DCON_Utility_Pro.exe 실행
(2) COM Port 누르고 Search Options 설정

![settingport](https://user-images.githubusercontent.com/76982066/103884431-f02a3280-5121-11eb-83e6-3766a288eaf9.png)

![settinginfo](https://user-images.githubusercontent.com/76982066/103970240-1647e500-51ab-11eb-95cd-e2dbe9288eeb.PNG)

![settinginfo2](https://user-images.githubusercontent.com/76982066/103884858-83636800-5122-11eb-8dc8-224b0bc1201d.PNG)

![settinginfo3](https://user-images.githubusercontent.com/76982066/103884885-8f4f2a00-5122-11eb-8945-ce8cba1178eb.PNG)

![settinginfo4](https://user-images.githubusercontent.com/76982066/103884903-94ac7480-5122-11eb-9d4d-b505e63cdb32.PNG)

참고 : [DCON Utility Pro User Manual](https://www.icpdas.com/web/product/download/software/utility_driver/dcon_utiltiy_pro/document/manual/DCON_Utility_Pro_user_manual_en.pdf)

(3) Start Search 화살표 클릭하여 포트정보 찾기

![findport](https://user-images.githubusercontent.com/76982066/103882790-a80a1080-511f-11eb-8895-57822aee7045.png)

(4) 찾은 정보 확인

![findresult](https://user-images.githubusercontent.com/76982066/103882818-b2c4a580-511f-11eb-914c-7de5a69277b2.PNG)

----------
# DAS SDK(NModbus4 라이브러리) 설치

### 1.프로그램 다운로드 경로
(1)프로젝트를 만든 후 우측의 “솔루션 탐색기”의 “프로젝트(ModbusExample)“에 우클릭으로 “NuGet 패키지 관리(N)..”를 선택

![dll1](https://user-images.githubusercontent.com/76982066/103958938-ba249700-5191-11eb-8c3b-437e1fee8b21.PNG)

(2) “찾아보기” 선택 > 검색창에 “NModbus” 검색 > “NModbus4” 선택 > “설치” 클릭

![dll2](https://user-images.githubusercontent.com/76982066/103958947-bee94b00-5191-11eb-8cc1-0f4bf50ffe85.PNG)

(3) 출력창에서 NModbus4 라이브러리 설치 상태를 확인

![dll3](https://user-images.githubusercontent.com/76982066/103958956-c3adff00-5191-11eb-8c08-b6853e80f538.PNG)


----------

## 프로그래밍

### 1.  NModbus4 라이브러리 참조

(1) 위 DAS SDK(NModbus4 라이브러리) 설치 참조
(2) 다운 받은 라이브러리 불러오기

```cs
using Modbus.Device;
```

### 2. 참조 함수

(1) 클래스 사용

```cs
SerialPort port = new SerialPort();
ModbusSerialMaster master = new ModbusSerialMaster();
```

(2) write 함수

```cs
void WriteSingleRegisters(byte slaveAddress, ushort startAddress, ushort[] data);
```

### 3. 포트 설정 및 설정 값

(1) port Setting
```cs
port.PortName = cboxPortList.Text;
port.BaudRate = 9600;
port.DataBits = 8;
port.Parity = Parity.None;
port.StopBits = StopBits.One;
```

(2) master Setting
```cs
master = ModbusSerialMaster.CreateRtu(port);
```
	
(3) write
registerAddress 인자는 주소값이 40003번지라면 40003이 아닌 3을 넣어야 함
value 허용범위값 : 0 - 10V -> 0 - 10000

```cs
byte slaveAddress = Convert.ToByte(txtSlaveAdress.Text);
ushort registerAddress = Convert.ToUInt16(txtRegiAdress.Text); //ex)40003->3
ushort value = Convert.ToUInt16(txtValue.Text); //0~10V : 0~10000
master.WriteSingleRegister(slaveAddress, registerAddress, value);
```	


### 4. address 정리<br>

![address](https://user-images.githubusercontent.com/76982066/103967080-8ef77300-51a4-11eb-87a1-12adb78978f9.PNG)

참고 : [Series User Manual link(M-7024)](https://www.icpdas.com/web/product//download/io_and_unit/rs-485/document/manual/7000/I-7021_I-7021P(D)_I-7022_I-7024_I-7024R_M-7022_M-7024_M-7024L_M-7024R_M-7024U(D)_M-7028_en.pdf)

----------

## MmodBusRtu_M7024 사용법
위 프로그래밍으로 작성한 실행파일 및 라이브러리 사용법이다.

### 1.  exe 파일 실행

[vsc_serial_communication](https://github.com/vcanus/vcs_serial_communication) -> SerialPortConnection -> bin -> Release -> SerialPortConnection.exe 실행

### 2. dll 파일 참조
(1) 참조 경로

[vsc_serial_communication](https://github.com/vcanus/vcs_serial_communication) -> SerialPortConnection -> bin -> Debug -> SerialPortConnection.dll 참조 추가

(2) 코드 추가

```cs
using ModbusRtu_M7024;
using System.Threading;
```

```cs
ModbusRtu_M7024.ModbusRtu_M7024 modbusRtu_m7024 = new ModbusRtu_7024.ModbusRtu_M7024();

```


### 3. cs 사용법
(1) comboBox 에서 port name 설정 연결버튼 클릭

![exe1](https://user-images.githubusercontent.com/76982066/103968860-037fe100-51a8-11eb-99f2-4ce6fd2ecaea.PNG)

![exe2](https://user-images.githubusercontent.com/76982066/103968866-05e23b00-51a8-11eb-9e06-a1b2cb83ce59.PNG)

(2) 송신 textBox에 각각 값 입력 후 Write버튼 클릭

![exe3](https://user-images.githubusercontent.com/76982066/103968869-08449500-51a8-11eb-87ec-66ec0821f3e8.PNG)



