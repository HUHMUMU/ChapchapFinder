const {Sequelize,DataTypes}=require("sequelize");

module.exports=(sequelize)=> {
    const storesEntity = sequelize.define('storesEntity', {
        store_num: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        store_name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        detail_info: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        short_info: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        origin: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        opentime: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        lastorder: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        waiting_closetime: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        blogurl: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        youtubeurl: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        facebookurl: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        instaurl: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        s_rstatus: {
            type: DataTypes.ENUM('공개', '심사', '비공개'),
            allowNull: false
        },
        parking: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        wifi: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        toilet: {
            type: DataTypes.ENUM('없음', '구분', '공용'),
            allowNull: false
        },
        smokingroom: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        babychair: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });
    return storesEntity;
}