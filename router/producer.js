let router = require("express").Router();
let filebeatLogger = require("../services/filebeat-logger");
let fs = require("fs");

router.post('/info', async function (req, res, next) {
    try {
        filebeatLogger.info(req.body.msg);
    } catch (e) {
        res.fail(`[error]:${e}`);
        return;
    }
    res.success('success');
});
router.post('/error', async function (req, res, next) {
    try {
        filebeatLogger.error(req.body.msg,req.body.title);
    } catch (e) {
        res.fail(`[error]:${e}`);
        return;
    }
    res.success('success');
});

module.exports = router;
