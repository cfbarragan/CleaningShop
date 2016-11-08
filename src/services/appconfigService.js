var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var appconfigService = function(configs) {

    var generalconfig = function() {
            var url = configs.DataBaseUrl;
            var config;
            mongodb.connect(url, function(err,db) {
                var collection = db.collection('offers');
                collection.find({}, function(err,result) {
                    return result;
                });
            });
        };

    return {
        getgeneralconfig : generalconfig,
    };
};

module.exports = appconfigService;