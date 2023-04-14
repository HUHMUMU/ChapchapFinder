const express = require('express');
const router = express.Router();
const path=require("path");

router.get('/insert.do',async (req,res)=>{
    res.render('infos/insert');
})

module.exports = router;