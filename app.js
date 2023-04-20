const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const session = require("express-session");

const indexRouter = require('./routes/index');
const reportsRouter = require('./routes/reports');
const reviewsRouter = require('./routes/reviews');
const repliesRouter = require('./routes/replies');
const storesRouter = require('./routes/stores');
const storeManagesRouter=require('./routes/users');
const infoRouter = require('./routes/infos');
const menusRouter = require('./routes/menus');
const chapdealsRouter = require('./routes/chapdeal');
const waitingRouter=require('./routes/adminWaiting');
const reportsRouter=require('./routes/reports');


const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

///// 쿠키정보 파싱 및 암호화 생성 start
const cookieParser = require('cookie-parser');
const cookieEncrypter=require('cookie-encrypter');
const crypto=require("crypto");
const cookiePw=crypto.createHash("md5").update("cookiePw123@").digest("hex");
app.use(cookieParser(cookiePw));
app.use(cookieEncrypter(cookiePw));
///// end

app.use(session({
  secret: 'my-secret-key',
  resave:false,
  saveUninitialized: true,
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

///// connect-flash : 일회용 세션으로 req.flash(key,value) 를 보내면 리다이렉트 페이지로 메세지를 전달할 수 있다.(보통 action 페이지에서 처리 결과를 반환하기 위해 사용)
const flash = require('connect-flash');
const bodyParser = require("body-parser");
app.use(flash());
///// end

//자동로그인 미들웨어
app.use(async function (req, res, next){
  let {autoLoginId, autoLoginPw}=req.signedCookies;  //암호된 쿠키를 암호를 풀면서 파싱한 필드
  if( !req.session.loginStore && autoLoginId && autoLoginPw ){
    const storeService=require("./model/service/StoresService");
    const store=await storeService.login(autoLoginId,autoLoginPw);
    if(store)req.session.loginStore=store;
  }
  next();
});

//loginStore의 store_num으로 stores테이블의 store_name 가져오기
app.use(async function(req, res, next) {
  if (req.session.loginStore) {
    const infoService = require('./model/service/InfoService');
    res.locals.loginStore = req.session.loginStore;
    res.locals.storeName = await infoService.findByStore(req.session.loginStore.store_num);
  }
  next();
});

//모든 요청에서 퍼그 렌더시 변수로 loginUser 를 제공
app.use(function (req, res, next){
  const actionMsg = req.flash("actionMsg")[0]; //호출과 즉시 세션에서 삭제함
  console.log(actionMsg);
  if (actionMsg) {
    res.locals.actionMsg = actionMsg;
  }
  //redirect 되는 페이지까지만 유지되는 세션으로 action 성공 실패 메세지를 pug 에 렌더함
  if(req.session.loginStore)res.locals.loginStore=req.session.loginStore;
  next();
});

// 미들웨어를 이용해서 로그인 인증 구현 !
app.use( function (req, res, next ){
  if(req.path==="/" || req.path==="/stores/login.do" || req.path==="/users/insert.do" ){
    next();
  }else{
    if(req.session.loginStore){
      next();
    }else{
      res.redirect("/stores/login.do");
    }
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/', indexRouter);
app.use('/reports', reportsRouter);
app.use('/replies', repliesRouter);
app.use('/reviews', reviewsRouter);
app.use('/stores', storesRouter);
app.use('/users', storeManagesRouter);
app.use('/replies', repliesRouter);
app.use('/infos', infoRouter);
app.use('/menu', menusRouter);
app.use('/waitings', waitingRouter);
app.use('/reports', reportsRouter);
app.use('/chapdeal', chapdealsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(8080,()=>{
  console.log("http://localhost:8080 expressjs 관리자 프로젝트 시작");
})
module.exports = app;
