// Dependencies
// ============
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override'); // for deletes in express
var models = require("./models");

// Our model controllers (rather than routes)
var application_controller = require('./controllers/application_controller');
var content_controller = require('./controllers/content_controller');
var favorites_controller = require('./controllers/favorites_controller');
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
app.use('/content', content_controller);
app.use('/favorites', favorites_controller);

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
models.sequelize.sync().then(function () {
app.listen(PORT);
});