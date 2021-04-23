---
title: "Packaging CRA on Spring Boot"
tags: cra react spring maven rest
toc: true
toc_sticky: true
---

# Packaging CRA on Spring Boot🥕


Written By [Jun Park](https://github.com/junpark-vcanus), VCANUS

1개의 Spring Boot 서버에 REST API 서버와 React App WAS 서버를 포함하는 방법


## 📌 Spring Boot Setup

### 1. Init Spring Boot Project

- [spring initializr](https://start.spring.io/)에서 프로젝트 생성
- 이 글에서 사용하는 설정
    - Project: Maven Project
    - Language: Java
    - Spring Boot: 2.4.5(as default)
    - Project Metadata
        - Packaging: Jar
        - Java: 8
    - Dependencies
        - Spring Web
        - Rest Repositories
        - Spring Data JPA
        - H2 Database

![spring initializr](https://user-images.githubusercontent.com/76981967/115811547-dee40800-a42a-11eb-92e3-78680b62b11b.png)

### 2. Rest API 개발

- `application.properties`에 Rest API base path 추가

```java
// src/main/resources/application.properties
// root는 React를 호스트할 것이기 때문에
// Rest API의 root를 /api로 설정하여 /api 이하 요청은 Rest 요청으로 처리

spring.data.rest.base-path=/api
```

```java
// 또는 수동으로 각 요청마다 지정
// 이 글은 base-path를 설정한 상위 방법을 사용한다고 가정

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {

    private final ProductService service;

    @Autowired
    public ProductController(ProductService service) {
        this.service = service;
    }

    @GetMapping("/api/product/1") // 주소를 명시
    public String selectProduct() {
        return service.select(1);
    }

    // 그 외 CRUD Mapping...
}
```

- Entity, Repository 개발

```java
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Objects;

@Entity
public class User {

    private @Id @GeneratedValue Long id;
    private String name;

    // 그 외 constructor, getter, setter...
}
```

```java
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {}
```

- Repository ~ Database 연결

```java
// 테스트를 위한 데모 데이터베이스 사용

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final UserRepository repository;

    @Autowired
    public DatabaseLoader(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) throws Exception {
        this.repository.save(new User("Paul"));
        this.repository.save(new User("Tom"));
    }
}
```

- 테스트

```java
// after run spring boot app

$ curl localhost:8080/api/users
// Result: two users, Paul and Tom
```


## 📌 React Setup

### 1. React 생성

- Spring boot project root에서 Create React App

```java
$ npx create-react-app frontend
```

### 2. React 개발

- API 요청

```jsx
// npm install axios OR yarn add axios
import axios from 'axios';

const Users = () => {

  const [users, setUsers] = useState();

  useEffect(() => {
    axios.get('/api/employees')
      .then(response => setUsers(response.data._embedded.employees));
    return () => setUsers([])
  }, []);

  return (
    <React.Fragment>
      <h2>Users</h2>
      <UserList users={users} />
    </React.Fragment>
  );
}
```

### 3. 테스트

- 테스트용 proxy 설정

```js
// frontend/src/**/setupProxy.js
// npm install http-proxy-middleware OR yarn add http-proxy-middleware
const { createProxyMiddleware } = require('http-proxy-middleware');

// npm start 시 포트는 3000으로 tomcat 포트 8080에 API 요청 시 CORS 위반
// '/api' 하위 주소로 요청 시 8080으로 임시 전환
// 배포 시에는 같은 tomcat 서버 내에서 요청하기에 무관
module.exports = (app) => {
    app.use(
        createProxyMiddleware('/api', {target: 'http://127.0.0.1:8080'})
    );
};
```

- 테스트

```java
$ npm start
```

![user-api-result](https://user-images.githubusercontent.com/76981967/115829614-28901b00-a44a-11eb-8015-256a145b6c68.png)


## 📌 Packaging

### 1. pom.xml 수정
- frontend-maven-plugin 추가

```xml
<plugins>
...
    <plugin>
        <groupId>com.github.eirslett</groupId>
        <artifactId>frontend-maven-plugin</artifactId>
        <!-- Use the latest released version:
        https://repo1.maven.org/maven2/com/github/eirslett/frontend-maven-plugin/ -->
        <version>1.11.3</version>
        <configuration>
            <workingDirectory>frontend</workingDirectory>
            <installDirectory>target</installDirectory>
        </configuration>
        <executions>
            <execution>
                <id>install node and npm</id>
                <goals>
                    <goal>install-node-and-npm</goal>
                </goals>
                <configuration>
                    <!-- node.js, npm version -->
                    <nodeVersion>v14.16.1</nodeVersion>
                    <npmVersion>7.10.0</npmVersion>
                </configuration>
            </execution>
            <execution>
                <id>npm install</id>
                <goals>
                    <goal>npm</goal>
                </goals>
                <configuration>
                    <arguments>install</arguments>
                </configuration>
            </execution>
            <execution>
                <id>npm run build</id>
                <goals>
                    <goal>npm</goal>
                </goals>            <configuration>
                <arguments>run build</arguments>
            </configuration>
            </execution>
        </executions>
    </plugin>
...
</plugins>
```

- React build 파일 이동 자동화를 위한 maven-antrun-plugin 추가

```xml
<plugins>
...
    <plugin>
        <artifactId>maven-antrun-plugin</artifactId>
        <version>3.0.0</version>
        <executions>
            <execution>
                <phase>generate-resources</phase>
                <configuration>
                    <!-- frontend/build 이하 파일을 Spring boot build 경로의 classes/static으로 복사-->
                    <target>
                        <copy todir="${project.build.directory}/classes/static">
                            <fileset dir="${project.basedir}/frontend/build"/>
                        </copy>
                    </target>
                </configuration>
                <goals>
                    <goal>run</goal>
                </goals>
            </execution>
        </executions>
    </plugin>
    ...
</plugins>
```

### 2. build & package

```java
maven clean
maven install
// target 폴더에 jar 생성
```

### 3. run

```java
$ java -jar target/result.jar
```

## ❗️ 페이지 이동은 react-router-dom 활용

```jsx
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

const App = () => {

  return (
    <div className='App'>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/simulator'>Simulator</Link>
              </li>
              <li>
                <Link to='/users'>Users</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path='/'>
              <Home />
            </Route>
            <Route path='/simulator'>
              <Simulator />
            </Route>
            <Route path='/users'>
              <Users />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};
```

![react-router-dom-result](https://user-images.githubusercontent.com/76981967/115832773-3fd10780-a44e-11eb-86f7-05f9682053a9.png)
