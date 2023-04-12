const {Sequelize,DataTypes}=require("sequelize");

module.exports=(sequelize)=> {
    const usersEntity = sequelize.define('usersEntity', {
        user_id: {
            type: DataTypes.STRING(255),
            primaryKey: true,
            allowNull: false
        },
        nickname: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        pw: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        birth: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        gender: {
            type: DataTypes.ENUM('MALE', 'FEMALE'),
            allowNull: false
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        detail_address: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        insta_url: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        face_url: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        youtube_url: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        profile_img: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        introduce: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        u_rstatus: {
            type: DataTypes.ENUM('공개', '심사', '비공개'),
            allowNull: false
        }
    });
    return usersEntity;
}