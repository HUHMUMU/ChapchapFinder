const express = require('express');
const router = express.Router();
const reviewService=require("../model/service/ReviewsService");

router.get('/:storeNum/reviewslist', async function(req,res){
    let rrStatus = req.query.rrStatus;
})

module.exports = router;