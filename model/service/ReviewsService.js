const pool=require("../db/ChapChapPool");
const ReviewsDao = require("../dao/ReviewsDao");
const reviewsDao = new ReviewsDao(pool);

class ReviewsService{
    async list(){
        return reviewsDao.findAll();
    }
}

module.exports=new ReviewsService();