const express = require('express');
const router = express.Router();
const infoService=require("../model/service/InfoService");
const storeService=require("../model/service/StoresService");
const storeMenagesService=require("../model/service/StoreManagesService");
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



// router.get('/update.do',async (req,res)=>{
//     res.render('infos/update');
// })

router.get('/detail.do', async (req, res) => {
    const store = await infoService.findByStore(req.session.loginStore.store_num);
    const storeManage= await  storeMenagesService.findStoreManage(req.session.loginStore.store_id)
    if (store && storeManage) {
        res.render('infos/update', { store: store, storeManage : storeManage});
    } else {
        res.redirect('/');
    }
});


module.exports = router;