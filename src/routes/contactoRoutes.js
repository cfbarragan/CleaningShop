var express = require('express');
var contactoRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var router = function(nav) {
   //var bookService = require('../services/goodreadsService')();
    var contactoController = require('../controllers/contactoController')(null, nav);

    //ofertasRouter.use(bookController.middleware);
    contactoRouter.route('/')
        .get(contactoController.getIndex);

    // ofertasRouter.route('/:id')
    //    .get(bookController.getById);

    return contactoRouter;
};

module.exports = router;