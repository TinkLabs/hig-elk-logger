let decode = require('jwt-decode');

let excludesPath = [ "/health-check","/favicon.ico"];

function isKeyValid(token) {
    if(token ==='' || token === undefined){
        return false;
    }
    const decoded = decode(token, { header: true });
    let expiryTime = new Date(decoded.expire_time).getTime();
    return expiryTime >= Date.now();
    // && decoded.sub === 'kafkasender' && decoded.staging === 'DEV'
}

module.exports = (req, resp, next) => {
// authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJob3RlbF9pZCI6IjIiLCJpbnRlZ3JhdGlvbl9pZCI6IjEiLCJzeXN0ZW1fY29kZSI6IkZDUyIsInR5cGUiOiJzYW5kYm94IiwiZXhwaXJ5X3RpbWUiOiIyMDIxLTAzLTEyVDAzOjA0OjU5LjU3N1oiLCJpYXQiOjE1NTIzNTk5MDR9.4pJWZ1sUKxHaBqalJAhSn4sti_WkJAZNUa0DoK3QKSI
    let jwtToken = req.header.authorization;
    if (excludesPath.includes(req.url)) {
        next();
    } else {
        if (isKeyValid(jwtToken)) {
            next();
        } else {
            resp.fail('token is invalid');
        }
    }
};

