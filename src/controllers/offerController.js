var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var offerController = function(navPanel,configs) {

    var addOffer = function(req,res) {
        console.log(req.body);
        var url = configs.DataBaseUrl;
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
            var url = configs.DataBaseUrl;
            mongodb.connect(url, function(err,db) {
                var collection = db.collection('offers');
                collection.findOne({_id:id},
                    function(err, results) {
                        if (results != null) {
                            console.log(results);
                            var offer = {
                                id : id,
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
            var url = configs.DataBaseUrl;
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

    var editOffer = function(req, res) {
        var id = new ObjectId(req.body.offerId);
        var url = configs.DataBaseUrl;
        var desc = req.body.offerDesc;
        var price = req.body.offerPrice;
        mongodb.connect(url, function(err,db) {
            var collection = db.collection('offers');
            collection.updateOne(
                {_id: id},
                {
                    $set :
                    {
                        'offerDesc' : desc,
                        'offerPrice' : price
                    }
                }, function(err, result) {
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
        getById : getById,
        editOffer: editOffer
    };
};

module.exports = offerController;