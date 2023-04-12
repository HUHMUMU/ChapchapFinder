const {Sequelize,DataTypes}=require("sequelize");

module.exports=(sequelize)=> {
    const reviewRepliesEntity = sequelize.define('reviewRepliesEntity', {
        rr_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        review_num: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        post_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        tableName:"review_replies",
        timestamps:false //creat_at,update_at 두개의 필드가 있다는 전제로 맵핑
    });
    return reviewRepliesEntity;
}