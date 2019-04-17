let {HighLevelProducer, KafkaClient} = require('kafka-node');

/**
 * send logs to kafka
 */
class KafkaSender {
    constructor() {
        this.enable = true;
        const port = '9092';
        const host = '172.16.4.68';
        this.stage = 'DEV';
        const kafkaHost = `${host}:${port}`;
        const client = new KafkaClient({
            kafkaHost,
            clientId: 'hig2-tools-client',
            connectRetryOptions: {
                sessionTimeout: 300,
                spinDelay: 100,
                retries: 2
            }
        });
        this.producer = new HighLevelProducer(client);
        console.log(`[HIG2Tools - KafkaSender] start connect to ${kafkaHost}`);

        this.producer.on('ready', function () {
            console.log('[HIG2Tools - KafkaSender] KafkaSender is ready');
        });

        client.on('error', function (e) {
            console.log(`[HIG2Tools - KafkaSender] error connect to ${kafkaHost} :${JSON.stringify(e)}`);
        });
    }

    /**
     *
     * @param obj
     */
    sendPayload(obj) {
        const payloads = [{
            topic: 'HIG',
            messages: JSON.stringify(obj), // multi messages should be a array, single message can be just a string or a KeyedMessage instance
            timestamp: Date.now() // <-- defaults to Date.now() (only available with kafka v0.10+)
        }];
        // eslint-disable-next-line no-unused-vars
        this.producer.send(payloads, (error, result) => {
            if (error) {
                console.log(`[HIG2Tools - KafkaSender] error send message :${JSON.stringify(error)}`);
            }
            console.log('[HIG2Tools - KafkaSender] message send success');
        });
    }

    /**
     * send info msg to kafka
     * @param msg
     */
    info(msg) {
        if (!this.enable) {
            return;
        }
        const obj = {
            msg,
            level: 'info'
        };

        this.sendPayload(obj);
    }

    /**
     * send error msg to kafka
     * @param msg
     * @param title
     */
    error(msg, title = '') {
        if (!this.enable) {
            return;
        }
        const obj = {
            title,
            msg,
            level: 'error'
        };
        this.sendPayload(obj);
    }
}

module.exports = new KafkaSender();
