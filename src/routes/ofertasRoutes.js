var express = require('express');
var ofertasRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var router = function(nav) {
   //var bookService = require('../services/goodreadsService')();
    var ofertasController = require('../controllers/ofertasController')(null, nav);

    //ofertasRouter.use(bookController.middleware);
    ofertasRouter.route('/')
        .get(ofertasController.getIndex);

    // ofertasRouter.route('/:id')
    //    .get(bookController.getById);

    return ofertasRouter;
};

module.exports = router;

