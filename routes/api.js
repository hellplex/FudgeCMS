var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Page= require('../models/page.js');
var adminUser= require('../models/admin-users.js');


/* //////  CRUD User Routes \\\\\\\\\\ */

router.get('/', function(req, res) {
	res.send('Welcome to the API zone');
});

/* Run the find() method on the Page schema, returnning the list of pages found 
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


/* CREATE page to our collection, since we want to pass data to the server script we'll be using a POST request */

router.post('/pages/add', function(request, response) {
	
	/* Create a new instance of our page object and pass the request parameters from our post data. */
    var page = new Page({
        title: request.body.title,
        url: request.body.url,
        content: request.body.content,
        menuIndex: request.body.menuIndex,
        date: new Date(Date.now())
    });
 
    /* Call the save method, which does the actual task of saving this data into the collection. */
    page.save(function(err) {
        if (!err) {
            return response.send(200, page);

        } else {
            return response.send(500, err);
        }
    });
});


/* UPDATE an existing entry */

router.post('/pages/update', function(request, response) {
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


/* DELETE an existing entry */

router.get('/pages/delete/:id', function(request, response) {
    var id = request.params.id;
    Page.remove({
        _id: id
    }, function(err) {
        return console.log(err);
    });
    return response.send('Page id- ' + id + ' has been deleted');
});


/* RETRIEVE the data for an individual page on the admin side. */

router.get('/pages/admin-details/:id', function(request, response) {
    var id = request.params.id;
    Page.findOne({
        _id: id
    }, function(err, page) {
        if (err)
            return console.log(err);
        return response.send(page);
    });
});


module.exports = router;