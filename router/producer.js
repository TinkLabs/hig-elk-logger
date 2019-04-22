let router = require("express").Router();
let filebeatLogger = require("../services/filebeat-logger");
let fs = require("fs");

router.get('/', async function (req, res, next) {
    fs.readFile('/usr/src/app/elklog.log', "utf8", (err, data) => {
        if (err) {
            res.fail(`error with read file:${err}`);
        }
        res.success(data);
    });

    // res.success('success');
});
router.post('/info', async function (req, res, next) {
    filebeatLogger.info(req.body);

    res.success('success');
});
router.post('/error', async function (req, res, next) {
    console.info(JSON.stringify(req.body, null, 2), '\n ');
    res.success('success');
});

module.exports = router;
