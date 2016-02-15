var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PollSchema = new Schema({ 
  title: String
});

mongoose.model('Poll', PollSchema);
