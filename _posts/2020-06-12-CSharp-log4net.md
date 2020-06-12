

Written by BGKim, VCANUS

# log4net

## log4net NuGet 설치

## config 파일 추가

log4net.config

```
<?xml version="1.0" encoding="utf-8" ?>
<configuration>
  <log4net>
    <root>
      <level value="ALL"/>
      <appender-ref ref="console"/>
      <appender-ref ref="file"/>
      <appender-ref ref="fatal_file"/>
    </root>
    <appender name="console" type="log4net.Appender.ConsoleAppender">
      <layout type="log4net.Layout.PatternLayout">
        <conversionPattern value="%date %level %logger - %message%newline" />
      </layout>
    </appender>
    <appender name="file" type="log4net.Appender.RollingFileAppender">
      <file value=".\log\app.log" />
      <appendToFile value="true" />
      <rollingStyle value="Size" />
      <maxSizeRollBackups value="5" />
      <maximumFileSize value="100MB" />
      <staticLogFileName value="true" />
      <layout type="log4net.Layout.PatternLayout">
        <conversionPattern value="%date [%thread] %level %logger - %message%newline" />
      </layout>
    </appender>
    <appender name="fatal_file" type="log4net.Appender.RollingFileAppender">
      <file value=".\log\fatal.log" />
      <appendToFile value="true" />
      <rollingStyle value="Size" />
      <maxSizeRollBackups value="5" />
      <maximumFileSize value="100MB" />
      <staticLogFileName value="true" />
      <filter type="log4net.Filter.LevelRangeFilter">
        <param name="LevelMin" value="FATAL" />
        <param name="LevelMax" value="FATAL" />
      </filter>
      <layout type="log4net.Layout.PatternLayout">
        <conversionPattern value="%date [%thread] %level %logger - %message%newline" />
      </layout>
    </appender>
  </log4net>
</configuration>
```



## config 파일 속성 변경

1. config 파일 우클릭, 속성 선택
2. 빌드 작업 => '내용' 으로 변경
3. 출력 디렉터리에 복사 => '항상 복사' 로 변경



## 프로젝트 AssemblyInfo.cs 수정

AssemblyInfo.cs 내용 추가

```
[assembly: log4net.Config.XmlConfigurator(ConfigFile = "log4net.config", Watch = true)]
```



## 사용법

```
public class logTest
{
    private static readonly ILog log = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

	public void TestMethod1()
    {
        log.Debug("Main() started");
        log.Info("My Info");
        log.Warn("My Warning");
        log.Error("My Error");
        log.Fatal("My Fatal Error");
    }
}
```



