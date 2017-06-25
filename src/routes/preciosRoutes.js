var express = require('express');
var preciossRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var router = function(nav,config) {

    var preciosController = require('../controllers/preciosController')(null, nav,config);

    preciossRouter.route('/')
        .get(preciosController.getIndex);

    preciossRouter.route('/:category')
       .get(preciosController.filterByCategory);

    return preciossRouter;
};

module.exports = router;