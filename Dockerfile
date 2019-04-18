FROM node:8

RUN curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-7.0.0-linux-x86_64.tar.gz && \
tar xzvf filebeat-7.0.0-linux-x86_64.tar.gz

COPY filebeat.yml /filebeat-7.0.0-linux-x86_64/

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install && npm install pm2 -g

# Bundle app source
COPY middleware ./middleware
COPY services ./services
COPY router ./router
COPY app.js ./app.js

COPY docker-entrypoint.sh ./

RUN chmod 777 docker-entrypoint.sh

EXPOSE 80

CMD ["./docker-entrypoint.sh"]
