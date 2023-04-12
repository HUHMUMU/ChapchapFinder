const {Sequelize,DataTypes}=require("sequelize");

module.exports=(sequelize)=> {
    const usersWaitingEntity = sequelize.define('usersWaitingEntity', {
        waitingNum: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userPeople: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        waitNum: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        waitingDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        startTime: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        endTime: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        enterStatus: {
            type: DataTypes.ENUM('대기', '완료', '유저취소', '사장취소'),
            allowNull: false,
        },
        userId: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        storeNum: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'userswaiting',
        timestamps: false,
    });
    return usersWaitingEntity;
}