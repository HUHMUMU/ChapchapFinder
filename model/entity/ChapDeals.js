const {Sequelize,DataTypes}=require("sequelize");

module.exports=(sequelize)=> {
    const chapDealsEntity = sequelize.define('chapDealsEntity', {
        event_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        store_num: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        event_title: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        event_condition: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        event_reward: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        event_img: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        event_start: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        event_end: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
    }, {
        timestamps: false,
        comment: '이벤트보드',
    });
    return chapDealsEntity;
}