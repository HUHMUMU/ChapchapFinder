const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const typeClassessEntity = sequelize.define("typeClassessEntity", {
        category_num: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: '업종카테고리'
        },
        main_category: {
            type: DataTypes.ENUM("음식점", "카페", "술집"),
            allowNull: false,
            comment: '대분류'
        },
        sub_category: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: '소분류'
        },
    }, {
        tableName: "type_classes",
        timestamps: false,
    });
    return typeClassessEntity;
};
