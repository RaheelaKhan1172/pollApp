var  url = 'mongodb://localhost:27017/users',
  mongoose = require('mongoose');

module.exports = function() {
  var db = mongoose.connect(url);
  
  require('../app/models/user.server.model');    
  
  return db;
};
