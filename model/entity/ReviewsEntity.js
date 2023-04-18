const {Sequelize,DataTypes}=require("sequelize");

module.exports=(sequelize)=> {
    const reviewsEntity = sequelize.define('reviewsEntity', {
        review_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            comment: '리뷰 고유번호'
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: '리뷰 작성내용'
        },
        comment: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '한줄평'
        },
        img: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '가게 메뉴사진'
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: '날짜'
        },
        star: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '별점1~5'
        },
        r_rstatus: {
            type: DataTypes.ENUM('공개', '심사', '비공개'),
            allowNull: false,
            comment: '신고상태'
        },
        user_id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: '유저아이디'
        },
        store_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '가게 고유번호'
        }
    }, {
        tableName: 'reviews',
        timestamps: false,
        comment: '리뷰'
    });

    reviewsEntity.associate = (models) => {
        reviewsEntity.belongsTo(models.storesEntity, {
            foreignKey: 'store_num',
            targetKey: 'store_num'
        });
        reviewsEntity.belongsTo(models.usersEntity, {
            foreignKey: 'user_id',
            targetKey: 'user_id'
        });
    };

    return reviewsEntity;
};