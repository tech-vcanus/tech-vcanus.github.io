---
title: "ssd configuration"
data: 2019-10-04 00:00:00 -0000
categories: tool 
tags: development environment ssd install config
---

Written by SGLee, VCANUS

Sever
```
$ sudo vi /etc/ssh/sshd_config
$ sudo systemctl restart sshd.service
```
```
PubKeyAuthentification yes
# PasswordAuthentification no
```

Client
```
$ ssh-keygen -t ecdsa -f ~/.ssh/id_ecdsa -b 521
$ ssh-copy-id -i ~/.ssh/id_ecdsa id@address
```

Client
```
$ ssh -i ~/.ssh/id_ecdsa id@address
$ ssh id@address (server: PubKeyAuth yes)
```
