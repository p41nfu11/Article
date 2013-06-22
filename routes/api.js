
var article = require('../models/article');

exports.article = function(req, res){
	var data = request.body;
    var newArticle = new post();
    newArticle.title = data.title || 'Default title';
    newArticle.text = data.text || 'Default text';
    newArticle.createdDate = data.createdDate || new Date();
    newArticle.userId = request.user._id || 0;
    newArticle.views = 0;

    newArticle.save(function(err){
		if(err){
			throw err;
		}
		console.log("New article " + newArticle.title + " was created");
		response.send(200, newArticle);
	});	
};
