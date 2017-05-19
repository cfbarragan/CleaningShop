var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    passwordHash = require('password-hash'),
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
                           // var verify = passwordHash.verify(password, results.userpassword);
                            var verify =  results.userpassword == password;
                            if (verify) {
                                var user = results;
                                return done(null,user);
                            } else {
                                return done(null,false, {message : 'Usuario o contraseña incorrecto'});
                            }
                        }else {
                            return done(null, false, {message : 'Usuario o contraseña incorrecto'});
                        }
                    });
            });
    }));
};