---
title: Firewalld
date: 2020-07-30
categories: development
tags: centos firewalld
toc: true
toc_sticky: true
comments: true
---

Written By [David Roh](https://github.com/tsedek), VCANUS

# Firewalld

## Start

```
# systemctl start firewalld
```

## Stop

```
# systemctl stop firewalld
```

## Restart(reload)

```
# systemctl restart firewalld
```
or
```
# firewall-cmd --reload
```

## Running State

```
# firewall-cmd --state
```

## Config

path : /etc/firewalld/zones/public.xml
--permanent : set config to xml / Reload required for application
```
# firewall-cmd --new-zone=newzone --permament
# firewall-cmd --reload
```

without --permanent / Temporary application

## Zone

```
# firewall-cmd --zone=zoneName --list-all // print zone detail info
# firewall-cmd --get-zones // zone list
# firewall-cmd --get-default-zone
# firewall-cmd --get-active-zone
# firewall-cmd --set-default-zone=zoneName // change default zone
# firewall-cmd --new-zone=zoneName // create new zone
# firewall-cmd --delete-zone
```

## Service

```
# firewall-cmd --add-service=serviceName
# firewall-cmd --remove-service=serviceName
```

## Port

```
# firewall-cmd --add-port=portNo/protocol(tcp/udp)
# firewall-cmd --add-port=startPortNo-endPortNo/protocol
# firewall-cmd --remove-port=portNo/protocol
```
