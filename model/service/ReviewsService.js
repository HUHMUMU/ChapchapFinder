const sequelize=require("../chapchapSequelize");
const reviewsEntity=require("../entity/ReviewsEntity")(sequelize);
const reviewRepliesEntity=require("../entity/ReviewRepliesEntity")(sequelize);
const {Op, Sequelize}=require("sequelize");
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

    async unansweredCount(storeNum) {
        reviewsEntity.hasMany(reviewRepliesEntity, { foreignKey: 'review_num' });
        const count = await reviewsEntity.count({
            where: {
                store_num: storeNum,
                r_rstatus: '공개' // 공개 리뷰만 카운트
            },
            include: [
                {
                    model: reviewRepliesEntity, // 댓글 모델
                    required: false // 조인되는 댓글이 없어도 리뷰는 가져옴
                }
            ],
            // 댓글이 없는 리뷰만 카운트
            group: ['review_num'],
            having: Sequelize.literal('COUNT(rr_num) = 0')
        });
        return count;
    }

}
module.exports=new ReviewsService();