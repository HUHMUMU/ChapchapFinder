export async function cancelUser(id) {
    
}

export async function enterUser(id) {
    
}

async function getWaitingList(param) {
    
}

const { Op } = require("sequelize");
const sequelize = require("../chapchapSequelize");
const UsersWaitingEntity = require("../entity/usersWaitingEntity")(sequelize);
const StoresWaitingEntity = require("../entity/StoresWaitingEntity")(sequelize);

class WaitingService {
    /**
     * 대기중인 유저 중에서 대기번호가 가장 높은 3팀 정보를 가져오는 메서드
     *
     */
    async getTop3WaitingUsers() {
        try {
            const result = await UsersWaitingEntity.findAll({
                attributes: [
                    "wait_num",
                    "user_people",
                    "start_time",
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
            const topUser = await UsersWaitingEntity.findOne({
                attributes: [
                    "wait_num",
                ],
                order: [["wait_num", "ASC"]],
            });

            // 입장 알림을 보내는 로직 작성
            console.log(`대기번호 1순위인 유저(${topUser.wait_num}번)에게 입장 알림을 보냈습니다.`);

            // 대기번호 1순위인 유저의 입장 알림을 보낸 후, 해당 유저의 데이터를 삭제하는 코드
            await UsersWaitingEntity.destroy({
                where: {
                    wait_num: topUser.wait_num,
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
                    "wait_num",
                    "user_people",
                    "start_time",
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

    /** ??? 이거 뭔지 잘 기억안남
     * 대기중인 가게의 정보를 가져오는 메서드
     * @returns {Promise<Array>}
     */
    async getWaitingStores() {
        try {
            const result = await StoresWaitingEntity.findAll({
                attributes: [
                    "store_name",
                    "user_people",
                    "start_time",
                ],
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
            const result = await StoresWaitingEntity.findOne({
                attributes: [
                    "wait_num",
                    "user_people",
                ],
                order: [["wait_num", "ASC"]],
                limit: 1,
            });

            return result;
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = new WaitingService();