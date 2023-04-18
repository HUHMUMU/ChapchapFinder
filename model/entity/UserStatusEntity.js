const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const userStatusEntity = sequelize.define("userStatusEntity", {
        user_id: {
            type: DataTypes.STRING(255),
            primaryKey: true,
            allowNull: false,
            comment: "유저아이디"
        },
        status: {
            type: DataTypes.ENUM("활동", "휴면", "탈퇴"),
            allowNull: false,
            comment: "활동,휴면,탈퇴"
        },
    }, {
        tableName: "userstatus",
        timestamps: false
    });

    userStatusEntity.associate = (models) => {
        userStatusEntity.belongsTo(models.usersEntity, {
            foreignKey: "user_id",
            targetKey: "user_id"
        });
    };

    return userStatusEntity;
};
