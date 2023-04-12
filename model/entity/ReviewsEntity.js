const {Sequelize,DataTypes}=require("sequelize");

module.exports=(sequelize)=> {
    const reviewsEntity = sequelize.define('reviewsEntity', {
        review_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        coment: {
            type: DataTypes.STRING,
            allowNull: true
        },
        img: {
            type: DataTypes.STRING,
            allowNull: true
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        star: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        r_rstatus: {
            type: DataTypes.ENUM('공개', '심사', '비공개'),
            allowNull: false
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        store_num: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return reviewsEntity;
}