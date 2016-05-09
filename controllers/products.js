var db = require('../core/db');
var httpMsgs = require('../core/httpMsgs');
var app = require('../core/server');

// Список продуктов
module.exports.getProducts = function (req, res) {
    db.executeSql('SELECT * FROM Product', function (data, err) {
        if (!err) {
            res.render('products', {
                products: JSON.stringify(data)
            });
        } else {
            httpMsgs.show500(req, res, err);
        }
    });
};

// Добавить продукт
module.exports.addProduct = function (req, res, reqBody) {
    if (!reqBody) {
        console.log('Error. reqBody is undefined');
    } else {
        var data = JSON.parse(reqBody);
        if (data) {
            var sql = "INSERT INTO [Product] ([Name], [Price], [Count]) VALUES " +
                "('" + data.name + "'" + "," + data.price + "," + data.count + ")";

            db.executeSql(sql, function (data, err) {
                if (!err) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end();
                } else {
                    httpMsgs.show500(req, res, err);
                }
            });
        } else {
            console.log('Error. Data is undefined');
        }
    }
};