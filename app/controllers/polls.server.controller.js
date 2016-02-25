var mongoose = require('mongoose'),
  Poll = mongoose.model('Poll'),
  Option = mongoose.model('Option'),
  User = mongoose.model('User');
  

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
  var poll = new Poll({title:req.body.title,creator:req.user.id});
  var i = 0;
      req.body.options.forEach(function(a) {
        var option = new Option({choice:a.text,poll:poll._id,count:0});
        poll.options.push(option._id);
        option.save(function(err) {
            if (err) {
                return res.status(400).send({
                    message:getErrorMessage(err)
                });
            } else {
                poll.save(function(err) {
                    if (err) {
                        return res.status(400).send({
                            message:getErrorMessage(err)
                        });
                    } else {
                        i+=1;
                        if (i === req.body.options.length) {
                            res.json(poll);
                        }
                    }
                });
            }
        });
      });
/*  poll.options = option._id;
    console.log('poll options  ', poll.options,'done')
  option.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
        poll.save(function(err) {
            if (err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.json(poll);
            }
        });
    }
  });*/
    //because option currently referes to a single object(schema), i will recieve only a single object 
};

exports.list = function(req,res,next) {
  Poll.find({})
  .populate('options','choice count')
  .exec(function(err,polls) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
            //polls is an array
        res.json(polls);
    }   
  });
};

exports.read = function(req,res) {
    console.log(' poll in read function =>',req.poll);
  res.json(req.poll);
};

exports.update = function(req,res,next) {
   
    var poll = req.poll;
    console.log('the options =>', poll.options);
    console.log('the requset body ',req.body, 'length =>', req.body.options.length);
    var i = 0;
    var k = 0;
    req.body.options.forEach(function(item) {
        var option = new Option({choice:item.text,poll:poll._id,count:0});
        console.log('options inside loop => ',option);
        option.save(function(err) {
            if (err) {
                return res.status(400).send({
                    message:getErrorMessage(err)
                });
            } else {
                k+=1;
                console.log(' k ', k);
                if (k) {
                    poll.options.push(option._id)
                    poll.save(function(err) {
                        if (err) {
                            return res.status(400).send({
                                message:getErrorMessage(err)
                            });
                        } else {
                            i += 1;
                            if (i === req.body.options.length) {
                                res.json(poll);
                            }
                        }
                    });
                }
        };
    });
    });
  /*  poll.options.forEach(function(item) {
        console.log('the item text',item.text);
       var option = new Option({choice:item.text, poll:poll._id, count:0});
        poll.options.push(option._id);
        console.log('option in loop =>',option, 'pool in loop =>' ,poll);
        option.save(function(err) {
            if (err) {
                return res.status(400).send({
                    message:getErrorMessage(err)
                });
            } else {
                poll.save(function(err) {
                    if (err) {
                        return res.status(400).send({
                            message:getErrorMessage(err)
                        });
                    } else {
                        i+=1;
                        if (i === req.body.options.length) {
                            console.log('poll ', poll);
                            res.json(poll);
                        }
                    }
                });
            }
        });
      }); */
    };
/*    option.save(function(err) {
     if (err) {
      return res.status(400).send({
        message:getErrorMessage(err)
      });
    } else {
        poll.save(function(err) {
            if (err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                console.log(' saved poll=>',poll)
                res.json(poll); 
            }
        });
    }
  });
};*/ 
 
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
    var i = 0;
Poll.findOne({
  _id:id
}).populate('options','choice count').exec(function(err,poll) {
  if (err) return next(err);
  if (!poll) {
    return next(new Error('Failed to load poll :  ' + id));
  }
    i+=1;
    console.log('the poll in request before being sent =>  ', poll, 'i ',i);
  req.poll = poll;
  next();
  });
};

/*  Poll.findById(id).populate('options', 'option').exec(function(err,poll) {
    if(err) return next(err);
    if (!poll) {
      return next(new Error('Failed to load poll' + id));
    }
    req.poll = poll;
    next();
  }); */

