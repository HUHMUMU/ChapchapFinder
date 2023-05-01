const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const chapdealService = require("../model/service/ChapdealService");
const fs = require("fs");

// 파일 저장을 위한 Multer 설정
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join( 'public','images', 'chapdeal')); //public/images/chapdeal 에 저장
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`); // 저장되는 이미지 이름
    }
});
// 파일 업로드 미들웨어 생성
const upload = multer({ storage: storage });


router.get('/list.do', async (req, res) => {
    let storeNum = req.session.loginStore.store_num; //로그인한 가게 번호
    const dealList = await chapdealService.findAllDeal(storeNum); //가게 정보
    res.render('chapdeal/list', { dealList });
});

router.get('/:event_num/update.do', async (req, res) => {
    const dealList = await chapdealService.findOneDeal(req.params.event_num); //이벤트 정보 가져오기
    res.render('chapdeal/update',{dealList});
});
router.post("/:event_num/update.do", upload.single('event_img'), async (req, res) => {
    const oldImg = req.body.oldImg; // 이전 이미지 파일 데이터 받아오기
    if (req.file) { // 이미지 파일이 업로드 됐다면
        if(oldImg){ // 기존 이미지가 있다면
            fs.unlinkSync(`public/${oldImg}`); // 기존 이미지를 파일에서 삭제
        }
        req.body.event_img = "/" + req.file.path.replace("public\\", ""); // 새로운 이미지 db에 저장
    } else {
        req.body.event_img = req.params.event_img; // 파일이 없는 경우 기존 이미지를 db에 저장
    }
    const update = await chapdealService.modifyDeal(
        req.body,
        req.params.event_num
    );
    if (update > 0) {
        res.redirect("/chapdeal/list.do"); //성공시
    } else {
        res.redirect(`/chapdeal/${req.params.event_num}/update.do`); //실패시
    }
});

router.get('/insert.do',async (req,res)=>{
    let storeNum = req.session.loginStore.store_num; //로그인한 가게 번호
    res.render('chapdeal/insert',{storeNum});
});
router.post("/insert.do", upload.single('event_img'),async (req,res)=>{
    if (req.file) { // 이미지 파일이 업로드 됐다면
        req.body.event_img = "/"+req.file.path.replace('public\\', ''); // 이미지 db에 저장
    } else {
        req.body.event_img = ' '; // 파일이 없는 경우 처리
    }
    const insert = await chapdealService.insertDeal(req.body);
    if(insert>0) {
        res.redirect("/chapdeal/insert.do"); //실패시
    }else {
        res.redirect("/chapdeal/list.do"); //성공시
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
        res.redirect('/chapdeal/list.do'); //성공시
    }else{
        res.redirect('/chapdeal/list.do'); //실패시
    }
});

module.exports = router;
