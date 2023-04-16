const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const reportsEntity = sequelize.define("reportsEntity", {
        report_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            comment: "신고번호"
        },
        report_store_id: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: "신고한 사장님 아이디"
        },
        report_user_id: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: "신고한 유저 아이디"
        },
        report_content: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: "신고내용"
        },
        review_num: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "리뷰 고유번호"
        },
        user_id: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: "신고당한 유저 아이디"
        },
        chap_num: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "챱스토리 번호"
        },
        store_num: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "가게 고유번호"
        }
    }, {
        tableName: "reports",
        timestamps: false
    });

    reportsEntity.associate = (models) => {
        reportsEntity.belongsTo(models.reviewsEntity, {
            foreignKey: "review_num",
            targetKey: "review_num"
        });
        reportsEntity.belongsTo(models.usersEntity, {
            foreignKey: "user_id",
            targetKey: "user_id"
        });
        reportsEntity.belongsTo(models.chapStorysEntity, {
            foreignKey: "chap_num",
            targetKey: "chap_num"
        });
        reportsEntity.belongsTo(models.storesEntity, {
            foreignKey: "store_num",
            targetKey: "store_num"
        });
    };

    return reportsEntity;
}
