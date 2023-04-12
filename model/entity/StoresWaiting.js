const {Sequelize,DataTypes}=require("sequelize");

module.exports=(sequelize)=> {
    const storesWaitingEntity = sequelize.define('storesWaitingEntity', {
        admin_waiting: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            comment: '웨이팅 테이블'
        },
        closing_time: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: '웨이팅 마감시간'
        },
        max_people: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '웨이팅 최대 인원수'
        },
        waiting_onoff: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            comment: '웨이팅 on/off'
        },
        time_setup: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '웨이팅 시간 설정'
        },
        enter_cancel: {
            type: DataTypes.ENUM('대기', '완료', '유저취소', '사장취소'),
            allowNull: false,
            comment: '웨이팅 입장/강제취소'
        },
        store_ads: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '가게홍보 url'
        },
        store_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '가게 고유번호'
        }
    }, {
        timestamps: false,
        tableName: 'storeswaiting'
    });
    return storesWaitingEntity;
}