const {Sequelize,DataTypes}=require("sequelize");

module.exports=(sequelize)=> {
    const gradesEntity = sequelize.define('gradesEntity', {
        user_grade: {
            type: DataTypes.STRING(255),
            allowNull: false,
            primaryKey: true,
            comment: '유저등급'
        },
        grade_low: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: 'low범위'
        },
        grade_high: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: 'high범위'
        },
    }, {
        tableName: "grades",
        timestamps: false,
        comment: '유저등급',
    });
    return gradesEntity;
}