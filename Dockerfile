FROM node:8

RUN curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-7.0.0-linux-x86_64.tar.gz && \
tar xzvf filebeat-7.0.0-linux-x86_64.tar.gz

COPY filebeat.yml /filebeat-7.0.0-linux-x86_64/

RUN chmod go-w /filebeat-7.0.0-linux-x86_64/filebeat.yml

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
#RUN npm install pm2 -g
# Bundle app source
COPY middleware ./middleware
COPY services ./services
COPY router ./router
COPY app.js ./app.js

COPY start.sh ./

RUN chmod 777 start.sh

EXPOSE 80

CMD ["./start.sh"]
