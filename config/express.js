var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  session = require('express-session'),
  flash = require('connect-flash'),
  passport = require('passport');

module.exports = function() {
  var app = express();
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(session({
    saveUninitialized:true,
    resave: true,
    secret: 'sessionSecret'
  }));

  app.set('views','./app/views');
  app.set('view engine', 'ejs');
  
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());  

  require('../app/routes/index.server.routes.js')(app);
  require('../app/routes/users.server.routes.js')(app);
  app.use(express.static('./public'));
  return app;
}
