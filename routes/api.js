var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Page= require('../models/page.js');
var adminUser= require('../models/admin-users.js');

// Include the bcrypt module to hash the password before storing into the database
var bcrypt = require('bcrypt-nodejs');

/* Check the user sessions */
function sessionCheck(request,response,next){
    if(request.session.user) next();
        else response.send(401,'authorization failed');
}

/* //////  CRUD ROUTES with REST http Requests [Create,Retrieve,Update,Delete // POST,GET,PUT,DELETE] \\\\\\\\\\ */

/*  INDEX OF ROUTES
    01. Retrieve Root                           /
    02. Retrieve                                /pages/
    03. Add pages                               /pages/add
    04. Update page                             /pages/update
    05. Delete page                             /pages/delete/:id
    06. Retrieve single page                    /pages/admin-details/:id
    07. Retrieve single page, SEO front-end     /pages/details/:url
    08. Create Admin user                       /add-user
    09. CREATE Login                            /login
    10. LOGOUT                                  /logout
    11. AUTHENTICATION                          /register
*/


/* 1. RETRIEVE Root */

router.get('/', function(req, res) {
	res.send('Welcome to the API zone');
});

/* 2. RETRIEVE pages. Run the find() method on the Page schema, returnning the list of pages found 
   In case of error, return error code number 500 and message */

router.get('/pages', function(request, response) {

    return Page.find(function(err, pages) {
        if (!err) {
            return response.send(pages);
        } else {
            return response.send(500, err); 
        }
    });
});


/* 3. CREATE page to our collection, since we want to pass data to the server script we'll be using a POST request */

router.post('/pages/add', function(request, response) {
	
	/* Create a new instance of our page object and pass the request parameters from our post data. */
    var page = new Page({
        /*_id: new ObjectId(), > trying to fix the bug  */
        title: request.body.title,
        url: request.body.url,
        content: request.body.content,
        menuIndex: request.body.menuIndex,
        date: new Date(Date.now())
    });
 
    /* Call the save method, which does the actual task of saving this data into the collection. */
    page.save(function(err) {
        console.log('err', err);
        if (!err) {
            return response.send(200, page);

        } else {
            return response.send(500, err);
        }
    });
});


/* 4. UPDATE an existing entry */

router.post('/pages/update', sessionCheck, function(request, response) {
    var id = request.body._id;

    Page.update({
        _id: id
    }, {
        $set: {
            title: request.body.title,
            url: request.body.url,
            content: request.body.content,
            menuIndex: request.body.menuIndex,
            date: new Date(Date.now())
        }
    }).exec();
    response.send("Page updated");
});


/* 5. DELETE an existing entry */

router.get('/pages/delete/:id', sessionCheck, function(request, response) {
    var id = request.params.id;
    Page.remove({
        _id: id
    }, function(err) {
        return console.log(err);
    });
    return response.send('Page id- ' + id + ' has been deleted');
});


/* 6. RETRIEVE the data for an individual page on the admin side. */

router.get('/pages/admin-details/:id', sessionCheck, function(request, response) {
    var id = request.params.id;
    Page.findOne({
        _id: id
    }, function(err, page) {
        if (err)
            return console.log(err);
        return response.send(page);
    });
});


/* 7. RETRIEVE the page contents for the frontend. 
We will use the URL as a parameter to fetch the data because we would like our 
frontend to show SEO-friendly URLs. */

router.get('/pages/details/:url', function(request, response) {
    var url = request.params.url;
    Page.findOne({
        url: url
    }, function(err, page) {
        if (err)
            return console.log(err);
        return response.send(page);
    });
});


// 8. CREATE a new admin user
// Start by defining our password, salt, and hash variables.
// Then, using bcrypt and salt, we generate the hash string of the password.
// Salt is optional but recommended for security

router.post('/add-user', function(request, response) {
    var salt, hash, password;
    password = request.body.password;
    salt = bcrypt.genSaltSync(10);
    hash = bcrypt.hashSync(password, salt);


/* We then create a new instance of the AdminUser object, 
store the username and hashed password, and run the save method 
to save this information in the AdminUser document in MongoDB. */

    var AdminUser = new adminUser({
        username: request.body.username,
        password: hash
    });
    AdminUser.save(function(err) {
        if (!err) {
            return response.send('Admin User successfully created');

        } else {
            return response.send(err);
        }
    });
});


/* 9. CREATE Login

We capture the username and password as variables from the post data. 
We then check to see if the username is present, and if it is, 
then using the compare method of bcrypt, we check to see if the password entered matches that stored in the database.
*/

router.post('/login', function(request, response) {
  var username = request.body.username;
  var password = request.body.password;

  adminUser.findOne({
    username: username
  }, function(err, data) {
    if (err | data === null) {
      return response.send(401, "User Doesn't exist");
    } else {
      var usr = data;

/* Once username and password match, create the user session  and redirect the user to the page's listing page. */

      if (username == usr.username && bcrypt.compareSync(password, usr.password)) {

        request.session.regenerate(function() {
          request.session.user = username;
          return response.send(username);

        });
      } else {

/* If username or password doesn't exist, return back  with a status code 401 and error message.
We will be using this status code in AngularJS side to redirect  the users in case of session time outs and so on.*/

        return response.send(401, "Bad Username or Password");
      }
    }
  });
});



/* 10. LOGOUT function will simply destroy the session. */

router.get('/logout', function(request, response) {
    request.session.destroy(function() {
        return response.send(401, 'User logged out');

    });
});

module.exports = router;