
---
title: "Install Java with Homebrew"
data: 2020-10-07 00:00:00 -0000
categories: development 
tags: Java Install Homebrew
---

Written by SGLee, VCANUS

## Homebrew
### install homebrew
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

### install cask
```
$brew update
$brew tap homebrew/cask-versions
#$brew tap caskroom/cask
```

## Java Install
### without Cask
#### reference
https://mkyong.com/java/how-to-install-java-on-mac-osx/
#### install java8
```
brew install openjdk@8
```
#### install java11
```
brew install openjdk@11
==>
openjdk is keg-only, which means it was not symlinked into /usr/local,
because macOS provides similar software and installing this software in
parallel can cause all kinds of trouble.

If you need to have openjdk first in your PATH, run:
  echo 'export PATH="/usr/local/opt/openjdk/bin:$PATH"' >> ~/.zshrc

For compilers to find openjdk you may need to set:
  export CPPFLAGS="-I/usr/local/opt/openjdk/include"
```
#### make symbolic link
```
sudo ln -sfn /usr/local/opt/openjdk@8/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-8.jdk
sudo ln -sfn /usr/local/opt/openjdk@11/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-11.jdk
```

### with Cask
#### install java
adoptopenjdk creates the JDK home directly in the /Library/Java/JavaVirtualMachines, so we don't need to create any symbolic link
```
brew cask install adoptopenjdk8
```

#### install java for specific version
```
$ brew tap adoptopenjdk/openjdk # add repository
$ brew cask install adoptopenjdk8
$ brew cask install adoptopenjdk # to install the latest version
```

## Switch Java Version
### dynamic switch
#### modify ~/.zshrc (above macOS10.15 Catalina) or ~/.bashrc (before macOS10.15 Catalina)
```
jdk() {
      version=$1
      unset JAVA_HOME;
      export JAVA_HOME=$(/usr/libexec/java_home -v"$version");
      java -version
}
```
```
$ source ~/.zshrc
$ jdk 1.8
$ java -version
$ jdk 1.11
$ java -version
```
## Install other development tools

### install scala
```
$ brew install scala
```
### install maven, openssl, etc.
```
$ brew install maven
```
```
$ brew install openssl
==>
openssl@1.1 is keg-only, which means it was not symlinked into /usr/local,
because macOS provides LibreSSL.

If you need to have openssl@1.1 first in your PATH, run:
  echo 'export PATH="/usr/local/opt/openssl@1.1/bin:$PATH"' >> ~/.zshrc

For compilers to find openssl@1.1 you may need to set:
  export LDFLAGS="-L/usr/local/opt/openssl@1.1/lib"
  export CPPFLAGS="-I/usr/local/opt/openssl@1.1/include"
```

## Update .rc file
update .zshrc 
```
jdk() {
        version=$1
        unset JAVA_HOME;
        export JAVA_HOME=$(/usr/libexec/java_home -v"$version");
        java -version
}

MAVEN_HOME=/usr/loca/opt/maven
OPENSSL_HOME=/usr/local/opt/openssl@1.1

export PATH=$JAVA_HOME/bin:$PATH
export PATH=$MAVEN_HOME/bin:$PATH
export PATH=$OPENSSL_HOME/bin:$PATH
```


<!--
### static switch
#### modify .bash_profile
```
JAVA_8_HOME=/Library/Java/JavaVirtualMachines/adoptopenjdk-8.jdk/Contents/Home
JAVA_11_HOME=/Library/Java/JavaVirtualMachines/adoptopenjdk-11.jdk/Contents/Home

alias JAVA8='export JAVA_HOME=$JAVA_8_HOME'
alias JAVA11='export JAVA_HOME=$JAVA_11_HOME'

#default to Java11
JAVA11

FLUTTER_HOME=/opt/flutter
MAVEN_HOME=/opt/maven
OPENSSL_HOME=/usr/local/opt/openssl@1.1

export PATH=$JAVA_HOME/bin:$PATH
export PATH=$FLUTTER_HOME/bin:$PATH
export PATH=$MAVEN_HOME/bin:$PATH
export PATH=$OPENSSL_HOME/bin:$PATH
```
-->

## Ref
https://github.com/tech-vcanus/tech-vcanus.github.io/blob/master/_posts/2020-03-13-nats.md

### Install NATS on Mac
#### 1. install protobuf protobuf-c
```
$ brew install protobuf protobuf-c
```
#### 2. install openssl and openssl-devel
```
$ brew install openssl openssl-devel
```
#### 3. add environment variable "OPENSSL_HOME" to .bash_profile
```
OPENSSL_HOME=/usr/local/opt/openssl@1.1
export PATH=$OPENSSL_HOME/bin:$PATH
```
#### 4. install nats clienht (C version)
```
$ git clone https://github.com/nats-io/nats.c.git
$ cd nats.c
$ mkdir build
$ cd build
$ cmake .. -DOPENSSL_ROOT_DIR=/usr/local/opt/openssl@1.1 -DOPENSSL_LIBRARIES=/usr/loca/opt/openssl@1.1/lib
$ make
$ sudo make install
```
