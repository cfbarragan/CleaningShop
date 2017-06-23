var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var configs = require('../config/configuration.js')();

var router = function(nav,configs) {
    var adminController = require('../controllers/adminController')(null, nav,configs);
    var productController = require('../controllers/productController')(nav,configs);
    var offerController = require('../controllers/offerController')(nav,configs);
    var authController = require('../controllers/authController')();
    //adminRouter.use(authController.middleware);

    adminRouter.route('/')
     .get(adminController.getPanel);
    adminRouter.route('/panel')
        .get(adminController.getPanel);

    adminRouter.route('/addProduct')
        .get(adminController.getAddProduct)
        .post(productController.addProduct);

    adminRouter.route('/adminPrecios')
        .get(adminController.getAdminPrecios);

    adminRouter.route('/editinfo')
        .post(adminController.editInfo);

    adminRouter.route('/adminConfig')
        .get(adminController.getAdminConfig);

    adminRouter.route('/adminOfertas')
        .get(adminController.getAdminOferta);

    adminRouter.route('/product/edit/:id')
       .get(productController.getById);
    adminRouter.route('/product/edit')
       .post(productController.editProduct);

    adminRouter.route('/product/delete/:id')
       .get(productController.deleteProduct);

    adminRouter.route('/offer/edit/:id')
       .get(offerController.getById);

    adminRouter.route('/offer/edit')
       .post(offerController.editOffer);

    adminRouter.route('/offer/delete/:id')
       .get(offerController.deleteOffer);

    adminRouter.route('/addOffer')
        .post(offerController.addOffer);

    return adminRouter;
};

module.exports = router;