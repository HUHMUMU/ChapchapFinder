const express = require('express');
const router = express.Router();
const WaitingService=require("../model/service/WaitingService");
const path=require("path");
const infoService = require("../model/service/InfoService");
router.get('/waiting.do', async (req, res) => {
    let storeNum = req.session.loginStore.store_num
    let waitingList=null;
    let getTop3WaitingUsers=null;
    let WaitingListExceptTop3Users=null;
    let getLastWaitingUser=null;
    let waitingStats=null;
    try{
        waitingList=await WaitingService.waitingList(storeNum);
        getTop3WaitingUsers=await WaitingService.getTop3WaitingUsers(storeNum);
        WaitingListExceptTop3Users=await WaitingService.WaitingListExceptTop3Users(storeNum);
        getLastWaitingUser=await WaitingService.getLastWaitingUser(storeNum);
        waitingStats=await WaitingService.waitingStats(storeNum);
    }catch (e) {
        console.error(e);
    }
    // HTTP Long-Polling 방식으로 클라이언트의 요청을 대기
    const intervalId = setInterval(async () => {
        try {
            // 변경사항이 발생하면 클라이언트로 응답 보내기
            const newWaitingList=await WaitingService.waitingList(storeNum);
            if (newWaitingList !== waitingList) {
                waitingList = newWaitingList;
                res.send(waitingList);
                clearInterval(intervalId);
            }
        } catch (e) {
            console.error(e);
            clearInterval(intervalId);
        }
    }, 5000); // 1초마다 요청 대기

    res.render("waitings/waiting", {
        waitingList: waitingList,
        getTop3WaitingUsers: getTop3WaitingUsers,
        WaitingListExceptTop3Users: WaitingListExceptTop3Users,
        getLastWaitingUser:getLastWaitingUser,
        waitingStats: waitingStats,
    });

});

// 입장 알림
router.get('/waitings/:waiting_num/notify.do', async (req, res) => {
    const { waiting_num } = req.params;
    try {
        const updatedWaitingUser = await WaitingService.notifyWaitingUser(waiting_num);
        res.status(200).json(updatedWaitingUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// 강제 취소
router.get('/waitings/:waiting_num/cancel.do', async (req, res) => {
    const { waiting_num } = req.params;
    try {
        const updatedWaitingUser = await WaitingService.cancelWaitingUser(waiting_num);
        res.status(200).json(updatedWaitingUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
