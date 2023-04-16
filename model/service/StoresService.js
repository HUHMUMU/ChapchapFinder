const sequelize=require("../chapchapSequelize");
const storeManagesEntity=require("../entity/StoreManagesEntity")(sequelize);
const {Op}=require("sequelize");
class StoresService {
    async login(storeId,pw){
        try {
            return await storeManagesEntity.findOne({where:{store_id:storeId,pw:pw}});
        }catch (e) {
            new Error(e);
        }
    }
}
module.exports = new StoresService();