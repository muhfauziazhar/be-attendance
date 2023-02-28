const express = require('express');
const router = express.Router();
// const { authJwt } = require('../middlewares/authJwt');
const {
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
} = require('../controllers/userController');
const hasRoleAdmin = require('../middlewares/hasRoleAdmin');
const authJwt = require('../middlewares/authJwt');

// User Routes
router.get('/', [authJwt.verifyToken, hasRoleAdmin.verifyAdmin], getAllUsers);
router.get(
    '/:id',
    [authJwt.verifyToken, hasRoleAdmin.verifyAdmin],
    getUserById
);
router.put('/:id', [authJwt.verifyToken], updateUserById);
router.delete(
    '/:id',
    [authJwt.verifyToken, hasRoleAdmin.verifyAdmin],
    deleteUserById
);

module.exports = router;
