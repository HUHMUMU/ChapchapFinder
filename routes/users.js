const express=require('express');
const router=express.Router();
const storeManagesService=require("../model/service/StoreManagesService");
const infoService = require("../model/service/InfoService");

//insert.do로 접속을 하는 코드
router.get("/insert.do",(req,res) =>{
    res.render("users/insert");
});
router.post("/insert.do",async (req,res)=>{
    let insertStoreUser=null;
    const reqBody=nullifyEmptyStrings(req.body);
    try {
        insertStoreUser=await storeManagesService.register(reqBody);
    }catch (e) {
        console.error(e);
        req.flash("actionMsg","회원등록 실패 :"+e.message);
    }
    if(insertStoreUser){
        req.flash("actionMsg", "회원등록 성공! 로그인하세요");
        res.redirect(`/stores/login.do`);
    }else{
        req.flash("actionMsg","오류 발생 다시 시도하세요");
        res.redirect("/users/insert.do");
    }
});

router.get("/detail.do", async (req, res) => {
    const storeId = req.session.loginStore.store_id;
    try {
        const storeUser = await storeManagesService.findStoreManage(storeId);
        res.render("users/insert", { storeUser:storeUser });
    } catch (e) {
        console.error(e);
        req.flash("actionMsg", "유저 정보 조회 실패 :" + e.message);
        res.redirect("/");
    }
});
router.post("/update.do", async (req, res) => {
    const updatedStoreUser = nullifyEmptyStrings(req.body);
    try {
        await storeManagesService.update(updatedStoreUser);
        req.flash("actionMsg", "사용자 정보 수정 성공");
        res.redirect(`/users/detail.do`);
    } catch (e) {
        console.error(e);
        req.flash("actionMsg", "사용자 정보 수정 실패 :" + e.message);
        res.redirect(`/users/detail.do`);
    }
});


function nullifyEmptyStrings(reqBody) { //"" or "  " 파라미터 null 처리
    const result = {};

    for (const [key, value] of Object.entries(reqBody)) {
        result[key] = value.trim() === '' ? null : value;
    }

    return result;
}
module.exports = router;