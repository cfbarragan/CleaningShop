var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');
var configs = require('../config/configuration.js')();

var router = function() {
    authRouter.route('/login')
    .get(function(req,res) {
        var algo = res;
        res.render('login', {message : req.session.message});
    })
    .post(passport.authenticate('local', {
        failureRedirect : '/auth/login',
    }), function(err,res) {
        res.redirect('/admin/panel');
    });
//    .post(function(req,res,next) {
//         passport.authenticate('local',{session : false}, function(err, user, info) {
//                 if (err) { return next(err); }
//                 if (!user) { return res.redirect('/login'); }
//                 req.logIn(user, function(err) {
//                     if (err) {return next(err);}
//                     return res.redirect('/admin/panel');
//                 }) (req, res, next);
//             });
//     });

    return authRouter;
};

module.exports = router;