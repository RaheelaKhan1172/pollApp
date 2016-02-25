var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var optionSchema = new Schema({ 
  poll: {
    type: Schema.ObjectId,
    ref: 'Poll'
  },
  count:Number,
  choice:String
});

 mongoose.model('Option',optionSchema);
