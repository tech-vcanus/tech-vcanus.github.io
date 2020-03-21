---
title: "Springboot Project Configuration"
data: 2020-03-21 00:00:00 -0000
categories: development 
tags: development environment setup installation 
---

Written by SGLee, VCANUS

# Springboot Project Configuration

## Project generation
### Steps
 1. new project -> maven project
 <img width="746" alt="image" src="https://user-images.githubusercontent.com/44759045/77221248-85583c80-6b8b-11ea-8bf6-4d29ffe627ad.png">
 2. check name, location, groupId
 <img width="624" alt="image" src="https://user-images.githubusercontent.com/44759045/77221313-09122900-6b8c-11ea-9809-3f9aa24cdf89.png">

## Maven setup
### install
 1. download binary file from apache maven (https://maven.apache.org/download.cgi)
 2. decompress file to installation folder (ex: /opt/)
 3. check privilege of the folder. use "chown -R userId:groupId folder name" if your id don't have the privilege.
 4. make a symbolic link for easy access
 ```
 $ ln -s apache-maven-x.x.x maven
 ```
### configuration and use Maven in IntelliJ
 1. update environment variable. modify .bash_profile(MAC) or .bashrc(Ubuntu)
 ```
 $ vi ~/.bash_profile
 ```
 ```
 MAVEN_HOME=/opt/maven
 export PATH=$MAVEN_HOME/bin:$PATH
 ```
 2. use Maven command Terminal in Intellij
 ```
 $ mvn clean
 $ mvn compile // to make class file
 $ mvn package // to make jar or war file
 ```
### configuration pom.xml
 - add <build><plugins><plubin>... to pom.xml
 You will see a message "no main manifest attribute, in xx.jar" when you run xx.jar file after "mvn package".
 pom.xml
 ```
     <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
<!--                <executions>-->
<!--                    <execution>-->
<!--                        <goals>-->
<!--                            <goal>repackage</goal>-->
<!--                        </goals>-->
<!--                    </execution>-->
<!--                </executions>-->
            </plugin>
        </plugins>
    </build>
 ```