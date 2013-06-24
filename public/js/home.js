function HomeViewModel() {
    self = this;

    self.linkToPost = ko.observable();
    self.article = ko.observable();
    self.articleMode = ko.observable(false);

    self.showArticle = function(){
        return !self.articleMode();
    }

    self.postArticle = function(){
        console.log(self.linkToPost());
        //load
    	$.post('/api/article/', {"link":self.linkToPost()}, function(res){
    		console.log(res);
            //next view
    	});
    };

	self.getArticle = function(){
    	$.get('/api/article/', function(res){
    		self.article(res.content);
            console.log(res);
            self.articleMode(true);
    	});
    };    

};

ko.applyBindings(new HomeViewModel());