var polls = require('../../app/controllers/polls.server.controller');

module.exports = function(app) {
  app.route('/polls')
    .post(polls.create)
    .get(polls.list);

  app.route('/polls/:id') 
    .get(polls.read);
    .put(polls.update);
    .delete(polls.delete);

  app.param('id', polls.pollByID);
};
