const {Sequelize,DataTypes}=require("sequelize");

module.exports=(sequelize)=> {
    const storeManagesEntity = sequelize.define('storeManagesEntity', {
        store_id: {
            type: DataTypes.STRING(255),
            primaryKey: true,
            allowNull: false,
            comment: '사장아이디'
        },
        pw: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: '사장비밀번호'
        },
        business_num: {
            type: DataTypes.STRING(10),
            allowNull: false,
            comment: '사업자번호'
        },
        store_call: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: '가게전화번호'
        },
        phone: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: '사장전화번호'
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: '사장이메일'
        },
        store_num: {
            type: DataTypes.INTEGER,
            unique: true,
            autoIncrement: true,
            comment: '가게고유번호'
        }

    }, {
        tableName:"store_manages",
        timestamps: false
    });
    return storeManagesEntity;
}