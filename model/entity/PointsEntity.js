const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const pointsEntity = sequelize.define("pointsEntity", {
        point_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: "포인트 고유번호"
        },
        point_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            comment: "포인트 적립날짜"
        },
        point_plus: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "적립포인트"
        },
        point_reason: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: "포인트 받은 이유"
        },
        user_id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: "유저아이디"
        },
    }, {
        tableName: "points",
        timestamps: false
    });

    pointsEntity.associate = (models) => {
        pointsEntity.belongsTo(models.usersEntity, {
            foreignKey: "user_id",
            targetKey: "user_id"
        });
    };

    return pointsEntity;
};
