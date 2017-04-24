var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var ofertasController = function(ofertasService,nav,configs) {
    var middleware = function(req,res,next) {
        // if (!req.user) {
        //     res.redirect('/');
        // }
        next();
    };
    var getIndex = function(req,res) {

            var url = configs.DataBaseUrl;
            mongodb.connect(url, function(err,db) {
                var collection = db.collection('offers');
                collection.find({}).toArray(function(err, results) {
                    res.render('listaPromos', {
                        title : 'Promociones' ,
                        nav: nav,
                        ofertas : results
                    });
                });
            });
        };

    return {
        getIndex: getIndex,
    };
};

module.exports = ofertasController;