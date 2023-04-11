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

module.exports = router;
