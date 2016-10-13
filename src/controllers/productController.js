var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;


var productController = function() {

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
                            res.redirect('/admin/addProduct');
                        });
            });
    };

    return {
        addProduct: addProduct,
        // getById: getById,
        // middleware : middleware
    };
};

module.exports = productController;