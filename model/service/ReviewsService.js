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

    // async rrList(storeNum){
    //     const rr = await reviewRepliesEntity.findAll({
    //         where: {
    //             store_num : storeNum,
    //         }
    //     });
    //     return rr;
    // }

    async findByRrNum(reviewNum,storeNum){
        reviewsEntity.hasMany(reviewRepliesEntity, { foreignKey: 'review_num', as: 'replies' });
        reviewRepliesEntity.belongsTo(reviewsEntity, { foreignKey: 'review_num', as: 'review' });

        const review = await reviewsEntity.findOne({
            where: { review_num: reviewNum, store_num: storeNum },
            include: [{ model: reviewRepliesEntity, as: 'replies', required:false }]
        });
        if (review.replies.length > 0) {
            return review.replies[0];
        } else {
            return null;
        }
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