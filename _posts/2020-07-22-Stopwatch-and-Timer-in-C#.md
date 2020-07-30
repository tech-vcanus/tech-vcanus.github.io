---
title: "Stopwatch and Timer in C#"
data: 2020-07-22
categories: development
tags: C# Timer Stopwatch
---

Written By [Nuri Na](https://github.com/nurring) VCANUS



Stopwatch class를 이용해 실행 시간을 측정한다.

## 선언

```csharp
using System.Diagnostics;
using System.Threading;
...
    
public static Timer timer;
public static Stopwatch sw;
public static int counter = 0;
public static void SetTimeCheck()
{
    timer = new Timer(new TimerCallback(Timers), 1, 1000, 1000);
}

public static void Timers(object obj)
{
    counter = 0;
}
```

## 사용

```csharp
SetTimeCheck();//시간을 측정할 구간 앞에

sw.Start();//측정 시작
//작업..
sw.Stop();//측정 끝
log.Debug(sw.ElapsedMilliseconds.ToString() + "ms");//출력
sw.Reset();//타이머 리셋
```

