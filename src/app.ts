"use strict";
let express = require('express');
let cookieParser = require('cookie-parser');
let path = require('path');
let indexRouter = require('./routes/index');
let usersRoute = require('./routes/users');
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRoute);


module.exports = app;