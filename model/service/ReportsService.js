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
    // 심사->비공개 처리하기.

    // review_num!=null만 찾기
    async findByReviewNum() {
        const reportAtReview = await reportsEntity.findAll({
            where: {
                review_num: {
                    [Op.ne]: null
                }
            },
        });
        const reviewNums = reportAtReview.map(report => report.review_num);
        const reviews = await reviewsEntity.findAll({
            where: {
                review_num: {
                    [Op.in]: reviewNums
                }
            }
        });
        return reportAtReview.map(report => {
            const review = reviews.find(r => r.review_num === report.review_num);
            return {
                ...report.toJSON(),
                review: review ? review.toJSON() : null
            };
        });
    }

    // user_id (신고당한 유저 고유번호로)가 null이 아닌 것 조회
    async findByUserId() {
        const reports = await reportsEntity.findAll({
            where: {
                user_id: {
                    [Op.ne]: null
                }
            }
        });
        const userId = reports.map(report => report.user_id);
        const users = await usersEntity.findAll({
            where: {
                user_id: userId
            }
        });
        const reportsWithUser = reports.map(report => {
            const user = users.find(u => u.user_id === report.user_id);
            return {
                ...report.toJSON(),
                user: user ? user.toJSON() : null
            };
        });
        return reportsWithUser;
    }

    // store_num (신고당한 가게 고유번호로)가 null이 아닌것 조회
    async findByStoreNum() {
        const reports = await reportsEntity.findAll({
            where: {
                store_num: {
                    [Op.ne]: null
                }
            }
        });
        const storeNum = reports.map(report => report.store_num);
        const stores = await storesEntity.findAll({
            where: {
                store_num: storeNum
            }
        });
        const reportsWithStore = reports.map(report => {
            const store = stores.find(s => s.store_num === report.store_num);
            return {
                ...report.toJSON(),
                store: store ? store.toJSON() : null
            };
        });
        return reportsWithStore;
    }

    // chap_num (신고당한 챱스토리 고유번호로) 조회
    async findByChapNum() {
        const reports = await reportsEntity.findAll({
            where: {
                chap_num: {
                    [Op.ne]: null
                }
            }
        });
        const chapNums = reports.map(report => report.chap_num);
        const chapstorys = await chapstorysEntity.findAll({
            where: {
                chap_num: chapNums
            }
        });
        const reportsWithChapstory = reports.map(report => {
            const chapstory = chapstorys.find(c => c.chap_num === report.chap_num);
            return {
                ...report.toJSON(),
                chapstory: chapstory ? chapstory.toJSON() : null
            };
        });
        return reportsWithChapstory;
    }

    async reportReview(reportObj) {
        const report = await reportsEntity.create(
        {
            report_store_id: reportObj.store_id,
            report_content: reportObj.content,
            review_num: reportObj.review_num
            }
        );
        return report;
    }

}
module.exports=new ReportsService();