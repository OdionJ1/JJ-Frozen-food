let routes = require('./route');
let express = require('express');
let path = require('path');
let exphbs = require('express-handlebars');
let moment = require('moment');
let session = require('express-session');
let morgan = require('morgan');
let favicon = require('serve-favicon');
let multer = require('multer');
let bodyParser = require('body-parser');
let passport = require('passport');
let setuppassport = require('./setuppassport');
let methodOverride = require('method-override');

module.exports = function (app) {
    app.use(favicon(path.join(__dirname, '../public', 'images', 'favicon.png')));
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(methodOverride('_method'));
    app.use(multer({dest: "./public/upload/temp"}).single('file'));
    app.use(session({
        secret:'jwjevbv',
        resave: 'false',
        saveUninitialized: 'false'
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    setuppassport();
    app.use('/public/', express.static(path.join(__dirname, '../public')));
    routes(app);

    app.engine('handlebars', exphbs.create({
        'defaultlayout': 'main',
        'layoutsDir': app.get('views') + '/layouts',
        'partialsDir': app.get('views') + '/partials',
        'helpers': {
            'timeago' :function(timestamp){
                return moment(timestamp).startOf('minute').fromNow();
            }
        }
    }).engine);
    app.set('view engine', 'handlebars');

    return app;
}