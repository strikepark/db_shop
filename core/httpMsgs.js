var app = require('../core/server')

module.exports.show500 = function (req, res, err) {
    res.writeHead(500, 'Internal Error occurred', { 'Content-Type': 'text/html' });
    res.write('<html><head><title>500</title></head><body>500: Internal Error. Details: ' + err + '</body></html>');
    res.end();
    // resp.render('error', {
    //     errorNumber: '500',
    //     errorName: 'Internal Server Error',
    //     error: err
    // });
};

module.exports.show413 = function (req, res, err) {
    res.writeHead(413, 'Request Entity Too Large', { 'Content-Type': 'text/html' });
    res.write('<html><head><title>413</title></head><body>413: Request Entity Too Large. Details: ' + err + '</body></html>');
    res.end(); 
    // resp.render('error', {
    //     errorNumber: '500',
    //     errorName: 'Internal Server Error',
    //     error: err
    // });
};