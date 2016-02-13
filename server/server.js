'use strict';

var path = require('path');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var express = require('express');
var config = require('./config');

var app = express();
var http = require('http').Server(app);

app.use(express.static('./public'));

app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

nunjucks.configure(app.get('views'), {
    autoescape: true,
    express: app,
    watch: config.env == 'development'
});

// redirect all outher routes to our single page application
app.get('/*', function (req, res) {
    res.render('index.html');
});

// start server!
app.listen(config.port, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.info('√ Server ready: http://localhost:%s', config.port);
    }
});
