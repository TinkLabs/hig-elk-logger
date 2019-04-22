#!/usr/bin/env bash
#sudo nohup /filebeat-7.0.0-linux-x86_64/filebeat -e -c filebeat.yml >/dev/null 2>&1 &
#npm start
#pm2 start --name "ELK-logger" app.js
nohup node app.js &
cd /filebeat-7.0.0-linux-x86_64
./filebeat -e -d "*"
