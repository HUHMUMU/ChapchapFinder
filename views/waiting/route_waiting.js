const express = require('express');
const router = express.Router();
const { UsersWaiting, StoresWaiting } = require('../../model');

router.get('/', async (req, res, next) => {
    try {
        const waitings = await UsersWaiting.findAll({
            where: {
                enterStatus: '대기',
            },
            order: [['waitNum', 'ASC']],
            limit: 3,
        });
        res.render('waiting', { waitings });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/enter', async (req, res, next) => {
    try {
        const { id } = req.body;
        const waiting = await UsersWaiting.findOne({
            where: {
                waitingNum: id,
            },
        });
        if (!waiting) {
            return res.status(404).send('Waiting not found');
        }
        waiting.enterStatus = '완료';
        await waiting.save();
        res.send('Enter success');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/cancel', async (req, res, next) => {
    try {
        const { id } = req.body;
        const waiting = await UsersWaiting.findOne({
            where: {
                waitingNum: id,
            },
        });
        if (!waiting) {
            return res.status(404).send('Waiting not found');
        }
        waiting.enterStatus = '유저취소';
        await waiting.save();
        res.send('Cancel success');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/waiting-settings', async (req, res) => {
    try {
        const storeNum = req.session.user.storeNum; // 로그인한 유저의 가게 고유번호
        const store = await StoresWaiting.findOne({ where: { storeNum: storeNum } }); // 가게 정보 조회

        // 해당 가게의 웨이팅 설정 정보를 렌더링할 때 함께 보내줌
        res.render('waiting-settings', { store: store });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
