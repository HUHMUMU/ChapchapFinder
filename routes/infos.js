const express = require('express');
const router = express.Router();
const infoService=require("../model/service/InfoService");
const storeManagesService=require("../model/service/StoreManagesService");
const path=require("path");
const multer = require('multer');
const storage=multer.diskStorage(
    {
        destination:(req,file,cb)=>{ //cb : destination의 값을 지정
            cb(null,"./public/images/storeImg");
        },
        filename:(req,file,cb)=>{
            let ext=path.extname(file.originalname);
            let name="reply_"+Date.now()+"_"+(Math.trunc(Math.random()*1000))+ext; //.jpeg
            //0.123012937901273809*1E9 => 12301293.7901273809 => 12301294
            req.body.store_img="/images/storeImg/"+name;
            cb(null,name);
        },
        limits: {
            fileSize: 1024 * 1024 * 10, // 10MB
        }
    }
);
function fileFilter (req, file, cb)  {
    let mimetype=file.mimetype.split("/");
    if (mimetype[0]!=="image"){
        return cb(new Error("이미지만 업로드 가능합니다."), false);
    }
    cb(null, true);
};
const upload=multer({storage:storage,fileFilter:fileFilter});

router.get('/insert.do',async (req,res)=>{
    let storeId = req.session.loginStore.store_id
    let storeManage= await  storeManagesService.findStoreManage(storeId)
    res.render('infos/insert', { storeManage : storeManage })
})
router.post('/insert.do',async (req,res)=>{
    let storeNum = req.session.loginStore.store_num
    let insertStoreInfo=0;
    let insertHoliday =0;
    let insertBreaktime=0;
    let insertCate=0;
    let insertImg=0;
    console.log(req.body);
    for(let key in req.body){
        console.log(key,req.body[key]);
        if (!req.body[key]) {
            req.body[key] = null;
        }
        if(req.body[key]=="on"){
            req.body[key] = 1;
        }
    }


    try{
        insertStoreInfo=await infoService.insertStoreInfo(req.body);
        insertCate = await infoService.insertStoreTypes2(req.body)
        insertHoliday=await infoService.insertHolidays(req.body)
        insertBreaktime=await infoService.insertBreaktime(req.body)
        insertImg=await infoService.insertImg(req.body);
    }catch (e){
        console.error(e)
    }
    if(insertCate && insertStoreInfo && insertHoliday && insertBreaktime && insertImg) {
        res.redirect("/");
    }else{
        res.redirect("/infos/insert.do");
    }
})


router.get('/detail.do', async (req, res) => {
    let storeNum = req.session.loginStore.store_num
    let storeId = req.session.loginStore.store_id
    let store = await infoService.findByStore(storeNum);
    let storeManage= await  storeManagesService.findStoreManage(storeId)
    let holidays = await  infoService.findHolidaysByStore(storeNum)
    let breakTimes = await  infoService.findBreaktimesByStore(storeNum)
    let storeTypes = await infoService.findStoreTypes(storeNum);
    let imgs = await infoService.findImg(storeNum)
    if (store) {
        res.render('infos/update', { store: store, storeManage : storeManage, holidays : holidays, breakTimes : breakTimes, storeTypes:storeTypes, imgs:imgs});
    } else {
        res.redirect('/');
    }
});

router.post("/update.do",async (req,res)=>{
    let updateStoreInfo=0;
    let updateHoliday=0;
    let updateBreaktime=0;
    let updateCate=0;
    let updateImg =0;
    try{
        updateStoreInfo=await infoService.updateByStoreInfo(req.body)
        updateHoliday=await infoService.updateHolidays(req.body)
        updateBreaktime=await infoService.updateBreaktime(req.body)
        updateCate=await infoService.updateStoreTypes(req.body)
        updateImg=await infoService.updateImg(req.body)
    }catch (e) {
        console.error(e)
    }

    if(updateStoreInfo && updateHoliday && updateBreaktime && updateCate && updateImg){
        res.redirect("/");
    }else {
        res.redirect(`/detail.do`);
    }
});

router.get("/delete.do", async (req,res)=>{
    let storeNum = req.session.loginStore.store_num
    let dropStoreInfo=0;
    let dropHoliday=0;
    let dropBreaktime=0;
    let dropStoreTypes =0;
    let dropImgs=0;
    try{
        dropStoreInfo=await infoService.dropStoreInfo(storeNum)
        dropHoliday=await infoService.dropHoliday(req.params.holi_num ,storeNum)
        dropBreaktime=await infoService.dropBreaktime(req.params.rest_num ,storeNum)
        dropStoreTypes=await infoService.dropStoreTypes(req.params.storetype_id, storeNum)
        dropImgs=await infoService.dropImg(req.params.img_num, storeNum)
    }catch(e){
        console.error(e);
    }
    if(dropStoreInfo>0 && dropHoliday>0 && dropBreaktime>0 && dropStoreTypes>0 && dropImgs>0){
        res.redirect("/");
    }else{
        res.redirect(`/detail.do`);
    }
});


module.exports = router;