const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', async (req, res) => {
    try {
        // 3팀 중 대기 순서가 가장 빠른 팀 정보 가져오기
        const nextTeam = await db.Team.findOne({
            where: { status: 'waiting' },
            order: [['createdAt', 'ASC']],
            limit: 1,
        });

        // 3팀 중 대기 순서가 가장 빠른 팀의 정보 표시
        res.render('waiting', { nextTeam });

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});
router.get('/', async (req, res) => {
    try {
        // 대기 중인 팀 정보 가져오기
        const allWaitingTeams = await WaitingTeam.findAll({ raw: true });

        // 대기 순서가 가장 빠른 팀을 제외한 다른 팀의 정보 가져오기
        const nextWaitingTeam = await WaitingTeam.findOne({
            order: [['waiting_number', 'ASC']],
        });
        const nextWaitingNumber = nextWaitingTeam ? nextWaitingTeam.waiting_number : 0;
        const waitingTeams = allWaitingTeams.filter(team => team.waiting_number !== nextWaitingNumber);

        res.render('waiting', { waitingTeams });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;