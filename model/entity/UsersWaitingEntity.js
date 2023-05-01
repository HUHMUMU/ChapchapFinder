const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const usersWaitingEntity = sequelize.define("usersWaitingEntity", {
        waiting_num: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            comment: "웨이팅 고유번호",
        },
        user_people: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "유저 인원수",
        },
        waiting_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            comment: "웨이팅 날짜",
        },
        start_time: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: "웨이팅 등록시간",
        },
        end_time: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: "웨이팅 입장시간",
        },
        enter_status: {
            type: DataTypes.ENUM("대기", "완료", "유저취소", "사장취소"),
            allowNull: false,
            comment: "입장완료상태체크",
        },
        user_id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: "유저아이디",
        },
        store_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "가게고유번호",
        },
    }, {
        tableName: "userswaiting",
        timestamps: false,
    });

    usersWaitingEntity.associate = (models) => {
        usersWaitingEntity.belongsTo(models.storesEntity, {
            foreignKey: "store_num",
            targetKey: "store_num",
        });
        usersWaitingEntity.belongsTo(models.usersEntity, {
            foreignKey: "user_id",
            targetKey: "user_id",
        });
    };

    return usersWaitingEntity;
};
