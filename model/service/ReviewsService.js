const sequelize=require("../chapchapSequelize");
const reviewsEntity=require("../entity/ReviewsEntity")(sequelize);
const {Op}=require("sequelize");
class ReviewsService{
    async list(storeNum,rRstatus){
        const reviews = await reviewsEntity.findAll({
            where: {
                store_num : storeNum,
                r_rstatus : rRstatus
            }
        });
        return reviews;
    }

    async answeredCount(storeNum,rRstatus){
        const count = await reviewsEntity.count({
            where: {
                store_num : storeNum,
                r_rstatus : rRstatus
            }
        });
        return count;
    }

    async unansweredCount(storeNum,rRstatus){
        const uncount = await reviewsEntity.count({
            where:{
                store_num : storeNum,
                r_rstatus : rRstatus,

            }
        });
        return
    }

}
module.exports=new ReviewsService();