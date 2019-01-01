var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var Company = require('./controller/data.js');
var  template= require("./controller/template.js");
var  worksheet= require("./controller/worksheet.js");
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/template/create', template.create);
app.post('/template/add', template.add);
app.get('/template', template.display);
app.get('/template/update/:id',template.update);
app.post('/template/updated/:id',template.updated);
app.get('/template/delete/:id',template.delete);

app.get('/worksheet/',worksheet.display);
app.get('/worksheet/create',worksheet.create);
app.post('/worksheet/add',worksheet.add);
app.get('/worksheet/update/:id',worksheet.update);
app.post('/worksheet/updated/:id',worksheet.updated);

app.get('/worksheet/delete/:id',worksheet.delete);

module.exports = app;
app.listen(8080);