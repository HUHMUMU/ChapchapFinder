const {Sequelize,DataTypes}=require("sequelize");

module.exports=(sequelize)=> {
    const mediasEntity = sequelize.define('mediasEntity', {
        tv_num: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            comment: '방송출연정보고유번호',
        },
        channal: {
            type: DataTypes.STRING(255),
            comment: '채널명',
        },
        episode: {
            type: DataTypes.INTEGER,
            comment: '회차',
        },
        tv_url: {
            type: DataTypes.STRING(255),
            comment: 'tv프로url',
        },
        tv_date: {
            type: DataTypes.DATE,
            comment: '방송날짜',
        },
        store_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '가게고유번호',
        },
    }, {
        timestamps: false,
        tableName: 'medias'
    });
    return mediasEntity;
}