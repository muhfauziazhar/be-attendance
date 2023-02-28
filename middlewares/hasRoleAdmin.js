verifyAdmin = (req, res, next) => {
    try {
        if (req.userRole !== 'admin') {
            return res.status(403).send({ message: "User isn't admin" });
        }
        next();
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const hasRoleAdmin = {
    verifyAdmin,
};

module.exports = hasRoleAdmin;
