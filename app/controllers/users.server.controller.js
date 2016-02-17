var User = require('mongoose').model('User'),
  passport = require('passport');

var getErrorMessage = function(err) {
  var message = '';
  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = "Username already exists";
        break;
      default:
        message = "Something is not right";
    }
  } else {
    for (var errName in err.errors) {
      if (err.errors[errName].message) {
        message = err.errors[errName].message;
      }
    }
  }
  return message;
};

exports.controlPanel = function(req,res,next) {
  res.render('user', {
    name: (req.user)? ((req.user.firstName === undefined) ? req.user.username: req.user.firstName)  : '',
    id: (req.user) ? req.user.id : '',
    user: JSON.stringify(req.user)
  });
};

exports.renderSignin = function(req,res,next) {
  if (!req.user) {
    res.render('signin', {
      title: 'Sign-in Form',
      messages: req.flash('error') || req.flash('info')
    });
  } else {
    return res.redirect('/');
  }
};

exports.renderSignup = function(req,res,next) {
  if (!req.user) {
    res.render('signup', {
      title: 'Sign-up Form',
      messages: req.flash('error')
    });
  } else {
    return res.redirect('/');
  }
}; 

exports.signup = function(req,res,next) {
  if (!req.user) {
    var user = new User(req.body);
    var message = null;
  
    user.provider = 'local';
    user.save(function(err) {
      if (err) {
        var message = getErrorMessage(err);
        
        req.flash('error',message);
        return res.redirect('/signup');
      }
      req.login(user, function(err) {
        if (err) return next(err);
        return res.redirect('/user');
      });
    });
  } else {
    return res.redirect('/');
  }
};

exports.signout = function(req,res) {
  req.logout();
  res.redirect('/');
};

exports.saveOAuthUserProfile = function(req,profile,done) {
  console.log('profile',profile);
  User.findOne({
    provider: profile.provider,
    providerId: profile.providerId
  }, function(err, user) {
    if (err) {
      return done(err); 
    } else {
      if (!user) {
        var possibleUsername = profile.fullName || '';
        
        User.findUniqueUsername(possibleUsername, null, function(availableUsername) {
          profile.username = availableUsername;
          console.log('hello',availableUsername,availableUsername.name,'available');
          user = new User(profile);
          user.save(function(err) {
            if (err) {
              var message = getErrorMessage(err);
              req.flash('error',message);
              console.log('error error',message);
            //  return res.redirect('/signup');
            } 
          return done(err,user);
        });
      });
    } else {
      return done(err,user);
    } 
   }
  });
};

exports.requiresLogin = function(req,res,next) {
  if (!req.isAuthenticated()) {
    return res.status(401).send({
      message: 'User is not logged in'
    });
  }
  next();
};  

/*exports.create = function(req,res,next) {
  var user = new User(req.body);
  
  user.save(function(err) {
    if (err) {
      return next(err);
    } else {
      res.json(user);
    }
  });
};*/
  
