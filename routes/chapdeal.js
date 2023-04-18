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
    const dealList = await chapdealService.findOneDeal(req.params.event_num); //이벤트 정보 가져오기
    res.render('chapdeal/update',{dealList});
});
router.post("/:event_num/update.do", upload.single('event_img'), async (req, res) => {
    if (req.file) {
        req.body.event_img = "/"+req.file.path.replace('public\\', '');
    } else {
        req.body.event_img = req.params.event_img; // 파일이 없는 경우 기존 이미지로
    }
    const update = await chapdealService.modifyDeal(
        req.body,
        req.params.event_num
    );
    if (update > 0) {
        res.redirect("/chapdeal/list.do");
    } else {
        res.redirect(`/chapdeal/${req.params.event_num}/update.do`);
    }
});

router.get('/insert.do',async (req,res)=>{
    let storeNum = req.session.loginStore.store_num; //로그인한 가게 번호
    res.render('chapdeal/insert',{storeNum});
});
router.post("/insert.do", upload.single('event_img'),async (req,res)=>{
    if (req.file) {
        req.body.event_img = "/"+req.file.path.replace('public\\', '');
    } else {
        req.body.event_img = ' '; // 파일이 없는 경우 처리
    }
    const insert = await chapdealService.insertDeal(
        req.body
    );
    if(insert>0) {
        res.redirect("/chapdeal/insert.do");
    }else {
        res.redirect("/chapdeal/list.do");
    }
});

router.get('/:event_num/delete.do', async (req, res) => {
    let del=0;
    try {
        del=await chapdealService.dropDeal(req.params.event_num);
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
