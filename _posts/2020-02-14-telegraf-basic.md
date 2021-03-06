---
title: "Telegraf Basic"
data: 2020-02-14
categories: development
tags: Telegraf InfluxDB Grafana
toc: true
toc_sticky: true
---

Written By [Nuri Na](https://github.com/nurring), VCANUS



[Telegraf](https://github.com/influxdata/telegraf) is an agent for collecting metrics and writing them into InfluxDB or other possible outputs.

## Installation

- Linux(Ubuntu):

  ```bash
  curl -sL https://repos.influxdata.com/influxdb.key | sudo apt-key add -
  source /etc/lsb-release
  echo "deb https://repos.influxdata.com/${DISTRIB_ID,,} ${DISTRIB_CODENAME} stable" | sudo tee /etc/apt/sources.list.d/influxdb.list
  ```

- macOS

  ```properties
  brew update
  brew install telegraf
  ```

- Docker

  ```bash
  docker run -d \
  --name yourContainerName \
  -p hostPortNo:ContainerPortNo \ #모니터링 할 plugin과 데이터를 push할 DB 포트
  telegraf:latest
  ```



## Configuration

- File Location
  - Linux(Ubuntu) : `/etc/telegraf/telegraf.conf`
  - macOS: `/usr/local/etc/telegraf.conf`

- Create a configuration file with specific inputs and outputs

  ```bash
  telegraf -input-filter <pluginname>:<pluginname> -output-filter <outputDBname> > telegraf.conf
  # Example ~ generate config with only cpu input & influxdb output plugins defined
  ## telegraf --input-filter cpu --output-filter influxdb config
  ```

- Create a sample configuration file

  ```bash
  telegraf -sample-config > telegraf.conf
  ```



## Start the Telegraf service

``` bash
sudo service telegraf start
```

Once Telegraf is up and running, it will start collecting metrics and writing them to the local InfluxDB.



## Plugins

Telegraf supports various plugins and allows to add custom plugins.

Check available [input](https://github.com/influxdata/telegraf/blob/master/README.md#input-plugins) and [output](https://github.com/influxdata/telegraf/blob/master/README.md#output-plugins) plugins.

