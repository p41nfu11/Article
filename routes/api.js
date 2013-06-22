
var article = require('../models/article');

exports.postArticle = function(req, res){
	var data = req.body;
    var newArticle = new article();
    newArticle.title = data.title || 'Default title';
    newArticle.text = data.text || 'Default text';
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
		var query = article.find({});
		query.exec(function(err, articles){
			res.send(article[0]);
		});
	});
};
