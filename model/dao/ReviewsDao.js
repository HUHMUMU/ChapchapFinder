//const pool=require("../db/ChapChapPool");
class reviewDao{
    #findByStoreNumAndrrStatusSql : "SELECT * FROM reviews WHERE store_num=? AND r_rstatus='공개'";
    #pool;
    constructor(pool) {
        this.#pool=pool;
    }
    async findByStoreNumAndrrStatus(storeNum, rrStatus){
        const [rows,f] = await this.#pool.query(this.#findByStoreNumAndrrStatusSql, [storeNum,rrStatus]);
        return rows;
    }
}
module.exports=reviewDao;