
exports.index = function(req, res){
  	res.render('index');
};

exports.home = function(req, res){
  	res.render('home');
};

exports.profile = function(req, res){
	var obj = {id:req.user._id , name:req.user.name, email:req.user.email, credits:req.user.credits};
  	res.render('profile', obj);
};