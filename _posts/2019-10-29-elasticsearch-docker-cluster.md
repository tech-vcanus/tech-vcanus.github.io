#Elasticsearch cluster on Docker Compose

Written By KYRoh, VCANUS

# docker-compose

## create docker-compose.yml
```
$touch docker-compose.yml
```

## write docker-compose
//  under 7.0 : discovery.zen.ping.unicast.hosts -> up 7.0 : discovery.seed_hosts
//  under 7.0 : search.remote.connect -> up 7.0 : cluster.remote.connect
//  under 7.0 : deprecated discovery.zen.minimum_master_nodes -> up 7.0 : must defined initial_master_nodes=masterNames
```
version: '3.7'
services:
  esmaster: # Master (NO data)
    image: docker.elastic.co/elasticsearch/elasticsearch:7.4.0
    container_name: esmaster
    restart: always
    environment:
      - node.name=esmaster
      - cluster.name=docker-cluster
      - node.master=true
        #      - node.voting_only=false
      - node.data=false
      - node.ingest=true
        #      - node.ml=false
      - bootstrap.memory_lock=true
      - cluster.initial_master_nodes=esmaster  
      - discovery.seed_hosts=esdata1,esdata2,esmaster
      - "ES_JAVA_OPTS=-Xms1g -Xmx1g"
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - ./elasticsearch/es-master:/usr/share/elasticsearch/data
    ports:
      - 9200:9200
      - 9300:9300
    networks:
      - esnet
    stdin_open: true
    tty: true
  esdata1: # Data 1
    image: docker.elastic.co/elasticsearch/elasticsearch:7.4.0
    container_name: esdata1
    restart: always
    environment:
      - node.name=esdata1
      - cluster.name=docker-cluster
      - node.master=false
        #      - node.voting_only=false
      - node.data=true
      - node.ingest=false
        #      - node.ml=false
      - bootstrap.memory_lock=true
      - cluster.initial_master_nodes=esmaster
      - discovery.seed_hosts=esdata1,esdata2,esmaster
      - "ES_JAVA_OPTS=-Xms2g -Xmx2g"
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - ./elasticsearch/es-data-1:/usr/share/elasticsearch/data
    ports:
      - 9201:9200
      - 9301:9300
    networks:
      - esnet
  esdata2: # Data 2
    image: docker.elastic.co/elasticsearch/elasticsearch:7.4.0
    container_name: esdata2
    restart: always
    environment:
      - node.name=esdata2
      - cluster.name=docker-cluster
      - node.master=false
        #      - node.voting_only=false
      - node.data=true
      - node.ingest=false
        #      - node.ml=false
      - bootstrap.memory_lock=true
      - cluster.initial_master_nodes=esmaster
      - discovery.seed_hosts=esdata1,esdata2,esmaster
      - "ES_JAVA_OPTS=-Xms2g -Xmx2g"
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - ./elasticsearch/es-data-2:/usr/share/elasticsearch/data
    ports:
      - 9202:9200
      - 9302:9300
    networks:
      - esnet
  esrouter: # Router #coordinating node
    image: docker.elastic.co/elasticsearch/elasticsearch:7.4.0
    container_name: esrouter
    restart: always
    environment:
      - node.name=esrouter
      - cluster.name=docker-cluster
      - node.master=false
      - node.voting_only=false
      - node.data=false
      - node.ingest=false
      - node.ml=false
      - cluster.remote.connect=false
      - bootstrap.memory_lock=true
      - cluster.initial_master_nodes=esmaster
      - discovery.seed_hosts=esdata1,esdata2,esmaster
      - "ES_JAVA_OPTS=-Xms4g -Xmx4g"
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - ./elasticsearch/es-router:/usr/share/elasticsearch/data
    ports:
      - 9203:9200
      - 9303:9300
    networks:
      - esnet
  kibana:
    image: docker.elastic.co/kibana/kibana:7.4.0
    container_name: kibana
    restart: always
    environment:
      ELASTICSEARCH_HOSTS: http://esmaster:9200
    depends_on:
      - esmaster
      - esdata1
      - esdata2
      - esrouter
    networks:
      - esnet
    ports:
      - 5601:5601
networks:
  esnet:
```

##make folder for docker volume
```
$mkdir volume-folder-name[ex)es-data-1]
```

##run docker-compose
```
$docker-compose up -d
```

##stop docker-compose
```
$docker-compose down
```