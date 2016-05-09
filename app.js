'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var config = require('./config');
var log = require('./libs/log')(module);
var morgan = require('morgan');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');

var app = express();
app.set('port', config.get('port'));

app.engine('ejs', require('ejs-locals'));
app.set('views', __dirname + '/templates');
app.set('view engine', 'ejs');

if (app.get('env') == 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('default'));
}

app.use(bodyParser());

app.get('/', function(req, res, next) {
    res.render('index');
});

app.use(serveStatic(path.join(__dirname, 'public')));

http.createServer(app).listen(app.get('port'), function() {
    log.info('Express server listening on port ' + config.get('port'));
});