const sequelize=require("../chapchapSequelize");
const reportsEntity=require("../entity/reportsEntity")(sequelize);
const usersEntity=require("../entity/UsersEntity")(sequelize);
const storesEntity=require("../entity/StoresEntity")(sequelize);
const chapstorysEntity=require("../entity/ChapStorysEntity")(sequelize);
const reviewsEntity=require("../entity/ReviewsEntity")(sequelize);
const PageVo=require("../vo/PageVo");
const {Op, Sequelize, where}=require("sequelize");

class ReportsService {
    // 심사->비공개 처리하기.

    // review_num!=null만 찾기
    async findByReviewNum() {
        const reports = await reportsEntity.findAll({
            where: {
                review_num: {
                    [Op.ne]: null
                }
            }
        });
        const reviews= await reviewsEntity.findAll();

        const reviewCount = {};
        reports.forEach(report => {
            if (reviewCount[report.review_num]) {
                reviewCount[report.review_num]++;
            } else {
                reviewCount[report.review_num] = 1;
            }
        });

        const reportsWithReview = reports
            .filter(report => reviewCount[report.review_num] >= 3)
            .map(report => {
                const review = reviews.find(r => r.review_num === report.review_num);
                return {
                    ...report.toJSON(),
                    review: review ? review.toJSON() : null
                };
            });

        return reportsWithReview;
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
        const users= await usersEntity.findAll();

        const userCount = {};
        reports.forEach(report => {
            if (userCount[report.user_id]) {
                userCount[report.user_id]++;
            } else {
                userCount[report.user_id] = 1;
            }
        });

        const reportsWithUser = reports
            .filter(report => userCount[report.user_id] >= 3)
            .map(report => {
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
        const stores = await storesEntity.findAll();

        const storeCount = {};
        reports.forEach(report => {
            if (storeCount[report.store_num]) {
                storeCount[report.store_num]++;
            } else {
                storeCount[report.store_num] = 1;
            }
        });

        const reportsWithStore = reports
            .filter(report => storeCount[report.store_num] >= 3)
            .map(report => {
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

        const chapstorys = await chapstorysEntity.findAll();

        const chapstoryCount = {};
        reports.forEach(report => {
            if (chapstoryCount[report.chap_num]) {
                chapstoryCount[report.chap_num]++;
            } else {
                chapstoryCount[report.chap_num] = 1;
            }
        });

        const reportsWithChapstory = reports
            .filter(report => chapstoryCount[report.chap_num] >= 3)
            .map(report => {
                const chapstory = chapstorys.find(c => c.chap_num === report.chap_num);
                return {
                    ...report.toJSON(),
                    chapstory: chapstory ? chapstory.toJSON() : null
                };
            });

        return reportsWithChapstory;
    }
    async updateChsRstatusToPublic(chap_num) {
        return await chapstorysEntity.update(
            { chs_rstatus: '공개' },
            { where: { chap_num } }
        );
    }
    async updateChsRstatusToPrivate(chap_num) {
        return await chapstorysEntity.update(
            { chs_rstatus: '비공개' },
            { where: { chap_num } }
        );
    }
    async updateSRstatusToPublic(store_num) {
        await storesEntity.update(
            { s_rstatus: '공개' },
            { where: { store_num } }
        );
    }
    async updateSRstatusToPrivate(store_num) {
        await storesEntity.update(
            { s_rstatus: '비공개' },
            { where: { store_num } }
        );
    }
    async updateURstatusToPublic(user_id){
        await usersEntity.update(
            { u_rstatus: '공개'},
            { where: { user_id }}
        )
    }
    async updateURstatusToPrivate(user_id){
        await usersEntity.update(
            { u_rstatus: '비공개'},
            { where: { user_id }}
        )
    }
    async updateRRstatusToPublic(review_num){
        await reviewsEntity.update(
            { r_rstatus: '공개'},
            { where: { review_num }}
        )
    }
    async updateRRstatusToPrivate(review_num){
        await reviewsEntity.update(
            { r_rstatus: '비공개'},
            { where: { review_num }}
        )
    }

    async reviewReport(reportObj) {
        const report = await reportsEntity.create(
        {
            report_store_id: reportObj.store_id,
            report_content: reportObj.content,
            review_num: reportObj.review_num
            }
        );
        return report;
    }

    async reportReviewCheck(storeId) {
        const report = await reportsEntity.findAll({
            where: {
                report_store_id: storeId,
            }
        })
            return report;
    }


}
module.exports=new ReportsService();