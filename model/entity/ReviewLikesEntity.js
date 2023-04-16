const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const reviewLikesEntity = sequelize.define("reviewLikesEntity", {
        rl_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            comment: "좋아요 아이디",
        },
        rl_status: {
            type: DataTypes.ENUM("LIKE", "BAD"),
            allowNull: false,
            comment: "좋아요 싫어요",
        },
        user_id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: "유저 아이디",
        },
        review_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "리뷰 고유번호",
        },
    }, {
        timestamps: false,
        tableName: "reviewlikes",
    });

    reviewLikesEntity.associate = (models) => {
        reviewLikesEntity.belongsTo(models.reviewsEntity, {
            foreignKey: "review_num",
            targetKey: "review_num",
        });
        reviewLikesEntity.belongsTo(models.usersEntity, {
            foreignKey: "user_id",
            targetKey: "user_id",
        });
    };

    return reviewLikesEntity;
};
