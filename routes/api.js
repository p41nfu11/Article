
var article = require('../models/article');

exports.postArticle = function(req, res){
	var data = req.body;
    var newArticle = new article();
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
	delArticles();
	process.nextTick(function(){
		var query = article.findOne({});
		query.exec(function(err, article){

			if (!article.content){
				console.log("fetching content...");
				getContent(article, function(data){
					article.content = data.content;
					article.title = data.title;
					article.excerpt = data.excerpt;
					res.send(article);
				});	
			}
			else
			{
				res.send(article);
			}
		});
	});
};

var readability = require('node-readability');
var getContent = function(articleToFetch, callback){
	
	console.log(articleToFetch);
	readability.read(articleToFetch.link, function(err, response) {
		if(err)
			console.log(err);
		else
	  		callback(response.getContent());
	});
}

var delArticles = function(){
	article.find({},function(err,docs){
	    if(err)
	    {
	    	console.log(err);
	    }
	    else{
	    	console.log(docs);
	    	docs.forEach(function(doc){
	    		if (!doc.link){
		    		console.log('found '+ docs.length+'. Deleting...');
		    		doc.remove();
		    	}
	    	});
	    }
	});
}
