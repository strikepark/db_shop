var http = require('http');
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');

var config = require('../config');
var httpMsgs = require('../core/httpMsgs');
var products = require('../controllers/products');
var costumers = require('../controllers/costumers');
var orders = require('../controllers/orders');

// Express
var app = express();
app.set('port', config.get('port'));

app.engine('ejs', require('ejs-locals'));
app.set('views', __dirname + '/../templates');
app.set('view engine', 'ejs');

app.use(serveStatic(path.join(__dirname, '/../public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Routers
// Список продуктов
app.get('/products', function(req, res, next) {
    products.getProducts(req, res);
});

// Добавить продукт
app.post('/products', function(req, res, next) {
    var reqBody = '';
    req.on('data', function (data) {
        reqBody += data;
        if (reqBody.length > 1e7) {
            httpMsgs.show413(req, res, err);
        }
    });

    req.on('end', function () {
        products.addProduct(req, res, reqBody);
    });
});

// Список покупателей
app.get('/costumers', function(req, res, next) {
    costumers.getCostumers(req, res);
});

// Добавить покупателя
app.post('/costumers', function(req, res, next) {
    var reqBody = '';
    req.on('data', function (data) {
        reqBody += data;
        if (reqBody.length > 1e7) {
            httpMsgs.show413(req, res, err);
        }
    });

    req.on('end', function () {
        costumers.addCostumer(req, res, reqBody);
    });
});

// Список заказов конкретного покупателя
app.get('/orders/:id', function(req, res, next) {
    if ( isNaN(Number(req.params.id)) ) {
        console.log('Error. ID is not a number: ' + req.params.id);
    } else {
        orders.getOrders(req, res, req.params.id);
    }
});

// Добавить заказ
app.post('/orders', function(req, res, next) {
    var reqBody = '';
    req.on('data', function (data) {
        reqBody += data;
        if (reqBody.length > 1e7) {
            httpMsgs.show413(req, res, err);
        }
    });

    req.on('end', function () {
        orders.addOrder(req, res, reqBody);
    });
});

// Init Express server
http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + config.get('port'));
});

// Export Express app
module.exports = app;
