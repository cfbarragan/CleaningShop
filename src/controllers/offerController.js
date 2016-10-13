var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;


var offerController = function() {

    var addOffer = function(req,res) {
        console.log(req.body);
        var url = 'mongodb://localhost:27017/CleanShop';
        mongodb.connect(url, function(err,db) {
                var collection = db.collection('offers');
                var offer = {
                    offerName : req.body.offerName,
                    offerPrice : req.body.offerPrice,
                    offerDesc: req.body.offerDesc
                };
                collection.insert(offer, function(err, results) {
                            res.redirect('/admin/addProduct');
                        });
            });
    };

    return {
        addOffer: addOffer,
        // getById: getById,
        // middleware : middleware
    };
};

module.exports = offerController;