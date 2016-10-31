var express = require('express');
var bodyParser = require('body-parser');
// var cookieParser = require('cookie-parser');
// var passport = require('passport');
// var session = require('express-session');

var app = express();

var port = process.env.PORT || 5000;

var  nav = [{
        Link: '/Ofertas', Text: 'Ofertas'
    }, {
        Link: '/Precios', Text: 'Precios'
    },{
        Link: '/Contacto', Text: 'Contacto'}];

var  navPanel = [{
        Link: '/admin/adminPrecios', Text: 'Precios'
    }, {
        Link: '/admin/adminOfertas', Text: 'Ofertas'
    },{
        Link: '/admin/adminConfig', Text: 'Configuraciones'}];

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.set('views', './src/views');

app.set('view engine', 'ejs');

var ofertasRouter = require('./src/routes/ofertasRoutes')(nav);
var preciosRouter = require('./src/routes/preciosRoutes')(nav);
var contactoRouter = require('./src/routes/contactoRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(navPanel);

app.use('/Ofertas', ofertasRouter);
app.use('/Precios', preciosRouter);
app.use('/Contacto', contactoRouter);
app.use('/Admin', adminRouter);

app.get('/', function(req,res) {
    res.redirect('/precios');
});

app.listen(port, function(err) {
    console.log('running server on port ' + port);
});