class reviewsDao{
    findByStoreNumAndrrStatusSql = "SELECT * FROM reviews WHERE store_num=? AND r_rstatus='공개'";
    findAllSql = "SELECT * FROM reviews";
    pool;
    constructor(pool) {
        this.pool=pool;
    }
    async findByStoreNumAndrrStatus(storeNum, rrStatus){
        const [rows,f] = await this.pool.query(this.findByStoreNumAndrrStatusSql, [storeNum,rrStatus]);
        return rows;
    }

    async findAll(){
        const [rows,f]=await this.pool.query(this.findAllSql);
        return rows;
    }
}
module.exports=reviewsDao;