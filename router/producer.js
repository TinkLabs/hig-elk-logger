let router = require("express").Router();
let filebeatLogger = require("../services/filebeat-logger");

router.post('/info', async function (req, res, next) {
    filebeatLogger.info(req.body);

    res.success('success');
});
router.post('/error', async function (req, res, next) {
    console.info(JSON.stringify(req.body, null, 2), '\n ');
    res.success('success');
});

module.exports = router;
