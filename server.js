// Dependencies
// ============
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override'); // for deletes in express
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

// Our model controllers (rather than routes)
var application_controller = require('./controllers/application_controller');

// Express settings
// ================

// instantiate our app
var app = express();

var PORT = process.env.PORT || 8080;

// override POST to have DELETE and PUT
app.use(methodOverride('_method'))

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', application_controller);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  })
});


// our module get's exported as app.
module.exports = app;

app.listen(PORT);

//new code
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));