const {Sequelize,DataTypes}=require("sequelize");

module.exports=(sequelize)=> {
    const typeClassessEntity = sequelize.define('typeClassessEntity', {
        category_num: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        main_category: {
            type: DataTypes.ENUM('음식점', '카페', '술집'),
            allowNull: false
        },
        sub_category: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        type_id: {
        }
    });
    return typeClassessEntity;
}