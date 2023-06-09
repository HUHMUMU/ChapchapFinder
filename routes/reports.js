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

router.post('/chapPublic/:chap_num', async (req, res) => {
    const { chap_num } = req.params;
    await reportsService.updateChsRstatusToPublic(chap_num);
    req.flash("actionMsg", "공개처리 완료");
    res.redirect('back');
});
router.post('/chapPrivate/:chap_num', async (req, res) => {
    const { chap_num } = req.params;
    await reportsService.updateChsRstatusToPrivate(chap_num);
    req.flash("actionMsg", "비공개처리 완료");
    res.redirect('back');
});
router.post('/storePublic/:store_num', async (req, res) => {
    const { store_num } = req.params;
    await reportsService.updateSRstatusToPublic(store_num);
    req.flash("actionMsg", "공개처리 완료");
    res.redirect('back');
});
router.post('/storePrivate/:store_num', async (req, res) => {
    const { store_num } = req.params;
    await reportsService.updateSRstatusToPrivate(store_num);
    req.flash("actionMsg", "비공개처리 완료");
    res.redirect('back');
});
router.post('/userPublic/:user_id', async (req, res) => {
    const { user_id } = req.params;
    await reportsService.updateURstatusToPublic(user_id);
    req.flash("actionMsg", "공개처리 완료");
    res.redirect('back');
});
router.post('/userPrivate/:user_id', async (req, res) => {
    const { user_id } = req.params;
    await reportsService.updateURstatusToPrivate(user_id);
    req.flash("actionMsg", "비공개처리 완료");
    res.redirect('back');
});
router.post('/reviewPublic/:review_num', async (req, res) => {
    const { review_num } = req.params;
    await reportsService.updateRRstatusToPublic(review_num);
    req.flash("actionMsg", "공개처리 완료");
    res.redirect('back');
});
router.post('/reviewPrivate/:review_num', async (req, res) => {
    const { review_num } = req.params;
    await reportsService.updateRRstatusToPrivate(review_num);
    req.flash("actionMsg", "비공개처리 완료");
    res.redirect('back');
});



router.get('/insert.do', async function(req, res) {
    res.redirect(`/reviews/list.do`);
});

router.post('/insert.do', async function(req, res) {
    let reportCheck=0;
    try{
        reportCheck = await reportsService.reportReview(req.body,reportCheck);
        res.redirect(`/reviews/list.do`);
    }catch(e){
        res.redirect(`/reviews/list.do`);
        throw new Error(e)
    }
});

module.exports = router;