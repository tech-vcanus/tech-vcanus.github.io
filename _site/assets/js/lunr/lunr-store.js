var store = [{
        "title": "C# Basics",
        "excerpt":"Written By Young-rae Shin(https://github.com/lived1024) 기초 DataType JAVA에서는 String을 대문자 String으로만 사용했지만 C#에서는 string, String 둘 다 가능하다. 숫자에 관한 데이터 타입은 JAVA와는 다르게 음수, 양수에 이용하는 데이터 타입이 다양하다. (블로그 참조) Naming 규칙 Class의 이름은 JAVA의 클래스 명처럼 첫글자, 단어구분에 대문자!! public class ClassNameExample(){ } 메소드(Method)의 첫 글자는 대문자로!!! -&gt;...","categories": ["development"],
        "tags": ["C#","Basics"],
        "url": "http://localhost:4000/development/CSharp-Basics/",
        "teaser":null},{
        "title": "Scichart Basics",
        "excerpt":"Written by Young-rae Shin(https://github.com/lived1024) Scichart Scichart는 수많은 숫자 데이터를 그래프로 표현할 수 있도록 한다. 이 파일의 내용을 읽기전에 WPF의 기본에 관해서 숙지하는 것이 좋다. Scichart는 WPF 프로젝트를 이용하기때문에 WPF에 대한 기본 지식이 없다면 습득에 어려움이 있을 수 있다. 공식 홈페이지 : http://scichart.com/ 1 Scichart 유의할 점 공식 홈페이지에서 Trial(1달 무료)버전을...","categories": ["development"],
        "tags": ["WPF","C#","Scichart","Basic","Chart","XAML","MVVM"],
        "url": "http://localhost:4000/development/Scichart-Basics/",
        "teaser":null},{
        "title": "WPF Basics",
        "excerpt":"Written by Young-rae Shin(https://github.com/lived1024) 해당 문서는 WPF를 이용한 MVVM 디자인 패턴에 대한 내용을 설명할 것입니다. 아래 링크에서 더 자세한 설명을 볼 수 있습니다. 참고사이트 : The complete WPF tutorial WPF의 정의 MVVC 패턴이란? MVVC 패턴은 MVC패턴에서 개량된 것으로, Model - View - ViewModel로 이루어져 있다. Model : View에서 나타내기위한 데이터의...","categories": ["development"],
        "tags": ["C#","WPF","Basics","MVVM"],
        "url": "http://localhost:4000/development/WPF-Basics/",
        "teaser":null},{
        "title": "Setting for Development Environment",
        "excerpt":"Written by SGLee, VCANUS Install Graphic driver Install Nvidia driver on CentOS nvidia 홈페이지에서 Long Lived Branch Version 다운, 권한 변경(https://www.nvidia.com/en-us/drivers/unix/) $ chmod +x NVIDIA-Linux-x86_64-4xx.run nvidia 홈페이지에서 CUDA Toolkit 버전 확인 후 설치 명령어 확인 후 terminal에 입력(https://developer.nvidia.com/cuda-downloads?target_os=Linux&amp;target_arch=x86_64&amp;target_distro=CentOS&amp;target_version=8&amp;target_type=runfilelocal) $ wget http://developer.download.nvidia.com/compute/cuda/10.1/Prod/local_installers/cuda_10.1.243_418.87.00_linux.run $ sudo sh cuda_10.1.243_418.87.00_linux.run 루트로 변경 후 기본 dev...","categories": ["development"],
        "tags": ["development","environment","setup","installation"],
        "url": "http://localhost:4000/development/devenv/",
        "teaser":null},{
        "title": "Git command",
        "excerpt":"Written by SGLee, VCANUS git command general process $ git init $ git config --global user.name \"user name\" $ git config --global user.email &lt;user email&gt; $ git remote add origin &lt;repository url&gt; $ git fetch origin $ git fetch (default is origin) $ git fetch vcanus (target remote(upstream) is vcanus)...","categories": ["tool"],
        "tags": ["development","environment","git","command"],
        "url": "http://localhost:4000/tool/gitcommand/",
        "teaser":null},{
        "title": "ssd configuration",
        "excerpt":"Written by SGLee, VCANUS   Sever  $ sudo vi /etc/ssh/sshd_config $ sudo systemctl restart sshd.service  PubKeyAuthentification yes # PasswordAuthentification no   Client  $ ssh-keygen -t ecdsa -f ~/.ssh/id_ecdsa -b 521 $ ssh-copy-id -i ~/.ssh/id_ecdsa id@address   Client  $ ssh -i ~/.ssh/id_ecdsa id@address $ ssh id@address (server: PubKeyAuth yes)  ","categories": ["tool"],
        "tags": ["development","environment","ssd","install","config"],
        "url": "http://localhost:4000/tool/ssd-config/",
        "teaser":null},{
        "title": "vi command",
        "excerpt":"Written by SGLee, VCANUS VI command replacement :%s/src/target/c (confirm) :%s/src/target/g (global) :#,#s/src/target (line to line) undo u redo ctrl + R comment Visual Block (Shift + V) : :'&lt;, '&gt; (auto) :'&lt;, '&gt; norm i // (or #) uncomment Visual Block (Shift + V) : :'&lt;, '&gt; (auto) :'&lt;, '&gt;...","categories": ["tool"],
        "tags": ["development","environment","vi","command"],
        "url": "http://localhost:4000/tool/vi-command/",
        "teaser":null},{
        "title": "Docker Manual",
        "excerpt":"Written by SGLee, VCANUS Setup Installation CentOS $ sudo yum update $ sudo yum install docker Start docker on boot A file of docker.service is already installed on /usr/lib/systemd/system. $ sudo systemctl enable docker.service $ sudo systemctl start docker.service $ sudo systemctl status docker.service Start docker container on boot Refer...","categories": ["development"],
        "tags": ["development","environment","docker","manual"],
        "url": "http://localhost:4000/development/docker-manual/",
        "teaser":null},{
        "title": "Elasticsearch Docker Cluster",
        "excerpt":"Elasticsearch cluster on Docker Compose Written By David Roh, VCANUS docker-compose create docker-compose.yml $touch docker-compose.yml write docker-compose Breaking changes in 7.0 that makes elaticsearch cluster in docker under 7.0 : “discovery.zen.ping.unicast.hosts” -&gt; up 7.0 : “discovery.seed_hosts” under 7.0 : “search.remote.connect” -&gt; up 7.0 : “cluster.remote.connect” under 7.0 : deprecated “discovery.zen.minimum_master_nodes”...","categories": [],
        "tags": [],
        "url": "http://localhost:4000/elasticsearch-docker-cluster/",
        "teaser":null},{
        "title": "How to use Jenkins - Basic",
        "excerpt":"Written By Young-rae Shin(https://github.com/lived1024) Jenkins 정의 소프트웨어 개발 시 지속적으로 통합 서비스를 제공하는 툴. 일명 Continuous Intergration (CI)라고 표현한다. 예를 들어 Git을 사용할 때, Git의 Repository에 Push가 감지되면, Jenkins에서 자동으로 Build, Deploy한다. 설치 Requirements JAVA(openJDK도 가능) MAVEN Git 설치 순서 설치 파일 다운로드 : 공식 홈페이지 다운로드 아래 화면에서 LTS버전으로...","categories": ["development"],
        "tags": ["Jenkins","Build"],
        "url": "http://localhost:4000/development/Jenkins-Basics/",
        "teaser":null},{
        "title": "CentOS 8 Install",
        "excerpt":"Written by BGKim, VCANUS Install CentOS 8 Make install USB centos 홈페이지에서 파일을 다운을 받는다.(https://www.centos.org/) 8GB이상의 USB를 준비한다. USB를 연결하고, Rufus 홈페이지에서 Rufus를 다운받은 뒤 실행(https://rufus.ie/) 실행 화면에서 기본사항들을 적절히 세팅 후 파티션 방식을 GPT로 설정 후 시작 Install OS USB를 연결 후 부팅. (cent os 화면이 안나올 시, 바이오스...","categories": ["development"],
        "tags": ["CentOS8","nvidia"],
        "url": "http://localhost:4000/development/CentOS-8-Install/",
        "teaser":null},{
        "title": "Log Rolling",
        "excerpt":"Written by BGKim, VCANUS Log4j2 Add maven dependency pom.xml &lt;dependency&gt; &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt; &lt;artifactId&gt;spring-boot-starter&lt;/artifactId&gt; &lt;exclusions&gt; &lt;exclusion&gt; &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt; &lt;artifactId&gt;spring-boot-starter-logging&lt;/artifactId&gt; &lt;/exclusion&gt; &lt;/exclusions&gt; &lt;/dependency&gt; &lt;dependency&gt; &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt; &lt;artifactId&gt;spring-boot-starter-log4j2&lt;/artifactId&gt; &lt;/dependency&gt; &lt;dependency&gt; &lt;groupId&gt;org.projectlombok&lt;/groupId&gt; &lt;artifactId&gt;lombok&lt;/artifactId&gt; &lt;optional&gt;true&lt;/optional&gt; &lt;/dependency&gt; spring-boot-starter ‘spring-boot-starter’의 기본 로깅을 제외 시킨다. lombok 클래스 상단에 @log4j2을 사용, log작성시 로거객체 생성이 필요없다. Add log4j2.xml in folder resources log4j2.xml &lt;?xml...","categories": ["development"],
        "tags": ["Log","rolling","configuration"],
        "url": "http://localhost:4000/development/Log-Rolling/",
        "teaser":null},{
        "title": "Java Build",
        "excerpt":"Written By Young-rae Shin(https://github.com/lived1024) IntelliJ File -&gt; Project Structure Artifacts -&gt; JAR -&gt; From modules with dependencies Default setting If you want to make executable jar Please check MANIFEST.MF path at Default setting Change path! (java -&gt; resources) A screen similar to the following is displayed Confirm Main-Class at MANIFEST.MF...","categories": ["development"],
        "tags": ["JAVA","Build","Maven","IntelliJ"],
        "url": "http://localhost:4000/development/Java-Build/",
        "teaser":null},{
        "title": "Influxdb Basic",
        "excerpt":"InfluxDB Basic Written By David Roh, VCANUS reference Document RDB vs InfluxDB RDB InfluxDB database database table measurement column key PK or indexed column tag key(only string) unindexed column field key SET of index entries series Install on Docker default admin user $ docker run -d \\ -p 8086:8086 \\...","categories": [],
        "tags": [],
        "url": "http://localhost:4000/Influxdb-basic/",
        "teaser":null},{
        "title": "Telegraf Basic",
        "excerpt":"Written By Nuri Na, VCANUS Telegraf is an agent for collecting metrics and writing them into InfluxDB or other possible outputs. Installation Linux(Ubuntu): curl -sL https://repos.influxdata.com/influxdb.key | sudo apt-key add - source /etc/lsb-release echo \"deb https://repos.influxdata.com/${DISTRIB_ID,,} ${DISTRIB_CODENAME} stable\" | sudo tee /etc/apt/sources.list.d/influxdb.list macOS brew update brew install telegraf Docker docker...","categories": ["development"],
        "tags": ["Telegraf","InfluxDB","Grafana"],
        "url": "http://localhost:4000/development/telegraf-basic/",
        "teaser":null},{
        "title": "Kinematics",
        "excerpt":"Written by BGKim, VCANUS Homogeneous Matrix(동차 행렬) 방향성을 가진 점을 좌표와 축을 이용해 표현한 행렬 |r11, r12, r13, x| |r21, r22, r23, y| |r31, r32, r33, z| | 0, 0, 0, 1| r11 r21 r31 : x축 벡터 r12 r22 r32 : y축 벡터 r13 r23 r33 : z축 벡터...","categories": ["research"],
        "tags": ["ForwardKinematics,","InverseKinematics,","DHParameter,","HomogeneousMatrix"],
        "url": "http://localhost:4000/research/Kinematics/",
        "teaser":null},{
        "title": "GStreamer and RTSP",
        "excerpt":"Written By Nuri Na, KJ Jang, VCANUS GStreamer 는 파이프라인 기반의 멀티미디어 프레임워크이다. 특정 포맷의 파일을 읽고, 처리하여, 다른 포맷으로 전달하는 시스템을 빌드할 수 있다. RTSP 는 미디어 서버 스트리밍에 이용되는 네트워크 프로토콜이다. Installation Ubuntu18.04 기준 GStreamer sudo apt update &amp;&amp; apt install -y gstreamer1.0-tools \\ gstreamer1.0-plugins-base \\ gstreamer1.0-plugins-good \\...","categories": ["development"],
        "tags": ["Server","GStreamer","RTSP"],
        "url": "http://localhost:4000/development/gstreamer-and-rtsp/",
        "teaser":null},{
        "title": "Elasticsearch & Query DSL",
        "excerpt":"Written By Nuri Na, VCANUS About JVM: Elasticsearch는 자바 애플리케이션으로 Java 설치 필요 HTTP / RESTful API: REST API를 통해 조작 JSON: 내부에 JSON으로 저장, 요청/응답도 JSON 형식 역색인(Inverted Index) 구조: 단어 검색 시 해당 단어가 포함된 모든 document를 가리킴 Index/type/document : 엘라스틱 서치의 데이터 계층. /&lt;indexName&gt;/&lt;typeName&gt;/&lt;documentName&gt; 로 표현 현재는...","categories": ["development"],
        "tags": ["Elasticsearch","QueryDSL"],
        "url": "http://localhost:4000/development/querydsl-for-elasticsearch/",
        "teaser":null},{
        "title": "Apache Kafka Basic",
        "excerpt":"Written By Nuri Na, VCANUS Overview Apache Kafka는 오픈소스 데이터 스트림 플랫폼으로, 대용량 실시간 로그 처리에 특화된 메시징 시스템이다. 메시지를 메모리가 아닌 파일 시스템에 저장하며, 분산형 시스템으로 노드 고장과 데이터 손실에 대비한다. consumer가 broker로부터 직접 메시지를 가지고 가는 pull 방식으로 동작, 자신의 처리 능력만큼만 가져가게 된다. Concepts 이미지 출처 :...","categories": ["development"],
        "tags": ["Kafka"],
        "url": "http://localhost:4000/development/apache-kafka-basic/",
        "teaser":null},{
        "title": "HTTP Live Streaming (HLS)",
        "excerpt":"Written By Nuri Na, VCANUS   Overview   Concepts      이미지 출처 : https://developer.apple.com/documentation/http_live_streaming   ","categories": ["development"],
        "tags": ["HLS","Server","Streaming"],
        "url": "http://localhost:4000/development/http-live-streaming/",
        "teaser":null},{
        "title": "nats server and client",
        "excerpt":"Written By KJ Jang, VCANUS Nats 서버는 심플하고 안전한 고성능 오픈소스 메세징 시스템이다. 기본적으로 높은 성능과 확장성, 간단한 사용성을 고려하여 설계되었다. Server Installation Ubuntu18.04 기준 download reference Shell server Nats Server $ sudo apt-get update $ sudo apt-get -y upgrade $ sudo wget https://github.com/nats-io/nats-server/releases/download/v2.1.4/nats-server-v2.1.4-linux-amd64.zip $ unzip nats-server-v2.1.4-linux-amd64.zip $ sudo cp...","categories": ["development"],
        "tags": ["Nats"],
        "url": "http://localhost:4000/development/nats/",
        "teaser":null},{
        "title": "Springboot Project Configuration",
        "excerpt":"Written by SGLee, VCANUS Springboot Project Configuration Project generation Steps new project -&gt; maven project check name, location, groupId Maven setup install download binary file from apache maven (https://maven.apache.org/download.cgi) decompress file to installation folder (ex: /opt/) check privilege of the folder. use “chown -R userId:groupId folder name” if your id...","categories": ["development"],
        "tags": ["development","environment","setup","installation"],
        "url": "http://localhost:4000/development/springboot-project-configuration/",
        "teaser":null},{
        "title": "CMake Guide",
        "excerpt":"Written By Nuri Na, VCANUS Makefile 리눅스 환경에서 소스 코드를 빌드하는데 다음 명령어를 사용한다. make 이 때 make는 소스 코드 디렉토리에 포함된 Makefile이라는 이름의 스크립트를 읽어 순서대로 수행한다. Makefile의 기본 구조는 다음과 같다. #환경 변수 CC=gcc CFLAGS=-g -Wall OBJS=main.o foo.o bar.o TARGET=app.out #규칙 블록 구조 $(TARGET): $(OBJS) $(CC) -o $@...","categories": ["development"],
        "tags": ["CMake","C","C++"],
        "url": "http://localhost:4000/development/cmake-guide/",
        "teaser":null},{
        "title": "Fast Fourier Transform",
        "excerpt":"Written By Park SunHong, VCANUS 차례 이론적 배경 1-1. Fourier Transform의 개념 1-2. DFT란? 1-3. FFT란? 파이썬으로 FFT 수행하기 2-1. 사용할 패키지 소개 2-2. numpy.fft.fft 함수 2-3. 예제 코드 및 설명 1. 이론적 배경 1-1. Fourier Transform의 개념 Time domain의 신호를 frequency domain으로 변환 신호의 주파수 성분을 분석할 때 이용...","categories": ["development"],
        "tags": ["FFT"],
        "url": "http://localhost:4000/development/Fast-Fourier-Transform/",
        "teaser":null},{
        "title": "GStreamer in C code",
        "excerpt":"Written By Nuri Na, VCANUS Basic Concepts Media Source, demuxer, decoder, encoder, converter, sink등 각각 하나의 기능을 가진 element들로 pipeline을 조합하고 Pipline의 상태를 play하는 것이 기본 컨셉이다. 주요 용어는 다음과 같다. Element 파이프라인 내에서 수행할 기능은 각각 하나의 element로 준비되어있다. element들을 엮어 pipeline을 구성한다. Pad element를 연결해주는 고리(혹은 플러그나 포트)로,...","categories": ["development"],
        "tags": ["GStreamer","C","C++"],
        "url": "http://localhost:4000/development/gstreamer-in-c-code/",
        "teaser":null},{
        "title": "Installation of Redis Client",
        "excerpt":"Written by SGLee, VCANUS   https://github.com/sglee-net/docker-redis-cluster   ","categories": ["development"],
        "tags": ["development","environment","redis","client"],
        "url": "http://localhost:4000/development/rediscluster/",
        "teaser":null},{
        "title": "Linux_kernel",
        "excerpt":"Written By KJ Jang, VCANUS Kernel 커널은 운영 체제의 핵심 부분이므로, 커널의 역할 역시 운영체제의 핵심 역할이라 할 수 있다. 모듈 이란? 커널에서 작업해야 하는 기능이 있는데 이를 추가하기 위해서는 커널을 수정해서 재 컴파일 해야 한다. 하지만 이는 너무 번거우므로 리눅스와 같은 운영체제에는 모듈이라는 기능을 제공하여 특정 커널의 기능을 사용하고자...","categories": ["development"],
        "tags": ["Linux","kernel","RTLinux"],
        "url": "http://localhost:4000/development/Linux_kernel_module/",
        "teaser":null},{
        "title": "Linux RTOS",
        "excerpt":"Written By KJ Jang, VCANUS 1. 리눅스 기반의 Real-time OS 모든 OS는 preemptive한 작업을 수행을 보장한다. preemptive 란 프로세스 간 우선 순위를 정하고, 현재 수행 중인 프로세스가 다른 프로세스로부터 interrupt를 받으면 수행 하던 프로세스를 내려 놓은 뒤 우선순위가 높은 프로세스를 먼저 처리하는 것을 말하는데, 사실 이는 OS의 정말 기본 중의...","categories": ["development"],
        "tags": ["RTOS"],
        "url": "http://localhost:4000/development/Linux-RTOS/",
        "teaser":null},{
        "title": "JetsonTX2 SSD , Jetpack install",
        "excerpt":"Written By KJ Jang, VCANUS jatPack install 및 SSD 부팅 경로 설정 필요사항 Host PC (ubuntu 18.04 or 16.04) Target PC (JetsonTX2) usb 케이블(5핀) 라우터 환경(TX2 와 Host PC가 같은 네트워크에 있어야 함) 모니터 및 HDMI 케이블 커피 한잔 및 인내심 예상 작업 시간 : 5시간 Host PC에 L4T 및...","categories": ["development"],
        "tags": ["RTOS"],
        "url": "http://localhost:4000/development/DLAP-201-JextonTX2-SSD-bootLoad/",
        "teaser":null},{
        "title": "CSharp log4net",
        "excerpt":"Written by BGKim, VCANUS log4net log4net NuGet 설치 config 파일 추가 log4net.config &lt;?xml version=\"1.0\" encoding=\"utf-8\" ?&gt; &lt;configuration&gt; &lt;log4net&gt; &lt;root&gt; &lt;level value=\"ALL\"/&gt; &lt;appender-ref ref=\"console\"/&gt; &lt;appender-ref ref=\"file\"/&gt; &lt;appender-ref ref=\"fatal_file\"/&gt; &lt;/root&gt; &lt;appender name=\"console\" type=\"log4net.Appender.ConsoleAppender\"&gt; &lt;layout type=\"log4net.Layout.PatternLayout\"&gt; &lt;conversionPattern value=\"%date %level %logger - %message%newline\" /&gt; &lt;/layout&gt; &lt;/appender&gt; &lt;appender name=\"file\" type=\"log4net.Appender.RollingFileAppender\"&gt; &lt;file value=\".\\log\\app.log\" /&gt; &lt;appendToFile value=\"true\"...","categories": ["development"],
        "tags": ["CSharp","log4net","configuration"],
        "url": "http://localhost:4000/development/CSharp-log4net/",
        "teaser":null},{
        "title": "Grafana Customed React Plugin Install Tutorial",
        "excerpt":"Written By Park SunHong, VCANUS ※ 해당 튜토리얼은 grafana v6.7.1을 기준으로 작성되었음 순서 요약 docker에서 grafana image 생성 docker container 내부에 customed plugin 설치 plugin의 node_modules에 git package 설치 기타 유의사항 1. docker에서 grafana image 생성 $ docker pull grafana/grafana:6.7.1 // 그라파나 image 생성(버전을 적어주지 않으면 latest 버전이 다운됨) $...","categories": ["development"],
        "tags": ["Grafana,","react"],
        "url": "http://localhost:4000/development/Grafana-Tutorial/",
        "teaser":null},{
        "title": "C++ DLL within C#",
        "excerpt":"Written By Nuri Na, VCANUS C++ 프로젝트의 함수를 C#에 가져와 사용하도록 환경 설정 하는 법. 외부 C++ API 를 포함시켜 C++ 동적 라이브러리(dll)를 생성하고 C# 프로젝트에 Import 한 후 C++과 C#간 데이터 타입을 맞춰줌. 예제에서 사용할 파일명은 다음과 같다. ​ 외부 API: Somedll.h, Somedll.lib, ​ C++ 프로젝트: dynamic_example.h, dynamic_example.cpp ​...","categories": ["development"],
        "tags": ["C++","C#","Marshalling","DLL"],
        "url": "http://localhost:4000/development/C++-dll-within-C/",
        "teaser":null},{
        "title": "Stopwatch and Timer in C#",
        "excerpt":"Written By Nuri Na VCANUS Stopwatch class를 이용해 실행 시간을 측정한다. 선언 using System.Diagnostics; using System.Threading; ... public static Timer timer; public static Stopwatch sw; public static int counter = 0; public static void SetTimeCheck() { timer = new Timer(new TimerCallback(Timers), 1, 1000, 1000); } public static void Timers(object obj)...","categories": ["development"],
        "tags": ["C#","Timer","Stopwatch"],
        "url": "http://localhost:4000/development/Stopwatch-and-Timer-in-C/",
        "teaser":null},{
        "title": "Firewalld",
        "excerpt":"Written By David Roh, VCANUS Firewalld Start # systemctl start firewalld Stop # systemctl stop firewalld Restart(reload) # systemctl restart firewalld or # firewall-cmd --reload Running State # firewall-cmd --state Config path : /etc/firewalld/zones/public.xml –permanent : set config to xml / Reload required for application # firewall-cmd --new-zone=newzone --permament #...","categories": ["development"],
        "tags": ["centos","firewalld"],
        "url": "http://localhost:4000/development/Firewalld/",
        "teaser":null}]
