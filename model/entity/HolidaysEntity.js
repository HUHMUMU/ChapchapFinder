const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const holidaysEntity = sequelize.define("holidaysEntity", {
        holi_num: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            comment: "휴일번호",
        },
        store_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "가게고유번호",
        },
        week: {
            type: DataTypes.ENUM("월", "화", "수", "목", "금", "토", "일"),
            allowNull: true,
            comment: "요일",
        },
        date: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: "일",
        },
        regular: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            comment: "정규/비정규",
        },
    }, {
        tableName: "holidays",
        timestamps: false,
    });

    holidaysEntity.associate = (models) => {
        holidaysEntity.belongsTo(models.storesEntity, {
            foreignKey: "store_num",
            targetKey: "store_num",
        });
    };

    return holidaysEntity;
};
