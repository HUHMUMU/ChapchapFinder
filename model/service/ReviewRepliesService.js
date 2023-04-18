const sequelize=require("../chapchapSequelize");
const reviewRepliesEntity=require("../entity/ReviewRepliesEntity")(sequelize);
const {Op}=require("sequelize");
class ReviewRepliesService {
    async insert(reviewNum,postDate,content){
        try {
            return await reviewRepliesEntity.create({where:{store_id:storeId,pw:pw}});
        }catch (e) {
            new Error(e);
        }
    }
}
module.exports = new ReviewRepliesService();