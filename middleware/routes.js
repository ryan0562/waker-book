var express = require('express');
var router = express.Router();
var usr = require('../data_base/config');
var musicInfo = require('../data_base/musicInfo');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', {
        title: 'waker\'s music'
    });
});

router.route('/login')
    .get(function(req, res) {
        res.render('login', {
            title: '用户登录'
        });
    })
    .post(function(req, res) {
        client = usr.connect();
        result = null;
        usr.selectFun(client, req.body.username, function(result) {
            console.log(result[0]);
            if (result[0] === undefined) {
                res.send('没有该用户');
            } else {
                if (result[0].password == req.body.password) {
                    req.flash("name", req.body.password)
                        // password = result[0].password;
                } else {
                    res.redirect('/login');
                }
            }
        });
    });

router.route('/register')
    .get(function(req, res) {
        res.render('register', {
            title: '用户注册'
        });
    })
    .post(function(req, res) {
        client = usr.connect();
        usr.insertFun(client, req.body.username, req.body.password, function(err) {
            if (err) throw err;
            res.send('注册成功');
        });
    });

router.get('/logout', function(req, res) {
    res.redirect('/');
});

router.get('/home', function(req, res) {
    var user = {
        username: 'admin',
        password: '123456'
    };
    res.render('home', {
        title: 'Home',
        user: user
    });
});

router.route('/musicList')
    .get(function(req, res) {
        res.render('musicList', {
            title: '音乐列表'
        });
    });

router.route('/a')
    .get(function(req, res) {
        res.render('a');
    });

module.exports = router;
