function HomeViewModel() {
    self = this;

    self.linkToPost = ko.observable();
    self.articleTitle = ko.observable();
    self.articleContent = ko.observable();
    self.articleMode = ko.observable(false);

    self.showArticle = function(){
        return !self.articleMode();
    }

    self.postArticle = function(){
        console.log(self.linkToPost());
        //load
    	$.post('/article/article/', {"link":self.linkToPost()}, function(res){
    		console.log(res);
            //next view
    	});
    };

	self.getArticle = function(){
    	$.get('/article/article/', function(res){
    		self.articleContent(res.content);
            self.articleTitle(res.title);
            self.articleMode(true);
    	});
    };    

};

ko.applyBindings(new HomeViewModel());