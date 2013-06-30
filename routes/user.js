var user = require('../models/user');

exports.getUsers = function(req, res){
	console.log("getUsers");
	process.nextTick(function(){
		var query = user.find({});
		query.exec(function(err, users){
			users.forEach(function(u){
				if (!u.admin)
					u.admin = false;	
			});
			res.send(users);
		});
	});
};

exports.getUser = function(req, res){
	console.log('getUser');
	process.nextTick(function(){
		var query = user.findOne({ '_id': req.params.id });
		query.exec(function(err, u){
			if(err)
			{
				console.log('err trying to find user');	
				res.send(404);
			}
			res.send(u);
		});
	});
};

exports.updateUser = function(req, res){
	var userToUpdate = req.body;
	console.log("update user: " + userToUpdate.name);
	process.nextTick(function(){
		var query = user.findOne({'_id': userToUpdate._id});
		query.exec(function(err, u){
			u.admin = userToUpdate.admin;
			u.save(function(err){
				if(err){
					throw err;
				}

				console.log("Updated user " + u.name + ", admin: " + u.admin);
				res.send(200, u);
			});	
		});
	});
};