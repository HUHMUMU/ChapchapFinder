const sequelize=require("../chapchapSequelize");
const reviewRepliesEntity=require("../entity/ReviewRepliesEntity")(sequelize);
const {Op, where}=require("sequelize");
class ReviewRepliesService {
    async insert(reviewNum, content) {
        try {
            if (!content) {
                throw new Error('content is required');
            }
            return await reviewRepliesEntity.create({
                review_num: reviewNum,
                content: content
            });
        } catch (e) {
            throw new Error(e);
        }
    }

    async modify(reply) {
        try {
            let modify=await reviewRepliesEntity.update(reply,{where:{review_num:reply.review_num}})
            return modify;
        }catch (e) {
            new Error(e);
        }
    }

    async findOne(reviewNum){
        try {
            return await reviewRepliesEntity.findOne({
                where:{
                    review_num : reviewNum
                }
            });
        }catch (e) {
            throw new Error(e);
        }
    }

    async deleteOne(reviewNum){
        try {
            return await reviewRepliesEntity.destroy({
                where:{
                    review_num : reviewNum
                }
            });
        }catch (e) {
            throw new Error(e);
        }
    }
}
module.exports = new ReviewRepliesService();