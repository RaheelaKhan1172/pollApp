var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PollSchema = new Schema({ 
  title: {
    type:String,
    required:true
  },
  author: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  options: [{type: Schema.ObjectId, ref: 'Option'}]
});

mongoose.model('Poll', PollSchema);
