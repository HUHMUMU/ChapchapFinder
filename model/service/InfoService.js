const sequelize=require("../chapchapSequelize");
const storesEntity=require("../entity/StoresEntity")(sequelize);
const HolidaysEntity=require("../entity/HolidaysEntity")(sequelize);
const BreakTimesEntity=require("../entity/BreakTimesEntity")(sequelize);
const {Op}=require("sequelize");
class InfoService{
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

}
module.exports= new InfoService();
