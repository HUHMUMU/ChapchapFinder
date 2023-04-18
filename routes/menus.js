const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const menuService=require("../model/service/MenuService");

// 파일 저장을 위한 Multer 설정
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join( 'public','images', 'menu'));
    },

    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
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
    const storeNum = req.session.loginStore.store_num; // 로그인한 가게 번호
    const menus = await menuService.findOneMenu(storeNum,req.params.menu_num); //메뉴 정보 가져오기
    res.render('menu/update', { menus });
});
router.post("/:menu_num/update.do", upload.single('img'), async (req, res) => {
    const storeNum = req.session.loginStore.store_num; // 로그인한 가게 번호
    let imagePath;
    if (req.file) {
        imagePath = "/"+req.file.path.replace('public\\', '');
    } else {
        imagePath = req.params.img; // 파일이 없는 경우 기존 이미지로
    }
    const { name, price, info, menu_type, status } = req.body;
    const update = await menuService.modifyMenu(
        name,
        imagePath,
        price,
        info,
        menu_type,
        status,
        storeNum,
        req.params.menu_num
    );
    if (update > 0) {
        res.redirect("/menu/list.do");
    } else {
        res.redirect(`/menu/${req.params.menu_num}/update.do`);
    }
});

router.get('/insert.do',async (req,res)=>{
    const storeNum = req.session.loginStore.store_num; // 로그인한 가게 번호
    console.log(storeNum)
    res.render('menu/insert');
});
router.post("/insert.do", upload.single('img'),async (req,res)=>{
    const storeNum = req.session.loginStore.store_num; // 로그인한 가게 번호
    const { name, price, info, menu_type, status } = req.body;
    let imagePath;
    if (req.file) {
        imagePath = "/"+req.file.path.replace('public\\', '');
    } else {
        imagePath = ' '; // 파일이 없는 경우 처리
    }
    const insert = await menuService.insertMenu(
        name,
        imagePath,
        price,
        info,
        menu_type,
        status,
        storeNum
    );
    if(insert>0) {
        res.redirect("/menu/insert.do");
    }else {
        res.redirect("/menu/list.do");
    }
});

router.get('/:menu_num/delete.do', async (req, res) => {
    let del=0;
    const storeNum = req.session.loginStore.store_num; // 로그인한 가게 번호
    try {
        del=await menuService.dropMenu(storeNum,req.params.menu_num);
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