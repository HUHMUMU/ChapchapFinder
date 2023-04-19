const express = require('express');
const router = express.Router();
const reviewsRepliesService=require("../model/service/ReviewRepliesService");
const path=require("path");

router.get('/insert.do', async function(req, res) {
    res.render("replies/insert");
});

router.post('/insert.do', async function(req, res) {
    const reply =
        {
            review_num : req.body.review_num,
            content : req.body.content,
        };
    try{
        await reviewsRepliesService.insert(reply.review_num, reply.content);
        res.redirect(`/reviews/list.do`);
    }catch(e){
        throw new Error(e)
        res.render("reviews/list");
    }
});

router.get('/update.do', async function(req, res) {
    res.render("replies/update");
});

router.post('/update.do', async function(req, res) {
    const reply = {
        review_num: req.body.review_num,
        content: req.body.content,
    };
    try {
        await reviewsRepliesService.modify(reply);
        res.redirect('/reviews/list.do');
    } catch (e) {
        console.error(e);
        res.render('reviews/list');
    }
});

module.exports = router;