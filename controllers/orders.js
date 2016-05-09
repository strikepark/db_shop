var db = require('../core/db');
var httpMsgs = require('../core/httpMsgs');

// Список заказов пользователя
module.exports.getOrders = function (req, res, costumerId) {
    var sql = 'SELECT o.Name as OrderName, p.Name as ProductName, o.[Count], o.[Success] as OrderStatus ' +
	    'FROM Costumer c ' +
	    'JOIN [Order] o ON c.CostumerId = o.CostumerId ' +
	    'JOIN [Product] p ON o.ProductId = p.ProductId ' +
	    'WHERE c.CostumerId = ' + costumerId +
	    ' GROUP BY o.Name, p.Name, o.[Count], o.[Success]';

    db.executeSql(sql, function (data, err) {
        if (!err) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(data));
            res.end();
        } else {
            httpMsgs.show500(req, res, err);
        }
    });
};

// Добавить заказ
module.exports.addOrder = function (req, res, reqBody) {
    if (!reqBody) {
        console.log('Error. reqBody is undefined');
    } else {
        var data = JSON.parse(reqBody);
        if (data) {
            var sql = "INSERT INTO [Order] ([Name], [CostumerId], [ProductId], [Count]) VALUES " +
                "('" + data.name + "'" + "," + data.costumer_id + "," + data.product_id + "," + data.count + ")";

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