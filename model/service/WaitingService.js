const sequelize = require("../chapchapSequelize");
const UsersWaitingEntity = require("../entity/UsersWaitingEntity")(sequelize);
const StoreWaitingEntity=require("../entity/StoresWaitingEntity")(sequelize);
const UsersEntity = require("../entity/UsersEntity")(sequelize);
const { Op } = require("sequelize");
const {log} = require("debug");
class WaitingService {
    /**
     * 대기중인 모든 유저 정보 가져오기
     *
     */

    async waitingList(storeNum){
        try {
            const waitingList=await UsersWaitingEntity.findAll({
                where:{
                    store_num:storeNum
                },
                order:[["start_time","ASC"]]
            });
            return waitingList;
        }catch (error){
            console.error(error)
        }
    }
    /**
     * 대기중인 유저 중 TOP3 정보 가져오기
     *
     */
    async getTop3WaitingUsers(storeNum) {
        try {
            const getTop3WaitingUsers = await UsersWaitingEntity.findAll({
                attributes: [
                    "waiting_num",
                    "user_id",
                    "user_people",
                    "enter_status",
                    "start_time",
                    "store_num",
                ],
                where:{
                    store_num:storeNum,
                    enter_status : '대기'
                },
                order: [["start_time", "ASC"]],
                limit: 3,
            });
            return getTop3WaitingUsers;
        } catch (error) {
            console.error(error);
        }
    }
    /**
     * 대기중인 TOP3 유저 제외한 나머지 가져오기
     *
     */
    async WaitingListExceptTop3Users(storeNum){
        try {
            const WaitingListExceptTop3Users = await UsersWaitingEntity.findAll({
                attributes: [
                    "waiting_num",
                    "user_id",
                    "user_people",
                    "enter_status",
                    "start_time",
                    "store_num",
                    [sequelize.fn('TIMESTAMPDIFF', sequelize.literal('MINUTE'), sequelize.col('start_time'), sequelize.fn('NOW')), 'minute']
                ],
                where:{
                    store_num:storeNum,
                    enter_status : '대기'
                },
                order: [['start_time', 'ASC']],
                offset: 3
            });
            return WaitingListExceptTop3Users;
        } catch (error) {
            console.error(error);
        }
    }
    /**
     * 대기유저TOP3에게 입장 알림을 보내는 메서드
     // * @returns {Promise<void>}
     */

    async modifyStatus(status,waitingNum) {
        try {
            const result=await UsersWaitingEntity.update({
                enter_status: status
            },{where:{waiting_num : waitingNum}});
            return result;
        }catch (e){
            new Error(e);
        }
    }

    async cancelWaitingUser(waiting_num) {
        const waitingUser = await UsersWaitingEntity.getWaitingUser(waiting_num);
        waitingUser.status = '사장취소';
        await UsersWaitingEntity.updateWaitingUser(waiting_num);
        return waitingUser;
    }
    async getWaitingUser(waiting_num){
        const waitingUser=await UsersWaitingEntity.getWaitingUser(waiting_num);
        waitingUser.status='대기';
        await UsersWaitingEntity.findAll(waiting_num);
        return waitingUser;
    }
    // async updateWaitingUser(waiting_num){
    //     const waitingUser=await UsersWaitingEntity.getWaitingUser(waiting_num);
    //     waitingUser.status=''
    // }


}


module.exports = new WaitingService();