var express = require('express');
// var bodyParser = require('body-parser');
// var cookieParser = require('cookie-parser');
// var passport = require('passport');
// var session = require('express-session');

var app = express();

var port = process.env.PORT || 3000;

var  nav = [{
        Link: '/Ofertas', Text: 'Ofertas'
    }, {
        Link: '/Precios', Text: 'Precios'
    },{
        Link: '/Contacto', Text: 'Contacto'}];

app.use(express.static('public'));

app.set('views', './src/views');

app.set('view engine', 'ejs');

var ofertasRouter = require('./src/routes/ofertasRoutes')(nav);
var preciosRouter = require('./src/routes/preciosRoutes')(nav);
var contactoRouter = require('./src/routes/contactoRoutes')(nav);

app.use('/Ofertas', ofertasRouter);
app.use('/Precios', preciosRouter);
app.use('/Contacto', contactoRouter);

app.get('/', function(req,res) {
    res.render('precios', {
        title : 'precios' ,
        nav : nav
    });
});

app.listen(port, function(err) {
    console.log('running server on port ' + port);
});