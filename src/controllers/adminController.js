var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var configs = require('../config/configuration.js')();

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

    var getAdminOferta = function(req,res) {
            var url = configs.DataBaseUrl;
            mongodb.connect(url, function(err,db) {
                var collection = db.collection('offers');
                collection.find({}).toArray(function(err, results) {
                    res.render('adminOfertas', {
                        title : 'Administrar Ofertas' ,
                        nav: navPanel,
                        ofertas : results
                    });
                });
            });
        };

    var getAdminConfig = function(req,res) {
            var url = configs.DataBaseUrl;
            mongodb.connect(url, function(err,db) {
                var collection = db.collection('configs');
                collection.find({}).toArray(function(err, result) {
                    res.render('adminConfig', {
                        title : 'Administrar Configuraciones' ,
                        nav: navPanel,
                        config : result
                    });
                });
            });
        };

    var getAdminPrecios = function(req,res) {
            var url = configs.DataBaseUrl;
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
        };

    return {
        getAddProduct: getAddProduct,
        getPanel: getPanel,
        getAdminPrecios : getAdminPrecios,
        getAdminOferta : getAdminOferta,
        getAdminConfig :     getAdminConfig
    };
};

module.exports = adminController;