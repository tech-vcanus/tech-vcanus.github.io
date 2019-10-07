---
title: "Scichart Basics"
data: 2019-10-04 00:00:00 -0000
categories: development 
tags: WPF C# Scichart Basic Chart XAML MVVM
---

Written by Young-rae Shin(Link:[lived1024][https://github.com/lived1024])  

# Scichart
Scichart는 수많은 숫자 데이터를 그래프로 표현할 수 있도록 한다.
이 파일의 내용을 읽기전에 WPF의 기본에 관해서 숙지하는 것이 좋다.
Scichart는 WPF 프로젝트를 이용하기때문에 WPF에 대한 기본 지식이 없다면 습득에 어려움이 있을 수 있다.  
http://scichart.com/

## 1 Scichart 유의할 점
- 공식 홈페이지에서 Trial(1달 무료)버전을 다운받아 이용해볼 수 있다.
- 설치를 하지 않는다면 프로젝트 참조에 뜨지 않는다.
- 공식 홈페이지의 튜토리얼로 먼저 경험해본 이후 아래 예시들을 보는 것을 추천한다.
https://www.scichart.com/documentation/v5.x/webframe.html#Tutorial%2001%20-%20Referencing%20SciChart%20DLLs.html
![Tutorial](https://user-images.githubusercontent.com/41990925/66175658-73deaf00-e695-11e9-8143-c98c75ebcd34.png)
- 정상적으로 설치하면 아래 화면처럼 다양한 그래프에 대한 예시들이 들어있다.
![Example Suite](https://user-images.githubusercontent.com/41990925/66175656-73461880-e695-11e9-81c3-d84521f45cf7.png)
- 스크린샷 하단의 Chart Types에 있는 그래프를 선택하면 그래프 예시와 소스코드를 볼 수 있다.
![ChartExample](https://user-images.githubusercontent.com/41990925/66175623-6f19fb00-e695-11e9-980c-9e994ac297dc.png)
![SourceCodeExample](https://user-images.githubusercontent.com/41990925/66175624-6f19fb00-e695-11e9-9ebe-d276def7eb9d.png)
- 링크는 Scichart의 Github 레파지토리 => https://github.com/ABTSoftware/SciChart.Wpf.Examples/tree/master/v5.x
- 라이센스를 구매하고 해당 프로젝트의 App.xaml.cs에 라이센스 키를 입력해야한다.

```C#
namespace WpfAppName
{
    /// <summary>
    /// App.xaml에 대한 상호 작용 논리
    /// </summary>
    public partial class App : Application
    {
        public App()
        {
            // Ensure SetLicenseKey is called once, before any SciChartSurface instance is created 
            // Check this code into your version-control and it will enable SciChart 
            // for end-users of your application. 
            
            // You can test the Runtime Key is installed correctly by Running your application 
            // OUTSIDE Of Visual Studio (no debugger attached). Trial watermarks should be removed. 
            SciChartSurface.SetRuntimeLicenseKey(@"여기에 입력!");
        }
    }
}
```

- 라이센스 키를 입력하고 그래프를 정상적으로 보려면 디버깅 모드로 실행 X   =>   디버그하지 않고 시작 O

## 2 Scichart 튜토리얼
### 참조 설정
- Scichart 공식홈페이지에서 해당 프로그램 설치
- WPF 프로젝트 생성
- 참조 추가
- ![StartScichart](https://user-images.githubusercontent.com/41990925/66175657-73deaf00-e695-11e9-8ef5-d8ecacef2592.png)  

### Scichart표면(Surface) 생성
- XAML에 Scichart 연결

```WPF
xmlns:s="http://schemas.abtsoftware.co.uk/scichart"
```

- Grid 내부에 Scichart를 생성
- X축, Y축 설정   

```WPF
<Window x:Class="SciChart.Mvvm.Tutorial.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:local="clr-namespace:SciChart.Mvvm.Tutorial"

        xmlns:s="http://schemas.abtsoftware.co.uk/scichart"

        mc:Ignorable="d"
        Title="MainWindow" Height="550" Width="800">
        
    <!-- 공식 홈페이지의 튜토리얼은 Code-behind를 MainViewModel.cs로 설정 -->
    <Window.Resources>
    <local:MainViewModel x:Key="MainViewModel"/>
    </Window.Resources>

    <!-- Grid에 이용하는 Data는 MainViewModel.cs -->
    <Grid DataContext="{StaticResource MainViewModel}">
        <!-- Bind to ChartViewModel.ChartTitle etc -->
        <!-- 아래의 Binding은 WPF와 같다. 주의할 점은 태그 앞의 s:ScichartSurface -->
        <s:SciChartSurface ChartTitle="{Binding ChartTitle}">
            <!-- X축 -->
            <s:SciChartSurface.XAxis>
                <s:NumericAxis AxisTitle="{Binding XAxisTitle}"/>
            </s:SciChartSurface.XAxis>
            <!-- Y축 -->
            <s:SciChartSurface.YAxis>
                <s:NumericAxis AxisTitle="{Binding YAxisTitle}"/>
            </s:SciChartSurface.YAxis>
        </s:SciChartSurface>
    </Grid>
</Window>        
```

- MainViewModel.cs에서 BindableObject를 상속받아 이용한다.  
BindableObject는 INotifyPropertyChanged를 상속받고 있다.

```C#
public class MainViewModel : BindableObject
```

아래 코드처럼 Binding하는 변수에 대한 설정을 해주면 된다.

```C#
using System.Collections.ObjectModel;
using System.Windows.Media;
using SciChart.Charting.Model.ChartSeries;
using SciChart.Charting.Model.DataSeries;
using SciChart.Data.Model;

namespace SciChart.Mvvm.Tutorial
{

    public class MainViewModel : BindableObject
    {
        private string _chartTitle = "Hello SciChart World!";
        private string _xAxisTitle = "XAxis";
        private string _yAxisTitle = "YAxis";
        
        public string ChartTitle
        {
            get { return _chartTitle; }
            set
                {
                    _chartTitle = value;
                    OnPropertyChanged("ChartTitle");
                }
        }
        
        public string XAxisTitle
        {
            get { return _xAxisTitle; }
            set
                {
                    _xAxisTitle = value;
                    OnPropertyChanged("XAxisTitle");
                }
        }
        
        public string YAxisTitle
        {
            get { return _yAxisTitle; }
            set
                {
                    _yAxisTitle = value;
                    OnPropertyChanged("YAxisTitle");
                }
        }
    }
}     
```

- 시리즈 추가 (시리즈 : 하나의 그래프로 표시될 자료)
    * 여러개의 시리즈를 담을 수 있는 Collection을 생성한다. 이 컬렉션이 SciChart의 Binding대상
    
    ```C#
    private ObservableCollection<IRenderableSeriesViewModel> _renderableSeries;
    ```

    * 공식 홈페이지의 getter, setter는 아래처럼 설정되어있다.

    ```C#
    public ObservableCollection<IRenderableSeriesViewModel> RenderableSeries
    {
        get { return _renderableSeries; }
        set
        {
            _renderableSeries = value;
            OnPropertyChanged("RenderableSeries");
        }
    }
    ```

    아직 정확한 원인을 찾아내지 못했지만 OnPropertyChanged의 내용이 들어가 있으면 그래프의 새로고침 기능이 작동하지 않는 경우가 있다.
    따라서 시리즈 또는 시리즈의 내용이 바뀔 때 새로고침이 되게 하려면 아래처럼 OnPropertyChanged를 삭제하자!

    ```C#
    public ObservableCollection<IRenderableSeriesViewModel> RenderableSeries
    {
        get => _renderableSeries; 
        set => _renderableSeries = value;
    }
    ```

    * MainViewModel.cs에서 Series를 만들고 RenderableSeries에 넣는다!
    2D로 생성되는 일반적인 그래프의 경우에는 XyDataSeries를 이용한다.

    ```C#
    public MainViewModel()
    {
        // lineData가 1개의 시리즈
        var lineData = new XyDataSeries<double, double>() { SeriesName = "TestingSeries" };
        lineData.Append(0, 0);
        lineData.Append(1, 1);
        lineData.Append(2, 2);
        _renderableSeries = new ObservableCollection<IRenderableSeriesViewModel>();
        //RenderableSeries의 Add를 이용하여 원하는 만큼 시리즈를 추가할 수 있다.
        //Binding은 RenderableSeries만 설정해주면 추가된 시리즈 모두 그래프에 표시!!
        RenderableSeries.Add(new LineRenderableSeriesViewModel()
        {
            StrokeThickness = 2,
            Stroke = Colors.SteelBlue,
            DataSeries = lineData,
        });
    }
    ```

    * MainWindow.xaml에서 RenderableSeries를 Binding한다.
    RenderableSeries에서 SeriesBinding 기능이 제공되기에 해당 시리즈를 한번에 연결!

    ```WPF
    <Grid DataContext="{StaticResource MainViewModel}">

        <!-- Bind to ChartViewModel.RenderableSeries collection using SeriesBinding -->
        <s:SciChartSurface RenderableSeries="{s:SeriesBinding RenderableSeries}" 
                             ChartTitle="{Binding ChartTitle}">

            <s:SciChartSurface.XAxis>
                <s:NumericAxis AxisTitle="{Binding XAxisTitle}"/>
            </s:SciChartSurface.XAxis>

            <s:SciChartSurface.YAxis>
                <s:NumericAxis AxisTitle="{Binding YAxisTitle}"/>
            </s:SciChartSurface.YAxis>
        </s:SciChartSurface>
    </Grid>
    ```
    
## 3 Series
이번 파트에서는 주로 사용했던 선으로 된 그래프와 점으로 구성된 그래프를 다룰 예정이다.  
이 두가지 그래프는 흔히 볼 수 있는 2D 그래프이며 X축과 Y축으로 이루어져있다.
![LineAndScatter](https://user-images.githubusercontent.com/41990925/66175621-6e816480-e695-11e9-8810-bdccb65bb2f0.png)
따라서 그래프에 입력되는 데이터는 X축의 데이터, Y축의 데이터로 구성된다.
### 1) DataSeries 생성
- DataSeries는 그래프에 나타낼 데이터라고 이해하면 된다.

```C#
    XyDataSeries<int, double> dataSeries = new XyDataSeries<int, double>();
    var dataSeries = new XyDataSeries<double, double>();
    //생성자체는 어려울 것 없다.
```

위에서 int는 X축의 데이터를 의미하고 double은 Y축의 데이터를 뜻한다.  
물론 int, double, float 등 데이터타입은 숫자 데이터면 가능하다.  
X축에 별도의 설정을 한다면 문자열을 X축에 넣을수 있지만 시도해보진 않았다.  
https://www.scichart.com/questions/wpf/i-want-to-display-a-character-string-on-the-x-axis

### 2) Collection에 DataSeries 추가
- ObservableCollection<IRenderableSeriesViewModel>
튜토리얼 파트에서 ObservableCollection<IRenderableSeriesViewModel>에 Line Series를 생성하여 추가하는 것을 봤다.  
이 콜렉션은 ScichartSurface의 RenderableSeries에 시리즈들을 한번에 Binding할 때 이용한다.

```C#
private static ObservableCollection<IRenderableSeriesViewModel> seriesList = new ObservableCollection<IRenderableSeriesViewModel>();
public static ObservableCollection<IRenderableSeriesViewModel> SeriesList 
{
    get => renderableSeriesList; 
    set => renderableSeriesList = value; 
}
```

```C#
//위에서 선언, 생성한 seriesList에 아래처럼 dataSeries를 추가한다
//아래 lineData는 테스트용 시리즈
var lineData = new XyDataSeries<double, double>();
//값을 하나씩 추가할 때는 append를 사용!
lineData.Append(0, 0);
lineData.Append(1, 1);
lineData.Append(2, 2);

//SeriesList에 LineRenderableSeriesViewModel을 생성하고 DataSeries는 위에서 생성, 할당된 lineData를 넣는다
SeriesList.Add(new LineRenderableSeriesViewModel()
{
    DataSeries = lineData
});
//위와 같이 SeriesList에 원하는만큼 DataSeries를 추가한다면 그 갯수만큼 그래프가 출력된다.
```

```WPF
xmlns:s="http://schemas.abtsoftware.co.uk/scichart"

<s:SciChartSurface RenderableSeries = "{s:SeriesBinding SeriesList, UpdateSourceTrigger=PropertyChanged}">
```

### 3) DataSeries에 대한 속성 설정
- 이전 순서에서 Collection에 DataSeries를 추가하는 방법을 공부했다.  이번에는 시리즈를 추가할 때 다양한 속성을 설정하는 방법에 대해 알아볼 예정이다.
1. DataSeries의 이름 설정

```C#
//생성할 때 SeriesName을 설정해주자.
XyDataSeries<double, double> xyDataSeries = new XyDataSeries<double, double>() { SeriesName = keyList[i] };
```

2. 각종 설정 추가

```C#
SeriesList.Add(new LineRenderableSeriesViewModel()
{
    DataSeries = lineData,
    StrokeThickness = 2,
    Stroke = Colors.Red,
    DrawNaNAs = LineDrawMode.Gaps,
    PointMarker = new EllipsePointMarker() { Width = 7, Height = 7 }
});
```

위 코드에서 DataSeries를 묶는 것은 이전 순서에서 한 내용들이다.  
이외에는 이 Series에 대한 속성을 지정해주는 것이다.
- StrokeThickness : 선 굵기
- Stroke : 선 색깔
- DrawNaNAs : double.NaN으로 설정된 Null값을 어떻게 표현할 지 설정하는 속성이다.  
이 속성의 경우에는 LineDrawMode.Gaps와 LineDrawMode.ClosedLines의 두가지로 나뉘게 된다.  
Gaps의 경우에는 Null값은 없는 데이터로 취급하고, ClosedLines는 데이터가 있는 곳까지 이어주는 선을 표시한다.  
![Gaps](https://user-images.githubusercontent.com/41990925/66175637-717c5500-e695-11e9-85f3-af918eb953f0.png)
![ClosedLines](https://user-images.githubusercontent.com/41990925/66175625-6fb29180-e695-11e9-96c7-faf050bbc9c8.png)

- PointMarker : X 좌표의 간격에 맞춰 Point를 표시하는 기능이다.  
아래의 스크린샷을 보면 X축 1에서 차이가 나게된다.  
둘 모두 X축의 간격은 1로 동일하다.
![BasicSeries](https://user-images.githubusercontent.com/41990925/66175640-717c5500-e695-11e9-82c8-019ec2177bd7.png)
![PointMarker](https://user-images.githubusercontent.com/41990925/66175652-73461880-e695-11e9-97df-21b1c67867ab.png)
3. 그래프 속성 응용
이전 순서에서 여러 속성으로 그래프의 모습을 설정할 수 있었다.  
점으로 그래프를 나타내는 ScatterSeries도 별도로 있지만 위 코드에서 StrokeThickness의 속성을 0으로 설정하고,  
PointMarker를 이용해 Point를 나타낸다면 아래처럼 점으로 이루어진 그래프가 탄생하게 된다.

```C#
SeriesList.Add(new LineRenderableSeriesViewModel()
{
    DataSeries = lineData,
    StrokeThickness = 0,
    Stroke = Colors.Red,
    DrawNaNAs = LineDrawMode.Gaps,
    PointMarker = new EllipsePointMarker() { Width = 7, Height = 7 }
});
```

![StrokeThickness = 0](https://user-images.githubusercontent.com/41990925/66175649-72ad8200-e695-11e9-8d7e-d45f7de68973.png)

4. ScatterSeries를 쓰지 않은 이유?  
현재 개발중인 프로젝트는 WAS(스프링부트)를 이용해 DB(Mysql또는 MariaDB)에서 데이터를 가져와 DataSeries를 만들고 Binding한다.  
즉, DB에 존재하는 자료가 엄청나게 많을 수도 있다.  
이런 상황에 이용할 수 있는 방법은 
- 필요한 Series만 생성하거나,  
- ScatterSeries와 LineSeries를 동시에 생성하여 Scatter와 Line 중 필요한 그래프만 보여주는 방법이 있다.  
첫번째는 Series를 생성할 때마다 DB에서 해당 데이터를 받아와야하고,  
두번째는 Series를 생성할 때 같은 데이터를 가진 Series를 각각 2개 생성하니 시간의 소요가 더 커질 수 있다.  
따라서 현재 점과 선으로만 그래프를 표시하는 현재의 프로젝트에서는 아래 방식을 이용했다.
    1. LineSeries를 그리고
    2. PointMarker를 생성하고
    3. StrokeThickness 의 값과 PointMarker의 값을 수정
- 아래의 코드는 해당 속성만 변경하는 기능을 구현한 것이다.  

```C#
//각각의 메소드는 반복문을 이용해 속성을 변경해준 것이다.
//Scichart 선 그리기
public static void DrawScichartLine()
{
    foreach(LineRenderableSeriesViewModel renderSeries in SeriesList)
    {
        renderSeries.StrokeThickness = 2;
    }
}

//Scichart 선 제거
public static void DeleteScichartLine()
{
    foreach (LineRenderableSeriesViewModel renderSeries in SeriesList)
    {
        renderSeries.StrokeThickness = 0;
    }
}
```
