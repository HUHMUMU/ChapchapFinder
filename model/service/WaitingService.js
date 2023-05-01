const sequelize = require("../chapchapSequelize");
const UsersWaitingEntity = require("../entity/UsersWaitingEntity")(sequelize);
const StoreWaitingEntity=require("../entity/StoresWaitingEntity")(sequelize);
const UsersEntity = require("../entity/UsersEntity")(sequelize);
const { Op } = require("sequelize");
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
                    store_num:storeNum
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
                    store_num:storeNum
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
    async EnterNotiToUserBtn(storeNum) {
        try {
            const result = await UsersWaitingEntity.findAll({
                attributes: [
                    "waiting_num",
                    "user_id",
                    "user_people",
                    "enter_status",
                    "start_time",
                    "store_num",
                ],
                order: [["start_time", "ASC"]],
                where: {
                    start_time: {
                        [Op.lte]: 3,
                    },
                    store_num:storeNum
                },
            });


            // 입장 알림을 보내는 로직 작성
            console.log(`대기번호(${UsersWaitingEntity.start_time}번)에게 입장 알림을 보냈습니다.`);

            // 대기번호 1순위인 유저의 입장 알림을 보낸 후, 해당 유저의 데이터를 삭제하는 코드
            await UsersWaitingEntity.destroy({
                where: {
                    start_time: UsersWaitingEntity.start_time,
                },
            });
        } catch (error) {
            console.error(error);
        }
        return UsersWaitingEntity;
    }
    /**
     * 대기유저TOP3에게 강제 취소 보내는 메서드
     // * @returns {Promise<void>}
     */
    async CancelToUserBtn(storeNum){
        try {
            const result = await UsersWaitingEntity.findAll({
                attributes: [
                    "waiting_num",
                    "user_id",
                    "user_people",
                    "enter_status",
                    "start_time",
                    "store_num",
                ],
                order: [["start_time", "ASC"]],
                where: {
                    start_time: {
                        [Op.lte]: 3,
                    },
                    store_num:storeNum
                },
            });

            // 강제 취소 알림을 보내는 로직 작성
            console.log(`대기번호(${UsersWaitingEntity.start_time}번)을 강제 취소했습니다.`);

            // 대기번호 1순위인 유저의 입장 알림을 보낸 후, 해당 유저의 데이터를 삭제하는 코드
            await UsersWaitingEntity.destroy({
                where: {
                    start_time: UsersWaitingEntity.start_time,
                },
            });
        } catch (error) {
            console.error(error);
        }
        return UsersWaitingEntity;
    }
    /**
     * 3팀을 제외한 대기 팀들의 인원수, 팀 수 보여주기
     *
     */
    // 3팀을 제외한 대기 팀들의 인원수, 팀 수 보여주기
    async waitingStats(storeNum){
        try {
            const waitingStats = await UsersWaitingEntity.findAll({
                attributes: [
                    "waiting_num",
                    "start_time",
                    "user_people",
                    "store_num"],
                where:{
                    store_num:storeNum
                },
                order: [["start_time", "ASC"]],
                offset:3
            });
            return waitingStats;
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * 대기중인 가게 중에서 대기번호가 가장 낮은 팀의 정보를 가져오는 메서드
     // * @returns {Promise<Object>}
     */
    async getLastWaitingUser(storeNum) {
        try {
            const getLastWaitingUser = await UsersWaitingEntity.findOne({
                attributes: [
                    "waiting_num",
                    "user_id",
                    "user_people",
                    "start_time",
                    "store_num",
                ],
                where:{
                    store_num:storeNum
                },
                order: [["start_time", "DESC"]],
                limit: 1,
            });

            return getLastWaitingUser;
        } catch (error) {
            console.error(error);
        }
    }

}


module.exports = new WaitingService();