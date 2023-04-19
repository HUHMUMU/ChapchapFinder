const {Sequelize, DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    const storesEntity = sequelize.define('storesEntity', {
        store_num: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            comment: '가게고유번호'
        },
        store_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: '가게이름'
        },
        detail_info: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: '가게디테일설명'
        },
        short_info: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: '가게한줄설명'
        },
        madein: { // 수정된 부분
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: '원산지표시'
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: '가게주소'
        },
        main_img: { // 수정된 부분
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '대표사진'
        },
        opentime: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: '영업시간'
        },
        lastorder: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '라스트오더'
        },
        waiting_closetime: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '웨이팅마감시간'
        },
        blogurl: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '블로그url'
        },
        youtubeurl: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '유튜브url'
        },
        facebookurl: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '페북url'
        },
        instaurl: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '인스타url'
        },
        tvshow: { // 수정된 부분
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '방송출연정보직접입력'
        },
        s_rstatus: {
            type: DataTypes.ENUM('공개', '심사', '비공개'),
            allowNull: true,
            defaultValue: '공개',
            comment: '신고상태'
        },
        parking: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            comment: '주차장'
        },
        wifi: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            comment: '와이파이'
        },
        toilet: { // 수정된 부분
            type: DataTypes.BOOLEAN,
            allowNull: false,
            comment: '화장실구분'
        },
        smokingroom: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            comment: '흡연실'
        },
        babychair: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            comment: '애기의자'
        }
    }, {
        tableName: "stores",
        timestamps: false
    });

    storesEntity.associate = (models) => {
        storesEntity.belongsTo(models.storeManagesEntity, {
            foreignKey: "store_num",
            targetKey: "store_num",
        });
    };

    return storesEntity;
};