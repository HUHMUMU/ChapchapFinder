const {Sequelize,DataTypes}=require("sequelize");

module.exports=(sequelize)=> {
    const usersEntity = sequelize.define('usersEntity', {
        user_id: {
            type: DataTypes.STRING(255),
            primaryKey: true,
            allowNull: false,
            unique: true,
            comment: '유저아이디'
        },
        nickname: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            comment: '유저닉네임'
        },
        pw: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: '비밀번호'
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: '이름'
        },
        birth: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            comment: '생년월일'
        },
        gender: {
            type: DataTypes.ENUM('MALE', 'FEMALE'),
            allowNull: false,
            comment: '성별'
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: '주소'
        },
        detail_address: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: '상세주소'
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            comment: '이메일'
        },
        insta_url: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '인스타url'
        },
        face_url: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '페이스북url'
        },
        youtube_url: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '유튜브url'
        },
        profile_img: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '프로필사진'
        },
        introduce: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '자기소개'
        },
        u_rstatus: {
            type: DataTypes.ENUM('공개', '심사', '비공개'),
            allowNull: false,
            comment: '신고상태'
        }
    }, {
        tableName: "users",
        timestamps: false
    });
    return usersEntity;
}