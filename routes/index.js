var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* Define the routes in our ExpressJS app for routes to be managed by AngularJS, 
except for those that start with a/api/

Catch-all route */
router.get('*', function(request, response) {
    response.sendFile('./public/index.html');
});

module.exports = router;