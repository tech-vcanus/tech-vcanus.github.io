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
        "excerpt":"Written by SGLee, VCANUS git command general process $ git init $ git config --global user.name \"user name\" $ git config --global user.email &lt;user email&gt; $ git remote add origin &lt;repository url&gt; $ git fetch origin $ git pull origin master (develop, feature/topic) $ git add &lt;file name&gt; // to...","categories": ["tool"],
        "tags": ["development","environment","git","command"],
        "url": "http://localhost:4000/tool/gitcommand/",
        "teaser":null},{
        "title": "VI Manual",
        "excerpt":"Written by SGLee, VCANUS Command replacement :%s/src/target/c (confirm) :%s/src/target/g (global) :#,#s/src/target (line to line) undo u redo ctrl + R comment Visual Block (Shift + V) : :'&lt;, '&gt; (auto) :'&lt;, '&gt; norm i // (or #) uncomment Visual Block (Shift + V) : :'&lt;, '&gt; (auto) :'&lt;, '&gt; norm...","categories": ["development"],
        "tags": ["development","environment","vi","manual"],
        "url": "http://localhost:4000/development/vimanual/",
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
        "tags": ["install","CentOS","8","and","graphic","driver"],
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
        "excerpt":"Written By Nuri Na, VCANUS Telegraf is an agent for collecting metrics and writing them into InfluxDB or other possible outputs. Installation Linux(Ubuntu): curl -sL https://repos.influxdata.com/influxdb.key | sudo apt-key add - source /etc/lsb-release echo \"deb https://repos.influxdata.com/${DISTRIB_ID,,} ${DISTRIB_CODENAME} stable\" | sudo tee /etc/apt/sources.list.d/influxdb.list macOS brew update brew install telegraf Docker docker...","categories": ["Development"],
        "tags": ["Telegraf","InfluxDB","Grafana"],
        "url": "http://localhost:4000/development/telegraf.md/",
        "teaser":null},{
        "title": "Kinematics",
        "excerpt":"Written by BGKim, VCANUS Homogeneous Matrix(동차 행렬) 방향성을 가진 점을 좌표와 축을 이용해 표현한 행렬 |r11, r12, r13, x| |r21, r22, r23, y| |r31, r32, r33, z| | 0, 0, 0, 1| r11 r21 r31 : x축 벡터 r12 r22 r32 : y축 벡터 r13 r23 r33 : z축 벡터...","categories": ["Research"],
        "tags": ["Forward","Kinematics,","Inverse","Kinematics,","DH","Parameter,","Homogeneous","Matrix"],
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
        "teaser":null}]
