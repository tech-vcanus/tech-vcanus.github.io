# Install Development Environment

## Java
### Install OpenJDK
```
$ apt search openjdk
$ sudo apt install openjdk-8-jdk
$ sudo apt install openjdk-11-jdk
```
### Modify .zshrc
```
$ JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk (or /etc/alternatives/java_sdk_1.8.0_openjdk)
# $ JAVA_HOME=/usr/lib/jvm/java-1.11.0-openjdk
$ export JAVA_HOME
```
### Change Java version
```
$ sudo update-alternatives --config java
```

## Build Tools

### Maven
```
$ sudo apt install maven
```

### Ant
```
$ sudo apt install ant
```

### CMake
```
$ sudo apt install cmake
```

### Python
check python version
```
$ python3 --version
```
if python3 is installed (python3.8 is installed on Ubutu 20.04), install python3-pip
```
$ sudo apt install python3-pip # python3-dev will be installed with python3-pip
```

## Test Tools

### Unit Test for C/C++ (GTest)
```
$ sudo apt install googletest
```

## Libraries
### OpenSSL
check whether openssl is installed or not
(maybe installed)
```
$ sudo apt install openssl
$ sudo apt install libcurl4-openssl-dev
```

### Redis
```
$ sudo apt install libhiredis-dev
```

### Protobuf
```
$ sudo apt install libprotobuf-dev
$ sudo apt install libprotobuf-c-dev
```

#### Thrift
```
$ sudo apt install libthrift-dev
```

#### NATS
```
$ sudo apt install 
```
