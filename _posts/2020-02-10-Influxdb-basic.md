# InfluxDB
Written By [KYRoh(tsedek)](https://github.com/tsedek), VCANUS

[reference Document](https://docs.influxdata.com/influxdb/v1.7/query_language/spec/)

## RDB vs InfluxDB
|RDB|InfluxDB|
|:---:|:---:|
|database|database|
|table|measurement|
|column|key|
|PK or indexed column|tag key (only string)|
|unindexed column|field key|
|SET of index entries|series|

## Install on Docker
default admin user
```
$ docker run -d \
    -p 8086:8086 \
    --name influxdb \
    -v $PWD:/var/lib/influxdb \
    -e INFLUXDB_HTTP_AUTH_ENABLED=true \
    -e INFLUXDB_ADMIN_ENABLED=true \
    -e INFLUXDB_ADMIN_USER=admin \
    -e INFLUXDB_ADMIN_PASSWORD=1234 \
    influxdb
```

default is non-auth, configured from config file
```
$ docker run --rm influxdb influxd config > influxdb.conf
$ docker run -d \
    -p 8086:8086 \
    --name influxdb \
    -v $PWD/data:/var/lib/influxdb \
    -v $PWD/influxdb.conf:/etc/influxdb/influxdb.conf \
    influxdb \
    - config /etc/influxdb/influxdb.conf
```

## InfluxDB CLI on Docker Container
```
$docker exec -it <ContainerName> influxdb
>auth
```
```
$docker exec -it <ContainerName> influxdb [-username <USERNAME> -password <PASSWORD> -database <DATABASENAME>]
```

## Auth Command
### Administrator
- CREATE USER \<USERNAME> WITH PASSWORD '\<PASSWORD>' WITH ALL PRIVILEGES
- GRANT ALL PRIVILEGES TO \<USERNAME>
- REVOKE ALL PRIVILEGES FROM \<USERNAME>
  
### Non-Admin(Normal User)
- CREATE USER \<USERNAME> WITH PASSWORD '\<PASSWORD>'
- GRANT [ALL,READ,WRITE] ON \<DATABASENAME> TO \<USERNAME>
- REVOKE [ALL,READ,WRITE] ON \<DATABASENAME> TO \<USERNAME>

[Document about Auth](https://docs.influxdata.com/influxdb/v1.7/administration/authentication_and_authorization/#user-management-commands)

## Data types
DataType | Description | Elements
:---:|:---:|:---:
Float|ex: 1, 1.0, 1.e+12, 1.E+12|FieldValue
Integer|ex: 1i|FieldValue
Boolean|ex: t, T, true, True, TRUE <br> f, F, false, False, FALSE|FieldValue
String|Length limit 64KB|Measurement, TagKey, TagValue <br> FieldKey, FieldValue
Timestamp|Unix nanosecond timestamp|Timestamps

## Baisc DDL
- CREATE DATABASE \<DATABASE>
- DROP DATABASE \<DATABASE>

## Basic Client Command
- SHOW USERS
- SHOW DATABASES
- USE \<DATABASE>
- SHOW MEASUREMENTS
- SHOW TAG KEYS
- SHOW FILED KEYS
- SHOW SERIES
- SHOW RETENTION POLICIES ON \<DATABASE>
  

## Basic Query

### Insert
- INSERT Mesurement,TagKey=TagValue[,TagKey=TagValue] FieldKey=FieldValue[,TagKey=TagValue] [TimeStmap(Not Recommanded)]

### Select
- SELECT FieldKey(or WildCard)[Mathematical Operators][,FieldKey, TagKey] From Mesurement[,Mesurement] Where Key=Value[(AND|OR)Key=Value] [LIMIT ]
> - Syntax Tag in where; Where "TagKey" (operation) 'TagValue'
  
### Delete
- DELETE FROM Mesurement [FROM_clause | WHERE_clause | FROM_cluase WHERE_cluase]

## Result time about multiple insert Test on Spring InfluxDB API
- 100,000 : average 294ms, 250ms
- 500,000 : average 1493ms, 1267ms
- 1,000,000 : average 3238ms, 2812ms