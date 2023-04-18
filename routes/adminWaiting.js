const express = require('express');
const router = express.Router();
const path=require("path");
const WaitingService=require("../model/service/WaitingService");
const sequelize = require("../model/chapchapSequelize");
const UsersWaitingEntity = require("../model/entity/UsersWaitingEntity")(sequelize);




function generateWaitNum() {
    if (waitingList.length === 0) {
        return 1;
    } else {
        return waitingList[waitingList.length - 1].wait_num + 1;
    }
}
// 대기등록 되면 번호 생성
const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).send('500 에러 발생!');
};
// 모든 라우터에서 공통으로 사용되는 에러 핸들링 미들웨어 등록
router.use(errorHandler);


// div 1에 들어갈 내용
// 1. 입장순서가 제일 가까운 3팀만 표 하나에 보이기

router.get('/waiting.do', async (req, res) => {

    let wait_num=req.query.wait_num;
    let user_people=req.query.user_people;
    let waitingList=await WaitingService.getTop3WaitingUsers(wait_num,user_people);

    let waitingInfo =await WaitingService;
    let length = await waitingList;



    res.render("waitings/waiting", {
        waitingList: waitingList,
        waitingInfo: waitingInfo,
        length: length,
        waitingStats: this.waitingStats,
    });

    try {
        const result = await UsersWaitingEntity.findAll({
            attributes: ['id', 'wait_num', 'user_people', 'start_time'],
            order: [['wait_num', 'ASC']],
            limit: 3
        });
        res.render('index', { waitings });
    } catch (error) {
        console.error(error);
    }

});
//div 1 위치에 들어갈 입장알림 버튼
router.post('/enter', async (req, res, next) => {
    try {
        const { id } = req.body;
        const result = await WaitingService.enterUser(id);
        if (result === 0) {
            return res.status(404).send('해당 유저를 찾을 수 없습니다');
        }
        res.send('입장 알람을 보냈습니다?');
    } catch (err) {
        next(err);
    }
});
//div 1 위치에 들어갈 입장취소 버튼
router.post('/cancel', async (req, res, next) => {
    try {
        const { id } = req.body;
        const result = await WaitingService.cancelUser(id);
        if (result === 0) {
            return res.status(404).send('해당 유저를 찾을 수 없습니다');
        }
        res.send('해당 유저의 대기를 강제 취소 했습니다');
    } catch (err) {
        next(err);
    }
});
// div 2. 제일 가까운 3팀을 제외한 다른 팀의 대기 현황 보여주기
router.get('/all', async (req, res) => {
    try {
        const waitings = await UsersWaitingEntity.findAll({
            attributes: [
                'id',
                'wait_num',
                'user_people',
                [sequelize.fn('TIMESTAMPDIFF', sequelize.literal('MINUTE'), sequelize.col('start_time'), sequelize.fn('NOW')), 'minute']
            ],
            order: [['wait_num', 'ASC']],
            offset: 3
        });

        const teamCount = Math.ceil(waitings.length / 4);
        const teams = [];
        for (let i = 0; i < teamCount; i++) {
            teams.push(waitings.slice(i * 4, (i + 1) * 4));
        }

        res.render('all', { teams });
    } catch (error) {
        console.error(error);
        next(error);
    }
});
// 3. 입장순서가 가까운 3팀을 제외한 대기 팀들의 인원수, 팀 수 보여주기
router.get('/status', async (req, res) => {
    try {
        const waitings = await Waiting.findAll({
            attributes: [
                [sequelize.fn('SUM', sequelize.col('user_people')), 'total_people'],
                [sequelize.fn('COUNT', sequelize.col('id')), 'total_teams']
            ],
            where: {
                wait_num: {
                    [sequelize.Op.gt]: 3
                }
            }
        });

        const { total_people, total_teams } = waitings[0].get();

        res.render('status', { total_people, total_teams });
    } catch (error) {
        console.error(error);
        next(error);
    }
});
// 4
router.get('/waiting-settings', async (req, res, next) => {
    try {
        const storeNum = req.session.store_num; // 로그인한 유저의 가게 고유번호
        const store = await WaitingService.getStoreWaitingInfo(storeNum); // 가게 정보 조회

        // 해당 가게의 웨이팅 설정 정보를 렌더링할 때 함께 보내줌
        res.render('waiting-settings', { store: store });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 4-1. 홍보 url 입력 폼 보여주기
router.get('/promo', async (req, res) => {
    try {
        res.render('promo');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 4-2. 대기 시간 설정 폼 보여주기
router.get('/time', async (req, res) => {
    try {
        res.render('time');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 4-3. 웨이팅 ON/OFF 토글 버튼 기능 구현
router.post('/toggle-waiting', async (req, res) => {
    const { toggle } = req.body;

    try {
        const setting = await Setting.findOne({ where: { id: 1 } });
        setting.waiting_toggle = toggle;
        await setting.save();

        res.json({ message: "success" });
    } catch (error) {
        console.log(error);
        res.json({ message: "error" });
    }
});

module.exports = router;


// 예라이 보완 더 해야함