let decode = require('jwt-decode');

let excludesPath = [ "/health-check","/favicon.ico"];

function isKeyValid(token) {
    if(token ==='' || token === undefined){
        return false;
    }
    const decoded = decode(token);
    let expiryTime = new Date(decoded.exp).getTime();
    return expiryTime >= Date.now()/1000 && decoded.iss ==='Cypher';
}

module.exports = (req, resp, next) => {
    let jwtToken = req.headers.authorization;
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
