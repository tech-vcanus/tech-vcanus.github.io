
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
## Install maven, openssl, etc.
use brew install

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

### install scala
```
$ brew install scala
```
