var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var CORS = require("cors")

var indexRouter = require('./routes/index');
var proposalRouter = require('./routes/proposal');

var app = express(),
    port = process.env.PORT || "3000"

app.use(CORS());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/proposal', proposalRouter);

app.listen(port)