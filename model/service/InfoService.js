
const sequelize=require("../chapchapSequelize");
const storesEntity=require("../entity/Stores")(sequelize);
const mediasEntity=require("../entity/Medias")(sequelize);
const TypeClassessEntity=require("../entity/TypeClasses")(sequelize);
const storeTypesEntity=require("../entity/StoreTypes")(sequelize);
const storeImgsEntity=require("../entity/StoreImgs")(sequelize);
const BreakTimeEntity=require("../entity/BreakTime")(sequelize);
const {Op}=require("sequelize");
class InfoService{
    async findAllStoreInfo(){ // 가게 모든 데이터 조회
        const infoList = await storesEntity.findAll();
        return infoList;
    }
    async findByStore(storeNum){ // 한 가게 데이터 조회
        const info = await storesEntity.findAll({
            where: {
                store_num : storeNum
            }
        });
        return info;
    }
    async insertStoreInfo(storeObj){ //가게 등록
        const insertInfo=await storesEntity.create(storeObj);
        return insertInfo;
    }
    async updateByStoreInfo(storeObj) { //가게 수정
        const updateInfo = await storesEntity.update(storeObj, {
            where: {
                store_num: storeObj.store_num
            },
        });
        return updateInfo;
    }

    async dropStoreInfo(storeNum){ // 가게 삭제
        const dropStores = await storesEntity.destroy({
            where : {
                store_num : storeNum
            }
        });
        return dropStores;
    }


    // 가게 방송출연
    async findMedias(storeNum){ // 가게 방송출연 정보 조회
        const mediaList = await mediasEntity.findAll({
            where : {
                store_num : storeNum
            }
        });
        return mediaList;
    }

    async insertMedias(storeObj){ //가게 방송출연 정보 입력
        const insertMedias = await mediasEntity.create(storeObj);
        return insertMedias;
    }

    async updateMedias(tvNum, channal, episode, tvUrl, tvDate, storeNum){ //가게 방송출연 정보 수정
        const updateMedias = await mediasEntity.update({
            tv_num : tvNum,
            channal : channal,
            episode : episode,
            tvUrl : tvUrl,
            tv_date : tvDate,
            store_num : storeNum,
        },{
            where : {
                store_num : storeNum,
                tv_num : tvNum
            }
        });
        return updateMedias;
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

    // async dropMedias(categoryNum){ // 가게 업종 삭제 몰라 ㅅㅂ 내일해야지
    //     const dropMedias = await mediasEntity.destroy({
    //         where : {
    //             store_num : storeNum,
    //             tv_num : tvNum
    //         }
    //     });
    //     return dropMedias;
    // }

}
module.exports=InfoService;
