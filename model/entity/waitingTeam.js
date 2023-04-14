// models/waitingTeam.js

module.exports = (sequelize, DataTypes) => {
    const WaitingTeam = sequelize.define('WaitingTeam', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        team_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        waiting_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        num_of_people: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        waiting_time: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    return WaitingTeam;
};
