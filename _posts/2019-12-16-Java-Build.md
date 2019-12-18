# IntelliJ
 1. File -> Project Structure  
 ![First](https://user-images.githubusercontent.com/41990925/70882756-157a6900-2014-11ea-9d9c-2d5b70e1abc6.png)  
 2. Artifacts -> JAR -> From modules with dependencies  
 ![Second](https://user-images.githubusercontent.com/41990925/70882757-157a6900-2014-11ea-9b01-ea4d4a6e245c.png)  
 3. Default setting  
 ![Third](https://user-images.githubusercontent.com/41990925/70882754-14e1d280-2014-11ea-8a3f-d2a53539d6f8.png)  
 
 ## If you want to make executable jar  
  - Please check MANIFEST.MF path at Default setting  
  ![default](https://user-images.githubusercontent.com/41990925/70882753-14e1d280-2014-11ea-8b13-034e5bb40105.png)  
  - Change path! (java -> resources)  
  ![change path](https://user-images.githubusercontent.com/41990925/70882755-157a6900-2014-11ea-9389-2e582ca34d0f.png)  
 
 4. A screen similar to the following is displayed  
 ![Register artifacts](https://user-images.githubusercontent.com/41990925/70882750-14493c00-2014-11ea-8772-9229606899e0.png)  
 5. Confirm Main-Class at MANIFEST.MF  
 ![MANIFEST.MF](https://user-images.githubusercontent.com/41990925/70882752-14e1d280-2014-11ea-9a97-b81436e56105.png)  
 6. Build -> Build Artifacts  
 ![Build Menu](https://user-images.githubusercontent.com/41990925/70882748-14493c00-2014-11ea-9825-ae90e839c5e8.png)  
 7. First, Clean => Second, Build  
 ![Build Popup](https://user-images.githubusercontent.com/41990925/70882751-14e1d280-2014-11ea-832c-7008acdd6b74.png)  
 8. Confirm JAR file in project base directory  
 ![Jar File](https://user-images.githubusercontent.com/41990925/70882749-14493c00-2014-11ea-95e7-f3ae6b6f7b4e.png)  
 
# Maven
 1. Install Maven  
 The screen below can be seen after installation
 ![Maven Version](https://user-images.githubusercontent.com/41990925/71044871-42df2800-2176-11ea-96f7-5e8ce6c4901e.png)  
 2. Go to the project directory where you want to build module where "pom.xml" is located  
 ![Path](https://user-images.githubusercontent.com/41990925/71045085-006a1b00-2177-11ea-8b18-30208955f384.png)  
 3. Open console(like cmd, git-bash, terminal, etc...)  
 ![Open console](https://user-images.githubusercontent.com/41990925/71045174-5f2f9480-2177-11ea-870c-47d3ee303a64.png)  
 4. Start build - Use maven build command  
 You need to study maven command.
 ```
 $ mvn clean package -Dmaven.test.skip=true
 $ mvn clean package spring-boot:repackage -Dmaven.test.skip=true
 ```
 ![Input build command](https://user-images.githubusercontent.com/41990925/71045395-1d531e00-2178-11ea-8a43-4be3403cbe5d.png)  
 5. If you see "BUILD SUCCESS", it's complete  
 ![Build Success](https://user-images.githubusercontent.com/41990925/71045498-791da700-2178-11ea-953d-44a78da3ef54.png)

# Add custom jar file to maven project
 1. Open pom.xml  
 2. Add local repository or jar files  
  ## Add local repository in pom.xml
  ```
  <repositories>
    <repository>
      <id>local-repo</id>
      <name>local</name>
      <url>file://${project.basedir}/lib</url>
    </repository>
  </repositories>
  ```
  ## OR add local jar files in pom.xml like this
  ```
   <dependencies>
    <dependency>
      <groupId>org.chronotics</groupId>
      <artifactId>pandora</artifactId>
      <version>1.4-SNAPSHOT</version>
      <scope>system</scope>
      <systemPath>${project.basedir}/lib/pandora.jar</systemPath>
    </dependency>

    <dependency>
      <groupId>com.vcanus</groupId>
      <artifactId>pithos-nosql</artifactId>
      <version>0.0.1-SNAPSHOT</version>
      <scope>system</scope>
      <systemPath>${project.basedir}/lib/pithos-nosql.jar</systemPath>
    </dependency>
   <dependencies>
  ```
