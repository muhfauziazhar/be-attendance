const express = require('express');
const router = express.Router();
const {
    createAttendance,
    getAttendancesByUserId,
    getAllAttendances,
} = require('../controllers/attendanceController');
const authJwt = require('../middlewares/authJwt');
const hasRoleAdmin = require('../middlewares/hasRoleAdmin');

// Attendance Routes
router.post('/', [authJwt.verifyToken], createAttendance);
router.get('/', [authJwt.verifyToken], getAttendancesByUserId);
router.get(
    '/admin',
    [authJwt.verifyToken, hasRoleAdmin.verifyAdmin],
    getAllAttendances
);

module.exports = router;
