var mongoose = require('mongoose'),
  Poll = mongoose.model('Poll');


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

exports.create = function(req,res,next) {
 
  var poll = new Poll(req.body);
  poll.creator = req.user;

  poll.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(poll);
    }
  });
};

exports.list = function(req,res,next) {
  Poll.find({}, function(err,polls) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      console.log(polls);
      res.json(polls);
    }   
  });
};

exports.read = function(req,res) {
  res.json(req.poll);
};

exports.update = function(req,res,next) {
  var poll = req.poll;
  poll.title = req.body.title;
  poll.option = req.body[options].option;

  poll.save(function(err) {
    if (err) {
      return res.status(400).send({
        message:getErrorMessage(err)
      });
    } else {
      res.json(poll);
    }
  });
};
/*  Poll.findByIdAndUpdate(req.poll.id, req.body, function(err,poll) {
    if (err) {
      return next(err);
    } else {
      res.json(poll);
    }
  });
};*/

exports.delete = function(req,res,next) {
  var poll = req.poll;

  poll.remove(function(err) {    
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(req.poll);
    };
  });
};

exports.hasAuthorization = function(req,res,next) {
  if (req.poll.creator.id !== req.user.id) {
    return res.status(403).send({
      message: 'User is not authorized'
    });
  }
  next();
};

exports.pollByID = function(req,res,next,id) {
  Poll.findOne({
    _id:id
  }, function(err,poll) {
    if (err) {
      return next(err);
    } else {
      req.poll = poll;
      next();
    }
  });
};

