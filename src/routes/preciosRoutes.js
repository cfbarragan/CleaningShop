var express = require('express');
var preciossRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var router = function(nav,config) {
    //var bookService = require('../services/goodreadsService')();
    var ofertasController = require('../controllers/preciosController')(null, nav,config);

    //ofertasRouter.use(bookController.middleware);
    preciossRouter.route('/')
        .get(ofertasController.getIndex);

    // ofertasRouter.route('/:id')
    //    .get(bookController.getById);

    return preciossRouter;
};

module.exports = router;