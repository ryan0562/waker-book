var client = require('./data_base/config');


function insertFun(client, callback) {
client.query('select * from musicInfo', function(err, results, fields) {
    if (err) throw err;
    
    callback(results);
});
}

exports.connect = client;
exports.insertFun = insertFun;

