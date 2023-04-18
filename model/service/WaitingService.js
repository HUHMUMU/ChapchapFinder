const { Op } = require("sequelize");
const sequelize = require("../chapchapSequelize");
const e = require("express");
const UsersWaitingEntity = require("../entity/UsersWaitingEntity")(sequelize);
class WaitingService {
    /**
     * 대기중인 유저 중에서 대기번호가 가장 높은 3팀 정보를 가져오는 메서드
     *
     */
    async waitingList(){
        try {
            const result=await UsersWaitingEntity.findAll({
                attributes:[
                    "users_id",
                    "wait_num",
                    "user_people",
                    "start_time",
                    "store_num",
                ],
                order:[["wait_num","ASC"]]
            });
            return result;
        }catch (error){
            console.error(error)
        }
    }
    async getTop3WaitingUsers() {
        try {
            const result = await waitingList().findAll({
                attributes: [
                    "users_id",
                    "wait_num",
                    "user_people",
                    "start_time",
                    "store_num",
                ],
                order: [["wait_num", "ASC"]],
                limit: 3,
            });
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    /** 여기 수정해야할듯???
     * 대기번호 1순위인 유저에게 입장 알림을 보내는 메서드
     * @returns {Promise<void>}
     */
    async sendEnterNotificationToTopUser() {
        try {
            const getTop3WaitingUsers = await this.getTop3WaitingUsers().findAll({
                attributes: [
                    "users_id",
                    "wait_num",
                    "user_people",
                    "start_time",
                    "store_num",
                ],
                order: [["wait_num", "ASC"]],
                where: {
                    wait_num: {
                        [Op.lte]: 3,
                    },
                },
            });

            // 입장 알림을 보내는 로직 작성
            console.log(`대기번호(${getTop3WaitingUsers.wait_num}번)에게 입장 알림을 보냈습니다.`);

            // 대기번호 1순위인 유저의 입장 알림을 보낸 후, 해당 유저의 데이터를 삭제하는 코드
            await UsersWaitingEntity.destroy({
                where: {
                    wait_num: getTop3WaitingUsers.wait_num,
                },
            });
        } catch (error) {
            console.error(error);
        }
    }

    /** 바로 위에랑 겹침
     * 대기번호 3순위까지의 유저들에게 입장 알림이나 입장 취소 버튼을 보여주는 메서드
     * @returns {Promise<Array>}
     */
    async getWaitingUsersWithEnterButton() {
        try {
            const result = await UsersWaitingEntity.findAll({
                attributes: [
                    "users_id",
                    "wait_num",
                    "user_people",
                    "start_time",
                    "store_num",
                ],
                where: {
                    wait_num: {
                        [Op.lte]: 3,
                    },
                },
            });

            return result;
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * 대기중인 가게 중에서 대기번호가 가장 높은 팀의 정보를 가져오는 메서드
     * @returns {Promise<Object>}
     */
    async getLastWaitingStore() {
        try {
            const result = await UsersWaitingEntity.findOne({
                attributes: [
                    "users_id",
                    "wait_num",
                    "user_people",
                    "start_time",
                    "store_num",
                ],
                order: [["wait_num", "DESC"]],
                limit: 1,
            });

            return result;
        } catch (error) {
            console.error(error);
        }
    }
}

// export async function cancelUser(id) {
//
// }
//
// export async function enterUser(id) {
//
// }
//
// async function getWaitingList(param) {
//
// }


module.exports = new WaitingService();