const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cookieSession = require('cookie-session');
const config = require('./config/development_config');

const memberRouter = require('./routes/member');
const orderRouter = require('./routes/order');
const productRouter = require('./routes/product');
const passport = require('passport');
const { token } = require('morgan');

const app = express();

require('./config/passport');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({ keys:[config.secret] }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/member', memberRouter);
app.use('/', orderRouter);
app.use('/', productRouter);

app.get('/', (req, res) => {
  res.render("index",{user:req.user});
});

const authCheck = (req, res, next) => {
  console.log(req.user);
  if (!req.isAuthenticated()) {
    res.redirect("/auth/login");
  } else {
    next();
  }
};

app.get('/helloworld',authCheck,(req,res)=>{
  //這邊就先把token send過去，到時候前端在存localstorage
  res.send({ sucess:true,token:req.user[0].token,user:req.user[0] });
});

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

module.exports = app;
