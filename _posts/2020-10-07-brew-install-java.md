---
title: "Install Java with Homebrew"
data: 2020-10-07
categories: development 
tags: Java & Dev Install Environment on Mac
toc: true
toc_sticky: true
---

Written by SGLee, VCANUS

## Homebrew
### install homebrew
```
???/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### install cask
```
$brew update
$brew tap homebrew/cask-versions
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
### install python3
```
$brew install pyenv
==>
readline is keg-only, which means it was not symlinked into /usr/local,
because macOS provides BSD libedit.

For compilers to find readline you may need to set:
  export LDFLAGS="-L/usr/local/opt/readline/lib"
  export CPPFLAGS="-I/usr/local/opt/readline/include"

For pkg-config to find readline you may need to set:
  export PKG_CONFIG_PATH="/usr/local/opt/readline/lib/pkgconfig"
  
$pyenv install 3.8.7
```
### install boost
```
$brew install boost
==>
icu4c is keg-only, which means it was not symlinked into /usr/local,
because macOS provides libicucore.dylib (but nothing else).

If you need to have icu4c first in your PATH, run:
  echo 'export PATH="/usr/local/opt/icu4c/bin:$PATH"' >> ~/.zshrc
  echo 'export PATH="/usr/local/opt/icu4c/sbin:$PATH"' >> ~/.zshrc

For compilers to find icu4c you may need to set:
  export LDFLAGS="-L/usr/local/opt/icu4c/lib"
  export CPPFLAGS="-I/usr/local/opt/icu4c/include"
```
error message
```
==> Pouring boost-1.75.0_1.big_sur.bottle.tar.gz
Error: The `brew link` step did not complete successfully
The formula built, but is not symlinked into /usr/local
Could not symlink lib/cmake/Boost-1.75.0
/usr/local/lib/cmake is not writable.

You can try again using:
  brew link boost
==> Summary
```
solution:
```
$sudo chmod 777 /usr/local/lib/cmake
$brew install boost
$sudo chmod 755 /usr/local/lib/cmake
```
### install Google Test
https://alexanderbussan.medium.com/getting-started-with-google-test-on-os-x-a07eee7ae6dc
```
$git clone https://github.com/google/googletest.git
$cd googletest 
$mkdir build 
$cd build
$cmake ../  #creates a make file 
$make #compiles Google Test
$sudo make install #installs Google Test
$vi ~/.zshrc 
source ~/.zshrc
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

HOMEBREW_HOME=/opt/homebrew
MAVEN_HOME=/usr/local/opt/maven
OPENSSL_HOME=/usr/local/opt/openssl@1.1

export PATH=$HOMEBREW_HOME/bin:$PATH
export PATH=$JAVA_HOME/bin:$PATH
export PATH=$MAVEN_HOME/bin:$PATH
export PATH=$OPENSSL_HOME/bin:$PATH

export CPLUS_INCLUDE_PATH=/usr/local/include
export LIBRARY_PATH=/usr/local/lib
```

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
