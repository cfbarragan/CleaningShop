var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var appconfigService = function(configs) {

    var generalconfig = function(done) {
            var url = configs.DataBaseUrl;
            var config;
            mongodb.connect(url, function(err,db) {
                var collection = db.collection('config');
                collection.find({}, function(err,result) {
                    if (err) {
                        console.log(err);
                        done(err,null);
                    }
                    done(null,result);
                });
            });
        };

    return {
        getgeneralconfig : generalconfig,
    };
};

module.exports = appconfigService;