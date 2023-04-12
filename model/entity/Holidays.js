const {Sequelize,DataTypes}=require("sequelize");

module.exports=(sequelize)=> {
    const holidaysEntity = sequelize.define('holidaysEntity', {
        num: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            comment: '휴일번호',
        },
        store_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '가게고유번호',
        },
        week: {
            type: DataTypes.ENUM('0', '1', '2', '3', '4', '5', '6'),
            comment: '요일',
        },
        date: {
            type: DataTypes.DATE,
            comment: '일',
        },
        reqular: {
            type: DataTypes.BOOLEAN,
            comment: '정규/비정규',
        },
    }, {
        timestamps: false,
    });
    return holidaysEntity;
}