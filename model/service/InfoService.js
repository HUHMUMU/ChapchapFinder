const sequelize=require("../chapchapSequelize");
const storesEntity=require("../entity/StoresEntity")(sequelize);
const TypeClassessEntity=require("../entity/TypeClassesEntity")(sequelize);
const storeTypesEntity=require("../entity/StoreTypesEntity")(sequelize);
const storeImgsEntity=require("../entity/StoreImgsEntity")(sequelize);
const BreakTimeEntity=require("../entity/BreakTimesEntity")(sequelize);
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
        return mediaList;
    }

    async insertMedias(tvNum, channal, episode, tvUrl, tvDate, storeNum){ //가게 방송출연 정보 입력
        const insertMedias = await mediasEntity.create({
            tv_num : tvNum,
            channal : channal,
            episode : episode,
            tvUrl : tvUrl,
            tvDate : tvDate,
            store_num : storeNum,
        });
        return insertMedias;
    }

    async modifyMedias(tvNum, channal, episode, tvUrl, tvDate, storeNum){ //가게 방송출연 정보 수정
        const modifyMedias = await mediasEntity.update({
            tv_num : tvNum,
            channal : channal,
            episode : episode,
            tvUrl : tvUrl,
            tvDate : tvDate,
            store_num : storeNum,
        },{
            where : {
                store_num : store_num,
                tv_num : tv_num
            }
        });
        return modifyMedias;
    }

    async dropMedias(storeNum, tvNum){ // 가게 방송출연 정보 삭제
        const dropMedias = await mediasEntity.destroy({
            where : {
                store_num : storeNum,
                tv_num : tvNum
            }
        });
        return dropMedias;
    }


    // 가게 업종
    async findByTypes(storeNum){ // 가게 업종 조회
        const typeList = await TypeClassessEntity.findAll({
            where : {
                store_num : storeNum
            }
        });
        return typeList;
    }

    async insertByTypes(mainCategory, subCategory){ //가게 업종 입력
        const insertStoreTypes = await storeTypesEntity.create({
            main_category : mainCategory,
            sub_category : subCategory
        });
        return insertStoreTypes;
    }

    async modifyByTypes(mainCategory, subCategory, categoryNum){ //가게 업종 수정 다시 생각해보기
        const modifyTypes = await storeTypesEntity.update({
            main_category : mainCategory,
            sub_category : subCategory,
            category_num : categoryNum
        },{
            where : {
                category_num : categoryNum
            }
        });
        return modifyTypes;
    }

    async dropMedias(categoryNum){ // 가게 업종 삭제 몰라 ㅅㅂ 내일해야지
        const dropMedias = await mediasEntity.destroy({
            where : {
                store_num : storeNum,
                tv_num : tvNum
            }
        });
        return dropMedias;
    }













}
