const sequelize=require("../chapchapSequelize");
const reviewRepliesEntity=require("../entity/ReviewReplies")(sequelize);
const {Op, where}=require("sequelize");
class ReviewRepliesService{
    async register(review_replies){
        try{
            const createRReplies = await reviewRepliesEntity.create(review_replies);
            return createRReplies;
        }catch (e) {
            new Error(e);
        }
    }

    async list(req){
        const rrNum = req.body.rr_num;
        const reviewNum = req.body.review_num;
        try{
            const createRReplies = await reviewRepliesEntity.findAll({
                where: {
                    rr_num : rrNum,
                    review_num : reviewNum
                }
            });
            return createRReplies;
        }catch (e) {
            new Error(e);
        }
    }
}
module.exports = new ReviewRepliesService()