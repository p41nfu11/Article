

function AdminViewModel() {
    self = this;

    self.articles = ko.observableArray();

    self.init = function(){
    	$.get('/api/articles/', function(response){
    		response.forEach(function(article){
    			self.articles.push(article);
    		});
    	});
    };

    self.init();

   
    self.removeArticle = function(article){
    	$.post('/api/removeArticle/', article, function(response) {
			var index = self.articles.indexOf(article);
            self.articles.splice(index, 1);
		});	
    };
};

ko.applyBindings(new AdminViewModel());