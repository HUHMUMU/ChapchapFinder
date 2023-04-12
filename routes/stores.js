const express = require('express');
const router = express.Router();
const storeService=require("../model/service/StoresService");


/* GET users listing. */
router.get('/login.do', async (req, res, next)=> {
  res.render("stores/login");
});

router.get("/logout.do",async (req,res)=>{
  req.session.destroy((err)=>{
    if(err) console.error(err);
    res.cookie("autoLoginPw","",{maxAge:0,signed:false})
    res.cookie("autoLoginId","",{maxAge:0,signed:false})
    res.redirect("/");
  })
});

router.post("/login.do",async (req, res) => {
  let { u_id, pw, autoLogin }=req.body;
  let user = null;
  if (u_id && pw) {
    user = await storeService.login(u_id, pw);
  }
  if(user){
    req.session.loginUser=user; //session : 서버에 유지되는 정보
    const cookieOpt={
      httpOnly: true, //http 통신에서만 쿠카를 사용(쿠키 탈취 해킹 방지)
      signed: true, //암호화하겠다.
      maxAge: 7*24*60*60*1000 //현재를 기준으로 만료시간
    }
    if(autoLogin && autoLogin==="1"){
      res.cookie("autoLoginId",user.u_id,cookieOpt);
      res.cookie("autoLoginPw",user.pw,cookieOpt);

    }
    res.redirect("/");
  }else{
    res.redirect("/stores/login.do");
  }
  res.end();
});


module.exports = router;
