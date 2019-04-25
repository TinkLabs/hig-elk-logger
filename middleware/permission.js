let decode = require('jwt-decode');

let excludesPath = ["/health-check", "/favicon.ico"];

function isKeyValid(token) {
    if (token === '' || token === undefined) {
        return false;
    } else {
        let decoded;
        try {
             decoded = decode(token);
        } catch (e) {
            throw e;
        }
        let expiryTime = new Date(decoded.exp).getTime();
        return expiryTime >= Date.now() / 1000 && decoded.iss === 'Cypher';
    }
}

module.exports = (req, resp, next) => {
    let jwtToken = req.headers.authorization;
    if (excludesPath.includes(req.url)) {
        next();
    } else {
        let keyValid = isKeyValid(jwtToken);

        try {
            if (keyValid) {
                next();
            } else {
                resp.fail('token is invalid');
            }
        } catch (e) {
            resp.fail(e);
        }
    }
};
