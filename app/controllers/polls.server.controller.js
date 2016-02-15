var Poll = require('mongoose').model('Poll');

exports.create = function(req,res,next) {
 
  var poll = new Poll(req.body);
  poll.save(function(err) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      res.json(poll);
    }
  });
};

exports.list = function(req,res,next) {
  Poll.find({}, function(err,polls) {
    if (err) {
      return next(err);
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
  Poll.findByIdAndUpdate(req.poll.id, req.body, function(err,poll) {
    if (err) {
      return next(err);
    } else {
      res.json(poll);
    }
  });
};

exports.delete = function(req,res,next) {
  req.poll.remove(function(err) {    
    if (err) {
      return next(err);
    } else {
      res.json(req.poll);
    };
  });
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
