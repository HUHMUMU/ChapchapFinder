const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const logger = require('morgan');
const session = require("express-session");
const memorystore=require("memorystore")(session); //서버가 아니라 컴퓨터 메모리에 세션을 저장(type Map)

const indexRouter = require('./routes/index');
const storesRouter = require('./routes/stores');
const reviewsRouter = require('./routes/reiviews');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'my-secret-key',
  resave:false,//변경없는 세션도 저장함
  saveUninitialized: true,//초기화되지 않는 세션도 저장
  store : new memorystore({
    checkPeriod : 2*60*60*1000
  })
}));

app.use(function (req, res, next){
  res.locals.loginStore=req.session.loginStore;
  next();
});

app.use( function (req, res, next ){
  if(req.path==="/" || req.path==="/stores/login.do" ){
    next();
  }else{
    if(req.session.loginStore){
      next();
    }else{
      res.redirect("/stores/login.do");
    }
  }
});

// 루트 경로를 '/login.do'로 설정
app.get('/', (req, res) => {
  res.redirect('/login.do');
});

//로그인 페이지 경로 설정
app.get('/login.do', (req, res) => {
  res.render('stores/login');
});

app.use('/', indexRouter);
app.use('/stores', storesRouter);
app.use('/admin', reviewsRouter);

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
