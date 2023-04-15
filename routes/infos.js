const express = require('express');
const router = express.Router();
const infoServiceClass=require("../model/service/InfoService");
const infoService = new infoServiceClass();
const path=require("path");

router.get('/insert.do',async (req,res)=>{
    res.render('infos/insert');
})
router.post('/insert.do',async (req,res)=>{
    let insert=0;
    try{
        insert=await infoService.insertStoreInfo(req.body);
    }catch (e) {
        console.error(e)
    }
    if(insert>0) {
        alert("등록성공");
        res.redirect("/");
    }else{
        res.redirect("/infos/insert.do")
    }
})



router.get('/update.do',async (req,res)=>{
    res.render('infos/update');
})
router.get('/:storeNum/detail.do',async (req,res)=>{
    const store = await infoService.findByStore(req.params.storeNum)
    if(store){
        res.render("/infos/update",{store:store});
    } else{
        res.redirect("/");
    }
})



module.exports = router;