// Here's my data model
function HomeViewModel() {
    self = this;

    self.linkToPost = ko.observable();

    self.postArticle = function(){
    	$.post('/api/article/', self.link, function(res){
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