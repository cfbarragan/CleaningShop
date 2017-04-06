var express = require('express');
var initRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var router = function(nav, config) {
    var initController = require('../controllers/initController')(null, nav, config);

    initRouter.route('/')
        .get(initController.getIndex);

    return initRouter;
};

module.exports = router;
