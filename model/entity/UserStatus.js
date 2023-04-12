const {Sequelize,DataTypes}=require("sequelize");

module.exports=(sequelize)=> {
    const userStatusEntity = sequelize.define('userStatusEntity', {
        userId: {
            type: DataTypes.STRING(255),
            primaryKey: true,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('활동', '휴면', '탈퇴'),
            allowNull: false,
        },
    }, {
        tableName: 'userstatus',
        timestamps: false,
    });
    return userStatusEntity;
}