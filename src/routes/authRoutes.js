var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');
var flash = require('connect-flash');
var configs = require('../config/configuration.js')();

var router = function(nav) {
    authRouter.route('/login')
    .get(function(req,res) {
        res.render('login',
            {
                message : req.flash('error'),
                nav : nav
            });
    })
    .post(passport.authenticate('local', {
        failureRedirect : '/auth/login', failureFlash: true
    }), function(err,res) {
        res.redirect('/admin/panel');
    });
    return authRouter;
};

module.exports = router;