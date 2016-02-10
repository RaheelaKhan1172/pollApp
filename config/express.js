var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override');

module.exports = function() {
  var app = express();
  app.use(bodyParser.urlencoded({extended:true}));
  app.set('views','./app/views');
  app.set('view engine','ejs');
  require('../app/routes/index.server.routes.js')(app);
  app.use(express.static('./public'));
  return app;
}
