const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const chapStoryImgsEntity = sequelize.define("chapStoryImgsEntity", {
        chs_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: "챱사진 고유번호"
        },
        chap_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "챱스토리 번호"
        },
        img: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: "이미지 경로(path)"
        },
    }, {
        tableName: "chapstoryimgs",
        timestamps: false
    });

    chapStoryImgsEntity.associate = (models) => {
        chapStoryImgsEntity.belongsTo(models.chapStorysEntity, {
            foreignKey: "chap_num",
            targetKey: "chap_num"
        });
    };

    return chapStoryImgsEntity;
};
