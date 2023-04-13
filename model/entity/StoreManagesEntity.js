//const sequelize=require("../ChapChapSequelizePool");
const {DataTypes}=require("sequelize")

module.exports=(sequelize)=>{
    const storeManagesEntity=sequelize.define("storeManagesEntity",{
        store_id:{
            type:DataTypes.STRING(255),
            primaryKey:true,
            //allowNull : NOTNULL 표시 -> NULL일꺼냐 물으니깐 false를 준다.
            allowNull:false
        },
        pw:{
            type: DataTypes.STRING(255),
            allowNull:false
        },
        business_num:{
            type: DataTypes.STRING(255),
            allowNull:false
        },
        store_call:{
            type: DataTypes.STRING(255),
            allowNull:false
        },
        phone:{
            type: DataTypes.STRING(255),
            allowNull:false
        },
        email:{
            type: DataTypes.STRING(255),
            allowNull:false
        },
        store_num:{
            type: DataTypes.INTEGER,
            allowNull:false
        }
    },{
        tableName:"store_manages",
        timestamps:false
    });
    return storeManagesEntity;
}
//Object Relationship Mapping (ORM)
//orm 으로 생성한 table을 맵핑하는 객체를 Entity 라 부른다.
//entity 는 dto 와 유사하지만 table 명세가 더 상세하고 ORM 라이브러리가 entity 기반으로 쿼리 생성이 가능