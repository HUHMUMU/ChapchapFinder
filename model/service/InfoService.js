const sequelize=require("../chapchapSequelize");
const storesEntity=require("../entity/Stores")(sequelize);
const mediasEntity=require("../entity/Medias")(sequelize);
const TypeClassessEntity=require("../entity/TypeClassess")(sequelize);
const storeTypesEntity=require("../entity/StoreTypes")(sequelize);
const storeImgsEntity=require("../entity/StoreImgs")(sequelize);
const BreakTimeEntity=require("../entity/BreakTime")(sequelize);
const {Op}=require("sequelize");
class InfoService{
    async findAllStoreInfo(){
        const info = await storesEntity.findAll();
        return info;
    }


    // 가게 방송출연
    async findByMedias(storeNum){ // 가게 방송출연 정보 조회
        const mediaList = await mediasEntity.findAll({
            where : {
                store_num : storeNum
            }
        });
        return storeNum;
    }

    async insertMedias(channal, episode, tvUrl, tvDate, storeNum, tvNum){ //가게 방송출연 정보 입력
        const insertMedias = await mediasEntity.create({
            channal : channal,
            episode : episode,
            tvUrl : tvUrl,
            tvDate : tvDate,
            store_num : storeNum,
            tv_num : tvNum
        });
        return insertMedias;
    }

    async modifyMedias(channal, episode, tvUrl, tvDate, storeNum, tvNum){ //가게 방송출연 정보 수정
        const modifyMedias = await mediasEntity.create({
            channal : channal,
            episode : episode,
            tvUrl : tvUrl,
            tvDate : tvDate,
            store_num : storeNum,
            tv_num : tvNum
        },{
            where : {
                store_num : storeNum,
                tv_num : tvNum
            }
        });
        return modifyMedias;
    }

    async dropMedias(storeNum, tvNum){ // 가게 방송출연 정보 삭제
        const dropMedias = await dropMedias.destroy({
            where : {
                store_num : storeNum,
                tv_num : tvNum
            }
        });
        return dropMedias;
    }


    // 가게 업종 대분류
    async findByType(storeNum){ // 가게 업종 대분류 조회
        const TypeList = await storeTypesEntity.findAll({
            where : {
                store_num : storeNum
            }
        });
        return TypeList;
    }


    // 가게 업종 소분류
    async findByTypeClassess(storeNum){ // 가게 업종 소분류 조회 fk없는데  어떻게 하지 ??
        const TypeClassessList = await TypeClassessEntity.findAll({
            where : {

            }
        })
        return storeNum;
    }








}
