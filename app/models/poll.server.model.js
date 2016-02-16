var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PollSchema = new Schema({ 
  title: {
    type: String,
    trim: true,
    required: 'Title cannot be blank'
  },
  options: [{
    option: String,
    count: Number
  }],
  creator: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Poll', PollSchema);
