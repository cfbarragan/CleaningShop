var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var viewName = 'listaPrecios';

var preciosController = function(preciosService, nav,configs) {
    var getIndex = function(req,res) {
            var url = configs.DataBaseUrl;
            mongodb.connect(url, function(err,db) {
                var collection = db.collection('products');
                var categories = db.collection('category');
                collection.find({}).toArray(function(err, results) {
                    categories.find({$where : 'this.products.length> 0'},{'_id' : 0, 'categoryName' : 1}).toArray(function(err, cats){
                        var finalCat = [];
                        cats.forEach(function(element) {
                            finalCat.push(element.categoryName.toString());
                        }, this);
                        res.render(viewName, {
                            title : 'precios' ,
                            nav: nav,
                            products : results,
                            categorias : finalCat,
                            filter: false
                        });
                    });
                });
            });
        };

    var filterByCategory = function(req, res){
        var url = configs.DataBaseUrl;
        var categoryToFilter = req.params.category;
        mongodb.connect(url, function(err,db) {
            var categories = db.collection('category');
            categories.find({categoryName: categoryToFilter, $where : 'this.products.length> 0'}).toArray(function(err, result) {
                res.render(viewName, {
                            title : 'precios' ,
                            nav: nav,
                            products : result[0].products,
                            categorias : [categoryToFilter],
                            filter : true});

            });
        });
    };

    return {
        getIndex: getIndex,
        filterByCategory : filterByCategory,
    };
};

module.exports = preciosController;