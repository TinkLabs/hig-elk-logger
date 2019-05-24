##build image to test on local
build image:
```bash
docker build -t cypher/hig-elk-logger:latest .
```

run on local(cypher's):
-v ./filebeat.yml:/filebeat-7.0.0-linux-x86_64/filebeat.yml
```bash
docker run -d --name logger -p 80:80 \
 --network esnet --ip 172.19.0.8 cypher/hig-elk-logger
```

