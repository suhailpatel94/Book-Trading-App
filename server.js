'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var session = require('express-session');
var bodyParser = require('body-parser');
var jwt = require('express-jwt');
var app = express();
require('dotenv').load();


mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI);

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));

app.use('/public', express.static(process.cwd() + '/public'));

app.use('/bower_components', express.static(process.cwd() + '/bower_components'));

app.use('/img', express.static(process.cwd() + '/public/img'));

app.use('/book-list', express.static(process.cwd() + '/public/book-list'));

app.use('/user-book', express.static(process.cwd() + '/public/user-book'));

app.use('/user-setting', express.static(process.cwd() + '/public/user-setting'));

app.use('/allbook-list', express.static(process.cwd() + '/public/allbook-list'));

app.use('/your-request', express.static(process.cwd() + '/public/your-request'));

app.use('/other-request', express.static(process.cwd() + '/public/other-request'));

app.use('/common', express.static(process.cwd() + '/app/common'));

app.use(session({
    secret: 'secretClementine'
    , resave: false
    , saveUninitialized: true
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


routes(app);


app.all('/*', function (req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('/public/index.html', {
        root: __dirname
    });
});

var port = process.env.PORT || 8000;
app.listen(port, function () {
    console.log('Node.js listening on port ' + port + '...');
});