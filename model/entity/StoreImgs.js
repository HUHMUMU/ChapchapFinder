const {Sequelize,DataTypes}=require("sequelize");

module.exports=(sequelize)=> {
    const storeImgsEntity = sequelize.define('storeImgsEntity', {
        store_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Stores',
                key: 'store_num'
            }
        },
        store_img: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    return storeImgsEntity;
}