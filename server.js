var mongoose = require('./config/mongoose'),
    express = require('./config/express');
    passport = require('./config/passport');

var db = mongoose();
var app = express();
var passport = passport();

app.listen(3030);

module.exports = app;

console.log('working');
