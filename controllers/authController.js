const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../config/database');
const { secret } = require('../config/auth.config');

// User model
const User = db.user;

// Register new user
exports.register = (req, res) => {
    // Create a new user with hashed password
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        role: 'employee',
    })
        .then(() => {
            res.status(201).send({ message: 'User has been registered' });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'An error occurred while creating the user. Please try again later.',
            });
        });
};

// Login user
exports.login = (req, res) => {
    User.findOne({ where: { email: req.body.email } })
        .then((user) => {
            if (!user) {
                return res.status(404).send({
                    auth: false,
                    token: null,
                    message: 'User not found.',
                });
            }

            // Check if password is valid
            const isValidPassword = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!isValidPassword) {
                return res.status(401).send({
                    auth: false,
                    token: null,
                    message: 'Invalid password.',
                });
            }

            // Create a JWT token for the user
            const token = jwt.sign({ id: user.id }, secret, {
                expiresIn: 86400, // 24 hours
            });

            res.status(200).send({ auth: true, token: token });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'An error occurred while logging in. Please try again later.',
            });
        });
};
