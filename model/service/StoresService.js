const sequelize=require("../chapchapSequelize");
const storesEntity=require("../entity/StroesManages")(sequelize);
const {Op}=require("sequelize");
class StoresService {
    async login(uId,pw){
        try {
            return await storesEntity.findOne({where:{store_id:uId,pw:pw}});
        }catch (e) {
            new Error(e);
        }
    }
}
module.exports = new StoresService();