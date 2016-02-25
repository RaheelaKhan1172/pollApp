var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PollSchema = new Schema({ 
  title: {
    type: String,
    trim: true
  },
  options: [{
    type:Schema.ObjectId,
    ref:'Option'
  }],
  creator: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Poll', PollSchema);
