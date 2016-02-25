var mongoose = require('mongoose'),
  Poll = mongoose.model('Poll'),
  Option = mongoose.model('Option');

var getErrorMessage = function(err) {
  if (err.errors) {
    for (var errName in err.errors) {
      if (err.errors[errName].message) {
        return err.errors[errName].message;
      }
    }
  } else {
    return 'Unknown server error';
  }
};

exports.createOption = function(req,res) {
  var option = new Option(req.body.option);
  option.poll = req.body;

  option.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(poll);
    }
  });
};




