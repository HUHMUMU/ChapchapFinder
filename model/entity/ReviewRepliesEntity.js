const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const reviewRepliesEntity = sequelize.define("reviewRepliesEntity", {
        rr_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            comment: "리뷰에 사장님의 대댓글"
        },
        review_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "리뷰 고유번호"
        },
        post_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW, // 현재 날짜로 설정
            comment: "작성 날짜"
        },
        content: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: "작성 내용"
        }
    },{
        tableName: "review_replies",
        timestamps: false
    });

    reviewRepliesEntity.associate = (models) => {
        reviewRepliesEntity.belongsTo(models.reviewsEntity, {
            foreignKey: "review_num",
            targetKey: "review_num"
        });
    };

    return reviewRepliesEntity;
}
