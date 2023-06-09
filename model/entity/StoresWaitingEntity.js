const {Sequelize, DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    const storesWaitingEntity = sequelize.define("storesWaitingEntity", {
        admin_waiting: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            comment: "웨이팅 테이블",
        },
        closing_time: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: "웨이팅 마감시간",
        },
        max_people: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "웨이팅 최대 인원수",
        },
        waiting_onoff: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            comment: "웨이팅 on/off",
        },
        time_setup: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "웨이팅 시간 설정",
        },
        store_ads: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: "가게홍보 url",
        },
        store_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "가게 고유번호",
        },
    }, {
        timestamps: false,
        tableName: "storeswaiting",
    });

    storesWaitingEntity.associate = (models) => {
        storesWaitingEntity.belongsTo(models.storesEntity, {
            foreignKey: "store_num",
            targetKey: "store_num",
        });
    };

    return storesWaitingEntity;
};
