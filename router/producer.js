let router = require("express").Router();
// let kafkaSender = require("../services/kafka-sender");
let filebeatLogger = require("../services/filebeat-logger");

router.post('/info', async function (req, res, next) {
    // kafkaSender.info(req.body);
    console.info(JSON.stringify(req.body, null, 2), '\n ');
    filebeatLogger.info(req.body);
    res.success('success');
});
router.post('/error', async function (req, res, next) {
    // kafkaSender.error(req.body);
    console.info(JSON.stringify(req.body, null, 2), '\n ');
    res.success('success');
});

module.exports = router;
