const {Sequelize,DataTypes}=require("sequelize");

module.exports=(sequelize)=> {
    const chapStorysEntity = sequelize.define('chapStorysEntity', {
        chap_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: '챱스토리번호'
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: '제목'
        },
        content: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: '내용'
        },
        viewcount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '조회수'
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            comment: '작성날짜'
        },
        likes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '좋아요'
        },
        profile: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '프로필'
        },
        main_img: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '대표사진'
        },
        update_time: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: '수정날짜'
        },
        user_id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: '유저아이디'
        },
        chs_rstatus: {
            type: DataTypes.ENUM('공개', '심사', '비공개'),
            allowNull: false,
            comment: '신고상태'
        },
    }, {
        tableName: "chapstorys",
        timestamps: false,
        comment: '챱스토리'
    });

    chapStorysEntity.associate = (models) => {
        chapStorysEntity.belongsTo(models.usersEntity, {
            foreignKey: 'user_id',
            targetKey: 'user_id'
        });
    };

    return chapStorysEntity;
};