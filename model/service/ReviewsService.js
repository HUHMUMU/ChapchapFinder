const sequelize=require("../chapchapSequelize");
const reviewEntity=require("../entity/ReviewsEntity")(sequelize);
const {Op, where}=require("sequelize");
class ReviewsService{
    async list(req){
        const storeNum = req.session.store_num;
        const rRstatus = req.session.r_rstatus;
        const reviews = await reviewEntity.findAll({
            where: {
                store_num : storeNum,
                r_rstatus : rRstatus
            }
        })
        return reviews;
    }
}
module.exports=ReviewsService;