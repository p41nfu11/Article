
var article = require('../models/article');

exports.postArticle = function(req, res){
	var data = req.body;
    var newArticle = new article();
    newArticle.title = data.link;
    newArticle.link = data.link;
    newArticle.excerpt = 'excerpt';
    newArticle.createdDate = data.createdDate || new Date();
    newArticle.userId = req.user._id || 0;
    newArticle.views = 0;

    newArticle.save(function(err){
		if(err){
			res.send(500);
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

exports.getArticles = function(req, res){
	delArticles();
	console.log("getArticles");
	process.nextTick(function(){
		var query = article.find({});
		query.exec(function(err, articles){
				console.log(err);
				console.log(articles);
				res.send(articles);
			
		});
	});
};

exports.removeArticle = function(req, res){
	console.log(res.body);
	process.nextTick(function(){
		article.find({"_id":req.body._id},function(err,docs){
		    if(err)
		    {
		    	console.log(err);
		    	res.send(404);
		    }
		    else{
		    	docs.forEach(function(doc){
			    	console.log('found '+ docs.length+'. Deleting...');
			    	doc.remove();
		    	});
		    	res.send(200);
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
	    		if (!doc.excerpt){
		    		console.log('found '+ docs.length+'. Deleting...');
		    		doc.remove();
		    	}
	    	});
	    }
	});
}
