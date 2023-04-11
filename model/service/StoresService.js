const pool = require("../db/ChapChapPool");
const StoresDao = require("../dao/StoresDao");
const storesDao= new StoresDao(pool);

class StoresService{
    async login(storeId,pw){
        return storesDao.findByStoreIdAndPw(storeId,pw);
    }
}

module.exports=new StoresService();