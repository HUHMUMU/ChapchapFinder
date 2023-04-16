const express = require('express');
const router = express.Router();
const infoService=require("../model/service/InfoService");
const storeMenagesService=require("../model/service/StoreManagesService");
const path=require("path");

router.get('/insert.do',async (req,res)=>{
    res.render('infos/insert');
})
router.post('/insert.do',async (req,res)=>{
    let insertStoreInfo=0;
    let insertHoliday =0;
    let insertBreaktime=0;
    try{
        insertStoreInfo=await infoService.insertStoreInfo(req.body);
        insertHoliday=await infoService.insertHolidays(req.body)
        insertBreaktime=await infoService.insertBreaktime(req.body)
    }catch (e) {
        console.error(e)
    }
    if(insertStoreInfo>0 && insertHoliday>0 && insertBreaktime) {
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
    const holidays = await  infoService.findHolidaysByStore(req.session.loginStore.store_num)
    const breakTimes = await  infoService.findBreaktimesByStore(req.session.loginStore.store_num)
    if (store) {
        res.render('infos/update', { store: store, storeManage : storeManage, holidays : holidays, breakTimes : breakTimes});
    } else {
        res.redirect('/');
    }
});

router.post("/update.do",async (req,res)=>{
    // for(let key in req.body){
    //     if(key!=="bi_id" && !req.body[key].trim()) { // bi_id=>[].trim() 오류
    //         req.body[key]=null;
    //     }
    // }
    console.log("req.body",req.body);
    let updateStoreInfo=0;
    let updateHoliday=0;
    let updateBreaktime=0;
    try{
        updateStoreInfo=await infoService.updateByStoreInfo(req.body)
        updateHoliday=await infoService.updateHolidays(req.body)
        updateBreaktime=await infoService.updateBreaktime(req.body)
    }catch (e) {
        console.error(e)
    }

    if(updateStoreInfo>0 && updateHoliday && updateBreaktime){
        res.redirect("/");
    }else {
        res.redirect(`/detail.do`);
    }
});

router.get("/delete.do", async (req,res)=>{
    let dropStoreInfo=0;
    let dropHoliday=0;
    let dropBreaktime=0;
    try{
        dropStoreInfo=await infoService.dropStoreInfo(req.session.loginStore.store_num)
        dropHoliday=await infoService.dropHoliday(req.params.holi_num ,req.session.loginStore.store_num)
        dropBreaktime=await infoService.dropBreaktime(req.params.rest_num ,req.session.loginStore.store_num)
    }catch(e){
        console.error(e);
    }
    if(dropStoreInfo>0 && dropHoliday>0 && dropBreaktime>0){
        res.redirect("/");
    }else{
        res.redirect(`/detail.do`);
    }
});


module.exports = router;