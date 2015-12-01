var express = require('express');
var passport = require('passport');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('express-jwt');

/**
 * Setting constants
 */
var _SECRET = process.env.JWT_SECRET;

/**
 * Load the models
 */
var Model = require('./models/Models');
var User = Model.User;

/**
 * Require our passport config after we'eve loaded the usermodel
 */
require('./config/passport');


/**
 * Put the middlewares into a variable
 */
var jwtDecode = jwt({secret: _SECRET, userProperty: 'payload'});
var authenticate = require('./middlewares/authenticate');


/**
 * Put the routes into a variable
 */
var api = require('./routes/api');
var user = require('./routes/auth/user');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());


/**
 * Add middlewares here
 */
app.use('/api/auth/*', jwtDecode, authenticate);


/**
 * Add routes here
 */
app.use('/api', api);
app.use('/api/auth/user', user);


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
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
