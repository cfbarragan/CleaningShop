var express = require('express');
var ofertasRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var router = function(nav, config) {
    var ofertasController = require('../controllers/ofertasController')(null, nav, config);

    ofertasRouter.route('/')
        .get(ofertasController.getIndex);

    return ofertasRouter;
};

module.exports = router;

