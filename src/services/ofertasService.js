var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var configs = require('../config/configuration.js')();
var ofertasService = function() {

    var getLastOfertas = function(err, done) {
            var url = configs.DataBaseUrl;
            mongodb.connect(url, function(err,db) {
                var collection = db.collection('offers');
                collection.find({}).limit(4).toArray(function(err, results) {
                    if (err != null){
                        done(results);
                    }
                });
            });
        };
    return {
        getLastOfertas : getLastOfertas,
    };
};

module.exports = ofertasService;