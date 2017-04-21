var passport = require('passport');

module.exports = function(app,configs) {
    app.use(passport.initialize());
    app.use(passport.session());

    require('./strategies/local.strategy')(configs);
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
};