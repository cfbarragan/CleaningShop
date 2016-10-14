var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var adminController = function(contactoService, navPanel) {
    var middleware = function(req,res,next) {
        // if (!req.user) {
        //     res.redirect('/');
        // }
        next();
    };
    var getAddProduct = function(req,res) {
            res.render('product', {
                title : 'Agregar Producto',
                nav: navPanel,
                products : null
            });
        };

    var getPanel = function(req, res) {
            res.render('panel', {
                title:'Panel Administrador',
                nav: navPanel,
            });
        };

    var getAdminPrecios = function(req,res) {
            var url = 'mongodb://localhost:27017/CleanShop';
            mongodb.connect(url, function(err,db) {
                var collection = db.collection('products');
                collection.find({}).toArray(function(err, results) {
                    res.render('adminPrecios', {
                        title : 'Administrar Precios' ,
                        nav: navPanel,
                        precios : results
                    });
                });
            });

            // res.render('adminPrecios', {
            //     title:'Administrar Precios',
            //     nav: navPanel,
            //     precios: null
            // });
        };

    return {
        getAddProduct: getAddProduct,
        getPanel: getPanel,
        getAdminPrecios : getAdminPrecios
    };
};

module.exports = adminController;