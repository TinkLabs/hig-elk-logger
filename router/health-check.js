let router = require("express").Router();

router.get('/', async function (req, res, next) {
    console.log("healthy check!");
    res.send("healthy\n");
});

module.exports = router;
