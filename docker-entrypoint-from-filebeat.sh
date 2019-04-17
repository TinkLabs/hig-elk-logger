#!/usr/bin/env bash
sudo nohup /filebeat-7.0.0-linux-x86_64/filebeat -e -c filebeat.yml >/dev/null 2>&1 &
npm start
