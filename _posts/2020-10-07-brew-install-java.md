
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
### install java
```
brew cask install adoptopenjdk8
```

### install java for specific version
```
$ brew tap AdoptOpenJDK/openjdk # add repository
$ brew cask install adoptopenjdk8
$ brew cask install adoptopenjdk # to install the latest version
```

## Switch Java Version
### modify .bash_profile
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

### install scala
```
$ brew install scala
```
