const {Sequelize,DataTypes}=require("sequelize");

module.exports=(sequelize)=> {
    const menuManagesEntity = sequelize.define('menuManagesEntity', {
        menu_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: '메뉴번호',
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: '메뉴이름',
        },
        img: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '메뉴사진',
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '메뉴가격',
        },
        info: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '메뉴설명',
        },
        menu_type: {
            type: DataTypes.ENUM('대표메뉴', '신메뉴', '일반메뉴'),
            allowNull: false,
            comment: '메뉴종류',
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            comment: '메뉴상태',
        },
        store_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '가게고유번호',
        },
    }, {
        timestamps: false,
        tableName: "menu_manages",
        comment: '메뉴관리'
    });

    menuManagesEntity.associate = (models) => {
        menuManagesEntity.belongsTo(models.storesEntity, {
            foreignKey: "store_num",
            targetKey: "store_num",
        });
    };

    return menuManagesEntity;
};