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

without --permanent / Temporary application before reload

## Print all

```
# firewall-cmd --list-all-zone
```

## Zone
default-zone : public
```
# firewall-cmd --zone=zoneName --list-all // print zone detail info
# firewall-cmd --get-zones // zone list
# firewall-cmd --get-default-zone
# firewall-cmd --get-active-zone
# firewall-cmd --set-default-zone=zoneName // change default zone
# firewall-cmd --new-zone=zoneName // create new zone
# firewall-cmd --delete-zone
```
Set to default zone if --zone does not exist in command <br>
ex) The two commands are the same
```
# firewall-cmd --zone=public --add-service=http
# firewall-cmd --add-service=http
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

## Interface

```
# firwall-cmd --zone=zoneName --change-interface=interfaceName
```

## Masquerade

```
# firewall-cmd --zone=zoneName --query-masquerade
# firewall-cmd --zone=zoneName --add-masquerade
# firewall-cmd --zone=zoneName --remove-masquerade
```
