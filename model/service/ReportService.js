const sequelize=require("../chapchapSequelize");
const reportsEntity=require("../entity/ReportsEntity")(sequelize);
const {Op, Sequelize, where}=require("sequelize");
class ReportsService{
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

    async reportAll()
}
module.exports=new ReportsService();