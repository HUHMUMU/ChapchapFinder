// models/waiting.js

const {DataTypes} = require("sequelize");
module.exports = (sequelize) => {
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
        start_time: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        enter_status: {
            type: DataTypes.ENUM('대기', '완료', '유저취소', '사장취소'),
            allowNull: false,
        },
    });

    usersWaitingEntity.associate = (models) => {
        usersWaitingEntity.belongsTo(models.Userwaiting, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE',
        });
        usersWaitingEntity.belongsTo(models.Store, {
            foreignKey: 'store_num',
            onDelete: 'CASCADE',
        });
    };

    // 비동기 함수로 변경
    usersWaitingEntity.getWaitingTeams = async () => {
        const waitingTeams = await sequelize.models.waiting_team.findAll({
            where: {
                // 대기 중인 팀만 가져옴
                enter_status: '대기'
            },
            include: [{
                model: sequelize.models.user,
                attributes: ['user_id']
            }, {
                model: sequelize.models.store,
                attributes: ['store_name']
            }],
            order: [
                ['start_time', 'ASC']
            ]
        });
        return waitingTeams;
    };

    return usersWaitingEntity;
};
