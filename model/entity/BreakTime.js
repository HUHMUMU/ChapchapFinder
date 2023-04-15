const {Sequelize,DataTypes}=require("sequelize");

module.exports=(sequelize)=> {
    const breakTimeEntity = sequelize.define('breakTimeEntity', {
        rest_num: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            comment: '휴식시간'
        },
        rest_start_time: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: '휴식시작시간'
        },
        test_end_time: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: '휴식끝시간'
        },
        store_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '가게고유번호'
        }
    }, {
        tableName: 'breaktimes',
        timestamps: false
    });
    return breakTimeEntity;
}