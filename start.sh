#!/usr/bin/env bash
nohup node app.js &
cd /filebeat-7.0.0-linux-x86_64
./filebeat -e -d "*"
