const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const chapDealsEntity = sequelize.define("chapDealsEntity", {
        event_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: "이벤트보드번호"
        },
        store_num: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "가게고유번호"
        },
        event_title: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: "이벤트 제목"
        },
        event_condition: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: "이벤트 조건"
        },
        event_reward: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: "이벤트 보상"
        },
        event_img: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: "이벤트 이미지"
        },
        event_start: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            comment: "이벤트 시작기간"
        },
        event_end: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            comment: "이벤트 끝나는기간"
        },
    }, {
        tableName: "chap_deals",
        timestamps: false
    });

    chapDealsEntity.associate = (models) => {
        chapDealsEntity.belongsTo(models.storesEntity, {
            foreignKey: "store_num",
            targetKey: "store_num"
        });
    };

    return chapDealsEntity;
};
