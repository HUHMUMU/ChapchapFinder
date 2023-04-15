const {Sequelize,DataTypes}=require("sequelize");

module.exports=(sequelize)=> {
    const storeTypesEntity = sequelize.define('storeTypesEntity', {
        type_id: {
            type : DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            comment: '업종id'
        },
        store_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '가게고유번호'
        },
        category_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '업종카테고리'
        }
    }, {
        timestamps: false,
        tableName: 'storetypes'
    });
    return storeTypesEntity;
}