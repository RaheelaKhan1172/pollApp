exports.render = function(req,res) {
  res.render('index', {
    user: JSON.stringify(req.user) 
  });
};
// userFullName: (req.user) ? ((req.user.username && req.user.fullName) ? req.user.fullName : req.user.username) : ''
