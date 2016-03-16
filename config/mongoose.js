var  url = process.env.PROD_DB,
  mongoose = require('mongoose');

module.exports = function() {
  var db = mongoose.connect(url);
  
  require('../app/models/user.server.model');    
  require('../app/models/poll.server.model'); 
  require('../app/models/option.server.model'); 
  return db;
};
