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
                                id: id,
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

    var editProduct = function(req,res) {
            var id = new ObjectId(req.body.productId);
            var price =  req.body.productPrice;
            var url = 'mongodb://localhost:27017/CleanShop';
            mongodb.connect(url, function(err,db) {
                var collection = db.collection('products');
                collection.updateOne(
                    {_id:id},
                    {
                        $set:
                        {
                            'productPrice' : price
                        }
                    },
                    function(err, results) {
                        if (err != null) {
                            console.log(err);
                        }else {
                            res.redirect('/admin/adminPrecios');
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
        deleteProduct: deleteProduct,
        editProduct: editProduct
    };
};

module.exports = productController;