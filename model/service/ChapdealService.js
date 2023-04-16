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

    async findOneDeal(storeNum,event_num) { //특정 이벤트 데이터 조회
        const deal = await chapDealsEntity.findAll({
            where: {
                store_num: storeNum,
                event_num: event_num
            }
        });
        return deal;
    }

    async insertDeal(event_title, event_condition, event_reward, event_img, event_start, event_end, store_num) { //가게별 이벤트 추가
        const insertDeal = await chapDealsEntity.create({
            event_title: event_title,
            event_condition: event_condition,
            event_reward: event_reward,
            event_img: event_img,
            event_start: event_start,
            event_end: event_end,
            store_num: store_num
        });

        return insertDeal;
    };


    async modifyDeal(event_title, event_condition, event_reward, event_img, event_start, event_end, store_num, event_num) { //특정 이벤트 수정
        const modifyDeal = await chapDealsEntity.update({
            event_title: event_title,
            event_condition: event_condition,
            event_reward: event_reward,
            event_img: event_img,
            event_start: event_start,
            event_end: event_end
        },{
            where : {
                store_num: store_num,
                event_num: event_num
            }
        });
        return modifyDeal;
    }

    async dropDeal(storeNum,event_num) { //이벤트 삭제
        const dropDeal = await chapDealsEntity.destroy({
            where: {
                store_num: storeNum,
                event_num: event_num
            }
        });
        return dropDeal;
    }
}
module.exports=new ChapdealService();
