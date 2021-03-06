var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();
var mongoose = require('mongoose')

var redisClient = require('./redis-client');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var actualWheatherRouter = require('./routes/actualWheather');
var searchCityRouter = require('./routes/searchCity');

redisClient.on("error", (error) => {
  console.error(error);
});

mongoose.connect("mongodb+srv://admin:admin@cluster0.zs0eg.mongodb.net/APP?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })

var db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Database sucessfully connected'))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/actualWheather', actualWheatherRouter);
app.use('/searchCity', searchCityRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
