/*  *********   WELCOME TO FUDGE CMS   *********

This is the core controller of the app from the back-end poit of view, 
Here we manage general settins and connection with the Database. 
*/

/*  Setting up the objects and variables for geneal settings   */

var express = require('express');
var cookieParser = require('cookie-parser');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var app = express();
/* Add cookie-parser module for session management and encryption (installed separately from express, it used to be in bundle) */
app.use(cookieParser('whysosecret'));

/*   ***  CONNECTIC TO DATABASE   ** 
Loading Mongoose Library and connecting to the MongoDB. 
This library is very handy to deal with MongoDB using schemas */

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fudgecms');
var db = mongoose.connection;


/* View engine setup */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


/* Setting up favicon */
var favicon = require('serve-favicon');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


/* Parse utilities from express  */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


/* Instantiate session */
var session = require('express-session');
app.use (session({
    secret: 'whysosecret',
    resave: true,
    saveUninitialized: true
}));


// Creating routes to the REST API
var api = require('./routes/api');

app.use('/api', api);     /* This must be alway before app.use('/', routes). 
                          to ensure /api routes get higher priority than the others.;  */
app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


/*  Error handlers

  Development error handler
  will print stacktrace */

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

/*  Production error handler
  No stacktraces leaked to user */

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;