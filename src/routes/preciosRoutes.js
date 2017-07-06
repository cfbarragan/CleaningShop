var express = require('express');
var preciosRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var router = function(nav,config) {

    var preciosController = require('../controllers/preciosController')(null, nav,config);

    preciosRouter.route('/')
        .get(preciosController.getIndex);

    preciosRouter.route('/:category')
       .get(preciosController.filterByCategory);

    return preciosRouter;
};

module.exports = router;