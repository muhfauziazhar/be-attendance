const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/database');
const app = express();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const attendanceRoutes = require('./routes/attendance');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to attendance app.' });
});

app.use('/', authRoutes);
app.use('/users', userRoutes);
app.use('/attendances', attendanceRoutes);

const PORT = process.env.PORT || 3000;

db.sequelize
    .authenticate()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}.`);
        });
    })
    .catch((err) => console.log('Error: ' + err));
