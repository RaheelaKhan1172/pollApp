exports.render = function(req,res) {
  res.render('index', {
    userFullName: (req.user) ? ((req.user.username && req.user.username.length > 2) ? req.user.username : req.user.fullName) : ''
  });
};

