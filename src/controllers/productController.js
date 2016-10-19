var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var productController = function(navPanel) {

    var addProduct = function(req,res) {
        console.log(req.body);
        var url = 'mongodb://localhost:27017/CleanShop';
        mongodb.connect(url, function(err,db) {
                var collection = db.collection('products');
                var product = {
                    productName : req.body.productName,
                    productPrice : req.body.productPrice
                };
                collection.insert(product, function(err, results) {
                            res.redirect('/admin/adminPrecios');
                        });
            });
    };

    var getById = function(req,res) {
            var id = new ObjectId(req.params.id);
            var url = 'mongodb://localhost:27017/CleanShop';
            mongodb.connect(url, function(err,db) {
                var collection = db.collection('products');
                collection.findOne({_id:id},
                    function(err, results) {
                        if (results != null) {
                            console.log(results);
                            var product = {
                                productName : results.productName,
                                productPrice : results.productPrice
                            };
                            res.render('product', {
                                    title: 'Editar Producto',
                                    nav : navPanel,
                                    product : product,
                                });
                        }
                    });
            });
        };

    var deleteProduct = function(req,res) {
            var id = new ObjectId(req.params.id);
            var url = 'mongodb://localhost:27017/CleanShop';
            mongodb.connect(url, function(err,db) {
                var collection = db.collection('products');
                collection.remove({_id:id},
                    function(err, results) {
                        if (results != null) {
                            console.log(results);
                            var product = {
                                productName : results.productName,
                                productPrice : results.productPrice
                            };
                            res.redirect('/admin/adminPrecios');
                        }
                    });
            });
        };

    return {
        addProduct: addProduct,
        getById: getById,
        deleteProduct: deleteProduct
    };
};

module.exports = productController;