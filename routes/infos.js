const express = require('express');
const router = express.Router();
const infoService=require("../model/service/InfoService");
const storeManagesService=require("../model/service/StoreManagesService");
const path=require("path");
const multer = require('multer');
const storage=multer.diskStorage(
    {
        destination:(req,file,cb)=>{ //cb : destination의 값을 지정
            cb(null, path.join( 'public','images', 'storeImg'));
        },
        filename:(req,file,cb)=>{
            cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`); //이미지 이름
        }
    }
);


const upload=multer({storage:storage});

router.get('/insert.do', async (req,res)=>{
    let storeId = req.session.loginStore.store_id
    let storeManage= await  storeManagesService.findStoreManage(storeId)
    res.render('infos/insert', { storeManage : storeManage })
})
const cpUpload = upload.fields([{ name: 'main_img', maxCount: 1 }, { name: 'store_img', maxCount: 8 }])

router.post('/insert.do', cpUpload, async (req, res) => {
    let storeNum = req.session.loginStore.store_num;
    let insertStoreInfo = 0;
    let insertHoliday = 0;
    let insertBreaktime = 0;
    let insertCate = 0;
    let insertImg = 0;
    for (let key in req.body) {
        //console.log(key, req.body[key]);
        if (!req.body[key]) {
            req.body[key] = null;
        }
        if (req.body[key] == "on") {
            req.body[key] = 1;
        }
    }
    const storeImgs=req.files['store_img'];
    const mainImg=req.files['main_img'];
    if (mainImg){
        req.body.main_img = "/" + mainImg[0].path.replace('public\\', '');
    }
    if(storeImgs){
        for(const storeImg of storeImgs){
            req.body.store_img = "/" + storeImg.path.replace('public\\', '');
        }
    }
    //console.log("storeImgs:",storeImgs);
    //console.log("mainImg:",mainImg);

    console.log(req.file)
    try {
        insertStoreInfo = await infoService.insertStoreInfo(req.body);
        console.log("insertStoreInfo" + insertStoreInfo)
        insertCate = await infoService.insertStoreTypes2(req.body);
        console.log("insertStoreTypes2" + insertCate)
        insertHoliday = await infoService.insertHolidays(req.body);
        console.log("insertHolidays" + insertHoliday)
        insertBreaktime = await infoService.insertBreaktime(req.body);
        console.log("insertBreaktime" + insertBreaktime)
        insertImg = await infoService.insertImg(req.body);
        console.log("insertImg" + insertImg)
    } catch (e) {
        console.error(e);
    }
    if (
        insertCate &&
        insertStoreInfo &&
        insertHoliday &&
        insertBreaktime &&
        insertImg
    ) {
        res.redirect("/");
    } else {
        req.flash("error", "저장 중 오류가 발생했습니다. 다시 시도해주세요.")
        res.redirect("/infos/insert.do");
    }
});



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