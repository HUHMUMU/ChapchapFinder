const express = require('express');
const router = express.Router();
const menuService=require("../model/service/MenuService");

router.get('/list.do', async (req, res) => {
    let storeNum = req.session.loginStore.store_num; //로그인한 가게 번호
    const menuList = await menuService.findByMenu(storeNum);
    res.render('menu/list', { menuList });
});

router.get('/update.do', async (req, res) => {
    const storeNum = req.session.loginStore.store_num; // 로그인한 가게 번호
    const menuList = await menuService.findByMenu(storeNum); // 모든 메뉴 정보 가져오기
    res.render('menu/update', { menuList });
});


router.get('/insert.do',async (req,res)=>{
    res.render('menu/insert');
});
router.post("/insert.do",async (req,res)=>{
    let insert=0;
    try{
        insert=await menuService.insertMenu(req.body);
    }catch(e){
        console.error(e);
    }
    if(insert>0) {
        res.redirect("/menu/list.do");
    }else {
        res.redirect("/menu/insert.do");
    }
});
// router.post('/insert.do',async (req,res)=>{
//     let insert=0;
//     const storeNum = req.session.loginStore.store_num; // 로그인한 가게 번호
//     insert=await menuService.insertMenu(storeNum,req.body.name, req.body.img, req.body.price, req.body.info, req.body.menu_type, req.body.status);
//
//     // try{
//     //     insert=await menuService.insertMenu(storeNum,req.body.name, req.body.img, req.body.price, req.body.info, req.body.menu_type, req.body.status);
//     // }catch (e) {
//     //     console.error(e)
//     // }
//     if(insert>0) {
//         alert("메뉴 추가 완료");
//         res.redirect("/menu/list.do");
//     }else{
//         res.redirect("/menu/insert.do")
//     }
// })


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