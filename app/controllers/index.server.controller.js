exports.render = function(req,res) {
      console.log(JSON.stringify(req.user))

  res.render('index', {
    name: (req.user)? ((req.user.firstName === undefined) ? req.user.username: req.user.firstName)  : '',
    id: (req.user) ? req.user.id : '',
    user: JSON.stringify(req.user) 
  });
};
// userFullName: (req.user) ? ((req.user.username && req.user.fullName) ? req.user.fullName : req.user.username) : ''
