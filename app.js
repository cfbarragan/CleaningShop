var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var app = express();

var port = process.env.PORT || 5000;
var dataBaseUrl = process.env.DATABASE_URL ;
//var dataBaseUrl = 'mongodb://@localhost:27017/CleanShop';

var configs = require('./src/config/configuration.js')(dataBaseUrl);
var  nav = [{
        Link: '/', Text: 'Inicio'
    },{
        Link: '/Ofertas', Text: 'Promociones'
    }, {
        Link: '/Precios', Text: 'Precios'
    },{
        Link: '/Contacto', Text: 'Contacto'}];

var  navPanel = [{
        Link: '/admin/adminPrecios', Text: 'Precios'
    }, {
        Link: '/admin/adminOfertas', Text: 'Promociones'
    },{
        Link: '/admin/adminConfig', Text: 'Configuraciones'}];

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({
    secret:'eldique',
    resave: true,
    saveUninitialized: true
}));

require('./src/config/passport')(app,configs);
app.set('views', './src/views');

app.set('view engine', 'ejs');

var ofertasRouter = require('./src/routes/ofertasRoutes')(nav,configs);
var preciosRouter = require('./src/routes/preciosRoutes')(nav,configs);
var contactoRouter = require('./src/routes/contactoRoutes')(nav,configs);
var adminRouter = require('./src/routes/adminRoutes')(navPanel,configs);
var authRouter = require('./src/routes/authRoutes')(configs);
var initRouter = require('./src/routes/initRoutes')(nav,configs);

app.use('/Ofertas', ofertasRouter);
app.use('/Precios', preciosRouter);
app.use('/Contacto', contactoRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);
app.use('/', initRouter);

app.listen(port, function(err) {
    console.log('running server on port ' + port);
    console.log(dataBaseUrl);
});