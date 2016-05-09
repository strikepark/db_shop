var mssql = require('mssql');
var config = require('../config');

module.exports.executeSql = function (sql, callback) {

    var conn = new mssql.Connection(config.get('db'));
    conn.connect().then(function () {
        var req = new mssql.Request(conn);
        req.query(sql).then(function (recordset) {
            callback(recordset);
        }).catch(function (err) {
            console.log(err);
            callback(null, err);
        });
    }).catch(function(err) {
        console.log(err);
        callback(null, err);
    });
};