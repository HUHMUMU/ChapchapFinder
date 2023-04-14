const express=require('express');
const router=express.Router();
const storeManagesService=require("../model/service/StoreManagesService");

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
        req.flash("actionMsg","회원등록 실패 :"+e.message)
    }
    if(insertStoreUser){
        req.flash("actionMsg","회원등록 성공");
        res.redirect(`/users/${insertStoreUser.store_id}/detail.do`);
    }else{
        res.redirect("/users/insert.do");
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