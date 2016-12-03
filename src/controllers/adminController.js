var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var adminController = function(contactoService, navPanel,configs) {
    var middleware = function(req,res,next) {
        if (!req.user) {
            res.redirect('/login');
        }
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
                collection.find({}).toArray(function(err, results) {
                    console.log(results);
                    res.render('adminConfig', {
                        title : 'Administrar Configuraciones' ,
                        nav: navPanel,
                        config : results[0]
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

    var editInfo = function(req,res) {
            var id = new ObjectId(req.body.configId);
            var url = configs.DataBaseUrl;
            mongodb.connect(url, function(err,db) {
                var collection = db.collection('configs');
                collection.updateOne(
                {_id:id},
                    {
                        $set:
                        {
                            'phoneNumber' : req.body.phoneNumber,
                            'address': req.body.address,
                            'email': req.body.email,
                            'facebookLink': req.body.facebookLink,
                            'twiterLink':req.body.twiterLink
                        }
                    },
                    function(err, results) {
                        if (err != null) {
                            console.log(err);
                        }else {
                            res.redirect('/admin/adminConfig');
                        }
                    });
            });
        }

    return {
        getAddProduct: getAddProduct,
        getPanel: getPanel,
        getAdminPrecios : getAdminPrecios,
        getAdminOferta : getAdminOferta,
        getAdminConfig : getAdminConfig,
        editInfo: editInfo
    };
};

module.exports = adminController;