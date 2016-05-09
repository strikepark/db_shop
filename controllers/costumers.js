var db = require('../core/db');
var httpMsgs = require('../core/httpMsgs');
var app = require('../core/server');

// Список покупателей
module.exports.getCostumers = function (req, res) {
    db.executeSql('SELECT * FROM Costumer', function (data, err) {
        if (!err) {
            res.render('costumers', {
                costumers: JSON.stringify(data)
            });
        } else {
            httpMsgs.show500(req, res, err);
        }
    });
};

// Добавить покупателя
module.exports.addCostumer = function (req, res, reqBody) {
    if (!reqBody) {
        console.log('Error. reqBody is undefined');
    } else {
        var data = JSON.parse(reqBody);
        if (data) {
            var sql = "INSERT INTO [Costumer] ([Name], [Phone]) VALUES " +
                "('" + data.name + "'" + "," + data.phone + ")";

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