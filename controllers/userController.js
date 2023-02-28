const db = require('../config/database');

// User model
const User = db.user;

// Get all users
exports.getAllUsers = (req, res) => {
    User.findAll({
        attributes: ['username', 'email', 'role'],
    })
        .then((users) => {
            res.status(200).send(users);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'An error occurred while retrieving users. Please try again later.',
            });
        });
};

// Get user by ID
exports.getUserById = (req, res) => {
    User.findByPk(req.params.id)
        .then((user) => {
            if (!user) {
                return res.status(404).send({
                    message: `User with ID ${req.params.id} not found.`,
                });
            }

            res.status(200).send(user);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    `An error occurred while retrieving user with ID ${req.params.id}. Please try again later.`,
            });
        });
};

// Update user by ID
exports.updateUserById = (req, res) => {
    User.update(
        {
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            role: 'employee',
        },
        {
            where: { id: req.params.id },
        }
    )
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'User was updated successfully.',
                });
            } else {
                res.send({
                    message: `Cannot update user with id=${req.params.id}. Maybe user was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: `Error updating user with id=${req.params.id}`,
            });
        });
};

// Delete user by ID
exports.deleteUserById = (req, res) => {
    User.destroy({
        where: { id: req.params.id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'User was deleted successfully!',
                });
            } else {
                res.send({
                    message: `Cannot delete user with id=${req.params.id}. Maybe user was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: `Could not delete user with id=${req.params.id}`,
                error: err.message,
            });
        });
};
