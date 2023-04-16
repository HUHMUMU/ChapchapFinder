const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const chapdealService = require("../model/service/ChapdealService");

// 파일 저장을 위한 Multer 설정
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join( 'public','images', 'chapdeal'));
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});
// 파일 업로드 미들웨어 생성
const upload = multer({ storage: storage });

router.get('/list.do', async (req, res) => {
    let storeNum = req.session.loginStore.store_num; //로그인한 가게 번호
    const dealList = await chapdealService.findAllDeal(storeNum);
    res.render('chapdeal/list', { dealList });
});

router.get('/:event_num/update.do', async (req, res) => {
    const storeNum = req.session.loginStore.store_num; // 로그인한 가게 번호
    const dealList = await chapdealService.findOneDeal(storeNum,req.params.event_num); //이벤트 정보 가져오기
    res.render('chapdeal/update', { dealList });
});
router.post("/:event_num/update.do", upload.single('event_img'), async (req, res) => {
    const storeNum = req.session.loginStore.store_num; // 로그인한 가게 번호
    let imagePath;
    if (req.file) {
        imagePath = "/"+req.file.path.replace('public\\', '');
    } else {
        imagePath = req.params.event_img; // 파일이 없는 경우 기존 이미지로
    }
    const { event_title, event_condition, event_reward, event_start, event_end } = req.body;
    const update = await chapdealService.modifyDeal(
        event_title,
        event_condition,
        event_reward,
        imagePath,
        event_start,
        event_end,
        storeNum,
        req.params.event_num
    );
    if (update > 0) {
        res.redirect("/chapdeal/list.do");
    } else {
        res.redirect(`/chapdeal/${req.params.event_num}/update.do`);
    }
});

router.get('/insert.do',async (req,res)=>{
    res.render('chapdeal/insert');
});
router.post("/insert.do", upload.single('event_img'),async (req,res)=>{
    const storeNum = req.session.loginStore.store_num; // 로그인한 가게 번호
    const { event_title, event_condition, event_reward, event_start, event_end } = req.body;
    let imagePath;
    if (req.file) {
        imagePath = "/"+req.file.path.replace('public\\', '');
    } else {
        imagePath = ' '; // 파일이 없는 경우 처리
    }
    const insert = await chapdealService.insertDeal(
        event_title,
        event_condition,
        event_reward,
        imagePath,
        event_start,
        event_end,
        storeNum
    );
    if(insert>0) {
        res.redirect("/chapdeal/insert.do");
    }else {
        res.redirect("/chapdeal/list.do");
    }
});

router.get('/:event_num/delete.do', async (req, res) => {
    let del=0;
    const storeNum = req.session.loginStore.store_num; // 로그인한 가게 번호
    try {
        del=await chapdealService.dropDeal(storeNum,req.params.event_num);
    } catch (err) {
        console.error(err);
        res.status(500).send('서버 에러');
    }
    if(del>0){
        res.redirect('/chapdeal/list.do');
    }else{
        res.redirect('/chapdeal/list.do');
    }
});

module.exports = router;
