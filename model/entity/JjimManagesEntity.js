const {Sequelize, DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    const jjimManagesEntity = sequelize.define('jjimManagesEntity', {
        jjim_num: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            comment: '즐겨찾기 번호',
        },
        jj_status: {
            type: DataTypes.ENUM('공개', '비공개'),
            allowNull: false,
            comment: '공개여부',
        },
        user_id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: '유저아이디',
        },
        store_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '가게고유번호',
        },
    }, {
        timestamps: false,
        tableName: "jjim_manages",
    });

    jjimManagesEntity.associate = (models) => {
        jjimManagesEntity.belongsTo(models.storesEntity, {
            foreignKey: "store_num",
            targetKey: "store_num",
        });
        jjimManagesEntity.belongsTo(models.usersEntity, {
            foreignKey: "user_id",
            targetKey: "user_id",
        });
    };

    jjimManagesEntity.addConstraint("unique_user_store_jjim", {
        type: "unique",
        fields: ["user_id", "store_num"],
        name: "unique_user_store_jjim",
    });

    return jjimManagesEntity;
};