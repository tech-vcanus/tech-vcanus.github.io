---
title: "Log Rolling"
data: 2019-10-30 00:00:00 -0000
categories: development
tags: Log rolling configuration
---

Written by BGKim, VCANUS

# Log4j2

## Add maven dependency
pom.xml
```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-logging</artifactId>
        </exclusion>
    </exclusions>
</dependency>

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-log4j2</artifactId>
</dependency>

<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <optional>true</optional>
</dependency>
```
spring-boot-starter
> 'spring-boot-starter'의 기본 로깅을 제외 시킨다.

lombok
> 클래스 상단에 @log4j2을 사용, log작성시 로거객체 생성이 필요없다.

## Add log4j2.xml in folder resources
log4j2.xml
```
<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="warn" moniterInterval="30">
    <Properties>
        <Property name="LOG_PATTERN">%d{yyyy-MM-dd HH:mm:ss.SSS} %p %M %m%n</Property>
        <Property name="LOG_ROOT">log</Property>
    </Properties>
    <Appenders>
        <Console name="Console" target="SYSTEM_OUT" follow="true">
            <PatternLayout pattern="${LOG_PATTERN}" />
        </Console>

        <RollingFile name="RollingFile"
                     fileName="${LOG_ROOT}/application.log"
                     filePattern="${LOG_ROOT}/application-%d{yyyy-MM-dd}-%i.log">
            <PatternLayout pattern="${LOG_PATTERN}" />
            <Policies>
                <SizeBasedTriggeringPolicy size="300KB" />
                <TimeBasedTriggeringPolicy interval="1"/>
            </Policies>
            <DefaultRolloverStrategy max="3" />
        </RollingFile>

    </Appenders>
    <Loggers>
        <Logger level="info" name="com.vcanus" additivity="false">
            <AppenderRef ref="RollingFile" />
        </Logger>

        <Root level="info">
            <AppenderRef ref="Console" />
        </Root>
    </Loggers>
</Configuration>
```
<Configuration status="warn" moniterInterval="30"\> 
> 'status'는 로그 로딩시에 하는 로깅 기준 레벨이다. 
    
> 'moniterInterval'은 설정 변경을 체크하는 주기, 변경시 재설정.

<Property name=""\>value<\>
> 미리 사용할 자원을 설정할 수 있다. 여기서는 로그패턴과 루트경로를 설정하였다.

<Appenders\>
> 실제 로그를 작성해주는 객체. Console, RollingFile, File, JDBC, Kafka 등 많은 appender를 지원한다.

<Policies\>
> RollingFile의 설정을 할 수 있다. 크기, 시간을 트리거로 새로운 로그를 생성 (패턴에서 %i 부분이 변한다)

<DefaultRolloverStrategy max="2" \/>
> rolling되어 쌓이는 개수의 최대를 설정, ex)1-1.log 1-2.log 1-3.log(x) 2-1.log 2-2.log

<Logger level="info" name="com.vcanus" additivity="false"\>
> 로그 객체이다. level설정, name설정, additivity설정이 가능하다

> 위에서 정의한 appender를 설정하여 원하는 로그방식으로 출력
    
> name을 패키지 경로 사용시 해당 경로의 로그만 출력

> additivity는 상위로거(패키지 상위 로거 혹은 루트로거)의 전달을 받을지 설정

## Use
```
@Log4j2
public class TempClass{
    
    public tempMethod(){
        log.debug("debug level");
        log.info("info level");
        log.warn("warn level");
        log.error("error level");
    }
}
```
