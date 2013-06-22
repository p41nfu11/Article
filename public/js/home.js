// Here's my data model
function HomeViewModel() {
    self = this;

    self.linkToPost = ko.observable();

    self.postArticle = function(){
    	$.post('/api/postArticle/', self.link, function(res){
    		console.log(res);
    	})
    };

	self.getArticle = function(){
    	$.get('/api/getArticle/', function(res){
    		console.log(res);
    	})
    };    

};

ko.applyBindings(new HomeViewModel());