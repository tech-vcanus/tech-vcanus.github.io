---
title: "Springboot-Jasypt-Encryption"
tags: Jasypt-Encryption
toc: true
toc_sticky: true
---

Written By [mskoo](https://github.com/mskoo-vcanus), VCANUS

Jasypt 라이브러리를 이용, Springboot application.properties id,pw 암호화에 대한 내용이다.
<br>
Jasypt 라이브러리 이용 방법과 암호화 프로그래밍 방법 정리

## Maven 추가

### 1. Jasypt
properties의 민감한 정보를 암호화하여 관리

```
<dependency>
	<groupId>com.github.ulisesbocchio</groupId>
	<artifactId>jasypt-spring-boot-starter</artifactId>
	<version>2.0.0</version>
</dependency>
```

### 2. bouncycastle
확장된 기능을 가진 암호 라이브러리.
암호화를 위한 도구로써 다양한 암호화 알고리즘을 가지고 있다.
[more information](https://www.bouncycastle.org/)

```
<dependency>
	<groupId>org.bouncycastle</groupId>
	<artifactId>bcprov-jdk15on</artifactId>
	<version>1.61</version>
</dependency>
```

----------
## Programing

### 1. JasyptConfig.java

```
@Configuration
@EnableEncryptableProperties
public class JasyptConfig {
    public final static String KEY = "encryptkey";

    @Bean("encryptorBean")
    public PooledPBEStringEncryptor stringEncryptor() {
        PooledPBEStringEncryptor encryptor = new PooledPBEStringEncryptor();
        encryptor.setProvider(new BouncyCastleProvider());  //사용할 알고리즘 공급자 요청
        encryptor.setPoolSize(2);
        encryptor.setPassword(KEY);  //암호화에 사용할 password
        encryptor.setAlgorithm("PBEWithSHA256And128BitAES-CBC-BC");
        encryptor.setSaltGenerator(new StringFixedSaltGenerator("someFixedSalt")); //고정값 지정할때
        return encryptor;
    }

}
```

PooledPBEStringEncryptor 클래스에서 다양한 설정값들을 set 할 수 있다.[more information](http://www.jasypt.org/api/jasypt/1.8/org/jasypt/encryption/pbe/PooledPBEStringEncryptor.html)

* setSaltGenerator()
필요한 경우 StringFixedSaltGenerator를 사용해 고정된 암호를 얻는다.


### 2. test

암호를 적용하기 위해 test 클래스에서 암호화 실행
 
```
@Test
    public void encryption(){
        PooledPBEStringEncryptor encryptor = new PooledPBEStringEncryptor();
        encryptor.setProvider(new BouncyCastleProvider());
        encryptor.setPoolSize(2);
        encryptor.setPassword(JasyptConfig.KEY);
        encryptor.setAlgorithm("PBEWithSHA256And128BitAES-CBC-BC");

        String plainText = "user";
        String encryptedText = encryptor.encrypt(plainText);
        String decryptedText = encryptor.decrypt(encryptedText);
        System.out.println("Enc:" + encryptedText + ", Dec:" + decryptedText);

        plainText = "password";
        encryptedText = encryptor.encrypt(plainText);
        decryptedText = encryptor.decrypt(encryptedText);
        System.out.println("Enc:" + encryptedText + ", Dec:" + decryptedText);

    }
```
![ssss](https://user-images.githubusercontent.com/76982066/108477955-3e148780-72d7-11eb-88c5-f4348d248b0a.PNG)

### 3. application.properties

```
jasypt.encryptor.bean=encryptorBean

spring.datasource.driverClassName=org.mariadb.jdbc.Driver
spring.datasource.jdbc-url=jdbc:mariadb://192.168.50.19:3306/schema
spring.datasource.username=ENC(rmZMtmcZVSPyqnmJcTGNpzPKZaQ9eGgYDa9wz9EpFUs=)
spring.datasource.password=ENC(2YTd9RDN6fFd+ge80NXS4dGOR1SfIg94Ycfw5bH6om4=)
```

(1) 콘솔창의 암호화된 문자열을 복사하여 application.properties의 값으로 설정한다.
이때 ENC(값) 으로 적용한다.

(2) 위에서 선언한 Bean도 마찬가지로 설정한다.

----------
