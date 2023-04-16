const express = require('express');
const router = express.Router();
const reviewsService=require("../model/service/ReviewsService");
const path=require("path");
const multer=require("multer");
const storage=multer.diskStorage(
    {
        destination:(req,file,cb)=>{ //cb : destination의 값을 지정
            cb(null,"./public/img/reply");
        },
        filename:(req,file,cb)=>{
            /*
            * {
                  fieldname: 'img_path',
                  originalname: 'F7FA780C-A596-4C46-B485-F1144A252018.test.23.02.31.jpg',
                  encoding: '7bit',
                  mimetype: 'image/jpeg',
                  destination: 'upload/',
                  filename: 'ed91bb11dc25a42bd1498329e0b5398d',
                  path: 'upload/ed91bb11dc25a42bd1498329e0b5398d',
                  size: 5598899
                }
                */
            let ext=path.extname(file.originalname);
            let name="reply_"+Date.now()+"_"+(Math.trunc(Math.random()*1000))+ext; //.jpeg
            //0.123012937901273809*1E9 => 12301293.7901273809 => 12301294
            req.body.img_path="/img/reply/"+name;
            cb(null,name);
        },
        limits: {
            fileSize: 1024 * 1024 * 10, // 10MB
        }
    }
);
function fileFilter (req, file, cb)  {
    let mimetype=file.mimetype.split("/");
    if (mimetype[0]!=="image"){
        return cb(new Error("이미지만 업로드 가능합니다."), false);
    }
    cb(null, true);
};
const upload=multer({storage:storage,fileFilter:fileFilter});

router.get('/list.do', async function(req, res) {
    req.query.orderField = req.query.orderField || "date";
    req.query.orderDirect = req.query.orderDirect || "DESC";
    let storeNum = req.session.loginStore.store_num;
    let rRstatus = '공개';
    let count = 0;
    let uncount = 0;
    let replies=null;
    let reviews=null;
    let store = null;
    try {
        reviews=await reviewsService.list(storeNum,rRstatus);
        count = await reviewsService.answeredCount(storeNum,rRstatus);
        const arr = await reviewsService.unansweredCount(storeNum);
        uncount = arr.length;
        replies = await reviewsService.findByRrNum();
        store = await reviewsService.findByStore(storeNum);

    }catch (e) {
        new Error(e);
    }
    if(reviews){
        res.render("reviews/list",{reviews:reviews,params:req.query, count:count, uncount:uncount, replies:replies, store:store});
    }else {
        res.redirect("/")
    }
});

module.exports = router;