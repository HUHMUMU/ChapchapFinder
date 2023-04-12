const sequelize=require("../chapchapSequelize");
const reviewEntity=require("../entity/ReviewsEntity")(sequelize);
const {Op, where}=require("sequelize");
class ReviewsService{
    async list(reqParams){
        const storeNum = reqParams.store_num;
        const rRstatus = reqParams.r_rstatus;
        const reviews = await reviewEntity.findAll({
            where: {
                store_num : storeNum,
                r_rstatus : rRstatus
            }
        })
    }

}