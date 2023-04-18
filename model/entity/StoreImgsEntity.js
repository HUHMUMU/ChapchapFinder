const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const storeImgsEntity = sequelize.define("storeImgsEntity", {
        img_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            comment: "이미지 고유번호"
        },
        store_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "가게고유번호"
        },
        store_img: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: "가게사진"
        }
    }, {
        tableName: "store_imgs",
        timestamps: false
    });

    storeImgsEntity.associate = (models) => {
        storeImgsEntity.belongsTo(models.storesEntity, {
            foreignKey: "store_num",
            targetKey: "store_num"
        });
    };

    return storeImgsEntity;
}
