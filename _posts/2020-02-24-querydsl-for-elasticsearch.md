---
title: "Elasticsearch & Query DSL"
date: 2020-02-24
categories: development
tags: Elasticsearch QueryDSL
toc: true
toc_sticky: true
---

Written By [Nuri Na](https://github.com/nurring), VCANUS

## About

- JVM: Elasticsearch는 자바 애플리케이션으로 Java 설치 필요

- HTTP / RESTful API: REST API를 통해 조작

- JSON: 내부에 JSON으로 저장, 요청/응답도 JSON 형식

- 역색인(Inverted Index) 구조: 단어 검색 시 해당 단어가 포함된 모든 document를 가리킴

- Index/type/document : 엘라스틱 서치의 데이터 계층.  `/<indexName>/<typeName>/<documentName>` 로 표현   
  현재는 type를 구분하지 않도록 하고 있으며, /indexName/`_doc`/documentName으로 사용
  
  

## Indexing

인덱스 생성

```c
//**Example**
PUT lecture // lecture 인덱스 생성

PUT lecture/_doc/1 // 인덱스가 없을 경우 인덱스 생성, title 필드에 value 저장 (Schemeless)
{
  "title": "근대 중국사"
}
```



## Mapping

인덱스에 필드와 데이터 포맷을 정의

가능한 데이터 타입은 text, keyword, date, long, double, boolean, [ip](https://www.elastic.co/guide/en/elasticsearch/reference/current/ip.html), [geo_point](https://www.elastic.co/guide/en/elasticsearch/reference/current/geo-point.html) 등 

```c
//**Example**
PUT lecture/_mapping
{
  "properties":{
    "title":{"type":"text"},
    "professor":{"type":"text"},
    "major":{ //text와 keyword 두 가지로 정의
      "type":"text",
      "fields": {
        "raw": {
          "type":"keyword" //fields.raw
        }
      }
    },
    "semester":{"type":"text"},
    "student_count":{"type":"integer"},
    "unit":{"type":"integer"},
    "rating":{"type":"integer"},
    "report_due_date":{"type":"date","format":"yyyy-MM-dd"},
    "school_location":{"type":"geo_point"} //좌표값. lat/lon 키를 가짐. geohash 가능. 
  }
}
```



## Insert/Update

```c
//**Example**
PUT lecture/_doc/1
{
  "title": "중국 고전 강독",
  "professor": "나민구",
  "major": "중국어", // text와 keyword 두 가지 타입으로 mapping
  "semester": "1학기",
  "student_count": 20,
  "unit": 5,
  "rating": 8,
  "report_due_date": "2020-03-10",
  "school_location": {
    "lat":37.401376,
    "lon":127.110516
  }
}

PUT lecture/_doc/2
{
  "title": "현대중국정치",
  "professor": "오승렬",
  "major": "중국어",
  "semester": "1학기",
  "student_count": 10,
  "unit": 3,
  "rating": 4,
  "report_due_date": "2020-03-24",
  "school_location": "drm3btev3e86" //geohash
}
```



## URI Search

URL에 파라미터를 넘겨 문서 조회, 간단한 테스트에 유용

``` bash
## Example
curl -XGET 'localhost:9200/<indexName>/_search?q=<검색어>&sort=<정렬기준>'
```



## Query DSL

Request Body 검색에 이용되는 JSON 구조를 지원, 다양한 검색 조건 조합에 용이하며 재사용이 가능해 일반적으로 사용됨


### Query DSL 구조

```c
{
  "size": //리턴 결과 개수 지정
  "from": //몇 번째 문서부터 가져올 지 지정
  "timeout": //결과 받는 데까지 걸리는 시간
  
  "_source": //특정 필드만 출력하고 싶을 때 사용
  "query" : { } //검색 조건문 작성
  "aggs" : { } //통계 및 집계
  "sort" : { } //출력 조건
}
```

​      

_* 아래 예시의 주석에 해당하는 번호를 확인할 것_
```c
//**Example**

// SELECT title FROM ( SELECT * FROM lecture WHERE major = '중국어' )
// WHERE title = '%현대%' OR title = '%중국%';
POST lecture/_search
{
  "from": 0, //첫 페이지부터
  "size": 5, //다섯 개 문서만 조회
  "query": { //2. 쿼리 컨텍스트
    "bool": {
      "must": [ //1. 반드시 조건에 만족하는 문서만 검색
        {
          "match": {  //3. match
            "title": "현대 중국"
          }
        }
      ],
      "filter": { //2. 필터 컨텍스트
        "term": {
          "major": "중국어"
        }
      }
    }
  },
  "_source": [ "title", "rating" ],  //보고 싶은 필드만 필터링
  "sort": [ //정렬
    { 
      "rating": { "order": "asc" } 
    }
  ]
}
```


1. must 연산과 조건 쿼리

   | Elasticsearch      | SQL                    | 설명                                 |
   | ------------------ | ---------------------- | ------------------------------------ |
   | must : [field]     | AND <column> = <조건>  | 반드시 조건에 만족하는 문서만        |
   | must_not : [field] | AND <column> != <조건> | 조건을 만족하지 않는 문서            |
   | should : [field]   | OR <column> = <조건>   | 여러 조건 중 하나 이상 만족하는 문서 |
   | filter : [field]   | <column> IN <조건>     | 조건을 포함하는 문서                 |

2. 쿼리 컨텍스트와 필터 컨텍스트

   |         | 쿼리 컨텍스트                                                | 필터 컨텍스트                                                |
   | ------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
   | 용도    | 전문 검색 시                                                 | 조건 검색 시 (Yes/No)                                        |
   | 특징    | 분석기에 의해 분석<br />연관성 관련 Score를 계산<br />루씬 레벨에서 분석 - 상대적으로 느림 | Yes/No로 단순 판별<br />연관성 관련 계산 X<br />엘라스틱서치 레벨에서 분석 - 상대적으로 빠름 |
   | 사용 예 | 문장 분석                                                    | 'major' 필드 값이 '중국어'인지 여부                          |

3. Match 쿼리 - 형태소 분석을 통해 term을 분리, 별도의 operator 필드가 없으면 term을 대상으로 OR 연산을 수행함

  ```c
  // cf ) operator를 적용하는 경우
  "match": {
              "title": {
                "query" : "현대 중국",
                "operator" : "and"
              }
            }
  ```


## Aggregations(집계)

SQL보다 강력한 집계 기능 제공 - 여러 aggs 중첩, 날짜/위치 정보 집계, 분산처리 등

집계 시 문서를 평가한 후 기준에 만족하는 문서를 그룹화 하고, 그것을 토대로 집계 수행



### 집계 구문 구조

```c
{
  "query": { ... },
  "aggregations" : { ... } //혹은 aggs
}
```

```c
"aggregations": {
  "집계 이름":{
    "집계 타입":{ //terms, date_histogram, sum ...
      집계 타입에 맞는 조건 내용
    },
    [, "meta" : { 메타 데이터 조건 내용 }]? //메타 필드 가능
    [, "aggregations" : { [ 서브 집계 ]+ } ]? //서브 집계 가능
  }
  [,"집계 이름2" : { ... }]* //집계 중첩 가능
}
```

​      

```c
//**Example**
// SELECT avg(rating) as average_rating FROM lecture GROUP BY ranges;
POST lecture/_search
{
  "size": 0, //집계된 문서들의 데이터는 불필요하므로 0
  "aggs": {
    "group_by_student_count": { //그룹화
      "range": {
        "field": "student_count",
        "ranges": [
          { "from": 0, // 이상 (<=)
            "to": 11 }, // 미만 (<)
          { "from": 11,
            "to": 21 }
        ]
      },
      "aggs": { //집계
        "average_rating": {
          "avg": { "field": "rating"  }
        }
      }
    }
  }
}

// SELECT major, avg(rating) from  lecture GROUP BY major;
GET lecture/_search?size=0 // get/post 섞어서 쓸 수 있음
{
  "aggs": {
    "group_by_major":{ //그룹화
      "terms":{
        "field": "major.raw",
        "order" : { "_key" : "asc" }
      },
      "aggs": { //집계
        "average_rating":{
          "avg":{ "field": "rating" }
        }
      }
    }
  }
}
```

​     

### 확장 통계 집계

```c
GET lecture/_search?size=0
{
  "aggs":{
    "mongtangda": {
      "extended_stats": { //count, min, max, avg, sum 외 제곱합, 분산, 표준편차 등.. 
        "field": "student_count"
      }
    }
  }
}
```



## Shards & Replicas

```c
PUT lecture
{
  "settings":{
    "index": {
      "number_of_shards": 3,
      "number_of_replicas": 0
    }
  }
}
```

