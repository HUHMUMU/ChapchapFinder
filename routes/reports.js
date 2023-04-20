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
        // review = await reviewsService.findByReview(reportsReview.review_num);
    } catch (e) {
        console.error(e);
        return;
    }
    if (reportsReview) {
        res.render('reports/reportsReview', {reportsReview: reportsReview});
    } else {
        res.redirect('/');
    }
});

router.get('/reportsUser.do', async function(req, res) {
    let reportsUser = null;
    try {
        reportsUser = await reportsService.findByUserId();
    } catch (e) {
        console.error(e);
        return;
    }
    if (reportsUser) {
        res.render('reports/reportsUser', {reportsUser: reportsUser});
    } else {
        res.redirect('/');
    }
});

router.get('/reportsStore.do', async function(req, res) {
    let reportsStore = null;
    try {
        reportsStore = await reportsService.findByStoreNum();
    } catch (e) {
        console.error(e);
        return;
    }
    if (reportsStore) {
        res.render('reports/reportsStore', {reportsStore: reportsStore});
    } else {
        res.redirect('/');
    }
});

router.get('/reportsChapstory.do', async function(req, res) {
    let reportsChapstory = null;
    try {
        reportsChapstory = await reportsService.findByChapNum();
    } catch (e) {
        console.error(e);
        return;
    }
    if (reportsChapstory) {
        res.render('reports/reportsChapstory', {reportsChapstory: reportsChapstory});
    } else {
        res.redirect('/');
    }
});

router.get('/insert.do', async function(req, res) {
    res.render("report/insert");
});

router.post('/insert.do', async function(req, res) {
    let reportCheck
    try{
        await reportsService.reportReview(req.body);
        res.redirect("/reviews/list.do");
    }catch(e){
        throw new Error(e)
        res.redirect(`/reviews/list.do`);
    }
});

module.exports = router;