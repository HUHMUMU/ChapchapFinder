const express = require('express');
const router = express.Router();
const reviewsService=require("../model/service/ReviewRepliesService");
const path=require("path");

router.get('/list.do', async function(req, res) {
    req.query.orderField = req.query.orderField || "post_time";
    req.query.orderDirect = req.query.orderDirect || "DESC";
    let reviews=null;
    try {
        reviews=await reviewsService.list(req.query);
    }catch (e) {
        new Error(e);
        //req.flash("actionMsg","검색 실패:"+e.message);
    }
    if(reviews){
        res.render("admin/list",{reviews:reviews,params:req.query});
    }else {
        res.redirect("/")
    }
});

module.exports = router;