const db = require('../config/database');
const User = db.user;

verifyAdmin = (req, res, next) => {
    User.findByPk(req.userId)
        .then((user) => {
            if (user.role !== 'admin') {
                return res.status(403).send({ message: "User isn't admin" });
            }
            next();
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

const hasRoleAdmin = {
    verifyAdmin,
};

module.exports = hasRoleAdmin;
