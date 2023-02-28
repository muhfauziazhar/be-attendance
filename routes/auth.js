const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/authController');

// Route untuk register
router.post('/register', register);

// Route untuk login
router.post('/login', login);

module.exports = router;
