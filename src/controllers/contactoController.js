var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var contactoController = function(contactoService, nav,configs) {
    var getIndex = function(req,res) {

            var configService = require('../services/appconfigService')(configs);
            configService.getgeneralconfig(function(err,result) {
                    res.render('contacto', {
                        title : 'Contacto' ,
                        nav: nav,
                        configs : result
                    });
                });
        };

    return {
        getIndex: getIndex,
    };
};

module.exports = contactoController;