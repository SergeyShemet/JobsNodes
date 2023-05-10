const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');
const db = require('../models');
const user = db.User;

verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];
    
    if (!token) {
        return res.status(403).send({
                    success: false,
                    message: 'Не получен токен.'
                });
            }


    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                            success: false,
                            message: 'Не авторизован'
                        })
        }
        req.UserId = decoded.id;
        next();
    });
};

const authJwt = { verifyToken: verifyToken }
module.exports = authJwt;
