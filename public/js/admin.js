

function AdminViewModel() {
    self = this;

    self.articles = ko.observableArray();
    self.users = ko.observableArray();

    self.init = function(){
    	$.get('/article/articles/', function(response){
    		response.forEach(function(article){
    			self.articles.push(article);
    		});
    	});

        $.get('/user/users/', function(response){
            response.forEach(function(user){
                self.users.push(user);
            });
        });
    };

    self.init();

   
    self.removeArticle = function(article){
    	$.post('/article/removeArticle/', article, function(response) {
			var index = self.articles.indexOf(article);
            self.articles.splice(index, 1);
		});	
    };

    self.updateUser = function(user){
        user.admin = !user.admin;
        $.post('/user/updateUser/', user, function(response) {
            console.log(response);
        });   
    };
};

ko.applyBindings(new AdminViewModel());