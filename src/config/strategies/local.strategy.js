var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongodb = require('mongodb').MongoClient;

module.exports = function(configs) {
    passport.use(new LocalStrategy({
        usernameField:'username',
        passwordField:'userpassword'
    },
    function(username, password, done) {
        var url = configs.DataBaseUrl;
        mongodb.connect(url, function(err,db) {
                var collection = db.collection('users');
                collection.findOne({
                    username: username}, function(err, results) {
                        if (results != null) {
                            if (results.userpassword === password) {
                                var user = results;
                                done(null,user);
                            } else {
                                done(null,false, {message : 'Usuario o contraseña incorrectos'});
                            }
                        }else {
                            done(null, false, {message : 'Usuario o contraseña incorrectos'});
                        }
                    });
            });
    }));
};