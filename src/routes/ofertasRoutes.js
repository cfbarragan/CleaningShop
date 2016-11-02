var express = require('express');
var ofertasRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var router = function(nav) {
    var ofertasController = require('../controllers/ofertasController')(null, nav);

    ofertasRouter.route('/')
        .get(ofertasController.getIndex);

    return ofertasRouter;
};

module.exports = router;

