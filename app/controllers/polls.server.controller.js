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
  .populate('options','choice count _id')
  .exec(function(err,polls) {
      console.log('so many polls = > ', polls);
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
    
    console.log('inside the update function ', req.body,req.body.voteId);
    var poll = req.poll;
    console.log('poll =>', poll );
    if (req.body.voteId) {
        //returns the updated document with option new:true
      Option.findOneAndUpdate({'_id':req.body.voteId},{$inc: {'count':1}},{new:true},function(err,option){
         if (err) {
             return res.status(400).send({
                 message: getErrorMessage(err)
             });
         } else {
             console.log('uptopm',option);
             var found = false;
             var n = 0;
             while ( !found && (n < poll.options.length)) {
                 console.log('is this happening?' ,poll.options[n]._id,'the comparison =>', req.body.voteId);
                 if (poll.options[n]._id == req.body.voteId) {
                     console.log('does this every happen?');
                     poll.options[n].count = option.count;
                     found = true;
                 }
                 i++;
             }
          poll.save(function(err) {
              if (err) {
                  return res.status(400).send({
                      message:getErrorMessage(err)
                  })
              } else {
                  console.log('new poll -> ',poll);
                  res.json(poll);
              }
          });
         }
      });
    } else {
    Poll.findById(req.body._id).populate('options', 'choice count').exec(function(err,poll) {
    var choices = req.body.options.map(v=> v.text);
    var i = 0;
    savePoll = function(id) {
        i+=1; 
        //change this later to push until end of length
        if (i === 1) {
            poll.options.push(id);
        } else if (i === 2) {
            poll.options.push(id);
        } else {
            poll.options.push(id);
            poll.save(function(err) {
                if (err) {
                    return res.status(400).send({
                        message:getErrorMessage(err)
                    });
                } else {
                    res.json(poll);
                }
            });
        }
    };
        
    addOption = function(option) {
        var option = new Option({choice:option,poll:poll._id,count:0});
        
        option.save(function(err) {
            if (err) {
                return res.status(400).send({
                    message:getErrorMessage(err)
                });
            } else {
                savePoll(option._id);
            }
        });
    };
        
    choices.forEach(function(item) {
        addOption(item);
    });
        
});
}
}; 
     /*   var savePoll = function(id) {
            (console.log('hello againnnn',id));
            poll.options.push(id);
            poll.save(function(err) {
                if(err) {
                    return res.status(400).send({
                        message: getErrorMessage(err)
                    }); 
                } else {
                    i+=1;
                    if (i === choices.length) {
                    console.log('final poll! => ',poll);
                    res.json(poll);
                    }
                }
            });
        };*/
        
     
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
}).populate('options','choice count _id').exec(function(err,poll) {
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

