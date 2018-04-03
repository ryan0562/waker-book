var mysql = require('mysql');

function connectServer() {

    var client = mysql.createConnection({
        host: 'rdsi76878631b43m15cf.mysql.rds.aliyuncs.com',
        user: 'wakers',
        password: '...',
        database: 'r7g25wysv2'
    })
    return client;
}
function insertFun(client, callback) {
client.query('select * from musicInfo', function(err, results, fields) {
    if (err) throw err;
    
    callback(results);
});
}
exports.connect = connectServer;
exports.insertFun = insertFun;

