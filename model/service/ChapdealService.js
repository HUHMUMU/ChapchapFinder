const sequelize=require("../chapchapSequelize");
const chapDealsEntity=require("../entity/ChapDealsEntity")(sequelize);
const {Op, where}=require("sequelize");

class ChapdealService{
    async findAllDeal(storeNum) {//가게별 모든 이벤트 조회
        const dealList = await chapDealsEntity.findAll({
            where: {
                store_num: storeNum
            }
        });
        return dealList;
    }

    async findOneDeal(event_num) { //특정 이벤트 데이터 조회
        const deal = await chapDealsEntity.findAll({
            where: {
                event_num: event_num
            }
        });
        return deal;
    }

    async insertDeal(eventObj) { //가게별 이벤트 추가
        const insertDeal = await chapDealsEntity.create(eventObj);

        return insertDeal;
    };


    async modifyDeal(eventObj) { //특정 이벤트 수정
        const modifyDeal = await chapDealsEntity.update(eventObj,{
            where : {
                event_num: eventObj.event_num
            }
        });
        return modifyDeal;
    }

    async dropDeal(event_num) { //이벤트 삭제
        const dropDeal = await chapDealsEntity.destroy({
            where: {
                event_num: event_num
            }
        });
        return dropDeal;
    }

    async dropDealByStoreNum(storeNum){
        const dropDeal = await chapDealsEntity.dest({
            where : {
                store_num : storeNum
            }
        });
        return dropDeal;
    }
}
module.exports=new ChapdealService();
