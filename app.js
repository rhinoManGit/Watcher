var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

// local
var routes = require('./routes/index');
var users = require('./routes/users');

var loginView = require('./routes/login_view');
var login = require('./routes/login');

var doc = require('./routes/doc_view');
var preview = require('./routes/preview_view');
var transform = require('./routes/transform');

var submit = require('./routes/submit');
var generator = require('./routes/generator');
var findUrl = require('./routes/findUrl');
//var registe = require('./routes/reg');

var settings = require('./settings');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*
*
* 处理cookie及session
*
* */
app.use(cookieParser());

app.use(session({
  secret: 'frontTeam',
  name: 'frontTeam_roby',
  cookie: {maxAge: 60000 * 10},
  resave: false,
  saveUninitialized: true
}));

// 获取url
app.get('/getcustomurl/*', function(req, res, next){

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");

  findUrl(req, res, req.url);
});


// 首页
app.use('/index', routes);
// 用户
//app.use('/users', users);
// 登陆
app.use('/login', loginView);
app.use('/deep_login', login);
// 注册
//app.use('/registe', registe);

/*
* markdown 写文档
*
* */
app.use('/doc', doc);
app.use('/doc/transformation', transform);
app.use('/doc/preview', preview);

/*
*
* 生成url
*
* */
app.use('/submit', submit);
// url生成器
app.use('/generateUrl', generator);
// success
app.use('/success', function(req, res, next) {
  res.render('success');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('common/error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('common/error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
