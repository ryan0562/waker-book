var express = require('express'),
    app = express(),
    path = require("path"),
    bodyParser = require('body-parser'),
    multer = require('multer'),

    cons = require('consolidate'),

    routes = require('./middleware/routes');
    apply = require('./middleware/apply');
    // routes = require('./middleware/apply');

//使用ejs模板
app.engine('html', cons.ejs);

app.set('view engine', 'html');
//设置静态目录为views
app.set('views', __dirname + '/views');
//定义静态文件目录
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(multer());

//注册路由
app.use(routes);
// 注册应用级中间件
app.use(apply);

app.listen(3050);
console.log('Express server listening on port 3050');
