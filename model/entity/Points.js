const {Sequelize,DataTypes}=require("sequelize");

module.exports=(sequelize)=> {
    const pointsEntity = sequelize.define('pointsEntity', {
        point_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        point_date: {
            type: DataTypes.DATE,
        },
        point_plus: {
            type: DataTypes.INTEGER,
        },
        point_reason: {
            type: DataTypes.STRING(255),
        },
        user_id: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    });
    return pointsEntity;
}