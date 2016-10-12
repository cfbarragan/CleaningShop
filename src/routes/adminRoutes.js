var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var products = [
        {
            productName: 'Cloro x 1Lts',
            productPrice: 10,
        },
        {
            productName: 'Jabon Ariel x 5Lts',
            productPrice: 85,
        },
        {
            productName: 'Escoba',
            productPrice: 35,
        },
        {
            productName: 'Escoba',
            productPrice: 45,
        },
        {
            productName: 'Escoba',
            productPrice: 55,
        },
        {
            productName: 'Escoba',
            productPrice: 65,
        },
        {
            productName: 'Escoba',
            productPrice: 85,
        },
    ];

var router = function(nav) {
   //var bookService = require('../services/goodreadsService')();
    var adminController = require('../controllers/adminController')(null, nav);

    //ofertasRouter.use(bookController.middleware);
    adminRouter.route('/addProduct')
        .get(adminController.getAddProduct);

    // ofertasRouter.route('/:id')
    //    .get(bookController.getById);

    adminRouter.route('/addData')
        .get(function(req,res) {
            var url = 'mongodb://localhost:27017/CleanShop';
            mongodb.connect(url, function(err,db) {
                var collection = db.collection('products');
                collection.insertMany(products, function(err, results) {
                    res.send(results);
                    db.close();
                });
            });
        });

    return adminRouter;
};

module.exports = router;