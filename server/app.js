var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var router = require('./routes/appV1');

const cors = require('cors');

var app = express();

// For parsing application/json
app.use(express.json());
app.use(cors());
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/v1', router);

app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build'));
});

module.exports = app;
