const sequelize=require("../chapchapSequelize");
const reportsEntity=require("../entity/reportsEntity")(sequelize);
const storeManagesEntity=require("../entity/StoreManagesEntity")(sequelize);
const usersEntity=require("../entity/UsersEntity")(sequelize);
const storesEntity=require("../entity/StoresEntity")(sequelize);
const chapstorysEntity=require("../entity/ChapStorysEntity")(sequelize);
const reviewsEntity=require("../entity/ReviewsEntity")(sequelize);
const PageVo=require("../vo/PageVo");
const {Op, Sequelize}=require("sequelize");

class ReportsService {
    // report_num으로 모두찾기
    // review_num (신고당한 리뷰 고유번호로) 조회
    // user_id (신고당한 유저 고유번호로) 조회
    // chap_num (신고당한 챱스토리 고유번호로) 조회
    // store_num (신고당한 가게 고유번호로) 조회
    // 심사->비공개 처리하기.

    // 신고당한거 다찾기
    async list(reportNum){
        const report = await reportsEntity.findAll({
            where: {
                report_num: reportNum
            }
        });
        return report;
    }

    // review_num!=null만 찾기
    async findByReviewNum() {
        reportsEntity.belongsTo(reviewsEntity, { foreignKey: 'review_num' });
        const reportAtReview = await reportsEntity.findAll({
            where: {
                review_num: { [Sequelize.Op.ne]: null }, // review_num이 NULL이 아닌 데이터만 찾기
            }
            // ,
            // include: [
            //     {
            //         model: reviewsEntity, // reviews 테이블과 조인
            //         attributes: ['content', 'comment', 'menu_num'], // reviews 테이블에서 필요한 컬럼만 가져오기
            //     },
            // ],
            // attributes: ['report_num', 'report_store_id', 'report_user_id', 'review_num', 'report_content'], // reports 테이블에서 필요한 컬럼만 가져오기
        });
        return reportAtReview;
    }
}
module.exports=new ReportsService();