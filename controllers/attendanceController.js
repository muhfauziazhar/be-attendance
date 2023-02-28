const db = require('../config/database');
const Attendance = db.attendance;
const User = db.user;

// Create a new attendance
exports.createAttendance = (req, res) => {
    const { time, location, type } = req.body;
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
        return;
    }

    // Create an attendance object
    const attendance = {
        userId: req.userId,
        time,
        location,
        type,
    };

    // Save the attendance in the database
    Attendance.create(attendance)
        .then((data) => {
            res.status(201).send({ message: 'Attendance created' });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while creating the Attendance.',
            });
        });
};

// Retrieve getAttendancesByUserId
exports.getAttendancesByUserId = (req, res) => {
    Attendance.findAll({
        where: { userId: req.userId },
        order: [['time', 'ASC']],
    })
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving Attendances.',
            });
        });
};

// Retrieve all attendance data for admin only
exports.getAllAttendances = (req, res) => {
    Attendance.findAll({
        include: {
            model: User,
            attributes: ['username'],
        },
        order: [['time', 'ASC']],
    })
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving Attendances.',
            });
        });
};
