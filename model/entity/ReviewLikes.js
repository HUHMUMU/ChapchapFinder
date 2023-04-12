const {Sequelize,DataTypes}=require("sequelize");

module.exports=(sequelize)=> {

    const reviewLikesEntity = sequelize.define('reviewLikesEntity', {
        rl_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        rl_status: {
            type: DataTypes.ENUM('LIKE', 'BAD'),
            allowNull: false
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        review_num: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return reviewLikesEntity;
}