const {Sequelize,DataTypes}=require("sequelize");

module.exports=(sequelize)=> {
    const gradesEntity = sequelize.define('gradesEntity', {
        user_grade: {
            type: DataTypes.STRING(255),
            allowNull: false,
            primaryKey: true,
        },
        grade_low: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        grade_high: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        timestamps: false,
        comment: '유저등급',
    });
    return gradesEntity;
}