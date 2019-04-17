const net = require('net');

/**
 * send logs to filebeat, init FilebeatLogger by its constructor such as:
 * const filebeatLogger = new FilebeatLogger({
 * PORT: 3333,
 * HOST: '127.0.0.1'
 * });
 */
class FilebeatLogger {
    constructor() {
        this.enable = true;
        this.port = '13012';
        this.host = '127.0.0.1';
        this.baseInfo = {
            stage: 'DEV'
        };
    }

    /**
     * send info msg to filebeat
     * @param msg
     */
    info(msg) {
        if (!this.enable) {
            return;
        }
        const client = net.createConnection({
            port: 13012,
            host: '127.0.0.1'
        });

        const obj = {
            ...this.baseInfo,
            '@timestamp': new Date(),
            msg,
            level: 'info'
        };

        client.on('error', function (e) {
            console.info(JSON.stringify(`[HIG2Tools - FilebeatLogger] error connect to filebeat: ${e}`, null, 2), '\n ');
        })
            .end(JSON.stringify(obj));
    }

    /**
     * send error msg to filebeat
     * @param msg
     * @param title
     */
    error(msg, title = '') {
        if (!this.enable) {
            return;
        }
        const client = net.createConnection({
            port: this.port,
            host: this.host
        });

        const obj = {
            ...this.baseInfo,
            '@timestamp': new Date(),
            title,
            msg,
            level: 'error'
        };

        client.on('error', function (e) {
            console.info(JSON.stringify(`[HIG2Tools - FilebeatLogger] error connect to ftp://${this.host}:${this.port} :${JSON.stringify(e)}`, null, 2), '\n ');
        })
            .end(JSON.stringify(obj));
    }
}

module.exports = new FilebeatLogger();
