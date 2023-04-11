class StoresDao{
    findByStoreIdAndPwSql = "SELECT * FROM store_manages WHERE store_id=? AND pw=?";
    pool;
    constructor(pool) {
        this.pool=pool;
    }
    async findByStoreIdAndPw(storeId, pw){
        const [rows,f] = await this.pool.query(this.findByStoreIdAndPwSql, [storeId, pw]);
        return rows[0] || null;
    }
}
module.exports=StoresDao;