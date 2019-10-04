---
title: "Setting for Development Environment"
data: 2019-07-05 00:00:00 -0000
categories: development 
tags: development environment installation
---

신입 개발자(Newcomer Programmer - WPF about 1 month, C# about 2 month)가 작성한 내용이니 감안하시고 보시길 바랍니다.

해당 문서는 WPF를 이용한 MVVC 디자인 패턴에 대한 내용을 설명할 것입니다.
아래 링크에서 더 자세한 설명을 볼 수 있습니다.
https://www.wpf-tutorial.com/Localization/LanguageStatus/ko/

Write by Young-rae Shin(https://github.com/lived1024)

# 1. WPF의 정의
## 1) MVVC 패턴이란?
  - MVVC 패턴은 MVC패턴에서 개량된 것으로, Model - View - ViewModel로 이루어져 있다.
  - Model : View에서 나타내기위한 데이터의 원본이라고 볼 수 있다.
  - View : 사용자에게 보여지는 GUI
  - ViewModel : Model에 있는 데이터를 View에서 보여주기위해 적절한 데이터로 가공하는 역할이다.

## 2) WPF vs Winform : 둘 모두 응용SW의 개발에 이용하며 GUI의 미리보기(Preview)를 지원해서 개발에 편리함을 더해준다.
  - Winform : 전통적인 방식으로 오랜 기간 이용되었으며 국내에서는 C# 응용SW의 대부분을 차지하고 있다.
    - 장점
      1. 안정성이 뛰어나다.
      2. 한글로 된 자료가 많아 진입장벽이 낮은 편이다.
      3. 무료, 유료로 기존 개발자가 개발한 다양한 컨트롤을 이용할 수 있다.
    - 단점
      1. 유연성이 부족하다 -> Control 내부에 다양한 Control을 넣기 힘듦 : Button 내부에 Image와 TextBox를 동시에 넣기 등
      2. 모든 코드가 C#으로 이루어져있어 디자이너와 분업하기 힘들다.
      3. 가독성이 좋지 못하다.
      
  - WPF : MVVC패턴 중에서 View를 담당하며 마크업 언어(태그)를 이용한다.
    - 장점
      1. 비교적 최신으로 최근 기준에 부합한다.
      2. WPF의 대표적인 프로그램으로는 Visual Studio
      3. 각종 컨트롤을 Customizing하기 용이하다. -> Ex) Winform은 Button내에 Image삽입이 번거롭지만 WPF는 쉽게 가능하다.
      4. XAML파일은 디자이너, C#(Code-Behind)은 개발자가 담당하여 업무의 분리가 용이하다.
      5. 뛰어난 가독성
      6. Windows기반 프로그램과 Web기반 프로그램의 개발에 모두 이용할 수 있다.
    - 단점
      1. 국내에서는 WinForm을 주로 이용하기에 자료를 찾기 어렵다. - 대형 서점에 입문용 책이 없는 경우도 많다.
      2. 1번의 이유로 필요한 정보는 영어로 찾아야한다.
      3. 외국에서는 인기가 많다고 하지만 아직까지는 국내 점유율이 처참하다고 한다. - WinForm 10 : WPF 1 정도의 비율
      
## 3) WPF를 이용한 MVVC패턴의 기초(Visual Studio)
### Model
  - 기존의 C# 코드를 이용하여 View의 기초 데이터를 담당한다.
  - Car 클래스, Person 클래스 등 직접 DataBinding하는 자료를 제외한 클래스들이 여기에 속한다.
  - WAS를 이용한 프로그램을 개발할 때, WAS에서 데이터를 받아와 초기 데이터로 가공하는 역할을 담당한다.
### ViewModel
  - Model의 데이터를 View에서 이용할 수 있도록 가공한다.
  - 가공한 데이터는 DataBinding을 이용해 View를 제공하는 XAML파일(WPF)로 연결!
  - Main이 되는 XAML의 .cs파일에 작성할 수도 있지만 Resource를 설정하여 다른 파일에서 이용할 수도 있다.
  ![예시](https://github.com/lived1024/tech-vcanus.github.io/blob/master/dev/images/DataBinding%20by%20using%20Resource%20Tag.png?raw=true)
  - WPF(XAML파일)에서 DataBinding을 설정하기도 하지만 ViewModel에서 설정할 수도 있다.
  ![DataBinding in XAML](https://github.com/lived1024/tech-vcanus.github.io/blob/master/dev/images/DataBinding%20in%20XAML.png?raw=true)  
  Binding 뒤의 "Items", "IsExpanded"는 Code-Behind에서 설정한 변수의 이름
  ![DataBinding in Code-Behind](https://github.com/lived1024/tech-vcanus.github.io/blob/master/dev/images/DataBinding%20in%20Code-Behind.png?raw=true)  
  단, 최상위 Window의 Code-Behind와 해당 XAML의 Code-Behind가 아니면 아래와 같은 에러를 볼 수 있다.  
  ![Not Static Control](https://github.com/lived1024/tech-vcanus.github.io/blob/master/dev/images/Not%20Static%20Control.png?raw=true)
### View : XAML파일(WPF)
  - UI를 담당한다고 볼 수 있다.
  - 마크업 언어로 구성되어 가독성이 뛰어나고, ViewModel과 연결하여 DataBinding을 이용할 수 있다.
  - 해당 파일을 생성하면 Code-Behind파일이 자동으로 생성된다.  
  ![Files](https://github.com/lived1024/tech-vcanus.github.io/blob/master/dev/images/Files.png?raw=true)
  - XAML파일에서 Event의 메소드명을 설정하면 Code-Behind에서 해당 이벤트를 구현하면 된다.
  ![XAML Event](https://github.com/lived1024/tech-vcanus.github.io/blob/master/dev/images/XAML%20Event.png?raw=true)
  ![Code-Behind Event](https://github.com/lived1024/tech-vcanus.github.io/blob/master/dev/images/Code-Behind%20Event.png?raw=true)
  
# 2. WPF 실전
## 프로젝트 살펴보기 - 이 항목에서는 Model을 제외한 ViewModel과 View에 대해서만 기술한다.
### 1) 생성 화면
![First Screen](https://github.com/lived1024/tech-vcanus.github.io/blob/master/dev/images/Create%20WPF%20Project.png?raw=true)
![First Screen2](https://github.com/lived1024/tech-vcanus.github.io/blob/master/dev/images/Create%20WPF%20Project2.png?raw=true)  
Preview 화면의 우측 하단을 보면 초록색 박스가 있다. 박스 안의 버튼을 이용하여 아래와 같이 화면 조정 가능  
![Vertical Screen](https://github.com/lived1024/tech-vcanus.github.io/blob/master/dev/images/Vertical%20Screen.png?raw=true)
![WPF Screen](https://github.com/lived1024/tech-vcanus.github.io/blob/master/dev/images/WPF%20Screen.png?raw=true)
![Preview Screen](https://github.com/lived1024/tech-vcanus.github.io/blob/master/dev/images/Preview%20Screen.png?raw=true)  
### 2) WPF의 기초 태그
#### Grid
  - Grid의 내부에 Control을 배치하며 View를 생성한다.
  - 화면은 기본적으로 Grid Layout으로 설정되어 있으며 아래처럼 화면을 분할할 수 있다
    ```WPF
    <Grid>
        <!--ColumnDefinitions은 Grid 내부의 Column에 대한 정의를 한다.-->
        <Grid.ColumnDefinitions>
            <!--ColumnDefinition을 1개 추가할 때마다 Grid의 Column은 1개씩 늘어난다-->
            <!--Width, Height의 값에 *을 넣으면 해당 비율로 크기가 맞춰진다
            *를 넣지 않는다면 해당 픽셀(?)만큼만 생성!-->
            <ColumnDefinition Width="*"/>
            <ColumnDefinition Width="*"/>
            <ColumnDefinition Width="200"/>
        </Grid.ColumnDefinitions>
        
        <!--RowDefinitions은 Grid 내부의 Row에 대한 정의를 한다.-->
        <Grid.RowDefinitions>
            <!--RowDefinition을 1개 추가할 때마다 Grid의 Row는 1개씩 늘어난다-->
            <!--Width, Height의 값에 *을 넣으면 해당 비율로 크기가 맞춰진다
            *를 넣지 않는다면 해당 픽셀(?)만큼만 생성!-->
            <RowDefinition Height="*"/>
            <RowDefinition Height="*"/>
            <RowDefinition Height="100"/>
        </Grid.RowDefinitions>
    </Grid>
    ```
  ![Grid](https://github.com/lived1024/tech-vcanus.github.io/blob/master/dev/images/Grid.png?raw=true)
  - Control의 배치는 아래화면처럼 Grid.Row 와 Grid.Column을 이용하여 지정할 수 있다.
  ```WPF
  <TextBlock Text="C0, R0" HorizontalAlignment="Center" VerticalAlignment="Center" FontSize="40"/>

  <TextBlock Text="C0, R1" Grid.Row="1" HorizontalAlignment="Center" VerticalAlignment="Center" FontSize="40"/>
        
  <TextBlock Text="C0, R2" Grid.Row="2" HorizontalAlignment="Center" VerticalAlignment="Center" FontSize="40"/>

  <TextBlock Text="C1, R0" Grid.Column="1" HorizontalAlignment="Center" VerticalAlignment="Center" FontSize="40"/>

  <TextBlock Text="C2, R0" Grid.Column="2" HorizontalAlignment="Center" VerticalAlignment="Center" FontSize="40"/>

  <TextBlock Text="C1, R1" Grid.Column="1" Grid.Row="1" HorizontalAlignment="Center" VerticalAlignment="Center" FontSize="40"/>

  <TextBlock Text="C1, R2" Grid.Column="1" Grid.Row="2" HorizontalAlignment="Center" VerticalAlignment="Center" FontSize="40"/>

  <TextBlock Text="C2, R1" Grid.Column="2" Grid.Row="1" HorizontalAlignment="Center" VerticalAlignment="Center" FontSize="40"/>

  <TextBlock Text="C2, R2" Grid.Column="2" Grid.Row="2" HorizontalAlignment="Center" VerticalAlignment="Center" FontSize="40"/>
  ```
  ![Location](https://github.com/lived1024/tech-vcanus.github.io/blob/master/dev/images/Grid2.png?raw=true)
  - 각종 속성들은 아래처럼 해당 태그의 child tag로 이용할 수 있다. 아래 코드는 모두 동일한 결과를 나타낸다.
  ```WPF
  <TextBlock Text="C0, R1" Grid.Row="1" HorizontalAlignment="Center" VerticalAlignment="Center" FontSize="40"/>
  ```
  ```WPF
  <TextBlock>
    <TextBlock.Text>C0, R1</TextBlock.Text>
    <TextBlock.FontSize>40</TextBlock.FontSize>
    <TextBlock.HorizontalAlignment>Center</TextBlock.HorizontalAlignment>
    <TextBlock.VerticalAlignment>Center</TextBlock.VerticalAlignment>
    <Grid.Row>1</Grid.Row>
  </TextBlock>
  ```
  Code-Behind에서도 같은 결과를 낼 수 있는데, 자세한 내용은 https://blog.naver.com/syrch/221630969293를 참고
#### 파일(?) 태그 및 초기 생성 태그
  - 해당 페이지의 넓이, 높이 등 크기 조절
  - 해당 페이지의 ClassName과 사용할 Namespace들의 별칭을 설정할 수 있다.
  - 아래 코드는 WPF 프로젝트 생성 당시 자동으로 생성되는 코드
  ```WPF
  <Window x:Class="WpfAppName.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:local="clr-namespace:WpfAppName"
        mc:Ignorable="d"
        Title="MainWindow" Height="450" Width="1000">
    
    <Grid>
    </Grid>
  </Window>
  ```  
  
  ![Whole Tag](https://github.com/lived1024/tech-vcanus.github.io/blob/master/dev/images/MainTag.png?raw=true)  
   - 사용되는 태그 종류
      1. Window : 응용 프로그램의 새 창을 의미한다. 주로 해당 프로젝트에서 Main이 되는 화면에 사용
      2. Page : Window 내부의 페이지를 뜻한다. Window나 UserControl에서 Frame을 이용하여 include할 수 있다. (include시 권장 X)
      3. UserControl : 다른 컨트롤을 추가하는 것과 같은 방식으로 UI에 추가할 수 있는 재사용 가능한 화면 (include시 권장 O)
      ![UserControl include](https://github.com/lived1024/tech-vcanus.github.io/blob/master/dev/images/UserControl.png?raw=true)
      ![UserControl Tag](https://github.com/lived1024/tech-vcanus.github.io/blob/master/dev/images/UserControl2.png?raw=true)
      4. ResourceDictionary : 앱의 UI 또는 리소스를 정의하여 이용할 위치에 정의하여 사용할 수 있다.  
      이용한 예제가 없어서 공식 홈페이지의 코드를 참조
      ```WPF
      <!-- Dictionary1.xaml -->
      <ResourceDictionary
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation" 
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:local="using:MSDNSample">
        
        <SolidColorBrush x:Key="brush" Color="Red"/>

      </ResourceDictionary>
      ```
      ```WPF
      <Page
          x:Class="MSDNSample.MainPage"
          xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
          xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
          <Page.Resources>
            <ResourceDictionary>
              <ResourceDictionary.MergedDictionaries>
                  <ResourceDictionary Source="Dictionary1.xaml"/>
              </ResourceDictionary.MergedDictionaries>

              <x:String x:Key="greeting">Hello world</x:String>

            </ResourceDictionary>
          </Page.Resources>

          <TextBlock Foreground="{StaticResource brush}" Text="{StaticResource greeting}" VerticalAlignment="Center"/>
      </Page>
      ```  
      위 코드와 같이 ResourceDictionary로 필요한 설정 후, 여러 View에서 Resource로 참고하여 이용할 수 있다.  
      
   - Namespace 설정
   ```WPF
   <!-- xmlns의 뒤에 해당 페이지에서 부를 별칭을 설정한다. -->
   xmlns:name="clr-namespace:NamespaceName" 
   <!-- 해당 페이지에 include할 경우 -->
   <name:class>
   ```
#### Panel의 종류
각 패널에 대해서는 해당 링크 참고 : https://www.wpf-tutorial.com/Localization/LanguageStatus/ko/
  - WrapPanel
  - StackPanel
  - DockPanel
  - Grid
  - GirdSplitter
  - Canvas

### 3) DataBinding
#### DataBinding in WPF
  - Code-behind : View의 Code-Behind에서 작성한 예 => this.DataContext = this; 만 추가!
  ```WPF
  namespace WpfAppName
{
    /// <summary>
    /// MainWindow.xaml에 대한 상호 작용 논리
    /// </summary>
    public partial class MainWindow : Window
    {
        private string str = "TEST";
        public string Str { get => str; set => str = value; }
        public MainWindow()
        {
            InitializeComponent();
            this.DataContext = this;  // 추가 내용
        }
    }
}

  ```  
  - WPF : 예제에서는 TextBlock => Text에 DataBinding을 시킨다. { } 를 열고, Binding 변수이름 을 작성해주면 끝!
  ```WPF
  <TextBlock Text = "{Binding Str"}/>
  ```
  ![WPF Binding](https://github.com/lived1024/tech-vcanus.github.io/blob/master/dev/images/WPF%20Binding.png?raw=true)
  - 결과 화면
  ![Binding Result](https://github.com/lived1024/tech-vcanus.github.io/blob/master/dev/images/Binding%20Result.png?raw=true)
  
#### DataBinding in C#
  - Code-behind : 여기서 Data를 가공하고, Binding시킨다.
  ```C#
  namespace WpfAppName
{
    /// <summary>
    /// MainWindow.xaml에 대한 상호 작용 논리
    /// </summary>
    public partial class MainWindow : Window
    {
        private string str = "TEST";
        public string Str { get => str; set => str = value; }
        public MainWindow()
        {
            InitializeComponent();

            this.firstTextBlock.Text = Str;
        }
    }
}
  
  ```
  
  - WPF : 디자인을 하고, x:Name으로 Binding할 컨트롤의 이름을 설정한다.
  ```WPF
  <TextBlock x:Name="firstTextBlock" HorizontalAlignment="Center" VerticalAlignment="Center" FontSize="40"/>
  ```
  ![Naming](https://github.com/lived1024/tech-vcanus.github.io/blob/master/dev/images/Naming%20in%20XAML.png?raw=true)
  
### 4) Create Event
  1. XAML파일에서 Event를 등록할 Control을 생성한다.
  2. 아래 화면처럼 해당 태그 내에서 Event를 찾는다.
  ![Create Event](https://github.com/lived1024/tech-vcanus.github.io/blob/master/dev/images/Create%20Event.png?raw=true)
  3. Event를 선택하고 메소드 명을 자동생성하도록 새 이벤트 처리기를 클릭 or Enter를 입력하면 자동으로 생성되며 Binding까지 된다.
  ![Create Event2](https://github.com/lived1024/tech-vcanus.github.io/blob/master/dev/images/Create%20Event2.png?raw=true)
  ![Create Event3](https://github.com/lived1024/tech-vcanus.github.io/blob/master/dev/images/Create%20Event3.png?raw=true)
  4. Code-behind에서 확인하면 해당 이름의 이벤트가 생성된 것을 볼 수 있다.
  ![Create Event4](https://github.com/lived1024/tech-vcanus.github.io/blob/master/dev/images/Create%20Event4.png?raw=true)
