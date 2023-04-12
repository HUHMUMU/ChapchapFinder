const {Sequelize,DataTypes}=require("sequelize");

module.exports=(sequelize)=> {
    const reportsEntity = sequelize.define('reportsEntity', {
        report_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        report_store_id: {
            type: DataTypes.STRING,
            allowNull: true
        },
        report_content: {
            type: DataTypes.STRING,
            allowNull: true
        },
        report_user_id: {
            type: DataTypes.STRING,
            allowNull: true
        },
        review_num: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: true
        },
        chap_num: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        store_num: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    });

    return reportsEntity;
}