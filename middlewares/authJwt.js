const jwt = require('jsonwebtoken');
const { secret } = require('../config/auth.config.js');
const db = require('../config/database');
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({ message: 'No token provided' });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized' });
        }

        User.findByPk(decoded.id)
            .then((user) => {
                if (!user) {
                    return res.status(404).send({ message: 'User not found' });
                }

                req.userId = user.id;
                req.userRole = user.role;
                next();
            })
            .catch((err) => {
                res.status(500).send({ message: err.message });
            });
    });
};

const authJwt = {
    verifyToken: verifyToken,
};

module.exports = authJwt;
