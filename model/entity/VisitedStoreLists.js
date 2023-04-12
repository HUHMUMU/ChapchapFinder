const {Sequelize,DataTypes}=require("sequelize");

module.exports=(sequelize)=> {
    const visitedStoreListsEntity = sequelize.define('visitedStoreListsEntity', {
        visitedStoreOrder: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        visitedDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        userNickname: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        storeName: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    }, {
        tableName: 'visited_store_lists',
        timestamps: false,
    });
    return visitedStoreListsEntity;
}