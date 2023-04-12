const {Sequelize,DataTypes}=require("sequelize");

module.exports=(sequelize)=> {
    const recommendStoresEntity = sequelize.define('recommendStoresEntity', {
        recommend_store_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: '추천가게고유번호',
        },
        comment: {
            type: DataTypes.STRING(255),
            comment: '한줄평',
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
    });
    return recommendStoresEntity;
}