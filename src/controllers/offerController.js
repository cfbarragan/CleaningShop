var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;


var offerController = function(navPanel) {

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
                            res.redirect('/admin/adminOfertas');
                        });
            });
    };

    var getById = function(req,res) {
            var id = new ObjectId(req.params.id);
            var url = 'mongodb://localhost:27017/CleanShop';
            mongodb.connect(url, function(err,db) {
                var collection = db.collection('offers');
                collection.findOne({_id:id},
                    function(err, results) {
                        if (results != null) {
                            console.log(results);
                            var offer = {
                                offerName : results.offerName,
                                offerPrice : results.offerPrice,
                                offerDesc : results.offerDesc
                            };
                            res.render('offer', {
                                    title: 'Editar Promoción',
                                    nav : navPanel,
                                    offer : offer,
                                });
                        }
                    });
            });
        };

    var deleteOffer = function(req,res) {
            var id = new ObjectId(req.params.id);
            var url = 'mongodb://localhost:27017/CleanShop';
            mongodb.connect(url, function(err,db) {
                var collection = db.collection('offers');
                collection.remove({_id:id},
                    function(err, results) {
                        if (err != null) {
                            console.log(err);
                        }else {
                            res.redirect('/admin/adminOfertas');
                        }
                    });
            });
        };

    return {
        addOffer: addOffer,
        deleteOffer: deleteOffer,
        getById : getById
    };
};

module.exports = offerController;