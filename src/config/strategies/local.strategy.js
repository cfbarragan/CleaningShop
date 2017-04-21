var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongodb = require('mongodb').MongoClient;

module.exports = function(configs) {
    passport.use(new LocalStrategy({
        usernameField:'username',
        passwordField:'userpassword'
    },
    /*Verification function*/
    function(username, password, done) {
        var url = configs.DataBaseUrl;
        mongodb.connect(url, function(err,db) {
                var collection = db.collection('users');
                collection.findOne({
                    username: username}, function(err, results) {
                        if (err) {
                            return done(err);
                        }
                        if (results != null) {
                            if (results.userpassword === password) {
                                var user = results;
                                return done(null,user);
                            } else {
                                return done(null,false, {message : 'Usuario o contraseña incorrectos'});
                            }
                        }else {
                            return done(null, false, {message : 'Usuario o contraseña incorrectos'});
                        }
                    });
            });
    }));
};