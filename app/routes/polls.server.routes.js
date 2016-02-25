
var users = require('../../app/controllers/users.server.controller'),
  polls = require('../../app/controllers/polls.server.controller'),
  index = require('../../app/controllers/index.server.controller');

module.exports = function(app) {
  app.route('/polls')
    .post(users.requiresLogin, polls.create)
    .get(polls.list);
    
  app.route('/polls/:id') 
    .get(polls.read)
    .put(users.requiresLogin, polls.update)
    .delete(users.requiresLogin, polls.hasAuthorization, polls.delete);

  app.param('id', polls.pollByID);
};
