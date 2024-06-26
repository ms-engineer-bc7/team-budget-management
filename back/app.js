const createError = require('http-errors');
const express = require('express');
const cors = require('cors'); //4/2追加
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const subAccountBalanceRouter = require('./routes/subAccountBalance'); // 子口座残高用
// var usersRouter = require('./routes/users');

const balanceRouter = require('./routes/balance'); 
const accountListRouter = require('./routes/accountList');//4/3追加
const transferRouter = require('./routes/transfer'); //振替
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/balance', balanceRouter); //親残高
app.use('/accountList', accountListRouter);//4/3追加
app.use('/transfer', transferRouter);//振替
app.use('/subAccountBalance', subAccountBalanceRouter);//子残高
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
