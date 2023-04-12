const {Sequelize,DataTypes}=require("sequelize");

module.exports=(sequelize)=> {
    const chapStorysEntity = sequelize.define('chapStorysEntity', {
        chap_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        viewcount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        likes: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        profile: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        main_img: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        update_time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        chs_rstatus: {
            type: DataTypes.ENUM('공개', '심사', '비공개'),
            allowNull: false,
        },
    }, {
        timestamps: false,
        comment: '챱스토리',
    });

    return chapStorysEntity;
}