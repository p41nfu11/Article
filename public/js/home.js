// Here's my data model
function HomeViewModel() {
    self = this;

    self.linkToPost = ko.observable();

    self.postArticle = function(){
        console.log(self.linkToPost());
    	$.post('/api/article/', {"link":self.linkToPost()}, function(res){
    		console.log(res);
    	});
    };

	self.getArticle = function(){
    	$.get('/api/article/', function(res){
    		console.log(res);
    	});
    };    

};

ko.applyBindings(new HomeViewModel());