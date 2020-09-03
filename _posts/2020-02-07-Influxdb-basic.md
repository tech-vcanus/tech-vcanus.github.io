# InfluxDB Basic

Written By [David Roh](https://github.com/tsedek), VCANUS

[reference Document](https://docs.influxdata.com/influxdb/v1.7/query_language/spec/)

## RDB vs InfluxDB

  RDB | InfluxDB
  :-------:|:-------:
  database | database 
  table | measurement
  column | key 
  PK or indexed column | tag key(only string)
  unindexed column | field key 
  SET of index entries | series 

## Install on Docker

default admin user

```
$ docker run -d \
    -p 8086:8086 \
    --name influxdb \
    -v $PWD:/var/lib/influxdb \
    -e INFLUXDB_HTTP_AUTH_ENABLED=true \
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
$docker exec -it <ContainerName> influx [-username <USERNAME> -password <PASSWORD> -database <DATABASENAME>] -precision rfc3339
```

only available under version 1.8 when using auth
```
$docker exec -it <ContainerName> influx -precision rfc3339
>auth
```

## Auth Command

### Create Administrator

- CREATE USER \<USERNAME> WITH PASSWORD '\<PASSWORD>' WITH ALL PRIVILEGES
- GRANT ALL PRIVILEGES TO \<USERNAME>
- REVOKE ALL PRIVILEGES FROM \<USERNAME>
  
### Create Non-Admin(Normal User)

- CREATE USER \<USERNAME> WITH PASSWORD '\<PASSWORD>'
- GRANT [ALL,READ,WRITE] ON \<DATABASENAME> TO \<USERNAME>
- REVOKE [ALL,READ,WRITE] ON \<DATABASENAME> TO \<USERNAME>

reference : [Document](https://docs.influxdata.com/influxdb/v1.7/administration/authentication_and_authorization/#user-management-commands)

## Data types

 DataType|Description|Elements
 :-------:|:-------:|:-------:
 Float|ex: 1, 1.0, 1.e+12, 1.E+12|FieldValue
 Integer|ex: 1i|FieldValue
 Boolean|ex: t, T, true, True, TRUE<br> f, F, false,False, FALSE|FieldValue
 String|Length limit 64KB|Measurement, TagKey, TagValue <br> FieldKey, FieldValue
 Timestamp|Unix nanosecond timestamp|Timestamps

## Baisc DDL

- CREATE DATABASE \<DATABASE>
- DROP DATABASE \<DATABASE>
- DROP MEASUREMENT \<measurement_name>

reference : [Document](https://docs.influxdata.com/influxdb/v1.7/query_language/database_management/)

## Basic Client Command

- SHOW USERS
- SHOW DATABASES
- SHOW MEASUREMENTS [ON \<database_name>]
- SHOW TAG KEYS [ON \<database_name>] [FROM \<measurement_name>][WHERE_clause][LIMIT_cluase]
- SHOW SERIES [ON \<database_name>] [FROM \<measurement_name>][WHERE_clause][LIMIT_cluase]
- SHOW FIELD KEYS [ON \<database_name>] [FROM \<measurement_name>]
- SHOW RETENTION POLICIES ON \<DATABASE>
- USE \<DATABASE>[,\<retention_policy>]
- SETTINGS
  

reference : [Document](https://docs.influxdata.com/influxdb/v1.7/query_language/schema_exploration)

## Basic Query

### Insert

- INSERT Mesurement,TagKey=TagValue[,TagKey=TagValue] FieldKey=FieldValue[,FieldKey=FieldValue] [TimeStmap]
  
### Delete

- DELETE FROM Mesurement [FROM_clause \| WHERE_clause \| FROM_cluase WHERE_cluase]

### Select

- SELECT FieldKey(\| *) [Mathematical Operators] [,FieldKey, TagKey] From Mesurement[,Mesurement] Where Key (operation) Value[(AND\|OR) Key (operation) Value] [GROUP BY * \| \<tag_key>[,\<tag_key>] [ORDER BY time DESC] [LIMIT \<n>]
  
> - Syntax Tag in where : tag value - Single quote
> - Where TagKey (operation; =, <>, !=) 'TagValue'

reference(Document)<br>
[Data exploration](https://docs.influxdata.com/influxdb/v1.7/query_language/data_exploration/) <br>
[InfluxQL reference](https://docs.influxdata.com/influxdb/v1.7/query_language/spec/) <br>
[Line protocol reference](https://docs.influxdata.com/influxdb/v1.7/write_protocols/line_protocol_reference/)

## Retention

- CREATE RETENTION POLICY \<retention_name> ON \<database_name> DURATION \<duration_time> REPLICATION \<n> [SHARD DURATION \<duration>] [DEFAULT]

- ALTER RETENTION POLICY \<retention_name> ON \<database_name> DURATION \<duration_time> REPLICATION \<n> [SHARD DURATION \<duration>] [DEFAULT]

reference : [Document](https://docs.influxdata.com/influxdb/v1.7/query_language/database_management/#create-retention-policies-with-create-retention-policy)



## curl 

### write

```
$ curl -i -XPOST "http://localhost:8086/write?db=mydb&u=vcanus&p=1234" --data-binary 'Mesurement,tag_key=tag_value field=90 1463683075'
```

### query

```
$ curl -G 'http://localhost:8086/query?pretty=true&u=vcanus&p=1234&db=grafana&epoch=ns' --data-urlencode "q=SELECT \"value\" FROM \"Mesurement\" WHERE \"tag_key\"='tag_value' AND \"time\" > now() order by desc limit 100"
```





