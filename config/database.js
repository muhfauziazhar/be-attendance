const { Sequelize } = require('sequelize');
const config = require('./config')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: config.dialect,
        define: {
            timestamps: false,
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// import models
db.user = require('../models/user')(sequelize, Sequelize);
db.attendance = require('../models/attendance')(sequelize, Sequelize);

// define association
db.user.hasMany(db.attendance, { foreignKey: 'userId' });
db.attendance.belongsTo(db.user, { foreignKey: 'userId' });

module.exports = db;
