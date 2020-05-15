var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var entertainmentRouter = require('./routes/entertainment');
var businessRouter = require('./routes/business');
var socialRouter = require('./routes/social');
var lawRouter = require('./routes/law');
var worldRouter = require('./routes/world');
var sportRouter = require('./routes/sport');
var armyRouter = require('./routes/army');
var healthRouter = require('./routes/health');
var lifeStyleRouter = require('./routes/lifeStyle');
var detailRouter = require('./routes/detail');

const handlebars = require('handlebars');
const {registerItem, registerItems} = require('./HandlebarsRegister/register');
registerItem(handlebars);
registerItems(handlebars);

var usersRouter = require('./routes/users');

var expressHbs = require('express-handlebars');

var app = express();

// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/entertainment', entertainmentRouter);
app.use('/business', businessRouter);
app.use('/social', socialRouter);
app.use('/life-style', lifeStyleRouter);
app.use('/law', lawRouter);
app.use('/sport', sportRouter);
app.use('/health', healthRouter);
app.use('/army', armyRouter);
app.use('/world', worldRouter);
app.use('/detail', detailRouter);
app.use('/users', usersRouter);

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
