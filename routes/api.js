
var article = require('../models/article');

exports.postArticle = function(req, res){
	var data = req.body;
    var newArticle = new article();
    newArticle.title = data.title || 'Default title';
    newArticle.link = data.link;
    newArticle.createdDate = data.createdDate || new Date();
    newArticle.userId = req.user._id || 0;
    newArticle.views = 0;

    newArticle.save(function(err){
		if(err){
			throw err;
		}
		console.log("New article " + newArticle.title + " was created");
		res.send(200, newArticle);
	});	
};

exports.getArticle = function(req, res){
	process.nextTick(function(){
		var query = article.findOne({});
		query.exec(function(err, article){
			console.log(article);
			res.send(article);
		});
	});
};
