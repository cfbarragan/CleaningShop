var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');
var configs = require('../config/configuration.js')();

var router = function() {
    authRouter.route('/login')
    .get(function(req,res) {
        res.render('login', null);
    })
    .post(passport.authenticate('local', {
        failureRedirect : '/auth/login',
    }), function(err,res) {
        res.redirect('/admin/panel');
    });

    return authRouter;
};

module.exports = router;