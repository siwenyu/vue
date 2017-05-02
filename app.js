var express = require("express");
var template = require('art-template');
var app = express();

// 处理模板引擎
template.config('base', '');
template.config('extname', '.html');
app.engine('.html', template.__express);
app.set('view engine', 'html');
app.set('views', __dirname);

app.all('/update', function (req, res, next) {
    require('child_process').exec('git pull', {
        cwd: __dirname
    }, function (err) {
        if (err) {
            res.send('update cache err: ' + err.toString());
        }
        else {
            res.send('update cache.');
        }
    });
});
app.get('/', function (req, res, next) {
    res.render('./index', {
   	data:'123'
	 });
	console.log(res);
});
app.use(function (req, res, next) {
    res.end('404');
});

var server = app.listen('8888');
