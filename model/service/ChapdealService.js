const sequelize=require("../chapchapSequelize");
const chapDealsEntity=require("../entity/ChapDealsEntity")(sequelize);
const {Op, where}=require("sequelize");

class ChapdealService{
    async findAllDeal(storeNum) {// 이벤트로 설정한 메뉴 조회
        const deal = await chapDealsEntity.findAll({
            where: {
                store_num: storeNum
            }
        });
        return deal;
    }
}
module.exports=new ChapdealService();
