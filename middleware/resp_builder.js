let builder = (req, res, next) => {
    /**
     *
     * @param data
     */
    res.success = (data) => {
        res.send({
            code: 200,
            data,
            error: false
        })
    };
    /**
     *
     * @param error_code
     * @param msg
     */
    res.fail = (msg,error_code=-1) => {
        res.send({
            error_code,
            msg,
            error:true
        });
    };
    next();
};
module.exports = builder;
