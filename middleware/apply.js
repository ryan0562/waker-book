var express = require('express');
var router = express.Router();
var musicInfo = require('../data_base/musicInfo');

//音乐列表
router.route('/musicListData')
    .get(function(req, res) {
        client = musicInfo.connect();
        musicInfo.insertFun(client, function(result) {
            res.send(result);
        });
    })
    
module.exports = router;

