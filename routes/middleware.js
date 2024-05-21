const jwt = require('jsonwebtoken');

module.exports = {};

module.exports.isAuthorized = async (req, res, next) => {
    let token = req.headers.authorization;
    if (!token || token.indexOf('Bearer ') !== 0) {
        res.sendStatus(401);
    } else {
        token = token.replace('Bearer ', '')
        const decodedToken = jwt.decode(token);
        if (decodedToken){
            req._id = decodedToken._id;
            req.email = decodedToken.email;
            req.roles = decodedToken.roles;
            next();
        } else {
           res.sendStatus(401); 
        }
    }
};

module.exports.isAdmin = async (req, res, next) => {
    const roles = req.roles;
    if(roles.includes('admin')){
        next();
    } else {
        res.sendStatus(403);
    }
}