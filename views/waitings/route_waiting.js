const express = require('express');
const router = express.Router();
const WaitingService=require("../model/service/WaitingService");

const { Waiting, sequelize } = require('../models');
const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).send('500 에러 발생!');
};
// 모든 라우터에서 공통으로 사용되는 에러 핸들링 미들웨어 등록
router.use(errorHandler);

// 1. 입장순서가 제일 가까운 3팀만 표 하나에 보이기
router.get('/', async (req, res) => {
    try {
        const waitings = await Waiting.findAll({
            attributes: ['id', 'wait_num', 'user_people', 'start_time'],
            order: [['wait_num', 'ASC']],
            limit: 3
        });
        res.render('index', { waitings });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 2. 제일 가까운 3팀을 제외한 다른 팀의 대기 현황 보여주기
router.get('/all', async (req, res) => {
    try {
        const waitings = await Waiting.findAll({
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



const express = require('express');
const router = express.Router();

let waitingList = []; // 대기 리스트
let timeSetup = 5; // 기본 대기 시간 설정 (5분)
let closingTime = null; // 웨이팅 마감 시간

// 대기번호 생성 함수
function generateWaitNum() {
    if (waitingList.length === 0) {
        return 1;
    } else {
        return waitingList[waitingList.length - 1].waitNum + 1;
    }
}

// 대기시간 계산 함수
function calculateWaitTime() {
    let waitTime = timeSetup;
    if (waitingList.length > 1) {
        waitTime = timeSetup * (waitingList.length - 1);
    }
    return waitTime;
}

// 1. 입장순서가 제일 가까운 3팀만 표시
router.get('/waitingList', (req, res) => {
    let topThree = waitingList.slice(0, 3);
    res.render('waitingList', { topThree });
});

// 2. 3팀을 제외한 다른 팀의 대기 현황을 보여줌
router.get('/fullWaitingList', (req, res) => {
    let otherTeams = waitingList.slice(3);
    let truncated = false;
    if (otherTeams.length > 7) {
        otherTeams = otherTeams.slice(otherTeams.length - 1);
        truncated = true;
    }
    res.render('fullWaitingList', { otherTeams, truncated });
});

// 3. 3팀을 제외한 대기 인원수와 팀 수 보여줌
router.get('/waitingStats', (req, res) => {
    let numTeams = waitingList.length;
    let numPeople = waitingList.reduce((total, team) => total + team.userPeople, 0);
    let stats = { numTeams, numPeople };
    res.render('waitingStats', { stats });
});

// 4. url 입력, 기본 대기 시간 설정, 웨이팅 마감 시간 설정
router.get('/settings', (req, res) => {
    res.render('settings', { timeSetup, closingTime });
});

// url 입력 처리
router.post('/settings/url', (req, res) => {
    let url = req.body.url;
    // url 저장 처리
    res.redirect('/settings');
});

// 기본 대기 시간 설정 처리
router.post('/settings/time', (req, res) => {
    timeSetup = parseInt(req.body.time);
    // 기본 대기 시간 저장 처리
    res.redirect('/settings');
});

// 웨이팅 마감 시간 설정 처리
router.post('/settings/closing', (req, res) => {
    closingTime = new Date(req.body.closingTime);
    // 웨이팅 마감 시간 저장 처리
    res.redirect('/settings');
});

// 웨이팅 등록 처리
router.post('/register', (req, res) => {
    if (closingTime && Date.now() >= closingTime.getTime()) {
        // 웨이팅 마감 시간이 지났으면 등록 불가능
        res.status(403).send('웨이팅 등록이 마감되었습니다.');
        return;
    }
})


//// route 관련 수정이 필요함
// views/waitings 에 있는 route랑 routes 폴더 내의 있는 내용이 왜 두개냐고 ㅠㅠㅠ