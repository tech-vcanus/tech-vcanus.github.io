---
title: "C# Basics"
data: 2019-10-04 00:00:00 -0000
categories: development 
tags: C# Basics
---

Written By Young-rae Shin(https://github.com/lived1024)  

# 기초   

## DataType  
 JAVA에서는 String을 대문자 String으로만 사용했지만 C#에서는 string, String 둘 다 가능하다.  
 숫자에 관한 데이터 타입은 JAVA와는 다르게 음수, 양수에 이용하는 데이터 타입이 다양하다.  
 (참조 : https://blog.naver.com/syrch/221587473761)  
## Naming 규칙  
 Class의 이름은 JAVA의 클래스 명처럼 첫글자, 단어구분에 대문자!!  
 ```
 public class ClassNameExample(){ }
 ```  
 메소드(Method)의 첫 글자는 대문자로!!! -> 자바와 확연하게 차이나는 부분이다!  
 ```
 public static void MethodNameExample()  {  ;}
 ```  
 변수(Parameter)는 첫 글자 소문자로 통일!  
 ```
 string parameterNameExample;
 ```  
## Getter와 Setter  
 ```
 //아래처럼 변수를 선언
 private String test;
 ```  
 ```
 //JAVA  : getTest(), setTest() 와 같이 첫 글자는 소문자이며 각각의 메소드가 새로 생성된다.
 public String getTest(){
   return test;
 }
 public void setTest(string test){
   this.test = test;
 }
 ```  
 ```
 //C#  : 변수명의 첫 글자를 대문자로 변경 후 해당 메소드 내에서 get과 set에 대한 설정을 한다.
 public string Str
 {
   get
   {
     return str;
   }
   set
   {
     str = value;
   }
 }
 ```  
 ```
 //아래는 C#에서 람다식을 이용하여 간단하게 set과 get에 대한 설정을 한 것이다. 바로 위의 코드와 동일!
 private string Test()
 {
   get => test;
   set => test = value;
 }
 //JAVA : getter를 이용할 경우 getTest()를 호출, setter를 이용할 경우에는 setTest()를 호출한다.
 //C#  : getter와 setter를 이용하려면 해당 함수를 호출하면 상황에 맞게 자동 설정되어 작동한다.
 ```  
## JAVA와의 차이
 ### var 변수
 자바스크립트를 사용해봤다면 변수를 이용할때 var를 썼던 기억이 있을 것입니다.  
 자바스크립트에서 var를 이용한 변수는 데이터를 할당할 수도 있고, 함수를 할당할 수도 있었습니다.  
 하지만 JAVA에서는 변수에 var를 사용하지 못했지만, C#에서는 var를 이용할 수 있습니다.  
 단, 자바스크립트처럼 자유롭게 이용할 수 있는 것은 아니지만 암시적으로 타입을 변환할 수 있습니다.
  #### var 제약조건  
  1. private, public 등 전역변수로 사용할 수 없다. -> 지역변수로만 사용 가능.  
  ```
  public var a = 10;
  public var b;
  ```  
  
  2. 전송은 가능하지만 return type을 var형식으로 할 수 없다.  
  ```
  public var Method(){ }    // X
  ```
  
  3. 메소드의 매개변수로 지정할 수 없다.  
  ```
  public void Method(var i){ }   // X
  ```
  
  4. null로 초기화를 할 수 없다.(참조타입의 경우 초기값 할당 이후 null로 초기화 가능)
  ```
  var a = null;   // X
  var a = "Hi";
  a = null;       // O
  ```
  
  5. nullable로 사용할 수 없다.  
  ```
  var? a = "aa";    // X
  ```
  
  6. 초기값과 다른 타입으로 사용할 수 없다.  
  ```
  var a = 1;
  a = "Hi";    // X
  ```
  
 ### ref, out 파라미터  
 JAVA와 C#은 모두 개체를 참조하는 메서드는 매개변수를 주소에 의한 참조로 전달한다.  
 하지만 기본 데이터 형식 매개 변수는 값으로 전달되기에 외부에서 결과를 이용하기에 어려움이 있다.  
 이런 불편함을 해결해줄 out, ref 파라미터에 대해 알아보자.  
  #### 출력전용 out 파라미터  
  하나의 메소드에서 2개 이상의 결과를 반환하려면 Map을 반환하거나 메소드를 별도로 제작했다.  
  예를 들어 나눗셈에서 몫과 나머지를 반환하려면 Map에 넣어서 반환을 해야했다.  
  하지만 C#에서는 출력전용으로 쓰는 out 파라미터가 존재한다.  
  ```
  public void Cal(int a, int b, out int quotient, out int remainder)
  {
    quotient = a / b;
    remainder = a % b;
  }
  ```  
  여기서 주목해야되는 것은 quitient, remainder의 타입을 이용할 때 선언한 것이다.  
  이전에 quotient와 remainder를 선언하지 않더라도 필요할 때 즉시 생성해서 이용할 수 있다.  
  사용하는 방법은 아래처럼 이용하면 된다.  
  ```
  public void PrintResult()
  {
    int a = 10;
    int b = 6;
  
    Cal(a, b, out int c, out int d);
  
    Console.WriteLine("몫 : " + c);
    Console.WriteLine("나머지 : " + d);
    MessageBox.Show("몫 : " + c + " 나머지 : " + d);
  }
  ```
  위처럼 간단하게 반환하여 이용할 수 있다.  
  #### 참조변수 ref  
  Call By Reference, Call By Value  
  둘 모두 C에서 사용하는 용어로 주소를 전달하는지, 값을 전달하는지에 따른 분류이다.  
  다른 말로는 얕은 복사(Swallow Copy), 깊은 복사(Deep Copy)로 부르기도 하는데 
  얕은 복사는 주소에 의한 참조, 깊은 복사는 값에 의한 참조를 말한다.  

  이 개념들은 C#에서 사용하는 참조변수 ref를 이용할 때 필요하다.  
  물론 out변수에서도 적용되는 말이지만 메소드 내에서 필요할때만 생성해서 쓰면 되기에 별도로 기술하지는 않았다.  
  사용하는 방법은 아래의 코드를 살펴보자.  
  ```
  //값을 리턴하는 Cal 메소드에서는 out과 ref의 차이만 있다.
  public void Cal(int a, int b, ref int quotient, ref int remainder)
  {
    quotient = a / b;
    remainder = a % b;
  }

  public void ResultPrint()
  {
    int a = 10;
    int b = 6;
    /* Error Case
    int c;  //값이 할당되어 있지 않아서 에러 발생!!
    //int d;  //d는 선언도 되어 있지 않아 에러 발생!!
    */
    
    //즉 ref는 해당 변수를 이용할 곳에서 선언, 할당이 이뤄진 상태에서 가능하다.
    //아래 코드를 시험하려면 위 a, b, c를 주석처리
    int a = 10;
    int b = 6;
    int c = 0;
    int d = 0;
  
    Cal(a, b, ref c, ref d);
    Cal(a, b, ref c, ref d);
    Console.WriteLine("몫 : " + c);
    Console.WriteLine("나머지 : " + d);
    MessageBox.Show("몫 : " + c + " 나머지 : " + d);
  }
  ```  
  위 내용처럼 진행했다면 c = 1, d = 4가 출력될 것이다.  

  하지만 이렇게 본다면 out과 똑같다는 생각만 들 수 있다.  
  그렇다면 ResultPrint 메소드의 내용을 다음과 같이 바꿔서 진행해보자.  
  ```
  public void ResultPrint()
  {
    int a = 10;
    int b = 6;
    int c = 1;
    int d = 1;

    Cal(a, b, ref c, ref d);
    Console.WriteLine("몫 : " + c);
    Console.WriteLine("나머지 : " + d);
    MessageBox.Show("몫 : " + c + " 나머지 : " + d);
  }
  ```  
  분명히 c와 d를 1로 바꿨지만 결과는 동일하게 c = 1, d = 4가 나올 것이다.  
  즉!  
  ref를 이용한 변수는 ResultPrint에서 할당된 값 자체를 바꿔버리는 역할을 한다.  
  순서를 보면  
  첫번째는 메소드의 파라미터에서 주소를 알려주고  
  두번째로 Cal 메소드에서 그 주소의 값(내용)을 변경하고  
  마지막으로 ResultPrint 메소드에서는 파라미터의 주소에 있는 값(내용)을 가져온다.  
  #### out과 ref의 차이점  
  ref변수와 out변수에 대해 봤다면 out변수도 ref의 마지막 코드처럼 이용할 수 있지 않을까라는 생각을 할 수 있다.  
  물론 이용해도 문제없이 실행되며 결과도 동일하게 나온다.  
  차이점은 스크린샷을 보면 알 수 있는데, out변수에는 컴파일러 에러를 띄워주는 안전장치가 존재한다.  
  ref는 해당 변수의 값을 메소드 내에서 변경하지 않더라도 에러가 발생하지 않는다.  
  하지만 out은 해당 변수의 값을 메소드 내에서 변경 또는 할당하지 않는다면 에러가 발생한다.    ![Out](https://user-images.githubusercontent.com/41990925/66175651-72ad8200-e695-11e9-90f7-2845c3874613.png)  
![Ref](https://user-images.githubusercontent.com/41990925/66175655-73461880-e695-11e9-9328-6a483d5f901f.png)  
 ### 대리자(Delegate)  
 대리자는 메소드의 파라미터로 메소드를 보낼 수 있게 해준다.  
 메소드에서 파라미터로 객체를 보내거나 int, string 등 데이터 타입을 보내주는 것은 자주 사용하던 일이다.  
 ```
 public void SendData(int a){ }
 public void SendData(Class c){ }
 ```  
 매우 익숙한 구성이다.  
 하지만 메소드를 파라미터로 전송한다는 생각은 전혀 못하고 있었고 아직도 제대로 이용하지는 못했다.  
 간단히 말해서 대리자는 메소드를 파라미터로 전송해서 쉬운 재사용을 할 수 있게 만든다.  
 아직 익숙하지 못한 개념으로 해당 링크에서 2개의 페이지를 읽어보면 이해하기 쉬울 것이다.  
 https://blog.naver.com/syrch/221600865926  
 ### using을 이용한 메모리 관리  
 using은 C#에서 namespace를 import하기위해 사용되는 명령어로 클래스를 생성하면 기본적으로 보인다.  
 ![using](https://user-images.githubusercontent.com/41990925/66175662-74774580-e695-11e9-80a2-d97a9e7b1a6d.png)

 하지만 C#의 코드를 보면 메소드 내부에서 아래와 같은 모습을 볼 수 있다.  
 ```
 using(var a = new StreamReader("file.txt")
 {
   ~~~~~
 }
 ```  
 using이라는 용어를 네임스페이스의 import에만 이용하는 것으로 생각했는데 전혀 다른 이용법이 튀어나온 것이다.    
 그렇다면 '어떠한 역할을 하는 것인가?'에 대한 의문이 생길 수 밖에 없다.  
 하지만 어렵게 생각할 필요도 없는 아주 간단하게 이해할 수 있는 기능이다.  
 위 코드에서 var a는 using의 범위 안에서만 사용하고 해당 범위를 벗어나면 close()를 실행시킨다는 것이다.  
 자바에서 예외처리를 할 때 finally에 대해서도 기억이 날 것이다.  
 C#의 예외처리도 try-catch를 이용하면 되는데, 위 코드는 다음과 같다고 생각하면 된다.  
 ```
 var a = new StreamReader("file.txt");
 try{
   ~~~~~
 }
 finally{
   a.close();
 }
 ```  
 이처럼 메소드 내부의 using은 메모리관리를 효율적으로 하기 위해서 사용된다.  
 만약 필요한 경우에는 IDisposable 인터페이스를 상속받아 Dispose() 메소드를 구현하는 것이 좋다.  
 ### Nullable  
 Nullable은 숫자형식의 데이터는 null값을 가질 수 없지만 null을 가질 수 있게 해줍니다.  
 예를 들어 JAVA에서 int에 null을 입력하면 컴파일러 에러가 발생합니다.  
 이는 C#에서도 동일하게 int에는 null값이 들어가지 못합니다.  
 ```
 int a = null;   // X
 ```  
 하지만 C#에서는 다음과 같이 한 기호를 넣어준다면 null값을 가질 수 있는 숫자 데이터가 생성됩니다.  
 ```
 int? a = null;      // O
 float? b = null;    // O
 double? c = null;   // O

 int[] intArray = { 0, 1, 2, null, 3, 4 };   // X
 int?[] nullableArray = { 0, 1, 2, null, 3, 4 };   // O
 ```  
 그리고 double 타입은 자체적으로 Null값을 넣을 수 있도록 double.NaN을 제공합니다.  
 ```
 double[] doubleTest = { 0, 0.01, null, 0.02, 0.03 };          // X
 double[] doubleArray = { 0, 0.01, double.NaN, 0.02, 0.03 };   // O
 ```  
## 입출력  
 ### 콘솔창, Windows Form, WPF 출력  
  #### 콘솔창 출력  
  ```
  //JAVA의 System.out.println()
  Console.WriteLine("내용");
  //JAVA의 System.out.print()
  Console.Write("내용");
  ```  
  #### Windows Form, WPF 메세지 출력  
  ```
  //JAVA - Swing의 JOptionPane에서 다양한 MessageDialog를 이용
  MessageBox.Shot("내용");
  ```  
 ### 파일 쓰기 및 읽기  
 ```
 // 대상 = 경로 + 파일명 + 확장자 ex) C:\\testDirectory\\test.txt
 System.IO.File.WriteAllText(대상 , 내용 , 인코딩 형식);    //파일 쓰기
 System.IO.File.ReadAllText(대상);    //파일 읽기
 ```  
  #### 디렉토리의 존재에 따른 쓰기 및 읽기  
   ##### 쓰기  
   ```
   private string directoryPath = "C:\\testDirectory\\";    //파일 경로
   
   while (!directoryPath[directoryPath.Length - 1].Equals('\\')) //파일경로가 \\로 끝나지 않았다면
   {
     saveDirectoryPath += '\\';                                  // //를 추가
   }

   //참조(using) System.IO.DirectoryInfo
   DirectoryInfo directoryInfoPath = new DirectoryInfo(directoryPath);
   
   if (!directoryInfoPath.Exists)  //폴더가 없다면!
   {
     directoryInfoPath.Create();   //생성
   }

   System.IO.File.WriteAllText(대상, 내용, 인코딩); //여기의 대상은 경로 + 파일 + 확장자
   ```  
   ##### 읽기  
   ```
   System.IO.DirectoryInfo di = new System.IO.DirectoryInfo(directoryPath);  //디렉토리 정보
   System.IO.FileInfo fi = new System.IO.FileInfo(saveDirectoryPath+ device_name + ".txt");  //파일 정보

   if(di.Exists && fi.Exists)  //디렉토리와 파일이 있다면
   {
     string savedContents = System.IO.File.ReadAllText(saveDirectoryPath + device_name + ".txt");  //파일내용 읽어오기
   }
   ```  

 ### TextBox에 숫자만 입력  
  #### KeyPress 이벤트를 이용한 방법  
  KeyPress는 일반적인 문자나 숫자 입력에 이용(Ctrl, Alt, Shift, Enter, Tab 등의 입력신호를 받지 못한다)  
  ```
  // KeyPress 이벤트를 이용하여 입력할 때마다 확인을 한다!
  private void TextBoxRobotPort_KeyPress(object sender, KeyPressEventArgs e)
  {
    if(!(char.IsDigit(e.KeyChar) || e.KeyChar == Convert.ToChar(Keys.Back)))
    {
    // char.IsDigit : 10진수인지 여부를 판별
    // Keys.Back : 백스페이스 키
      e.Handled = true;
    }
  }
  ```  
  위 코드를 넣게 되면 텍스트박스에 숫자만 누적된다.  
  여기서 주의해야 할 점은 키보드 누를때 반응이 아니다!!!!  
  경험상 현재 입력중인 칸에서 다음 칸에 입력될때 반응이 나타난다.(커서가 옆으로 옮겨질 때)  

  #### KeyDown 이벤트를 이용한 방법  
  KeyDown, KeyUp은 모든 키에 적용이 된다  
  ```
  private void TextBoxRobotPort_KeyDown(object sender, KeyEventArgs e)
  {
    if (!(e.KeyData == Keys.Back || e.KeyCode >= Keys.D0 && e.KeyCode <= Keys.D9 || e.KeyCode >= Keys.NumPad0 && e.KeyCode <= Keys.NumPad9))
    {
    //Keys.Back : 백스페이스 키
    //Keys.D0 ~ Keys.D9 : 키보드 0 ~ 9
    //Keys.NumPad0 ~ Keys.Num9 : 숫자패드 0~ 9
      e.Handled = true;
      MessageBox.Show("숫자만 입력할 수 있습니다.");
    }
  }
  ```  
  이 방법의 경우에는 누르는 즉시 반응이 오기 때문에 조금 더 복잡하지만 선호하는 편이다.  
## JSON 파싱  
C#에서 JSON에 관한 작업은 대부분 Newtonsoft.Json을 이용한다.  
 ### 설치 방법  
 Nuget 패키지 관리자를 실행  
![Nuget 1](https://user-images.githubusercontent.com/41990925/66175646-72ad8200-e695-11e9-9a6b-af71e643afd8.png)
 Newtonsoft.Json을 설치한다  
![Nuget 2](https://user-images.githubusercontent.com/41990925/66175647-72ad8200-e695-11e9-9f65-efc9bcbcd7fd.png)
 ### 사용 방법  
 - To JSON : JObject, JArray 동일   
 ```
 JObject jsonObject = new JObject();
 jsonObject.Add(Key, Value);
 jsonObject.Add(Key2, Value2);
 jsonObject.Add(Key3, Value3);
 jsonObject.Add(Key4, Value4);

 string jsonContents = jsonObject.ToString();   
 //위 순서는 JSON 오브젝트에 대상의 값을 넣고, 문자열로 변환한 것이다.
 ```  
 - From Json  
 JObject  
 ```
 JObject jsonObject = JObject.Parse(jsonContents);
 //JSON 오브젝트는 Key, Value로 이루어져있어 Dicitionary<String, Object>와 같이 변환이 가능하다.
 Dictionary<String, Object> dictionary = jsonObject.ToObject<<Dictionary<String, Object>>();
 ```  
 만약 Value값만 추출해서 사용하려면 아래와 같이 Value를 이용한다.  
 ```
 //해당 Dictionary의 Key로 이루어진 List를 생성
 List<String> keyList = new List<>(dictionary.Keys);
 //각 Key값에 따른 객체들을 반복문을 이용하여 꺼낼 수 있다.
 for(int i = 0; i < jsonObject.Count; i++){
   Object obj = jsonObject.Value<Object>(keyList[i]);
                         //Value<데이터타입>(Key값)
 }
 ```  
 JArray  
 ```
 JArray jArray = JArray.Parse(jsonContents);
 foreach(JObject jObj in jArray){
   JObject obj = (JObject)jObj;
   //JObject로 변환 후에는 ToObject를 이용해 변환하거나, 반복문으로 Value만 구해낼 수 있다.
   Dictionary<String, int> dictionary = obj.ToObject<Dictionary<String, int>>();
 }
 ```
## Windows Form  
 ### DataGridView  
  #### DataBinding  
  - 현재 선택된 셀의 행 인덱스값  
  ```
  데이터그리드뷰.CurrentCell.RowIndex;
  ```  
  - 현재 선택된 셀에 담긴 값 가져오기  
  ```
  int rownum = 데이터그리드뷰.CurrentCell.RowIndex;
  String device = 데이터그리드뷰.Rows[rownum].Cells[0].FormattedValue.ToString();
  ```  
