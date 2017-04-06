var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var ofertasService = require('../services/ofertasService.js')();

var initController = function(initService,nav,configs) {

    var getIndex = function(req, res){
            var url = configs.DataBaseUrl;
            mongodb.connect(url, function(err,db) {
                var collection = db.collection('offers');
                collection.find({}).sort({_id:-1}).limit(4).toArray(function(err, ofertas) {
                    //console.log(ofertas);
                    res.render('init', {
                        title : 'Ls Limpieza' ,
                        nav: nav,
                        ofertas : ofertas
                    });
                });
            });
    }

    return {
        getIndex : getIndex,
    };
};

module.exports = initController;