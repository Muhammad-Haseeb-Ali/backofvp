var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors")

var indexRouter = require('./routes/index');
var proposalRouter = require('./routes/proposal');

var app = express(),
    port = process.env.PORT || "3000"

    
app.use(cors)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/proposal', proposalRouter);

app.listen(port)