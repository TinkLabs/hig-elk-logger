const fs = require('fs');

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
    }

    writeToFile(obj) {
        fs.appendFile('/usr/src/app/elklog.log', `${JSON.stringify(obj)}\n`, function (err) {
            if (err) throw err;
            console.log('Saved to file!');
        });
    }

    /**
     * send info msg to filebeat
     * @param msg
     */
    info(msg) {
        if (!this.enable) {
            return;
        }
        const obj = {
            '@timestamp': new Date(),
            msg,
            level: 'info'
        };
        this.writeToFile(obj);
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
        const obj = {
            title,
            msg,
            level: 'error'
        };

        this.writeToFile(obj);
    }
}

module.exports = new FilebeatLogger();
