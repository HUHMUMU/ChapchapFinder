const sequelize=require("../chapchapSequelize");
const reviewsEntity=require("../entity/ReviewsEntity")(sequelize);
const reviewRepliesEntity=require("../entity/ReviewRepliesEntity")(sequelize);
const storesEntity = require("../entity/StoresEntity")(sequelize);
const {Op, Sequelize}=require("sequelize");
class ReviewsService{
    async list(storeNum,rRstatus) {
        const reviews = await reviewsEntity.findAll({
            where: {
                store_num: storeNum,
                r_rstatus: rRstatus
            }
        });
        return reviews;
    }

    async findByStore(storeNum){
        const store = await storesEntity.findOne({
            where: {
                store_num : storeNum
            }
        });
        return store;
    }

    async findByReview(reviewNum){
        const review = await reviewsEntity.findOne({
            where: {
                review_num : reviewNum
            }
        });
        return review;
    }

    async findByRrNum(){
        const replies = await reviewRepliesEntity.findAll();
            return replies;
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

    async reviewJoinReplies(storeNum){
        reviewsEntity.hasMany(reviewRepliesEntity, { foreignKey: 'review_num' });

        const result = await reviewsEntity.findAll({
            where:{
               store_num : storeNum
            },
            include: {
                model: reviewRepliesEntity
            }
        });
        return result;
    }

    async report(storeNum){

    }
}
module.exports=new ReviewsService();