const sequelize=require("../chapchapSequelize");
const storesEntity=require("../entity/StoresEntity")(sequelize);
const HolidaysEntity=require("../entity/HolidaysEntity")(sequelize);
const BreakTimesEntity=require("../entity/BreakTimesEntity")(sequelize);
const TypeClassesEntity = require("../entity/TypeClassesEntity")(sequelize);
const StoreTypesEntity = require("../entity/StoreTypesEntity")(sequelize);
const StoreImgsEntity = require("../entity/StoreImgsEntity")(sequelize);
const {Op}=require("sequelize");
const {add} = require("nodemon/lib/rules");
class InfoService{

    //가게 정보
    async findAllStoreInfo(){ // 가게 모든 데이터 조회
        const infoList = await storesEntity.findAll();
        return infoList;
    }
    async findByStore(storeNum){ // 한 가게 데이터 조회
        const info = await storesEntity.findOne({
            where: {
                store_num : storeNum
            }
        });
        return info;
    }
    async insertStoreInfo(storeObj){ //가게 등록
        if (storeObj.parking==null) {
            storeObj.parking = 0;
        }
        if (storeObj.wifi==null) {
            storeObj.wifi = 0;
        }
        if (storeObj.toilet==null) {
            storeObj.toilet = 0;
        }
        if (storeObj.smokingroom==null) {
            storeObj.smokingroom = 0;
        }
        if (storeObj.babychair==null) {
            storeObj.babychair = 0;
        }
        const insertInfo=await storesEntity.create(storeObj);
        return insertInfo;
    }

    // async insertStoreInfoo(store_num, store_name, detail_info, short_info, madein, address, main_img, opentime, lastorder, waiting_closetime, blogurl, youtubeurl, facebookurl, instaurl, tvshow, s_rstatus, parking, wifi, toilet, smokingroom, babychair){
    //     const insertStore=await storesEntity.create({
    //         store_num:store_num,
    //         store_name:store_name,
    //         detail_info:detail_info,
    //         short_info:short_info,
    //         madein:madein,
    //         address:address,
    //         main_img:main_img,
    //         opentime:opentime,
    //         lastorder:lastorder,
    //         waiting_closetime:waiting_closetime,
    //         blogurl:blogurl,
    //         youtubeurl:youtubeurl,
    //         facebookurl:facebookurl,
    //         instaurl:instaurl,
    //         tvshow:tvshow,
    //         s_rstatus:s_rstatus,
    //         parking:parking,
    //         wifi:wifi,
    //         toilet:toilet,
    //         smokingroom:smokingroom,
    //         babychair:babychair
    //     })
    //     return insertStore;
    // }
    async updateByStoreInfo(storeObj) { //가게 수정
        const updateInfo = await storesEntity.update(storeObj, {
            where: {
                store_num: storeObj.store_num
            }
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


    //휴무일
    async findHolidaysByStore(storeNum){ // 한 가게 휴무일 조회
        const holidays = await HolidaysEntity.findAll({
            where: {
                store_num : storeNum
            }
        });
        return holidays;
    }

    async insertHolidays(holidaysObj){ //가게 휴무일 등록
        const insertHolidays=await HolidaysEntity.create(holidaysObj)
        return insertHolidays;
    }

    async updateHolidays(holidaysObj) { // 가게 휴무일 수정
        const updateHolidays = await HolidaysEntity.update(holidaysObj, {
            where: {
                store_num: holidaysObj.store_num
            },
        });
        return updateHolidays;
    }

    async dropHoliday(holiNum, storeNum){ // 가게 휴무일 삭제
        const dropHoliday = await HolidaysEntity.destroy({
            where : {
                holi_num : holiNum,
                store_num : storeNum
            }
        });
        return dropHoliday;
    }



    //브레이크타임

    async findBreaktimesByStore(storeNum){ // 한 가게 브레이크타임 조회
        const breaktimes = await BreakTimesEntity.findAll({
            where: {
                store_num : storeNum
            }
        });
        return breaktimes;
    }

    async insertBreaktime(breaktimeObj){ //가게 브레이크타임 등록
        const insertBreaktime=await BreakTimesEntity.create(breaktimeObj)
        return insertBreaktime;
    }

    async updateBreaktime(breaktimeObj) { // 가게 브레이크타임 수정
        const updateBreaktime = await BreakTimesEntity.update(breaktimeObj, {
            where: {
                store_num: breaktimeObj.store_num
            },
        });
        return updateBreaktime;
    }

    async dropBreaktime(restNum, storeNum){ // 가게 브레이크타임 삭제
        const dropBreaktime = await BreakTimesEntity.destroy({
            where : {
                rest_num : restNum,
                store_num : storeNum
            }
        });
        return dropBreaktime;
    }


    // 가게 카테고리  // 다시보기

    async findTypeClasses(category){ // 가게 카테고리 찾기
        const typeclasses = await TypeClassesEntity.findOne({
            where:{
                category_num : category
            }
        })
        return typeclasses;
    }
S
    async findStoreTypes(storeNum){ //가게 카테고리 찾기
        const storetypes = await StoreTypesEntity.findAll({
            where:{
                store_num : storeNum
            }
        })
        return storetypes;
    }

    async insertStoreTypes(st, storeNum){ //가게 카테고리 등록
        const cate = await StoreTypesEntity.create({
            storetype_id:st.storetype_id,
            category_num:st.category_num
            },{
            where :{
                store_num:storeNum
            }
        });
        return cate;
    }

    async insertStoreTypes2(st){ //가게 카테고리 등록
        const cate = await StoreTypesEntity.create({
            storetype_id:st.storetype_id,
            category_num:st.category_num,
            store_num:st.store_num
        })
        return cate;
    }


    async updateStoreTypes(StoreNum, storetypeId, category) { // 가게 카테고리 수정
        const updateStoretypes = await StoreTypesEntity.update({
            category_num : category
        }, {
            where: {
                store_num: StoreNum,
                storetype_id: storetypeId
            },
        });
        return updateStoretypes;
    }

    async dropStoreTypes(storetypeId, storeNum){ // 가게 카테고리 삭제
        const dropStoreTypes = await StoreTypesEntity.destroy({
            where : {
                storetype_id : storetypeId,
                store_num : storeNum
            }
        });
        return dropStoreTypes;
    }

    //이미지
    async findImg(storeNum){ //가게 이미지 찾기
        const findImg = await StoreImgsEntity.findAll({
            where:{
                store_num : storeNum
            }
        })
        return findImg;
    }

    async insertImg(img ) { //가게 이미지 등록
        const insertImg = await StoreImgsEntity.create({
            img_num: img.img_num,
            store_img: img.store_img,
            store_num: img.store_num
        });
        return insertImg;
    }


    async updateImg(img) { //가게 이미지 수정
        const update = await StoreImgsEntity.update({
            store_img: img.store_img
        }, {
            where: {
                store_num: img.store_num,
                img_num: img.img_num
            }
        });
        return update;
    }

    async dropImg(imgNum, storeNum){ // 가게 이미지 삭제
        const dropStoreImgs = await StoreImgsEntity.destroy({
            where : {
                img_num : imgNum,
                store_num : storeNum
            }
        });
        return dropStoreImgs;
    }




}
module.exports= new InfoService();
