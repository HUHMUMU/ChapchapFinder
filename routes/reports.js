const express=require('express');
const router=express.Router();
const storeManagesService=require("../model/service/StoreManagesService");
const reportsService = require('../model/service/ReportsService');
const reviewsService=require('../model/service/ReviewsService');
const path=require("path");

router.get('/reportsIndex.do', async function(req,res){
    res.render("reports/reportsIndex");
});
router.post('/reportsIndex.do', async function(req,res){
    res.redirect("/reports/reportsIndex.do");
});

router.get('/reportsReview.do',async function(req,res){
    let reportsReview = null;
    let review = null;
    try {
        reportsReview = await reportsService.findByReviewNum();
        review = await reviewsService.findByReview(reportsReview.review_num);
    } catch (e) {
        console.error(e);
        return;
    }
    if (reportsReview) {
        res.render('reports/reportsReview', {reportsReview: reportsReview, review: review});
    } else {
        res.redirect('/');
    }
});

module.exports = router;