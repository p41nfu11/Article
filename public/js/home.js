// Here's my data model
function HomeViewModel() {
    self = this;

    //self.link = ko.observable();
  
  	self.getAddress = "https://www.readability.com/api/content/v1/parser?url=http://www.dn.se/nyheter/varlden/usa-atalar-snowden-for-spioneri/&token=b59491d1a51ae5400f902a3ab9003174d4e9ebd8";
    
    $.getJSON(self.getAddress + "?callback=?", function(data) {
    	console.log(data);
  		
    });

};

ko.applyBindings(new HomeViewModel());