var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var contactoController = function(contactoService, nav,configs) {
    var middleware = function(req,res,next) {
        // if (!req.user) {
        //     res.redirect('/');
        // }
        next();
    };
    var getIndex = function(req,res) {
            res.render('contacto', {
                        title : 'Contacto' ,
                        nav: nav,
                        books : null
                    });
            // var url = 'mongodb://localhost:27017/libraryApp';
            // mongodb.connect(url, function(err,db) {
            //     var collection = db.collection('books');
            //     collection.find({}).toArray(function(err, results) {
            //         res.render('bookListView', {
            //             title : 'Books' ,
            //             nav: nav,
            //             books : results
            //         });
            //     });
            // });
        };

    return {
        getIndex: getIndex,
        // getById: getById,
        // middleware : middleware
    };
};

module.exports = contactoController;