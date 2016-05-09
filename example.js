var sql = require('mssql');

var config = {
    user: 'user',
    password: '123456789',
    server: 'localhost\\SQLEXPRESS',
    database: 'shop',
    port: '1433'
}

sql.connect(config).then(function() {

    new sql.Request().query('SELECT * FROM Product').then(function(recordset) {
        console.log(recordset);
    }).catch(function(err) {
        console.log(err);
    });
}).catch(function(err) {
    console.log(err);
});