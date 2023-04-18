const sequelize=require("../chapchapSequelize");
const reviewRepliesEntity=require("../entity/ReviewRepliesEntity")(sequelize);
const {Op, where}=require("sequelize");
class ReviewRepliesService {
    async insert(reply){
        try {
            return await reviewRepliesEntity.create(reply);
        }catch (e) {
            new Error(e);
        }
    }

    async modify(reviewNum,content){
        try {
            return await reviewRepliesEntity.modify(reviewNum,content);
        }catch (e) {
            new Error(e);
        }
    }

    async findOne(reviewNum){
        try {
            return await reviewRepliesEntity.findOne({
                where:{
                    review_num : reviewNumt
                }
            });
        }catch (e) {
            new Error(e);
        }
    }
}
module.exports = new ReviewRepliesService();