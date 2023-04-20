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
        res.redirect(`/reviews/list.do`);
    }
});


router.post('/update.do', async function(req, res) {
        let update=0;
        update= await reviewsRepliesService.modify(req.body);

        if(update>0){
            res.redirect('/reviews/list.do');
        }else{
            res.redirect('/reviews/list.do');
        }
});


router.get("/:rNum/delete.do", async (req,res)=>{
    let del=0;
    try{
        del=await reviewsRepliesService.deleteOne(req.params.rNum);
    }catch(e){
        console.error(e);
    }
    if(del>0){
        res.redirect("/reviews/list.do");
    }else{
        res.redirect(`/reviews/list.do`);
    }
});


module.exports = router;