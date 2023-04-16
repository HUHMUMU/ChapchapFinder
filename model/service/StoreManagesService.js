const sequelize=require("../chapchapSequelize");
const storeManagesEntity=require("../entity/StoreManagesEntity")(sequelize);
const PageVo=require("../vo/PageVo");
const {Op}=require("sequelize");

class StoreManagesService {
    //유저 리스트
    async list(reqParams) {
        const whereObj = {};
        const orderArr=[];
        if (reqParams.field && reqParams.value) {
            whereObj[reqParams.field]={[Op.like]:`%${reqParams.value}%`}
        }
        if (reqParams.orderField && reqParams.orderDirect) {
            orderArr.push(reqParams.orderField);
            orderArr.push(reqParams.orderDirect);
        }
        const totalCnt=await storeManagesEntity.count({
            where:whereObj
        })
        const pageVo=new PageVo(reqParams.page,totalCnt,reqParams);
        try {
            const storeManagesUser=await storeManagesEntity.findAll({
                offset:pageVo.offset,
                limit:pageVo.rowLength,
                where:whereObj,
                order:[orderArr]
            })
            storeManagesUser.pageVo=pageVo;
            return storeManagesUser;
        } catch (e) {
            new Error(e);
        }
    }

    //유저 상세
    async detail(storeId) {
        try {
            return await storeManagesEntity.findByPk(storeId);
        } catch (e) {
            new Error(e);
        }
    }

    //로그인
    async login(storeId, pw) {
        try {
            return await storeManagesEntity.findOne({where:{store_id:storeId, pw:pw}});
        } catch (e) {
            new Error(e);
        }
    }

    //수정
    async modify(storeManagesUser) {
        try {
            const[affectedRows, affectedObjects] = await storeManagesEntity.update (
                storeManagesUser,
                {where:{store_id:storeManagesUser.store_id}});
            return affectedRows;
        } catch (e) {
            new Error(e);
        }
    }

    //회원가입
    async register(storeManagesUser){
        try {
            const createUser=await storeManagesEntity.create(storeManagesUser);
            return createUser;
        } catch (e) {
            new Error(e);
        }
    }

    //삭제
    async remove(storeId) {
        try {
            const affectedRows=await storeManagesEntity.destroy({where:{store_id:storeId}});
            return affectedRows;
        } catch (e) {
            console.error(e);
            new Error(e);
        }
    }

    async findStoreManage(storeId) {
        const storeManage = await storeManagesEntity.findOne({
            where : {
                store_id : storeId
            }
        });
        return storeManage;
    }
}
module.exports=new StoreManagesService();