const express = require('express');
const router = express.Router();
const infoService=require("../model/service/InfoService");
const storeMenagesService=require("../model/service/StoreManagesService");
const path=require("path");

router.get('/insert.do',async (req,res)=>{
    res.render('infos/insert');
})
router.post('/insert.do',async (req,res)=>{
    let storeNum = req.session.loginStore.store_num
    let insert=0;
    let insertCate=0;
    let findCate=0;
    let {select_main_category1, select_main_category2, select_main_category3} = req.body;
    if(select_main_category1){
        findCate = await infoService.findTypeClasses(select_main_category1);
    }
    if (select_main_category2){
        findCate = await infoService.findTypeClasses(select_main_category2);
    }
    if (select_main_category3){
        findCate = await infoService.findTypeClasses(select_main_category3);
    }


    try{
        insert=await infoService.insertStoreInfo(req.body);
        insertCate = await infoService.insertStoreTypes(storeNum, findCate)
    }catch (e) {
        console.error(e)
    }
    if(insert>0 && insertCate>0) {
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
    const storeManage= await  storeMenagesService.findStoreManage(req.session.loginStore.store_id);
    const holidays = await  infoService.findHolidaysByStore(req.session.loginStore.store_num);
    const breakTimes = await  infoService.findBreaktimesByStore(req.session.loginStore.store_num);
    const storeTypes = await infoService.findStoreTypes(req.session.loginStore.store_num);
    if (store) {
        res.render('infos/update', { store: store, storeManage : storeManage, holidays : holidays, breakTimes : breakTimes, storeTypes:storeTypes});
    } else {
        res.redirect('/');
    }
});


module.exports = router;