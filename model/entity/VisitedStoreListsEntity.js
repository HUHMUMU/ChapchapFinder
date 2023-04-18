const {Sequelize,DataTypes}=require("sequelize");

module.exports=(sequelize)=> {
    const visitedStoreListsEntity = sequelize.define('visitedStoreListsEntity', {
        visited_store_order: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '다녀온 가게 번호'
        },
        visited_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            comment: '다녀온 날짜(웨이팅한 날짜)'
        },
        user_id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: '유저아이디'
        },
        storeName: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: '가게 이름'
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: '가게 주소'
        },
    }, {
        tableName: 'visited_store_lists',
        timestamps: false,
    });
    return visitedStoreListsEntity;
}