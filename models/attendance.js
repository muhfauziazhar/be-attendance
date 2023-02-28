module.exports = (sequelize, Sequelize) => {
    const Attendance = sequelize.define('attendance', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        time: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        location: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });

    return Attendance;
};
