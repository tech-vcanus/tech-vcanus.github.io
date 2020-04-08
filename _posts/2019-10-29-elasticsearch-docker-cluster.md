# Elasticsearch cluster on Docker Compose

Written By [David Roh]([github.com/tsedek](https://github.com/tsedek)), VCANUS

# docker-compose

## create docker-compose.yml
```
$touch docker-compose.yml
```

## write docker-compose
### Breaking changes in 7.0 that makes elaticsearch cluster in docker
- under 7.0 : "discovery.zen.ping.unicast.hosts" -> up 7.0 : "discovery.seed_hosts"
- under 7.0 : "search.remote.connect" -> up 7.0 : "cluster.remote.connect"
- under 7.0 : deprecated "discovery.zen.minimum_master_nodes" -> up 7.0 : must defined "cluster.initial_master_nodes=masterNames"

### Fill the docker-compose.yml with under contents
```
version: '3.7'
services:
  create_certs:
    container_name: create_certs
    image: docker.elastic.co/elasticsearch/elasticsearch:$STACK_VERSION
    command: >
      bash -c '
        if [[ ! -f ./config/certificates/elastic-certificates.p12 ]]; then
          bin/elasticsearch-certutil cert -out config/certificates/elastic-certificates.p12 -pass ""
        fi;
        chown -R 1000:0 /usr/share/elasticsearch/config/certificates
      '
    user: "0"
    working_dir: /usr/share/elasticsearch
    volumes:
      - ./elasticsearch/cert:/usr/share/elasticsearch/config/certificates
  esmaster: # Master (NO data)
    image: docker.elastic.co/elasticsearch/elasticsearch:$STACK_VERSION
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
      - cluster.remote.connect=false
      - bootstrap.memory_lock=true
      - cluster.initial_master_nodes=esmaster
      - xpack.monitoring.enabled=true
      - xpack.monitoring.collection.enabled=true
      - xpack.security.enabled=true
      - xpack.security.transport.ssl.enabled=true
      - xpack.security.transport.ssl.verification_mode=certificate
      - xpack.security.transport.ssl.keystore.path=/usr/share/elasticsearch/config/certificates/elastic-certificates.p12
      - xpack.security.transport.ssl.truststore.path=/usr/share/elasticsearch/config/certificates/elastic-certificates.p12
      - ELASTIC_PASSWORD=$ES_PASS
      - "ES_JAVA_OPTS=-Xms1g -Xmx1g"
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - ./elasticsearch/es-master:/usr/share/elasticsearch/data
    ports:
      - $ES_PORT:9200
    networks:
      - esnet
    stdin_open: true
    tty: true
  esdata1: # Data 1
    image: docker.elastic.co/elasticsearch/elasticsearch:$STACK_VERSION
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
      - cluster.remote.connect=false
      - bootstrap.memory_lock=true
      - cluster.initial_master_nodes=esmaster
      - discovery.seed_hosts=esmaster
      - xpack.monitoring.enabled=true
      - xpack.monitoring.collection.enabled=true
      - xpack.security.enabled=true
      - xpack.security.transport.ssl.enabled=true
      - xpack.security.transport.ssl.verification_mode=certificate
      - xpack.security.transport.ssl.keystore.path=/usr/share/elasticsearch/config/certificates/elastic-certificates.p12
      - xpack.security.transport.ssl.truststore.path=/usr/share/elasticsearch/config/certificates/elastic-certificates.p12
      - "ES_JAVA_OPTS=-Xms2g -Xmx2g"
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - ./elasticsearch/es-data-1:/usr/share/elasticsearch/data
    networks:
      - esnet
  esdata2: # Data 2
    image: docker.elastic.co/elasticsearch/elasticsearch:$STACK_VERSION
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
      - cluster.remote.connect=false
      - bootstrap.memory_lock=true
      - cluster.initial_master_nodes=esmaster
      - discovery.seed_hosts=esmaster
      - xpack.monitoring.enabled=true
      - xpack.monitoring.collection.enabled=true
      - xpack.security.enabled=true
      - xpack.security.transport.ssl.enabled=true
      - xpack.security.transport.ssl.verification_mode=certificate
      - xpack.security.transport.ssl.keystore.path=/usr/share/elasticsearch/config/certificates/elastic-certificates.p12
      - xpack.security.transport.ssl.truststore.path=/usr/share/elasticsearch/config/certificates/elastic-certificates.p12
      - "ES_JAVA_OPTS=-Xms2g -Xmx2g"
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - ./elasticsearch/es-data-2:/usr/share/elasticsearch/data
    networks:
      - esnet
  escoordinator: # Router #coordinating node
    image: docker.elastic.co/elasticsearch/elasticsearch:$STACK_VERSION
    container_name: escoordinator
    restart: always
    environment:
      - node.name=escoordinator
      - cluster.name=docker-cluster
      - node.master=false
      - node.voting_only=false
      - node.data=false
      - node.ingest=false
      - node.ml=false
      - cluster.remote.connect=false
      - bootstrap.memory_lock=true
      - cluster.initial_master_nodes=esmaster
      - discovery.seed_hosts=esmaster
      - xpack.monitoring.enabled=true
      - xpack.monitoring.collection.enabled=true
      - xpack.security.enabled=true
      - xpack.security.transport.ssl.enabled=true
      - xpack.security.transport.ssl.verification_mode=certificate
      - xpack.security.transport.ssl.keystore.path=/usr/share/elasticsearch/config/certificates/elastic-certificates.p12
      - xpack.security.transport.ssl.truststore.path=/usr/share/elasticsearch/config/certificates/elastic-certificates.p12
      - "ES_JAVA_OPTS=-Xms4g -Xmx4g"
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - ./elasticsearch/es-coordinator:/usr/share/elasticsearch/data
    networks:
      - esnet
  kibana:
    image: docker.elastic.co/kibana/kibana:$STACK_VERSION
    container_name: kibana
    restart: always
    environment:
      ELASTICSEARCH_HOSTS: http://esmaster:9200
      ELASTICSEARCH_USERNAME: $ES_USER
      ELASTICSEARCH_PASSWORD: $ES_PASS
    networks:
      - esnet
    ports:
      - $KIBANA_PORT:5601
networks:
  esnet:
#   driver: bridge
```

## Fill the .env with environment info
```
STACK_VERSION=value
ES_USER=elastic
ES_PASS=######
ES_PORT=value
KIBANA_PORT=value
```

## make folder for docker volume(for permission)
```
$mkdir volume-folder-name[ex)es-data-1]
```

## run docker-compose
```
$docker-compose up -d
```

## stop docker-compose
```
$docker-compose down
```
