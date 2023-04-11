const express = require('express');
const router = express.Router();
const storeService=require("../model/service/StoresService");


/* GET users listing. */
router.get('/login.do', async (req, res, next)=> {
  res.render("stores/login");
});

router.post('/login.do', async (req,res)=>{
  let {store_id, pw} = req.body;
  let store = null;
  if(store_id && pw){
    store = await storeService.login(store_id, pw);
  }
  if(store){
    req.session.loginStore=store;
    res.redirect("/")
  }else {
    res.redirect("/stores/login.do");
  }
});
router.get('/', (req, res) => {
  // 로그인되어 있지 않은 경우에는 로그인 페이지로 리다이렉트
  if (!req.session.loginStore) {
    res.redirect('/stores/login.do');
  } else {
    // 로그인한 사용자에게만 메인 페이지 제공
    res.render('stores/main');
  }
});

module.exports = router;
