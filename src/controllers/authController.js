var authcontroller = function() {
    var middleware = function(req,res,next) {
        if (!req.user) {
            res.redirect('/auth/login');
        }
        next();
    };
    return {
        middleware : middleware
    };
};

module.exports = authcontroller;