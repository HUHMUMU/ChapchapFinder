const sequelize=require("../chapchapSequelize");
const reviewsEntity=require("../entity/ReviewsEntity")(sequelize);
const reviewRepliesEntity=require("../entity/ReviewReplies")(sequelize);
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

    // async findByRrNum(storeNum,rRstatus){
    //     reviewsEntity.belongsTo(reviewRepliesEntity,{
    //         foreignKey : "review_num",
    //         as: "review_replies"
    //     })
    //
    //     const rreview = await reviewRepliesEntity.findOne({
    //         where: {
    //             store_num : storeNum,
    //             r_rstatus : rRstatus,
    //         },
    //         include:[
    //             {
    //                 foreignKey : "review_num",
    //                 model:reviewRepliesEntity,
    //                 as : "review_replies",
    //                 required: false,
    //                 where : { rr_num:null }
    //             }
    //         ]
    //     });
    //     return rreview;
    // }


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