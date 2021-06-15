---
title: Jackson Json Basic
date: 2021-06-15
categories: development
tags: jackson json
toc: true
toc_sticky: true
comments: true
---

Written By [David Roh](https://github.com/tsedek), VCANUS

# Jackson Json Basic

## Basic Structure

- JsonNode
  - read only
  - includes object json, array json, value json

- ObjectNode
  - {}
  - object json
  - read / write
- ArrayNode
  - []
  - array json
  - read / write
- ValueNode
  - value
  - string, boolean, number ..

## Common Using Object

- ObjectMapper

```java
ObjectMapper jsonMapper = new ObjectMapper();
```

## Create Json Object

### Empty json

- using mapper

```java
ObjectNode objectJson = jsonMapper.createObjectNode();
ArrayNode arrayJson = jsonMapper.createArrayNode;
```

- using JsonNodeFactory

```java
JsonNodeFactory.instance.objectNode();
JsonNodeFactory.instance.arrayNode();
```

### From Json String to Jackson Object

```java
JsonNode jsonNode = jsonMapper.readTree(jsonString);

if(jsonNode.isObject()) {
    ObjectNode json = (ObjectNode)jsonNode;
}

if(jsonNode.isArray()) {
    ArrayNode json = (ArrayNode)jsonNode;
}
```

### From Java Collection to Jackson Object

```java
// List list - array type
JsonNode jsonNode = jsonMapper.convertValue(list, JsonNode.class);
ArrayNode arrayNode = jsonMapper.convertValue(list, JsonNode.class);

// Map map - object type
JsonNode jsonNode = jsonMapper.convertValue(map, JsonNode.class);
ObjectNode objectNode = jsonMapper.convertValue(map, JsonNode.class);
```

### From Jackson Object to JavaCollection

```java
// array type
List list = jsonMapper.convertValue(jsonNode /* or arrayNode */, ArrayList.class);

// object type
Map map = jsonMapper.convertValue(jsonNode /* or objectNode */, HashMap.class);
Map map = jsonMapper.convertValue(jsonNode /* or objectNode */, LinkedHashMap.class);
```

### From Jackson Object to Json String

```java
jsonNode.toString();
```

### Get Value From Jackson Object

- check key

```java
// object type
boolean re = jsonNode.has(key);

// array type
boolean re = jsonNode.has(index);
```

- Get JsonNode

```java
// object type
JsonNode targetNode = jsonNode.get(key/*index*/);
    
// array type
JsonNode targetNode = jsonNode.get(index);
```

- Get Value When JsonNode is ValueNode

```memo
as[DataType](/*default value*/) 함수 : 지정된 DataType으로 casting하여 return
casting이 안될경우에 대비하여 default값 지정 가능
ex) targetNode.asInt(123)

asText(defaultValue)의 경우 값이 null인 경우만 작동
targetNode가 ArrayNode이거나 ObjectNode인 경우는 공백을 리턴
ex) targetNode.asText()
```    

```memo        
[dataType]Value() 함수 : 해당 type경우에 값을 return
해당하지 않으면 null을 리턴
ex) targetNode.textValue()
```

```memo
toString() 함수 : json string으로 출력

boolean : true / false
number : 1, 1.123
string : "string"

ex) targetNode.toString()
```

### Set Value To Jackson Object

- Set to ObjectNode

```java
// set valueNode
objectNode.put(key, value);

// set jsonNode(objectNode, arrayNode)
objectNode.set(key, jsonNode);
```

- Set to ArrayNode

```java
// set valueNode
arrayNode.add(value);

// set jsonNode(objectNode, arrayNode)
arrayNode.add(jsonNode);
```
