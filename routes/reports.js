const express = require('express');
const router = express.Router();
const reportsService=require("../model/service/ReportsService");

router.get('/insert.do', async function(req, res) {
    res.render("report/insert");
});

router.post('/insert.do', async function(req, res) {
    try{
        await reportsService.reportReview(req.body);
        res.redirect(`/reviews/list.do`);
    }catch(e){
        throw new Error(e)
        res.render("reviews/list");
    }
});

module.exports = router;