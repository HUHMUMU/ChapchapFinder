const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const storeTypesEntity = sequelize.define("storeTypesEntity", {
        storetype_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            comment: "업종id",
        },
        store_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "가게고유번호",
        },
        category_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "업종카테고리",
        },
    }, {
        timestamps: false,
        tableName: "storetypes",
    });

    storeTypesEntity.associate = (models) => {
        storeTypesEntity.belongsTo(models.storesEntity, {
            foreignKey: "store_num",
            targetKey: "store_num",
        });

        storeTypesEntity.belongsTo(models.typeClassessEntity, {
            foreignKey: "category_num",
            targetKey: "category_num",
        });
    };

    return storeTypesEntity;
};
