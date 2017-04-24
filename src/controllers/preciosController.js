var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var viewName = 'listaPrecios';

var preciosController = function(preciosService, nav,configs) {
    var middleware = function(req,res,next) {
        // if (!req.user) {
        //     res.redirect('/');
        // }
        next();
    };
    var getIndex = function(req,res) {
            var url = configs.DataBaseUrl;
            mongodb.connect(url, function(err,db) {
                var collection = db.collection('products');
                collection.find({}).toArray(function(err, results) {
                    res.render(viewName, {
                        title : 'precios' ,
                        nav: nav,
                        products : results
                    });
                });
            });
        };

    return {
        getIndex: getIndex,
        // getById: getById,
        // middleware : middleware
    };
};

module.exports = preciosController;