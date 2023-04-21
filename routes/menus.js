const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const menuService=require("../model/service/MenuService");
const fs = require('fs');

// 파일 저장을 위한 Multer 설정
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join( 'public','images', 'menu'));
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`); //이미지 이름
    }
});
// 파일 업로드 미들웨어 생성
const upload = multer({ storage: storage });


router.get('/list.do', async (req, res) => {
    let storeNum = req.session.loginStore.store_num; //로그인한 가게 번호
    const menuList = await menuService.findAllMenu(storeNum);
    res.render('menu/list', { menuList });
});

router.get('/:menu_num/update.do', async (req, res) => {
    const menus = await menuService.findOneMenu(req.params.menu_num); //메뉴 정보 가져오기
    res.render('menu/update', { menus });
});
router.post("/:menu_num/update.do", upload.single('img'), async (req, res) => {
    // const menus = await menuService.findOneMenu(req.params.menu_num);

    if (req.file) {
        // fs.unlinkSync(`public/${menus.img}`); // 이전 이미지 파일 삭제
        req.body.img = "/" + req.file.path.replace("public\\", "");
    } else {
        req.body.img = req.params.img; // 파일이 없는 경우 기존 이미지로
    }
    const update = await menuService.modifyMenu(
        req.body,
        req.params.menu_num
    );
    if (update > 0) {
        res.redirect("/menu/list.do");
    } else {
        res.redirect(`/menu/${req.params.menu_num}/update.do`);
    }
});

router.get('/insert.do',async (req,res)=>{
    let storeNum = req.session.loginStore.store_num; //로그인한 가게 번호
    res.render('menu/insert',{storeNum});
});
router.post("/insert.do", upload.single('img'),async (req,res)=>{
    if (!req.body) {
        return res.send("<script>alert('이미지를 선택해주세요.');history.back();</script>");
    } else{
        if (req.file) {
            req.body.store_img = "/"+req.file.path.replace('public\\', '');
        } else {
            req.body.store_img = ' '; // 파일이 없는 경우 처리
        }

    }

    const insert = await menuService.insertMenu(req.body);
    if(insert>0) {
        res.redirect("/menu/insert.do");
    }else {
        res.redirect("/menu/list.do");
    }
});

router.get('/:menu_num/delete.do', async (req, res) => {
    let del=0;
    try {
        del=await menuService.dropMenu(req.params.menu_num);
    } catch (err) {
        console.error(err);
        res.status(500).send('서버 에러');
    }
    if(del>0){
        res.redirect('/menu/list.do');
    }else{
        res.redirect('/menu/list.do');
    }
});

module.exports = router;