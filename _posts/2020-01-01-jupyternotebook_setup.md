---
title: "Setting Jupiter Notebook"
data: 2020-01-01
categories: development 
tags: Jupyter Notebool
toc: true
toc_sticky: true
---

Written by SGLee, VCANUS

# How to use Jupiter

## 1. Install Python3
```
$sudo apt install python3
```

## 2. Install Jupyter
https://jupyter.org/install
```
$sudo apt install jupyter
$jupyter notebook
```

## 3. Run Jupyter as a service
### make a service file
```
$cd /etc/systemd/system
$vi jupyter.service
```
jupyter.service
```
[Unit]
Description=jupyter notebook

[Service]
User = user
Group = user
WorkingDirectory=/bin/bash </opt/jupyter/workspace_py/>

ExecStart=/opt/jupyter/jupyter.sh

TimeoutStopSec = 10
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
```
### make a shell scipt and give write permission
```
$sudo mkdir /opt/jupyter
$vi /opt/jupyter/jupyter.sh
$sudo chmod 755 jupyter.sh
```
jupyter.sh
```
#!bin/bash
jupyter notebook --config /opt/jupyter/jupyter_notebook_config.py
```
### make a config file and copy it to the installation folder
```
$cd ~/
$jupyter notebook --generate-config
$sudo cp ./.jupyter/jupyter_notebook_config.py /opt/jupyter
```
### modify Jupyter configuration
```
$cd /opt/jupyter
$sudo vi jupyter_notebook_config.py
```
jupyter_notebook_config.py
```
c.NotebookApp.notebook_dir = u'</opt/jupyter/workspace_py/>'
c.NotebookApp.ip = 'your ip'
c.NotebookApp.open_browser = False
c.NotebookApp.password = u'sha1:...'
c.NotebookApp.port_retries = your port
```
https://goodtogreate.tistory.com/entry/IPython-Notebook-%EC%84%A4%EC%B9%98%EB%B0%A9%EB%B2%95
### register the jupyter.service and check status
```
$cd /etc/systemd/system/
$sudo systemctl daemon-reload
$sudo systemctl enable jupyter.service
$sudo systemctl start jupyter
$sudo systemctl status jupyter
$sudo journalctl -f -u jupyter
```

## 4. Make Jupyter Kernel based on VirtualEnv
https://wsvincent.com/install-python3-mac/
### install virtualenv and set environment
```
$sudo apt install pip3 python3-dev
$pip3 install (--user) virtualenv (option)
$cd ~/
$mkdir virtualenvs
$cd virtualenvs
$source .profile (if path is not updated)
$virtualenv --python=python3.6 <your_virtualenv_name>
```
### run virtualenv, install 'ipykernel' to use Jupyter kernel and quit
```
$source ./your_virtualenv_name/bin/activate
$pip3 install ipykernel
...
$which python3
/home/<your_id>/virtualenvs/<your_virtialenv_name>/bin/python3 (important!!)
$deactivate
```
https://tech.songyunseop.com/post/2016/09/using-jupyter-inside-virtualenv/
### check Jupyter path
```
$ jupyter --paths

config:
...
data:
  /home/<your_id>/.local/share/jupyter
```
### make kernel.json
```
$mkdir ~/.local/share/jupyter/kernels/<kernel_name>
$vi ~/.local/share/jupyter/kernels/<kernel_name>/kernel.json
```
kernel.json
```
{
"argv": ["/home/<your_id>/virtualenvs/<your_virtualenv_name>/bin/python3.6", "-m", "ipykernel", "-f", "{connection_file}"],
"display_name":"kernel_name",
"language":"python3"
}
```
### restart Jupyter service
```
$sudo systemctl restart jupyter
```
