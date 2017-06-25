var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;


var productController = function(navPanel,configs) {

    var addProduct = function(req,res) {
        var url = configs.DataBaseUrl;
        mongodb.connect(url, function(err,db) {
                var collection = db.collection('products');
                var categories = db.collection('category');
                var tags = req.body.productTags.substring(0, req.body.productTags.length - 2);
                var cat = tags.split(',');
                var product = {
                    productName : req.body.productName,
                    productPrice : req.body.productPrice,
                    productCategory : cat
                };
                collection.insert(product, function(err, results) {
                            if (err != null){

                            }
                            var category = {
                                categoryName : req.body.productCategory,
                                products : product
                            };
                            var cant = cat.length;
                            var i = 0;
                            var errors = [];
                            for (var index = 0; index < cant; index++) {
                                categories.findAndModify({
                                            categoryName: cat[index]},{categoryName:1},
                                         {
                                        $push: {
                                            products : product}
                                    },
                                    {upsert: true}, // insert the document if it does not exist
                                    function(err, results) {
                                        if (err){
                                            errors.push(err);
                                        }
                                        i++;
                                        if (i == cant){
                                            res.redirect('/admin/adminPrecios');
                                        }
                                    });
                            }
                        });
            });
    };

    var getById = function(req,res) {
            var id = new ObjectId(req.params.id);
            var url = configs.DataBaseUrl;
            mongodb.connect(url, function(err,db) {
                var collection = db.collection('products');
                collection.findOne({_id:id},
                    function(err, results) {
                        if (results != null) {
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
            var url = configs.DataBaseUrl;
            mongodb.connect(url, function(err,db) {
                var collection = db.collection('products');
                var categories = db.collection('category');
                collection.updateMany(
                    {_id:id},
                    {
                        $set:
                        {
                            'productPrice' : price
                        }
                    },
                    function(err, results) {
                        if (err != null) {

                        }else {
                            categories.updateMany(
                                {'products._id': id},
                                    {'$set': {
                                        'products.$.productPrice' : price
                                    }
                            }, function(err, results) {
                                    res.redirect('/admin/adminPrecios');
                                });
                        }
                    });
            });
        };

    var deleteProduct = function(req,res) {
            var id = new ObjectId(req.params.id);
            var url = configs.DataBaseUrl;
            mongodb.connect(url, function(err,db) {
                var collection = db.collection('products');
                var categories = db.collection('category');
                collection.remove({_id:id},
                    function(err, results) {
                        if (err != null) {
                            res.redirect('/admin/adminPrecios');
                        }else {
                            categories.updateMany(
                                {'products._id': id},
                                    {'$pull': {
                                        'products' :{'_id': id}
                                    }
                            }, function(err, results) {
                                    res.redirect('/admin/adminPrecios');
                                });
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