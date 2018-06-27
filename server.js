var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var user = require('./routes/user');
var db = require('./routers/hw2');

var port = 4200;

var app = express();
var connect = require('connect');
var serveStatic = require('serve-static');


//View Engine
app.set('views', path.join(__dirname, 'tests/src/'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/api', user);
app.use('/log', db);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));

});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(port, function() {
    console.log("Server started on port" + port);
});

