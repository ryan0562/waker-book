var mysql = require('mysql');

function connectServer() {

    var client = mysql.createConnection({
        host: 'rdsi76878631b43m15cf.mysql.rds.aliyuncs.com',
        user: 'wakers',
        password: 'Zhouxin660269848',
        database: 'r7g25wysv2'
    })
    return client;
}

function selectFun(client, username, callback) {
    //client为一个mysql连接对象
    client.query('select password from waker where username="' + username + '"', function(err, results, fields) {
        if (err) throw err;
        callback(results);
    });
}

function insertFun(client, username, password, callback) {
    client.query('insert into waker value(?,?)', [username, password], function(err, result) {
        if (err) {
            console.log("error:" + err.message);
            return err;
        }
        callback(err);
    });
}
exports.connect = connectServer;
exports.selectFun = selectFun;
exports.insertFun = insertFun;
