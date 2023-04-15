const express = require('express');
const router = express.Router();
const chapdealService = require("../model/service/ChapdealService");
router.get('/list.do', async (req, res) => {
    let storeNum = req.session.loginStore.store_num; //로그인한 가게 번호
    const dealList = await chapdealService.findAllDeal(storeNum);
    res.render('chapdeal/list', { dealList });
});

module.exports = router;
