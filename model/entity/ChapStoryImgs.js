const {Sequelize,DataTypes}=require("sequelize");

module.exports=(sequelize)=> {
    const chapStoryImgsEntity = sequelize.define('chapStoryImgsEntity', {
        chs_num: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        chap_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        img: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    }, {
        timestamps: false,
        comment: '챱스토리 이미지',
    });

    return chapStoryImgsEntity;
}