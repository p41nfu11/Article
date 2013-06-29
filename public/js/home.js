function HomeViewModel() {
    self = this;

    self.linkToPost = ko.observable();
    self.articleTitle = ko.observable();
    self.articleContent = ko.observable();
    self.articleMode = ko.observable(false);
    self.postArticleMode = ko.observable(false);
    self.questions = ko.observableArray();

    self.showArticle = function(){
        return !self.articleMode();
    }

    self.postArticle = function(){
        console.log(self.linkToPost());
        //load
    	$.post('/article/article/', {"link":self.linkToPost()}, function(res){
            self.postArticleMode(true);
            for(var i=0; i < 5; i++) {
                self.questions.push({ id: i, questions: '', answer: 0 });
            }
            self.setArticle(res.title, res.content);
        });
    };

	self.getArticle = function(){
    	$.get('/article/article/', function(res){
    		self.setArticle(res.title, res.content);
    	});
    };

    self.setArticle = function(title, content) {
        self.articleContent(content);
        self.articleTitle(title);
        self.articleMode(true);
    }

};

ko.applyBindings(new HomeViewModel());